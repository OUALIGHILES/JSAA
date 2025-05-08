"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-green-600"></div>

      <div className="container mx-auto px-4 py-16 md:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm"></div>
                <Image
                  src="/images/jsk-logo.png"
                  alt="Logo JSK"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-yellow-400 relative z-10"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <span className="text-2xl font-bold">Stade JSK</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Site officiel de réservation de billets pour le Stade Hocine Ait Ahmed, domicile de la Jeunesse Sportive
              de Kabylie à Boukhalfa, Tizi Ouzou, Algérie.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://www.facebook.com/jskabylie.club "
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href=" https://www.instagram.com/jskabylie.officiel?igsh=MWpzNHVpc2VkOXF6cw=="
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href=""
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-yellow-400 rounded-full mr-3"></span>
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/matches"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Matchs
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Billets
                </Link>
              </li>
              <li>
                <Link
                  href="/stadium"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Infos Stade
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Mes Réservations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-yellow-400 rounded-full mr-3"></span>
              Informations Billets
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tickets/match-day"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Billets de Match
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets/season"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Abonnements
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets/group"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Réservations de Groupe
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets/group"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Réservations de Groupe
                </Link>
              </li>
              <li>
                <Link
                  href="/tickets/faq"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  FAQ Billets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-1 bg-yellow-400 rounded-full mr-3"></span>
              Contactez-nous
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Stade Hocine Ait Ahmed, Boukhalfa, Tizi Ouzou, Algérie</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-yellow-400" />
                <span className="text-gray-300">+213 XX XX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-yellow-400" />
                <span className="text-gray-300">billets@jskstade.dz</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-2 text-yellow-400">Horaires du Stade</h4>
              <p className="text-sm text-gray-300">Lundi - Vendredi: 9h00 - 18h00</p>
              <p className="text-sm text-gray-300">Weekend: 10h00 - 16h00</p>
              <p className="text-sm text-gray-300">Jours de Match: Ouvert jusqu'à 2h après le match</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-green-800/50 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Stade JSK. Tous droits réservés.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <Link href="/terms" className="hover:text-yellow-400 transition-colors duration-300">
              Conditions Générales
            </Link>
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors duration-300">
              Politique de Confidentialité
            </Link>
            <Link href="/cookies" className="hover:text-yellow-400 transition-colors duration-300">
              Politique des Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-6 w-12 h-12 rounded-full bg-yellow-500 text-green-900 flex items-center justify-center shadow-lg z-50 hover:bg-yellow-400 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
