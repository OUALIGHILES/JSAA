"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function MatchDetails({ params }) {
  const router = useRouter()
  const { user } = useAuth()
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const data = await api.matches.getMatchDetails(params.matchId)
        setMatch(data)
      } catch (err) {
        setError("Erreur lors du chargement des détails du match")
      } finally {
        setLoading(false)
      }
    }

    fetchMatchDetails()
  }, [params.matchId])

  const handleReserve = () => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    router.push(`/tickets/${params.matchId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !match ? (
          <div className="text-center text-gray-500">Match non trouvé</div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-green-800">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {new Date(match.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-64">
                    <Image
                      src={match.stadium.image}
                      alt={match.stadium.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {match.stadium.name}
                      </h3>
                      <p className="text-yellow-400">{match.competition}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <Image
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {match.homeTeam.name}
                        </h4>
                        <p className="text-gray-500">{match.homeTeam.record}</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <Image
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {match.awayTeam.name}
                        </h4>
                        <p className="text-gray-500">{match.awayTeam.record}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Informations
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Stade
                        </h4>
                        <p className="mt-1 text-gray-900">{match.stadium.name}</p>
                        <p className="text-sm text-gray-500">
                          {match.stadium.address}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Date et heure
                        </h4>
                        <p className="mt-1 text-gray-900">
                          {new Date(match.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Compétition
                        </h4>
                        <p className="mt-1 text-gray-900">{match.competition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Arbitre
                        </h4>
                        <p className="mt-1 text-gray-900">{match.referee}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={handleReserve}
                        className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Réserver des billets
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 