"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "@/lib/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
      const token = localStorage.getItem("token")
      if (token) {
          // Vérifier la validité du token avec le backend
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            localStorage.removeItem("token")
          }
        }
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signin = async (credentials) => {
    try {
      const data = await api.auth.signin(credentials)
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const data = await api.auth.signup(userData)
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
