import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔍 Test de connexion à la base de données...')
  
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

  try {
    console.log('📡 Tentative de connexion...')
    console.log('URL de connexion:', process.env.DATABASE_URL)
    
    // Test de connexion simple
    await prisma.$connect()
    console.log('✅ Connexion établie avec succès!')
    
    // Test de requête
    const result = await prisma.$queryRaw`SELECT 1+1 as result`
    console.log('✅ Test de requête réussi:', result)
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error)
    console.error('Détails de l\'erreur:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Connexion fermée')
  }
}

testConnection() 