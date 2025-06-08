import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
    Calendar,
    Flame,
    Star,
    Zap,
    Mail,
    Clock,
    CheckCircle,
    Hourglass,
} from "lucide-react";
import type { AdminUser } from "@/types/interfaces/Admin";
import { usePage } from "@inertiajs/react";

interface UserProfileModalProps {
    user: AdminUser | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserProfileModal({
    user,
    open,
    onOpenChange,
}: UserProfileModalProps) {
    if (!user) return null;

    const authUser = usePage().props.auth.user;
    const disabled = authUser.id === user.id;

    const levelProgress = user.level % 100; // Simplified logic

    const statusColor = {
        complete: "text-green-600",
        pending: "text-yellow-500",
        expired: "text-red-500",
    } as const;

    const difficultyColor = {
        easy: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-800",
        hard: "bg-red-100 text-red-700",
    } as const;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20 border-4 border-border/40">
                            <AvatarImage
                                src="/placeholder.svg"
                                alt={user.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-2xl font-bold">
                                    {user.name}
                                </h2>
                                <Badge variant="outline">{user.role}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>
                                    <Mail className="inline-block h-4 w-4 mr-1" />{" "}
                                    {user.email}
                                </p>
                                {user.email_verified_at && (
                                    <p>
                                        Email Verified:{" "}
                                        {new Date(
                                            user.email_verified_at
                                        ).toLocaleDateString()}
                                    </p>
                                )}
                                {user.last_login && (
                                    <p>
                                        Last Login:{" "}
                                        {new Date(
                                            user.last_login
                                        ).toLocaleDateString()}
                                    </p>
                                )}
                                <p>
                                    Joined:{" "}
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="relative mb-2">
                                <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                                    <span className="text-xl font-bold">
                                        {user.level}
                                    </span>
                                </div>
                                <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-xs">
                                    Level
                                </Badge>
                            </div>
                            <Progress
                                value={levelProgress}
                                className="w-16 h-2 bg-muted"
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="border-border/40 bg-card/30">
                            <CardContent className="p-3 text-center">
                                <Zap className="h-6 w-6 mx-auto mb-1 text-yellow-400" />
                                <div className="text-lg font-bold">
                                    {user.current_streak}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Current Streak
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/40 bg-card/30">
                            <CardContent className="p-3 text-center">
                                <Flame className="h-6 w-6 mx-auto mb-1 text-orange-500" />
                                <div className="text-lg font-bold">
                                    {user.best_streak}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Best Streak
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/40 bg-card/30">
                            <CardContent className="p-3 text-center">
                                <Star className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                                <div className="text-lg font-bold">
                                    {user.completed_quests}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Completed Quests
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/40 bg-card/30">
                            <CardContent className="p-3 text-center">
                                <Calendar className="h-6 w-6 mx-auto mb-1 text-green-500" />
                                <div className="text-lg font-bold">
                                    {new Date(
                                        user.updated_at
                                    ).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Last Updated
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quest History */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Quest History</h3>

                        {user.quests.length === 0 ? (
                            <p className="text-muted-foreground text-sm">
                                This user has no quest history.
                            </p>
                        ) : (
                            <div className="grid gap-3 max-h-72 overflow-y-auto pr-1">
                                {user.quests.map((quest) => (
                                    <Card
                                        key={quest.id}
                                        className="bg-muted/10 border-border/40"
                                    >
                                        <CardContent className="p-3 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    {quest.title}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        statusColor[
                                                            quest.status
                                                        ]
                                                    }
                                                >
                                                    {quest.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        quest.status.slice(1)}
                                                </Badge>
                                            </div>
                                            {quest.description && (
                                                <p className="text-sm text-muted-foreground">
                                                    {quest.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 flex-wrap text-xs mt-1">
                                                <span
                                                    className={`px-2 py-0.5 rounded ${
                                                        difficultyColor[
                                                            quest.difficulty
                                                        ]
                                                    }`}
                                                >
                                                    {quest.difficulty.toUpperCase()}
                                                </span>
                                                {quest.categories?.map(
                                                    (cat, i) => (
                                                        <Badge
                                                            key={i}
                                                            className="bg-secondary text-secondary-foreground"
                                                        >
                                                            {cat.name}
                                                        </Badge>
                                                    )
                                                )}
                                                {quest.status === "complete" &&
                                                    quest.completedAt && (
                                                        <span className="flex items-center gap-1 text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                            {new Date(
                                                                quest.completedAt
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                {quest.status === "expired" &&
                                                    quest.expire_at && (
                                                        <span className="flex items-center gap-1 text-red-600">
                                                            <Clock className="h-4 w-4" />
                                                            Expired{" "}
                                                            {new Date(
                                                                quest.expire_at
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <form method="POST" action={route("admin.ban", user.id)}>
                            <Button disabled={disabled} variant="destructive" type="submit">
                                Ban User
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
