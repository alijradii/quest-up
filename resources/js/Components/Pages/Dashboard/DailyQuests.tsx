import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Quest } from "@/types/interfaces/Quest";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";

interface Props {
    quests: Quest[];
}

export const DailyQuests: React.FC<Props> = ({ quests }) => {
    const completedQuests = quests.filter((q) => q.status === "complete");

    return (
        <Card className="col-span-full lg:col-span-2 border-border/40 bg-card/50 backdrop-blur-md">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">
                            Today's Quests
                        </CardTitle>
                        <CardDescription>
                            Complete quests to gain XP and level up
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">
                            {completedQuests.length} completed
                        </span>
                        <Progress
                            value={
                                (100 * completedQuests.length) / quests.length
                            }
                            className="w-24 h-2 bg-muted"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {quests.map((quest) => (
                        <div
                            key={quest.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/40"
                        >
                            <div className="flex items-center gap-3">
                                {quest.status === "complete" ? (
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                                <div>
                                    <p
                                        className={`font-medium ${
                                            quest.status === "complete"
                                                ? "line-through text-muted-foreground"
                                                : ""
                                        }`}
                                    >
                                        {quest.title}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        {quest.categories &&
                                            quest.categories.map((c) => {
                                                return (
                                                    <Badge
                                                        variant="secondary"
                                                        className="mt-1 text-xs"
                                                    >
                                                        {c.name}
                                                    </Badge>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">View quest</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">
                    <Link href={route("quests.index")}>
                        View All Quests
                    </Link>
                </Button>
                <Button>Add New Quest</Button>
            </CardFooter>
        </Card>
    );
};
