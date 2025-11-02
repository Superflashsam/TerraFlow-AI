"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, School, Hospital, ShoppingCart, Train } from 'lucide-react';
import Image from 'next/image';

export const LocationMap = ({ location }: { location: string }) => {
    const nearbyPlaces = [
        { icon: School, name: 'Global International School', distance: '1.2 km' },
        { icon: Hospital, name: 'City Hospital', distance: '2.5 km' },
        { icon: ShoppingCart, name: 'Phoenix Marketcity', distance: '3.1 km' },
        { icon: Train, name: 'Metro Station', distance: '800 m' },
    ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location & Nearby</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
           <Image
                src="https://res.cloudinary.com/dvic0tda9/image/upload/v1721950485/map_z2v1m9.png"
                alt="Map showing property location"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div>
            <h4 className="font-semibold mb-3">What's Nearby?</h4>
            <div className="grid grid-cols-2 gap-3">
                {nearbyPlaces.map(place => {
                    const Icon = place.icon;
                    return (
                         <div key={place.name} className="flex items-center space-x-2">
                            <Icon size={16} className="text-muted-foreground"/>
                            <div>
                                <p className="text-sm font-medium">{place.name}</p>
                                <p className="text-xs text-muted-foreground">{place.distance}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
