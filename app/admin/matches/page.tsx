"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { api } from "@/lib/api"
import CreateMatchDialog from "@/components/admin/create-match-dialog"
import DeleteMatchDialog from "@/components/admin/delete-match-dialog"
import UpdateMatchDialog from "@/components/admin/update-match-dialog"

interface Match {
  id: string
  date: string
  place: string
  status: string
  homeTeam: {
    id: string
    name: string
  }
  awayTeam: {
    id: string
    name: string
  }
  _count: {
    tickets: number
  }
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  // Fetch all matches (Read)
  const fetchMatches = async () => {
    setLoading(true)
    try {
      const response = await api.matches.getUpcoming()
      if (!response || !response.data) throw new Error("Erreur lors de la récupération des matchs")
      setMatches(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  // Create
  const handleCreateMatch = async (matchData: any) => {
    try {
      await api.matches.addMatch(matchData)
      await fetchMatches()
      setIsCreateDialogOpen(false)
    } catch (error) {
      setError("Erreur lors de la création du match")
    }
  }

  // Update
  const handleUpdateMatch = async (matchData: any) => {
    if (!selectedMatch) return
    try {
      await api.matches.updateMatch(selectedMatch.id, matchData)
      await fetchMatches()
      setIsUpdateDialogOpen(false)
      setSelectedMatch(null)
    } catch (error) {
      setError("Erreur lors de la mise à jour du match")
    }
  }

  // Delete
  const handleDeleteMatch = async (matchId: string) => {
    try {
      await api.matches.deleteMatch(matchId)
      await fetchMatches()
      setIsDeleteDialogOpen(false)
      setSelectedMatch(null)
    } catch (error) {
      setError("Erreur lors de la suppression du match")
    }
  }

  // UpdateMatchDialog expects homeTeamId and awayTeamId, so map selectedMatch
  const selectedMatchForDialog = selectedMatch
    ? {
      id: selectedMatch.id,
      homeTeamId: selectedMatch.homeTeam.id,
      awayTeamId: selectedMatch.awayTeam.id,
      date: selectedMatch.date,
      place: selectedMatch.place,
      status: selectedMatch.status,
    }
    : null

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des matchs</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un match
        </Button>
      </div>      <div className="grid gap-6">
        {matches.filter(match => match !== null).map((match) => (
          <Card key={match?.id || Math.random()}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {(match?.homeTeam?.name || "?") + " vs " + (match?.awayTeam?.name || "?")}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedMatch(match)
                    setIsUpdateDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedMatch(match)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{match?.date ? format(new Date(match.date), "dd MMM yyyy à HH:mm", { locale: fr }) : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lieu</p>
                  <p>{match?.place || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <p>{match?.status || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billets vendus</p>
                  <p>{match?._count?.tickets ?? 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateMatchDialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          console.log("yeaaah")
          setIsCreateDialogOpen(open)
          if (!open) setSelectedMatch(null)
        }}
        onSubmit={handleCreateMatch}
      />      <UpdateMatchDialog
        open={isUpdateDialogOpen && !!selectedMatchForDialog}
        onOpenChange={(open) => {
          setIsUpdateDialogOpen(open)
          if (!open) {
            setTimeout(() => setSelectedMatch(null), 300); // Give dialog time to close
          }
        }}
        match={selectedMatchForDialog}
        onSubmit={handleUpdateMatch}
      />

      <DeleteMatchDialog
        open={isDeleteDialogOpen && !!selectedMatch}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open)
          if (!open) {
            setTimeout(() => setSelectedMatch(null), 300); // Give dialog time to close
          }
        }}
        match={selectedMatch}
        onDelete={handleDeleteMatch}
      />
    </div>
  )
}
