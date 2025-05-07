"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Check, ChevronLeft, Calendar, Users, CreditCard, Star, Gift } from "lucide-react"

export default function ClubAbonnesPage() {
  const [activeTab, setActiveTab] = useState("avantages")

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

  // Données fictives pour les événements
  const events = [
    {
      id: 1,
      title: "Séance d'entraînement ouverte",
      date: "15 Avril 2025",
      time: "16:00",
      location: "Centre d'entraînement JSK",
      description: "Assistez à une séance d'entraînement de l'équipe et rencontrez les joueurs après la séance.",
      image: "/placeholder.svg?height=200&width=400",
      spots: "Limité à 100 abonnés",
    },
    {
      id: 2,
      title: "Rencontre avec le staff technique",
      date: "28 Avril 2025",
      time: "18:30",
      location: "Salle de conférence du Stade",
      description: "Discussion avec le staff technique sur la stratégie et les objectifs de la saison.",
      image: "/placeholder.svg?height=200&width=400",
      spots: "Limité à 50 abonnés",
    },
    {
      id: 3,
      title: "Tournoi de football pour abonnés",
      date: "10 Mai 2025",
      time: "10:00",
      location: "Terrain annexe du Stade",
      description: "Participez à un tournoi amical entre abonnés avec quelques joueurs de l'équipe.",
      image: "/placeholder.svg?height=200&width=400",
      spots: "Limité à 80 abonnés",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[250px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=250&width=1920"
          alt="Club des Abonnés"
          width={1920}
          height={250}
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
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Trophy className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2 text-shadow">Club des Abonnés</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm">
            Rejoignez la communauté privilégiée des supporters JSK
          </p>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tickets/mes-abonnements" className="hover:text-green-600">
            Mes Abonnements
          </Link>
          <span className="mx-2">/</span>
          <span className="text-green-600">Club des Abonnés</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12">
            {/* Introduction */}
            <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Bienvenue au Club des Abonnés JSK</h2>
              <p className="text-lg text-gray-600 mb-6">
                Le Club des Abonnés est une communauté exclusive réservée aux détenteurs d'un abonnement saison.
                Profitez d'avantages uniques et d'expériences inoubliables tout au long de la saison.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/tickets/season">Devenir membre</Link>
                </Button>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeIn}>
              <Tabs defaultValue="avantages" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-green-100 p-1 rounded-lg">
                    <TabsTrigger
                      value="avantages"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Avantages
                    </TabsTrigger>
                    <TabsTrigger
                      value="evenements"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Événements
                    </TabsTrigger>
                    <TabsTrigger
                      value="communaute"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Communauté
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="avantages" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6 text-center">
                        <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                          <Gift className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-green-800 mb-3">Cadeaux exclusifs</h3>
                        <p className="text-gray-600 mb-4">
                          Recevez des cadeaux exclusifs réservés aux membres du Club des Abonnés.
                        </p>
                        <ul className="text-left space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Pack de bienvenue avec écharpe exclusive</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Cadeaux d'anniversaire personnalisés</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Tirages au sort pour des maillots dédicacés</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6 text-center">
                        <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                          <Star className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-green-800 mb-3">Expériences VIP</h3>
                        <p className="text-gray-600 mb-4">Vivez des expériences uniques au cœur du club JSK.</p>
                        <ul className="text-left space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Visites des coulisses du stade</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Possibilité d'assister à des entraînements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Rencontres avec les joueurs et le staff</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6 text-center">
                        <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                          <CreditCard className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-green-800 mb-3">Réductions exclusives</h3>
                        <p className="text-gray-600 mb-4">
                          Profitez de réductions spéciales auprès du club et de ses partenaires.
                        </p>
                        <ul className="text-left space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>-15% sur tous les produits de la boutique officielle</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Offres spéciales chez nos partenaires commerciaux</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Tarifs préférentiels sur les déplacements organisés</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="evenements" className="mt-6">
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                      <h3 className="text-xl font-bold text-green-800 mb-4">Événements à venir</h3>
                      <p className="text-gray-600 mb-6">
                        Découvrez les prochains événements exclusifs réservés aux membres du Club des Abonnés. Les
                        places sont limitées, inscrivez-vous rapidement !
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {events.map((event) => (
                        <Card key={event.id} className="border-0 shadow-md overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg text-green-800 mb-2">{event.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {event.date} à {event.time}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-yellow-600 font-medium">{event.spots}</span>
                              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                                <Link href={`/tickets/evenements/${event.id}`}>S'inscrire</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                        <Link href="/tickets/evenements">Voir tous les événements</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="communaute" className="mt-6">
                  <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                      <h3 className="text-xl font-bold text-green-800 mb-4">Notre communauté</h3>
                      <p className="text-gray-600 mb-6">
                        Rejoignez une communauté passionnée de supporters JSK et partagez votre amour pour le club.
                        Participez à des discussions, des événements et des initiatives exclusives.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-6 text-center">
                          <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                            <Users className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-lg text-green-800 mb-3">Forum des abonnés</h3>
                          <p className="text-gray-600 mb-4">
                            Échangez avec d'autres abonnés sur notre forum privé. Partagez vos impressions sur les
                            matchs, organisez des déplacements et faites de nouvelles rencontres.
                          </p>
                          <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                            <Link href="/tickets/forum">Accéder au forum</Link>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-md">
                        <CardContent className="p-6 text-center">
                          <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-lg text-green-800 mb-3">Événements communautaires</h3>
                          <p className="text-gray-600 mb-4">
                            Participez à des événements organisés par et pour les abonnés : tournois de football,
                            soirées de visionnage, débats et bien plus encore.
                          </p>
                          <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                            <Link href="/tickets/communaute">Voir les événements</Link>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-md">
                        <CardContent className="p-6 text-center">
                          <div className="bg-green-100 p-3 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                            <Trophy className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-lg text-green-800 mb-3">Actions solidaires</h3>
                          <p className="text-gray-600 mb-4">
                            Participez à des initiatives solidaires portées par le club et ses abonnés : collectes de
                            dons, visites dans les hôpitaux, soutien aux associations locales.
                          </p>
                          <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                            <Link href="/tickets/solidarite">Découvrir les actions</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl shadow-lg p-8 text-white mt-8">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">Rejoignez notre communauté</h3>
                          <p className="text-white/90 max-w-xl">
                            Plus de 5000 abonnés font déjà partie de notre communauté. Rejoignez-nous pour vivre
                            pleinement votre passion pour la JSK.
                          </p>
                        </div>
                        <Button asChild className="bg-white text-green-700 hover:bg-gray-100">
                          <Link href="/tickets/season">Devenir membre</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Testimonials */}
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">Témoignages de nos membres</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="italic text-gray-600 mb-4">
                    "Être membre du Club des Abonnés m'a permis de vivre des moments inoubliables avec mon équipe
                    favorite. Les rencontres avec les joueurs et les événements exclusifs valent vraiment le coup !"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Karim B.</p>
                      <p className="text-sm text-gray-500">Abonné depuis 3 ans</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <p className="italic text-gray-600 mb-4">
                    "Les avantages du Club des Abonnés sont exceptionnels. J'ai pu faire visiter les coulisses du stade
                    à mon fils et il a même pu rencontrer son joueur préféré. Un souvenir pour la vie !"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Samia L.</p>
                      <p className="text-sm text-gray-500">Abonnée depuis 2 ans</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <p className="italic text-gray-600 mb-4">
                    "La communauté des abonnés est comme une seconde famille. J'ai rencontré des personnes formidables
                    qui partagent la même passion que moi pour la JSK. C'est bien plus qu'un simple abonnement !"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Amar M.</p>
                      <p className="text-sm text-gray-500">Abonné depuis 5 ans</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl shadow-lg p-8 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Prêt à rejoindre le Club des Abonnés ?</h3>
                  <p className="text-white/90 max-w-xl">
                    Devenez abonné JSK dès aujourd'hui et accédez à tous les avantages exclusifs du Club des Abonnés.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="bg-white text-blue-700 hover:bg-gray-100">
                    <Link href="/tickets/season">
                      <CreditCard className="h-4 w-4 mr-2" />
                      S'abonner maintenant
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-blue-600">
                    <Link href="/tickets/mes-abonnements">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Retour aux abonnements
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
