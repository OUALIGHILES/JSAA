'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaChair, FaCheck } from 'react-icons/fa'

export default function TicketReservationPage() {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/main/match/${params.id}`)
        if (!response.ok) throw new Error('Erreur lors de la récupération du match')
        const data = await response.json()
        setMatch(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [params.id])

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat))
      setTotalPrice(totalPrice - 1000) // Prix par place : 1000 DA
    } else {
      setSelectedSeats([...selectedSeats, seat])
      setTotalPrice(totalPrice + 1000)
    }
  }

  const handleReservation = async () => {
    try {
      const response = await fetch('/api/main/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: match.id,
          seats: selectedSeats,
        }),
      })

      if (!response.ok) throw new Error('Erreur lors de la réservation')
      
      router.push('/matches/tickets/success')
    } catch (err) {
      setError(err.message)
    }
  }

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-2xl font-bold text-gray-900">VS</span>
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{match.competition}</p>
                <p className="text-gray-600">{new Date(match.date).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sélection des places</h3>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 64 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSeatSelection(`A${i + 1}`)}
                      className={`p-2 rounded ${
                        selectedSeats.includes(`A${i + 1}`)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <FaChair className="mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Résumé de la réservation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Places sélectionnées:</span>
                    <span className="font-semibold">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix par place:</span>
                    <span className="font-semibold">1000 DA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{totalPrice} DA</span>
                  </div>
                  <button
                    onClick={handleReservation}
                    disabled={selectedSeats.length === 0}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCheck className="mr-2" />
                    Confirmer la réservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 