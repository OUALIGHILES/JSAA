import prisma from './prisma'
import { User } from '@prisma/client'

async function testConnection(): Promise<void> {
  try {
    const users: User[] = await prisma.user.findMany({
      take: 1
    })
    
    console.log('✅ Connexion à la base de données réussie')
    console.log('Utilisateurs trouvés:', users)
  } catch (error) {
    console.error('❌ Erreur de connexion:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 