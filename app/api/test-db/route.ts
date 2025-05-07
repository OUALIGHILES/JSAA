import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error)
    return NextResponse.json(
      { error: "Erreur de connexion à la base de données" },
      { status: 500 }
    )
  }
} 