const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

async function initPrisma() {
  try {
    console.log('🚀 Initialisation de Prisma...')

    // Vérifier que le fichier .env existe
    const envPath = path.join(__dirname, '../.env')
    if (!fs.existsSync(envPath)) {
      console.log('Création du fichier .env...')
      fs.writeFileSync(envPath, `DATABASE_URL="postgresql://postgres:JSKgroupe@15@db.ztpdiqwymfvficgwdveh.supabase.co:5432/postgres"`)
    }

    // Installer Prisma si nécessaire
    console.log('📦 Installation de Prisma...')
    execSync('npm install @prisma/client prisma', { stdio: 'inherit' })

    // Générer le client Prisma
    console.log('🔧 Génération du client Prisma...')
    execSync('npx prisma generate', { stdio: 'inherit' })

    // Créer et appliquer la migration
    console.log('🔄 Création de la migration...')
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })

    console.log('✅ Prisma initialisé avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message)
    process.exit(1)
  }
}

initPrisma() 