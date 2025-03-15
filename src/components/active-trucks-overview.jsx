import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck } from 'lucide-react'

export function ActiveTrucksOverview() {
  const activeTrucks = 42
  const totalTrucks = 50

  return (
    <Card className="bg-green-50 dark:bg-green-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">Active Trucks</CardTitle>
        <Truck className="h-4 w-4 text-green-600 dark:text-green-300" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-700 dark:text-green-200">{activeTrucks}/{totalTrucks}</div>
        <p className="text-xs text-green-600 dark:text-green-300">
          {((activeTrucks / totalTrucks) * 100).toFixed(1)}% of fleet active
        </p>
      </CardContent>
    </Card>
  )
}
