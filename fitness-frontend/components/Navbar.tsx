"use client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="bg-transparent">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo and Brand */}
                <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                        C
                    </span>
                    <span className="text-xl font-bold text-white">CoreSync</span>
                </div>

                {/* Links */}
                <div className="flex items-center space-x-6">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Sign up</Link>
                    </Button>
                </div>

            </div>
        </nav>
    );
}