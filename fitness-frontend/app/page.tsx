import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <BackgroundBeams className="absolute inset-0 -z-10" />
        <section className="flex flex-col items-center justify-center text-center min-h-[70vh]">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to CoreSync</h1>
          <p className="text-lg text-gray-400 max-w-xl mb-8">
            Track your workouts, monitor progress, and achieve your fitness goals
            with smarter insights.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
