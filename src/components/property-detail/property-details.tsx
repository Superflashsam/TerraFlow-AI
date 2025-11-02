"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import Image from 'next/image';

export const PropertyDetails = ({ property }: { property: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tour">Virtual Tour</TabsTrigger>
            <TabsTrigger value="floorplan">Floor Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">{property.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="space-y-1 text-sm">
                    {property.features.map((feature: string) => (
                      <li key={feature} className="flex items-center"><Check size={14} className="mr-2 text-green-500"/>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tour" className="mt-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Virtual tour coming soon</p>
            </div>
          </TabsContent>
          <TabsContent value="floorplan" className="mt-4">
             <div className="relative w-full h-96 bg-muted rounded-lg flex items-center justify-center">
               <Image
                    src="https://res.cloudinary.com/dvic0tda9/image/upload/v1721950485/floorplan_a6g9yq.png"
                    alt="Floor plan"
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
