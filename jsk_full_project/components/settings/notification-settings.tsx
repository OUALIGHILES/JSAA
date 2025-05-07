"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">New Matches</h4>
                <p className="text-sm text-muted-foreground">Receive notifications when new matches are scheduled.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">Ticket Sales</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about ticket sales and promotions.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">System Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about system updates and maintenance.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">New Tickets</h4>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications when new tickets are purchased.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">User Registrations</h4>
                <p className="text-sm text-muted-foreground">Receive push notifications when new users register.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <Button>Save preferences</Button>
      </CardContent>
    </Card>
  )
}
