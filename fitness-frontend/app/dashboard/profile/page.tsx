"use client";
import { useAuth } from "@/hooks/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoaderTwo } from "@/components/ui/loader";
import { 
    User, 
    Mail, 
    Calendar, 
    Weight, 
    Ruler, 
    Dumbbell, 
    Target 
} from "lucide-react";
import EditUserModal from "@/components/EditUserModal";

export default function ProfilePage() {
    const { user } = useAuth();

    const unUppercaseExperience = (level: string) => {
        switch(level?.toUpperCase()) {
            case 'BEGINNER': return 'Beginner';
            case 'INTERMEDIATE': return 'Intermediate';
            case 'ADVANCED': return 'Advanced';
            default: return 'None';
        }
    };

    const handleUserUpdated = () => {
        window.location.reload();
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400">
                <LoaderTwo />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start overflow-hidden">
            <div className="absolute top-4 right-6 z-50">
                <EditUserModal onUserUpdated={handleUserUpdated} />
            </div>
            <div className="w-full flex flex-col items-start flex-none mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Profile</h1>
                    <p className="text-gray-400 mb-4">
                        Your fitness journey at a glance
                    </p>
                </div>
            </div>

            <div className="w-[80vw] space-y-6 overflow-y-auto no-scrollbar scroll-smooth max-h-[75vh] pb-6">
                {/* Personal Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                            <User className="w-6 h-6" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <User className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Name</p>
                                    <p className="text-lg font-semibold text-white">
                                        {user.name || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Email</p>
                                    <p className="text-lg font-semibold text-white break-all">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Age */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Age</p>
                                    <p className="text-lg font-semibold text-white">
                                        {user.age ? `${user.age} years` : "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Physical Stats Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                            <Ruler className="w-6 h-6" />
                            Physical Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Weight */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Weight className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Weight</p>
                                    <p className="text-lg font-semibold text-white">
                                        {user.weight ? `${user.weight} lbs` : "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Height */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Ruler className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Height</p>
                                    <p className="text-lg font-semibold text-white">
                                        {user.height ? `${user.height} inches` : "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Fitness Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                            <Dumbbell className="w-6 h-6" />
                            Fitness Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Fitness Experience */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Dumbbell className="w-5 h-5 text-orange-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-2">Fitness Experience</p>
                                    {user.fitnessLevel ? (
                                        <Badge 
                                            variant="outline"
                                            className="border-gray-600 text-gray-300 text-sm"
                                        >
                                            {unUppercaseExperience(user.fitnessLevel)}
                                        </Badge>
                                    ) : (
                                        <p className="text-lg font-semibold text-white">Not provided</p>
                                    )}
                                </div>
                            </div>

                            {/* Fitness Goals */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-800/50 rounded-lg">
                                    <Target className="w-5 h-5 text-orange-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-2">Fitness Goals</p>
                                    {user.goals && user.goals.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {user.goals.map((goal: string, idx: number) => (
                                                <Badge 
                                                    key={idx}
                                                    variant="outline"
                                                    className="border-gray-600 text-gray-300 text-sm"
                                                >
                                                    {goal}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-lg font-semibold text-white">No goals set</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}