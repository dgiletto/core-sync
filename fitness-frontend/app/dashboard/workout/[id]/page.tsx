"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderTwo } from "@/components/ui/loader";
import API from "@/lib/api";

interface Workout {
    id: string;
    name: string;
    date: string;
    weight: string;
    userId: string;
}

export default function WorkoutDetailPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(false);

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
    }, [id, userId]);

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
}