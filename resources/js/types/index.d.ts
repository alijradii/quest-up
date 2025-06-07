export interface User {
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
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
