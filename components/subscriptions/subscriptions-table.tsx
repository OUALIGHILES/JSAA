"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample data - in a real app, this would come from an API
const subscriptions = [
  {
    id: "S1001",
    user: "John Doe",
    team: "FC Barcelona",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "active",
  },
  {
    id: "S1002",
    user: "Jane Smith",
    team: "Real Madrid",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    status: "active",
  },
  {
    id: "S1003",
    user: "Bob Johnson",
    team: "Manchester United",
    startDate: "2022-10-01",
    endDate: "2023-09-30",
    status: "expired",
  },
  {
    id: "S1004",
    user: "Alice Williams",
    team: "Liverpool",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    status: "active",
  },
  {
    id: "S1005",
    user: "Charlie Brown",
    team: "Bayern Munich",
    startDate: "2023-05-01",
    endDate: "2023-08-15",
    status: "cancelled",
  },
  {
    id: "S1006",
    user: "Diana Miller",
    team: "PSG",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "active",
  },
  {
    id: "S1007",
    user: "Edward Davis",
    team: "Juventus",
    startDate: "2022-12-01",
    endDate: "2023-11-30",
    status: "active",
  },
  {
    id: "S1008",
    user: "Fiona Garcia",
    team: "AC Milan",
    startDate: "2023-04-15",
    endDate: "2023-10-14",
    status: "expired",
  },
]

export function SubscriptionsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium">{subscription.id}</TableCell>
              <TableCell>{subscription.user}</TableCell>
              <TableCell>{subscription.team}</TableCell>
              <TableCell>{subscription.startDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    subscription.status === "active"
                      ? "default"
                      : subscription.status === "expired"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {subscription.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit subscription</DropdownMenuItem>
                    <DropdownMenuItem>Renew subscription</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Cancel subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
