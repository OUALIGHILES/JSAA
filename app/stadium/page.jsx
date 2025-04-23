"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Info,
  Car,
  Utensils,
  ShoppingBag,
  Accessibility,
  Mail,
  Phone,
} from "lucide-react"

export default function StadiumPage() {
  const [activeImage, setActiveImage] = useState(0)

  const stadiumImages = [
    "https://www.dzfoot.com/wp-content/uploads/2024/11/12Alg02.jpg",
    "/images/img1.jpg",
    "/images/img4.jpg",
    "/images/img2.jpg",
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
        staggerChildren: 0.1,
      },
    },
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "JSK vs MCA",
      type: "Match de Football",
      date: "20 Avril 2025",
      time: "19:00",
    },
    {
      id: 2,
      title: "Algérie vs Tunisie",
      type: "Match Amical International",
      date: "10 Mai 2025",
      time: "20:00",
    },
    {
      id: 3,
      title: "Festival de Musique d'Été",
      type: "Concert",
      date: "15 Juin 2025",
      time: "18:00",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Section Héro */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/images/jsk.png"
          alt="Stade Hocine Ait Ahmed"
          width={1920}
          height={500}
          className="object-contain z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20"
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">
            Stade Hocine Ait Ahmed
          </h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm mb-8">
            Domicile de la Jeunesse Sportive de Kabylie à Boukhalfa, Tizi Ouzou, Algérie
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-3 py-1 text-sm">
              Capacité: 50 000
            </Badge>
            <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm">Ouvert: 2023</Badge>
            <Badge className="bg-white text-green-800 hover:bg-gray-100 px-3 py-1 text-sm">
              Emplacement: Boukhalfa, Tizi Ouzou
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Galerie du Stade */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Galerie du Stade</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez le magnifique Stade Hocine Ait Ahmed à travers notre galerie
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={stadiumImages[activeImage] || "/placeholder.svg"}
                alt={`Vue du stade ${activeImage + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/3"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                <Button
                  variant="ghost"
                  className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                  onClick={() => setActiveImage((prev) => (prev === 0 ? stadiumImages.length - 1 : prev - 1))}
                >
                  ←
                </Button>
                <div className="text-white font-medium">
                  {activeImage + 1} / {stadiumImages.length}
                </div>
                <Button
                  variant="ghost"
                  className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
                  onClick={() => setActiveImage((prev) => (prev === stadiumImages.length - 1 ? 0 : prev + 1))}
                >
                  →
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-2"
          >
            {stadiumImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                  activeImage === index ? "ring-4 ring-yellow-400" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Miniature du stade ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Informations sur le Stade */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="about" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  À Propos
                </TabsTrigger>
                <TabsTrigger
                  value="facilities"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Installations
                </TabsTrigger>
                <TabsTrigger
                  value="seating"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Plan des Sièges
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Événements
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="about" className="mt-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                <motion.div variants={fadeIn}>
                  <h3 className="text-2xl font-bold mb-6 text-green-800">Histoire du Stade</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Le Stade Hocine Ait Ahmed, nommé d'après le révolutionnaire et homme politique algérien, est un
                      stade de football ultramoderne situé à Boukhalfa, Tizi Ouzou. Il sert de terrain principal à la
                      Jeunesse Sportive de Kabylie (JSK), l'un des clubs de football les plus titrés d'Algérie.
                    </p>
                    <p>
                      Ouvert en 2023, le stade a été construit pour remplacer l'ancien Stade 1er Novembre 1954. Avec une
                      capacité de 50 000 spectateurs, c'est l'un des plus grands et des plus modernes stades d'Algérie.
                    </p>
                    <p>
                      Le stade présente un design distinctif inspiré de la culture et de l'architecture kabyle, avec son
                      extérieur mettant en valeur des éléments de motifs berbères traditionnels. La structure du toit
                      offre une couverture pour toutes les zones de sièges tout en maintenant une excellente visibilité
                      depuis chaque place.
                    </p>
                    <p>
                      Au-delà d'accueillir les matchs à domicile de la JSK, le stade sert également de lieu pour des
                      matchs internationaux, des concerts et des événements culturels, ce qui en fait un centre
                      névralgique pour la communauté de Tizi Ouzou.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 shadow-sm">
                      <h4 className="font-bold text-green-700 mb-2 text-lg">Capacité</h4>
                      <p className="text-gray-700">50 000 places</p>
                    </div>
                    <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                      <h4 className="font-bold text-yellow-600 mb-2 text-lg">Ouverture</h4>
                      <p className="text-gray-700">2023</p>
                    </div>
                    <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                      <h4 className="font-bold text-yellow-600 mb-2 text-lg">Emplacement</h4>
                      <p className="text-gray-700">Boukhalfa, Tizi Ouzou</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 shadow-sm">
                      <h4 className="font-bold text-green-700 mb-2 text-lg">Surface de Jeu</h4>
                      <p className="text-gray-700">Gazon naturel</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-yellow-400/20 mix-blend-overlay z-10"></div>
                  <Image
                    src="/images/img1.jpg"
                    alt="Vue Aérienne du Stade"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="facilities" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">Installations du Stade</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Le Stade Hocine Ait Ahmed offre une gamme d'installations modernes pour améliorer l'expérience de
                    tous les visiteurs
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
                    <div className="bg-green-100 p-4 flex justify-center">
                      <Car className="h-10 w-10 text-green-600" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Parking</h4>
                      <p className="text-gray-600">
                        Plus de 5 000 places de parking disponibles autour du stade avec des zones dédiées pour les VIP,
                        les visiteurs à mobilité réduite et les bus des équipes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
                    <div className="bg-yellow-100 p-4 flex justify-center">
                      <Utensils className="h-10 w-10 text-yellow-600" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Restauration</h4>
                      <p className="text-gray-600">
                        Plusieurs stands de restauration dans tout le stade offrant une variété d'aliments et de
                        boissons, y compris des spécialités locales.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
                    <div className="bg-green-100 p-4 flex justify-center">
                      <ShoppingBag className="h-10 w-10 text-green-600" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Boutique du Club</h4>
                      <p className="text-gray-600">
                        Boutique officielle de la JSK située à l'entrée principale, proposant maillots, souvenirs et
                        articles exclusifs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
                    <div className="bg-yellow-100 p-4 flex justify-center">
                      <Accessibility className="h-10 w-10 text-yellow-600" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2">Accessibilité</h4>
                      <p className="text-gray-600">
                        Zones de sièges accessibles aux fauteuils roulants, ascenseurs et installations dans tout le
                        stade pour les visiteurs à mobilité réduite.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-10">
                  <h3 className="text-xl font-bold mb-6 text-green-800">Installations Premium</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=200&width=500"
                          alt="Salon VIP"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-bold mb-2">Salons VIP</h4>
                        <p className="text-gray-600">
                          Salons exclusifs avec sièges premium, service de restauration gastronomique et bars privés
                          pour les détenteurs de billets VIP et les invités d'entreprise.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src="/images/img2.jpg"
                          alt="Installations de Conférence"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-bold mb-2">Salles de Conférence</h4>
                        <p className="text-gray-600">
                          Salles de réunion modernes et espaces de conférence disponibles pour les événements
                          d'entreprise, les conférences de presse et les fonctions privées.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <div className="flex items-start">
                    <Info className="h-6 w-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Visites du Stade</h3>
                      <p className="text-yellow-700 mb-4">
                        Des visites du stade sont disponibles les jours sans match, offrant aux visiteurs un aperçu des
                        coulisses des vestiaires des joueurs, du tunnel, du terrain et plus encore.
                      </p>
                      <p className="text-yellow-700">
                        Les visites ont lieu tous les jours de 10h00 à 16h00 et peuvent être réservées en ligne ou au
                        guichet du stade.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="seating" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">Plan des Sièges du Stade</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Explorez la disposition des sièges du Stade Hocine Ait Ahmed pour trouver les meilleures places pour
                    votre visite
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                    <div className="relative h-[500px] mb-6">
                      <Image
                        src="/placeholder.svg?height=500&width=1000"
                        alt="Plan des Sièges du Stade"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-200 rounded-sm mr-2"></div>
                        <span className="text-sm">Sièges Standard</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-200 rounded-sm mr-2"></div>
                        <span className="text-sm">Sièges Premium</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-yellow-200 rounded-sm mr-2"></div>
                        <span className="text-sm">Sièges VIP</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Catégories de Sièges</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Sièges Standard</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Tribunes Nord et Sud</li>
                            <li>• Capacité: 30 000</li>
                            <li>• Prix: 500 DA</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Sièges Premium</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Tribunes Est et Ouest</li>
                            <li>• Capacité: 15 000</li>
                            <li>• Prix: 1 000 DA</li>
                          </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-yellow-800 mb-2">Sièges VIP</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Tribune Ouest Centrale</li>
                            <li>• Capacité: 5 000</li>
                            <li>• Prix: 2 000 DA</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-8">
                  <h3 className="text-xl font-bold mb-6 text-green-800">Informations d'Accessibilité</h3>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-gray-600 mb-4">
                      Le Stade Hocine Ait Ahmed est entièrement accessible aux visiteurs à mobilité réduite, avec des
                      installations et des services dédiés dans tout le lieu.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="font-semibold mb-2">Sièges Accessibles aux Fauteuils Roulants</h4>
                        <p className="text-sm text-gray-600">
                          Des espaces dédiés aux fauteuils roulants sont disponibles dans toutes les tribunes, chacun
                          avec un siège pour accompagnateur. Ces zones offrent d'excellentes vues sur le terrain et un
                          accès facile aux toilettes et aux concessions accessibles.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Services Supplémentaires</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Commentaires audio descriptifs pour les supporters malvoyants</li>
                          <li>• Places de parking accessibles près des entrées du stade</li>
                          <li>• Toilettes accessibles dans tout le stade</li>
                          <li>• Chiens d'assistance bienvenus</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">Événements à Venir</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Découvrez les événements passionnants programmés au Stade Hocine Ait Ahmed
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 text-green-900">{event.type}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-4">{event.title}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-green-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            <span>Stade Hocine Ait Ahmed</span>
                          </div>
                        </div>
                        <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                          Obtenir des Billets
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>

                <motion.div variants={fadeIn} className="mt-8">
                  <h3 className="text-xl font-bold mb-6 text-green-800">Location du Stade</h3>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-gray-600 mb-6">
                      Le Stade Hocine Ait Ahmed est disponible pour des événements privés, des fonctions d'entreprise et
                      des occasions spéciales. Nos installations de classe mondiale peuvent accueillir une large gamme
                      d'événements, des tournois sportifs aux concerts et célébrations culturelles.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3">Disponible Pour:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Événements d'entreprise et activités de team building</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Concerts et spectacles de divertissement</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Tournois sportifs privés</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Événements culturels et communautaires</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Tournages de films et séances photo</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-5 rounded-lg">
                        <h4 className="font-semibold mb-3 text-green-800">Contact pour les Demandes de Location:</h4>
                        <p className="text-gray-600 mb-4">
                          Pour plus d'informations sur la location du stade pour votre événement, veuillez contacter
                          notre équipe événementielle:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-green-600" />
                            <span>evenements@jskstade.dz</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-green-600" />
                            <span>+213 XX XX XX XX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comment s'y rendre */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Comment se Rendre au Stade</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Planifiez votre voyage au Stade Hocine Ait Ahmed avec notre guide de transport
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-[300px]">
                <Image src="/images/img2.jpg" alt="Plan du Stade" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Emplacement</h3>
                <p className="text-gray-600 mb-4">
                  Le Stade Hocine Ait Ahmed est situé à Boukhalfa, à environ 7 kilomètres du centre-ville de Tizi Ouzou.
                </p>
                <a
  href="https://www.google.com/maps/place/Stade+Hocine-A%C3%AFt-Ahmed/@36.7291401,3.9961669,15z/data=!4m10!1m2!2m1!1sait+ahmed+stade!3m6!1s0x128dc7004fc68ddd:0x690793c9b99e5d27!8m2!3d36.7291401!4d4.0126464!15sCg9haXQgYWhtZWQgc3RhZGVaESIPYWl0IGFobWVkIHN0YWRlkgEHc3RhZGl1bZoBIENoUkRTVWhOTUc5blMwVkpRMEZuU1VNemRrOVdlQkFC4AEA-gEECAAQNg!16s%2Fg%2F11wfgzk7mg?entry=ttu&g_ep=EgoyMDI1MDQxMy4wIKXMDSoASAFQAw%3D%3D"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
    Voir sur Google Maps
  </Button>
</a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Car className="h-5 w-5 mr-2 text-green-600" />
                  En Voiture
                </h3>
                <p className="text-gray-600 mb-4">
                  Le stade est facilement accessible en voiture via l'autoroute RN12. Prenez la sortie Boukhalfa et
                  suivez les panneaux jusqu'au stade. Un parking est disponible sur place pour 5 000 véhicules.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    <strong>Conseil:</strong> Les jours de match, arrivez au moins 2 heures avant le coup d'envoi pour
                    vous assurer une place de parking et éviter les embouteillages.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Transports en Commun
                </h3>
                <p className="text-gray-600 mb-4">
                  Des services réguliers de bus circulent du centre-ville de Tizi Ouzou au stade les jours de match. Les
                  navettes commencent à fonctionner 4 heures avant le coup d'envoi et continuent jusqu'à 2 heures après
                  le coup de sifflet final.
                </p>
                <p className="text-gray-600">
                  Des services de taxi sont également facilement disponibles dans tout Tizi Ouzou avec des tarifs fixes
                  pour le stade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Appel à l'Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Vivez l'Atmosphère!</h2>
              <p className="text-white/90 max-w-xl">
                Rejoignez des milliers de supporters passionnés au Stade Hocine Ait Ahmed pour le prochain match de la
                JSK.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/tickets">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold px-8 py-3 rounded-lg shadow-lg">
                  Réserver des Billets Maintenant
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
