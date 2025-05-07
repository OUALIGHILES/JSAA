import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { homeTeamId, awayTeamId, date, place, status } = body

    if (!homeTeamId || !awayTeamId || !date || !place) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    const match = await prisma.match.update({
      where: {
        id: params.id
      },
      data: {
        homeTeamId,
        awayTeamId,
        date: new Date(date),
        place,
        status
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
      { success: false, message: "Une erreur est survenue lors de la mise à jour du match" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.match.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Match supprimé avec succès"
    })
  } catch (error) {
    console.error("❌ [MATCHES] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la suppression du match" },
      { status: 500 }
    )
  }
} 