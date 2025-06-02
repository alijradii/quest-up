import { useState, useMemo } from "react";
import { QuestStatistics } from "@/Components/Pages/Quests/QuestStatistics";
import { QuestFilters } from "@/Components/Pages/Quests/QuestFilters";
import { QuestList } from "@/Components/Pages/Quests/QuestList";
import { QuestForm } from "@/Components/Pages/Quests/QuestForm";
import { Quest } from "@/types/interfaces/Quest";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function QuestLogs() {
    // Mock data
    const [quests, setQuests] = useState<Quest[]>([
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
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterPeriod, setFilterPeriod] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterDifficulty, setFilterDifficulty] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

    // New quest form state
    const [newQuest, setNewQuest] = useState({
        title: "",
        description: "",
        categories: [] as string[],
        xp: 50,
        difficulty: "medium" as Quest["difficulty"],
        expiresAt: "",
    });

    const filteredAndSortedQuests = useMemo(() => {
        const filtered = quests.filter((quest) => {
            // Search filter
            const matchesSearch =
                quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quest.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                quest.categories.some((cat) =>
                    cat.toLowerCase().includes(searchTerm.toLowerCase())
                );

            // Period filter
            let matchesPeriod = true;
            if (filterPeriod !== "all" && quest.createdAt) {
                const now = new Date();
                const questDate = quest.createdAt;

                switch (filterPeriod) {
                    case "today":
                        matchesPeriod =
                            questDate.toDateString() === now.toDateString();
                        break;
                    case "week":
                        const weekAgo = new Date(
                            now.getTime() - 7 * 24 * 60 * 60 * 1000
                        );
                        matchesPeriod = questDate >= weekAgo;
                        break;
                    case "month":
                        const monthAgo = new Date(
                            now.getTime() - 30 * 24 * 60 * 60 * 1000
                        );
                        matchesPeriod = questDate >= monthAgo;
                        break;
                }
            }

            // Status filter
            const matchesStatus =
                filterStatus === "all" || quest.status === filterStatus;

            // Difficulty filter
            const matchesDifficulty =
                filterDifficulty === "all" ||
                quest.difficulty === filterDifficulty;

            return (
                matchesSearch &&
                matchesPeriod &&
                matchesStatus &&
                matchesDifficulty
            );
        });

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "createdAt":
                    return (
                        (b.createdAt?.getTime() || 0) -
                        (a.createdAt?.getTime() || 0)
                    );
                case "xp":
                    return b.xp - a.xp;
                case "difficulty":
                    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                    return (
                        difficultyOrder[b.difficulty] -
                        difficultyOrder[a.difficulty]
                    );
                case "title":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [
        quests,
        searchTerm,
        filterPeriod,
        filterStatus,
        filterDifficulty,
        sortBy,
    ]);

    const toggleQuestStatus = (questId: number) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          status:
                              quest.status === "completed"
                                  ? "pending"
                                  : ("completed" as Quest["status"]),
                      }
                    : quest
            )
        );
    };

    const createQuest = () => {
        const quest: Quest = {
            id: Math.max(...quests.map((q) => q.id)) + 1,
            title: newQuest.title,
            description: newQuest.description,
            categories: newQuest.categories,
            xp: newQuest.xp,
            difficulty: newQuest.difficulty,
            status: "pending",
            createdAt: new Date(),
            expiresAt: newQuest.expiresAt
                ? new Date(newQuest.expiresAt)
                : undefined,
        };

        setQuests((prev) => [quest, ...prev]);
        setNewQuest({
            title: "",
            description: "",
            categories: [],
            xp: 50,
            difficulty: "medium",
            expiresAt: "",
        });
        setIsCreateDialogOpen(false);
    };

    const deleteQuest = (questId: number) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== questId));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Quests" />
            {/* <div className="fixed w-full h-full z-0 blur-md opacity-30" style={{background: "url(assets/system.webp"}}/> */}

            <div className="bg-background text-foreground flex flex-col w-full h-full p-6 z-50">
                <QuestStatistics quests={quests} />

                <QuestFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterPeriod={filterPeriod}
                    setFilterPeriod={setFilterPeriod}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterDifficulty={filterDifficulty}
                    setFilterDifficulty={setFilterDifficulty}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onCreateQuest={() => setIsCreateDialogOpen(true)}
                />

                <QuestList
                    quests={filteredAndSortedQuests}
                    onToggleStatus={toggleQuestStatus}
                    onDeleteQuest={deleteQuest}
                    onCreateQuest={() => setIsCreateDialogOpen(true)}
                />

                <QuestForm
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                    onSubmit={createQuest}
                    quest={newQuest}
                    setQuest={setNewQuest}
                />
            </div>
        </AuthenticatedLayout>
    );
}
