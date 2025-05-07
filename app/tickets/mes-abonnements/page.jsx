"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, CreditCard, Filter, Search, Ticket, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function MesAbonnementsPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Données fictives pour les abonnements
  const activeSubscriptions = [
    {
      id: "ABO-2025-001",
      type: "Saison 2024-2025",
      startDate: "15 Août 2024",
      endDate: "30 Mai 2025",
      section: "Tribune Est",
      row: "10",
      seat: "15",
      category: "Standard",
      price: "15000 DA",
      matchesAttended: 8,
      totalMatches: 19,
      renewalDate: "1 Juin 2025",
    },
  ]

  const pastSubscriptions = [
    {
      id: "ABO-2024-001",
      type: "Saison 2023-2024",
      startDate: "15 Août 2023",
      endDate: "30 Mai 2024",
      section: "Tribune Est",
      row: "12",
      seat: "22",
      category: "Standard",
      price: "12000 DA",
      matchesAttended: 15,
      totalMatches: 19,
    },
    {
      id: "ABO-2023-001",
      type: "Saison 2022-2023",
      startDate: "15 Août 2022",
      endDate: "30 Mai 2023",
      section: "Tribune Nord",
      row: "5",
      seat: "8",
      category: "Premium",
      price: "18000 DA",
      matchesAttended: 17,
      totalMatches: 19,
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[200px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=200&width=1920"
          alt="Mes Abonnements"
          width={1920}
          height={200}
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
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2 text-shadow">Mes Abonnements</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm">
            Consultez et gérez vos abonnements pour les matchs de la JSK
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  Abonnements actifs
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Abonnements passés
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Abonnements actifs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input placeholder="Rechercher..." className="pl-10" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrer
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Saison
                        </Button>
                      </div>
                    </div>

                    {activeSubscriptions.length > 0 ? (
                      <div className="space-y-6">
                        {activeSubscriptions.map((subscription) => (
                          <Card key={subscription.id} className="border border-green-100">
                            <CardContent className="p-6">
                              <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-green-100 text-green-800 px-3 py-1">Actif</Badge>
                                    <h3 className="text-xl font-bold text-green-800">{subscription.type}</h3>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Numéro d'abonnement</p>
                                      <p className="font-medium">{subscription.id}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Catégorie</p>
                                      <p className="font-medium">{subscription.category}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Période</p>
                                      <p className="font-medium">
                                        {subscription.startDate} - {subscription.endDate}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Place</p>
                                      <p className="font-medium">
                                        {subscription.section}, Rangée {subscription.row}, Siège {subscription.seat}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm text-gray-500 mb-2">Progression de la saison</p>
                                    <div className="flex items-center gap-2">
                                      <Progress
                                        value={(subscription.matchesAttended / subscription.totalMatches) * 100}
                                        className="h-2"
                                      />
                                      <span className="text-sm font-medium">
                                        {subscription.matchesAttended}/{subscription.totalMatches} matchs
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-between gap-4 lg:min-w-[200px]">
                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Prix payé</p>
                                    <p className="text-2xl font-bold text-green-800">{subscription.price}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Date de renouvellement: {subscription.renewalDate}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <Button
                                      asChild
                                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                                    >
                                      <Link href="/tickets/mes-billets">Voir mes billets</Link>
                                    </Button>
                                    <Button
                                      asChild
                                      variant="outline"
                                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                                    >
                                      <Link href="/tickets/club-abonnes">Club des abonnés</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun abonnement actif</h3>
                        <p className="text-gray-500 mb-6">
                          Vous n'avez pas d'abonnement actif pour la saison en cours.
                        </p>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                        >
                          <Link href="/tickets/season">Souscrire à un abonnement</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Abonnements passés</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input placeholder="Rechercher..." className="pl-10" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrer
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Saison
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Abonnement</TableHead>
                            <TableHead>Période</TableHead>
                            <TableHead>Place</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Matchs assistés</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastSubscriptions.map((subscription) => (
                            <TableRow key={subscription.id} className="opacity-75">
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium">{subscription.type}</span>
                                  <span className="text-gray-500 text-sm">{subscription.id}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                    {subscription.startDate}
                                  </span>
                                  <span className="flex items-center text-gray-500 text-sm">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {subscription.endDate}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>{subscription.section}</span>
                                  <span className="text-gray-500 text-sm">
                                    Rangée {subscription.row}, Siège {subscription.seat}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    subscription.category === "Premium"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                  }
                                >
                                  {subscription.category}
                                </Badge>
                              </TableCell>
                              <TableCell>{subscription.price}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span>
                                    {subscription.matchesAttended}/{subscription.totalMatches}
                                  </span>
                                  <Progress
                                    value={(subscription.matchesAttended / subscription.totalMatches) * 100}
                                    className="h-2 w-16"
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {pastSubscriptions.length === 0 && (
                      <div className="text-center py-12">
                        <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun abonnement passé</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore souscrit à des abonnements.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
