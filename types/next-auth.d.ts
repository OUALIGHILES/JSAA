import { DefaultSession } from "next-auth"
import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User extends PrismaUser {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    id: string
  }
} 