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
import { Quest } from "@/types/interfaces/Quest";

interface QuestFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: () => void;
    quest: {
        title: string;
        description: string;
        categories: string[];
        xp: number;
        difficulty: Quest["difficulty"];
        expiresAt: string;
    };
    setQuest: React.Dispatch<
        React.SetStateAction<{
            title: string;
            description: string;
            categories: string[];
            xp: number;
            difficulty: Quest["difficulty"];
            expiresAt: string;
        }>
    >;
    isEditing?: boolean;
}

export function QuestForm({
    open,
    onOpenChange,
    onSubmit,
    quest,
    setQuest,
    isEditing = false,
}: QuestFormProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
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
                            value={quest.title}
                            onChange={(e) =>
                                setQuest((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="Enter quest title..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={quest.description}
                            onChange={(e) =>
                                setQuest((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Describe your quest..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select
                                value={quest.difficulty}
                                onValueChange={(value: Quest["difficulty"]) =>
                                    setQuest((prev) => ({
                                        ...prev,
                                        difficulty: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="xp">XP Reward</Label>
                            <Input
                                id="xp"
                                type="number"
                                value={quest.xp}
                                onChange={(e) =>
                                    setQuest((prev) => ({
                                        ...prev,
                                        xp:
                                            Number.parseInt(e.target.value) ||
                                            0,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="categories">
                            Categories (comma-separated)
                        </Label>
                        <Input
                            id="categories"
                            value={quest.categories.join(", ")}
                            onChange={(e) =>
                                setQuest((prev) => ({
                                    ...prev,
                                    categories: e.target.value
                                        .split(",")
                                        .map((c) => c.trim())
                                        .filter(Boolean),
                                }))
                            }
                            placeholder="work, health, learning..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="expires">Expires At (optional)</Label>
                        <Input
                            id="expires"
                            type="datetime-local"
                            value={quest.expiresAt}
                            onChange={(e) =>
                                setQuest((prev) => ({
                                    ...prev,
                                    expiresAt: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                        disabled={!quest.title.trim()}
                    >
                        {isEditing ? "Save Changes" : "Create Quest"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
