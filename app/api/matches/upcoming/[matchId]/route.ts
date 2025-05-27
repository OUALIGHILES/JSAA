import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: { matchId: string } }) {
  const { matchId } = params
  try {
    await prisma.match.delete({ where: { id: matchId } })
    return NextResponse.json({ message: "Match deleted" })
  } catch (error) {
    console.error("Error deleting match:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression du match" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { matchId: string } }) {
  const { matchId } = params
  try {
    const body = await request.json()
    const match = await prisma.match.update({
      where: { id: matchId },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : undefined
      }
    })
    return NextResponse.json({ data: match })
  } catch (error) {
    console.error("Error updating match:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du match" }, { status: 500 })
  }
}
