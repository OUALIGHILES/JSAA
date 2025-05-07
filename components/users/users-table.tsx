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
import { Switch } from "@/components/ui/switch"
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
const users = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    status: "active",
    registeredAt: "2023-01-15",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    status: "active",
    registeredAt: "2023-02-20",
  },
  {
    id: "3",
    email: "bob.johnson@example.com",
    name: "Bob Johnson",
    status: "banned",
    registeredAt: "2023-03-10",
  },
  {
    id: "4",
    email: "alice.williams@example.com",
    name: "Alice Williams",
    status: "active",
    registeredAt: "2023-04-05",
  },
  {
    id: "5",
    email: "charlie.brown@example.com",
    name: "Charlie Brown",
    status: "active",
    registeredAt: "2023-05-12",
  },
  {
    id: "6",
    email: "diana.miller@example.com",
    name: "Diana Miller",
    status: "banned",
    registeredAt: "2023-06-18",
  },
  {
    id: "7",
    email: "edward.davis@example.com",
    name: "Edward Davis",
    status: "active",
    registeredAt: "2023-07-22",
  },
  {
    id: "8",
    email: "fiona.garcia@example.com",
    name: "Fiona Garcia",
    status: "active",
    registeredAt: "2023-08-30",
  },
  {
    id: "9",
    email: "george.wilson@example.com",
    name: "George Wilson",
    status: "active",
    registeredAt: "2023-09-14",
  },
  {
    id: "10",
    email: "hannah.martinez@example.com",
    name: "Hannah Martinez",
    status: "active",
    registeredAt: "2023-10-05",
  },
]

export function UsersTable() {
  const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>(
    users.reduce(
      (acc, user) => ({
        ...acc,
        [user.id]: user.status === "active",
      }),
      {},
    ),
  )

  const toggleUserStatus = (userId: string) => {
    setUserStatuses((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="w-[100px]">Active</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
              </TableCell>
              <TableCell>{user.registeredAt}</TableCell>
              <TableCell>
                <Switch checked={userStatuses[user.id]} onCheckedChange={() => toggleUserStatus(user.id)} />
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
                    <DropdownMenuItem>Edit user</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
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
