"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Calendar, Users } from "lucide-react"

export default function ChoixBilletsPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleSelectOption = (option) => {
    // Cette fonction sera utilisée pour la navigation côté client
    // mais nous utiliserons des liens directs pour éviter les problèmes
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Choix de Billets JSK"
          width={1920}
          height={300}
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20"
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">Billets JSK</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            Choisissez votre type de billet pour les matchs de la JSK
          </p>
        </motion.div>
      </section>

      {/* Options Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4 text-green-800">
              Quel type de billet souhaitez-vous ?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
              Sélectionnez l'option qui correspond à vos besoins pour accéder aux matchs de la JSK au Stade Hocine Ait
              Ahmed
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Option 1: Billets de Match */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard("match")}
              onMouseLeave={() => setHoveredCard(null)}
              className="cursor-pointer"
            >
              <Link href="/tickets/match-day" className="block h-full">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
                  <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center">
                    <Ticket className="h-20 w-20 text-white/90" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Ticket className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-green-800">Billets de Match</h3>
                    <p className="text-gray-600 mb-6">
                      Achetez des billets pour des matchs individuels de la JSK au Stade Hocine Ait Ahmed. Différentes
                      catégories disponibles.
                    </p>
                    <ul className="space-y-2 text-left mb-8">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Billets pour des matchs spécifiques</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Choix de catégories (Standard, Premium, VIP)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>Sélection de places spécifiques</span>
                      </li>
                    </ul>
                    <Button
                      className={`w-full ${
                        hoveredCard === "match"
                          ? "bg-yellow-500 text-green-900"
                          : "bg-gradient-to-r from-green-600 to-green-500 text-white"
                      } py-3 font-bold transition-all duration-300`}
                    >
                      Voir les Matchs
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Option 2: Abonnements */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard("season")}
              onMouseLeave={() => setHoveredCard(null)}
              className="cursor-pointer"
            >
              <Link href="/tickets/season" className="block h-full">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
                  <div className="relative h-48 bg-gradient-to-r from-yellow-500 to-yellow-400 flex items-center justify-center">
                    <Calendar className="h-20 w-20 text-green-900/90" />
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Calendar className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 pt-10 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-green-800">Abonnements Saison</h3>
                    <p className="text-gray-600 mb-6">
                      Obtenez un accès à tous les matchs à domicile de la JSK pour la saison 2024-2025 avec nos formules
                      d'abonnement.
                    </p>
                    <ul className="space-y-2 text-left mb-8">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>Accès à tous les matchs à domicile</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>Place réservée pour toute la saison</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span>Réductions sur les produits officiels</span>
                      </li>
                    </ul>
                    <Button
                      className={`w-full ${
                        hoveredCard === "season"
                          ? "bg-green-600 text-white"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900"
                      } py-3 font-bold transition-all duration-300`}
                    >
                      Voir les Abonnements
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 bg-white rounded-xl shadow-md p-6 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-green-800">Réservations de Groupe</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Vous souhaitez organiser une sortie en groupe au stade ? Contactez notre service de réservation pour des
              tarifs spéciaux à partir de 10 personnes.
            </p>
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50" asChild>
              <Link href="/tickets#group">En savoir plus</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
