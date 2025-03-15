import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TruckOwnerRegistration from './TruckOwnerRegistration';
import DriverRegistration from './DriverRegistration';

export default function RegistrationPage() {
  const [role, setRole] = useState('truckOwner');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Truck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Choose your role and enter your details to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="truckOwner" className="w-full" onValueChange={setRole}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="truckOwner">Truck Owner</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
            </TabsList>
            <TabsContent value="truckOwner" className="mt-4">
              <TruckOwnerRegistration />
            </TabsContent>
            <TabsContent value="driver" className="mt-4">
              <DriverRegistration />
            </TabsContent>
          </Tabs>
          <Separator className="my-4" />
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              By signing up, you agree to our <a href="/" className="underline">Terms</a> and <a href="/" className="underline">Privacy Policy</a>.
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
