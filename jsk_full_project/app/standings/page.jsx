"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Standings() {
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const data = await api.matches.getStandings()
        setStandings(data)
      } catch (err) {
        setError("Erreur lors du chargement des classements")
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [])

  const formatDate = (dateString) => {
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
          <h1 className="text-4xl font-bold text-green-800">Classements</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consultez les classements des compétitions
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : standings.length === 0 ? (
          <div className="text-center text-gray-500">
            Aucun classement disponible
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {standings.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        {competition.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        Mis à jour le {formatDate(competition.lastUpdated)}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm font-medium text-gray-500">
                            <th className="pb-3">#</th>
                            <th className="pb-3">Équipe</th>
                            <th className="pb-3 text-center">MJ</th>
                            <th className="pb-3 text-center">V</th>
                            <th className="pb-3 text-center">N</th>
                            <th className="pb-3 text-center">D</th>
                            <th className="pb-3 text-center">BP</th>
                            <th className="pb-3 text-center">BC</th>
                            <th className="pb-3 text-center">+/-</th>
                            <th className="pb-3 text-center">Pts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {competition.teams.map((team, index) => (
                            <tr
                              key={team.id}
                              className={`${
                                team.isJsk
                                  ? "bg-green-50"
                                  : index % 2 === 0
                                  ? "bg-white"
                                  : "bg-gray-50"
                              }`}
                            >
                              <td className="py-3 text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="py-3">
                                <div className="flex items-center space-x-3">
                                  <div className="relative w-6 h-6">
                                    <Image
                                      src={team.logo}
                                      alt={team.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {team.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.matchesPlayed}
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.wins}
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.draws}
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.losses}
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.goalsFor}
                              </td>
                              <td className="py-3 text-sm text-center text-gray-900">
                                {team.goalsAgainst}
                              </td>
                              <td
                                className={`py-3 text-sm text-center font-medium ${
                                  team.goalDifference > 0
                                    ? "text-green-600"
                                    : team.goalDifference < 0
                                    ? "text-red-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {team.goalDifference > 0
                                  ? `+${team.goalDifference}`
                                  : team.goalDifference}
                              </td>
                              <td className="py-3 text-sm text-center font-bold text-gray-900">
                                {team.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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