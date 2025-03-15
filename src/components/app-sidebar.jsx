'use client'

import * as React from "react"
import { useNavigate ,NavLink} from "react-router-dom"
import { Home, Truck, User, Route, Clipboard, Settings, LogOut } from 'lucide-react'
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRole } from "../utils/Context/RoleContext ";

// Sample data for roles and links
const data = {
  navAdmin: [
    { title: "Dashboard", url: "admin-dashboard", icon: <Home className="w-5 h-5" /> },
    { title: "Truck Management", url: "#", icon: <Truck className="w-5 h-5" /> },
    { title: "Driver Management", url: "#", icon: <User className="w-5 h-5" /> },
    { title: "Route Management", url: "#", icon: <Route className="w-5 h-5" /> },
    { title: "Delivery Tracking", url: "#", icon: <Clipboard className="w-5 h-5" /> },
    { title: "Reports", url: "#", icon: <Clipboard className="w-5 h-5" /> },
  ],
  navDriver: [
    { title: "Dashboard", url: "dashboard", icon: <Home className="w-5 h-5" /> },
    { title: "My Routes", url: "#", icon: <Route className="w-5 h-5" /> },
    { title: "My Truck", url: "my-truck", icon: <Truck className="w-5 h-5" /> },
    { title: "Delivery Status", url: "#", icon: <Clipboard className="w-5 h-5" /> },
    { title: "Maintenance Logs", url: "#", icon: <Truck className="w-5 h-5" /> },
  ],
  navtruckowner: [
    { title: "Dashboard", url: "#", icon: <Home className="w-5 h-5" /> },
    { title: "Delivery Assignments", url: "#", icon: <Clipboard className="w-5 h-5" /> },
    { title: "Route Planning", url: "#", icon: <Route className="w-5 h-5" /> },
    { title: "Driver Communication", url: "#", icon: <User className="w-5 h-5" /> },
    { title: "Shift Management", url: "#", icon: <Settings className="w-5 h-5" /> },
  ],
}


export function AppSidebar({  logoSrc = "/placeholder.svg?height=40&width=40", ...props }) {
  const [activeItem, setActiveItem] = React.useState("Dashboard")
  const Navigate = useNavigate()
  const { role } = useRole();

const logout =() => {
  localStorage.removeItem("authToken");
  Navigate('/')
}

  let navLinks = []
  
  // Determine the navigation links based on the user's role
  switch (role) {
    case "admin":
      navLinks = data.navAdmin
      break
    case "driver":
      navLinks = data.navDriver
      break
    case "truck owner":
      navLinks = data.navtruckowner
      break
    default:
      navLinks = data.navAdmin
  }

  return (
    <Sidebar className="border-r bg-white dark:bg-dark-950 " {...props}>
      <SidebarHeader className="flex flex-col items-center space-y-2 border-b p-6">
        <div className="flex items-center space-x-2">
          {/* <img src={logoSrc} alt="Truck Master Logo" className="h-10 w-10" /> */}
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Truck Master</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                      ${activeItem === item.title
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                      }`}
                    onClick={() => setActiveItem(item.title)}
                  >
                    <NavLink to={item.url} className="flex items-center w-full">
                      <span className={`mr-3 transition-transform duration-200 ease-in-out group-hover:scale-110 ${activeItem === item.title ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {item.icon}
                      </span>
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          </div>
        </div>
        <Button className="mt-4 w-full" variant="outline"onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}