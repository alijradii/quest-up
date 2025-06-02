import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuestItem } from "./QuestItem"
import { Quest } from "@/types/interfaces/Quest"
import { Link } from "@inertiajs/react";

interface QuestOverviewProps {
  quests: Quest[]
}

export function QuestOverview({ quests }: QuestOverviewProps) {
  const completedQuests = quests.filter((quest) => quest.status === "completed").length
  const totalQuests = quests.length
  const progressPercentage = Math.round((completedQuests / totalQuests) * 100)

  return (
    <Card className="col-span-full lg:col-span-2 border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Today's Quests</CardTitle>
            <CardDescription>Complete quests to gain XP and level up</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {completedQuests}/{totalQuests} completed
            </span>
            <Progress value={progressPercentage} className="w-24 h-2 bg-muted" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quests.map((quest) => (
            <QuestItem key={quest.id} quest={quest} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
        href="/quests"
        >
          <Button variant="outline">View All Quests</Button>
        </Link>
        <Link 
        href="/quests?new=true"
        >
          <Button>Add New Quest</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
