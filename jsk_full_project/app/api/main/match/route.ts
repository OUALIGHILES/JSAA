// app/api/matches/route.ts
import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all matches with team details
export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true
      },
      orderBy: {
        date: 'asc' // Sort by date ascending (upcoming matches first)
      }
    })

    return NextResponse.json({
      success: true,
      matches
    })
  } catch (error) {
    console.error("Error fetching matches:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des matchs" },
      { status: 500 }
    )
  }
}

// POST create a new match
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { homeTeamId, awayTeamId, place, date } = body

    // Validate inputs
    if (!homeTeamId || !awayTeamId || !place || !date) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis (homeTeamId, awayTeamId, place, date)" },
        { status: 400 }
      )
    }

    // Validate that teams exist
    const homeTeam = await prisma.team.findUnique({
      where: { id: homeTeamId }
    })

    const awayTeam = await prisma.team.findUnique({
      where: { id: awayTeamId }
    })

    if (!homeTeam) {
      return NextResponse.json(
        { success: false, message: "L'équipe à domicile n'existe pas" },
        { status: 400 }
      )
    }

    if (!awayTeam) {
      return NextResponse.json(
        { success: false, message: "L'équipe à l'extérieur n'existe pas" },
        { status: 400 }
      )
    }

    if (homeTeamId === awayTeamId) {
      return NextResponse.json(
        { success: false, message: "Une équipe ne peut pas jouer contre elle-même" },
        { status: 400 }
      )
    }

    // Create new match
    const matchDate = new Date(date)
    const newMatch = await prisma.match.create({
      data: {
        homeTeamId,
        awayTeamId,
        place,
        date: matchDate
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json({
      success: true,
      message: "Match créé avec succès",
      match: newMatch
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating match:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création du match" },
      { status: 500 }
    )
  }
}