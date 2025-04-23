"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ChevronRight, Info, Star, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Home() {
  const [activeMatch, setActiveMatch] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setActiveMatch((prev) => (prev === 2 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const matches = [
    {
      date: "20 Avril 2025",
      time: "19:00",
      homeTeam: "JSK",
      awayTeam: "MCA",
      homeLogo: "/images/jsk.png",
      awayLogo: "/images/mca-logo.png",
      stadium: "Stade Hocine Ait Ahmed, Boukhalfa",
    },
    {
      date: "27 Avril 2025",
      time: "20:30",
      homeTeam: "JSK",
      awayTeam: "CRB",
      homeLogo: "/images/jsk.png",
      awayLogo: "/images/crb-logo.png",
      stadium: "Stade Hocine Ait Ahmed, Boukhalfa",
    },
    {
      date: "4 Mai 2025",
      time: "18:00",
      homeTeam: "JSK",

      awayTeam: "USMA",
      homeLogo: "/images/jsk.png",
      awayLogo: "/images/usma-logo.png",
      stadium: "Stade Hocine Ait Ahmed, Boukhalfa",
    },
  ]

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
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/images/img6.jpg"
          alt="Stade Hocine Ait Ahmed"
          width={1920}
          height={600}
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
          <div className="mb-6 flex justify-center">
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm animate-pulse"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-yellow-400">
                <Image src="/images/jsk.png" alt="Logo JSK" fill className="object-cover" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl mb-4 text-shadow">
            Stade Hocine Ait Ahmed
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-10 text-shadow-sm">
            Domicile de la Jeunesse Sportive de Kabylie à Boukhalfa, Tizi Ouzou, Algérie
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              asChild
            >
              <Link href="/tickets/choix">Réserver des Billets</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Next Matches Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-4xl font-bold text-green-800 flex items-center">
              <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
              Matchs à Venir
            </h2>
            <Link href="/matches" className="text-green-700 hover:text-green-800 flex items-center group">
              <span className="mr-1 relative">
                Voir tous les matchs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </span>
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {matches.map((match, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`${activeMatch === index ? "ring-4 ring-yellow-400 ring-opacity-50" : ""}`}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
                  <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">{match.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">{match.time}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3">
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm"></div>
                          <Image
                            src={match.homeLogo}
                            alt={match.homeTeam}
                            width={70}
                            height={70}
                            className="relative z-10"
                          />
                        </div>
                        <span className="font-bold text-lg">{match.homeTeam}</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <span className="text-2xl font-bold text-gray-400">VS</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="mb-3">
                        <Image
                            src={match.awayLogo}
                            alt={match.homeTeam}
                            width={70}
                            height={70}
                            className="relative z-10"
                          />
                         
                        </div>
                       
                        <span className="font-bold text-lg">{match.awayTeam}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>{match.stadium}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold py-5 rounded-lg transition-all duration-300"
                      asChild
                    >
                      <Link href="/tickets/choix">Réserver des Billets</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticket Booking Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-yellow-50 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-green-600"></div>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-green-800">Réservez Vos Places</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Assurez votre place au Stade Hocine Ait Ahmed et soutenez la JSK lors de ses prochains matchs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4">
                <TabsList className="grid w-full grid-cols-2 bg-green-800/30 rounded-lg p-1">
                  <TabsTrigger
                    value="upcoming"
                    className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 transition-all duration-300 rounded-md"
                  >
                    Matchs à Venir
                  </TabsTrigger>
                  <TabsTrigger
                    value="season"
                    className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 transition-all duration-300 rounded-md"
                  >
                    Abonnements
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming" className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-800">Sélectionner un Match</label>
                      <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                        <option>JSK vs MCA - 20 Avril 2025</option>
                        <option>JSK vs CRB - 27 Avril 2025</option>
                        <option>JSK vs USMA - 4 Mai 2025</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-800">Catégorie de Billet</label>
                      <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                        <option>Standard - 500 DA</option>
                        <option>Premium - 1000 DA</option>
                        <option>VIP - 2000 DA</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-800">Nombre de Billets</label>
                      <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        asChild
                      >
                        <Link href="/tickets/choix">Continuer à la Sélection des Sièges</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="season" className="p-8">
                <div className="space-y-6">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Info className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Les abonnements vous donnent accès à tous les matchs à domicile pour la saison 2024-2025 avec
                          des places réservées et des avantages exclusifs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-800">Type d'Abonnement</label>
                      <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                        <option>Standard - 15 000 DA</option>
                        <option>Premium - 25 000 DA</option>
                        <option>VIP - 40 000 DA</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-green-800">Nombre d'Abonnements</label>
                      <select className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        asChild
                      >
                        <Link href="/tickets/choix">Acheter des Abonnements</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Stadium Information */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-green-800">Informations sur le Stade</h2>
              <div className="space-y-5">
                <p className="text-gray-700 text-lg">
                  Le Stade Hocine Ait Ahmed à Boukhalfa, Tizi Ouzou est le stade principal de la Jeunesse Sportive de
                  Kabylie (JSK), l'un des clubs de football les plus titrés d'Algérie.
                </p>
                <p className="text-gray-700 text-lg">
                  Avec une capacité de 50 000 spectateurs, le stade offre un environnement moderne et confortable pour
                  que les fans puissent profiter des matchs et créer des souvenirs inoubliables.
                </p>
                <div className="grid grid-cols-2 gap-5 mt-8">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 shadow-sm"
                  >
                    <h3 className="font-bold text-green-700 mb-2 text-lg">Capacité</h3>
                    <p className="text-gray-700">50 000 places</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500 shadow-sm"
                  >
                    <h3 className="font-bold text-yellow-600 mb-2 text-lg">Emplacement</h3>
                    <p className="text-gray-700">Boukhalfa, Tizi Ouzou</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500 shadow-sm"
                  >
                    <h3 className="font-bold text-yellow-600 mb-2 text-lg">Installations</h3>
                    <p className="text-gray-700">Aires de restauration, boutiques, parking</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 shadow-sm"
                  >
                    <h3 className="font-bold text-green-700 mb-2 text-lg">Ouverture</h3>
                    <p className="text-gray-700">2023</p>
                  </motion.div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
                <Button
                  variant="outline"
                  className="mt-6 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg"
                >
                  Voir le Plan du Stade
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-yellow-400/20 mix-blend-overlay z-10"></div>
              <Image
                src="/images/img7.jpg"
                alt="Intérieur du Stade"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/3 z-20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                    <Users className="h-4 w-4 text-green-900" />
                  </div>
                  <span className="text-white font-medium">Affluence moyenne: 45 000+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fan Zone */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-800 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-shadow">Rejoignez la Communauté des Fans de la JSK</h2>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-white/90">
              Restez informé des dernières actualités, du contenu exclusif et des offres spéciales pour les matchs de la
              JSK au Stade Hocine Ait Ahmed.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-4 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-l-none bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold py-4 px-6">
                    S'abonner
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              <motion.div whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3"
                >
                  Facebook
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3"
                >
                  Instagram
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3"
                >
                  X
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
