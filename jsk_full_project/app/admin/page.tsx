"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Ticket, Euro } from "lucide-react"
import { RecentUsers } from "@/components/admin/recent-users"
import { UpcomingMatches } from "@/components/admin/upcoming-matches"
import { RecentTickets } from "@/components/admin/recent-tickets"

interface DashboardStats {
  totalUsers: number
  totalMatches: number
  totalTickets: number
  totalRevenue: number
}

interface DashboardData {
  stats: DashboardStats
  recentUsers: any[]
  upcomingMatches: any[]
  recentTickets: any[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard")
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Erreur lors de la récupération des données")
        }

        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord administrateur</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matchs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats.totalMatches}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats.totalTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu total</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats.totalRevenue}€</div>
          </CardContent>
        </Card>
      </div>

      {/* Derniers utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Derniers utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUsers users={data?.recentUsers || []} />
          </CardContent>
        </Card>

        {/* Prochains matchs */}
        <Card>
          <CardHeader>
            <CardTitle>Prochains matchs</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingMatches matches={data?.upcomingMatches || []} />
          </CardContent>
        </Card>

        {/* Dernières ventes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dernières ventes de billets</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTickets tickets={data?.recentTickets || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
 