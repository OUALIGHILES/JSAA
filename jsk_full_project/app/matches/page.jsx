"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Matches() {
  const { user } = useAuth()
  const router = useRouter()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await api.matches.getUpcoming()
        setMatches(data)
      } catch (err) {
        setError("Erreur lors du chargement des matchs")
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const handleReserve = (matchId) => {
    if (!user) {
      router.push("/auth/signin")
      return
    }
    router.push(`/tickets/${matchId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800">Matchs à venir</h1>
          <p className="mt-2 text-lg text-gray-600">
            Réservez vos billets pour les prochains matchs
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
                </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-500">
            Aucun match à venir pour le moment
                </div>
              ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match, index) => (
                <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                                <Image
                      src={match.stadium.image}
                      alt={match.stadium.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{match.stadium.name}</h3>
                      <p className="text-sm text-white/80">
                        {new Date(match.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                            </div>
                          </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{match.homeTeam.name}</span>
                              </div>
                      <span className="text-gray-500">VS</span>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{match.awayTeam.name}</span>
                        <div className="relative w-12 h-12">
                                <Image
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            fill
                            className="object-contain"
                                />
                              </div>
                            </div>
                          </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Heure:</span>{" "}
                        {new Date(match.date).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Compétition:</span> {match.competition}
                      </p>
                      <p>
                        <span className="font-medium">Prix à partir de:</span>{" "}
                        {match.minPrice}€
                      </p>
                          </div>

                          <Button
                      onClick={() => handleReserve(match.id)}
                      className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold"
                          >
                      Réserver des billets
                          </Button>
                  </div>
                      </Card>
                    </motion.div>
                  ))}
          </div>
        )}
        </div>
    </div>
  )
}
