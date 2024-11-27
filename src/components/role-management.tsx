"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Shield, Edit, Trash } from 'lucide-react'

type Role = {
  id: number
  name: string
  permissions: string[]
}

const mockRoles: Role[] = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  { id: 3, name: 'Viewer', permissions: ['Read'] },
]

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false)
  const [newRole, setNewRole] = useState({ name: '', permissions: '' })
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const addRole = () => {
    setRoles([...roles, { ...newRole, id: roles.length + 1, permissions: newRole.permissions.split(',').map(p => p.trim()) }])
    setNewRole({ name: '', permissions: '' })
    setIsAddRoleOpen(false)
  }

  const editRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? {
        ...editingRole,
        permissions: editingRole.permissions
      } : role))
      setIsEditRoleOpen(false)
      setEditingRole(null)
    }
  }

  const deleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  const openEditDialog = (role: Role) => {
    setEditingRole({...role, permissions: role.permissions})
    setIsEditRoleOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Role Management</h2>
        <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
          <DialogTrigger asChild>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>
                Enter the details for the new role.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleName" className="text-right">
                  Name
                </Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="permissions" className="text-right">
                  Permissions
                </Label>
                <Input
                  id="permissions"
                  value={newRole.permissions}
                  onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
                  className="col-span-3"
                  placeholder="Read, Write, Delete (comma-separated)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addRole}>Add Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(', ')}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => deleteRole(role.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the roles details.
            </DialogDescription>
          </DialogHeader>
          {editingRole && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-roleName" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-roleName"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-permissions" className="text-right">
                  Permissions
                </Label>
                <Input
                  id="edit-permissions"
                  value={editingRole.permissions}
                  onChange={(e) => setEditingRole({ ...editingRole, permissions: e.target.value.split(',').map(p => p.trim()) })}
                  className="col-span-3"
                  placeholder="Read, Write, Delete (comma-separated)"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={editRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

