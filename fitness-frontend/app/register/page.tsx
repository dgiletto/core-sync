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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from "sonner";
import { AuthAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

type FitnessLevel = "ADVANCED" | "INTERMEDIATE" | "BEGINNER";
type GoalOption = "Lose Weight" | "Build Muscle" | "Improve Endurance";

interface FormData {
    name: string;
    email: string;
    password: string;
    age: string;
    weight: string;
    height: string;
    fitnessLevel: FitnessLevel | "";
    goals: GoalOption[]
}


export default function LoginPage() {
    const router = useRouter();
    const [flag, setFlag] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        age: "",
        weight: "",
        height: "",
        fitnessLevel: "",
        goals: []
    });

    const fitnessLevels: FitnessLevel[] = ["ADVANCED", "INTERMEDIATE", "BEGINNER"];
    const goalsList: GoalOption[] = ["Lose Weight", "Build Muscle", "Improve Endurance"]

    const handleFlag = () => setFlag(!flag);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;

        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Missing Information", {
                description: "Please fill out all required account details"
            });
            return;
        }

        if (!formData.age || !formData.weight || !formData.height) {
            toast.error("Missing Information", {
                description: "Please complete your personal information"
            });
            return;
        }

        if (!formData.fitnessLevel) {
            toast.error("Missing Information", {
                description: "Please select your fitness level"
            });
            return;
        }

        if (formData.goals.length === 0) {
            toast.error("Missing Information", {
                description: "Please choose at least one goal"
            });
            return;
        }

        try {
            await AuthAPI.register({
                name: formData.name,
                email: formData.email,
                passwordHash: formData.password,
                age: Number(formData.age),
                weight: Number(formData.weight),
                height: Number(formData.height),
                fitnessLevel: formData.fitnessLevel,
                goals: formData.goals
            });
            toast.success("Account Created", {
                description: "You can now login"
            });
            router.push("/login");
        } catch (error: any) {
            toast.error("Registration failed", {
                description: error.response?.data || "Something went wrong"
            });
        }
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

                {/* Register Card */}
                <Card className="w-full max-w-lg shadow-xl">
                    <CardHeader className="flex justify-between">
                        <div></div>
                        <CardTitle className="text-center text-3xl font-bold ml-5">Sign Up</CardTitle>
                        <Button variant="secondary" size="icon" className="size-10 cursor-pointer" onClick={handleFlag}>
                            {!flag && <ChevronRight />}
                            {flag && <ChevronLeft />}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {!flag && (
                                <div className="flex flex-col gap-6">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="h-12 text-lg"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="h-12 text-lg"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="h-12 text-lg"
                                    />
                                </div>
                            )}

                            {flag && (
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Age, Height, and Weight */}
                                        <Input
                                            type="number"
                                            placeholder="Age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="h-12 text-lg"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Weight (lbs)"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="h-12 text-lg"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Height (in)"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="h-12 text-lg"
                                        />
                                    </div>
                                    
                                    {/* Fitness Level */}
                                    <Select
                                        onValueChange={(value) => setFormData({...formData, fitnessLevel: value as FitnessLevel})}
                                        value={formData.fitnessLevel}
                                    >
                                        <SelectTrigger className="h-12 w-full">
                                            <SelectValue placeholder="Select Your Fitness Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="BEGINNER">Beginner</SelectItem>
                                                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                                <SelectItem value="ADVANCED">Advanced</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    
                                    {/* Goals */}
                                    <div className="flex flex-col gap-3">
                                        <Label className="text-lg font-semibold">Goals</Label>
                                        <div className="flex justify-between">
                                            {goalsList.map((goal) => (
                                                <div key={goal} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={goal}
                                                        checked={formData.goals.includes(goal)}
                                                        onCheckedChange={(checked) => {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                goals: checked
                                                                ? [...prev.goals, goal]
                                                                : prev.goals.filter((g) => g !== goal),
                                                            }));
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                    <Label htmlFor={goal}>
                                                        {goal}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Create Account Button */}
                                    <Button type="submit" className="w-full h-12 text-lg cursor-pointer">
                                        Create Account
                                    </Button>
                                </div>
                            )}
                        </form>
                        <div className="mt-6 text-center text-base text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Click here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}