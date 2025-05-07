"use client"

import { createContext, useContext, useState } from "react"

type SidebarContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

    return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
      </SidebarContext.Provider>
    )
  }

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
