import { useState, useMemo } from "react";
import { LeaderboardStats } from "@/Components/Pages/Leaderboard/LeaderboardStats";
import { LeaderboardFilters } from "@/Components/Pages/Leaderboard/LeaderboardFilters";
import { LeaderboardList } from "@/Components/Pages/Leaderboard/LeaderboardList";
import { LeaderboardEntry } from "@/types/interfaces/User";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";

interface Props {
    users: User[];
}

export default function LeaderboardPage({ users }: Props) {
    const currentUserId = 5;

    const [timeframe, setTimeframe] = useState<"all" | "weekly" | "monthly">("all");
    const [sortBy, setSortBy] = useState<"xp" | "quests" | "level" | "streak">("xp");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const currentUser = users.find((u) => u.id === currentUserId);
    const sortedUsers = users.sort((a: User, b: User) => {
        if(a.completed_quests > b.completed_quests) return -1;

        else return 1;
    })


    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    const leaderboardEntries: LeaderboardEntry[] = paginatedUsers.map((user, index) => ({
        user,
        position: startIndex + index + 1,
        change: 0, // Placeholder for now
        isCurrentUser: user.id === currentUserId,
    }));

    return (
        <AuthenticatedLayout>
            <Head title="Leaderboard" />
            <div className="bg-background text-foreground flex flex-col w-full h-full p-6 z-50">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold">Leaderboard</h1>
                        <p className="text-muted-foreground">
                            Compete with fellow adventurers and climb the ranks
                        </p>
                    </div>

                    {/* Statistics */}
                    <LeaderboardStats
                        users={sortedUsers}
                        currentUser={currentUser}
                    />

                    {/* Filters */}
                    <LeaderboardFilters
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        totalUsers={sortedUsers.length}
                    />

                    {/* Leaderboard list */}
                    <LeaderboardList
                        entries={leaderboardEntries}
                        timeframe={timeframe}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
