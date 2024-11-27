import { DashboardShell } from '@/components/dashboard-shell'
import { PermissionManagement } from '@/components/permission-management'

export default function Users() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <PermissionManagement/>
      </div>
    </DashboardShell>
  )
}

