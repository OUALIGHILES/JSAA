import { SubscriptionsTable } from "@/components/subscriptions/subscriptions-table"
import { SubscriptionsTableFilters } from "@/components/subscriptions/subscriptions-table-filters"

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground">Manage user subscriptions to teams</p>
      </div>

      <SubscriptionsTableFilters />
      <SubscriptionsTable />
    </div>
  )
}
