"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Clock, Dumbbell, Route, Weight } from "lucide-react";

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
}

export default function ExerciseCard({ exercise, index} : ExerciseCardProps) {

    const getExerciseColor = (type: string) => {
        return type === 'STRENGTH' ? 'bg-purple-600' : 'bg-cyan-600';
    };

    const getDifficultyColor = (difficulty : string) => {
        switch(difficulty?.toUpperCase()) {
            case 'LOW': return 'bg-green-600';
            case 'MEDIUM': return 'bg-yellow-600';
            case 'HIGH': return 'bg-red-600';
            default: return 'bg-blue-600';
        }
    };

    return(
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
    );
}