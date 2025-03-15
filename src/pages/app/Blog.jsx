"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Plus, ImageIcon, Grid2X2, List } from "lucide-react"

export default function TruckBlog() {
  const [trucks, setTrucks] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTruck, setCurrentTruck] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    truckNumber: "",
    model: "",
    capacity: "",
    status: "available",
    description: "",
    imageUrl: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Load trucks from localStorage on component mount
  useEffect(() => {
    const savedTrucks = localStorage.getItem("trucks")
    if (savedTrucks) {
      setTrucks(JSON.parse(savedTrucks))
    }
  }, [])

  // Save trucks to localStorage whenever trucks state changes
  useEffect(() => {
    localStorage.setItem("trucks", JSON.stringify(trucks))
  }, [trucks])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      status: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageUrl: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      truckNumber: "",
      model: "",
      capacity: "",
      status: "available",
      description: "",
      imageUrl: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleAddTruck = (e) => {
    e.preventDefault()
    const newTruck = {
      ...formData,
      id: Date.now().toString(),
    }
    setTrucks([...trucks, newTruck])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditClick = (truck) => {
    setCurrentTruck(truck)
    setFormData({
      id: truck.id,
      title: truck.title || "",
      truckNumber: truck.truckNumber,
      model: truck.model,
      capacity: truck.capacity,
      status: truck.status,
      description: truck.description,
      imageUrl: truck.imageUrl || "",
      date: truck.date || new Date().toISOString().split("T")[0],
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateTruck = (e) => {
    e.preventDefault()
    const updatedTrucks = trucks.map((truck) => (truck.id === formData.id ? formData : truck))
    setTrucks(updatedTrucks)
    resetForm()
    setIsEditDialogOpen(false)
  }

  const handleDeleteTruck = (id) => {
    const filteredTrucks = trucks.filter((truck) => truck.id !== id)
    setTrucks(filteredTrucks)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Truck Blog</h1>
        <div className="flex gap-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid2X2 className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Truck Post</DialogTitle>
                <DialogDescription>Create a new blog post about a truck in your fleet.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTruck}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter a catchy title for this post"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="truckNumber">Truck Number</Label>
                        <Input
                          id="truckNumber"
                          name="truckNumber"
                          value={formData.truckNumber}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={handleSelectChange} className="mt-1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="in-use">In Use</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="image">Truck Image</Label>
                        <div className="mt-1 flex items-center gap-4">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1"
                          />
                        </div>
                        {formData.imageUrl && (
                          <div className="mt-4 border rounded-md overflow-hidden">
                            <img
                              src={formData.imageUrl || "/placeholder.svg"}
                              alt="Truck preview"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-1 h-32"
                          placeholder="Write a detailed description about this truck..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Publish Post</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {trucks.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No truck posts yet</h2>
          <p className="mt-2 text-muted-foreground">Add your first truck post to get started.</p>
          <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Post
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <Card key={truck.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 bg-muted">
                {truck.imageUrl ? (
                  <img
                    src={truck.imageUrl || "/placeholder.svg"}
                    alt={truck.title || truck.truckNumber}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                    onClick={() => handleEditClick(truck)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this truck post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteTruck(truck.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{truck.title || `Truck ${truck.truckNumber}`}</CardTitle>
                    <CardDescription className="mt-1">
                      {truck.date &&
                        new Date(truck.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      truck.status === "available"
                        ? "bg-green-100 text-green-800"
                        : truck.status === "in-use"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {truck.status === "available" ? "Available" : truck.status === "in-use" ? "In Use" : "Maintenance"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Model:</span>
                    <span className="text-sm">{truck.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Capacity:</span>
                    <span className="text-sm">{truck.capacity}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {truck.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {trucks.map((truck) => (
            <Card key={truck.id}>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 bg-muted">
                  {truck.imageUrl ? (
                    <img
                      src={truck.imageUrl || "/placeholder.svg"}
                      alt={truck.title || truck.truckNumber}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-grow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{truck.title || `Truck ${truck.truckNumber}`}</h3>
                      <p className="text-sm text-muted-foreground">
                        {truck.date &&
                          new Date(truck.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(truck)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this truck post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTruck(truck.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium">Truck Number:</span>
                      <p>{truck.truckNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Model:</span>
                      <p>{truck.model}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Capacity:</span>
                      <p>{truck.capacity}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        truck.status === "available"
                          ? "bg-green-100 text-green-800"
                          : truck.status === "in-use"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {truck.status === "available"
                        ? "Available"
                        : truck.status === "in-use"
                          ? "In Use"
                          : "Maintenance"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {truck.description || "No description provided."}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Truck Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Truck Post</DialogTitle>
            <DialogDescription>Update the truck post details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateTruck}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Post Title</Label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a catchy title for this post"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-truckNumber">Truck Number</Label>
                    <Input
                      id="edit-truckNumber"
                      name="truckNumber"
                      value={formData.truckNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-model">Model</Label>
                    <Input
                      id="edit-model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-capacity">Capacity</Label>
                    <Input
                      id="edit-capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={formData.status} onValueChange={handleSelectChange} className="mt-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="in-use">In Use</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-image">Truck Image</Label>
                    <div className="mt-1 flex items-center gap-4">
                      <Input
                        id="edit-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1"
                      />
                    </div>
                    {formData.imageUrl && (
                      <div className="mt-4 border rounded-md overflow-hidden">
                        <img
                          src={formData.imageUrl || "/placeholder.svg"}
                          alt="Truck preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 h-32"
                      placeholder="Write a detailed description about this truck..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

