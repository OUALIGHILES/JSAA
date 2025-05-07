"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Players() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activePosition, setActivePosition] = useState("all")

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await api.team.getPlayers()
        setPlayers(data)
      } catch (err) {
        setError("Erreur lors du chargement des joueurs")
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const positions = [
    { id: "all", name: "Tous" },
    { id: "goalkeeper", name: "Gardien" },
    { id: "defender", name: "Défenseur" },
    { id: "midfielder", name: "Milieu" },
    { id: "forward", name: "Attaquant" },
  ]

  const filteredPlayers = players.filter(
    (player) => activePosition === "all" || player.position === activePosition
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800">Effectif</h1>
          <p className="mt-2 text-lg text-gray-600">
            Découvrez les joueurs de la JSK
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {positions.map((position) => (
            <button
              key={position.id}
              onClick={() => setActivePosition(position.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activePosition === position.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {position.name}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center text-gray-500">Aucun joueur trouvé</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-64">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{player.name}</h3>
                      <p className="text-yellow-400">{player.number}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Position</span>
                      <span className="font-medium">{player.position}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Âge</span>
                      <span className="font-medium">{player.age} ans</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Nationalité</span>
                      <div className="flex items-center space-x-2">
                        <Image
                          src={player.nationality.flag}
                          alt={player.nationality.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span className="font-medium">{player.nationality.name}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Depuis</span>
                      <span className="font-medium">{player.joined}</span>
                    </div>
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