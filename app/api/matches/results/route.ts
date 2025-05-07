import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const results = await prisma.match.findMany({
      where: {
        date: {
          lt: new Date()
        },
        status: "Terminé"
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            logoUrl: true
          }
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            logoUrl: true
          }
        }
      }
    })

    return NextResponse.json({
      data: results.map(match => ({
        id: match.id,
        date: match.date,
        time: match.time,
        competition: match.competition,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          logo: match.homeTeam.logoUrl
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          logo: match.awayTeam.logoUrl
        },
        stadium: match.place,
        score: {
          home: match.homeScore,
          away: match.awayScore
        },
        highlights: match.highlightsUrl
      }))
    })
  } catch (error) {
    console.error('Error fetching match results:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des résultats" },
      { status: 500 }
    )
  }
} 