"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState("league")

  const leagueStandings = [
   
    {
      position: 1,
      team: "MCA",
      logo: "/images/mca-logo.png",
      played: 21,
      won: 11,
      drawn: 8,
      lost: 2,
      goalsFor: 27,
      goalsAgainst: 15,
      goalDifference: 12,
      points: 41,
      form: ["W", "W", "W", "D", "L"],
    },
    {
      position: 2,
      team: "CRB",
      logo: "/images/crb-logo.png",
      played: 22,
      won: 11,
      drawn: 4,
      lost: 5,
      goalsFor: 31,
      goalsAgainst: 13,
      goalDifference: 18,
      points: 40,
      form: ["W", "D", "D", "W", "W"],
    },
    {
      position: 3,
      team: "JSK",
      logo: "/images/jsk.png",
      played: 22,
      won: 10,
      drawn: 7,
      lost: 5,
      goalsFor: 29,
      goalsAgainst: 21,
      goalDifference: 8,
      points: 37,
      form: ["W", "D", "W", "W", "D"],
    },
    {
      position: 4,
      team: "USMA",
      logo: "/images/usma-logo.png",
      played: 20,
      won: 10,
      drawn: 7,
      lost: 3,
      goalsFor: 19,
      goalsAgainst: 10,
      goalDifference: 9,
      points: 37,
      form: ["D", "W", "L", "W", "D"],
    },
    {
      position: 5,
      team: "Ess",
      logo: "/images/ess.png",
      won: 8,
      played: 20,
      drawn: 9,
      lost: 3,
      goalsFor: 17,
      goalsAgainst: 15,
      goalDifference: 2,
      points: 31,
      form: ["D", "W", "L", "W", "D"],
    },
    {
      position: 6,
      team: "PAC",
      logo: "/images/pac.png",
      played: 24,
      won: 9,
      drawn: 7,
      lost: 8,
      goalsFor: 28,
      goalsAgainst: 30,
      goalDifference: -2,
      points: 34,
      form: ["L", "L", "W", "D", "W"],
    },
    {
      position: 7,
      team: "EL Bayedh",
      logo: "/images/bayedh.png",
      played: 24,
      won: 11,
      drawn: 8,
      lost: 5,
      goalsFor: 32,
      goalsAgainst: 23,
      goalDifference: 9,
      points: 41,
      form: ["W", "D", "D", "W", "L"],
    },
    {
      position: 8,
      team: "ASO",
      logo: "/images/aso.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 9,
      team: "JS SAOURA",
      logo: "/images/jss.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 10,
      team: "CSC",
      logo: "/images/csc.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 11,
      team: "O AKBOU",
      logo: "/images/akbou.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 12,
      team: "MCO",
      logo: "/images/mco.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 13,
      team: "USMK",
      logo: "/images/usmk.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
   
    {
      position: 14,
      team: "ES MUSTAGHANEM",
      logo: "/images/esm.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 15,
      team: "NC MAGRA",
      logo: "/images/ncm.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 16,
      team: "US BISKRA",
      logo: "/images/usb.png",
      played: 24,
      won: 10,
      drawn: 8,
      lost: 6,
      goalsFor: 30,
      goalsAgainst: 25,
      goalDifference: 5,
      points: 38,
      form: ["D", "W", "L", "D", "W"],
    },
   
  ]

  const championsLeagueStandings = [
    {
      position: 1,
      team: "Al Ahly",
      logo: "/placeholder.svg?height=32&width=32",
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      goalsFor: 12,
      goalsAgainst: 3,
      goalDifference: 9,
      points: 13,
      form: ["W", "W", "D", "W", "W"],
    },
    {
      position: 2,
      team: "JSK",
      logo: "/images/jsk-logo.png",
      played: 5,
      won: 3,
      drawn: 2,
      lost: 0,
      goalsFor: 8,
      goalsAgainst: 3,
      goalDifference: 5,
      points: 11,
      form: ["W", "D", "W", "D", "W"],
    },
    {
      position: 3,
      team: "Esperance",
      logo: "/placeholder.svg?height=32&width=32",
      played: 5,
      won: 2,
      drawn: 2,
      lost: 1,
      goalsFor: 7,
      goalsAgainst: 5,
      goalDifference: 2,
      points: 8,
      form: ["D", "W", "L", "D", "W"],
    },
    {
      position: 4,
      team: "Wydad",
      logo: "/placeholder.svg?height=32&width=32",
      played: 5,
      won: 1,
      drawn: 1,
      lost: 3,
      goalsFor: 4,
      goalsAgainst: 8,
      goalDifference: -4,
      points: 4,
      form: ["L", "D", "L", "W", "L"],
    },
    {
      position: 5,
      team: "Simba SC",
      logo: "/placeholder.svg?height=32&width=32",
      played: 5,
      won: 0,
      drawn: 0,
      lost: 5,
      goalsFor: 2,
      goalsAgainst: 14,
      goalDifference: -12,
      points: 0,
      form: ["L", "L", "L", "L", "L"],
    },
  ]

  const cupStandings = [
    {
      round: "Quarter-Finals",
      matches: [
        {
          home: "JSK",
          homeLogo: "/images/jsk-logo.png",
          away: "USMA",
          awayLogo: "/images/usma-logo.png",
          date: "April 15, 2025",
          status: "Upcoming",
        },
        {
          home: "MCA",
          homeLogo: "/images/mca-logo.png",
          away: "CSC",
          awayLogo: "/placeholder.svg?height=32&width=32",
          date: "April 16, 2025",
          status: "Upcoming",
        },
        {
          home: "CRB",
          homeLogo: "/images/crb-logo.png",
          away: "ESS",
          awayLogo: "/placeholder.svg?height=32&width=32",
          date: "April 17, 2025",
          status: "Upcoming",
        },
        {
          home: "MCO",
          homeLogo: "/placeholder.svg?height=32&width=32",
          away: "PAC",
          awayLogo: "/placeholder.svg?height=32&width=32",
          date: "April 18, 2025",
          status: "Upcoming",
        },
      ],
    },
    {
      round: "Round of 16",
      matches: [
        {
          home: "JSK",
          homeLogo: "/images/jsk-logo.png",
          away: "NAHD",
          awayLogo: "/placeholder.svg?height=32&width=32",
          result: "2-1",
          status: "Completed",
        },
        {
          home: "USMA",
          homeLogo: "/images/usma-logo.png",
          away: "ASO",
          awayLogo: "/placeholder.svg?height=32&width=32",
          result: "3-0",
          status: "Completed",
        },
        {
          home: "MCA",
          homeLogo: "/images/mca-logo.png",
          away: "WAT",
          awayLogo: "/placeholder.svg?height=32&width=32",
          result: "2-0",
          status: "Completed",
        },
        {
          home: "CSC",
          homeLogo: "/placeholder.svg?height=32&width=32",
          away: "JSS",
          awayLogo: "/placeholder.svg?height=32&width=32",
          result: "1-0",
          status: "Completed",
        },
      ],
    },
  ]

  const renderFormIcon = (result) => {
    switch (result) {
      case "W":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "L":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "D":
        return <Minus className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="JSK Standings"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">League Standings</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            Check out the current standings for all competitions
          </p>
        </motion.div>
      </section>

      {/* Standings Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="league" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="league"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Algerian Ligue 1
                </TabsTrigger>
                <TabsTrigger
                  value="champions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Champions League
                </TabsTrigger>
                <TabsTrigger
                  value="cup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Algerian Cup
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="league" className="mt-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white flex items-center">
                  <Trophy className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">Algerian Ligue 1 Standings 2024-2025</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left">Pos</th>
                        <th className="py-3 px-4 text-left">Team</th>
                        <th className="py-3 px-4 text-center">P</th>
                        <th className="py-3 px-4 text-center">W</th>
                        <th className="py-3 px-4 text-center">D</th>
                        <th className="py-3 px-4 text-center">L</th>
                        <th className="py-3 px-4 text-center">GF</th>
                        <th className="py-3 px-4 text-center">GA</th>
                        <th className="py-3 px-4 text-center">GD</th>
                        <th className="py-3 px-4 text-center">Pts</th>
                        <th className="py-3 px-4 text-center">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leagueStandings.map((team) => (
                        <tr
                          key={team.position}
                          className={`border-b hover:bg-gray-50 ${
                            team.team === "JSK" ? "bg-yellow-50 border-l-4 border-yellow-500" : ""
                          }`}
                        >
                          <td className="py-4 px-4 font-bold">{team.position}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 mr-3">
                                <Image src={team.logo || "/placeholder.svg"} alt={team.team} width={32} height={32} />
                              </div>
                              <span className="font-medium">{team.team}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">{team.played}</td>
                          <td className="py-4 px-4 text-center">{team.won}</td>
                          <td className="py-4 px-4 text-center">{team.drawn}</td>
                          <td className="py-4 px-4 text-center">{team.lost}</td>
                          <td className="py-4 px-4 text-center">{team.goalsFor}</td>
                          <td className="py-4 px-4 text-center">{team.goalsAgainst}</td>
                          <td className="py-4 px-4 text-center font-medium">
                            <span
                              className={
                                team.goalDifference > 0
                                  ? "text-green-600"
                                  : team.goalDifference < 0
                                    ? "text-red-600"
                                    : ""
                              }
                            >
                              {team.goalDifference > 0 ? "+" : ""}
                              {team.goalDifference}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center font-bold">{team.points}</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-1">
                              {team.form.map((result, index) => (
                                <div
                                  key={index}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    result === "W" ? "bg-green-100" : result === "L" ? "bg-red-100" : "bg-yellow-100"
                                  }`}
                                >
                                  {renderFormIcon(result)}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                      <span>Champions League</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                      <span>CAF Confederation Cup</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                      <span>Relegation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="champions" className="mt-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white flex items-center">
                  <Trophy className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">CAF Champions League Group B Standings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left">Pos</th>
                        <th className="py-3 px-4 text-left">Team</th>
                        <th className="py-3 px-4 text-center">P</th>
                        <th className="py-3 px-4 text-center">W</th>
                        <th className="py-3 px-4 text-center">D</th>
                        <th className="py-3 px-4 text-center">L</th>
                        <th className="py-3 px-4 text-center">GF</th>
                        <th className="py-3 px-4 text-center">GA</th>
                        <th className="py-3 px-4 text-center">GD</th>
                        <th className="py-3 px-4 text-center">Pts</th>
                        <th className="py-3 px-4 text-center">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {championsLeagueStandings.map((team) => (
                        <tr
                          key={team.position}
                          className={`border-b hover:bg-gray-50 ${
                            team.team === "JSK" ? "bg-yellow-50 border-l-4 border-yellow-500" : ""
                          }`}
                        >
                          <td className="py-4 px-4 font-bold">{team.position}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 mr-3">
                                <Image src={team.logo || "/placeholder.svg"} alt={team.team} width={32} height={32} />
                              </div>
                              <span className="font-medium">{team.team}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">{team.played}</td>
                          <td className="py-4 px-4 text-center">{team.won}</td>
                          <td className="py-4 px-4 text-center">{team.drawn}</td>
                          <td className="py-4 px-4 text-center">{team.lost}</td>
                          <td className="py-4 px-4 text-center">{team.goalsFor}</td>
                          <td className="py-4 px-4 text-center">{team.goalsAgainst}</td>
                          <td className="py-4 px-4 text-center font-medium">
                            <span
                              className={
                                team.goalDifference > 0
                                  ? "text-green-600"
                                  : team.goalDifference < 0
                                    ? "text-red-600"
                                    : ""
                              }
                            >
                              {team.goalDifference > 0 ? "+" : ""}
                              {team.goalDifference}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center font-bold">{team.points}</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-1">
                              {team.form.map((result, index) => (
                                <div
                                  key={index}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    result === "W" ? "bg-green-100" : result === "L" ? "bg-red-100" : "bg-yellow-100"
                                  }`}
                                >
                                  {renderFormIcon(result)}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                      <span>Advances to Quarter-finals</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                      <span>Eliminated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="cup" className="mt-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white flex items-center">
                  <Trophy className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">Algerian Cup 2024-2025</h2>
                </div>
                <div className="p-6">
                  {cupStandings.map((round, index) => (
                    <div key={index} className="mb-8 last:mb-0">
                      <h3 className="text-lg font-bold mb-4 text-green-800">{round.round}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {round.matches.map((match, matchIndex) => (
                          <Card key={matchIndex} className="border-0 shadow-md">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 mr-2">
                                    <Image
                                      src={match.homeLogo || "/placeholder.svg"}
                                      alt={match.home}
                                      width={32}
                                      height={32}
                                    />
                                  </div>
                                  <span className="font-medium">{match.home}</span>
                                </div>
                                {match.status === "Completed" ? (
                                  <div className="px-3 py-1 bg-gray-100 rounded-lg font-bold">{match.result}</div>
                                ) : (
                                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                                    {match.date}
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <span className="font-medium">{match.away}</span>
                                  <div className="w-8 h-8 ml-2">
                                    <Image
                                      src={match.awayLogo || "/placeholder.svg"}
                                      alt={match.away}
                                      width={32}
                                      height={32}
                                    />
                                  </div>
                                </div>
                              </div>
                              {match.status === "Upcoming" && (
                                <Button
                                  variant="outline"
                                  className="w-full border-green-600 text-green-700 hover:bg-green-50"
                                  size="sm"
                                >
                                  Match Details
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
            <h2 className="text-3xl font-bold mb-4 text-green-800">
              {activeTab === "league"
                ? "Algerian Ligue 1 Statistics"
                : activeTab === "champions"
                  ? "Champions League Statistics"
                  : "Algerian Cup Statistics"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Key statistics for the 2024-2025 season</p>
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
                <h3 className="text-xl font-bold">Top Scorers</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Hamroun (JSK)</span>
                    </div>
                    <span className="font-bold">15 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Boulahia (JSK)</span>
                    </div>
                    <span className="font-bold">12 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Benchaira (JSK)</span>
                    </div>
                    <span className="font-bold">9 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Meziani (MCA)</span>
                    </div>
                    <span className="font-bold">8 goals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Belkacemi (CSC)</span>
                    </div>
                    <span className="font-bold">7 goals</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
                <h3 className="text-xl font-bold">Top Assists</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Benchaira (JSK)</span>
                    </div>
                    <span className="font-bold">11 assists</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Hamroun (JSK)</span>
                    </div>
                    <span className="font-bold">9 assists</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Rebai (MCA)</span>
                    </div>
                    <span className="font-bold">8 assists</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Boulahia (JSK)</span>
                    </div>
                    <span className="font-bold">7 assists</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Merzougui (CRB)</span>
                    </div>
                    <span className="font-bold">6 assists</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white">
                <h3 className="text-xl font-bold">Clean Sheets</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Benbot (JSK)</span>
                    </div>
                    <span className="font-bold">12 clean sheets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Rahmani (MCA)</span>
                    </div>
                    <span className="font-bold">10 clean sheets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Khairani (CRB)</span>
                    </div>
                    <span className="font-bold">9 clean sheets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Gaya (USMA)</span>
                    </div>
                    <span className="font-bold">8 clean sheets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="font-medium">Boussaid (CSC)</span>
                    </div>
                    <span className="font-bold">7 clean sheets</span>
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
