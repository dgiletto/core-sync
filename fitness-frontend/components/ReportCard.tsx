import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, Dumbbell, HeartPulse, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgressReport {
  startDate: string;
  endDate: string;
  strengthProgress: number;
  enduranceProgress: number;
  bmi: number;
  weight: number;
}

export default function ReportCard({ title, report }: {title: string; report: ProgressReport | null}) {
    if (!report) {
        return (
            <Card className="w-[40vw]">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>No data available</CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-[40w]">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                    {title}
                    <Badge variant="outline" className="border-gray-600 text-gray-600">
                        {new Date(report.startDate).toLocaleDateString()} -{" "}
                        {new Date(report.endDate).toLocaleDateString()}
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Dumbbell className="w-4 h-4" />
                        Strength
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                        {report.strengthProgress.toFixed(1)}%
                    </p>
                </div>

                <div className="bg-gray-900/50 p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <HeartPulse className="w-4 h-4" />
                        Endurance
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                        {report.enduranceProgress.toFixed(1)}%
                    </p>
                </div>

                <div className="bg-gray-900/50 p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Scale className="w-4 h-4" />
                        Avg Weight
                    </div>
                    <p className="text-2xl font-bold text-yellow-400">
                        {report.weight.toFixed(1)} lbs
                    </p>
                </div>

                <div className="bg-gray-900/50 p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        BMI Change
                    </div>
                    <p className="text-2xl font-bold text-purple-400">
                        {report.bmi.toFixed(1)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}