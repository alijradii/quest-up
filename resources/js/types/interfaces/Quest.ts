export interface Quest {
    id: number;
    user_id: number;

    title: string;
    status: "pending" | "complete" | "expired";

    description: string | null;
    difficulty: "easy" | "medium" | "hard";

    completedAt: string | null;
    expireAt: string | null;
    createdAt: string;
    updatedAt: string;

    categories?: string[];
}
