"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronRight, Shield, Star, Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function GarantiePage() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: "standard",
      name: "Standard",
      price: "5000",
      description: "Garantie de place pour tous les matchs à domicile",
      features: [
        "Place garantie pour tous les matchs à domicile",
        "Priorité de réservation 48h avant la vente générale",
        "Accès à la billetterie dédiée au stade",
      ],
      badge: null,
    },
    {
      id: "premium",
      name: "Premium",
      price: "8000",
      description: "Garantie de place premium avec avantages supplémentaires",
      features: [
        "Place garantie dans les sections premium",
        "Priorité de réservation 72h avant la vente générale",
        "Accès à la billetterie dédiée au stade",
        "Réduction de 10% sur les produits officiels",
        "Accès au salon VIP avant le match",
      ],
      badge: "Populaire",
    },
    {
      id: "vip",
      name: "VIP",
      price: "15000",
      description: "Expérience VIP complète avec services exclusifs",
      features: [
        "Place garantie dans les loges VIP",
        "Priorité de réservation 1 semaine avant la vente générale",
        "Accès à l'entrée VIP dédiée",
        "Réduction de 15% sur les produits officiels",
        "Accès au salon VIP avec buffet et boissons",
        "Parking réservé au stade",
        "Rencontre avec les joueurs après certains matchs",
      ],
      badge: null,
    },
  ]

  const faqs = [
    {
      question: "Comment fonctionne la garantie de place ?",
      answer:
        "La garantie de place vous assure d'avoir accès à un billet pour chaque match à domicile de la saison. Vous recevrez une notification avant chaque match pour confirmer votre présence et choisir votre siège dans la section correspondant à votre forfait.",
    },
    {
      question: "Puis-je choisir mon siège exact ?",
      answer:
        "Oui, vous pourrez choisir votre siège exact parmi ceux disponibles dans la section correspondant à votre forfait, selon le principe du premier arrivé, premier servi lors de l'ouverture des réservations.",
    },
    {
      question: "Est-ce que je peux transférer mon billet à quelqu'un d'autre ?",
      answer:
        "Oui, vous pouvez transférer votre billet à une autre personne pour un match spécifique via notre plateforme officielle. Cependant, la garantie de place reste attachée à votre compte.",
    },
    {
      question: "Que se passe-t-il si je ne peux pas assister à un match ?",
      answer:
        "Si vous ne pouvez pas assister à un match, vous pouvez simplement ne pas confirmer votre présence. Votre place sera alors remise en vente. Notez que le montant du billet n'est pas remboursé car il fait partie du forfait global.",
    },
    {
      question: "La garantie de place inclut-elle les matchs de coupe ?",
      answer:
        "La garantie de place standard inclut uniquement les matchs de championnat à domicile. Les forfaits Premium et VIP incluent également une priorité pour l'achat de billets pour les matchs de coupe.",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Garantie de Place"
          width={1920}
          height={400}
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
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4 text-shadow">Garantie de Place</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm mb-6">
            Assurez-vous d'avoir toujours une place pour supporter la JSK à chaque match à domicile
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
          >
            <a href="#plans">Découvrir nos forfaits</a>
          </Button>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir notre garantie de place ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ne manquez plus jamais un match de la JSK avec notre programme de garantie de place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-lg p-6 text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jamais sans billet</h3>
              <p className="text-gray-600">
                Fini les files d'attente et les matchs à guichets fermés. Vous êtes assuré d'avoir une place pour chaque
                match à domicile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-lg p-6 text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accès prioritaire</h3>
              <p className="text-gray-600">
                Réservez vos places avant tout le monde et choisissez les meilleurs sièges disponibles dans votre
                section.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-lg p-6 text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Économies garanties</h3>
              <p className="text-gray-600">
                Économisez sur le prix des billets individuels et bénéficiez d'avantages exclusifs selon votre forfait.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez votre forfait</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous proposons différents forfaits pour répondre à vos besoins et à votre budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full flex flex-col ${
                    plan.badge ? "border-green-500 shadow-lg" : "border-gray-200"
                  } hover:shadow-xl transition-shadow duration-300`}
                >
                  <CardHeader className="pb-4">
                    {plan.badge && (
                      <Badge className="self-start mb-2 bg-green-100 text-green-800 hover:bg-green-100">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price} DA</span>
                      <span className="text-gray-500 ml-1">/saison</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${
                        plan.badge
                          ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                          : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
                      }`}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      <Link href="/tickets/season">Choisir ce forfait</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Suivez ces étapes simples pour profiter de votre garantie de place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-xl font-bold text-green-600">1</span>
                <div className="absolute hidden lg:block h-1 bg-green-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choisissez votre forfait</h3>
              <p className="text-gray-600">
                Sélectionnez le forfait qui correspond le mieux à vos besoins et à votre budget.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-xl font-bold text-green-600">2</span>
                <div className="absolute hidden lg:block h-1 bg-green-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Effectuez le paiement</h3>
              <p className="text-gray-600">
                Payez en ligne de manière sécurisée ou rendez-vous à nos guichets pour finaliser votre achat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-xl font-bold text-green-600">3</span>
                <div className="absolute hidden lg:block h-1 bg-green-200 w-full right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recevez vos notifications</h3>
              <p className="text-gray-600">
                Avant chaque match, vous recevrez une notification pour confirmer votre présence et choisir votre siège.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profitez du match</h3>
              <p className="text-gray-600">
                Présentez votre billet électronique à l'entrée du stade et profitez de l'ambiance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-gray-600">
              Trouvez les réponses aux questions les plus courantes sur notre garantie de place
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
            <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à ne plus jamais manquer un match ?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez notre programme de garantie de place dès aujourd'hui et assurez-vous d'être toujours aux premières
            loges pour supporter la JSK.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="/tickets/season">
              Souscrire maintenant <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
