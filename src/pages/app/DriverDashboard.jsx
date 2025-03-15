import { ActiveTrucksOverview } from "../../components/active-trucks-overview"
import { DeliveriesInProgress } from "../../components/deliveries-in-progress"
import { FuelEfficiencyChart } from "../../components/fuel-efficiency-chart"
import { RecentAlerts } from "../../components/recent-alerts"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Truck Management Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ActiveTrucksOverview />
        <DeliveriesInProgress />
      </div>
      <FuelEfficiencyChart />
      <RecentAlerts />
    </div>
  )
}

