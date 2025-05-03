// app/api/teams/route.ts
import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all teams
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        classment: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      teams
    })
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des équipes" },
      { status: 500 }
    )
  }
}

// POST create a new team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, classment, logoUrl } = body

    // Validate inputs
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Le nom de l'équipe est requis" },
        { status: 400 }
      )
    }

    // Check if team already exists
    const existingTeam = await prisma.team.findUnique({
      where: { name }
    })

    if (existingTeam) {
      return NextResponse.json(
        { success: false, message: "Une équipe avec ce nom existe déjà" },
        { status: 409 }
      )
    }

    // Create new team
    const newTeam = await prisma.team.create({
      data: {
        name,
        classment: classment ?? 3, // Use provided classment or default to 3
        logoUrl
      }
    })

    return NextResponse.json({
      success: true,
      message: "Équipe créée avec succès",
      team: newTeam
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating team:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'équipe" },
      { status: 500 }
    )
  }
}