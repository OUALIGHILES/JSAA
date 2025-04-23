"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { requestPasswordReset } from "@/app/actions/auth"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true)
      const result = await requestPasswordReset(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Check your email",
          description: "If your email exists in our system, you will receive a password reset link.",
          variant: "success",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to request password reset. Please try again.",
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

              <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
              <p className="text-gray-600 text-center mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {!isSubmitted ? (
                <form action={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      {isLoading ? "Sending..." : "Send Reset Link"}
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
                    <h2 className="text-xl font-semibold mb-2">Check your email</h2>
                    <p className="text-gray-600">
                      We've sent a password reset link to <span className="font-medium">{email}</span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                    onClick={() => router.push("/auth/signin")}
                  >
                    Back to Sign In
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
