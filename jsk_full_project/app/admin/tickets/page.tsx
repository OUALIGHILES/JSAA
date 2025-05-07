import { TicketsTable } from "@/components/tickets/tickets-table"
import { TicketsTableFilters } from "@/components/tickets/tickets-table-filters"

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">Manage tickets for sports events</p>
      </div>

      <TicketsTableFilters />
      <TicketsTable />
    </div>
  )
}
