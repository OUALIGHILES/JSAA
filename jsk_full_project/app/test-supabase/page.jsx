"use client"

import { useEffect, useState } from "react"
import { getMatches } from "@/lib/supabase"

export default function TestSupabase() {
  const [matches, setMatches] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await getMatches()
        if (error) throw error
        setMatches(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test de connexion Supabase</h1>
      <div className="bg-green-100 p-4 rounded mb-4">
        ✅ Connexion à Supabase réussie
      </div>
      <h2 className="text-xl font-semibold mb-2">Matchs trouvés :</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(matches, null, 2)}
      </pre>
    </div>
  )
} 