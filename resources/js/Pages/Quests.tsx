import { useMemo, useState } from "react";
import { QuestStatistics } from "@/Components/Pages/Quests/QuestStatistics";
import { QuestFilters } from "@/Components/Pages/Quests/QuestFilters";
import { QuestList } from "@/Components/Pages/Quests/QuestList";
import { QuestForm } from "@/Components/Pages/Quests/QuestForm";
import { Quest } from "@/types/interfaces/Quest";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { User } from "@/types";

interface Props {
    user: User;
    quests: Quest[];
}

export default function QuestLogs({ quests, user }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPeriod, setFilterPeriod] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterDifficulty, setFilterDifficulty] = useState("all");
    const [sortBy, setSortBy] = useState("created_at");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const [newQuest, setNewQuest] = useState<Partial<Quest>>({
        title: "",
        description: "",
        categories: [],
        difficulty: "medium" as Quest["difficulty"],
        expire_at: "",
    });

    const filteredAndSortedQuests = useMemo(() => {
        const filtered = quests.filter((quest) => {
            const lowerSearch = searchTerm.toLowerCase();
            const matchesSearch =
                quest.title.toLowerCase().includes(lowerSearch) ||
                (quest.description?.toLowerCase().includes(lowerSearch) ??
                    false) ||
                (quest.categories?.some((cat) =>
                    cat.name.toLowerCase().includes(lowerSearch)
                ) ??
                    false);

            let matchesPeriod = true;
            if (filterPeriod !== "all") {
                const now = new Date();
                const createdAt = new Date(quest.created_at);

                switch (filterPeriod) {
                    case "today":
                        matchesPeriod =
                            createdAt.toDateString() === now.toDateString();
                        break;
                    case "week": {
                        const weekAgo = new Date(
                            now.getTime() - 7 * 24 * 60 * 60 * 1000
                        );
                        matchesPeriod = createdAt >= weekAgo;
                        break;
                    }
                    case "month": {
                        const monthAgo = new Date(
                            now.getTime() - 30 * 24 * 60 * 60 * 1000
                        );
                        matchesPeriod = createdAt >= monthAgo;
                        break;
                    }
                }
            }

            const matchesStatus =
                filterStatus === "all" || quest.status === filterStatus;
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

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "created_at":
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
                case "difficulty": {
                    const order = { easy: 1, medium: 2, hard: 3 };
                    return order[b.difficulty] - order[a.difficulty];
                }
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

    return (
        <AuthenticatedLayout>
            <Head title="Quests" />
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
                    onCreateQuest={() => {
                        setNewQuest({
                            title: "",
                            description: "",
                            categories: [],
                            difficulty: "medium" as Quest["difficulty"],
                            expire_at: "",
                        });
                        setIsCreateDialogOpen(true);
                    }}
                />

                <QuestList
                    quests={filteredAndSortedQuests}
                    setIsCreateDialogOpen={setIsCreateDialogOpen}
                    setNewQuest={setNewQuest}
                />

                <QuestForm
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                    quest={newQuest}
                    setQuest={setNewQuest}
                />
            </div>
        </AuthenticatedLayout>
    );
}
