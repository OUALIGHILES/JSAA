"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CreateMatchDialog } from "@/components/admin/create-match-dialog"
import { UpdateMatchDialog } from "@/components/admin/update-match-dialog"
import { DeleteMatchDialog } from "@/components/admin/delete-match-dialog"

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

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/admin/matches")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la récupération des matchs")
      }

      setMatches(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleCreateMatch = async (matchData: any) => {
    try {
      const response = await fetch("/api/admin/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création du match")
      }

      await fetchMatches()
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleUpdateMatch = async (matchData: any) => {
    if (!selectedMatch) return

    try {
      const response = await fetch(`/api/admin/matches/${selectedMatch.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du match")
      }

      await fetchMatches()
      setIsUpdateDialogOpen(false)
      setSelectedMatch(null)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleDeleteMatch = async (matchId: string) => {
    try {
      const response = await fetch(`/api/admin/matches/${matchId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du match")
      }

      await fetchMatches()
      setIsDeleteDialogOpen(false)
      setSelectedMatch(null)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

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
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {match.homeTeam.name} vs {match.awayTeam.name}
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
                  <p>{format(new Date(match.date), "dd MMM yyyy à HH:mm", { locale: fr })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lieu</p>
                  <p>{match.place}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <p>{match.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billets vendus</p>
                  <p>{match._count.tickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateMatchDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateMatch}
      />

      <UpdateMatchDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        match={selectedMatch}
        onSubmit={handleUpdateMatch}
      />

      <DeleteMatchDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        match={selectedMatch}
        onDelete={handleDeleteMatch}
      />
    </div>
  )
}
