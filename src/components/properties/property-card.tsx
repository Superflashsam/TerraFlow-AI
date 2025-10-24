"use client";

import React from 'react';
import { Camera, MapPin, Bed, Bath, AppWindow, Edit, BarChart3, Share, CheckSquare } from 'lucide-react';
import { getImagePlaceholder } from '@/lib/placeholder-images';

export const PropertyCard = ({ property, isSelected, onSelect, onEdit }: { property: any, isSelected: boolean, onSelect: any, onEdit: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-green-50';
      case 'pending': return 'bg-yellow-500 text-yellow-50';
      case 'sold': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Under Contract';
      case 'sold': return 'Sold';
      default: return 'Draft';
    }
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 8) return 'text-green-500';
    if (rate >= 5) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border-2 transition-all duration-200 ${
      isSelected ? 'border-primary shadow-lg' : 'border-border hover:border-border/80'
    }`}>
      <div className="relative">
        <img
          src={getImagePlaceholder(property.imageId)?.imageUrl || 'https://picsum.photos/seed/property/600/400'}
          alt={property.alt || 'Property listing image'}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-border text-primary bg-card/80 backdrop-blur-sm focus:ring-primary"
          />
        </div>

        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {getStatusText(property.status)}
          </span>
        </div>

        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Camera size={12} />
            <span>{property.images.length}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
            {property.title}
          </h3>
          <div className="text-xl font-bold text-primary">
            {property.price}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{property.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <span className="flex items-center"><Bed size={14} className="mr-1"/>{property.bedrooms} bed</span>
              <span className="flex items-center"><Bath size={14} className="mr-1"/>{property.bathrooms} bath</span>
              <span className="flex items-center"><AppWindow size={14} className="mr-1"/>{property.area}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{property.views}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{property.inquiries}</div>
            <div className="text-xs text-muted-foreground">Inquiries</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{property.showings}</div>
            <div className="text-xs text-muted-foreground">Showings</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="text-muted-foreground">
            <span className="font-medium">{property.daysOnMarket}</span> days on market
          </div>
          <div className={`font-medium ${getPerformanceColor(property.performance.conversionRate)}`}>
            {property.performance.conversionRate}% conversion
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Agent: <span className="font-medium text-foreground">{property.agent}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={onEdit} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit Property">
              <Edit size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Analytics">
              <BarChart3 size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Share Listing">
              <Share size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
