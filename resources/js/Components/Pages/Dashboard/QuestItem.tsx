import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, CheckCircle2, Circle } from "lucide-react";
import { cn, getDifficultyColor } from "@/lib/utils";
import { Quest } from "@/types/interfaces/Quest";

interface QuestItemProps {
    quest: Quest;
}

export function QuestItem({ quest }: QuestItemProps) {
    return (
        <div
            key={quest.id}
            className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/40"
        >
            <div className="flex items-center gap-3">
                {quest.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                    <p
                        className={`font-medium ${
                            quest.status === "completed"
                                ? "line-through text-muted-foreground"
                                : ""
                        }`}
                    >
                        {quest.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        {quest.categories.slice(0, 2).map((category) => (
                            <Badge
                                key={category}
                                variant="secondary"
                                className="text-xs"
                            >
                                {category}
                            </Badge>
                        ))}
                        <span
                            className={cn(
                                "text-xs font-medium ",
                                getDifficultyColor(quest.difficulty)
                            )}
                        >
                            {quest.difficulty}
                        </span>
                        {quest.expiresAt && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                    {quest.expiresAt.toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">
                    +{quest.xp} XP
                </span>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">View quest</span>
                </Button>
            </div>
        </div>
    );
}
