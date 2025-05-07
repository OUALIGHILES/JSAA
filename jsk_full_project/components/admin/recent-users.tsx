import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface RecentUsersProps {
  users: Array<{
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
  }>
}

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} />
            <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {format(new Date(user.createdAt), "dd MMM yyyy", { locale: fr })}
          </div>
        </div>
      ))}
    </div>
  )
} 