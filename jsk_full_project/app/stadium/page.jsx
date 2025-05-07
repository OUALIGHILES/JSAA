"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Stadium() {
  const [stadium, setStadium] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const data = await api.stadium.getInfo()
        setStadium(data)
      } catch (err) {
        setError("Erreur lors du chargement des informations du stade")
      } finally {
        setLoading(false)
      }
    }

    fetchStadium()
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
          <h1 className="text-4xl font-bold text-green-800">Stade</h1>
          <p className="mt-2 text-lg text-gray-600">
            Découvrez le stade de la JSK
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
                </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !stadium ? (
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
                    src={stadium.image}
                    alt={stadium.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white">
                      {stadium.name}
                    </h2>
                    </div>
                    </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Capacité
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {stadium.capacity.toLocaleString()} places
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Année de construction
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {stadium.yearBuilt}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Surface
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {stadium.surface}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Dimensions
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {stadium.dimensions}
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
                    Adresse
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-900">{stadium.address.street}</p>
                    <p className="text-gray-900">
                      {stadium.address.postalCode} {stadium.address.city}
                    </p>
                    <p className="text-gray-900">{stadium.address.country}</p>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Équipements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stadium.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-gray-900"
                      >
                        <svg
                          className="w-5 h-5 text-green-600"
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
                        <span>{facility}</span>
                      </div>
                    ))}
                          </div>
                        </div>
                    </Card>

              <Card className="overflow-hidden rounded-xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Accès
                  </h3>
                  <div className="space-y-4">
                      <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Transports en commun
                      </h4>
                        <ul className="space-y-2">
                        {stadium.transport.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-gray-900"
                          >
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Parking
                      </h4>
                      <ul className="space-y-2">
                        {stadium.parking.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-gray-900"
                          >
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                        </ul>
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
