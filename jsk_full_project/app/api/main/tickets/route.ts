import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as jose from "jose"

const prisma = new PrismaClient()
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "YOUR_FALLBACK_SECRET_KEY"
)

// Helper function to get current user from session
async function getCurrentUser(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => {
      const [name, ...value] = c.split('=')
      return [name, value.join('=')]
    })
  )

  const token = cookies.session_token
  if (!token) return null

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    return user
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// GET available tickets for a match
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('matchId')

    if (!matchId) {
      return NextResponse.json(
        { success: false, message: "L'ID du match est requis" },
        { status: 400 }
      )
    }

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        homeTeam: true,
        awayTeam: true,
        tickets: {
          where: {
            status: 'AVAILABLE'
          }
        }
      }
    })

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Match non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      match,
      availableSeats: match.availableSeats,
      ticketPrice: match.ticketPrice
    })
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des billets" },
      { status: 500 }
    )
  }
}

// POST reserve tickets
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { matchId, quantity = 1, seatInfo } = body

    if (!matchId) {
      return NextResponse.json(
        { success: false, message: "L'ID du match est requis" },
        { status: 400 }
      )
    }

    // Check if match exists and has available seats
    const match = await prisma.match.findUnique({
      where: { id: matchId }
    })

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Match non trouvé" },
        { status: 404 }
      )
    }

    if (match.availableSeats < quantity) {
      return NextResponse.json(
        { success: false, message: "Nombre de sièges disponibles insuffisant" },
        { status: 400 }
      )
    }

    // Check for active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        teamId: { in: [match.homeTeamId, match.awayTeamId] },
        status: 'ACTIVE',
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      }
    })

    // Calculate price with possible discount
    let finalPrice = match.ticketPrice
    if (activeSubscription) {
      finalPrice = match.ticketPrice * BigInt(50) / BigInt(100) // 50% discount
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        matchId,
        userId: user.id,
        quantity,
        price: finalPrice * BigInt(quantity),
        seatInfo,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      success: true,
      message: "Réservation créée avec succès",
      reservation,
      hasSubscriptionDiscount: !!activeSubscription
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de la réservation" },
      { status: 500 }
    )
  }
} 