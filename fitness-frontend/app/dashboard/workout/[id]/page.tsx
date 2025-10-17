"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoaderTwo } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import API from "@/lib/api";
import { Dumbbell, Clock } from "lucide-react";
import NewExerciseModal from "@/components/NewExerciseModal";
import ExerciseCard from "@/components/ExerciseCard";

interface Workout {
    id: string;
    name: string;
    date: string;
    weight: string;
    userId: string;
}

interface Exercise {
    id: string;
    name: string;
    exerciseType: string;
    difficulty: string;
    muscleGroup: string | null;
    sets: string | null;
    reps: string | null;
    weight: string | null;
    duration: string | null;
    distance: string | null;
}

export default function WorkoutDetailPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [mostCommon, setMostCommon] = useState("None");
    const [time, setTime] = useState(0);
    const [loading, setLoading] = useState(false);

    const getDifficultyColor = (difficulty : string) => {
        switch(difficulty?.toUpperCase()) {
            case 'LOW': return 'bg-green-600 hover:bg-green-700';
            case 'MEDIUM': return 'bg-yellow-600 hover:bg-yellow-700';
            case 'HIGH': return 'bg-red-600 hover:bg-red-700';
            default: return 'bg-blue-600 hover:bg-blue-700';
        }
    };

    const getMostCommonDifficulty = () => {
        if (!exercises.length) return;

        const counts: Record<string, number> = {
            "LOW": 0,
            "MEDIUM": 0,
            "HIGH": 0
        };

        for (const exercise of exercises) {
            if (counts[exercise.difficulty] !== undefined) {
                counts[exercise.difficulty]++;
            }
        }

        // Define difficulty order from lowest to highest
        const order: string[] = ["LOW", "MEDIUM", "HIGH"];

        // Sort by count, then by order (higher wins ties)
        const sorted = order.sort((a,b) => {
            if (counts[b] === counts[a]) {
                return order.indexOf(b) - order.indexOf(a);
            }
            return counts[b] - counts[a]
        });

        return setMostCommon(sorted[0]);
    }

    const getTotalTime = () => {
        if (!exercises.length) return;

        let temp = 0
        for (const exercise of exercises) {
            if (exercise.exerciseType === "STRENGTH") {
                temp += (2 * Number(exercise.sets));
            } else if (exercise.exerciseType === "CARDIO") {
                temp += Number(exercise.duration);
            }
        }

        setTime(temp);
    }

    const fetchExercises = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const res = await API.get(`/exercise/${id}`);
            const data: Exercise[] = res.data;
            setExercises(data);
        } catch (error) {
            console.error("Failed to fetch exercises ", error);
            setExercises([]);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id: string) => {
        setExercises((prev) => prev.filter((e) => e.id !== id))
    }

    const handleEdit = (updatedExercise: Exercise) => {
        setExercises((prev) => 
            prev.map((e) => (e.id === updatedExercise.id ? updatedExercise : e))
        );
    }

    useEffect(() => {
        if (!id || !userId) return;

        const fetchWorkout = async () => {
            setLoading(true);
            try {
                const res = await API.get(`/workout/${userId}/${id}`);
                const data = res.data;
                setWorkout(data);
            } catch (error) {
                console.error("Failed to load workout: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
        fetchExercises();
    }, [id, userId]);

    useEffect(() => {
        getMostCommonDifficulty();
        getTotalTime();
    }, [exercises]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400">
                <LoaderTwo />
            </div>
        );
    }

    if (!workout) {
        return(
            <div className="text-center mt-20 text-gray-400">Workout not found</div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start overflow-hidden">
            <div className="w-full flex flex-col items-center flex-none">
                {/* Header Card */}
                <Card className="w-[80vw]">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <CardTitle className="text-3xl font-semibold text-white flex justify-between items-center">
                                    <p className="flex gap-3 items-center">{workout.name}</p>
                                </CardTitle>
                                <CardDescription className="text-base text-gray-400">
                                    {new Date(`${workout.date}T00:00:00`).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}, {workout.weight} lbs
                                </CardDescription>
                            </div>
                            <Badge className={`${getDifficultyColor(mostCommon)} text-white text-sm border-0`}>
                                {mostCommon}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-300">{time} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-300">{exercises.length} Exercises</span>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Add Exercise Button */}
                <div className="mt-4 w-[65vw]">
                    <NewExerciseModal 
                        workoutId={workout.id}
                        onExerciseCreated={fetchExercises}
                    />
                </div>
            </div>

            <div className="w-[90vw] grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar scroll-smooth max-h-[64vh]">
                {exercises.map((exercise, index) => (
                    <ExerciseCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        index={index} 
                        workoutId={id as string}
                        onDelete={handleDelete}
                        onUpdate={handleEdit}
                    />
                ))}
            </div>
        </div>
    )
}