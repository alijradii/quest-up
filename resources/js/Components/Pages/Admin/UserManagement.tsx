import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertTriangle,
    Ban,
    Eye,
    MoreVertical,
    Search,
    ShieldCheck,
    UserX,
} from "lucide-react";
import type { AdminUser } from "@/types/interfaces/Admin";

interface UserManagementProps {
    users: AdminUser[];
    onBanUser: (userId: number, reason: string, duration?: number) => void;
    onViewProfile: (userId: number) => void;
}

export function UserManagement({
    users,
    onBanUser,
    onViewProfile,
}: UserManagementProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [actionDialog, setActionDialog] = useState<{
        type: "ban" | "warn" | null;
        user: AdminUser | null;
    }>({
        type: null,
        user: null,
    });
    const [actionReason, setActionReason] = useState("");
    const [banDuration, setBanDuration] = useState("");

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleAction = () => {
        if (!actionDialog.user || !actionReason.trim()) return;

        if (actionDialog.type === "ban") {
            const duration = banDuration ? parseInt(banDuration) : undefined;
            onBanUser(actionDialog.user.id, actionReason, duration);
        }

        setActionDialog({ type: null, user: null });
        setActionReason("");
        setBanDuration("");
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                        <Select
                            value={roleFilter}
                            onValueChange={setRoleFilter}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Filter role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="user">Users</SelectItem>
                                <SelectItem value="admin">Admins</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        {filteredUsers.map((user) => (
                            <Card
                                key={user.id}
                                className="border border-border/40"
                            >
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <Avatar>
                                                <AvatarImage
                                                    src="/placeholder.svg"
                                                    alt={user.name}
                                                />
                                                <AvatarFallback>
                                                    {user.name
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold">
                                                    {user.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Level {user.level} •{" "}
                                                    {user.completed_quests}{" "}
                                                    quests
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    onViewProfile(user.id)
                                                }
                                            >
                                                <Eye className="h-4 w-4 mr-1" />{" "}
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {filteredUsers.length === 0 && (
                            <p className="text-center text-muted-foreground">
                                No users found.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={!!actionDialog.type}
                onOpenChange={(open) =>
                    !open && setActionDialog({ type: null, user: null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionDialog.type === "ban"
                                ? "Ban User"
                                : "Warn User"}
                            : {actionDialog.user?.name}
                        </DialogTitle>
                        <DialogDescription>
                            {actionDialog.type === "ban"
                                ? "Banning the user will restrict access temporarily or permanently."
                                : "Send a warning message to this user."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="reason">Reason</Label>
                            <Textarea
                                id="reason"
                                value={actionReason}
                                onChange={(e) =>
                                    setActionReason(e.target.value)
                                }
                                rows={3}
                            />
                        </div>
                        {actionDialog.type === "ban" && (
                            <div>
                                <Label htmlFor="duration">
                                    Duration (in days)
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={banDuration}
                                    onChange={(e) =>
                                        setBanDuration(e.target.value)
                                    }
                                    placeholder="Leave blank for permanent"
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setActionDialog({ type: null, user: null })
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAction}
                            disabled={!actionReason.trim()}
                        >
                            {actionDialog.type === "ban"
                                ? "Ban User"
                                : "Send Warning"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
