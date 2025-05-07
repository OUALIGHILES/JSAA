// app/api/subscriptions/route.ts
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

// GET user's subscriptions
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Non authentifié" },
        { status: 401 }
      )
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      include: {
        team: true
      },
      orderBy: {
        startDate: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      subscriptions
    })
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des abonnements" },
      { status: 500 }
    )
  }
}

// POST create a new subscription
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
    const { teamId, startDate, endDate, price } = body

    if (!teamId || !startDate || !endDate || !price) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Check if team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId }
    })

    if (!team) {
      return NextResponse.json(
        { success: false, message: "Équipe non trouvée" },
        { status: 404 }
      )
    }

    // Check for overlapping subscriptions
    const overlappingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        teamId,
        status: 'ACTIVE',
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) }
          }
        ]
      }
    })

    if (overlappingSubscription) {
      return NextResponse.json(
        { success: false, message: "Vous avez déjà un abonnement actif pour cette période" },
        { status: 400 }
      )
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        teamId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: BigInt(price),
        status: 'ACTIVE'
      },
      include: {
        team: true
      }
    })

    return NextResponse.json({
      success: true,
      message: "Abonnement créé avec succès",
      subscription
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'abonnement" },
      { status: 500 }
    )
  }
}