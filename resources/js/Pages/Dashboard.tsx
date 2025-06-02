import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { DailyQuests } from "@/Components/Pages/Dashboard/DailyQuests";
import { Quest } from "@/types/interfaces/Quest";
import { PlayerStats } from "@/Components/Pages/Dashboard/PlayerStats";

const quests: Quest[] = [
    {
        id: 1,
        title: "Morning Jog - 2km",
        status: "completed",
        categories: ["health", "endurance"],
        xp: 120,
    },
    {
        id: 2,
        title: "Read 20 Pages of a Book",
        status: "pending",
        categories: ["intelligence", "discipline"],
        xp: 90,
    },
    {
        id: 4,
        title: "Meditation - 10 Minutes",
        status: "completed",
        categories: ["time waster", "mental health"],
        xp: 75,
    },
    {
        id: 5,
        title: "Write a Journal Entry",
        status: "pending",
        categories: ["creativity", "reflection"],
        xp: 80,
    },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            {/* <div className="fixed w-full h-full z-0 blur-md opacity-30" style={{background: "url(assets/system.webp"}}/> */}

            <div className="bg-background text-foreground flex flex-col w-full h-full p-6 z-50">
                {/* Main Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Today's Quests */}
                    <DailyQuests quests={quests} />
                    <PlayerStats />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
