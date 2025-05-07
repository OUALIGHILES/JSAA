import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
  try {
    const standings = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true,
        classment: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        classment: 'asc'
      }
    })

    if (!standings || standings.length === 0) {
      return NextResponse.json({ data: [] })
    }

    return NextResponse.json({ 
      data: standings.map(team => ({
        id: team.id,
        name: team.name,
        logo: team.logoUrl,
        position: team.classment,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      }))
    })
  } catch (error) {
    console.error('Error fetching standings:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération du classement" },
      { status: 500 }
    )
  }
} 