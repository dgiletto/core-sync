"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Clock, Dumbbell, Route, SquarePen, Trash, Weight } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import API from "@/lib/api";
import EditExerciseModal from "./EditExerciseModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

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

interface ExerciseCardProps {
    exercise: Exercise;
    index: number;
    workoutId: string;
    onDelete: (id: string) => void;
    onUpdate: (updatedExercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, index, workoutId, onDelete, onUpdate } : ExerciseCardProps) {

    const [isEditing, setIsEditing] = useState(false);

    // Gets the background color for the background of the exercise type badge
    const getExerciseColor = (type: string) => {
        return type === 'STRENGTH' ? 'bg-purple-600' : 'bg-cyan-600';
    };

    // Gets the background color for the difficulty badge
    const getDifficultyColor = (difficulty : string) => {
        switch(difficulty?.toUpperCase()) {
            case 'LOW': return 'bg-green-600';
            case 'MEDIUM': return 'bg-yellow-600';
            case 'HIGH': return 'bg-red-600';
            default: return 'bg-blue-600';
        }
    };

    // DELETE exercise
    const handleDelete = async () => {
        try {
            await API.delete(`/exercise/${workoutId}/${exercise.id}`);
            onDelete(exercise.id);
            toast.success("Exercise Deleted", {
                description: "Exercise successfully deleted"
            });
        } catch (error) {
            console.error("Error deleting exercise: ", error);
            toast.error("Exercise Deletion Failed", {
                description: "Exercise failed to delete"
            });
        }
    }

    // EDIT exercise
    const handleEdit = async () => {
        setIsEditing(true);
    }

    return(
        <>
            <Card
                key={exercise.id}
                className="w-full"
            >
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex-shrink-0">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <CardTitle className="text-xl text-white">{exercise.name}</CardTitle>
                                    <Badge className={`${getExerciseColor(exercise.exerciseType)} text-white border-0 text-xs`}>
                                        {exercise.exerciseType}
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                                        {exercise.difficulty}
                                    </Badge>
                                    {exercise.muscleGroup && (
                                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                                            {exercise.muscleGroup}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="cursor-pointer" onClick={handleEdit}>
                                <SquarePen />
                            </Button>

                            {/* Alert Dialog */}
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="cursor-pointer">
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this exercise?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. It will permanently remove the exercise from the workout log.
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
                    </div>
                </CardHeader>

                <CardContent>
                    {exercise.exerciseType === 'STRENGTH' ? (
                        // Strength Exercise Layout
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Weight className="w-4 h-4 text-gray-400" />
                                    <div className="text-xs text-gray-400 font-medium">Weight</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {exercise.weight ? `${exercise.weight} lbs` : 0}
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="text-xs text-gray-400 font-medium mb-1">Sets</div>
                                <div className="text-2xl font-bold text-white">{exercise.sets}</div>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="text-xs text-gray-400 font-medium mb-1">Reps</div>
                                <div className="text-2xl font-bold text-white">{exercise.reps}</div>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Dumbbell className="w-4 h-4 text-gray-400" />
                                    <div className="text-xs text-gray-400 font-medium">Total Volume</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {(Number(exercise.weight) * Number(exercise.sets) * Number(exercise.reps)).toLocaleString()} lbs
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Cardio Exercise Layout
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <div className="text-xs text-gray-400 font-medium">Duration</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {exercise.duration} min
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Route className="w-4 h-4 text-gray-400" />
                                    <div className="text-xs text-gray-400 font-medium">Distance</div>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {exercise.distance} mi
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {isEditing && (
                <EditExerciseModal
                    open={isEditing}
                    onClose={() => setIsEditing(false)}
                    exercise={exercise}
                    workoutId={workoutId}
                    onUpdate={onUpdate}
                />
            )}
        </>
    );
}