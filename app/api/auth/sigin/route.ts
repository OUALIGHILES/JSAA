import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import * as jose from "jose"
import { cookies } from "next/headers"

const prisma = new PrismaClient()
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "YOUR_FALLBACK_SECRET_KEY"
)
const SESSION_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 // 30 days in seconds

// Create a secure JWT token using jose
const createSessionToken = async (userId: string): Promise<string> => {
  const jwt = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TOKEN_EXPIRES_IN}s`)
    .sign(JWT_SECRET)
  
  return jwt
}

// Set session cookie
interface SessionCookieOptions {
    name: string;
    value: string;
    httpOnly: boolean;
    path: string;
    secure: boolean;
    maxAge: number;
    sameSite: "lax" | "strict" | "none";
}

const setSessionCookie = async (token: string): Promise<void> => {
    const cookieOptions: SessionCookieOptions = {
        name: "session_token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_TOKEN_EXPIRES_IN,
        sameSite: "lax",
    };
    
    const cookieStore = await cookies();
    cookieStore.set(cookieOptions.name, cookieOptions.value, {
        httpOnly: cookieOptions.httpOnly,
        path: cookieOptions.path,
        secure: cookieOptions.secure,
        maxAge: cookieOptions.maxAge,
        sameSite: cookieOptions.sameSite,
    });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body
    
    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email et mot de passe requis" },
        { status: 400 }
      )
    }
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }
    
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }
    
    // Create session token with jose
    const token = await createSessionToken(user.id)
    
    // Create session in database (optional, but useful for tracking active sessions)
    await prisma.session.create({
      data: {
        sessionToken: token,
        userId: user.id,
        expires: new Date(Date.now() + SESSION_TOKEN_EXPIRES_IN * 1000),
      },
    })
    
    // Set cookie
    await setSessionCookie(token)
    
    // Return successful response
    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de la connexion" },
      { status: 500 }
    )
  }
}