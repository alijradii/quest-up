import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2 } from "lucide-react"
import { getDifficultyColor, getStatusColor } from "@/lib/utils"
import { Quest } from "@/types/interfaces/Quest"

interface QuestCardProps {
  quest: Quest
  onToggleStatus: () => void
  onDelete: () => void
}

export function QuestCard({ quest, onToggleStatus, onDelete }: QuestCardProps) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox checked={quest.status === "completed"} onCheckedChange={onToggleStatus} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`font-semibold ${quest.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                >
                  {quest.title}
                </h3>
                <Badge variant="outline" className={getStatusColor(quest.status)}>
                  {quest.status}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                  {quest.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {quest.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {quest.createdAt && (
                  <span className="text-xs text-muted-foreground">Created: {quest.createdAt.toLocaleDateString()}</span>
                )}
                {quest.expiresAt && (
                  <span className="text-xs text-muted-foreground">Expires: {quest.expiresAt.toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-400">+{quest.xp} XP</span>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit quest</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete quest</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
