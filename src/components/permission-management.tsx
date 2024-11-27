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
import { Key, Edit, Trash } from 'lucide-react'

type Permission = {
  id: number
  name: string
  description: string
}

const mockPermissions: Permission[] = [
  { id: 1, name: 'Read', description: 'Can view resources' },
  { id: 2, name: 'Write', description: 'Can create and edit resources' },
  { id: 3, name: 'Delete', description: 'Can delete resources' },
]

export function PermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false)
  const [isEditPermissionOpen, setIsEditPermissionOpen] = useState(false)
  const [newPermission, setNewPermission] = useState({ name: '', description: '' })
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

  const addPermission = () => {
    setPermissions([...permissions, { ...newPermission, id: permissions.length + 1 }])
    setNewPermission({ name: '', description: '' })
    setIsAddPermissionOpen(false)
  }

  const editPermission = () => {
    if (editingPermission) {
      setPermissions(permissions.map(permission => permission.id === editingPermission.id ? editingPermission : permission))
      setIsEditPermissionOpen(false)
      setEditingPermission(null)
    }
  }

  const deletePermission = (id: number) => {
    setPermissions(permissions.filter(permission => permission.id !== id))
  }

  const openEditDialog = (permission: Permission) => {
    setEditingPermission(permission)
    setIsEditPermissionOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Permission Management</h2>
        <Dialog open={isAddPermissionOpen} onOpenChange={setIsAddPermissionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Key className="mr-2 h-4 w-4" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Permission</DialogTitle>
              <DialogDescription>
                Enter the details for the new permission.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="permissionName" className="text-right">
                  Name
                </Label>
                <Input
                  id="permissionName"
                  value={newPermission.name}
                  onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newPermission.description}
                  onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addPermission}>Add Permission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(permission)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => deletePermission(permission.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditPermissionOpen} onOpenChange={setIsEditPermissionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>
              Update the permissions details.
            </DialogDescription>
          </DialogHeader>
          {editingPermission && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-permissionName" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-permissionName"
                  value={editingPermission.name}
                  onChange={(e) => setEditingPermission({ ...editingPermission, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingPermission.description}
                  onChange={(e) => setEditingPermission({ ...editingPermission, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={editPermission}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

