"use client"

import { useEffect, useState } from "react"
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
        const response = await fetch('/api/main/standings')
        const data = await response.json()
        if (data && data.data) {
          setStandings(data.data)
        } else {
          setStandings([])
        }
      } catch (err) {
        setError("Erreur lors du chargement du classement")
        setStandings([])
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
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
          <h1 className="text-4xl font-bold text-green-800">Classement</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consultez le classement de la Ligue 1 Algérienne
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
            </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !standings || standings.length === 0 ? (
          <div className="text-center text-gray-500">
            Aucun classement disponible
                </div>
        ) : (
          <Card className="overflow-hidden">
                <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Pos</th>
                    <th className="px-4 py-3 text-left">Équipe</th>
                    <th className="px-4 py-3 text-center">Pts</th>
                    <th className="px-4 py-3 text-center">J</th>
                    <th className="px-4 py-3 text-center">V</th>
                    <th className="px-4 py-3 text-center">N</th>
                    <th className="px-4 py-3 text-center">D</th>
                    <th className="px-4 py-3 text-center">BP</th>
                    <th className="px-4 py-3 text-center">BC</th>
                    <th className="px-4 py-3 text-center">Diff</th>
                      </tr>
                    </thead>
                <tbody className="divide-y divide-gray-200">
                  {standings.map((team, index) => (
                    <motion.tr
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`${
                        team.position <= 3
                          ? "bg-green-50"
                          : team.position >= standings.length - 2
                          ? "bg-red-50"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-3 font-medium">{team.position}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8">
                            <Image
                              src={team.logo || "/images/default-team.png"}
                              alt={team.name}
                              fill
                              className="object-contain"
                            />
                                </div>
                          <span className="font-medium">{team.name}</span>
                            </div>
                          </td>
                      <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                      <td className="px-4 py-3 text-center">{team.played}</td>
                      <td className="px-4 py-3 text-center">{team.won}</td>
                      <td className="px-4 py-3 text-center">{team.drawn}</td>
                      <td className="px-4 py-3 text-center">{team.lost}</td>
                      <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                      <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                      <td className="px-4 py-3 text-center">
                              {team.goalDifference > 0 ? "+" : ""}
                              {team.goalDifference}
                          </td>
                    </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          </Card>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p className="text-center">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Qualification pour la Ligue des Champions CAF
          </p>
          <p className="text-center mt-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Relégation
          </p>
        </div>
        </div>
    </div>
  )
}
