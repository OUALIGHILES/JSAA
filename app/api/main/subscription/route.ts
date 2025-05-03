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

// GET all subscriptions for current user
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
        createdAt: 'desc'
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

// POST create a new subscription (abonement)
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
    const { teamId } = body

    if (!teamId) {
      return NextResponse.json(
        { success: false, message: "L'ID de l'équipe est requis" },
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

    // Check if user already has an active subscription for this team
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        teamId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { success: false, message: "Vous avez déjà un abonnement actif pour cette équipe" },
        { status: 409 }
      )
    }

    // Calculate start and end dates (1 year subscription)
    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1)

    // Set subscription price based on team classification
    let subscriptionPrice: any = 200.00 // Default price

    // Adjust price based on team classification
    if (team.classment === 1) {
      subscriptionPrice = 500.00 // Premium teams
    } else if (team.classment === 2) {
      subscriptionPrice = 350.00 // Mid-tier teams
    }

    // Create subscription
    const newSubscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        teamId,
        startDate,
        endDate,
        price: subscriptionPrice,
        status: 'ACTIVE'
      },
      include: {
        team: true
      }
    })

    return NextResponse.json({
      success: true,
      message: "Abonnement créé avec succès",
      subscription: newSubscription
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'abonnement" },
      { status: 500 }
    )
  }
}