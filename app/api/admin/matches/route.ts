import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true
          }
        },
        awayTeam: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            tickets: true
          }
        }
      },
      orderBy: {
        date: "desc"
      }
    })

    return NextResponse.json({
      success: true,
      data: matches
    })
  } catch (error) {
    console.error("❌ [MATCHES] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la récupération des matchs" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { homeTeamId, awayTeamId, date, place, status } = body

    if (!homeTeamId || !awayTeamId || !date || !place) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    const match = await prisma.match.create({
      data: {
        homeTeamId,
        awayTeamId,
        date: new Date(date),
        place,
        status: status || "SCHEDULED"
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true
          }
        },
        awayTeam: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: match
    })
  } catch (error) {
    console.error("❌ [MATCHES] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la création du match" },
      { status: 500 }
    )
  }
} 