"use client"

import { useEffect, useState } from "react"
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
import { api } from "@/lib/api"
import UpdateUserDialog from "@/components/admin/update-user-dialog"
import DeleteUserDialog from "@/components/admin/delete-user-dialog"
import { UsersTableFilters } from "./users-table-filters"

interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  status?: string
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>({})
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Fetch users
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.users.getUsers()
      if (response.success) {
        setUsers(response.data)
        // Initialize status for each user
        const statuses = response.data.reduce(
          (acc: Record<string, boolean>, user: User) => ({
            ...acc,
            [user.id]: user.status !== "banned",
          }),
          {},
        )
        setUserStatuses(statuses)
      } else {
        setError("Failed to fetch users")
      }
    } catch (error) {
      setError("An error occurred while fetching users")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (userData: any) => {
    try {
      if (!selectedUser) return
      const response = await api.users.updateUser(selectedUser.id, userData)
      if (response.success) {
        await fetchUsers()
        setIsUpdateDialogOpen(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await api.users.deleteUser(userId)
      if (response.success) {
        await fetchUsers()
        setIsDeleteDialogOpen(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const toggleUserStatus = async (userId: string) => {
    try {
      const user = users.find((u) => u.id === userId)
      if (!user) return

      const newStatus = !userStatuses[userId]
      const response = await api.users.updateUser(userId, {
        ...user,
        status: newStatus ? "active" : "banned",
      })

      if (response.success) {
        setUserStatuses((prev) => ({
          ...prev,
          [userId]: newStatus,
        }))
      }
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      <UsersTableFilters onUserAdded={fetchUsers} />
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
                  <Badge variant={userStatuses[user.id] ? "default" : "destructive"}>
                    {userStatuses[user.id] ? "active" : "banned"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={userStatuses[user.id]}
                    onCheckedChange={() => toggleUserStatus(user.id)}
                  />
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
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsUpdateDialogOpen(true)
                        }}
                      >
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UpdateUserDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        user={selectedUser}
        onSubmit={handleUpdateUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
        onDelete={handleDeleteUser}
      />
    </div>
  )
}
