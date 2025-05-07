import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ApiResponse, MatchWithTeams } from '@/types/api'

export async function GET(): Promise<NextResponse<ApiResponse<MatchWithTeams[]>>> {
  try {
    const upcomingMatches = await prisma.match.findMany({
      where: {
        date: {
          gte: new Date()
        },
        status: {
          not: 'Terminé'
        }
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            classment: true
          }
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            classment: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json({ data: upcomingMatches })
  } catch (error) {
    console.error('Error fetching upcoming matches:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des matchs à venir" },
      { status: 500 }
    )
  }
} 