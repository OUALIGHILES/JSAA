"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Results() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/main/match/results')
        const data = await response.json()
        if (data && data.data) {
          setMatches(data.data)
        } else {
          setMatches([])
        }
      } catch (err) {
        setError("Erreur lors du chargement des résultats")
        setMatches([])
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
          <h1 className="text-4xl font-bold text-green-800">Résultats</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consultez les résultats des matchs de la JSK
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !matches || matches.length === 0 ? (
          <div className="text-center text-gray-500">
            Aucun résultat disponible
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/matches/${match.id}`}>
                  <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          {formatDate(match.date)}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                          {match.competition || "Match"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12">
                            <Image
                              src={match.homeTeam?.logo}
                              alt={match.homeTeam?.name || "Équipe à domicile"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium text-gray-900">
                            {match.homeTeam?.name || "Équipe à domicile"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {match.score?.home ?? "-"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12">
                            <Image
                              src={match.awayTeam?.logo }
                              alt={match.awayTeam?.name || "Équipe à l'extérieur"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium text-gray-900">
                            {match.awayTeam?.name || "Équipe à l'extérieur"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {match.score?.away ?? "-"}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{match.stadium || "Stade non spécifié"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{match.time || "Heure non spécifiée"}</span>
                        </div>
                      </div>

                      {match.highlights && (
                        <div className="mt-4">
                          <a
                            href={match.highlights}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Voir les résumés</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
