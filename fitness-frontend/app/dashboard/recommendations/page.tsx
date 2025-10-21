"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/AuthContext";
import { LoaderTwo } from "@/components/ui/loader";

interface Exercise {
    name: string;
    description: string;
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

    const getReccomendations = async () => {
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
        getReccomendations();
    }, [user]);

    if (loading) {
        <div className="flex justify-center items-center h-screen text-gray-400">
            <LoaderTwo />
        </div>
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Recommended Workouts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workouts?.map((rec: any, idx: number) => (
                    <Card key={idx}>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-1">{rec.title}</h2>
                            <p className="text-gray-400 mb-3">{rec.description}</p>
                            <ul className="space-y-2">
                                {rec.exercises.map((ex: any, i: number) => (
                                    <li key={i}>
                                        <strong>{ex.name}</strong> ({ex.type}) - {ex.muscleGroup || "General"}
                                        <br />
                                        {ex.type == "STRENGTH"
                                            ? `${ex.sets} x ${ex.reps}`
                                            : `${ex.duration} min`}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}