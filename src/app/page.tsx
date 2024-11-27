import { DashboardShell } from '@/components/dashboard-shell'
import { DashboardChart, DashboardStats } from '@/components/dashboard-stats'

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
        <DashboardStats />
        <DashboardChart />
        </div>
    </DashboardShell>
  )
}

