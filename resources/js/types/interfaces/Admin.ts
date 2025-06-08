import { User } from "..";
import { Quest } from "./Quest";

export interface AdminUser {
    id: number;
    name: string;
    role: "user" | "admin";

    level: number;
    completed_quests: number;
    current_streak: number;
    best_streak: number;

    last_login: string | null;
    email: string;
    email_verified_at?: string;

    created_at: string;
    updated_at: string;
    quests: Quest[];
}

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    bannedUsers: number;
    totalQuests: number;
    flaggedQuests: number;
    reportsToday: number;
    newUsersToday: number;
}
