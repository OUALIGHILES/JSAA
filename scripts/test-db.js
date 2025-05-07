const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Tentative de connexion à la base de données...')
    
    // Tester la connexion en essayant de récupérer la version de la base de données
    const result = await prisma.$queryRaw`SELECT version()`
    
    console.log('✅ Connexion réussie!')
    console.log('Version de PostgreSQL:', result[0].version)
    
    // Tester l'accès aux tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    
    console.log('\nTables disponibles:')
    tables.forEach(table => console.log(`- ${table.table_name}`))
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message)
    if (error.code === 'ECONNREFUSED') {
      console.error('Impossible de se connecter au serveur de base de données')
      console.error('Vérifiez que:')
      console.error('1. Le serveur PostgreSQL est en cours d\'exécution')
      console.error('2. Les informations de connexion dans .env sont correctes')
      console.error('3. Le port 5432 est accessible')
    }
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 