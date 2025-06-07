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
import { User } from "@/types";

interface Props {
    user: User;
}

export const PlayerProfileCard: React.FC<Props> = ({user}) => {
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
                                {formatDistanceToNow(user.created_at, {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-muted-foreground" />
                            Current Streak:{" "}
                            <span className="text-foreground font-medium">
                                {user.current_streak}
                            </span>
                            &nbsp;days (Best: {user.best_streak})
                        </div>
                        <div className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-muted-foreground" />
                            Quests Completed:{" "}
                            <span className="text-foreground font-medium">
                                {user.completed_quests}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
