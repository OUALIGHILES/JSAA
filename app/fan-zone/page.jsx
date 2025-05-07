"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Clock, Star, Heart, MessageCircle, Share2, ShoppingBag } from "lucide-react"

export default function FanZonePage() {
  const [activeTab, setActiveTab] = useState("news")
  const [likedPosts, setLikedPosts] = useState([])

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const newsItems = [
    {
      id: 1,
      title: "JSK Signs New Striker Ahead of New Season",
      excerpt:
        "Jeunesse Sportive de Kabylie has announced the signing of international striker Mohamed Benyahia on a three-year contract.",
      date: "April 10, 2025",
      image: "/placeholder.svg?height=300&width=600",
      category: "Transfer News",
    },
    {
      id: 2,
      title: "Stadium to Host International Friendly",
      excerpt:
        "The Hocine Ait Ahmed Stadium will host an international friendly between Algeria and Tunisia next month.",
      date: "April 5, 2025",
      image: "/placeholder.svg?height=300&width=600",
      category: "Stadium News",
    },
    {
      id: 3,
      title: "JSK Foundation Launches Community Initiative",
      excerpt:
        "The JSK Foundation has launched a new initiative to support local schools and promote youth football in the region.",
      date: "March 28, 2025",
      image: "/placeholder.svg?height=300&width=600",
      category: "Community",
    },
  ]

  const fanPosts = [
    {
      id: 1,
      author: "Ahmed B.",
      authorImage: "/placeholder.svg?height=50&width=50",
      content:
        "Amazing atmosphere at yesterday's match! The new stadium is incredible and the team played brilliantly. Can't wait for the next home game! #JSK #Canaries",
      date: "April 12, 2025",
      likes: 124,
      comments: 18,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      author: "Lydia M.",
      authorImage: "/placeholder.svg?height=50&width=50",
      content:
        "Just got my season ticket for 2025-2026! So excited to support our team throughout the season. The new membership package looks amazing too. #JSKForever",
      date: "April 8, 2025",
      likes: 87,
      comments: 12,
      image: null,
    },
    {
      id: 3,
      author: "Karim T.",
      authorImage: "/placeholder.svg?height=50&width=50",
      content:
        "Check out my view from the premium seats at the Hocine Ait Ahmed Stadium. Absolutely worth the upgrade! The facilities are top-notch and the view is perfect.",
      date: "April 2, 2025",
      likes: 156,
      comments: 24,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Fan Meet & Greet",
      description: "Meet JSK players and get autographs at the official club store",
      date: "April 18, 2025",
      time: "15:00 - 17:00",
      location: "JSK Club Store, Hocine Ait Ahmed Stadium",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Youth Training Session",
      description: "Open training session for young fans with JSK coaching staff",
      date: "April 25, 2025",
      time: "10:00 - 12:00",
      location: "Training Ground, Hocine Ait Ahmed Stadium",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Fan Forum",
      description: "Q&A session with club management and selected players",
      date: "May 2, 2025",
      time: "18:00 - 20:00",
      location: "Conference Room, Hocine Ait Ahmed Stadium",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const merchandiseItems = [
    {
      id: 1,
      name: "JSK Home Jersey 2024-25",
      price: 6000,
      image: "/placeholder.svg?height=300&width=300",
      category: "Apparel",
    },
    {
      id: 2,
      name: "JSK Away Jersey 2024-25",
      price: 6000,
      image: "/placeholder.svg?height=300&width=300",
      category: "Apparel",
    },
    {
      id: 3,
      name: "JSK Training Jacket",
      price: 4500,
      image: "/placeholder.svg?height=300&width=300",
      category: "Apparel",
    },
    {
      id: 4,
      name: "JSK Scarf",
      price: 1500,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
    },
  ]

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
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-yellow-600 opacity-20 z-0"></div>
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="JSK Fan Zone"
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
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 text-shadow">JSK Fan Zone</h1>
          <p className="text-xl text-white/90 max-w-2xl text-shadow-sm mb-8">
            Join the community of passionate JSK supporters
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold px-6 py-3 rounded-full shadow-lg">
                Join Fan Club
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 font-medium px-6 py-3 rounded-full"
              >
                Sign Up for Updates
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-100 p-1 rounded-lg">
                <TabsTrigger
                  value="news"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Latest News
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Fan Community
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="shop"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Fan Shop
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="news" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {newsItems.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
                    >
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-green-900 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 line-clamp-3">{item.excerpt}</p>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                          Read Full Article
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>

                <motion.div variants={fadeIn} className="text-center mt-8">
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                    View All News
                  </Button>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h3 className="text-2xl font-bold mb-6 text-green-800">Subscribe to JSK Newsletter</h3>
                    <p className="text-gray-600 mb-6">
                      Stay updated with the latest news, match information, and exclusive content from JSK.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input type="email" placeholder="Your email address" className="flex-grow" />
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold">
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      By subscribing, you agree to receive emails from JSK. You can unsubscribe at any time.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold mb-6 text-green-800">Fan Posts</h3>

                      <div className="space-y-8">
                        {fanPosts.map((post) => (
                          <div key={post.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex items-start gap-3 mb-4">
                              <Image
                                src={post.authorImage || "/placeholder.svg"}
                                alt={post.author}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <h4 className="font-semibold">{post.author}</h4>
                                <p className="text-xs text-gray-500">{post.date}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            {post.image && (
                              <div className="mb-4 rounded-lg overflow-hidden">
                                <Image
                                  src={post.image || "/placeholder.svg"}
                                  alt="Post image"
                                  width={600}
                                  height={400}
                                  className="w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-6">
                              <button
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                                onClick={() => toggleLike(post.id)}
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""
                                  }`}
                                />
                                <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                                <MessageCircle className="h-5 w-5" />
                                <span>{post.comments}</span>
                              </button>
                              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500 transition-colors">
                                <Share2 className="h-5 w-5" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <h4 className="font-semibold mb-4">Share Your Thoughts</h4>
                        <div className="space-y-4">
                          <Textarea placeholder="Write your post here..." className="min-h-[100px]" />
                          <div className="flex justify-end">
                            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold mb-6 text-green-800">Fan Club</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Join the official JSK Fan Club and enjoy exclusive benefits, including:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Priority access to tickets</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Exclusive merchandise discounts</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Meet & greet opportunities with players</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></div>
                            <span>Monthly newsletter and digital content</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold mt-4">
                          Join Fan Club
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold mb-6 text-green-800">Top Fans This Month</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt="Top Fan 1"
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                              1
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">Sofiane K.</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt="Top Fan 2"
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div className="absolute -top-1 -right-1 bg-gray-300 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                              2
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">Amina B.</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt="Top Fan 3"
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div className="absolute -top-1 -right-1 bg-yellow-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                              3
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">Yacine M.</h4>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                              <Star className="h-3 w-3 text-gray-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">Upcoming Fan Events</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Join fellow JSK supporters at these upcoming events and activities
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
                    >
                      <div className="relative h-48">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-3">{event.title}</h4>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-green-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>

                <motion.div variants={fadeIn} className="mt-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-green-800">Suggest an Event</h3>
                        <p className="text-gray-600 mb-4">
                          Have an idea for a fan event? We'd love to hear from you! Submit your suggestion and our team
                          will review it.
                        </p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Event Title</label>
                            <Input placeholder="Enter event title" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Event Description</label>
                            <Textarea placeholder="Describe your event idea..." className="min-h-[100px]" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Email</label>
                            <Input type="email" placeholder="your@email.com" />
                          </div>
                          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                            Submit Suggestion
                          </Button>
                        </div>
                      </div>
                      <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md">
                        <Image
                          src="/placeholder.svg?height=300&width=500"
                          alt="Fan Event"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">JSK Fan Shop</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Show your support with official JSK merchandise</p>
                </motion.div>

                <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {merchandiseItems.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
                    >
                      <div className="relative h-64 bg-gray-50 p-4 flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                        <p className="text-xl font-bold text-green-700">{item.price} DA</p>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>

                <motion.div variants={fadeIn} className="text-center mt-8">
                  <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8">
                    Visit Full Shop
                  </Button>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-12">
                  <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl shadow-lg p-6 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Fan Club Members Get 15% Off</h3>
                        <p className="text-white/90">
                          Join the JSK Fan Club today and enjoy exclusive discounts on all merchandise.
                        </p>
                      </div>
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold whitespace-nowrap">
                        Join Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-800">Connect With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow JSK on social media for the latest updates, behind-the-scenes content, and more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Facebook</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join our Facebook community of over 500,000 JSK supporters for match updates, photos, and fan
                discussions.
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Follow on Facebook</Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Instagram</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Follow us on Instagram for exclusive photos, videos, and behind-the-scenes content from the team.
              </p>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                Follow on Instagram
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-sky-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Twitter</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get real-time updates, match commentary, and interact with the club and players on Twitter.
              </p>
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Follow on Twitter</Button>
            </div>
          </motion.div>
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
              <h2 className="text-3xl font-bold mb-4">Join the JSK Family Today!</h2>
              <p className="text-white/90 max-w-xl">
                Become part of the passionate community of JSK supporters and enjoy exclusive benefits.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-bold px-8 py-3 rounded-lg shadow-lg">
                Sign Up Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
