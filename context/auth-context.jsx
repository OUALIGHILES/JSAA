"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, logout as apiLogout, getUserProfile } from "@/lib/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const { success, data } = await getUserProfile()
          if (success) {
            setUser(data)
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
          }
        } catch (error) {
          console.error("Auth check error:", error)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    const result = await apiLogin(email, password)

    if (result.success) {
      const { success, data } = await getUserProfile()
      if (success) {
        setUser(data)
      }
    }

    setLoading(false)
    return result
  }

  const logout = async () => {
    setLoading(true)
    await apiLogout()
    setUser(null)
    setLoading(false)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
