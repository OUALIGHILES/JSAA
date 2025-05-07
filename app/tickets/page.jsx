"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Info, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function TicketsPage() {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState([])

  const matches = [
    {
      id: 1,
      date: "April 20, 2025",
      time: "19:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "MCA",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
    },
    {
      id: 2,
      date: "April 27, 2025",
      time: "20:30",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "CRB",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
    },
    {
      id: 3,
      date: "May 4, 2025",
      time: "18:00",
      competition: "Algerian Ligue 1",
      homeTeam: "JSK",
      awayTeam: "USMA",
      stadium: "Hocine Ait Ahmed Stadium, Boukhalfa",
    },
  ]

  const ticketCategories = [
    {
      id: "standard",
      name: "Standard",
      price: 500,
      description: "Regular seating in the stadium with good views of the pitch.",
      color: "bg-green-100 border-green-500",
    },
    {
      id: "premium",
      name: "Premium",
      price: 1000,
      description: "Better seating with improved views and more comfortable seats.",
      color: "bg-blue-100 border-blue-500",
    },
    {
      id: "vip",
      name: "VIP",
      price: 2000,
      description: "Best seats in the house with access to VIP lounges and refreshments.",
      color: "bg-yellow-100 border-yellow-500",
    },
  ]

  const seasonTickets = [
    {
      id: "standard-season",
      name: "Standard Season",
      price: 15000,
      description: "Access to all home league matches for the 2024-2025 season.",
      features: ["All home league matches", "Reserved seat for the season", "10% discount on merchandise"],
    },
    {
      id: "premium-season",
      name: "Premium Season",
      price: 25000,
      description: "Premium seating for all home matches including cup games.",
      features: [
        "All home league and cup matches",
        "Premium reserved seat",
        "15% discount on merchandise",
        "Match day program",
      ],
    },
    {
      id: "vip-season",
      name: "VIP Season",
      price: 40000,
      description: "The ultimate JSK experience with the best seats and exclusive benefits.",
      features: [
        "All home matches (all competitions)",
        "Best seats in the stadium",
        "Access to VIP lounge",
        "Free refreshments",
        "20% discount on merchandise",
        "Meet players after selected matches",
      ],
    },
  ]

  const handleSelectMatch = (match) => {
    setSelectedMatch(match)
    setStep(2)
  }

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setStep(3)
  }

  const handleSelectSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      if (selectedSeats.length < quantity) {
        setSelectedSeats([...selectedSeats, seatId])
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

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
          alt="JSK Tickets"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">JSK Match Tickets</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            Secure your place at the Hocine Ait Ahmed Stadium
          </p>
        </motion.div>
      </section>

      {/* Tickets Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="match" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="match"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Match Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="season"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Season Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="group"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Group Bookings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="match" className="mt-6">
              <div className="max-w-4xl mx-auto">
                {step === 1 && (
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Select a Match</h2>
                      <p className="text-gray-600">Choose an upcoming match to purchase tickets</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matches.map((match) => (
                        <motion.div key={match.id} variants={fadeIn} whileHover={{ y: -5 }}>
                          <Card
                            className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl cursor-pointer ${
                              selectedMatch?.id === match.id ? "ring-2 ring-yellow-400" : ""
                            }`}
                            onClick={() => handleSelectMatch(match)}
                          >
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
                            <CardContent className="p-6">
                              <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-xs">
                                {match.competition}
                              </Badge>

                              <div className="flex items-center justify-between mb-6">
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
                                                : "/placeholder.svg?height=60&width=60"
                                      }
                                      alt={match.homeTeam}
                                      width={60}
                                      height={60}
                                    />
                                  </div>
                                  <span className="font-bold text-lg">{match.homeTeam}</span>
                                </div>
                                <div className="text-center">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                    <span className="text-lg font-bold text-gray-400">VS</span>
                                  </div>
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
                                                : "/placeholder.svg?height=60&width=60"
                                      }
                                      alt={match.awayTeam}
                                      width={60}
                                      height={60}
                                    />
                                  </div>
                                  <span className="font-bold text-lg">{match.awayTeam}</span>
                                </div>
                              </div>

                              <div className="flex items-center text-sm text-gray-500 mb-4">
                                <MapPin className="h-4 w-4 mr-2 text-green-600" />
                                <span>{match.stadium}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4">
                              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
                                Select Match
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && selectedMatch && (
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                    <div className="flex items-center mb-6">
                      <Button variant="ghost" onClick={handleBack} className="mr-4">
                        ← Back
                      </Button>
                      <div>
                        <h2 className="text-2xl font-bold">Select Ticket Category</h2>
                        <p className="text-gray-600">
                          {selectedMatch.homeTeam} vs {selectedMatch.awayTeam} | {selectedMatch.date} at{" "}
                          {selectedMatch.time}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                        {ticketCategories.map((category) => (
                          <motion.div
                            key={category.id}
                            variants={fadeIn}
                            whileHover={{ y: -2 }}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div
                              className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                                selectedCategory === category.id
                                  ? `${category.color} border-2`
                                  : "border border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start">
                                <RadioGroupItem value={category.id} id={category.id} className="mt-1" />
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor={category.id} className="text-lg font-semibold cursor-pointer">
                                      {category.name}
                                    </Label>
                                    <span className="font-bold text-lg">{category.price} DA</span>
                                  </div>
                                  <p className="text-gray-600 mt-1">{category.description}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </RadioGroup>

                      <div className="mt-8">
                        <Label htmlFor="quantity" className="text-sm font-medium mb-2 block">
                          Number of Tickets
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            className="h-10 w-10"
                          >
                            -
                          </Button>
                          <div className="w-16 text-center font-medium">{quantity}</div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                            className="h-10 w-10"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Ticket Price:</span>
                          <span className="font-medium">
                            {selectedCategory
                              ? `${ticketCategories.find((c) => c.id === selectedCategory)?.price} DA x ${quantity}`
                              : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Service Fee:</span>
                          <span className="font-medium">
                            {selectedCategory
                              ? `${ticketCategories.find((c) => c.id === selectedCategory)?.price * 0.05 * quantity} DA`
                              : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>
                            {selectedCategory
                              ? `${
                                  ticketCategories.find((c) => c.id === selectedCategory)?.price * quantity +
                                  ticketCategories.find((c) => c.id === selectedCategory)?.price * 0.05 * quantity
                                } DA`
                              : "-"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-6 text-lg font-bold"
                          disabled={!selectedCategory}
                          onClick={handleNext}
                        >
                          Continue to Seat Selection
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && selectedMatch && selectedCategory && (
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                    <div className="flex items-center mb-6">
                      <Button variant="ghost" onClick={handleBack} className="mr-4">
                        ← Back
                      </Button>
                      <div>
                        <h2 className="text-2xl font-bold">Select Your Seats</h2>
                        <p className="text-gray-600">
                          {selectedMatch.homeTeam} vs {selectedMatch.awayTeam} |{" "}
                          {ticketCategories.find((c) => c.id === selectedCategory)?.name} Tickets
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-center mb-8">
                        <div className="w-full h-8 bg-gray-300 rounded-t-lg mb-10 flex items-center justify-center text-gray-600 font-medium">
                          PITCH
                        </div>

                        <div className="grid grid-cols-10 gap-2 mb-8">
                          {Array.from({ length: 100 }).map((_, index) => {
                            const seatId = `seat-${index + 1}`
                            const isSelected = selectedSeats.includes(seatId)
                            const isAvailable = ![12, 15, 23, 45, 67, 78, 89].includes(index + 1)

                            return (
                              <motion.button
                                key={seatId}
                                whileHover={isAvailable ? { y: -2 } : {}}
                                whileTap={isAvailable ? { scale: 0.95 } : {}}
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs ${
                                  isSelected
                                    ? "bg-yellow-500 text-white"
                                    : isAvailable
                                      ? `${
                                          selectedCategory === "standard"
                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                            : selectedCategory === "premium"
                                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        }`
                                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => isAvailable && handleSelectSeat(seatId)}
                                disabled={!isAvailable}
                              >
                                {index + 1}
                              </motion.button>
                            )
                          })}
                        </div>

                        <div className="flex items-center justify-center gap-6 mb-6">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></div>
                            <span className="text-sm text-gray-600">Unavailable</span>
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-sm mr-2 ${
                                selectedCategory === "standard"
                                  ? "bg-green-100"
                                  : selectedCategory === "premium"
                                    ? "bg-blue-100"
                                    : "bg-yellow-100"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-600">Available</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
                            <span className="text-sm text-gray-600">Selected</span>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-yellow-700">
                              Please select {quantity} seats. You have selected {selectedSeats.length} of {quantity}{" "}
                              seats.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Selected Seats:</span>
                          <span className="font-medium">
                            {selectedSeats.length > 0
                              ? selectedSeats.map((seat) => seat.split("-")[1]).join(", ")
                              : "None"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>
                            {`${
                              ticketCategories.find((c) => c.id === selectedCategory)?.price * quantity +
                              ticketCategories.find((c) => c.id === selectedCategory)?.price * 0.05 * quantity
                            } DA`}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-6 text-lg font-bold"
                          disabled={selectedSeats.length !== quantity}
                          onClick={handleNext}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                    <div className="flex items-center mb-6">
                      <Button variant="ghost" onClick={handleBack} className="mr-4">
                        ← Back
                      </Button>
                      <div>
                        <h2 className="text-2xl font-bold">Payment Details</h2>
                        <p className="text-gray-600">Complete your purchase</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                          <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Match:</span>
                              <span>
                                {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Date & Time:</span>
                              <span>
                                {selectedMatch.date} at {selectedMatch.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Ticket Type:</span>
                              <span>{ticketCategories.find((c) => c.id === selectedCategory)?.name}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Quantity:</span>
                              <span>{quantity}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Seats:</span>
                              <span>{selectedSeats.map((seat) => seat.split("-")[1]).join(", ")}</span>
                            </div>
                            <div className="border-t my-2 pt-2">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Subtotal:</span>
                                <span>
                                  {ticketCategories.find((c) => c.id === selectedCategory)?.price * quantity} DA
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Service Fee:</span>
                                <span>
                                  {ticketCategories.find((c) => c.id === selectedCategory)?.price * 0.05 * quantity} DA
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-lg font-bold mt-2">
                                <span>Total:</span>
                                <span>
                                  {ticketCategories.find((c) => c.id === selectedCategory)?.price * quantity +
                                    ticketCategories.find((c) => c.id === selectedCategory)?.price *
                                      0.05 *
                                      quantity}{" "}
                                  DA
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <div className="relative">
                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+213 XX XX XX XX" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 py-6 text-lg font-bold">
                          Complete Purchase
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          By completing this purchase, you agree to our{" "}
                          <Link href="/terms" className="text-green-600 hover:underline">
                            Terms and Conditions
                          </Link>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="season" className="mt-6">
              <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Season Tickets</h2>
                    <p className="text-gray-600">Get access to all JSK home matches for the 2024-2025 season</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {seasonTickets.map((ticket) => (
                      <motion.div key={ticket.id} variants={fadeIn} whileHover={{ y: -5 }}>
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
                          <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-4 px-6">
                            <h3 className="text-xl font-bold">{ticket.name}</h3>
                            <div className="mt-1 text-white/80 text-sm">{ticket.description}</div>
                          </div>
                          <CardContent className="p-6">
                            <div className="text-3xl font-bold text-center mb-6">{ticket.price} DA</div>
                            <ul className="space-y-3 mb-6">
                              {ticket.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="bg-gray-50 p-4">
                            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
                              Purchase Now
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                    <div className="flex items-start">
                      <Info className="h-6 w-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-yellow-800 mb-2">Season Ticket Benefits</h3>
                        <p className="text-yellow-700 mb-4">
                          Season ticket holders enjoy priority access to all home matches, exclusive events, and special
                          discounts throughout the season.
                        </p>
                        <p className="text-yellow-700">
                          For more information about season tickets, please contact our ticket office at
                          tickets@jskstadium.dz or call +213 XX XX XX XX.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="group" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Group Bookings</h2>
                    <p className="text-gray-600">Special rates for groups of 10 or more people</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-green-800">Group Ticket Benefits</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Discounted ticket prices (10% off for 10+ people)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Reserved seating section for your entire group</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Dedicated group coordinator to assist with your booking</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Option to add catering services for your group</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Group name displayed on the stadium screen during the match</span>
                          </li>
                        </ul>

                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-green-700">
                              For groups of 30 or more, additional benefits are available including a stadium tour and
                              photo opportunity.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 text-green-800">Request Group Booking</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="groupName">Group/Organization Name</Label>
                            <Input id="groupName" placeholder="Enter your group name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactPerson">Contact Person</Label>
                            <Input id="contactPerson" placeholder="Full name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email</Label>
                            <Input id="contactEmail" type="email" placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactPhone">Phone Number</Label>
                            <Input id="contactPhone" placeholder="+213 XX XX XX XX" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupSize">Group Size</Label>
                            <Input id="groupSize" type="number" min="10" placeholder="Number of people" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matchPreference">Preferred Match</Label>
                            <select
                              id="matchPreference"
                              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                            >
                              <option value="">Select a match</option>
                              {matches.map((match) => (
                                <option key={match.id} value={match.id}>
                                  {match.homeTeam} vs {match.awayTeam} - {match.date}
                                </option>
                              ))}
                              <option value="multiple">Multiple Matches (Season Package)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="additionalRequests">Additional Requests</Label>
                            <textarea
                              id="additionalRequests"
                              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                              rows={4}
                              placeholder="Any special requirements or questions"
                            ></textarea>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-4 text-lg font-bold">
                            Submit Group Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about tickets for JSK matches
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-green-800">How do I receive my tickets?</h3>
              <p className="text-gray-600">
                After completing your purchase, tickets will be sent to your email address. You can print them at home
                or show the e-ticket on your mobile device at the stadium entrance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-green-800">Can I cancel or refund my tickets?</h3>
              <p className="text-gray-600">
                Tickets cannot be refunded or exchanged once purchased. In case of match postponement, your tickets will
                remain valid for the rescheduled date.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-green-800">When do tickets go on sale?</h3>
              <p className="text-gray-600">
                Tickets typically go on sale 2 weeks before each match. Season ticket holders have priority access to
                purchase additional tickets 3 days before general sale.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-green-800">Is there a limit to how many tickets I can buy?</h3>
              <p className="text-gray-600">
                For regular matches, you can purchase up to 10 tickets per transaction. For high-demand matches, this
                may be limited to 4 tickets per person.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-green-800">What payment methods are accepted?</h3>
              <p className="text-gray-600">
                We accept all major credit and debit cards, as well as bank transfers for group bookings and season
                tickets.
              </p>
            </div>
          </motion.div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions about tickets?</p>
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
              Contact Ticket Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
