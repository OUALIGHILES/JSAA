import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth-utils"

// List of paths that require authentication
const protectedPaths = ["/profile", "/my-tickets", "/checkout"]

// List of paths that should redirect to home if already authenticated
const authPaths = ["/auth/signin", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"]

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // Check if the token is valid
  const isAuthenticated = token ? await verifyToken(token) : null

  // If the path requires authentication and the user is not authenticated
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // If the path is an auth path and the user is already authenticated
  if (authPaths.some((path) => pathname.startsWith(path)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all protected paths
    ...protectedPaths.map((path) => path + "/:path*"),
    // Match all auth paths
    ...authPaths,
  ],
}
