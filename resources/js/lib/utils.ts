import { Quest } from "@/types/interfaces/Quest";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function getDifficultyColor(difficulty: Quest["difficulty"]) {
    if (difficulty == "easy") return "text-green-400";
    if (difficulty == "medium") return "text-amber-400";
    if (difficulty == "hard") return "text-red-400";
}

export function getStatusColor(status: Quest["status"]) {
    switch (status) {
        case "completed":
            return "text-green-400 border-green-400/20";
        case "pending":
            return "text-blue-400 border-blue-400/20";
        case "expired":
            return "text-red-400 border-red-400/20";
        default:
            return "text-gray-400 border-gray-400/20";
    }
}
