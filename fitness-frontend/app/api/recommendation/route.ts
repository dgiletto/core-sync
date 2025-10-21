import { NextResponse } from "next/server";
import OpenAI from "openai";
import { redis } from "@/lib/redis";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.AI_KEY
});

const ONE_DAY_SECONDS = 24 * 60 * 60;

export async function POST(req: Request) {
    try {
        const { userId, age, weight, height, fitnessLevel, goals } = await req.json();
        const CACHE_KEY=`workout-recommendations:${userId}`;

        // Try fetching from cache
        const cached = await redis.get<string>(CACHE_KEY);
        if (cached) {
            const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
            return NextResponse.json(parsed);
        }

        const prompt = `
            You are a certified personal trainer.
            Generate 2 personalized workout plans for a user with:
                - Age: ${age}
                - Weight: ${weight}
                - Height: ${height}
                - Fitness Experience Level: ${fitnessLevel}
                - Goals: ${goals.join(", ")}
            
                Return ONLY valid JSON in the following format:
                {
                    workouts: [
                        {
                            "title": "Workout Name",
                            "description": "Brief description"
                            "exercises": [
                                {
                                    "name": "Exercise name",
                                    "description": "Brief description explaining the workout"
                                    "type": "STRENGTH" | "CARDIO",
                                    "muscleGroup": "Chest", "Back", etc.
                                    "sets": 3
                                    "reps": 10,
                                    "duration": 0,
                                }
                            ]
                        }
                    ]
                }
        `;

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const message = JSON.parse(completion.choices[0].message.content || "[]");

        await redis.set(CACHE_KEY, JSON.stringify(message), { ex: ONE_DAY_SECONDS });

        return NextResponse.json(message);
    } catch (error) {
        console.error("Error generating workout recommendation: ", error);
        return NextResponse.json({ error: "Failed to generate recommendaion" }, { status: 500 });
    }
}