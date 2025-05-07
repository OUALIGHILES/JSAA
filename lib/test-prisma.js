import prisma from './prisma'

async function testConnection() {
  try {
    // Test de connexion en récupérant un utilisateur
    const users = await prisma.user.findMany({
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