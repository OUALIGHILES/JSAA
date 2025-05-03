import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()
const SALT_ROUNDS = 10


// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Create a secure JWT token using jose


export async function POST(request:NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, signupEmail, signupPassword, confirmPassword, terms } = body
    
    // Validate inputs
    if (!firstName || !lastName || !signupEmail || !signupPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    if (!isValidEmail(signupEmail)) {
      return NextResponse.json(
        { success: false, message: "Format d'email invalide" },
        { status: 400 }
      )
    }

    if (signupPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      )
    }

    if (signupPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Les mots de passe ne correspondent pas" },
        { status: 400 }
      )
    }

    if (!terms) {
      return NextResponse.json(
        { success: false, message: "Vous devez accepter les conditions d'utilisation" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: signupEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Cet email est déjà utilisé" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupPassword, SALT_ROUNDS)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: signupEmail,
        password: hashedPassword,
      },
    })

    // Create session token with jose
   

    // Return successful response
    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    )
  }
}