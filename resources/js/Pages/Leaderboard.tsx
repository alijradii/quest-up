import { useState, useMemo } from "react";
import { LeaderboardStats } from "@/Components/Pages/Leaderboard/LeaderboardStats";
import { LeaderboardFilters } from "@/Components/Pages/Leaderboard/LeaderboardFilters";
import { LeaderboardList } from "@/Components/Pages/Leaderboard/LeaderboardList";
import { User } from "@/types/interfaces/User";
import { LeaderboardEntry } from "@/types/interfaces/User";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function LeaderboardPage() {
    // Mock current user
    const currentUserId = 5;

    // Mock data
    const [users] = useState<User[]>([
        {
            id: 1,
            username: "questmaster",
            displayName: "Quest Master",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 42,
            totalXP: 15420,
            xpToNextLevel: 1000,
            currentLevelXP: 420,
            stats: {
                agility: 85,
                strength: 78,
                intelligence: 92,
                vitality: 88,
            },
            questsCompleted: 234,
            habitsCompleted: 156,
            currentStreak: 28,
            bestStreak: 45,
            joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
            lastActive: new Date(),
            badges: ["Champion", "Streak Master"],
            rank: 1,
            weeklyXP: 1250,
            monthlyXP: 4800,
        },
        {
            id: 2,
            username: "habitforge",
            displayName: "Habit Forge",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 38,
            totalXP: 12890,
            xpToNextLevel: 950,
            currentLevelXP: 340,
            stats: {
                agility: 72,
                strength: 89,
                intelligence: 76,
                vitality: 94,
            },
            questsCompleted: 198,
            habitsCompleted: 203,
            currentStreak: 21,
            bestStreak: 38,
            joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
            badges: ["Consistency King"],
            rank: 2,
            weeklyXP: 1180,
            monthlyXP: 4200,
        },
        {
            id: 3,
            username: "levelup",
            displayName: "Level Up",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 35,
            totalXP: 11250,
            xpToNextLevel: 800,
            currentLevelXP: 250,
            stats: {
                agility: 68,
                strength: 71,
                intelligence: 88,
                vitality: 75,
            },
            questsCompleted: 167,
            habitsCompleted: 142,
            currentStreak: 15,
            bestStreak: 29,
            joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000),
            badges: ["Scholar"],
            rank: 3,
            weeklyXP: 980,
            monthlyXP: 3600,
        },
        {
            id: 4,
            username: "productivity",
            displayName: "Productivity Pro",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 32,
            totalXP: 9840,
            xpToNextLevel: 750,
            currentLevelXP: 340,
            stats: {
                agility: 75,
                strength: 65,
                intelligence: 82,
                vitality: 70,
            },
            questsCompleted: 145,
            habitsCompleted: 118,
            currentStreak: 12,
            bestStreak: 25,
            joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            badges: ["Organizer"],
            rank: 4,
            weeklyXP: 850,
            monthlyXP: 3200,
        },
        {
            id: 5,
            username: "adventurer",
            displayName: "Daily Adventurer",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 28,
            totalXP: 7650,
            xpToNextLevel: 650,
            currentLevelXP: 150,
            stats: {
                agility: 62,
                strength: 58,
                intelligence: 74,
                vitality: 68,
            },
            questsCompleted: 112,
            habitsCompleted: 89,
            currentStreak: 8,
            bestStreak: 18,
            joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 30 * 60 * 1000),
            badges: ["Explorer"],
            rank: 5,
            weeklyXP: 720,
            monthlyXP: 2800,
        },
        {
            id: 6,
            username: "grinder",
            displayName: "The Grinder",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 25,
            totalXP: 6420,
            xpToNextLevel: 580,
            currentLevelXP: 420,
            stats: {
                agility: 55,
                strength: 72,
                intelligence: 61,
                vitality: 64,
            },
            questsCompleted: 98,
            habitsCompleted: 76,
            currentStreak: 5,
            bestStreak: 15,
            joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
            badges: ["Persistent"],
            rank: 6,
            weeklyXP: 650,
            monthlyXP: 2400,
        },
        {
            id: 7,
            username: "newbie",
            displayName: "Eager Newbie",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 18,
            totalXP: 3240,
            xpToNextLevel: 460,
            currentLevelXP: 240,
            stats: {
                agility: 42,
                strength: 38,
                intelligence: 45,
                vitality: 41,
            },
            questsCompleted: 52,
            habitsCompleted: 34,
            currentStreak: 3,
            bestStreak: 7,
            joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000),
            badges: ["Newcomer"],
            rank: 7,
            weeklyXP: 420,
            monthlyXP: 1200,
        },
        {
            id: 8,
            username: "casual",
            displayName: "Casual Player",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 15,
            totalXP: 2180,
            xpToNextLevel: 320,
            currentLevelXP: 180,
            stats: {
                agility: 35,
                strength: 32,
                intelligence: 38,
                vitality: 36,
            },
            questsCompleted: 34,
            habitsCompleted: 21,
            currentStreak: 1,
            bestStreak: 4,
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000),
            badges: [],
            rank: 8,
            weeklyXP: 280,
            monthlyXP: 800,
        },
    ]);

    const [timeframe, setTimeframe] = useState<"all" | "weekly" | "monthly">(
        "all"
    );
    const [sortBy, setSortBy] = useState<"xp" | "quests" | "level" | "streak">(
        "xp"
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const currentUser = users.find((u) => u.id === currentUserId);

    const filteredAndSortedUsers = useMemo(() => {
        const filtered = users.filter(
            (user) =>
                user.displayName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort users
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "xp":
                    const aXP =
                        timeframe === "weekly"
                            ? a.weeklyXP
                            : timeframe === "monthly"
                            ? a.monthlyXP
                            : a.totalXP;
                    const bXP =
                        timeframe === "weekly"
                            ? b.weeklyXP
                            : timeframe === "monthly"
                            ? b.monthlyXP
                            : b.totalXP;
                    return bXP - aXP;
                case "quests":
                    return b.questsCompleted - a.questsCompleted;
                case "level":
                    return b.level - a.level;
                case "streak":
                    return b.currentStreak - a.currentStreak;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [users, searchTerm, sortBy, timeframe]);

    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredAndSortedUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const leaderboardEntries: LeaderboardEntry[] = paginatedUsers.map(
        (user, index) => ({
            user,
            position: startIndex + index + 1,
            change: 0, // Mock change data
            isCurrentUser: user.id === currentUserId,
        })
    );

    return (
        <AuthenticatedLayout>
            <Head title="Quests" />

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
                        users={filteredAndSortedUsers}
                        currentUser={currentUser}
                        timeframe={timeframe}
                    />

                    {/* Filters */}
                    <LeaderboardFilters
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        totalUsers={filteredAndSortedUsers.length}
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
