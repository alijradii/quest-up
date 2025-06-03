import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Crown, FlameIcon as Fire, Target, TrendingDown, TrendingUp, Trophy, Zap } from "lucide-react"
import type { LeaderboardEntry } from "@/types/interfaces/User"

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  timeframe: "all" | "weekly" | "monthly"
}

export function LeaderboardCard({ entry, timeframe }: LeaderboardCardProps) {
  const { user, position, change, isCurrentUser } = entry

  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{pos}</span>
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-400" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-400" />
    return <div className="w-4 h-4" />
  }

  const getXPForTimeframe = () => {
    switch (timeframe) {
      case "weekly":
        return user.weeklyXP
      case "monthly":
        return user.monthlyXP
      default:
        return user.totalXP
    }
  }

  const levelProgress = (user.currentLevelXP / user.xpToNextLevel) * 100

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isCurrentUser
          ? "border-primary/50 bg-primary/5 hover:border-primary hover:shadow-primary/20"
          : "border-border/40 bg-card/50 hover:border-primary/20 hover:shadow-primary/5"
      } backdrop-blur-sm`}
    >
      {/* Position indicator */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          position <= 3 ? "bg-gradient-to-b from-yellow-400 to-amber-500" : "bg-primary/50"
        }`}
      />

      {/* Current user glow */}
      {isCurrentUser && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
      )}

      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Position and change */}
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="flex items-center justify-center w-10 h-10">{getPositionIcon(position)}</div>
            <div className="flex items-center gap-1">
              {getChangeIcon(change)}
              {change !== 0 && <span className="text-xs text-muted-foreground">{Math.abs(change)}</span>}
            </div>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 border-2 border-border/40">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.displayName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base truncate">{user.displayName}</h3>
                {isCurrentUser && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 text-primary border-primary/20">
                    You
                  </Badge>
                )}
                {user.badges.length > 0 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {user.badges[0]}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>@{user.username}</span>
                <div className="flex items-center gap-1">
                  <Fire className="h-3 w-3 text-orange-400" />
                  <span>{user.currentStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level and progress */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-3 border-primary flex items-center justify-center">
                <span className="text-xl font-bold">{user.level}</span>
              </div>
              <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-xs px-2">Level</Badge>
            </div>
            <div className="w-full">
              <Progress
                value={levelProgress}
                className="h-1.5 bg-muted"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex flex-col gap-2 min-w-[120px]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Quests:</span>
              <span className="font-medium">{user.questsCompleted}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">XP:</span>
              <span className="font-medium text-amber-400">{getXPForTimeframe().toLocaleString()}</span>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="md:hidden flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user.questsCompleted}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">{getXPForTimeframe().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
