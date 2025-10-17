"use client";
import API from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { LoaderTwo } from "./ui/loader";

interface NewExerciseModalProps {
  workoutId: string;
  onExerciseCreated: () => void;
}

export default function NewExerciseModal({ workoutId, onExerciseCreated }: NewExerciseModalProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [newExercise, setNewExercise] = useState({
        name: "",
        exerciseType: "STRENGTH",
        difficulty: "LOW",
        muscleGroup: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        distance: "",
    });

    const handleSubmit = async () => {
        if (Number(newExercise.weight) < 0 || Number(newExercise.sets) < 0 || Number(newExercise.reps) < 0) {
            toast.error("Error Submitting Exercise", {
                description: "You can not enter negative numbers"
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                ...newExercise,
                sets: Number(newExercise.sets) || 0,
                reps: Number(newExercise.reps) || 0,
                weight: Number(newExercise.weight) || 0,
                duration: Number(newExercise.duration) || 0,
                distance: Number(newExercise.distance) || 0
            };

            await API.post(`/exercise/${workoutId}`, payload);

            onExerciseCreated?.();
            toast.success("Exercise Added", {
                description: "Your exercise was successfully added"
            });

            setIsDialogOpen(false);
            setNewExercise({
                name: "",
                exerciseType: "STRENGTH",
                difficulty: "BEGINNER",
                muscleGroup: "",
                sets: "",
                reps: "",
                weight: "",
                duration: "",
                distance: "",
            });
        } catch (error) {
            console.error("Error adding exercise:", error);
            toast.error("Failed to add exercise");
        } finally {
            setIsLoading(true);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full mb-3">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Exercise
                    </Button>
                </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add New Exercise</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Exercise Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Exercise Name</Label>
                        <Input
                            id="name"
                            placeholder="Bench Press"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                        />
                    </div>

                    {/* Type + Difficulty */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="exerciseType">Exercise Type</Label>
                            <Select
                                value={newExercise.exerciseType}
                                onValueChange={(value) => setNewExercise({...newExercise, exerciseType: value})}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="STRENGTH">Strength</SelectItem>
                                    <SelectItem value="CARDIO">Cardio</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select
                                value={newExercise.difficulty}
                                onValueChange={(value) => setNewExercise({...newExercise, difficulty: value})}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {newExercise.exerciseType === "STRENGTH" ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="muscleGroup">Muscle Group</Label>
                                <Input
                                    id="muscleGroup"
                                    placeholder="Chest"
                                    value={newExercise.muscleGroup}
                                    onChange={(e) => setNewExercise({...newExercise, muscleGroup: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sets">Sets</Label>
                                    <Input
                                        id="sets"
                                        type="number"
                                        placeholder="4"
                                        value={newExercise.sets}
                                        onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reps">Reps</Label>
                                    <Input
                                        id="reps"
                                        type="number"
                                        placeholder="10"
                                        value={newExercise.reps}
                                        onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (lbs)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        step="0.1"
                                        placeholder="185"
                                        value={newExercise.weight}
                                        onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (min)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    step="0.1"
                                    placeholder="20"
                                    value={newExercise.duration}
                                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="distance">Distance (mi)</Label>
                                <Input
                                    id="distance"
                                    type="number"
                                    step="0.1"
                                    placeholder="3.1"
                                    value={newExercise.distance}
                                    onChange={(e) => setNewExercise({ ...newExercise, distance: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!newExercise.name || isLoading}
                    >
                        {isLoading ? <LoaderTwo /> : "Add Exercise"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}