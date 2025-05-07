"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createUser, getUserByEmail, updateUser, storeResetToken, validateResetToken, getUserById } from "@/lib/db"
import { createToken, hashPassword, verifyPassword, verifyToken } from "@/lib/auth-utils"
import { v4 as uuidv4 } from "uuid"

export async function signUp(formData) {
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("signupEmail")
  const password = formData.get("signupPassword")
  const confirmPassword = formData.get("confirmPassword")

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return { success: false, message: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  // Check if user already exists
  const existingUser = getUserByEmail(email)
  if (existingUser) {
    return { success: false, message: "Email already in use" }
  }

  // Create user
  const hashedPassword = hashPassword(password)
  const user = createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    verified: false,
  })

  // Create session token
  const token = await createToken({ userId: user.id, email: user.email })

  // Set cookie
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return { success: true, user: { ...user, password: undefined } }
}

export async function signIn(formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const rememberMe = formData.get("rememberMe") === "on"

  // Validate input
  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  // Find user
  const user = getUserByEmail(email)
  if (!user) {
    return { success: false, message: "Invalid email or password" }
  }

  // Verify password
  if (!verifyPassword(password, user.password)) {
    return { success: false, message: "Invalid email or password" }
  }

  // Update last login
  updateUser(user.id, { lastLogin: new Date().toISOString() })

  // Create session token
  const token = await createToken({ userId: user.id, email: user.email }, rememberMe ? "30d" : "1d")

  // Set cookie
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
    path: "/",
  })

  return { success: true, user: { ...user, password: undefined } }
}

export async function signOut() {
  cookies().delete("auth-token")
  redirect("/auth/signin")
}

export async function requestPasswordReset(formData) {
  const email = formData.get("email")

  // Validate input
  if (!email) {
    return { success: false, message: "Email is required" }
  }

  // Find user
  const user = getUserByEmail(email)
  if (!user) {
    // For security reasons, don't reveal that the email doesn't exist
    return { success: true, message: "If your email exists in our system, you will receive a password reset link" }
  }

  // Generate reset token
  const resetToken = uuidv4()
  storeResetToken(email, resetToken)

  // In a real app, you would send an email with the reset link
  console.log(
    `Password reset link: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`,
  )

  return { success: true, message: "If your email exists in our system, you will receive a password reset link" }
}

export async function resetPassword(formData) {
  const email = formData.get("email")
  const token = formData.get("token")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  // Validate input
  if (!email || !token || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  // Validate token
  if (!validateResetToken(email, token)) {
    return { success: false, message: "Invalid or expired reset token" }
  }

  // Find user
  const user = getUserByEmail(email)
  if (!user) {
    return { success: false, message: "User not found" }
  }

  // Update password
  const hashedPassword = hashPassword(password)
  updateUser(user.id, { password: hashedPassword })

  return { success: true, message: "Password has been reset successfully" }
}

export async function getCurrentUser() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return null
    }

    const user = getUserById(payload.userId)
    if (!user) {
      return null
    }

    return { ...user, password: undefined }
  } catch (error) {
    return null
  }
}
