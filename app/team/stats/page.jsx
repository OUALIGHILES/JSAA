"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function TeamStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.team.getStats()
        setStats(data)
      } catch (err) {
        setError("Erreur lors du chargement des statistiques")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800">Statistiques</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consultez les statistiques de la JSK
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !stats ? (
          <div className="text-center text-gray-500">
            Aucune statistique disponible
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Performance
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Matchs joués
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.matchesPlayed}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Victoires
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.wins}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(stats.wins / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Nuls
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.draws}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${(stats.draws / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Défaites
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.losses}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(stats.losses / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Buts
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Buts marqués
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.goalsFor}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(stats.goalsFor / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Buts encaissés
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.goalsAgainst}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(stats.goalsAgainst / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Différence
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            stats.goalDifference > 0
                              ? "text-green-600"
                              : stats.goalDifference < 0
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {stats.goalDifference > 0
                            ? `+${stats.goalDifference}`
                            : stats.goalDifference}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Moyenne par match
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {(stats.goalsFor / stats.matchesPlayed).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Discipline
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Cartons jaunes
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.yellowCards}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${(stats.yellowCards / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Cartons rouges
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.redCards}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(stats.redCards / stats.matchesPlayed) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Moyenne par match
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {(
                            (stats.yellowCards + stats.redCards) /
                            stats.matchesPlayed
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Meilleurs buteurs
                  </h3>
                  <div className="space-y-4">
                    {stats.topScorers.map((player, index) => (
                      <div key={player.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-8 h-8">
                              <Image
                                src={player.image}
                                alt={player.name}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {player.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {player.goals} buts
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${(player.goals / stats.topScorers[0].goals) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Passeurs décisifs
                  </h3>
                  <div className="space-y-4">
                    {stats.topAssists.map((player, index) => (
                      <div key={player.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-8 h-8">
                              <Image
                                src={player.image}
                                alt={player.name}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {player.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {player.assists} passes
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(player.assists / stats.topAssists[0].assists) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Possession
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Moyenne
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.averagePossession}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${stats.averagePossession}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Meilleure
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.bestPossession}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          Pire
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {stats.worstPossession}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 