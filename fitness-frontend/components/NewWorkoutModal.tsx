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
import { useAuth } from "@/hooks/AuthContext";
import API from "@/lib/api";
import { LoaderTwo } from "./ui/loader";
import { Plus } from "lucide-react";

export default function NewWorkoutModal({ onWorkoutCreated }: { onWorkoutCreated: () => void }) {
    const { user, loading } = useAuth();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (loading) return;
        if (!user) return;
        setIsLoading(true);

        try {
            const parsedWeight = Number(weight)
            await API.post("/workout/log", {
                name,
                date,
                weight: parsedWeight,
                userId: user.id
            });

            onWorkoutCreated();
            setOpen(false);
            setName("");
            setDate("");
            setWeight("");
        } catch (error) {
            console.error("Error creating workout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-4 cursor-pointer">
                    <Plus /> New Workout
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Workout</DialogTitle>
                    <DialogDescription>Enter details from your workout session!</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input 
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Chest Day"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <Input 
                            id="date"
                            type="date"
                            className="col-span-3"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                            Weight
                        </Label>
                        <Input 
                            id="weight"
                            type="number"
                            className="col-span-3"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleCreate} disabled={loading || !user} className="cursor-pointer">
                        {isLoading ? <LoaderTwo /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}