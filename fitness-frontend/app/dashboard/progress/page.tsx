"use client";
import { useEffect, useState } from "react";
import { LoaderTwo } from "@/components/ui/loader";
import API from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";
import  ReportCard from "@/components/ReportCard";

interface ProgressReport {
  startDate: string;
  endDate: string;
  strengthProgress: number;
  enduranceProgress: number;
  bmi: number;
  weight: number;
}

export default function ProgressReportPage() {
    const { user, loading } = useAuth();
    const [weeklyReport, setWeeklyReport] = useState<ProgressReport | null>(null);
    const [monthlyReport, setMonthlyReport] = useState<ProgressReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = async () => {
        if (!user || loading) return;
        setIsLoading(true);

        try {
            const [weeklyRes, monthlyRes] = await Promise.all([
                API.get(`/report/${user.id}/weekly`),
                API.get(`/report/${user.id}/monthly`)
            ]);

            setWeeklyReport(weeklyRes.data);
            setMonthlyReport(monthlyRes.data);
        } catch (error) {
            console.error("Failed to fetch progress reports: ", error);
            toast.error("Failed to Fetch Reports");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400">
                <LoaderTwo />
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center gap-8 py-10">
            <h1 className="text-3xl font-semibold text-white">Progress Reports</h1>

            <div className="flex flex-wrap justify-center gap-8">
                <ReportCard title="Weekly Progress" report={weeklyReport} />
                <ReportCard title="Monthly Progress" report={monthlyReport} />
            </div>
        </div>
    );
}