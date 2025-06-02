import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Swords } from "lucide-react";

export const PlayerStats: React.FC = () => {
    const stats = {
        level: 24,
        agility: 67,
        strength: 42,
        intelligence: 89,
        vitality: 53,
    };

    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Swords className="h-5 w-5 text-primary" />
                    Player Stats
                </CardTitle>
                <CardDescription>Your character progression</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                            <span className="text-3xl font-bold">
                                {stats.level}
                            </span>
                        </div>
                        <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary">
                            Level
                        </Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Agility</span>
                            <span className="text-sm font-medium">
                                {stats.agility}/100
                            </span>
                        </div>
                        <Progress
                            value={stats.agility}
                            className="h-2 bg-muted"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                                Strength
                            </span>
                            <span className="text-sm font-medium">
                                {stats.strength}/100
                            </span>
                        </div>
                        <Progress
                            value={stats.strength}
                            className="h-2 bg-muted"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                                Intelligence
                            </span>
                            <span className="text-sm font-medium">
                                {stats.intelligence}/100
                            </span>
                        </div>
                        <Progress
                            value={stats.intelligence}
                            className="h-2 bg-muted"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                                Vitality
                            </span>
                            <span className="text-sm font-medium">
                                {stats.vitality}/100
                            </span>
                        </div>
                        <Progress
                            value={stats.vitality}
                            className="h-2 bg-muted"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
