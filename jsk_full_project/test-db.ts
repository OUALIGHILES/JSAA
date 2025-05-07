import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const matches = await prisma.match.findMany({
      take: 1
    })
    console.log('Connexion réussie ! Premier match trouvé:', matches)
  } catch (error) {
    console.error('Erreur de connexion:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 