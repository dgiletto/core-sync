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
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

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
            toast.success("Workout Created", {
                description: "Successfully created a new workout"
            });
        } catch (error) {
            console.error("Error creating workout:", error);
            toast.error("Creation Failed", {
                description: "Failed to create new workout"
            });
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
                        {/* Name */}
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input 
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Chest Day"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <div className="col-span-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(new Date(date + "T00:00:00"), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date ? new Date(date + "T00:00:00") : undefined}
                                        onSelect={(selectedDate) => {
                                            if (selectedDate) {
                                                const localDate = new Date(
                                                    selectedDate.getFullYear(),
                                                    selectedDate.getMonth(),
                                                    selectedDate.getDate()
                                                );

                                                const year = localDate.getFullYear();
                                                const month = String(localDate.getMonth() + 1).padStart(2, "0");
                                                const day = String(localDate.getDate()).padStart(2, "0");
                                                const formattedDate = `${year}-${month}-${day}`;
                                                setDate(formattedDate);
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Weight */}
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
                            required
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