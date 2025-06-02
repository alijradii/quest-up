import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Target } from "lucide-react"
import { QuestCard } from "./QuestCard"
import { Quest } from "@/types/interfaces/Quest"

interface QuestListProps {
  quests: Quest[]
  onToggleStatus: (questId: number) => void
  onDeleteQuest: (questId: number) => void
  onCreateQuest: () => void
}

export function QuestList({ quests, onToggleStatus, onDeleteQuest, onCreateQuest }: QuestListProps) {
  if (quests.length === 0) {
    return <EmptyState onCreateQuest={onCreateQuest} />
  }

  return (
    <div className="space-y-4">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onToggleStatus={() => onToggleStatus(quest.id)}
          onDelete={() => onDeleteQuest(quest.id)}
        />
      ))}
    </div>
  )
}

interface EmptyStateProps {
  onCreateQuest: () => void
}

function EmptyState({ onCreateQuest }: EmptyStateProps) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No quests found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search terms, or start your adventure by creating your first quest!
        </p>
        <Button onClick={onCreateQuest}>
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Quest
        </Button>
      </CardContent>
    </Card>
  )
}
