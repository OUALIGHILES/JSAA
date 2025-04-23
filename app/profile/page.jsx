"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { User, Mail, Calendar, Key, Save, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-green-600 h-32 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-75 blur-sm"></div>
                  <div className="relative z-10 h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                    <div className="h-full w-full flex items-center justify-center bg-green-100 text-green-800">
                      <User className="h-16 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="pt-20 pb-8 px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="profile">
                <TabsList className="bg-green-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="tickets"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    My Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                  {isEditing ? (
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue={user.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue={user.lastName} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                      <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </form>
                  ) : (
                    <div className="bg-white rounded-lg border p-6">
                      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">First Name</p>
                            <p className="font-medium">{user.firstName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Name</p>
                            <p className="font-medium">{user.lastName}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium text-gray-400">Not provided</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tickets" className="mt-6">
                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You don't have any tickets yet.</p>
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-green-900">
                        Browse Matches
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input id="currentPassword" type="password" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input id="newPassword" type="password" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input id="confirmPassword" type="password" className="pl-10" />
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white">
                        Update Password
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
