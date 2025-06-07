import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { DailyQuests } from "@/Components/Pages/Dashboard/DailyQuests";
import { Quest } from "@/types/interfaces/Quest";
import { PlayerProfileCard } from "@/Components/Pages/Dashboard/PlayerProfile";
import { QuestOverview } from "@/Components/Pages/Dashboard/QuestOverview";
import { User } from "@/types";

interface Props {
    user: User;
    activeQuests: Quest[];
}

export default function Dashboard({user, activeQuests}: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            {/* <div className="fixed w-full h-full z-0 blur-md opacity-30" style={{background: "url(assets/system.webp"}}/> */}

            <div className="bg-background text-foreground flex flex-col w-full h-full p-6 z-50">
                {/* Main Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Today's Quests */}
                    <QuestOverview quests={activeQuests} />
                    <PlayerProfileCard user={user}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
