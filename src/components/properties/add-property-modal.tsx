"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronLeft, ChevronRight, Plus, Upload, FileText, X } from 'lucide-react';

export const AddPropertyModal = ({ isOpen, onClose, onSubmit, property }: { isOpen: boolean, onClose: any, onSubmit: any, property: any }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: property?.title || '',
    propertyType: property?.type || '',
    price: property?.price || '',
    description: '',
    address: property?.address || '',
    city: 'Pune',
    state: 'Maharashtra',
    zipCode: '411057',
    neighborhood: '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    area: property?.area || '',
    lotSize: '',
    yearBuilt: '2022',
    features: [],
    amenities: [],
    images: [],
    documents: [],
    status: property?.status || 'active',
    listingDate: new Date().toISOString().split('T')[0],
    agentNotes: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Property basics' },
    { id: 2, title: 'Location', description: 'Address details' },
    { id: 3, title: 'Details', description: 'Property specs' },
    { id: 4, title: 'Features', description: 'Amenities & features' },
    { id: 5, title: 'Media', description: 'Photos & documents' },
    { id: 6, title: 'Review', description: 'Final review' }
  ];

  const propertyTypeOptions = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const stateOptions = [
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Delhi', label: 'Delhi' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'off-market', label: 'Off Market' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input id="title" placeholder="e.g., Luxury Downtown Condo" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} required />
            </div>
            <div>
              <Label>Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{propertyTypeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="text" placeholder="e.g., ₹85,00,000" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} placeholder="Describe the property..." value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="e.g., 123 Main Street" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="e.g., Pune" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                </div>
                <div>
                    <Label>State</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>{stateOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="e.g., 411057" value={formData.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="neighborhood">Neighborhood</Label>
                    <Input id="neighborhood" placeholder="e.g., Baner" value={formData.neighborhood} onChange={(e) => handleInputChange('neighborhood', e.target.value)} />
                </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" type="number" placeholder="e.g., 3" value={formData.bedrooms} onChange={(e) => handleInputChange('bedrooms', e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" type="number" placeholder="e.g., 2" value={formData.bathrooms} onChange={(e) => handleInputChange('bathrooms', e.target.value)} required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input id="area" type="text" placeholder="e.g., 1500" value={formData.area} onChange={(e) => handleInputChange('area', e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                    <Input id="lotSize" type="number" placeholder="e.g., 5000" value={formData.lotSize} onChange={(e) => handleInputChange('lotSize', e.target.value)} />
                </div>
            </div>
            <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input id="yearBuilt" type="number" placeholder="e.g., 2020" value={formData.yearBuilt} onChange={(e) => handleInputChange('yearBuilt', e.target.value)} />
            </div>
          </div>
        );
      case 4:
        return (
            <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Property Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Garage', 'Pool', 'Garden', 'Balcony', 'Fireplace', 'Walk-in Closet'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <input type="checkbox" id={feature} checked={formData.features.includes(feature as never)} onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('features', [...formData.features, feature as never]);
                      } else {
                        handleInputChange('features', formData.features.filter(f => f !== feature));
                      }
                    }} className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
                    <Label htmlFor={feature}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Building Amenities</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Gym', 'Concierge', 'Rooftop', 'Parking', 'Security', 'Elevator'].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <input type="checkbox" id={amenity} checked={formData.amenities.includes(amenity as never)} onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('amenities', [...formData.amenities, amenity as never]);
                      } else {
                        handleInputChange('amenities', formData.amenities.filter(a => a !== amenity));
                      }
                    }} className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary" />
                    <Label htmlFor={amenity}>{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
            <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Property Images</h4>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                <Button variant="outline" size="sm">Choose Files</Button>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Documents</h4>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Upload property documents, floor plans, etc.</p>
                <Button variant="outline" size="sm">Choose Files</Button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
            <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Listing Settings</h4>
              <div className="space-y-4">
                <div>
                    <Label>Listing Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger><SelectValue placeholder="Select status"/></SelectTrigger>
                        <SelectContent>{statusOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="listingDate">Listing Date</Label>
                    <Input id="listingDate" type="date" value={formData.listingDate} onChange={(e) => handleInputChange('listingDate', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="agentNotes">Agent Notes</Label>
                  <Textarea id="agentNotes" rows={3} placeholder="Internal notes about this property..." value={formData.agentNotes} onChange={(e) => handleInputChange('agentNotes', e.target.value)} />
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-2">Property Summary</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Title:</strong> {formData.title || 'Not specified'}</p>
                <p><strong>Type:</strong> {formData.propertyType || 'Not specified'}</p>
                <p><strong>Price:</strong> {formData.price ? formData.price : 'Not specified'}</p>
                <p><strong>Location:</strong> {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Not specified'}</p>
                <p><strong>Size:</strong> {formData.bedrooms && formData.bathrooms ? `${formData.bedrooms} bed, ${formData.bathrooms} bath` : 'Not specified'}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
            </DialogHeader>

            <div className="px-6 py-4 border-y border-border">
              <div className="flex items-center space-x-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step.id === currentStep ? 'bg-primary text-primary-foreground' : step.id < currentStep ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id < currentStep ? <Check size={16} /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 rounded ${step.id < currentStep ? 'bg-green-500' : 'bg-muted'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {renderStepContent()}
            </div>

            <DialogFooter className="flex items-center justify-between p-6 border-t border-border">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft size={16} className="mr-2" />
                Previous
              </Button>
              <div className="flex space-x-3">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                {currentStep === steps.length ? (
                  <Button onClick={handleSubmit}>
                    <Plus size={16} className="mr-2" />
                    Add Property
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
