import { DashboardShell } from '@/components/dashboard-shell'
import { UserManagement } from '@/components/user-management'
import { RoleManagement } from '@/components/role-management'
import { PermissionManagement } from '@/components/permission-management'

export default function Roles() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <RoleManagement />
      </div>
    </DashboardShell>
  )
}

