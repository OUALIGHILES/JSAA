import { useState, useEffect } from "react"

interface Team {
  id: string
  name: string
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams")
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Erreur lors de la récupération des équipes")
        }

        setTeams(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return { teams, loading, error }
} 