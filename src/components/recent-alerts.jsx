import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

const alerts = [
  { id: 1, message: "Truck TRK-001 maintenance due", type: "warning" },
  { id: 2, message: "Delivery DEL-234 completed ahead of schedule", type: "success" },
  { id: 3, message: "Fuel efficiency drop detected in TRK-015", type: "warning" },
]

export function RecentAlerts() {
  return (
    (<Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-center space-x-3">
              {alert.type === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <span>{alert.message}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>)
  );
}

