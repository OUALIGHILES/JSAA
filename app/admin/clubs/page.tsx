"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit } from "lucide-react"
import { CreateClubDialog } from "@/components/admin/create-club-dialog"
import { UpdateClubDialog } from "@/components/admin/update-club-dialog"
import { DeleteClubDialog } from "@/components/admin/delete-club-dialog"

interface Club {
  id: string
  name: string
  description: string
  logo: string
  _count: {
    homeMatches: number
    awayMatches: number
  }
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/admin/clubs")
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la récupération des clubs")
      }

      setClubs(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  const handleCreateClub = async (clubData: any) => {
    try {
      const response = await fetch("/api/admin/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clubData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création du club")
      }

      await fetchClubs()
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleUpdateClub = async (clubData: any) => {
    if (!selectedClub) return

    try {
      const response = await fetch(`/api/admin/clubs/${selectedClub.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clubData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du club")
      }

      await fetchClubs()
      setIsUpdateDialogOpen(false)
      setSelectedClub(null)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleDeleteClub = async (clubId: string) => {
    try {
      const response = await fetch(`/api/admin/clubs/${clubId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du club")
      }

      await fetchClubs()
      setIsDeleteDialogOpen(false)
      setSelectedClub(null)
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
        <h1 className="text-3xl font-bold">Gestion des clubs</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un club
        </Button>
      </div>

      <div className="grid gap-6">
        {clubs.map((club) => (
          <Card key={club.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{club.name}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedClub(club)
                    setIsUpdateDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedClub(club)
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
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{club.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Logo</p>
                  {club.logo && (
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matchs à domicile</p>
                  <p>{club._count.homeMatches}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Matchs à l'extérieur</p>
                  <p>{club._count.awayMatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateClubDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateClub}
      />

      <UpdateClubDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        club={selectedClub}
        onSubmit={handleUpdateClub}
      />

      <DeleteClubDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        club={selectedClub}
        onDelete={handleDeleteClub}
      />
    </div>
  )
} 