"use client";
import React from 'react';
import Image from 'next/image';
import { Bed, Bath, Square, MapPin, Calendar, Building, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const PropertySummaryCard = ({ property }: { property: any }) => {

    const mainImage = property.images?.find((img: any) => img.isMain) || property.images?.[0];

    const stats = [
        { icon: Bed, label: `${property.bedrooms} Beds` },
        { icon: Bath, label: `${property.bathrooms} Baths` },
        { icon: Square, label: `${property.area}` },
        { icon: Building, label: property.type, capitalized: true }
    ];

    return (
        <Card>
            <CardContent className="p-6">
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                    <Image
                        src={mainImage?.url || 'https://picsum.photos/seed/summary/800/600'}
                        alt={mainImage?.alt || 'Main property image'}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-3xl font-bold text-primary">{property.price}</p>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                        {property.status}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center my-6 py-4 border-y border-border">
                    {stats.map(stat => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label}>
                                <Icon className="mx-auto mb-1 text-primary" size={20}/>
                                <p className={`text-sm font-medium ${stat.capitalized ? 'capitalize' : ''}`}>{stat.label}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="space-y-3 text-sm">
                     <div className="flex items-center space-x-2">
                        <DollarSign size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Price/Sqft:</span>
                        <span className="font-medium text-foreground">₹{parseInt(property.price.replace(/[^0-9]/g, '')) / parseInt(property.area.replace(/[^0-9]/g, ''))}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Listed:</span>
                        <span className="font-medium text-foreground">{property.listingDate} ({property.daysOnMarket} days ago)</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};
