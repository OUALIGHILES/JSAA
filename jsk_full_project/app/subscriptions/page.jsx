"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Subscriptions() {
  const router = useRouter()
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await api.tickets.getSeasonTickets()
        setSubscriptions(data)
      } catch (err) {
        setError("Erreur lors du chargement des abonnements")
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const handleReserve = async (subscriptionId) => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    try {
      await api.tickets.createReservation({
        subscriptionId,
        quantity: 1,
      })
      router.push("/profile")
    } catch (err) {
      setError("Erreur lors de la réservation")
    }
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
          <h1 className="text-4xl font-bold text-green-800">Abonnements</h1>
          <p className="mt-2 text-lg text-gray-600">
            Réservez votre place pour toute la saison
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptions.map((subscription, index) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={subscription.image}
                      alt={subscription.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {subscription.name}
                      </h3>
                      <p className="text-yellow-400">
                        {subscription.price.toLocaleString("fr-FR")} DA
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Description
                        </h4>
                        <p className="mt-1 text-gray-700">
                          {subscription.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Avantages
                        </h4>
                        <ul className="mt-1 space-y-1">
                          {subscription.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                              <svg
                                className="w-4 h-4 mr-2 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={() => handleReserve(subscription.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Réserver
                      </Button>
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