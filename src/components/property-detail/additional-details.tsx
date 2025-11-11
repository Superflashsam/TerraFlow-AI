
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Hash, Building, Maximize, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center justify-between text-sm py-2 border-b border-border last:border-b-0">
        <div className="flex items-center space-x-3">
            <Icon size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{label}</span>
        </div>
        <span className="font-medium text-foreground">{value || 'N/A'}</span>
    </div>
);

const EditableDetailItem = ({ label, value, onChange }: { label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="space-y-1">
        <Label htmlFor={label} className="text-xs text-muted-foreground">{label}</Label>
        <Input id={label} value={value} onChange={onChange} className="h-8" />
    </div>
);


export const AdditionalDetails = ({ property, onUpdate }: { property: any, onUpdate: (details: any) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState({
        propertyId: `TERRA-${property.id.padStart(4, '0')}`,
        yearBuilt: property.yearBuilt || '',
        lotSize: property.lotSize ? property.lotSize.toLocaleString() : '',
        propertyType: property.type || '',
        lastUpdated: new Date(property.listingDate).toLocaleDateString()
    });

    useEffect(() => {
        setDetails({
            propertyId: `TERRA-${property.id.padStart(4, '0')}`,
            yearBuilt: property.yearBuilt || '',
            lotSize: property.lotSize ? property.lotSize.toLocaleString() : '',
            propertyType: property.type || '',
            lastUpdated: new Date(property.listingDate).toLocaleDateString()
        });
    }, [property]);

    const handleInputChange = (field: keyof typeof details) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(prev => ({...prev, [field]: e.target.value}));
    };

    const handleSave = () => {
        onUpdate({
            yearBuilt: details.yearBuilt,
            lotSize: parseInt(details.lotSize.replace(/,/g, ''), 10) || 0,
            type: details.propertyType
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDetails({
            propertyId: `TERRA-${property.id.padStart(4, '0')}`,
            yearBuilt: property.yearBuilt || '',
            lotSize: property.lotSize ? property.lotSize.toLocaleString() : '',
            propertyType: property.type || '',
            lastUpdated: new Date(property.listingDate).toLocaleDateString()
        });
        setIsEditing(false);
    }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Additional Details</CardTitle>
        {isEditing ? (
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}><X className="mr-2 h-4 w-4"/>Cancel</Button>
                <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save</Button>
            </div>
        ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
                <EditableDetailItem label="Property ID" value={details.propertyId} onChange={() => {}} />
                <EditableDetailItem label="Year Built" value={details.yearBuilt} onChange={handleInputChange('yearBuilt')} />
                <EditableDetailItem label="Lot Size (sqft)" value={details.lotSize} onChange={handleInputChange('lotSize')} />
                <EditableDetailItem label="Property Type" value={details.propertyType} onChange={handleInputChange('propertyType')} />
                <EditableDetailItem label="Last Updated" value={details.lastUpdated} onChange={handleInputChange('lastUpdated')} />
            </div>
        ) : (
            <>
                <DetailItem icon={Hash} label="Property ID" value={details.propertyId} />
                <DetailItem icon={Calendar} label="Year Built" value={details.yearBuilt} />
                <DetailItem icon={Maximize} label="Lot Size" value={`${details.lotSize} sqft`} />
                <DetailItem icon={Building} label="Property Type" value={details.propertyType} />
                <DetailItem icon={Calendar} label="Last Updated" value={details.lastUpdated} />
            </>
        )}
      </CardContent>
    </Card>
  );
};
