import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Flame, Medal, User2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const PlayerProfileCard: React.FC = () => {
    const user = {
        id: 8,
        username: "casual",
        displayName: "Casual Player",
        avatar: "/placeholder.svg?height=48&width=48",
        level: 15,
        totalXP: 2180,
        xpToNextLevel: 320,
        currentLevelXP: 180,
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
    };

    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User2 className="h-5 w-5 text-primary" />
                    Player Profile
                </CardTitle>
                <CardDescription>
                    Basic information and account activity
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-4 items-center mt-8">
                    <div className="flex items-center justify-center">
                        <div className="relative mb-7">
                            <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                                <span className="text-3xl font-bold">
                                    {user.level}
                                </span>
                            </div>
                            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary">
                                Level
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-muted-foreground" />
                            Joined:{" "}
                            <span className="text-foreground font-medium">
                                {formatDistanceToNow(user.joinedAt, {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-muted-foreground" />
                            Current Streak:{" "}
                            <span className="text-foreground font-medium">
                                {user.currentStreak}
                            </span>
                            &nbsp;days (Best: {user.bestStreak})
                        </div>
                        <div className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-muted-foreground" />
                            Quests Completed:{" "}
                            <span className="text-foreground font-medium">
                                {user.questsCompleted}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-muted-foreground" />
                            Last Active:{" "}
                            <span className="text-foreground font-medium">
                                {formatDistanceToNow(user.lastActive, {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
