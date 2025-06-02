export interface Quest {
    id: number;
    title: string;
    status: "pending" | "completed" | "expired";

    description: string;
    categories: string[];
    xp: number;

    expiresAt?: Date;
    createdAt?: Date;
    completedAt?: Date;

    difficulty: "easy" | "medium" | "hard";
}
