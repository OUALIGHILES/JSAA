"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Team() {
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await api.team.getInfo()
        setTeam(data)
      } catch (err) {
        setError("Erreur lors du chargement des informations de l'équipe")
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
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
          <h1 className="text-4xl font-bold text-green-800">Équipe</h1>
          <p className="mt-2 text-lg text-gray-600">
            Découvrez la Jeunesse Sportive de Kabylie
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !team ? (
          <div className="text-center text-gray-500">
            Aucune information disponible
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white">
                      {team.name}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Année de fondation
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {team.founded}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Surnom
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {team.nickname}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Couleurs
                      </h3>
                      <div className="mt-1 flex space-x-2">
                        {team.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Stade
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {team.stadium}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Entraîneur
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={team.coach.image}
                        alt={team.coach.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {team.coach.name}
                      </h4>
                      <p className="text-gray-500">
                        Depuis {team.coach.since}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Trophées
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {team.trophies.map((trophy, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-gray-900"
                      >
                        <svg
                          className="w-5 h-5 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                        <span>{trophy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Joueurs clés
                  </h3>
                  <div className="space-y-4">
                    {team.keyPlayers.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative w-12 h-12">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {player.name}
                          </h4>
                          <p className="text-gray-500">
                            {player.position} • {player.nationality}
                          </p>
                        </div>
                      </div>
                    ))}
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