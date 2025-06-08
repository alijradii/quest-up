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
    AdminStats as AdminStatsType,
} from "@/types/interfaces/Admin";
import { Head } from "@inertiajs/react";

interface Props {
    users: AdminUser[];
}
export default function AdminPage({ users }: Props) {
    const [stats] = useState<AdminStatsType>({
        totalUsers: 1247,
        activeUsers: 1189,
        bannedUsers: 12,
        totalQuests: 5432,
        flaggedQuests: 8,
        reportsToday: 3,
        newUsersToday: 15,
    });

    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const handleBanUser = (
        userId: number,
        reason: string,
        duration?: number
    ) => {};

    const handleViewProfile = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
            setSelectedUser(user);
            setProfileModalOpen(true);
        }
    };

    const handleApproveQuest = (questId: number) => {};

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
                            {/* <TabsTrigger value="quests">
                                Quest Moderation
                            </TabsTrigger> */}
                        </TabsList>

                        <TabsContent value="users">
                            <UserManagement
                                users={users}
                                onBanUser={handleBanUser}
                                onViewProfile={handleViewProfile}
                            />
                        </TabsContent>

                        <TabsContent value="quests">
                            {/* <QuestModeration
                                quests={quests}
                                onApproveQuest={handleApproveQuest}
                                onRejectQuest={handleRejectQuest}
                                onDeleteQuest={handleDeleteQuest}
                                onViewQuest={handleViewQuest}
                            /> */}
                        </TabsContent>
                    </Tabs>

                    {/* User Profile Modal */}
                    <UserProfileModal
                        user={selectedUser}
                        open={profileModalOpen}
                        onOpenChange={setProfileModalOpen}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
