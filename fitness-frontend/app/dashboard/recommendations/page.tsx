"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/AuthContext";
import { LoaderTwo } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Clock, Dumbbell, Info, Target } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Exercise {
    name: string;
    description: string;
    instruction: string;
    type: string;
    muscleGroup: string;
    sets: number;
    reps: number;
    duration: number;
}

interface Workout {
    title: string;
    description: string;
    exercises: Exercise[];
}

export default function RecommendationsPage() {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState<Workout[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const getExerciseColor = (type: string) => {
        return type === 'STRENGTH' ? 'bg-purple-600' : 'bg-cyan-600';
    };

    const calculateWorkoutTime = (exercises: Exercise[]) => {
        let total = 0;
        for (const exercise of exercises) {
            if (exercise.type === "STRENGTH") {
                total += (2 * exercise.sets);
            } else {
                total += exercise.duration || 0;
            }
        }
        return total;
    };

    const handleExerciseClick = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsDialogOpen(true);
    };

    const getRecommendations = async () => {
        if (!user) return;

        setLoading(true);
        const res = await fetch("/api/recommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user?.id,
                age: user?.age,
                weight: user?.weight,
                height: user?.height,
                fitnessLevel: user?.fitnessLevel,
                goals: user?.goals
            })
        });

        const data = await res.json();
        setWorkouts(data.workouts);
        setLoading(false);
    }

    useEffect(() => {
        getRecommendations();
    }, [user]);

    if (loading) {
        <div className="flex justify-center items-center h-screen text-gray-400">
            <LoaderTwo />
        </div>
    }

    return (
        <div className="flex flex-col items-center justify-start overflow-hidden">
            <div className="w-full flex flex-col items-start flex-none mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Recommended Workouts</h1>
                    <p className="text-gray-400 mb-4">
                        Personalized workout plans based on your fitness profile
                    </p>
                </div>
            </div>

            <div className="w-[90vw] grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto no-scrollbar scroll-smooth max-h-[75vh] pb-6">
                {workouts?.map((workout: Workout, idx: number) => {
                    const totalTime = calculateWorkoutTime(workout.exercises);
                    const exerciseTypes = [...new Set(workout.exercises.map(e => e.type))];
                    
                    return (
                        <Card key={idx}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 flex-1">
                                        <CardTitle className="text-2xl font-semibold text-white">
                                            {workout.title}
                                        </CardTitle>
                                        <CardDescription className="text-base text-gray-400">
                                            {workout.description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2 flex-wrap justify-end ml-4">
                                        {exerciseTypes.map((type, i) => (
                                            <Badge 
                                                key={i}
                                                className={`${getExerciseColor(type)} text-white text-xs border-0`}
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-300">
                                            ~{totalTime} min
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Dumbbell className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-300">
                                            {workout.exercises.length} Exercises
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                {/* Exercise Card */}
                                <div className="space-y-3">
                                    {workout.exercises.map((exercise: Exercise, i: number) => (
                                        <div 
                                            key={i}
                                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 
                                                        onClick={() => handleExerciseClick(exercise)}
                                                        className="font-semibold text-white text-lg hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2 w-fit"
                                                    >
                                                        {exercise.name}
                                                        <Info className="w-4 h-4 text-gray-400" />
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {exercise.muscleGroup || "General"}
                                                    </p>
                                                </div>
                                                <Badge 
                                                    variant="outline" 
                                                    className="border-gray-600 text-gray-300"
                                                >
                                                    {exercise.type}
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 mt-3 text-sm">
                                                {exercise.type === "STRENGTH" ? (
                                                    <>
                                                        <div className="flex items-center gap-1 text-gray-300">
                                                            <span>{exercise.sets} sets x {exercise.reps} reps</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-gray-300">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{exercise.duration} minutes</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            
            {/* No Content Message */}
            {!loading && (!workouts || workouts.length === 0) && (
                <div className="text-center mt-20 text-gray-400">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No recommendations available yet</p>
                    <p className="text-sm mt-2">Complete your profile to get personalized workout plans</p>
                </div>
            )}

            {/* Exercise Detail Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            {selectedExercise?.name}
                            <Badge 
                                className={`${getExerciseColor(selectedExercise?.type || '')} text-white text-xs border-0 ml-2`}
                            >
                                {selectedExercise?.type}
                            </Badge>
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-base">
                            {selectedExercise?.muscleGroup || "General"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        {/* Exercise Stats */}
                        <div className="flex gap-4 p-4 bg-gray-800/50 rounded-lg">
                            {selectedExercise?.type === "STRENGTH" ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <p className="text-sm text-gray-400">Sets</p>
                                            <p className="text-lg font-semibold text-white">
                                                {selectedExercise?.sets}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <p className="text-sm text-gray-400">Reps</p>
                                            <p className="text-lg font-semibold text-white">
                                                {selectedExercise?.reps}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div>
                                        <p className="text-sm text-gray-400">Duration</p>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedExercise?.duration} min
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {selectedExercise?.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {selectedExercise.description}
                                </p>
                            </div>
                        )}

                        {/* Instructions */}
                        {selectedExercise?.instruction && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {selectedExercise.instruction}
                                </p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}