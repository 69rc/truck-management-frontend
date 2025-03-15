"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", efficiency: 7.2 },
  { month: "Feb", efficiency: 7.4 },
  { month: "Mar", efficiency: 7.3 },
  { month: "Apr", efficiency: 7.5 },
  { month: "May", efficiency: 7.6 },
  { month: "Jun", efficiency: 7.8 },
]

export function FuelEfficiencyChart() {
  return (
    <Card className="bg-amber-50 dark:bg-amber-900">
      <CardHeader>
        <CardTitle className="text-amber-800 dark:text-amber-100">Fleet Fuel Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#d97706" />
            <YAxis stroke="#d97706" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fef3c7', 
                borderColor: '#d97706' 
              }} 
              labelStyle={{ color: '#92400e' }}
              itemStyle={{ color: '#92400e' }}
            />
            <Line type="monotone" dataKey="efficiency" stroke="#92400e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
