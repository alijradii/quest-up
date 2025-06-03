import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ban, Flag, Users, UserCheck } from "lucide-react"
import type { AdminStats } from "@/types/interfaces/Admin"

interface AdminStatsProps {
  stats: AdminStats
}

export function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        subtitle={`${stats.newUsersToday} new today`}
      />
      <StatCard
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        icon={<UserCheck className="h-4 w-4 text-green-400" />}
        valueClassName="text-green-400"
        subtitle={`${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total`}
      />
      <StatCard
        title="Banned Users"
        value={stats.bannedUsers}
        icon={<Ban className="h-4 w-4 text-red-400" />}
        valueClassName="text-red-400"
        subtitle="require attention"
      />
      <StatCard
        title="Flagged Content"
        value={stats.flaggedQuests}
        icon={<Flag className="h-4 w-4 text-amber-400" />}
        valueClassName="text-amber-400"
        subtitle="pending review"
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
        <div className={`text-2xl font-bold ${valueClassName}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
