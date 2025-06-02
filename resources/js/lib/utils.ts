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
