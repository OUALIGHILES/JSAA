const { execSync } = require('child_process')
const path = require('path')

async function setupDatabase() {
  try {
    console.log('🚀 Initialisation de la base de données...')

    // Vérifier que le fichier .env existe
    const envPath = path.join(__dirname, '../.env')
    const fs = require('fs')
    if (!fs.existsSync(envPath)) {
      console.error('❌ Le fichier .env n\'existe pas!')
      console.log('Création du fichier .env...')
      fs.writeFileSync(envPath, `DATABASE_URL="postgresql://postgres:JSKgroupe@15@db.ztpdiqwymfvficgwdveh.supabase.co:5432/postgres"`)
    }

    // Installer les dépendances si nécessaire
    console.log('📦 Installation des dépendances...')
    execSync('npm install @prisma/client prisma', { stdio: 'inherit' })

    // Générer le client Prisma
    console.log('🔧 Génération du client Prisma...')
    execSync('npx prisma generate', { stdio: 'inherit' })

    // Synchroniser la base de données
    console.log('🔄 Synchronisation de la base de données...')
    execSync('npx prisma db push', { stdio: 'inherit' })

    console.log('✅ Configuration terminée avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message)
    process.exit(1)
  }
}

setupDatabase() 