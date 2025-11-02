
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { properties } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath } from 'lucide-react';

export const SimilarProperties = ({ currentPropertyId }: { currentPropertyId: string }) => {
    const similarProperties = properties.filter(p => p.id !== currentPropertyId).slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {similarProperties.map(property => (
            <Link href={`/property-detail?id=${property.id}`} key={property.id}>
                <div className="flex space-x-4 p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <Image
                        src={property.images[0].url}
                        alt={property.title}
                        width={128}
                        height={96}
                        className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                        <h4 className="font-semibold text-sm">{property.title}</h4>
                        <p className="text-sm text-primary font-medium">{property.price}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center"><Bed size={12} className="mr-1"/>{property.bedrooms}</span>
                            <span className="flex items-center"><Bath size={12} className="mr-1"/>{property.bathrooms}</span>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
      </CardContent>
    </Card>
  );
};
