import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json({
      success: true,
      data: teams
    })
  } catch (error) {
    console.error("❌ [TEAMS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la récupération des équipes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Le nom de l'équipe est requis" },
        { status: 400 }
      )
    }

    const team = await prisma.team.create({
      data: {
        name
      }
    })

    return NextResponse.json({
      success: true,
      data: team
    })
  } catch (error) {
    console.error("❌ [TEAMS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la création de l'équipe" },
      { status: 500 }
    )
  }
} 