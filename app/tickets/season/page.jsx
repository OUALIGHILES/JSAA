"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, CreditCard, Info } from "lucide-react"

export default function SeasonTicketsPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [step, setStep] = useState(1)

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

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
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
          alt="JSK Season Tickets"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">Season Tickets</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm">
            Get access to all JSK home matches for the 2024-2025 season
          </p>
        </motion.div>
      </section>

      {/* Season Tickets Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Season Ticket Plan</h2>
                  <p className="text-gray-600">Select the perfect season ticket package for you</p>
                </div>

                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-6">
                  {seasonTickets.map((plan) => (
                    <motion.div key={plan.id} variants={fadeIn} whileHover={{ y: -5 }}>
                      <div
                        className={`relative rounded-xl border p-6 cursor-pointer transition-all duration-300 ${
                          selectedPlan === plan.id
                            ? "border-2 border-green-500 bg-green-50"
                            : "border border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        <div className="flex items-start">
                          <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                          <div className="ml-3 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <Label htmlFor={plan.id} className="text-xl font-bold cursor-pointer">
                                  {plan.name}
                                </Label>
                                <p className="text-gray-600 mt-1">{plan.description}</p>
                              </div>
                              <div className="mt-4 md:mt-0 text-right">
                                <span className="text-2xl font-bold text-green-700">{plan.price} DA</span>
                                <p className="text-sm text-gray-500">per season</p>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-semibold mb-2">Features:</h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="mt-8">
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-6 text-lg font-bold"
                    disabled={!selectedPlan}
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                <div className="flex items-center mb-6">
                  <Button variant="ghost" onClick={handleBack} className="mr-4">
                    ← Back
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    <p className="text-gray-600">
                      Please provide your details for your{" "}
                      {seasonTickets.find((plan) => plan.id === selectedPlan)?.name}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+213 XX XX XX XX" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Tizi Ouzou" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="15000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="Algeria" required />
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          Your season ticket card will be mailed to this address. Please ensure all information is
                          correct.
                        </p>
                      </div>
                    </div>
                  </form>

                  <div className="mt-8">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-6 text-lg font-bold"
                      onClick={handleNext}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                <div className="flex items-center mb-6">
                  <Button variant="ghost" onClick={handleBack} className="mr-4">
                    ← Back
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold">Payment Details</h2>
                    <p className="text-gray-600">Complete your season ticket purchase</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Plan:</span>
                          <span>{seasonTickets.find((plan) => plan.id === selectedPlan)?.name}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Season:</span>
                          <span>2024-2025</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Quantity:</span>
                          <span>1</span>
                        </div>
                        <div className="border-t my-2 pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Subtotal:</span>
                            <span>{seasonTickets.find((plan) => plan.id === selectedPlan)?.price} DA</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Processing Fee:</span>
                            <span>{seasonTickets.find((plan) => plan.id === selectedPlan)?.price * 0.03} DA</span>
                          </div>
                          <div className="flex items-center justify-between text-lg font-bold mt-2">
                            <span>Total:</span>
                            <span>{seasonTickets.find((plan) => plan.id === selectedPlan)?.price * 1.03} DA</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Payment Options</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="fullPayment"
                              name="paymentOption"
                              className="h-4 w-4 text-green-600"
                              defaultChecked
                            />
                            <label htmlFor="fullPayment" className="ml-2 text-sm">
                              Full Payment
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="installments"
                              name="paymentOption"
                              className="h-4 w-4 text-green-600"
                            />
                            <label htmlFor="installments" className="ml-2 text-sm">
                              3 Monthly Installments (5% fee applies)
                            </label>
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
                        <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="sameAddress" className="h-4 w-4 text-green-600" defaultChecked />
                            <label htmlFor="sameAddress" className="ml-2 text-sm">
                              Same as personal address
                            </label>
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
                      By completing this purchase, you agree to our Terms and Conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Season Ticket Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy these exclusive benefits when you become a JSK season ticket holder
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
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Guaranteed Seat"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-800">Guaranteed Seat</h3>
                <p className="text-gray-600">
                  Your seat is reserved for every home match, ensuring you never miss a moment of the action.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="h-48 bg-yellow-100 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Priority Access"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-800">Priority Access</h3>
                <p className="text-gray-600">
                  Get priority access to cup matches, away game tickets, and special events at the stadium.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Exclusive Discounts"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-800">Exclusive Discounts</h3>
                <p className="text-gray-600">
                  Enjoy discounts on official merchandise, concessions, and partner businesses around Tizi Ouzou.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-green-700 to-green-600 rounded-xl shadow-lg p-8 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Can I transfer my season ticket to someone else?</h4>
                    <p className="text-white/90">
                      Yes, you can transfer your season ticket for individual matches through our online portal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What happens if I lose my season ticket card?</h4>
                    <p className="text-white/90">
                      Contact our ticket office immediately. We can issue a replacement card for a small fee.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Can I upgrade my season ticket during the season?</h4>
                    <p className="text-white/90">
                      Yes, you can upgrade to a higher tier if available by paying the difference in price.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Season Ticket Holders"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
