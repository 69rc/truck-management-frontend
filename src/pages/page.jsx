import React, { useState, useEffect } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
import { Bell, Truck, Search, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      return newTheme
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              {/* <div className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary hidden sm:block">
                  Truck Management
                </h1>
              </div> */}
            </div>
            
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10 w-full bg-background"
                  placeholder="Search trucks, drivers, or routes..."
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full"
                      src="/placeholder.svg?height=32&width=32"
                      alt="Admin avatar"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}