import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true
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
    console.error("Error fetching teams:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la récupération des équipes" },
      { status: 500 }
    )
  }
}

// Create a new team
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, logoUrl } = body

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Le nom de l'équipe est requis" },
        { status: 400 }
      )
    }

    // Generate a unique id for the team
    const id = crypto.randomUUID();

    const team = await prisma.team.create({
      data: {
        id,
        name,
        logoUrl: logoUrl || null,
        classment: 0 // Default value
      }
    })

    return NextResponse.json({
      success: true,
      data: team
    })
  } catch (error) {
    console.error("Error creating team:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la création de l'équipe" },
      { status: 500 }
    )
  }
}