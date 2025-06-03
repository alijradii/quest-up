export interface User {
  id: number
  username: string
  displayName: string
  avatar?: string
  level: number
  totalXP: number
  xpToNextLevel: number
  currentLevelXP: number
  stats: {
    agility: number
    strength: number
    intelligence: number
    vitality: number
  }
  questsCompleted: number
  habitsCompleted: number
  currentStreak: number
  bestStreak: number
  joinedAt: Date
  lastActive: Date
  badges: string[]
  rank: number
  weeklyXP: number
  monthlyXP: number
}

export interface LeaderboardEntry {
  user: User
  position: number
  change: number // +1, -1, 0 for position change
  isCurrentUser?: boolean
}
