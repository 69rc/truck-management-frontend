'use client'

import { useState,useEffect,useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Edit, Trash2, Plus, TruckIcon } from 'lucide-react'
import {_get,_put,_post} from '../../utils/helper'


export default function TruckManagement() {
  const [trucks, setTrucks] = useState([])
  const [currentTruck, setCurrentTruck] = useState({ id: '', make: '', model: '', year: '' })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentTruck({ ...currentTruck, [name]: value })

  }
 useEffect(()=>{
  gettrucks();

 },[]);
  const gettrucks = useCallback(()=>{
    _get('api/truck',
      (res)=>{
        setTrucks(res.data)
      },
      (err)=>console.error(err)
    )
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      setTrucks(trucks.map(truck => truck.id === currentTruck.id ? currentTruck : truck))
      setIsEditing(false)
    } else {
      setTrucks([...trucks, { ...currentTruck, id: Date.now().toString() }])
    }
    setCurrentTruck({ id: '', make: '', model: '', year: '' })
  }

  const handleEdit = (truck) => {
    setCurrentTruck(truck)
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    setTrucks(trucks.filter(truck => truck.id !== id))
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      
      <Card className="mb-8 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-2xl flex items-center">
            <TruckIcon className="mr-2" />
            {isEditing ? 'Edit Truck' : 'Add New Truck'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make" className="text-sm font-medium text-gray-700">Make</Label>
                <Input
                  id="make"
                  name="make"
                  value={currentTruck.make}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Ford"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium text-gray-700">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={currentTruck.model}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. F-150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={currentTruck.year}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 2023"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isEditing ? (
                <>
                  <Edit className="w-5 h-5 mr-2" />
                  Update Truck
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Truck
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Truck List</h2>
      {trucks.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No trucks added yet. Add your first truck above!</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Make</TableHead>
                <TableHead className="font-semibold text-gray-700">Model</TableHead>
                <TableHead className="font-semibold text-gray-700">Year</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trucks.map((truck) => (
                <TableRow key={truck.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{truck.make}</TableCell>
                  <TableCell>{truck.model}</TableCell>
                  <TableCell>{truck.year}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleEdit(truck)} variant="outline" size="sm" className="mr-2 hover:bg-blue-50">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button onClick={() => handleDelete(truck.id)} variant="destructive" size="sm" className="hover:bg-red-600">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

