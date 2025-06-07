export interface Quest {
    id: number;
    user_id: number;

    title: string;
    status: "pending" | "complete" | "expired";

    description: string | null;
    difficulty: "easy" | "medium" | "hard";

    completedAt: string | null;
    expire_at: string | null;
    created_at: string;
    updated_at: string;

    categories?: string[];
}
