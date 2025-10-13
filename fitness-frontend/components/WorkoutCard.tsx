"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BicepsFlexed, Bike, SquarePen, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface Workout {
    id: string;
    name: string;
    date: string;
    weight: string;
    userId: string;
}

export function WorkoutCard({ workout }: { workout: Workout }) {
    return(
        <Card className="w-[60vw] max-x-lg mx-auto mb-6 bg-card">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex justify-between">
                    <p className="flex gap-3">
                        <BicepsFlexed /> {workout.name}
                    </p>
                    <div className="flex gap-3">
                        <Button variant="ghost" className="cursor-pointer"><SquarePen /></Button>
                        <Button variant="destructive" className="cursor-pointer"><Trash /></Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    {new Date(`${workout.date}T00:00:00`).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric"
                    })}
                </p>
                <p className="text-muted-foreground">{workout.weight} lbs</p>
            </CardContent>
        </Card>
    )
}