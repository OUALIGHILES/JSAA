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
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample data - in a real app, this would come from an API
const matches = [
  {
    id: "1",
    date: "2023-12-15",
    time: "19:30",
    homeTeam: "FC Barcelona",
    awayTeam: "Real Madrid",
    status: "upcoming",
    competition: "La Liga",
  },
  {
    id: "2",
    date: "2023-12-16",
    time: "15:00",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    status: "upcoming",
    competition: "Premier League",
  },
  {
    id: "3",
    date: "2023-12-10",
    time: "20:45",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    status: "completed",
    competition: "Ligue 1",
  },
  {
    id: "4",
    date: "2023-12-09",
    time: "18:30",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    status: "completed",
    competition: "Bundesliga",
  },
  {
    id: "5",
    date: "2023-12-17",
    time: "16:00",
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    status: "upcoming",
    competition: "Serie A",
  },
  {
    id: "6",
    date: "2023-12-11",
    time: "19:00",
    homeTeam: "Ajax",
    awayTeam: "PSV",
    status: "completed",
    competition: "Eredivisie",
  },
  {
    id: "7",
    date: "2023-12-18",
    time: "20:00",
    homeTeam: "Celtic",
    awayTeam: "Rangers",
    status: "upcoming",
    competition: "Scottish Premiership",
  },
  {
    id: "8",
    date: "2023-12-12",
    time: "21:00",
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    status: "completed",
    competition: "La Liga",
  },
]

export function MatchesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Home Team</TableHead>
            <TableHead>Away Team</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell className="font-medium">{match.id}</TableCell>
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.time}</TableCell>
              <TableCell>{match.homeTeam}</TableCell>
              <TableCell>{match.awayTeam}</TableCell>
              <TableCell>{match.competition}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    match.status === "upcoming" ? "outline" : match.status === "live" ? "destructive" : "default"
                  }
                >
                  {match.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
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
                      <DropdownMenuItem>Edit match</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete match
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
