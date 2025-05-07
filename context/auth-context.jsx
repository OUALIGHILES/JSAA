"use client"

import { createContext, useContext } from "react"
import { useSession } from "next-auth/react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { data: session, status } = useSession()

  const value = {
    user: session?.user || null,
    loading: status === "loading",
    isAuthenticated: status === "authenticated"
  }

  return (
    <AuthContext.Provider value={value}>
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
