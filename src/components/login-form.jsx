import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Truck, Mail, Lock, ArrowRight } from 'lucide-react'
import { useRole } from "../utils/Context/RoleContext ";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { _post } from '../utils/helper';
import { toast } from 'react-hot-toast';


export function LoginForm() {
  const navigate = useNavigate()
  const { setRole } = useRole();
  const [formData,setformData]=useState({
    email: '',
    password: '',

  })

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setformData((prevData) => ({ ...prevData, [id]: value }));
  };


  const login = (e) => {
    e.preventDefault();
    _post(
      'api/users/login',
      formData,
      (response) => {
        if (response.success) {
          toast.success('Login successful!');
          const { role, token } = response; // Access role and token directly from the response
  
          // Save the token to localStorage or a state management solution
          localStorage.setItem('authToken', token);
          setRole(role);
  
          // Navigate based on the role
          if (role === 'admin') {
            navigate('/admin/admin-dashboard');
          } else if (role === 'driver') {
            navigate('/driver/dashboard');
          } else if (role === 'truck_owner') {
            navigate('/owner/dashboard');
          } else {
            toast.error('Invalid role. Please contact support.');
          }
        } else {
          toast.error(response.message || 'Login failed');
        }
      },
      () => toast.error('An error occurred during login')
    );
  };
  
 




  return (
    <div className="flex items-center justify-center min-h-screen  from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Truck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the Truck Management Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="pl-10"
                required 
                onChange={handleInputChange} 
                value={formData.email}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </Label>
              <Link to="/forgot-password" className="ml-auto inline-block text-sm underline text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                className="pl-10"
                required 
                onChange={handleInputChange} 
                value={formData.password}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" onClick={login}>
            Login 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Login with Google
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}