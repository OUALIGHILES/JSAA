"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface TicketsPerCompetitionChartProps {
  data?: {
    competition: string
    tickets: number
  }[]
}

export function TicketsPerCompetitionChart({ data = [] }: TicketsPerCompetitionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="competition" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tickets" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
