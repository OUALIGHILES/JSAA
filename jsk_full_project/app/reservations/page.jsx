"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Reservations() {
  const router = useRouter()
  const { user } = useAuth()
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800">Mes Réservations</h1>
          <p className="mt-2 text-lg text-gray-600">
            Consultez l'historique de vos réservations
          </p>
        </motion.div>

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
          <div className="space-y-6">
            {reservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-64 h-48">
                        <Image
                          src={reservation.image}
                          alt={reservation.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {reservation.name}
                            </h3>
                            <p className="text-gray-500">
                              {new Date(reservation.date).toLocaleDateString(
                                "fr-FR",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                                </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              reservation.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {reservation.status === "confirmed"
                              ? "Confirmée"
                              : "En attente"}
                      </div>
                      </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Type
                            </h4>
                            <p className="mt-1 text-gray-900">
                              {reservation.type}
                            </p>
                      </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Quantité
                            </h4>
                            <p className="mt-1 text-gray-900">
                              {reservation.quantity}
                            </p>
                      </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Prix unitaire
                            </h4>
                            <p className="mt-1 text-gray-900">
                              {reservation.price.toLocaleString("fr-FR")} DA
                            </p>
                </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Total
                            </h4>
                            <p className="mt-1 text-gray-900">
                              {(
                                reservation.price * reservation.quantity
                              ).toLocaleString("fr-FR")}{" "}
                              DA
                            </p>
                      </div>
                    </div>
                      </div>
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
