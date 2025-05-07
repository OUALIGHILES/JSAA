import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Tester la connexion en essayant de récupérer la version de la base de données
    const result = await prisma.$queryRaw`SELECT version()`
    
    return NextResponse.json({
      success: true,
      message: "Connexion à la base de données réussie",
      version: result[0].version
    })
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur de connexion à la base de données",
        details: error.message
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 