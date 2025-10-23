"use client";

import React, { useState } from 'react';
import {
  Home,
  Plus,
  Bed,
  Bath,
  Square,
  Calendar,
  X,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const PropertiesOfInterest = ({
  properties,
  onAddProperty,
  onRemoveProperty,
  onScheduleViewing,
}: {
  properties: any[];
  onAddProperty: (query: string) => void;
  onRemoveProperty: (id: number) => void;
  onScheduleViewing: (id: number) => void;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-destructive';
  };

  const getMatchScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/10';
    if (score >= 70) return 'bg-yellow-500/10';
    return 'bg-destructive/10';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getViewingStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return 'text-accent-foreground bg-accent/10';
      case 'completed': return 'text-green-500 bg-green-500/10';
      case 'cancelled': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Properties of Interest</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-2" />
          Add Property
        </Button>
      </div>

      <div className="space-y-4">
        {properties.length === 0 ? (
          <div className="text-center py-8">
            <Home size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No properties of interest yet</p>
          </div>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{property.title}</h4>
                      <p className="text-sm text-muted-foreground">{property.address}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreBg(property.matchScore)} ${getMatchScoreColor(property.matchScore)}`}>
                      {property.matchScore}% Match
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1"><Bed size={14} /><span>{property.bedrooms} bed</span></div>
                    <div className="flex items-center space-x-1"><Bath size={14} /><span>{property.bathrooms} bath</span></div>
                    <div className="flex items-center space-x-1"><Square size={14} /><span>{property.sqft.toLocaleString()} sqft</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-semibold text-foreground">{formatPrice(property.price)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onScheduleViewing(property.id)}>
                        <Calendar className="mr-2" /> Schedule
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemoveProperty(property.id)}>
                        <X />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { PropertiesOfInterest };