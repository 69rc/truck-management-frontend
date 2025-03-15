import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { _post } from '../../utils/helper';

function TruckOwnerRegistration() {
  const [truckOwnerData, setTruckOwnerData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTruckOwnerData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    if (!truckOwnerData.name || !truckOwnerData.email || !truckOwnerData.password || !truckOwnerData.confirmPassword) {
      toast.error('Please fill in all required fields.');
      return false;
    }
    if (truckOwnerData.password !== truckOwnerData.confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    _post('api/manage-driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(truckOwnerData),
    })
      .then(() => toast.success('Registration successful'))
      .catch((error) => toast.error(`Error: ${error.message}`));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="name" value={truckOwnerData.name} onChange={handleInputChange} placeholder="John Doe" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" value={truckOwnerData.email} onChange={handleInputChange} placeholder="john@example.com" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="password" type="password" value={truckOwnerData.password} onChange={handleInputChange} className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="confirmPassword" type="password" value={truckOwnerData.confirmPassword} onChange={handleInputChange} className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName" value={truckOwnerData.companyName} onChange={handleInputChange} placeholder="Enter company name" required />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default TruckOwnerRegistration;
