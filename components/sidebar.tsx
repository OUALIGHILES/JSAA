"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Home,
  Users,
  Ticket,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Matchs",
    href: "/admin/matches",
    icon: Calendar,
  },
  {
    title: "Billets",
    href: "/admin/tickets",
    icon: Ticket,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="fixed left-4 top-4 z-50 md:hidden"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent pathname={pathname} />
      </div>
    </>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="font-bold">JSK Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/auth/signout">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Link>
        </Button>
      </div>
    </div>
  )
} 