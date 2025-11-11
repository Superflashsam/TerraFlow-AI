
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Hospital, ShoppingCart, Train } from 'lucide-react';

export const LocationMap = ({ location }: { location: string }) => {
    const nearbyPlaces = [
        { icon: School, name: 'Global International School', distance: '1.2 km' },
        { icon: Hospital, name: 'City Hospital', distance: '2.5 km' },
        { icon: ShoppingCart, name: 'Phoenix Marketcity', distance: '3.1 km' },
        { icon: Train, name: 'Metro Station', distance: '800 m' },
    ]

    const encodedLocation = encodeURIComponent(location);
    const mapSrc = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location & Nearby</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 rounded-lg overflow-hidden mb-6 border">
           <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={`Google Map showing ${location}`}
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
                className="absolute inset-0"
            />
        </div>
        <div>
            <h4 className="font-semibold mb-3">What's Nearby?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyPlaces.map(place => {
                    const Icon = place.icon;
                    return (
                         <div key={place.name} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                            <Icon size={20} className="text-primary"/>
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
