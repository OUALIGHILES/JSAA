'use client'

import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaTicketAlt, FaHome } from 'react-icons/fa'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Réservation confirmée !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre réservation a été effectuée avec succès. Vous recevrez un email de confirmation avec vos billets.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-center mb-4">
              <FaTicketAlt className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-center text-gray-600">
              Conservez bien votre numéro de réservation. Vous devrez le présenter à l'entrée du stade.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaHome className="mr-2" />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 