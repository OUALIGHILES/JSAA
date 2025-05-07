"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, Check, ChevronLeft, Calendar, Clock, CreditCard, Trophy } from "lucide-react"

export default function PrioritePage() {
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
      <section className="relative h-[250px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=250&width=1920"
          alt="Accès Prioritaire"
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
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2 text-shadow">Accès Prioritaire</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm">
            Profitez d'avantages exclusifs avec votre abonnement JSK
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
          <span className="text-green-600">Accès Prioritaire</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-12">
            {/* Introduction */}
            <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Vos avantages prioritaires</h2>
              <p className="text-lg text-gray-600 mb-6">
                En tant qu'abonné JSK, vous bénéficiez d'un accès prioritaire à de nombreux services et événements tout
                au long de la saison.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/tickets/season">Découvrir nos abonnements</Link>
                </Button>
              </div>
            </motion.div>

            {/* Priority Benefits */}
            <motion.div variants={fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-green-800">Matchs de coupe</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Bénéficiez d'une période de réservation exclusive pour les matchs de coupe nationale et
                      internationale avant l'ouverture au grand public.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Réservation prioritaire 48h avant l'ouverture au grand public</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Possibilité de conserver votre place habituelle (selon disponibilité)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tarifs préférentiels sur certaines rencontres</span>
                      </li>
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <Link href="/tickets/coupe">Voir le calendrier des coupes</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-green-800">Billets supplémentaires</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Invitez vos proches aux matchs grâce à un accès prioritaire pour l'achat de billets
                      supplémentaires.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Possibilité d'acheter jusqu'à 4 billets supplémentaires par match</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Réduction de 10% sur les billets supplémentaires</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Accès à des places adjacentes à votre siège (selon disponibilité)</span>
                      </li>
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <Link href="/tickets/match-day">Acheter des billets supplémentaires</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-green-800">Événements exclusifs</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Participez à des événements exclusifs réservés aux abonnés tout au long de la saison.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Séances d'entraînement ouvertes aux abonnés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Rencontres avec les joueurs et le staff technique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Invitations à des événements spéciaux du club</span>
                      </li>
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <Link href="/tickets/evenements">Calendrier des événements</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-green-800">Renouvellement prioritaire</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Assurez-vous de conserver votre place pour la saison suivante grâce au renouvellement prioritaire.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Période de renouvellement exclusive avant l'ouverture au public</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Garantie de conserver votre place si vous renouvelez pendant cette période</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Possibilité de paiement échelonné sans frais supplémentaires</span>
                      </li>
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <Link href="/tickets/renouvellement">En savoir plus</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Questions fréquentes</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Comment puis-je bénéficier de l'accès prioritaire aux matchs de coupe ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      En tant qu'abonné, vous recevrez automatiquement un email et une notification sur l'application
                      mobile du club lorsque la période de réservation prioritaire débutera pour un match de coupe. Vous
                      pourrez alors vous connecter à votre espace personnel sur le site ou l'application pour réserver
                      vos billets avant l'ouverture au grand public.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Puis-je acheter des billets supplémentaires pour n'importe quel match ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Vous pouvez acheter des billets supplémentaires pour tous les matchs à domicile, dans la limite
                      des places disponibles. Pour les matchs à forte affluence ou les derbys, le nombre de billets
                      supplémentaires peut être limité à 2 par abonné au lieu de 4. Ces restrictions sont mises en place
                      pour permettre au plus grand nombre d'abonnés de faire profiter leurs proches.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Comment être informé des événements exclusifs pour les abonnés ?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Tous les événements exclusifs sont annoncés par email, SMS et sur l'application mobile du club.
                      Vous pouvez également consulter le calendrier des événements dans votre espace abonné sur le site
                      web. Nous vous recommandons de vérifier régulièrement ces canaux de communication pour ne manquer
                      aucune opportunité.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl shadow-lg p-8 text-green-900"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Profitez de tous ces avantages</h3>
                  <p className="text-green-900/80 max-w-xl">
                    Devenez abonné JSK et bénéficiez immédiatement de tous ces accès prioritaires pour vivre pleinement
                    votre passion.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="bg-green-700 text-white hover:bg-green-800">
                    <Link href="/tickets/season">
                      <CreditCard className="h-4 w-4 mr-2" />
                      S'abonner maintenant
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-green-700 text-green-700 hover:bg-yellow-300">
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
