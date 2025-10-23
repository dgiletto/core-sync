"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import API from "@/lib/api";
import { LoaderTwo } from "./ui/loader";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useAuth } from "@/hooks/AuthContext";

interface EditUserModalProps {
    onUserUpdated: () => void;
}

export default function EditUserModal({ onUserUpdated }: EditUserModalProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [name, setName] = useState(user?.name || "");
    const [age, setAge] = useState(user?.age?.toString() || "");
    const [weight, setWeight] = useState(user?.weight?.toString() || "");
    const [height, setHeight] = useState(user?.height?.toString() || "");
    const [fitnessLevel, setFitnessLevel] = useState(user?.fitnessLevel || "");
    const [goals, setGoals] = useState<string[]>(user?.goals || []);
    const [goalInput, setGoalInput] = useState("");

    const handleOpen = (isOpen: boolean) => {
        if (isOpen && user) {
            // Reset form with current user data when opening
            setName(user.name || "");
            setAge(user.age?.toString() || "");
            setWeight(user.weight?.toString() || "");
            setHeight(user.height?.toString() || "");
            setFitnessLevel(user.fitnessLevel || "");
            setGoals(user.goals || []);
            setGoalInput("");
        }
        setOpen(isOpen);
    };

    const handleAddGoal = () => {
        if (goalInput.trim() && !goals.includes(goalInput.trim())) {
            setGoals([...goals, goalInput.trim()]);
            setGoalInput("");
        }
    };

    const handleRemoveGoal = (goalToRemove: string) => {
        setGoals(goals.filter(goal => goal !== goalToRemove));
    };

    const handleUpdate = async () => {
        if (!user) return;

        // Make sure there are no goals
        if (goals.length === 0) {
            toast.error("Invalid Input", {
                description: "You need to have a fitness goal"
            });
            return;
        }

        // Check for empty states
        if (!name || !age || !weight || !height ) {
            toast.error("Invalid Input", {
                description: "You can not have an empty input"
            });
            return;
        }

        setIsLoading(true);

        try {
            await API.put(`/users/${user.id}`, {
                name,
                age: Number(age),
                weight: Number(weight),
                height: Number(height),
                fitnessLevel: fitnessLevel,
                goals: goals
            });

            onUserUpdated();
            setOpen(false);
            toast.success("Profile Updated", {
                description: "Your profile has been successfully updated"
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Update Failed", {
                description: "Failed to update your profile"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Edit className="w-4 h-4" /> Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your personal and fitness information</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input 
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Age */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">
                            Age
                        </Label>
                        <Input 
                            id="age"
                            type="number"
                            className="col-span-3"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="25"
                        />
                    </div>

                    {/* Weight */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                            Weight (lbs)
                        </Label>
                        <Input 
                            id="weight"
                            type="number"
                            className="col-span-3"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="150"
                        />
                    </div>

                    {/* Height */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="height" className="text-right">
                            Height (in)
                        </Label>
                        <Input 
                            id="height"
                            type="number"
                            className="col-span-3"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="68"
                        />
                    </div>

                    {/* Fitness Level */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fitnessLevel" className="text-right">
                            Fitness Level
                        </Label>
                        <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select fitness level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BEGINNER">Beginner</SelectItem>
                                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                <SelectItem value="ADVANCED">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Fitness Goals */}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="goals" className="text-right pt-2">
                            Fitness Goals
                        </Label>
                        <div className="col-span-3 space-y-2">
                            <div className="flex gap-2">
                                <Input 
                                    id="goals"
                                    value={goalInput}
                                    onChange={(e) => setGoalInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddGoal();
                                        }
                                    }}
                                    placeholder="Add a goal (e.g., Build Muscle)"
                                />
                                <Button 
                                    type="button" 
                                    onClick={handleAddGoal}
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    Add
                                </Button>
                            </div>
                            
                            {goals.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {goals.map((goal, idx) => (
                                        <div 
                                            key={idx}
                                            className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {goal}
                                            <button
                                                onClick={() => handleRemoveGoal(goal)}
                                                className="hover:text-red-400 transition-colors"
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleUpdate} disabled={!user} className="cursor-pointer">
                        {isLoading ? <LoaderTwo /> : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}