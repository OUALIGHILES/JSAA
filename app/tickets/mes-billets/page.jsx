"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Download, Eye, Filter, Printer, QrCode, Search, Ticket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MesBilletsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [printMode, setPrintMode] = useState(false)
  const ticketRef = useRef(null)
  const { toast } = useToast()

  // Données fictives pour les billets
  const upcomingTickets = [
    {
      id: "TKT-2025-001",
      match: "JSK vs MCA",
      date: "20 Avril 2025",
      time: "19:00",
      stadium: "Stade Hocine Ait Ahmed",
      gate: "Est",
      section: "A",
      row: "12",
      seat: "15",
      category: "Standard",
      price: "1000 DA",
      qrCode: "/placeholder.svg?height=200&width=200",
      homeTeamLogo: "/images/jsk-logo.png",
      awayTeamLogo: "/images/mca-logo.png",
    },
    {
      id: "TKT-2025-002",
      match: "JSK vs CRB",
      date: "27 Avril 2025",
      time: "20:30",
      stadium: "Stade Hocine Ait Ahmed",
      gate: "Nord",
      section: "B",
      row: "5",
      seat: "22",
      category: "Premium",
      price: "2000 DA",
      qrCode: "/placeholder.svg?height=200&width=200",
      homeTeamLogo: "/images/jsk-logo.png",
      awayTeamLogo: "/images/crb-logo.png",
    },
    {
      id: "TKT-2025-003",
      match: "JSK vs USMA",
      date: "4 Mai 2025",
      time: "18:00",
      stadium: "Stade Hocine Ait Ahmed",
      gate: "VIP",
      section: "C",
      row: "1",
      seat: "8",
      category: "VIP",
      price: "3000 DA",
      qrCode: "/placeholder.svg?height=200&width=200",
      homeTeamLogo: "/images/jsk-logo.png",
      awayTeamLogo: "/images/usma-logo.png",
    },
  ]

  const pastTickets = [
    {
      id: "TKT-2024-045",
      match: "JSK vs ESS",
      date: "10 Mars 2025",
      time: "19:00",
      stadium: "Stade Hocine Ait Ahmed",
      gate: "Est",
      section: "D",
      row: "8",
      seat: "12",
      category: "Standard",
      price: "1000 DA",
      qrCode: "/placeholder.svg?height=200&width=200",
      homeTeamLogo: "/images/jsk-logo.png",
      awayTeamLogo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "TKT-2024-032",
      match: "JSK vs CSC",
      date: "25 Février 2025",
      time: "16:30",
      stadium: "Stade Hocine Ait Ahmed",
      gate: "Ouest",
      section: "E",
      row: "15",
      seat: "7",
      category: "Standard",
      price: "1000 DA",
      qrCode: "/placeholder.svg?height=200&width=200",
      homeTeamLogo: "/images/jsk-logo.png",
      awayTeamLogo: "/placeholder.svg?height=50&width=50",
    },
  ]

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket)
  }

  // Remplacer useReactToPrint par une fonction qui utilise ReactToPrint
  const handlePrint = () => {
    setPrintMode(true)
    setTimeout(() => {
      if (ticketRef.current) {
        window.print()
        setPrintMode(false)
        toast({
          title: "Impression réussie",
          description: "Votre billet a été imprimé avec succès.",
        })
      }
    }, 100)
  }

  const handleDownloadTicket = (ticket) => {
    // Simuler le téléchargement
    toast({
      title: "Téléchargement en cours",
      description: `Le billet ${ticket.id} est en cours de téléchargement.`,
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
          alt="Mes Billets"
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
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2 text-shadow">Mes Billets</h1>
          <p className="text-lg text-white/90 max-w-2xl text-shadow-sm">
            Consultez et gérez vos billets pour les matchs de la JSK
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Matchs à venir
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Matchs passés
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Billets pour les matchs à venir</CardTitle>
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
                            <TableHead>Match</TableHead>
                            <TableHead>Date & Heure</TableHead>
                            <TableHead>Place</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={ticket.homeTeamLogo || "/placeholder.svg"}
                                        alt="Home Team"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="text-xs">vs</span>
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={ticket.awayTeamLogo || "/placeholder.svg"}
                                        alt="Away Team"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  </div>
                                  <span>{ticket.match}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                    {ticket.date}
                                  </span>
                                  <span className="flex items-center text-gray-500 text-sm">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {ticket.time}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>Section {ticket.section}</span>
                                  <span className="text-gray-500 text-sm">
                                    Rangée {ticket.row}, Siège {ticket.seat}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    ticket.category === "VIP"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : ticket.category === "Premium"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-green-100 text-green-800"
                                  }
                                >
                                  {ticket.category}
                                </Badge>
                              </TableCell>
                              <TableCell>{ticket.price}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewTicket(ticket)}
                                    className="h-8 w-8"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDownloadTicket(ticket)}
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

                    {upcomingTickets.length === 0 && (
                      <div className="text-center py-12">
                        <Ticket className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun billet trouvé</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore de billets pour les matchs à venir.</p>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                        >
                          <Link href="/tickets/choix">Acheter des billets</Link>
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
                    <CardTitle className="text-xl">Billets pour les matchs passés</CardTitle>
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
                            <TableHead>Match</TableHead>
                            <TableHead>Date & Heure</TableHead>
                            <TableHead>Place</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastTickets.map((ticket) => (
                            <TableRow key={ticket.id} className="opacity-75">
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={ticket.homeTeamLogo || "/placeholder.svg"}
                                        alt="Home Team"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="text-xs">vs</span>
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={ticket.awayTeamLogo || "/placeholder.svg"}
                                        alt="Away Team"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  </div>
                                  <span>{ticket.match}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                    {ticket.date}
                                  </span>
                                  <span className="flex items-center text-gray-500 text-sm">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {ticket.time}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>Section {ticket.section}</span>
                                  <span className="text-gray-500 text-sm">
                                    Rangée {ticket.row}, Siège {ticket.seat}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-gray-100 text-gray-800">{ticket.category}</Badge>
                              </TableCell>
                              <TableCell>{ticket.price}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewTicket(ticket)}
                                    className="h-8 w-8"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {pastTickets.length === 0 && (
                      <div className="text-center py-12">
                        <Ticket className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun billet trouvé</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore assisté à des matchs.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Ticket Preview Modal */}
          {selectedTicket && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-green-800">Détails du Billet</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handlePrint}>
                        <Printer className="h-4 w-4" />
                        Imprimer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleDownloadTicket(selectedTicket)}
                      >
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                        ✕
                      </Button>
                    </div>
                  </div>

                  <div ref={ticketRef} className={`${printMode ? "p-8" : ""}`}>
                    {/* Ticket Design */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Ticket Header */}
                      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                              <Image src="/images/jsk-logo.png" alt="JSK Logo" fill className="object-contain" />
                            </div>
                            <div>
                              <h4 className="font-bold">Stade JSK</h4>
                              <p className="text-xs text-white/80">Billet Officiel</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{selectedTicket.id}</p>
                            <p className="text-xs text-white/80">Stade Hocine Ait Ahmed</p>
                          </div>
                        </div>
                      </div>

                      {/* Match Info */}
                      <div className="p-6 bg-white">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 mb-2">
                              <Image
                                src={selectedTicket.homeTeamLogo || "/placeholder.svg"}
                                alt="Home Team"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="font-semibold text-sm">JSK</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Match de Ligue 1</p>
                            <p className="text-xl font-bold">VS</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <p className="text-sm">{selectedTicket.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <p className="text-sm">{selectedTicket.time}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 mb-2">
                              <Image
                                src={selectedTicket.awayTeamLogo || "/placeholder.svg"}
                                alt="Away Team"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="font-semibold text-sm">{selectedTicket.match.split(" vs ")[1]}</p>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-4 pb-2">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Porte</p>
                              <p className="font-semibold">{selectedTicket.gate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Section</p>
                              <p className="font-semibold">{selectedTicket.section}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Catégorie</p>
                              <p className="font-semibold">{selectedTicket.category}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Rangée</p>
                              <p className="font-semibold">{selectedTicket.row}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Siège</p>
                              <p className="font-semibold">{selectedTicket.seat}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Prix</p>
                              <p className="font-semibold">{selectedTicket.price}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="text-center">
                            <div className="mb-2 bg-white p-2 inline-block rounded-lg">
                              <QrCode className="h-32 w-32 text-green-800" />
                            </div>
                            <p className="text-xs text-gray-500">Scannez ce code à l'entrée du stade</p>
                          </div>
                        </div>

                        <div className="mt-6 text-center text-xs text-gray-500">
                          <p>
                            Ce billet est personnel et ne peut être revendu. Une pièce d'identité peut être demandée.
                          </p>
                          <p className="mt-1">Pour toute assistance: support@jskstade.dz | +213 XX XX XX XX</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
