import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const initialTruckState = {
  license_plate: '',
  model: '',
  make: '',
  year: '',
  status: '',
  capacity: ''
};

function TruckManagement() {
  const [trucks, setTrucks] = useState([]);
  const [currentTruck, setCurrentTruck] = useState(initialTruckState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch trucks from API or local storage
    // For this example, we'll use mock data
    const mockTrucks = [
      { id: 1, license_plate: 'ABC123', model: 'F-150', make: 'Ford', year: '2020', status: 'Active', capacity: '2000' },
      { id: 2, license_plate: 'XYZ789', model: 'Silverado', make: 'Chevrolet', year: '2019', status: 'Maintenance', capacity: '2500' }
    ];
    setTrucks(mockTrucks);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTruck({ ...currentTruck, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      // Update existing truck
      setTrucks(trucks.map(truck => (truck.id === currentTruck.id ? currentTruck : truck)));
      setEditing(false);
    } else {
      // Add new truck
      const newTruck = { ...currentTruck, id: Date.now() };
      setTrucks([...trucks, newTruck]);
    }
    setCurrentTruck(initialTruckState);
  };

  const handleEdit = (truck) => {
    setEditing(true);
    setCurrentTruck(truck);
  };

  const handleDelete = (id) => {
    setTrucks(trucks.filter(truck => truck.id !== id));
  };

  return (
    (<div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editing ? 'Edit Truck' : 'Add Truck'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="license_plate"
                placeholder="License Plate"
                value={currentTruck.license_plate}
                onChange={handleInputChange}
                required />
              <Input
                type="text"
                name="model"
                placeholder="Model"
                value={currentTruck.model}
                onChange={handleInputChange}
                required />
              <Input
                type="text"
                name="make"
                placeholder="Make"
                value={currentTruck.make}
                onChange={handleInputChange}
                required />
              <Input
                type="text"
                name="year"
                placeholder="Year"
                value={currentTruck.year}
                onChange={handleInputChange}
                required />
              <Input
                type="text"
                name="status"
                placeholder="Status"
                value={currentTruck.status}
                onChange={handleInputChange}
                required />
              <Input
                type="text"
                name="capacity"
                placeholder="Capacity"
                value={currentTruck.capacity}
                onChange={handleInputChange}
                required />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit">{editing ? 'Update' : 'Add'} Truck</Button>
              {editing && <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Truck List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Plate</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trucks.map(truck => (
                <TableRow key={truck.id}>
                  <TableCell>{truck.license_plate}</TableCell>
                  <TableCell>{truck.make}</TableCell>
                  <TableCell>{truck.model}</TableCell>
                  <TableCell>{truck.year}</TableCell>
                  <TableCell>{truck.status}</TableCell>
                  <TableCell>{truck.capacity}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEdit(truck)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(truck.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>)
  );
}

export default TruckManagement;

