// app/api/tickets/route.ts
import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as jose from "jose"

const prisma = new PrismaClient()
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "YOUR_FALLBACK_SECRET_KEY"
)

// Helper function to get current user from session
async function getCurrentUser(request: NextRequest) {
  // Get the token from cookies
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) {
    return null
  }

  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => {
      const [name, ...value] = c.split('=')
      return [name, value.join('=')]
    })
  )

  const token = cookies.session_token
  if (!token) {
    return null
  }

  try {
    // Verify and decode the token
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    return user
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// GET all tickets for current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      )
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      tickets
    })
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des billets" },
      { status: 500 }
    )
  }
}

// POST reserve tickets for a match
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

    // Check for existing active subscription that might give special pricing
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        teamId: { in: [match.homeTeamId, match.awayTeamId] },
        status: 'ACTIVE',
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      }
    })

    // Apply ticket price (with discount if applicable)
    let finalPrice = match.ticketPrice
    if (activeSubscription) {
      // 50% discount for subscription holders
      finalPrice = match.ticketPrice * BigInt(50) / BigInt(100)
    }

    // Use a transaction to ensure data consistency
    const [ticket, updatedMatch] = await prisma.$transaction([
      // Create the ticket
      prisma.ticket.create({
        data: {
          matchId,
          userId: user.id,
          quantity,
          price: finalPrice * BigInt(quantity),
          seatInfo,
          status: 'RESERVED'
        }
      }),
      // Update the match's available seats
      prisma.match.update({
        where: { id: matchId },
        data: {
          availableSeats: {
            decrement: quantity
          }
        }
      })
    ])

    return NextResponse.json({
      success: true,
      message: "Réservation effectuée avec succès",
      ticket,
      hasSubscriptionDiscount: !!activeSubscription
    }, { status: 201 })
  } catch (error) {
    console.error("Error reserving tickets:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la réservation des billets" },
      { status: 500 }
    )
  }
}