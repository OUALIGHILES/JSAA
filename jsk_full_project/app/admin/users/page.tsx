import { UsersTable } from "@/components/users/users-table"
import { UsersTableFilters } from "@/components/users/users-table-filters"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage your platform users</p>
      </div>

      <UsersTableFilters />
      <UsersTable />
    </div>
  )
}
