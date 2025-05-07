import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Ticket, Users, Settings } from "lucide-react"

export function Topbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">JSK Admin</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Tableau de bord
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/matches" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Matchs
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
} 