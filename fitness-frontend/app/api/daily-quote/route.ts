import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const CACHE_KEY = "daily-quote";
const ONE_DAY_SECONDS = 24 * 60 * 60;

export async function GET() {
    try {
        // Try to get a cached quote
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            return NextResponse.json(cached);
        }

        // Otherwise, fetch a new one
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                "X-Api-Key": process.env.NINJA_API_KEY!,
            },
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await res.json();
        const quote = data[0];

        // Store it in redis with 1 day expiry
        await redis.set(CACHE_KEY, quote, { ex: ONE_DAY_SECONDS });

        return NextResponse.json(quote);
    } catch (error) {
        console.error("Error fetching quote:", error);
        return NextResponse.json({ error: "Unable to fetch quote" }, { status: 500 });
    }
}