export interface Quest {
    id: number;
    title: string;
    status: "pending" | "completed" | "expired";
    categories: string[]
    xp: number;
}
