import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertTriangle, CheckCircle, Eye, Flag, MoreVertical, Search, Trash2, XCircle } from "lucide-react"
import type { AdminQuest } from "@/types/interfaces/Admin"
import { getDifficultyColor } from "@/lib/utils"

interface QuestModerationProps {
  quests: AdminQuest[]
  onApproveQuest: (questId: number) => void
  onRejectQuest: (questId: number, reason: string) => void
  onDeleteQuest: (questId: number) => void
  onViewQuest: (questId: number) => void
}

export function QuestModeration({
  quests,
  onApproveQuest,
  onRejectQuest,
  onDeleteQuest,
  onViewQuest,
}: QuestModerationProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean
    quest: AdminQuest | null
  }>({ open: false, quest: null })
  const [rejectReason, setRejectReason] = useState("")

  const filteredQuests = quests.filter((quest) => {
    const matchesSearch =
      quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.userName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quest.status === statusFilter
    const matchesDifficulty = difficultyFilter === "all" || quest.difficulty === difficultyFilter

    return matchesSearch && matchesStatus && matchesDifficulty
  })

  const getStatusColor = (status: AdminQuest["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 border-green-400/20"
      case "pending":
        return "text-blue-400 border-blue-400/20"
      case "expired":
        return "text-gray-400 border-gray-400/20"
      case "flagged":
        return "text-red-400 border-red-400/20"
      default:
        return "text-gray-400 border-gray-400/20"
    }
  }

  const handleReject = () => {
    if (!rejectDialog.quest || !rejectReason.trim()) return

    onRejectQuest(rejectDialog.quest.id, rejectReason)
    setRejectDialog({ open: false, quest: null })
    setRejectReason("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Quest Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
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
            </div>
          </div>

          {/* Quest list */}
          <div className="space-y-3">
            {filteredQuests.map((quest) => (
              <Card key={quest.id} className="border-border/40 bg-card/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base truncate">{quest.title}</h3>
                        <Badge variant="outline" className={getStatusColor(quest.status)}>
                          {quest.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${getDifficultyColor(quest.difficulty)} border-current/20`}
                        >
                          {quest.difficulty}
                        </Badge>
                        {quest.reports > 0 && (
                          <Badge variant="outline" className="text-red-400 border-red-400/20">
                            <Flag className="h-3 w-3 mr-1" />
                            {quest.reports} reports
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{quest.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By: {quest.userName}</span>
                        <span>XP: {quest.xp}</span>
                        <span>Created: {quest.createdAt.toLocaleDateString()}</span>
                        {quest.expiresAt && <span>Expires: {quest.expiresAt.toLocaleDateString()}</span>}
                      </div>

                      {quest.flagReason && (
                        <div className="mt-2 p-2 bg-red-400/10 border border-red-400/20 rounded-md">
                          <p className="text-sm text-red-400">
                            <AlertTriangle className="h-4 w-4 inline mr-1" />
                            Flag reason: {quest.flagReason}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        {quest.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {quest.status === "flagged" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onApproveQuest(quest.id)}
                            className="h-8 text-green-400 border-green-400/20 hover:bg-green-400/10"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRejectDialog({ open: true, quest })}
                            className="h-8 text-red-400 border-red-400/20 hover:bg-red-400/10"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}

                      <Button variant="outline" size="sm" onClick={() => onViewQuest(quest.id)} className="h-8">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewQuest(quest.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDeleteQuest(quest.id)} className="text-red-400">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Quest
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-lg font-medium mb-2">No quests found</div>
              <div className="text-sm">Try adjusting your search terms or filters.</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => !open && setRejectDialog({ open: false, quest: null })}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Quest: {rejectDialog.quest?.title}</DialogTitle>
            <DialogDescription>
              This quest will be removed and the user will be notified of the rejection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, quest: null })}>
              Cancel
            </Button>
            <Button onClick={handleReject} disabled={!rejectReason.trim()} variant="destructive">
              Reject Quest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
