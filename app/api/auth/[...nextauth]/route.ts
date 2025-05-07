import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email ou mot de passe manquant")
          return null
        }

        try {
          console.log("Recherche de l'utilisateur:", credentials.email)
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            console.log("Utilisateur non trouvé")
            return null
          }

          console.log("Vérification du mot de passe")
          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            console.log("Mot de passe incorrect")
            return null
          }

          console.log("Connexion réussie pour:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role || "USER"
          }
        } catch (error) {
          console.error("Erreur lors de l'authentification:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Token:", token)
      console.log("JWT Callback - User:", user)
      
      if (user) {
        token.role = user.role
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      console.log("Session Callback - Session:", session)
      console.log("Session Callback - Token:", token)
      
      if (session.user && token) {
        session.user.role = token.role
        session.user.id = token.id
        session.user.name = token.name
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback - URL:", url)
      console.log("Redirect callback - BaseURL:", baseUrl)
      
      // Si l'URL est relative, on ajoute l'URL de base
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      
      // Si l'URL commence par l'URL de base, on la retourne
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // Par défaut, on retourne l'URL de base
      return baseUrl
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
})

export { handler as GET, handler as POST }