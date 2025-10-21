"use client";
import { Button } from "@/components/ui/button";
import WorkoutCarousel from "@/components/WorkoutCarousel";
import React from "react";

export default function WorkoutPage() {
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Workout Page</h1>
            </div>
            <WorkoutCarousel />
        </>
    )
}