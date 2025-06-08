import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { getDifficultyColor, getStatusColor } from "@/lib/utils";
import { Quest } from "@/types/interfaces/Quest";
import { useForm } from "@inertiajs/react";

interface QuestCardProps {
    quest: Quest;
    setNewQuest: (quest: Partial<Quest>) => void;
    setIsCreateDialogOpen: (isOpen: boolean) => void;
}

export function QuestCard({
    quest,
    setNewQuest,
    setIsCreateDialogOpen,
}: QuestCardProps) {
    const { delete: destory } = useForm({ id: "" });

    const submitDelete = (e: React.FormEvent) => {
        destory(route("quests.delete", quest.id));
    };

    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        <Checkbox
                            checked={quest.status === "complete"}
                            className="mt-1"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3
                                    className={`font-semibold ${
                                        quest.status === "complete"
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {quest.title}
                                </h3>
                                <Badge
                                    variant="outline"
                                    className={getStatusColor(quest.status)}
                                >
                                    {quest.status}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={getDifficultyColor(
                                        quest.difficulty
                                    )}
                                >
                                    {quest.difficulty}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                                {quest.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                {quest.categories &&
                                    quest.categories.map((category) => (
                                        <Badge
                                            key={category.name}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {category.name}
                                        </Badge>
                                    ))}
                                {quest.created_at && (
                                    <span className="text-xs text-muted-foreground">
                                        Created:{" "}
                                        {new Date(
                                            quest.created_at
                                        ).toLocaleTimeString()}
                                    </span>
                                )}

                                {quest.expire_at && (
                                    <span className="text-xs text-muted-foreground">
                                        Expires:{" "}
                                        {new Date(
                                            quest.expire_at
                                        ).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                setNewQuest(quest);
                                setIsCreateDialogOpen(true);
                            }}
                        >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit quest</span>
                        </Button>
                        <form onSubmit={submitDelete}>
                            <input
                                type="hidden"
                                name="_method"
                                value="DELETE"
                            />

                            <Button
                                type="submit"
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete quest</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
