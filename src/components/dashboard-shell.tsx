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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from 'lucide-react'

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder-avatar.jpg"
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <nav className="space-y-4 flex-grow">
        <Link href="#" className="flex items-center space-x-2 text-primary hover:text-primary/80">
          <Users className="h-5 w-5" />
          <span>Users</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-primary hover:text-primary/80">
          <Shield className="h-5 w-5" />
          <span>Roles</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-primary hover:text-primary/80">
          <Key className="h-5 w-5" />
          <span>Permissions</span>
        </Link>
      </nav>
      <div className="border-t pt-4 mt-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground">{mockUser.email}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Logout clicked')}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-card p-6 md:flex md:flex-col">
        <h2 className="mb-6 text-2xl font-bold text-primary">Admin Dashboard</h2>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Burger menu for mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mb-4 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            <SheetHeader className="mb-6">
              <SheetTitle>Admin Dashboard</SheetTitle>
              <SheetDescription>
                Navigate through the dashboard
              </SheetDescription>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Page content */}
        {children}
      </main>
    </div>
  )
}

