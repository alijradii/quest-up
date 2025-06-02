import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"

interface QuestFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filterPeriod: string
  setFilterPeriod: (value: string) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
  filterDifficulty: string
  setFilterDifficulty: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  onCreateQuest: () => void
}

export function QuestFilters({
  searchTerm,
  setSearchTerm,
  filterPeriod,
  setFilterPeriod,
  filterStatus,
  setFilterStatus,
  filterDifficulty,
  setFilterDifficulty,
  sortBy,
  setSortBy,
  onCreateQuest,
}: QuestFiltersProps) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quest Logs</CardTitle>
          <Button onClick={onCreateQuest}>
            <Plus className="h-4 w-4 mr-2" />
            New Quest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="xp">XP</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
