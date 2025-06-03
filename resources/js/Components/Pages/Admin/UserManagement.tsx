import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertTriangle, Ban, Eye, MoreVertical, Search, Shield, ShieldCheck, UserX } from "lucide-react"
import type { AdminUser } from "@/types/interfaces/Admin"

interface UserManagementProps {
  users: AdminUser[]
  onBanUser: (userId: number, reason: string, duration?: number) => void
  onUnbanUser: (userId: number) => void
  onWarnUser: (userId: number, reason: string) => void
  onViewProfile: (userId: number) => void
}

export function UserManagement({ users, onBanUser, onUnbanUser, onWarnUser, onViewProfile }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [actionDialog, setActionDialog] = useState<{
    type: "ban" | "warn" | null
    user: AdminUser | null
  }>({ type: null, user: null })
  const [actionReason, setActionReason] = useState("")
  const [banDuration, setBanDuration] = useState<string>("")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusColor = (status: AdminUser["status"]) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400/20"
      case "banned":
        return "text-red-400 border-red-400/20"
      case "suspended":
        return "text-amber-400 border-amber-400/20"
      case "pending":
        return "text-blue-400 border-blue-400/20"
      default:
        return "text-gray-400 border-gray-400/20"
    }
  }

  const getRoleIcon = (role: AdminUser["role"]) => {
    switch (role) {
      case "admin":
        return <ShieldCheck className="h-4 w-4 text-red-400" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-400" />
      default:
        return null
    }
  }

  const handleAction = () => {
    if (!actionDialog.user || !actionReason.trim()) return

    if (actionDialog.type === "ban") {
      const duration = banDuration ? Number.parseInt(banDuration) : undefined
      onBanUser(actionDialog.user.id, actionReason, duration)
    } else if (actionDialog.type === "warn") {
      onWarnUser(actionDialog.user.id, actionReason)
    }

    setActionDialog({ type: null, user: null })
    setActionReason("")
    setBanDuration("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="moderator">Moderators</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* User list */}
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border-border/40 bg-card/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12 border-2 border-border/40">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base truncate">{user.displayName}</h3>
                          {getRoleIcon(user.role)}
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.reports > 0 && (
                            <Badge variant="outline" className="text-red-400 border-red-400/20">
                              {user.reports} reports
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>@{user.username}</span>
                          <span>{user.email}</span>
                          <span>Level {user.level}</span>
                          <span>{user.questsCompleted} quests</span>
                          <span>Joined {user.joinedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onViewProfile(user.id)} className="h-8">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setActionDialog({ type: "warn", user })}>
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-400" />
                            Warn User
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem onClick={() => setActionDialog({ type: "ban", user })}>
                              <Ban className="h-4 w-4 mr-2 text-red-400" />
                              Ban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => onUnbanUser(user.id)}>
                              <UserX className="h-4 w-4 mr-2 text-green-400" />
                              Unban User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewProfile(user.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-lg font-medium mb-2">No users found</div>
              <div className="text-sm">Try adjusting your search terms or filters.</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.type !== null}
        onOpenChange={(open) => !open && setActionDialog({ type: null, user: null })}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === "ban" ? "Ban User" : "Warn User"}: {actionDialog.user?.displayName}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.type === "ban"
                ? "This will prevent the user from accessing the platform."
                : "This will send a warning to the user."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder={`Enter reason for ${actionDialog.type}...`}
                rows={3}
              />
            </div>
            {actionDialog.type === "ban" && (
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                  placeholder="Leave empty for permanent ban"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog({ type: null, user: null })}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={!actionReason.trim()}
              variant={actionDialog.type === "ban" ? "destructive" : "default"}
            >
              {actionDialog.type === "ban" ? "Ban User" : "Send Warning"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
