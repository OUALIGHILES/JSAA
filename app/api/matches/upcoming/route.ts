import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const upcomingMatches = await prisma.match.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json({
      data: upcomingMatches.map(match => ({
        id: match.id,
        date: match.date,
        time: match.time,
        competition: match.competition,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          logoUrl: match.homeTeam.logoUrl
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          logoUrl: match.awayTeam.logoUrl
        },
        stadium: match.place,
        ticketsAvailable: match.status === 'UPCOMING'
      }))
    })
  } catch (error) {
    console.error('Error fetching upcoming matches:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des matchs à venir" },
      { status: 500 }
    )
  }
} 