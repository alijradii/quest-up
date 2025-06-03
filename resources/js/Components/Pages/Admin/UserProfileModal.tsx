import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Ban, Calendar, Clock, FlameIcon as Fire, Shield, ShieldCheck, Target, User, Zap } from "lucide-react"
import type { AdminUser } from "@/types/interfaces/Admin"

interface UserProfileModalProps {
  user: AdminUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBanUser: (userId: number) => void
  onUnbanUser: (userId: number) => void
}

export function UserProfileModal({ user, open, onOpenChange, onBanUser, onUnbanUser }: UserProfileModalProps) {
  if (!user) return null

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
        return <ShieldCheck className="h-5 w-5 text-red-400" />
      case "moderator":
        return <Shield className="h-5 w-5 text-blue-400" />
      default:
        return <User className="h-5 w-5 text-muted-foreground" />
    }
  }

  const levelProgress = (user.totalXP % 1000) / 10 // Mock calculation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-4 border-border/40">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {user.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                {getRoleIcon(user.role)}
                <Badge variant="outline" className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>@{user.username}</p>
                <p>{user.email}</p>
                <p>Joined {user.joinedAt.toLocaleDateString()}</p>
                <p>Last active {user.lastActive.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="relative mb-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <span className="text-xl font-bold">{user.level}</span>
                </div>
                <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-xs">Level</Badge>
              </div>
              <Progress value={levelProgress} className="w-16 h-2 bg-muted" />
            </div>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border/40 bg-card/30">
              <CardContent className="p-3 text-center">
                <Target className="h-6 w-6 mx-auto mb-1 text-blue-400" />
                <div className="text-lg font-bold">{user.questsCompleted}</div>
                <div className="text-xs text-muted-foreground">Quests</div>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-card/30">
              <CardContent className="p-3 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold">{user.habitsCompleted}</div>
                <div className="text-xs text-muted-foreground">Habits</div>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-card/30">
              <CardContent className="p-3 text-center">
                <Fire className="h-6 w-6 mx-auto mb-1 text-orange-400" />
                <div className="text-lg font-bold">{user.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-card/30">
              <CardContent className="p-3 text-center">
                <Zap className="h-6 w-6 mx-auto mb-1 text-amber-400" />
                <div className="text-lg font-bold">{user.totalXP.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </CardContent>
            </Card>
          </div>

          {/* Character Stats */}
          <Card className="border-border/40 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Character Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">🏃 Agility</span>
                  <span className="text-sm">{user.stats.agility}/100</span>
                </div>
                <Progress value={user.stats.agility} className="h-2"/>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">💪 Strength</span>
                  <span className="text-sm">{user.stats.strength}/100</span>
                </div>
                <Progress value={user.stats.strength} className="h-2"/>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">🧠 Intelligence</span>
                  <span className="text-sm">{user.stats.intelligence}/100</span>
                </div>
                <Progress value={user.stats.intelligence} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">❤️ Vitality</span>
                  <span className="text-sm">{user.stats.vitality}/100</span>
                </div>
                <Progress value={user.stats.vitality} className="h-2"/>
              </div>
            </CardContent>
          </Card>

          {/* Moderation Info */}
          {(user.reports > 0 || user.warnings > 0 || user.banHistory.length > 0) && (
            <Card className="border-border/40 bg-card/30">
              <CardHeader>
                <CardTitle className="text-lg text-red-400">Moderation History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-red-400">{user.reports}</div>
                    <div className="text-xs text-muted-foreground">Reports</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-400">{user.warnings}</div>
                    <div className="text-xs text-muted-foreground">Warnings</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-400">{user.banHistory.length}</div>
                    <div className="text-xs text-muted-foreground">Bans</div>
                  </div>
                </div>

                {user.banHistory.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Actions:</h4>
                    {user.banHistory.slice(0, 3).map((ban) => (
                      <div key={ban.id} className="p-2 bg-red-400/10 border border-red-400/20 rounded text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">{ban.type}</span> by {ban.adminName}
                            <p className="text-muted-foreground">{ban.reason}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{ban.createdAt.toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {user.status === "active" ? (
              <Button variant="destructive" onClick={() => onBanUser(user.id)} className="flex items-center gap-2">
                <Ban className="h-4 w-4" />
                Ban User
              </Button>
            ) : (
              <Button variant="outline" onClick={() => onUnbanUser(user.id)} className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Unban User
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
