import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, logo } = body

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Le nom du club est requis" },
        { status: 400 }
      )
    }

    const club = await prisma.team.update({
      where: {
        id: params.id
      },
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
      { success: false, message: "Une erreur est survenue lors de la mise à jour du club" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.team.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Club supprimé avec succès"
    })
  } catch (error) {
    console.error("❌ [CLUBS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la suppression du club" },
      { status: 500 }
    )
  }
} 