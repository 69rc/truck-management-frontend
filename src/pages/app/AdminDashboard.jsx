'use client'

import React, { useState } from 'react'
import { Bell, Truck, Users, MapPin, BarChart, Settings, Search, ChevronDown, Activity, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 ease-in-out">
      {/* Header */}
     
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
       

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Trucks', value: 120, icon: Truck, description: 'Available & In-Service' },
            { title: 'Total Drivers', value: 45, icon: Users, description: 'Active & On-Duty' },
            { title: 'Total Routes', value: 75, icon: MapPin, description: 'Routes Planned & Active' },
            { title: 'Performance', value: '92%', icon: BarChart, description: 'On-Time Deliveries' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <CardDescription className="text-sm text-muted-foreground">{stat.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Overview</CardTitle>
                <CardDescription>A summary of your fleet's current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Trucks</span>
                    <span className="font-semibold">85/120</span>
                  </div>
                  <Progress value={70} className="w-full" />
                  <div className="flex justify-between items-center">
                    <span>On-Duty Drivers</span>
                    <span className="font-semibold">38/45</span>
                  </div>
                  <Progress value={84} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>On-Time Deliveries</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <Progress value={92} className="w-full" />
                  <div className="flex justify-between items-center">
                    <span>Fuel Efficiency</span>
                    <span className="font-semibold text-yellow-600">78%</span>
                  </div>
                  <Progress value={78} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="finance">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Summary of financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Revenue (This Month)</span>
                    <span className="font-semibold text-green-600">$1,234,567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Expenses (This Month)</span>
                    <span className="font-semibold text-red-600">$987,654</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Profit Margin</span>
                    <span className="font-semibold text-blue-600">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Expandable Section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '60px' }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8"
        >
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-semibold">Recent Activities</span>
            <ChevronDown className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
          {isExpanded && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-4">
                <Activity className="text-blue-500" />
                <span>New route added: Los Angeles to San Francisco</span>
              </div>
              <div className="flex items-center space-x-4">
                <Truck className="text-green-500" />
                <span>Truck #123 completed maintenance check</span>
              </div>
              <div className="flex items-center space-x-4">
                <DollarSign className="text-yellow-500" />
                <span>Monthly financial report generated</span>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}