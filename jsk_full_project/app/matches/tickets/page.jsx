'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaTicketAlt } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'

export default function TicketsPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches')
        const data = await response.json()
        setMatches(data)
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Billets disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaTicketAlt className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">{match.title}</h2>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <p>{match.date}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <p>{match.location}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">{match.price}€</p>
                <button
                  onClick={() => router.push(`/matches/tickets/${match.id}`)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Acheter
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 