
"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/placeholder-data';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertySummaryCard } from '@/components/property-detail/property-summary-card';
import { PhotoGallery } from '@/components/property-detail/photo-gallery';
import { PropertyDetails } from '@/components/property-detail/property-details';
import { LocationMap } from '@/components/property-detail/location-map';
import { FinancialsCalculator } from '@/components/property-detail/financials-calculator';
import { AgentInfo } from '@/components/property-detail/agent-info';
import { TerraScribePanel } from '@/components/property-detail/terra-scribe-panel';
import { SimilarProperties } from '@/components/property-detail/similar-properties';


const PropertyDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (propertyId) {
      const foundProperty = properties.find(p => p.id === propertyId);
      setProperty(foundProperty);
    }
  }, [propertyId]);

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="outline" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="mr-2" /> Back to Listings
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
          <p className="text-muted-foreground">{property.address}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Heart className="mr-2"/> Favorite</Button>
          <Button variant="outline"><Share2 className="mr-2"/> Share</Button>
          <Button><Edit className="mr-2"/> Edit Listing</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <PropertySummaryCard property={property} />
            <PhotoGallery images={property.images} />
            <PropertyDetails property={property} />
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <LocationMap location={property.address} />
                <SimilarProperties currentPropertyId={property.id} />
            </div>
        </div>
        <div className="space-y-6">
            <TerraScribePanel property={property} />
            <AgentInfo agentName={property.agent} />
            <FinancialsCalculator price={parseInt(property.price.replace(/[^0-9]/g, ''), 10)} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
