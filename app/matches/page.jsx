"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Filter, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function MatchesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const upcomingMatches = [
    {
      id: 1,
      date: "April 20, 2025",
      time: "19:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "MCA",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: true,
    },
    {
      id: 2,
      date: "April 27, 2025",
      time: "20:30",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "CRB",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: true,
    },
    {
      id: 3,
      date: "May 4, 2025",
      time: "18:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "USMA",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: true,
    },
    {
      id: 4,
      date: "May 15, 2025",
      time: "20:00",
      competition: "CAF Champions League",
      homeTeam: "JSK",
      awayTeam: "Al Ahly",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: false,
    },
    {
      id: 5,
      date: "May 25, 2025",
      time: "19:30",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "ESS",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: false,
    },
    {
      id: 6,
      date: "June 2, 2025",
      time: "18:30",
      competition: "Algerian Cup",
      homeTeam: "JSK",
      awayTeam: "MCO",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      ticketsAvailable: false,
    },
  ]

  const pastMatches = [
    {
      id: 7,
      date: "March 15, 2025",
      time: "19:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "CSC",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "2-1",
    },
    {
      id: 8,
      date: "March 5, 2025",
      time: "20:30",
      competition: "Algerian Ligue 1",
      homeTeam: "PAC",
      awayTeam: "JSK",
      stadium: "Omar Hamadi Stadium, Algiers",
      result: "0-3",
    },
    {
      id: 9,
      date: "February 25, 2025",
      time: "18:00",
      competition: "CAF Champions League",
      homeTeam: "JSK",
      awayTeam: "Esperance",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "1-1",
    },
  ]

  const filteredUpcomingMatches = upcomingMatches
    .filter((match) => {
      if (activeFilter === "all") return true
      if (activeFilter === "league" && match.competition === "Algerian Ligue 1") return true
      if (activeFilter === "cup" && match.competition === "Algerian Cup") return true
      if (activeFilter === "champions" && match.competition === "CAF Champions League") return true
      return false
    })
    .filter((match) => {
      if (!searchQuery) return true
      return (
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.competition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  const filteredPastMatches = pastMatches
    .filter((match) => {
      if (activeFilter === "all") return true
      if (activeFilter === "league" && match.competition === "Algerian Ligue 1") return true
      if (activeFilter === "cup" && match.competition === "Algerian Cup") return true
      if (activeFilter === "champions" && match.competition === "CAF Champions League") return true
      return false
    })
    .filter((match) => {
      if (!searchQuery) return true
      return (
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.competition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="JSK Matches"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">JSK Match Schedule</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            View all upcoming and past matches for Jeunesse Sportive de Kabylie
          </p>
        </motion.div>
      </section>

      {/* Matches Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Upcoming Matches
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Past Results
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search matches..."
                    className="pl-10 pr-4 py-2 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full md:w-auto"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </Button>

                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                    >
                      <div className="py-1">
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            activeFilter === "all" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                          onClick={() => setActiveFilter("all")}
                        >
                          All Competitions
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            activeFilter === "league" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                          onClick={() => setActiveFilter("league")}
                        >
                          Algerian Ligue 1
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            activeFilter === "cup" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                          onClick={() => setActiveFilter("cup")}
                        >
                          Algerian Cup
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            activeFilter === "champions" ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                          onClick={() => setActiveFilter("champions")}
                        >
                          CAF Champions League
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <TabsContent value="upcoming" className="mt-6">
              {filteredUpcomingMatches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No matches found matching your criteria.</p>
                  <Button
                    variant="link"
                    className="mt-2 text-green-600"
                    onClick={() => {
                      setActiveFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredUpcomingMatches.map((match) => (
                    <motion.div key={match.id} variants={fadeIn} whileHover={{ y: -5 }}>
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
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
                        <CardContent className="p-6 flex flex-col h-full">
                          <Badge className="self-start mb-4 bg-yellow-500 hover:bg-yellow-600 text-xs">
                            {match.competition}
                          </Badge>

                          <div className="flex items-center justify-between mb-6 flex-grow">
                            <div className="flex flex-col items-center">
                              <div className="mb-3">
                                <Image
                                  src={
                                    match.homeTeam === "JSK"
                                      ? "/images/jsk-logo.png"
                                      : match.homeTeam === "MCA"
                                        ? "/images/mca-logo.png"
                                        : match.homeTeam === "USMA"
                                          ? "/images/usma-logo.png"
                                          : match.homeTeam === "CRB"
                                            ? "/images/crb-logo.png"
                                            : "/placeholder.svg?height=70&width=70"
                                  }
                                  alt={match.homeTeam}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <span className="font-bold text-lg">{match.homeTeam}</span>
                            </div>
                            <div className="text-center">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                <span className="text-xl font-bold text-gray-400">VS</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="mb-3">
                                <Image
                                  src={
                                    match.awayTeam === "JSK"
                                      ? "/images/jsk-logo.png"
                                      : match.awayTeam === "MCA"
                                        ? "/images/mca-logo.png"
                                        : match.awayTeam === "USMA"
                                          ? "/images/usma-logo.png"
                                          : match.awayTeam === "CRB"
                                            ? "/images/crb-logo.png"
                                            : "/placeholder.svg?height=70&width=70"
                                  }
                                  alt={match.awayTeam}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <span className="font-bold text-lg">{match.awayTeam}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            <span>{match.stadium}</span>
                          </div>

                          {match.ticketsAvailable ? (
                            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold py-5 rounded-lg transition-all duration-300">
                              Book Tickets
                            </Button>
                          ) : (
                            <Button
                              className="w-full bg-gray-100 text-gray-500 font-semibold py-5 rounded-lg cursor-not-allowed"
                              disabled
                            >
                              Tickets Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {filteredPastMatches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No matches found matching your criteria.</p>
                  <Button
                    variant="link"
                    className="mt-2 text-green-600"
                    onClick={() => {
                      setActiveFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredPastMatches.map((match) => (
                    <motion.div key={match.id} variants={fadeIn} whileHover={{ y: -5 }}>
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3 px-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-yellow-300" />
                            <span className="text-sm font-medium">{match.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-yellow-300" />
                            <span className="text-sm font-medium">{match.time}</span>
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <Badge className="self-start mb-4 bg-yellow-500 hover:bg-yellow-600 text-xs">
                            {match.competition}
                          </Badge>

                          <div className="flex items-center justify-between mb-6 flex-grow">
                            <div className="flex flex-col items-center">
                              <div className="mb-3">
                                <Image
                                  src="/placeholder.svg?height=70&width=70"
                                  alt={match.homeTeam}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <span className="font-bold text-lg">{match.homeTeam}</span>
                            </div>
                            <div className="text-center">
                              <div className="px-4 py-2 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                                <span className="text-xl font-bold">{match.result}</span>
                              </div>
                              <span className="text-sm text-gray-500">Full Time</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="mb-3">
                                <Image
                                  src="/placeholder.svg?height=70&width=70"
                                  alt={match.awayTeam}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <span className="font-bold text-lg">{match.awayTeam}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            <span>{match.stadium}</span>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full border-green-600 text-green-700 hover:bg-green-50 font-semibold py-5 rounded-lg transition-all duration-300"
                          >
                            Match Details
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* League Table Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Algerian Ligue 1 Standings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Current standings for the 2024-2025 Algerian Ligue 1 season
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[700px] bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-green-700 to-green-600 text-white">
                  <th className="py-4 px-6 text-left">Pos</th>
                  <th className="py-4 px-6 text-left">Team</th>
                  <th className="py-4 px-6 text-center">P</th>
                  <th className="py-4 px-6 text-center">W</th>
                  <th className="py-4 px-6 text-center">D</th>
                  <th className="py-4 px-6 text-center">L</th>
                  <th className="py-4 px-6 text-center">GD</th>
                  <th className="py-4 px-6 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-yellow-50 border-l-4 border-yellow-500">
                  <td className="py-4 px-6 font-bold">1</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3">
                        <Image src="/images/jsk-logo.png" alt="JSK" width={32} height={32} />
                      </div>
                      <span className="font-medium">JSK</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">24</td>
                  <td className="py-4 px-6 text-center">18</td>
                  <td className="py-4 px-6 text-center">4</td>
                  <td className="py-4 px-6 text-center">2</td>
                  <td className="py-4 px-6 text-center">+32</td>
                  <td className="py-4 px-6 text-center font-bold">58</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold">2</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3">
                        <Image src="/images/mca-logo.png" alt="MCA" width={32} height={32} />
                      </div>
                      <span className="font-medium">MCA</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">24</td>
                  <td className="py-4 px-6 text-center">16</td>
                  <td className="py-4 px-6 text-center">5</td>
                  <td className="py-4 px-6 text-center">3</td>
                  <td className="py-4 px-6 text-center">+24</td>
                  <td className="py-4 px-6 text-center font-bold">53</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold">3</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3">
                        <Image src="/images/crb-logo.png" alt="CRB" width={32} height={32} />
                      </div>
                      <span className="font-medium">CRB</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">24</td>
                  <td className="py-4 px-6 text-center">15</td>
                  <td className="py-4 px-6 text-center">5</td>
                  <td className="py-4 px-6 text-center">4</td>
                  <td className="py-4 px-6 text-center">+18</td>
                  <td className="py-4 px-6 text-center font-bold">50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold">4</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3">
                        <Image src="/images/usma-logo.png" alt="USMA" width={32} height={32} />
                      </div>
                      <span className="font-medium">USMA</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">24</td>
                  <td className="py-4 px-6 text-center">14</td>
                  <td className="py-4 px-6 text-center">4</td>
                  <td className="py-4 px-6 text-center">6</td>
                  <td className="py-4 px-6 text-center">+15</td>
                  <td className="py-4 px-6 text-center font-bold">46</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold">5</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3">
                        <Image src="/placeholder.svg?height=32&width=32" alt="CSC" width={32} height={32} />
                      </div>
                      <span className="font-medium">CSC</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">24</td>
                  <td className="py-4 px-6 text-center">12</td>
                  <td className="py-4 px-6 text-center">7</td>
                  <td className="py-4 px-6 text-center">5</td>
                  <td className="py-4 px-6 text-center">+10</td>
                  <td className="py-4 px-6 text-center font-bold">43</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
              View Full Table
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
              <h2 className="text-3xl font-bold mb-4">Don't Miss the Action!</h2>
              <p className="text-white/90 max-w-xl">
                Secure your tickets now for all upcoming JSK matches at the Hocine Ait Ahmed Stadium.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/tickets">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold px-8 py-3 rounded-lg shadow-lg">
                  Book Tickets Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
