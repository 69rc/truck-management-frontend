import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, Calendar, Car, UserPlus, BadgeIcon as IdCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { _post } from '../../utils/helper';

function DriverRegistration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState({
    query_type: 'insert',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    licenseNumber: '',
    nin: '',
    address: '',
    dob: '',
    state: '',
    role:'driver',
    lga: '',
    nextOfKin: '',
    vehicleId: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDriverData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    if (!driverData.name || !driverData.email || !driverData.password || !driverData.confirmPassword) {
      toast.error('Please fill in all required fields.');
      return false;
    }
    if (driverData.password !== driverData.confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await _post('api/manage-driver', driverData, response => {
      if (response.success) {
        toast.success('Doctor registration successful!')
        navigate('/driver')
      } else {
        toast.error(response.message || 'Registration failed')
      }
    },
    () => toast.error('An error occurred during registration')
  )}
 

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const driverFormSteps = [
    // Step 1: Personal Information
    <div key="step-1" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="name" value={driverData.name} onChange={handleInputChange} placeholder="John Doe" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" value={driverData.email} onChange={handleInputChange} placeholder="john@example.com" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="password" type="password" value={driverData.password} onChange={handleInputChange} className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="confirmPassword" type="password" value={driverData.confirmPassword} onChange={handleInputChange} className="pl-10" required />
        </div>
      </div>
    </div>,

    // Step 2: Address Information
    <div key="step-2" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="address" value={driverData.address} onChange={handleInputChange} placeholder="123 Main St" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="dob" type="date" value={driverData.dob} onChange={handleInputChange} className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input id="state" value={driverData.state} onChange={handleInputChange} placeholder="Enter state" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lga">Local Government Area (LGA)</Label>
        <Input id="lga" value={driverData.lga} onChange={handleInputChange} placeholder="Enter LGA" required />
      </div>
    </div>,

    // Step 3: Emergency Contact Information
    <div key="step-3" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="phoneNumber" value={driverData.phoneNumber} onChange={handleInputChange} placeholder="+1234567890" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="nextOfKin">Next of Kin</Label>
        <div className="relative">
          <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="nextOfKin" value={driverData.nextOfKin} onChange={handleInputChange} placeholder="Jane Doe" className="pl-10" required />
        </div>
      </div>
    </div>,

    // Step 4: Vehicle Information
    <div key="step-4" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="vehicleId">Vehicle ID</Label>
        <div className="relative">
          <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="vehicleId" value={driverData.vehicleId} onChange={handleInputChange} placeholder="Enter vehicle ID" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="licenseNumber">License Number</Label>
        <div className="relative">
          <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="licenseNumber" value={driverData.licenseNumber} onChange={handleInputChange} placeholder="123456789" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="nin">National Identification Number (NIN)</Label>
        <Input id="nin" value={driverData.nin} onChange={handleInputChange} placeholder="Enter NIN" required />
      </div>
    </div>,
  ];

  return (
    <div className="space-y-4">
      {driverFormSteps[step - 1]}
      <div className="flex justify-between mt-4">
        {step > 1 && <Button onClick={prevStep}>Previous</Button>}
        {step < driverFormSteps.length ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}

export default DriverRegistration;
