import {User} from "@/types"

export interface LeaderboardEntry {
  user: User
  position: number
  change: number // +1, -1, 0 for position change
  isCurrentUser?: boolean
}
