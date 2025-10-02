"use client"

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight-new";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Missing Information", {
                description: "Please enter your email"
            });
            return;
        } else if (!password) {
            toast.error("Missing Information", {
                description: "Please enter your password"
            });
            return;
        }
        // TODO: call backend /api/auth/login with fetch or axios
        console.log({email, password});
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="fixed inset-0 pointer-events-none -z-10">
                <Spotlight />
            </div>
            <div className="flex w-full max-w-6xl items-center justify-between px-12">
                {/* Logo + Site Name */}
                <div className="flex flex-col items-center">
                    <span className="w-28 h-28 bg-blue-700 rounded-full flex items-center justify-center text-white text-7xl font-bold">
                        <span className="relative -top-1.5 -left-1">C</span>
                    </span>
                    <h1 className="mt-6 text-5xl font-extrabold text-white">CoreSync</h1>
                </div>

                {/* Login Card */}
                <Card className="w-full max-w-lg shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 text-lg"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 text-lg"
                            />
                            <Button type="submit" className="w-full h-12 text-lg cursor-pointer">
                                Login
                            </Button>
                        </form>
                        <div className="mt-6 text-center text-base text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-blue-500 hover:underline">
                                Click here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}