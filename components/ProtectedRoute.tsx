import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
    } else if (session.user.role !== "ADMIN") {
      router.push("/")
    }
  }, [session, status, router])

  if (status === "loading") {
    return <div>Chargement...</div>
  }

  if (!session || session.user.role !== "ADMIN") {
    return null
  }

  return <>{children}</>
} 