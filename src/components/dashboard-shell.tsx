"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Users, UserPlus, Shield, Key, Menu } from 'lucide-react'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const SidebarContent = () => (
    <nav className="space-y-4 ">
      <Link href="/users" className="flex items-center space-x-2 text-primary hover:text-primary/80">
        <Users className="h-5 w-5" />
        <span>Users</span>
      </Link>
      <Link href="/roles" className="flex items-center space-x-2 text-primary hover:text-primary/80">
        <Shield className="h-5 w-5" />
        <span>Roles</span>
      </Link>
      <Link href="/permissions" className="flex items-center space-x-2 text-primary hover:text-primary/80">
        <Key className="h-5 w-5" />
        <span>Permissions</span>
      </Link>
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-card p-6 md:block">
       <Link href="/"> <h2 className="mb-6 text-2xl font-bold text-primary">Admin Dashboard</h2></Link>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Burger menu for mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mb-4 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Admin Dashboard</SheetTitle>
              <SheetDescription>
                Navigate through the dashboard
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Page content */}
        {children}
      </main>
    </div>
  )
}

