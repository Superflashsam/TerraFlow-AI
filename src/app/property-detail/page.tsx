
"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties as allProperties } from '@/lib/placeholder-data';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertySummaryCard } from '@/components/property-detail/property-summary-card';
import { PhotoGallery } from '@/components/property-detail/photo-gallery';
import { PropertyDetails } from '@/components/property-detail/property-details';
import { LocationMap } from '@/components/property-detail/location-map';
import { FinancialsCalculator } from '@/components/property-detail/financials-calculator';
import { AgentInfo } from '@/components/property-detail/agent-info';
import { TerraScribePanel } from '@/components/property-detail/terra-scribe-panel';
import { SimilarProperties } from '@/components/property-detail/similar-properties';
import { AdditionalDetails } from '@/components/property-detail/additional-details';


const PropertyDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (propertyId) {
      const foundProperty = allProperties.find(p => p.id === propertyId);
      setProperty(foundProperty);
    }
  }, [propertyId]);
  
  const handleUpdatePropertyDetails = (updatedDetails: any) => {
    setProperty((prev: any) => ({...prev, ...updatedDetails}));
    // Here you would typically also make an API call to save the changes
  };

  if (!property) {
    return (
      <div className="p-6">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <Button variant="outline" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{property.title}</h1>
          <p className="text-muted-foreground">{property.address}</p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <Button variant="outline" size="sm"><Heart className="mr-2 h-4 w-4"/> Favorite</Button>
          <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
          <Button size="sm"><Edit className="mr-2 h-4 w-4"/> Edit Listing</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
            <PhotoGallery images={property.images} />
            <PropertyDetails property={property} />
            <LocationMap location={property.address} />
            <AdditionalDetails property={property} onUpdate={handleUpdatePropertyDetails} />
            <SimilarProperties currentPropertyId={property.id} />
        </div>
        
        {/* Sidebar Column */}
        <div className="space-y-6">
            <PropertySummaryCard property={property} />
            <TerraScribePanel property={property} />
            <AgentInfo agentName={property.agent} />
            <FinancialsCalculator price={parseInt(property.price.replace(/[^0-9]/g, ''), 10)} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
