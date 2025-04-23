"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Filter, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function UpcomingMatchesPage() {
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
      awayTeam: "usb",
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
          src="/images/img2.jpg"
          alt="JSK Upcoming Matches"
          width={1920}
          height={100}
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">Upcoming Matches</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            View all upcoming matches for Jeunesse Sportive de Kabylie
          </p>
        </motion.div>
      </section>

      {/* Matches Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Upcoming Fixtures</h2>
              <p className="text-gray-600">Don't miss any of our upcoming matches</p>
            </div>

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
                                  ? "/images/jsk.png"
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
                                  : match.awayTeam === "usb"
                                    ? "/images/usb.png"
                                    : match.awayTeam === "ESS"
                                      ? "/images/ess.png"
                                      : match.awayTeam === "MCO"
                                        ? "/images/mco.png"
                                        
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
