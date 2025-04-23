"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, LogIn, User, LogOut, Ticket, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm ${isScrolled ? "hidden" : "block"}`}
            ></div>
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-yellow-400">
              <Image src="/images/jsk-logo.png" alt="Logo JSK" fill className="object-cover" />
            </div>
          </div>
          <span className="text-xl font-bold text-green-800">Stade JSK</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-green-700 relative group">
            Accueil
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("matches")}
              className="flex items-center text-sm font-medium hover:text-green-700 relative group"
            >
              Matchs
              <ChevronDown
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === "matches" ? "rotate-180" : ""}`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </button>

            <AnimatePresence>
              {activeDropdown === "matches" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                >
                  <div className="py-2">
                    <Link
                      href="/matches/upcoming"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                    >
                      Matchs à venir
                    </Link>
                    <Link
                      href="/matches/results"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                    >
                      Résultats
                    </Link>
                    <Link
                      href="/matches/standings"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                    >
                      Classement
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("tickets")}
              className="flex items-center text-sm font-medium hover:text-green-700 relative group"
            >
              Billets
              <ChevronDown
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === "tickets" ? "rotate-180" : ""}`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </button>

            <AnimatePresence>
              {activeDropdown === "tickets" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                >
                  <div className="py-2">
                    <Link
                      href="/tickets/match-day"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                    >
                      Billets de match
                    </Link>
                    <Link
                      href="/tickets/season"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                    >
                      Abonnements
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/tickets/mes-billets"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 flex items-center"
                    >
                      <Ticket className="h-3.5 w-3.5 mr-2" />
                      Mes Billets
                    </Link>
                    <Link
                      href="/tickets/mes-abonnements"
                      className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 flex items-center"
                    >
                      <Calendar className="h-3.5 w-3.5 mr-2" />
                      Mes Abonnements
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/stadium" className="text-sm font-medium hover:text-green-700 relative group">
            Stade
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold"
                asChild
              >
                <Link href="/tickets/choix">Réserver</Link>
              </Button>
            </motion.div>

            {loading ? (
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50 flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    {user.firstName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tickets/mes-billets">Mes Billets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tickets/mes-abonnements">Mes Abonnements</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 flex items-center gap-2"
                  asChild
                >
                  <Link href="/auth/signin">
                    <LogIn className="h-4 w-4" />
                    Connexion
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden container mx-auto px-4 pb-6 pt-2"
          >
            <nav className="flex flex-col space-y-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => toggleDropdown("mobileMatches")}
                  className="flex items-center justify-between w-full rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                >
                  <span>Matchs</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "mobileMatches" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "mobileMatches" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-4 mt-1"
                    >
                      <Link
                        href="/matches/upcoming"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Matchs à venir
                      </Link>
                      <Link
                        href="/matches/results"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Résultats
                      </Link>
                      <Link
                        href="/matches/standings"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Classement
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => toggleDropdown("mobileTickets")}
                  className="flex items-center justify-between w-full rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                >
                  <span>Billets</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "mobileTickets" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "mobileTickets" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-4 mt-1"
                    >
                      <Link
                        href="/tickets/match-day"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Billets de match
                      </Link>
                      <Link
                        href="/tickets/season"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Abonnements
                      </Link>
                      <div className="border-t border-gray-100 my-1 mx-4"></div>
                      <Link
                        href="/tickets/mes-billets"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Ticket className="h-3.5 w-3.5 mr-2" />
                        Mes Billets
                      </Link>
                      <Link
                        href="/tickets/mes-abonnements"
                        className="block rounded-lg px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Calendar className="h-3.5 w-3.5 mr-2" />
                        Mes Abonnements
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/stadium"
                  className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stade
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900 font-semibold"
                  asChild
                >
                  <Link href="/tickets/choix" onClick={() => setIsMenuOpen(false)}>
                    Réserver
                  </Link>
                </Button>
              </motion.div>

              {loading ? (
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md"></div>
              ) : user ? (
                <>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/profile"
                      className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Mon Profil
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/tickets/mes-billets"
                      className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Ticket className="h-4 w-4 inline mr-2" />
                      Mes Billets
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/tickets/mes-abonnements"
                      className="block rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Mes Abonnements
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-700 hover:bg-green-50 flex items-center justify-center gap-2"
                    asChild
                  >
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4" />
                      Connexion
                    </Link>
                  </Button>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
