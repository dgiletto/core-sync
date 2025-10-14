"use client";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { WorkoutCard } from "./WorkoutCard";
import { LoaderTwo } from "./ui/loader";
import NewWorkoutModal from "./NewWorkoutModal";
import { Button } from "./ui/button";

interface Workout {
    id: string;
    name: string;
    date: string;
    weight: string;
    userId: string;
}

export default function WorkoutCarousel() {
    const { user, loading } = useAuth();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingWorkouts, setLoadingWorkouts] = useState(false);

    // Fetch workouts when user is loaded
    useEffect(() => {
        if (!loading && user) {
            fetchWorkouts(0, true);
        }
    }, [loading, user]);

    const fetchWorkouts = async (pageNumber: number, reset = false) => {
        if (!user) return;
        setLoadingWorkouts(true);

        try {
            const response = await API.get(`/workout/${user.id}`, {
                params: { page: pageNumber, size: 5 }
            });

            const data = response.data;
            if (reset) {
                setWorkouts(data.content);
            } else {
                setWorkouts((prev) => [...prev, ...data.content]);
            }
            setHasMore(!data.last);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching workouts: ", error);
        } finally {
            setLoadingWorkouts(false);
        }
    };

    const loadNextPage = () => {
        if (hasMore && !loadingWorkouts) {
            fetchWorkouts(page + 1);
        }
    };

    const handleWorkoutCreated = () => {
        fetchWorkouts(0, true);
    };

    const handleDelete = (id: string) => {
        setWorkouts((prev) => prev.filter((w) => w.id !== id));
    };

    const handleEdit = (updatedWorkout: Workout) => {
        setWorkouts((prev) => 
            prev.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w))
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400">
                <LoaderTwo />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="absolute top-4 right-6 z-50">
                <NewWorkoutModal
                    onWorkoutCreated={handleWorkoutCreated}
                />
            </div>
            <div className="w-full max-h-[75vh] overflow-y-scroll flex flex-col no-scrollbar items-center space-y-4 p-4 scroll-smooth">
                {workouts.length === 0 && !loadingWorkouts ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
                        <p className="text-lg">Get started and add some entries</p>
                    </div>
                ) : (
                    <>
                        <div className="w-full flex flex-col items-center space-y-4">
                            {workouts.map((workout) => (
                                <WorkoutCard key={workout.id} workout={workout} onDelete={handleDelete} onUpdate={handleEdit} />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="my-8">
                                <Button
                                    onClick={loadNextPage}
                                    disabled={loadingWorkouts}
                                    variant="secondary"
                                >
                                    {loadingWorkouts ? (
                                        <div className="flex items-center gap-2">
                                            <LoaderTwo />
                                        </div>
                                    ) : (
                                        "Load More"
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}