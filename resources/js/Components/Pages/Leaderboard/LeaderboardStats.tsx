import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, FlameIcon as Fire, Target, Trophy, TrendingUp, Users } from "lucide-react"
import type { User } from "@/types/interfaces/User"

interface LeaderboardStatsProps {
  users: User[]
  currentUser?: User
  timeframe: "all" | "weekly" | "monthly"
}

export function LeaderboardStats({ users, currentUser, timeframe }: LeaderboardStatsProps) {
  const topUser = users[0]
  const totalQuests = users.reduce((sum, user) => sum + user.questsCompleted, 0)
  const totalXP = users.reduce((sum, user) => {
    switch (timeframe) {
      case "weekly":
        return sum + user.weeklyXP
      case "monthly":
        return sum + user.monthlyXP
      default:
        return sum + user.totalXP
    }
  }, 0)
  const averageLevel = Math.round(users.reduce((sum, user) => sum + user.level, 0) / users.length)
  const longestStreak = Math.max(...users.map((user) => user.bestStreak))

  const currentUserRank = currentUser ? users.findIndex((u) => u.id === currentUser.id) + 1 : null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
      <StatCard
        title="Total Adventurers"
        value={users.length}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Leading Champion"
        value={topUser?.displayName || "None"}
        icon={<Crown className="h-4 w-4 text-yellow-400" />}
        valueClassName="text-yellow-400 text-lg"
        subtitle={`Level ${topUser?.level || 0}`}
      />
      <StatCard
        title="Total Quests"
        value={totalQuests.toLocaleString()}
        icon={<Target className="h-4 w-4 text-blue-400" />}
        valueClassName="text-blue-400"
        subtitle="completed"
      />
      <StatCard
        title="Longest Streak"
        value={longestStreak}
        icon={<Fire className="h-4 w-4 text-orange-400" />}
        valueClassName="text-orange-400"
        subtitle="days"
      />
      <StatCard
        title={currentUserRank ? "Your Rank" : "Average Level"}
        value={currentUserRank || averageLevel}
        icon={
          currentUserRank ? (
            <Trophy className="h-4 w-4 text-primary" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-400" />
          )
        }
        valueClassName={currentUserRank ? "text-primary" : "text-green-400"}
        subtitle={currentUserRank ? `of ${users.length}` : "across all users"}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  valueClassName?: string
  subtitle?: string
}

function StatCard({ title, value, icon, valueClassName = "", subtitle }: StatCardProps) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold truncate ${valueClassName}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
