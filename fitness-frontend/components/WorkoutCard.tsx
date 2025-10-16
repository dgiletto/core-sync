"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BicepsFlexed, Bike, SquarePen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

interface Workout {
    id: string;
    name: string;
    date: string;
    weight: string;
    userId: string;
}

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: string) => void;
  onUpdate: (updatedWorkout: Workout) => void;
}

export function WorkoutCard({ workout, onDelete, onUpdate }: WorkoutCardProps) {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(workout.name);
    const [weight, setWeight] = useState(workout.weight);

    // DELETE Workout
    const handleDelete = async () => {
        try {
            await API.delete(`/workout/${workout.userId}/${workout.id}`);
            onDelete(workout.id);
            toast.success("Workout Deleted", {
                description: "Workout deleted successfully"
            });
        } catch (error) {
            console.error("Failed to delete workout: ", error);
            toast.error("Workout Deletion Failed", {
                description: "Workout failed to delete"
            });
        }
    };

    // EDIT Workout
    const handleEdit = async () => {
        try {
            const res = await API.put(`/workout/${workout.userId}/${workout.id}`, {
                name,
                weight,
                date: workout.date
            });

            const updated = res.data;
            onUpdate(updated);
            setIsEditing(false);
            toast.success("Workout Edited", {
                description: "Workout successfully edited"
            });
        } catch (error) {
            console.error("Failed to edit workout: ", error);
            toast.error("Workout Editing Failed", {
                description: "Workout failed to be edited"
            });
        }
    };

    // Open Specific Workout
    const handleOpenWorkout = () => {
        router.push(`/dashboard/workout/${workout.id}?userId=${workout.userId}`);
    };

    return(
        <Card className="w-[60vw] max-x-lg mx-auto mb-6 bg-card">
            <CardHeader>
                <CardTitle 
                    className="text-xl font-semibold text-white flex justify-between items-center cursor-pointer"
                >
                    {/* Workout Link */}
                    <p 
                        className="flex gap-3 items-center"
                        onClick={handleOpenWorkout}
                    >
                        <BicepsFlexed />{" "}
                        {isEditing ? (
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-[200px]"
                            />
                        ) : (
                            workout.name
                        )}
                    </p>

                    {/* Edit Button */}    
                    <div className="flex gap-3">
                        {isEditing ? (
                            <Button onClick={handleEdit} variant="secondary">
                                Save
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                <SquarePen />
                            </Button>
                        )}

                        {/* Alert Dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="cursor-pointer">
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this workout?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. It will permanently remove the workout from the workout log.
                                        Are you sure you still want to proceed?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground">
                    {new Date(`${workout.date}T00:00:00`).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                {isEditing ? (
                    <Input
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-[100px] mt-2"
                    />
                ) : (
                    <p className="text-muted-foreground">{workout.weight} lbs</p>
                )}
            </CardContent>
        </Card>
    )
}