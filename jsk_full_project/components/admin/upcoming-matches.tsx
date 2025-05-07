import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, MapPin } from "lucide-react"

interface UpcomingMatchesProps {
  matches: Array<{
    id: string
    title: string
    date: string
    location: string
    tickets: {
      _count: number
    }
  }>
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  return (
    <div className="space-y-8">
      {matches.map((match) => (
        <div key={match.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{match.title}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(match.date), "dd MMM yyyy à HH:mm", { locale: fr })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {match.location}
            </div>
          </div>
          <div className="ml-auto font-medium text-sm">
            {match.tickets._count} billets vendus
          </div>
        </div>
      ))}
    </div>
  )
} 