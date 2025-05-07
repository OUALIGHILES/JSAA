# Configuration de Prisma avec Supabase
Write-Host "🚀 Configuration de Prisma avec Supabase..." -ForegroundColor Cyan

# Configuration de l'URL de connexion avec SSL pour Supabase Pooler
$env:DATABASE_URL = "postgresql://postgres:JSKgroupe%4015@db.ztpdiqwymfvficgwdveh.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# Installation des dépendances nécessaires
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install @prisma/client date-fns@^3.0.0 prisma --save-dev

# Génération du client Prisma
Write-Host "🔧 Génération du client Prisma..." -ForegroundColor Yellow
npx prisma generate

# Introspection de la base de données
Write-Host "🔍 Introspection de la base de données..." -ForegroundColor Yellow
npx prisma db pull

# Création et application de la migration initiale
Write-Host "🔄 Création de la migration initiale..." -ForegroundColor Yellow
npx prisma migrate dev --name init

# Vérification de la connexion
Write-Host "✅ Configuration terminée!" -ForegroundColor Green
Write-Host "Pour tester la connexion, exécutez: npx prisma studio" -ForegroundColor Cyan

# Attendre une entrée utilisateur
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 