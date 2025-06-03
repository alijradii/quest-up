import { useState } from "react";
import { AdminStats } from "@/Components/Pages/Admin/AdminStats";
import { UserManagement } from "@/Components/Pages/Admin/UserManagement";
import { QuestModeration } from "@/Components/Pages/Admin/QuestModeration";
import { UserProfileModal } from "@/Components/Pages/Admin/UserProfileModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type {
    AdminUser,
    AdminQuest,
    AdminStats as AdminStatsType,
} from "@/types/interfaces/Admin";
import { Head } from "@inertiajs/react";

export default function AdminPage() {
    // Mock data
    const [stats] = useState<AdminStatsType>({
        totalUsers: 1247,
        activeUsers: 1189,
        bannedUsers: 12,
        totalQuests: 5432,
        flaggedQuests: 8,
        reportsToday: 3,
        newUsersToday: 15,
    });

    const [users, setUsers] = useState<AdminUser[]>([
        {
            id: 1,
            username: "questmaster",
            displayName: "Quest Master",
            email: "questmaster@example.com",
            avatar: "/placeholder.svg?height=48&width=48",
            level: 42,
            totalXP: 15420,
            xpToNextLevel: 1000,
            currentLevelXP: 420,
            stats: {
                agility: 85,
                strength: 78,
                intelligence: 92,
                vitality: 88,
            },
            questsCompleted: 234,
            habitsCompleted: 156,
            currentStreak: 28,
            joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
            lastActive: new Date(),
            status: "active",
            role: "user",
            reports: 0,
            warnings: 0,
            banHistory: [],
        },
        {
            id: 2,
            username: "troublemaker",
            displayName: "Trouble Maker",
            email: "trouble@example.com",
            level: 15,
            totalXP: 2180,
            xpToNextLevel: 320,
            currentLevelXP: 180,
            stats: {
                agility: 35,
                strength: 32,
                intelligence: 38,
                vitality: 36,
            },
            questsCompleted: 34,
            habitsCompleted: 21,
            currentStreak: 1,
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000),
            status: "banned",
            role: "user",
            reports: 5,
            warnings: 3,
            banHistory: [
                {
                    id: 1,
                    userId: 2,
                    adminId: 1,
                    adminName: "Admin",
                    reason: "Inappropriate content",
                    type: "ban",
                    duration: 7,
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                    isActive: true,
                },
            ],
        },
        // Add more mock users...
    ]);

    const [quests, setQuests] = useState<AdminQuest[]>([
        {
            id: 1,
            title: "Complete project proposal",
            description: "Finish the Q1 project proposal for the new client",
            userId: 1,
            userName: "Quest Master",
            status: "completed",
            categories: ["work", "important"],
            xp: 100,
            difficulty: "hard",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            reports: 0,
        },
        {
            id: 2,
            title: "Inappropriate quest content",
            description:
                "This quest contains inappropriate content that violates community guidelines",
            userId: 2,
            userName: "Trouble Maker",
            status: "flagged",
            categories: ["spam"],
            xp: 50,
            difficulty: "easy",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            reports: 3,
            flagReason: "Contains inappropriate language and spam content",
        },
        // Add more mock quests...
    ]);

    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const handleBanUser = (
        userId: number,
        reason: string,
        duration?: number
    ) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          status: "banned" as const,
                          banHistory: [
                              ...user.banHistory,
                              {
                                  id: Date.now(),
                                  userId,
                                  adminId: 1,
                                  adminName: "Current Admin",
                                  reason,
                                  type: "ban" as const,
                                  duration,
                                  createdAt: new Date(),
                                  expiresAt: duration
                                      ? new Date(
                                            Date.now() +
                                                duration * 24 * 60 * 60 * 1000
                                        )
                                      : undefined,
                                  isActive: true,
                              },
                          ],
                      }
                    : user
            )
        );
    };

    const handleUnbanUser = (userId: number) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          status: "active" as const,
                          banHistory: user.banHistory.map((ban) => ({
                              ...ban,
                              isActive: false,
                          })),
                      }
                    : user
            )
        );
    };

    const handleWarnUser = (userId: number, reason: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          warnings: user.warnings + 1,
                          banHistory: [
                              ...user.banHistory,
                              {
                                  id: Date.now(),
                                  userId,
                                  adminId: 1,
                                  adminName: "Current Admin",
                                  reason,
                                  type: "warning" as const,
                                  createdAt: new Date(),
                                  isActive: true,
                              },
                          ],
                      }
                    : user
            )
        );
    };

    const handleViewProfile = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
            setSelectedUser(user);
            setProfileModalOpen(true);
        }
    };

    const handleApproveQuest = (questId: number) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? { ...quest, status: "pending" as const }
                    : quest
            )
        );
    };

    const handleRejectQuest = (questId: number, reason: string) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== questId));
    };

    const handleDeleteQuest = (questId: number) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== questId));
    };

    const handleViewQuest = (questId: number) => {
        // Implementation for viewing quest details
        console.log("View quest:", questId);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="bg-background text-foreground flex flex-col w-full h-full p-6 z-50">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl font-bold">
                                    Admin Dashboard
                                </h1>
                                <p className="text-muted-foreground">
                                    Manage users, moderate content, and oversee
                                    platform activity
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <Tabs defaultValue="users" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="users">
                                User Management
                            </TabsTrigger>
                            <TabsTrigger value="quests">
                                Quest Moderation
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="users">
                            <UserManagement
                                users={users}
                                onBanUser={handleBanUser}
                                onUnbanUser={handleUnbanUser}
                                onWarnUser={handleWarnUser}
                                onViewProfile={handleViewProfile}
                            />
                        </TabsContent>

                        <TabsContent value="quests">
                            <QuestModeration
                                quests={quests}
                                onApproveQuest={handleApproveQuest}
                                onRejectQuest={handleRejectQuest}
                                onDeleteQuest={handleDeleteQuest}
                                onViewQuest={handleViewQuest}
                            />
                        </TabsContent>
                    </Tabs>

                    {/* User Profile Modal */}
                    <UserProfileModal
                        user={selectedUser}
                        open={profileModalOpen}
                        onOpenChange={setProfileModalOpen}
                        onBanUser={(userId) =>
                            handleBanUser(userId, "Banned from profile view")
                        }
                        onUnbanUser={handleUnbanUser}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
