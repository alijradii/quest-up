import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame } from "lucide-react";

const quests = [
    { id: 1, title: "Morning Jog", completed: true },
    { id: 2, title: "Read 10 Pages", completed: true },
    { id: 3, title: "Finish Report", completed: false },
    { id: 4, title: "Meditate 10 mins", completed: false },
];

const totalQuests = quests.length;
const completedQuests = quests.filter((q) => q.completed).length;
const progress = (completedQuests / totalQuests) * 100;

const stats = {
    level: 5,
    exp: 320,
    nextLevelExp: 500,
    discipline: 8,
    creativity: 6,
    endurance: 7,
};

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen p-6">
                {/* Navbar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">LifeQuest Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        <Flame className="text-red-500" />
                        <span className="text-lg font-semibold">
                            Streak: 7 days
                        </span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Today's Quests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Quests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {quests.map((quest) => (
                                    <li
                                        key={quest.id}
                                        className={`p-3 rounded-md border ${
                                            quest.completed
                                                ? "bg-green-100 border-green-400"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span
                                            className={`font-medium ${
                                                quest.completed
                                                    ? "line-through text-gray-500"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {quest.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Progress & Stats */}
                    <div className="space-y-6">
                        {/* Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-2 text-sm text-gray-600">
                                    {completedQuests} of {totalQuests} quests
                                    completed
                                </div>
                                <Progress value={progress} />
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Player Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Level
                                        </p>
                                        <p className="font-bold text-lg">
                                            {stats.level}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            EXP
                                        </p>
                                        <p className="font-bold text-lg">
                                            {stats.exp} / {stats.nextLevelExp}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Discipline
                                        </p>
                                        <p className="font-bold text-lg">
                                            {stats.discipline}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Creativity
                                        </p>
                                        <p className="font-bold text-lg">
                                            {stats.creativity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Endurance
                                        </p>
                                        <p className="font-bold text-lg">
                                            {stats.endurance}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
