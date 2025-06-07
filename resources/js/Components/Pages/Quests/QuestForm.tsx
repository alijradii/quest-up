import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Quest } from "@/types/interfaces/Quest";

interface QuestFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    quest: Partial<Quest>;
    setQuest: React.Dispatch<React.SetStateAction<Partial<Quest>>>;
    isEditing?: boolean;
}

export function QuestForm({
    open,
    onOpenChange,
    quest,
    setQuest,
}: QuestFormProps) {
    const isEditing = quest.id !== null && quest.id !== undefined;
    const [newCategory, setNewCategory] = useState("");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: quest.title || "",
        description: quest.description || "",
        difficulty: quest.difficulty || "medium",
        categories: quest.categories || [],
        expire_at: quest.expire_at || "",
    });

    useEffect(() => {
        if (open) {
            setData({
                title: quest.title || "",
                description: quest.description || "",
                difficulty: quest.difficulty || "medium",
                categories: quest.categories || [],
                expire_at: quest.expire_at || "",
            });
        }
    }, [open, quest]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing
            ? route("quests.update", quest.id)
            : route("quests.create");

        method(routeName, {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    };

    const addCategory = () => {
        if (newCategory.trim()) {
            const updated = [...data.categories, newCategory.trim()];
            setData("categories", updated);
            setNewCategory("");
            setQuest((prev) => ({
                ...prev,
                categories: updated,
            }));
        }
    };

    const removeCategory = (categoryToRemove: string) => {
        const updated = data.categories.filter(
            (cat) => cat !== categoryToRemove
        );
        setData("categories", updated);
        setQuest((prev) => ({
            ...prev,
            categories: updated,
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addCategory();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? "Edit Quest" : "Create New Quest"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? "Update your quest details."
                                : "Add a new quest to your adventure log."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="Enter quest title..."
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Describe your quest..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select
                                    value={data.difficulty}
                                    onValueChange={(value) =>
                                        setData(
                                            "difficulty",
                                            value as "easy" | "medium" | "hard"
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="easy">
                                            Easy
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="hard">
                                            Hard
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Category and expiration inputs stay the same */}
                        <div className="grid gap-2">
                            <Label htmlFor="categories">Categories</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {data.categories.map((category) => (
                                    <Badge
                                        key={category}
                                        variant="secondary"
                                        className="flex items-center gap-1 px-2 py-1"
                                    >
                                        {category}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() =>
                                                removeCategory(category)
                                            }
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    id="new-category"
                                    value={newCategory}
                                    onChange={(e) =>
                                        setNewCategory(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add a category..."
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    onClick={addCategory}
                                    variant="outline"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="expireAt">
                                Expires At (optional)
                            </Label>
                            <Input
                                id="expireAt"
                                type="datetime-local"
                                value={data.expire_at}
                                onChange={(e) =>
                                    setData("expire_at", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={!data.title.trim() || processing}
                        >
                            {isEditing ? "Save Changes" : "Create Quest"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
