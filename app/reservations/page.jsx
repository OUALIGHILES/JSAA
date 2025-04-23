"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, Eye, Filter, Search, Ticket, Wallet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("reservations")
  const router = useRouter()
  const { toast } = useToast()

  // Données fictives pour les réservations
  const reservations = [
    {
      id: "RES-2025-001",
      match: "JSK vs MCA",
      date: "20 Avril 2025",
      time: "19:00",
      seats: ["A12", "A13"],
      category: "Standard",
      status: "confirmé",
      price: "1000 DA",
    },
    {
      id: "RES-2025-002",
      match: "JSK vs CRB",
      date: "27 Avril 2025",
      time: "20:30",
      seats: ["B45"],
      category: "Premium",
      status: "en attente",
      price: "1000 DA",
    },
    {
      id: "RES-2025-003",
      match: "JSK vs USMA",
      date: "4 Mai 2025",
      time: "18:00",
      seats: ["C78", "C79", "C80"],
      category: "VIP",
      status: "confirmé",
      price: "6000 DA",
    },
  ]

  // Données fictives pour les transactions
  const transactions = [
    {
      id: "TRX-2025-001",
      date: "15 Mars 2025",
      description: "Achat de billets - JSK vs MCA",
      amount: "-1000 DA",
      method: "Carte bancaire",
      status: "complété",
    },
    {
      id: "TRX-2025-002",
      date: "20 Mars 2025",
      description: "Achat de billets - JSK vs CRB",
      amount: "-1000 DA",
      method: "Carte bancaire",
      status: "complété",
    },
    {
      id: "TRX-2025-003",
      date: "25 Mars 2025",
      description: "Achat de billets - JSK vs USMA",
      amount: "-6000 DA",
      method: "Virement bancaire",
      status: "complété",
    },
    {
      id: "TRX-2025-004",
      date: "2 Avril 2025",
      description: "Remboursement - JSK vs ESS (Match annulé)",
      amount: "+2000 DA",
      method: "Crédit compte",
      status: "complété",
    },
  ]

  const handleDownloadTicket = (id) => {
    toast({
      title: "Téléchargement en cours",
      description: `Le billet ${id} est en cours de téléchargement.`,
      variant: "success",
    })
  }

  const handleViewDetails = (id) => {
    toast({
      title: "Détails de la réservation",
      description: `Affichage des détails pour la réservation ${id}.`,
      variant: "default",
    })
  }

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
          alt="Mes Réservations"
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
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2 text-shadow">Mes Réservations</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm">Gérez vos réservations et transactions</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="reservations" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="reservations"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  Réservations
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Transactions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="reservations" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Mes Réservations de Billets</CardTitle>
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
                          Date
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Match</TableHead>
                            <TableHead>Date & Heure</TableHead>
                            <TableHead>Places</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                              <TableCell className="font-medium">{reservation.id}</TableCell>
                              <TableCell>{reservation.match}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                    {reservation.date}
                                  </span>
                                  <span className="flex items-center text-gray-500 text-sm">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {reservation.time}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{reservation.seats.join(", ")}</TableCell>
                              <TableCell>{reservation.category}</TableCell>
                              <TableCell>{reservation.price}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    reservation.status === "confirmé"
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  }
                                >
                                  {reservation.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewDetails(reservation.id)}
                                    className="h-8 w-8"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDownloadTicket(reservation.id)}
                                    className="h-8 w-8"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {reservations.length === 0 && (
                      <div className="text-center py-12">
                        <Ticket className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation trouvée</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore de réservations de billets.</p>
                        <Button
                          onClick={() => router.push("/tickets")}
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                        >
                          Acheter des billets
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Prochains Matchs</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">3 billets</Badge>
                      </div>
                      <p className="text-gray-500 mb-4">Vos prochains matchs à venir</p>
                      <Button variant="outline" className="w-full" onClick={() => router.push("/tickets")}>
                        Voir les détails
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Abonnements</h3>
                        <Badge className="bg-green-100 text-green-800">Actif</Badge>
                      </div>
                      <p className="text-gray-500 mb-4">Gérez vos abonnements de saison</p>
                      <Button variant="outline" className="w-full" onClick={() => router.push("/tickets/season")}>
                        Gérer l'abonnement
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Assistance</h3>
                        <Badge className="bg-blue-100 text-blue-800">Support</Badge>
                      </div>
                      <p className="text-gray-500 mb-4">Besoin d'aide avec vos réservations ?</p>
                      <Button variant="outline" className="w-full">
                        Contacter le support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Historique des Transactions</CardTitle>
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
                          Date
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Méthode</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.id}</TableCell>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                              <TableCell
                                className={transaction.amount.startsWith("+") ? "text-green-600" : "text-red-600"}
                              >
                                {transaction.amount}
                              </TableCell>
                              <TableCell>{transaction.method}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    transaction.status === "complété"
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {transactions.length === 0 && (
                      <div className="text-center py-12">
                        <Wallet className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune transaction trouvée</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore effectué de transactions.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <div className="flex items-start">
                    <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                      <Wallet className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">À propos des transactions</h3>
                      <p className="text-yellow-700 mb-2">
                        Toutes vos transactions liées aux achats de billets et d'abonnements sont enregistrées ici. Les
                        remboursements sont traités dans un délai de 5 à 10 jours ouvrables.
                      </p>
                      <p className="text-yellow-700">
                        Pour toute question concernant vos transactions, veuillez contacter notre service client à{" "}
                        <span className="font-medium">support@jskstade.dz</span> ou appelez le{" "}
                        <span className="font-medium">+213 XX XX XX XX</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
