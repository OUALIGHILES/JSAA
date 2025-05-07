#!/bin/bash

# Configuration de l'URL de connexion avec SSL pour Supabase Pooler
export DATABASE_URL="postgresql://postgres:JSKgroupe%4015@db.ztpdiqwymfvficgwdveh.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# Installation des dépendances nécessaires
echo "📦 Installation des dépendances..."
npm install @prisma/client date-fns@^3.0.0 prisma --save-dev

# Génération du client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Introspection de la base de données
echo "🔍 Introspection de la base de données..."
npx prisma db pull

# Création et application de la migration initiale
echo "🔄 Création de la migration initiale..."
npx prisma migrate dev --name init

# Vérification de la connexion
echo "✅ Configuration terminée!"
echo "Pour tester la connexion, exécutez: npx prisma studio" 