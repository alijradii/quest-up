import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

interface LeaderboardFiltersProps {
    timeframe: "all" | "weekly" | "monthly";
    setTimeframe: (value: "all" | "weekly" | "monthly") => void;
    sortBy: "xp" | "quests" | "level" | "streak";
    setSortBy: (value: "xp" | "quests" | "level" | "streak") => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    totalUsers: number;
}

export function LeaderboardFilters({
    searchTerm,
    setSearchTerm,
    totalUsers,
}: LeaderboardFiltersProps) {
    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <CardTitle>Leaderboard</CardTitle>
                        <span className="text-sm text-muted-foreground">
                            ({totalUsers} adventurers)
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search adventurers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 w-64"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
