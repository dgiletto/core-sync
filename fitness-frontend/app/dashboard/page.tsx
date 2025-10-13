"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dumbbell,
    Brain,
    ChartNoAxesCombined,
} from "lucide-react";
import Link from "next/link";
import { LoaderTwo } from "@/components/ui/loader";
import { useAuth } from "@/hooks/AuthContext";

interface Quote {
    quote: string;
    author: string;
    category: string;
}

export default function DashboardPage() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch("/api/daily-quote");
            const data = await res.json();
            setQuote(data);
        };
        fetchQuote();
    }, []);

    return(
        <div className="flex flex-col mt-25 items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-6">Welcome {user?.name?.split(" ")[0] ?? "Athlete"} to your Fitness Dashboard</h1>
            <p className="text-gray-400 mt-2 mb-4">
                Here is a quick look at your fitness journey today
            </p>
            <div className="flex justify-center items-center gap-5">
                <Card className="w-lg">
                    <CardHeader>
                        <CardTitle>Today's Quote 💪</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {quote ? (
                            <>
                                <p className="text-md italic">"{quote.quote}"</p>
                                <p className="text-sm text-muted-foreground mt-2">— {quote.author}</p>
                            </>
                        ) : (
                            <div className="flex justify-center items-center">
                                <LoaderTwo />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <p className="text-gray-400 mt-2 mb-4">
                Choose where to get started
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
                <Button variant="outline" className="rounded-full px-6 py-3 cursor-pointer">
                    <Dumbbell className="h-5 w-5 shrink-0 text-blue-700" />
                    <Link href="/dashboard/workout">Workouts</Link>
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-3 cursor-pointer">
                    <Brain className="h-5 w-5 shrink-0 text-pink-400" />
                    <Link href="/dashboard/recommendations">Recommendations</Link>
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-3 cursor-pointer">
                    <ChartNoAxesCombined className="h-5 w-5 shrink-0 text-orange-500" />
                    <Link href="/dashboard/progress">Progress</Link>
                </Button>
            </div>
        </div>
    );
}