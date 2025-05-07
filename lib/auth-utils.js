import { SignJWT, jwtVerify } from "jose"

// In a real app, you would store this in an environment variable
const JWT_SECRET = new TextEncoder().encode("your-secret-key-change-this-in-production")

export async function createToken(payload, expiresIn = "1d") {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export function hashPassword(password) {
  // In a real app, you would use bcrypt or Argon2
  // This is a simple hash for demonstration purposes only
  return btoa(`${password}-hashed`)
}

export function verifyPassword(password, hashedPassword) {
  return btoa(`${password}-hashed`) === hashedPassword
}

export function setCookie(name, value, options = {}) {
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    ...options,
  }

  const cookie = [`${name}=${value}`, ...Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`)].join(
    "; ",
  )

  document.cookie = cookie
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ")
  const cookie = cookies.find((c) => c.startsWith(`${name}=`))
  return cookie ? cookie.split("=")[1] : null
}

export function removeCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}
