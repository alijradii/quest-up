import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, CheckCircle2, Clock, Target } from "lucide-react";
import { Quest } from "@/types/interfaces/Quest";

interface QuestStatisticsProps {
    quests: Quest[];
}

export function QuestStatistics({ quests }: QuestStatisticsProps) {
    const stats = {
        total: quests.length,
        completed: quests.filter((q) => q.status === "complete").length,
        pending: quests.filter((q) => q.status === "pending").length,
        expired: quests.filter((q) => q.status === "expired").length,
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard
                title="Total Quests"
                value={stats.total}
                icon={<Target className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
                title="Completed"
                value={stats.completed}
                icon={<CheckCircle2 className="h-4 w-4 text-green-400" />}
                valueClassName="text-green-400"
            />
            <StatCard
                title="Pending"
                value={stats.pending}
                icon={<Clock className="h-4 w-4 text-blue-400" />}
                valueClassName="text-blue-400"
            />
            <StatCard
                title="Expired"
                value={stats.expired}
                icon={<Calendar className="h-4 w-4 text-red-400" />}
                valueClassName="text-red-400"
            />
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    valueClassName?: string;
}

function StatCard({ title, value, icon, valueClassName = "" }: StatCardProps) {
    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${valueClassName}`}>
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}
