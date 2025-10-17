"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import API from "@/lib/api";
import { toast } from "sonner";

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

interface EditExerciseModalProps {
  open: boolean;
  onClose: () => void;
  exercise: Exercise;
  workoutId: string;
  onUpdate: (updatedExercise: Exercise) => void;
}

export default function EditExerciseModal({
  open,
  onClose,
  exercise,
  workoutId,
  onUpdate,
}: EditExerciseModalProps) {
  const [form, setForm] = useState<Exercise>(exercise);

  useEffect(() => {
    setForm(exercise);
  }, [exercise]);

  const handleChange = (key: keyof Exercise, value: string | null) => {
    let updated = { ...form, [key]: value };

    // Handle type switch logic
    if (key === "exerciseType") {
      if (value === "STRENGTH") {
        updated = {
          ...updated,
          duration: null,
          distance: null,
        };
      } else if (value === "CARDIO") {
        updated = {
          ...updated,
          muscleGroup: null,
          sets: null,
          reps: null,
          weight: null,
        };
      }
    }

    setForm(updated);
  };

  const handleSave = async () => {
    if (Number(form.weight) < 0 || Number(form.sets) < 0 || Number(form.reps) < 0) {
        toast.error("Error Submitting Exercise", {
            description: "You can not enter negative numbers"
        });
        return;
    }
    
    try {
      const res = await API.put(`/exercise/${workoutId}/${exercise.id}`, form);
      onUpdate(res.data || form);
      toast.success("Exercise updated successfully");
      onClose();
    } catch (err) {
      console.error("Error updating exercise:", err);
      toast.error("Failed to update exercise");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Exercise</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Exercise Name */}
          <div className="space-y-2">
            <Label>Exercise Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          
          {/* Type + Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exerciseType">Exercise Type</Label>
              <Select
                value={form.exerciseType}
                onValueChange={(v) => handleChange("exerciseType", v)}
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
                value={form.difficulty}
                onValueChange={(v) => handleChange("difficulty", v)}
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

          {form.exerciseType === "STRENGTH" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="muscleGroup">Muscle Group</Label>
                <Input
                  value={form.muscleGroup ?? ""}
                  onChange={(e) => handleChange("muscleGroup", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="sets">Sets</Label>
                    <Input
                        type="number"
                        value={form.sets ?? ""}
                        onChange={(e) => handleChange("sets", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reps">Reps</Label>
                    <Input
                        type="number"
                        value={form.reps ?? ""}
                        onChange={(e) => handleChange("reps", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                        type="number"
                        value={form.weight ?? ""}
                        onChange={(e) => handleChange("weight", e.target.value)}
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
                  value={form.duration ?? ""}
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (mi)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={form.distance ?? ""}
                  onChange={(e) => handleChange("distance", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}