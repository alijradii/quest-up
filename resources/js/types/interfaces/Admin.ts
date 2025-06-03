export interface AdminUser {
  id: number
  username: string
  displayName: string
  email: string
  avatar?: string
  level: number
  totalXP: number
  questsCompleted: number
  habitsCompleted: number
  currentStreak: number
  joinedAt: Date
  lastActive: Date
  status: "active" | "banned" | "suspended" | "pending"
  role: "user" | "moderator" | "admin"
  reports: number
  warnings: number
  banHistory: BanRecord[]
  stats: {
    agility: number
    strength: number
    intelligence: number
    vitality: number
  }
}

export interface BanRecord {
  id: number
  userId: number
  adminId: number
  adminName: string
  reason: string
  type: "ban" | "suspension" | "warning"
  duration?: number // in days, null for permanent
  createdAt: Date
  expiresAt?: Date
  isActive: boolean
}

export interface AdminQuest {
  id: number
  title: string
  description: string
  userId: number
  userName: string
  status: "pending" | "completed" | "expired" | "flagged"
  categories: string[]
  xp: number
  difficulty: "easy" | "medium" | "hard"
  createdAt: Date
  expiresAt?: Date
  reports: number
  flagReason?: string
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  bannedUsers: number
  totalQuests: number
  flaggedQuests: number
  reportsToday: number
  newUsersToday: number
}
