"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
  if (!user) {
      router.push("/auth/signin")
      return
    }

    const fetchReservations = async () => {
      try {
        const data = await api.tickets.getUserReservations()
        setReservations(data)
      } catch (err) {
        setError("Erreur lors du chargement des réservations")
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800">Mon Profil</h1>
          <p className="mt-2 text-lg text-gray-600">
            Bienvenue, {user.firstName} {user.lastName}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="p-6 bg-white rounded-xl shadow-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Nom:</span> {user.lastName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Prénom:</span> {user.firstName}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Se déconnecter
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Réservations</h3>
              
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : reservations.length === 0 ? (
                <div className="text-center text-gray-500">
                  Vous n'avez pas encore de réservations
                </div>
              ) : (
                      <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {reservation.match.homeTeam} vs {reservation.match.awayTeam}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(reservation.match.date).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-yellow-600">
                            {reservation.tickets.length} billet{reservation.tickets.length > 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-gray-500">
                            {reservation.status === "confirmed" ? "Confirmé" : "En attente"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                    </div>
                  )}
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
