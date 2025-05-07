import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Euro } from "lucide-react"

interface RecentTicketsProps {
  tickets: Array<{
    id: string
    createdAt: string
    price: number
    match: {
      title: string
      date: string
    }
    user: {
      firstName: string
      lastName: string
      email: string
    }
  }>
}

export function RecentTickets({ tickets }: RecentTicketsProps) {
  return (
    <div className="space-y-8">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {ticket.user.firstName} {ticket.user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{ticket.user.email}</p>
            <p className="text-sm text-muted-foreground">{ticket.match.title}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(ticket.match.date), "dd MMM yyyy à HH:mm", { locale: fr })}
            </p>
          </div>
          <div className="ml-auto flex items-center font-medium text-sm">
            <Euro className="mr-1 h-3 w-3" />
            {ticket.price}
          </div>
          <div className="ml-4 font-medium text-sm text-muted-foreground">
            {format(new Date(ticket.createdAt), "dd MMM yyyy", { locale: fr })}
          </div>
        </div>
      ))}
    </div>
  )
} 