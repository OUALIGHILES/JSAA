"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"

// Sample data - in a real app, this would come from an API
const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 4000 },
  { name: "Sep", sales: 2500 },
  { name: "Oct", sales: 6000 },
  { name: "Nov", sales: 7000 },
  { name: "Dec", sales: 9000 },
]

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
          <YAxis className="text-xs" tick={{ fill: "var(--muted-foreground)" }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2 border shadow-sm bg-background">
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-sm font-semibold">${payload[0].value}</div>
                  </Card>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
