import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from 'lucide-react'

export function DeliveriesInProgress() {
  const deliveries = 18

  return (
    <Card className="bg-blue-50 dark:bg-blue-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">Deliveries in Progress</CardTitle>
        <Package className="h-4 w-4 text-blue-600 dark:text-blue-300" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">{deliveries}</div>
        <p className="text-xs text-blue-600 dark:text-blue-300">
          Active deliveries across the fleet
        </p>
      </CardContent>
    </Card>
  )
}
