
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Hash, Building, Maximize } from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
            <Icon size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-medium text-foreground">{value}</span>
    </div>
);

export const AdditionalDetails = ({ property }: { property: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DetailItem icon={Hash} label="Property ID" value={`TERRA-${property.id.padStart(4, '0')}`} />
        <DetailItem icon={Calendar} label="Year Built" value={property.yearBuilt || 'N/A'} />
        <DetailItem icon={Maximize} label="Lot Size" value={property.lotSize ? `${property.lotSize.toLocaleString()} sqft` : 'N/A'} />
        <DetailItem icon={Building} label="Property Type" value={property.type} />
        <DetailItem icon={Calendar} label="Last Updated" value={new Date(property.listingDate).toLocaleDateString()} />
      </CardContent>
    </Card>
  );
};
