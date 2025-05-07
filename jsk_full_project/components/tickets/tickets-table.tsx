"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
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
const tickets = [
  {
    id: "T1001",
    match: "FC Barcelona vs Real Madrid",
    user: "John Doe",
    quantity: 2,
    status: "RESERVED",
    totalPrice: "$120.00",
  },
  {
    id: "T1002",
    match: "Manchester United vs Liverpool",
    user: "Jane Smith",
    quantity: 1,
    status: "PAID",
    totalPrice: "$75.00",
  },
  {
    id: "T1003",
    match: "PSG vs Marseille",
    user: "Bob Johnson",
    quantity: 3,
    status: "PAID",
    totalPrice: "$195.00",
  },
  {
    id: "T1004",
    match: "Bayern Munich vs Borussia Dortmund",
    user: "Alice Williams",
    quantity: 2,
    status: "CANCELLED",
    totalPrice: "$150.00",
  },
  {
    id: "T1005",
    match: "Juventus vs AC Milan",
    user: "Charlie Brown",
    quantity: 4,
    status: "RESERVED",
    totalPrice: "$280.00",
  },
  {
    id: "T1006",
    match: "Ajax vs PSV",
    user: "Diana Miller",
    quantity: 2,
    status: "PAID",
    totalPrice: "$130.00",
  },
  {
    id: "T1007",
    match: "Celtic vs Rangers",
    user: "Edward Davis",
    quantity: 1,
    status: "RESERVED",
    totalPrice: "$65.00",
  },
  {
    id: "T1008",
    match: "Atletico Madrid vs Sevilla",
    user: "Fiona Garcia",
    quantity: 3,
    status: "PAID",
    totalPrice: "$210.00",
  },
]

export function TicketsTable() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(tickets.map((ticket) => ticket.id))
    }
  }

  const toggleSelectTicket = (ticketId: string) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId))
    } else {
      setSelectedTickets([...selectedTickets, ticketId])
    }
  }

  return (
    <div className="space-y-4">
      {selectedTickets.length > 0 && (
        <div className="bg-muted p-4 rounded-md flex items-center justify-between">
          <div>
            <span className="font-medium">{selectedTickets.length} tickets selected</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Mark as Paid
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              Cancel Tickets
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedTickets.length === tickets.length && tickets.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Match</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={() => toggleSelectTicket(ticket.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.match}</TableCell>
                <TableCell>{ticket.user}</TableCell>
                <TableCell>{ticket.quantity}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "PAID" ? "default" : ticket.status === "RESERVED" ? "outline" : "destructive"
                    }
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.totalPrice}</TableCell>
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
                      <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                      <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancel ticket</DropdownMenuItem>
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
    </div>
  )
}
