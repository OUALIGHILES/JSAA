"use client"

import { useEffect, useState } from "react"
import { prisma } from "@/lib/prisma"

export default function TestDB() {
  const [matches, setMatches] = useState([])
  const [error, setError] = useState("")
  const [bcrypt, setBcrypt] = useState([])  
  const [token, setToken] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/test-db')
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        setMatches(data.matches)
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
      <h1 className="text-2xl font-bold mb-4">Test de connexion à la base de données</h1>
      <div className="bg-green-100 p-4 rounded mb-4">
        ✅ Connexion à la base de données réussie
      </div>
      <h2 className="text-xl font-semibold mb-2">Matchs trouvés :</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(matches, null, 2)}
      </pre>
    </div>
  )
} 