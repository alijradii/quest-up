import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowUpRight,
    CheckCircle2,
    Circle,
    Clock,
    AlertTriangle,
} from "lucide-react";
import { getDifficultyColor } from "@/lib/utils";
import { Quest } from "@/types/interfaces/Quest";

interface QuestItemProps {
    quest: Quest;
}

function getTimeUntilExpiration(expiresAt: Date): {
    text: string;
    isUrgent: boolean;
    isExpired: boolean;
} {
    const now = new Date();
    const timeDiff = expiresAt.getTime() - now.getTime();

    if (timeDiff <= 0) {
        return { text: "Expired", isUrgent: false, isExpired: true };
    }

    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let text: string;
    let isUrgent = false;

    if (days > 0) {
        text = `${days} day${days === 1 ? "" : "s"} left`;
        isUrgent = days <= 1;
    } else if (hours > 0) {
        text = `${hours} hour${hours === 1 ? "" : "s"} left`;
        isUrgent = true;
    } else {
        text = `${minutes} min${minutes === 1 ? "" : "s"} left`;
        isUrgent = true;
    }

    return { text, isUrgent, isExpired: false };
}

export function QuestItem({ quest }: QuestItemProps) {
    const timeInfo = quest.expire_at
        ? getTimeUntilExpiration(new Date(quest.expire_at))
        : null;

    return (
        <div className="group relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            {/* Difficulty indicator bar */}
            <div
                className={`absolute left-0 top-0 h-full w-1 ${
                    quest.difficulty === "easy"
                        ? "bg-green-400"
                        : quest.difficulty === "medium"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                }`}
            />

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1">
                    {quest.status === "complete" ? (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:text-primary/60 transition-colors" />
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3
                                className={`font-semibold text-base truncate ${
                                    quest.status === "complete"
                                        ? "line-through text-muted-foreground"
                                        : "text-foreground"
                                }`}
                            >
                                {quest.title}
                            </h3>

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Badge
                                    variant="outline"
                                    className={`text-xs px-2 py-0.5 ${getDifficultyColor(
                                        quest.difficulty
                                    )} border-current/20`}
                                >
                                    {quest.difficulty}
                                </Badge>
                            </div>
                        </div>

                        {/* Description */}
                        {quest.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                                {quest.description}
                            </p>
                        )}

                        {/* Categories and expiration info */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {quest.categories &&
                                quest.categories.slice(0, 3).map((category) => (
                                    <Badge
                                        key={category}
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5 bg-secondary/50"
                                    >
                                        {category}
                                    </Badge>
                                ))}

                            {quest.categories &&
                                quest.categories.length > 3 && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5 bg-secondary/50"
                                    >
                                        +{quest.categories.length - 3} more
                                    </Badge>
                                )}

                            {timeInfo && (
                                <div
                                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                                        timeInfo.isExpired
                                            ? "text-red-400 bg-red-400/10"
                                            : timeInfo.isUrgent
                                            ? "text-amber-400 bg-amber-400/10"
                                            : "text-muted-foreground bg-muted/50"
                                    }`}
                                >
                                    {timeInfo.isExpired ? (
                                        <AlertTriangle className="h-3 w-3" />
                                    ) : (
                                        <Clock className="h-3 w-3" />
                                    )}
                                    <span className="font-medium">
                                        {timeInfo.text}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
    );
}
