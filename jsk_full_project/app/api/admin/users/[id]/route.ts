import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Le nom et l'email sont requis" },
        { status: 400 }
      )
    }

    const updateData: any = {
      name,
      email,
      role
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: {
        id: params.id
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error("❌ [USERS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprimé avec succès"
    })
  } catch (error) {
    console.error("❌ [USERS] Erreur:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la suppression de l'utilisateur" },
      { status: 500 }
    )
  }
} 