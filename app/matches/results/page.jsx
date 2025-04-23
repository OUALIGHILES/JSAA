"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Filter, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ResultsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const pastMatches = [
    {
      id: 1,
      date: "March 15, 2025",
      time: "19:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "CSC",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "2-1",
      scorers: ["Hamroun (23')", "Boulahia (67')"],
      opponentScorers: ["Belkacemi (55')"],
      highlights: true,
    },
    {
      id: 2,
      date: "March 5, 2025",
      time: "20:30",
      competition: "Algerian Ligue 1",
      homeTeam: "PAC",
      awayTeam: "JSK",
      stadium: "Omar Hamadi Stadium, Algiers",
      result: "0-3",
      scorers: ["Boulahia (12')", "Hamroun (45')", "Benchaira (78')"],
      opponentScorers: [],
      highlights: true,
    },
    {
      id: 3,
      date: "February 25, 2025",
      time: "18:00",
      competition: "CAF Champions League",
      homeTeam: "JSK",
      awayTeam: "Esperance",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "1-1",
      scorers: ["Hamroun (34')"],
      opponentScorers: ["Ben Romdhane (67')"],
      highlights: true,
    },
    {
      id: 4,
      date: "February 15, 2025",
      time: "19:30",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "MCA",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "3-0",
      scorers: ["Boulahia (15')", "Benchaira (42')", "Hamroun (76')"],
      opponentScorers: [],
      highlights: true,
    },
    {
      id: 5,
      date: "February 5, 2025",
      time: "20:00",
      competition: "Algerian Cup",
      homeTeam: "NAHD",
      awayTeam: "JSK",
      stadium: "20 August 1955 Stadium, Algiers",
      result: "1-2",
      scorers: ["Boulahia (23')", "Hamroun (89')"],
      opponentScorers: ["Yaya (56')"],
      highlights: false,
    },
    {
      id: 6,
      date: "January 25, 2025",
      time: "18:30",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "CRB",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
      result: "2-0",
      scorers: ["Benchaira (34')", "Boulahia (78')"],
      opponentScorers: [],
      highlights: false,
    },
  ]

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
          src="/images/equ.png"
          alt="JSK Match Results"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">Match Results</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            View all recent match results for Jeunesse Sportive de Kabylie
          </p>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Recent Results</h2>
              <p className="text-gray-600">Check out our recent performances</p>
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

                      <div className="flex items-center justify-between mb-6">
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
                                          : match.homeTeam === "PAC"
                                        ? "/images/pac.png"
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
                          <div className="px-4 py-2 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                            <span className="text-xl font-bold">{match.result}</span>
                          </div>
                          <span className="text-sm text-gray-500">Full Time</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-3">
                            <Image
                              src={
                                match.awayTeam === "JSK"
                                  ? "/images/jsk.png"
                                  : match.awayTeam === "MCA"
                                    ? "/images/mca-logo.png"
                                    : match.awayTeam === "USMA"
                                      ? "/images/usma-logo.png"
                                      : match.awayTeam === "CRB"
                                        ? "/images/crb-logo.png"
                                         : match.awayTeam === "CSC"
                                        ? "/images/csc.png"
                                       
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

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold mb-2">Scorers</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                              <Image
                                src={
                                  match.homeTeam === "JSK" || match.awayTeam === "JSK"
                                    ? "/images/jsk-logo.png"
                                    : "/placeholder.svg?height=24&width=24"
                                }
                                alt="Team Logo"
                                width={24}
                                height={24}
                              />
                            </div>
                            <span className="text-sm">
                              {match.homeTeam === "JSK" || match.awayTeam === "JSK"
                                ? match.scorers.join(", ")
                                : match.opponentScorers.join(", ")}
                            </span>
                          </div>
                          {(match.homeTeam !== "JSK" && match.opponentScorers.length > 0) ||
                          (match.awayTeam !== "JSK" && match.scorers.length > 0) ? (
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                                <Image
                                  src={
                                    match.homeTeam === "JSK"
                                      ? match.awayTeam === "MCA"
                                        ? "/images/mca-logo.png"
                                        : match.awayTeam === "USMA"
                                          ? "/images/usma-logo.png"
                                          : match.awayTeam === "CRB"
                                            ? "/images/crb-logo.png"
                                            : "/placeholder.svg?height=24&width=24"
                                      : match.homeTeam === "MCA"
                                        ? "/images/mca-logo.png"
                                        : match.homeTeam === "USMA"
                                          ? "/images/usma-logo.png"
                                          : match.homeTeam === "CRB"
                                            ? "/images/crb-logo.png"
                                            : "/placeholder.svg?height=24&width=24"
                                  }
                                  alt="Opponent Team Logo"
                                  width={24}
                                  height={24}
                                />
                              </div>
                              <span className="text-sm">
                                {match.homeTeam === "JSK" ? match.opponentScorers.join(", ") : match.scorers.join(", ")}
                              </span>
                            </div>
                          ) : null}
                        </div>
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
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Season Statistics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our performance statistics for the 2024-2025 season
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
                <h3 className="text-xl font-bold">League Performance</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">18</div>
                    <div className="text-sm text-gray-500">Wins</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-500">4</div>
                    <div className="text-sm text-gray-500">Draws</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-500">2</div>
                    <div className="text-sm text-gray-500">Losses</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Win Rate</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
                <h3 className="text-xl font-bold">Goal Statistics</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">52</div>
                    <div className="text-sm text-gray-500">Goals Scored</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-500">20</div>
                    <div className="text-sm text-gray-500">Goals Conceded</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Goal Difference</span>
                    <span className="text-sm font-medium">+32</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
                <h3 className="text-xl font-bold">Top Scorers</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Hamroun</span>
                    </div>
                    <span className="font-bold">15 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Boulahia</span>
                    </div>
                    <span className="font-bold">12 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Benchaira</span>
                    </div>
                    <span className="font-bold">9 goals</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
