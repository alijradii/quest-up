import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { DailyQuests } from "@/Components/Pages/Dashboard/DailyQuests";
import { Quest } from "@/types/interfaces/Quest";
import { PlayerStats } from "@/Components/Pages/Dashboard/PlayerStats";
import { QuestOverview } from "@/Components/Pages/Dashboard/QuestOverview";
const quests: Quest[] = [
    {
        id: 1,
        title: "Complete project proposal",
        status: "completed",
        description: "Finish the Q1 project proposal for the new client",
        categories: ["work", "important"],
        xp: 100,
        difficulty: "hard",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
        id: 2,
        title: "30 minute workout",
        status: "pending",
        description: "Complete a full body workout session",
        categories: ["health", "fitness"],
        xp: 75,
        difficulty: "medium",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    {
        id: 3,
        title: "Read 20 pages",
        status: "pending",
        description: "Continue reading 'Atomic Habits'",
        categories: ["learning", "personal"],
        xp: 50,
        difficulty: "easy",
        createdAt: new Date(),
    },
    {
        id: 4,
        title: "Meditate for 10 minutes",
        status: "completed",
        description: "Practice mindfulness meditation",
        categories: ["mindfulness", "health"],
        xp: 30,
        difficulty: "easy",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
        id: 5,
        title: "Plan meals for the week",
        status: "expired",
        description: "Create a healthy meal plan for the upcoming week",
        categories: ["organization", "health"],
        xp: 60,
        difficulty: "medium",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
        id: 6,
        title: "Learn new programming concept",
        status: "completed",
        description: "Study React Server Components",
        categories: ["learning", "programming"],
        xp: 80,
        difficulty: "medium",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
        id: 7,
        title: "Clean workspace",
        status: "pending",
        description: "Organize and clean the home office",
        categories: ["organization", "productivity"],
        xp: 40,
        difficulty: "easy",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
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
                    <QuestOverview quests={quests} />
                    <PlayerStats />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
