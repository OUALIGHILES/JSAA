"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import { resetPassword } from "@/app/actions/auth"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""

  // Redirect if email or token is missing
  if (!email || !token) {
    if (typeof window !== "undefined") {
      router.push("/auth/forgot-password")
    }
    return null
  }

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true)

      // Add email and token to the form data
      formData.append("email", email)
      formData.append("token", token)

      const result = await resetPassword(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Success!",
          description: "Your password has been reset successfully.",
          variant: "success",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with JSK logo */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/80 to-yellow-700/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)]"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image src="/images/jsk-logo.png" alt="JSK Logo" width={600} height={600} className="object-contain" />
        </div>
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
      </div>

      {/* Back button */}
      <div className="relative z-10 p-4">
        <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => router.push("/auth/signin")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Button>
      </div>

      {/* Auth container */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm"></div>
                  <Image
                    src="/images/jsk-logo.png"
                    alt="JSK Logo"
                    width={60}
                    height={60}
                    className="rounded-full relative z-10"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
              <p className="text-gray-600 text-center mb-8">
                Enter your new password below to reset your account password.
              </p>

              {!isSubmitted ? (
                <form action={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Password Reset Complete</h2>
                    <p className="text-gray-600">
                      Your password has been reset successfully. You can now sign in with your new password.
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
                    onClick={() => router.push("/auth/signin")}
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/80">© {new Date().getFullYear()} JSK Stadium. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
