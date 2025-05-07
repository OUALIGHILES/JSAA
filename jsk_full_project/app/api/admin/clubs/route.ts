import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const clubs = await prisma.team.findMany({
      include: {
        _count: {
          select: {
            homeMatches: true,
            awayMatches: true
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json({
      success: true,
      data: clubs
    })
  } catch (error) {
    console.error("❌ [CLUBS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la récupération des clubs" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, logo } = body

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Le nom du club est requis" },
        { status: 400 }
      )
    }

    const club = await prisma.team.create({
      data: {
        name,
        description,
        logo
      }
    })

    return NextResponse.json({
      success: true,
      data: club
    })
  } catch (error) {
    console.error("❌ [CLUBS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la création du club" },
      { status: 500 }
    )
  }
} 