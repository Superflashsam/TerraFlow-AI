
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const MarketControls = ({ 
  selectedRegion, 
  setSelectedRegion, 
  selectedPropertyType, 
  setSelectedPropertyType,
  selectedTimeHorizon,
  setSelectedTimeHorizon,
  selectedComparison,
  setSelectedComparison,
  onExport
}: { 
  selectedRegion: string, 
  setSelectedRegion: (value: string) => void, 
  selectedPropertyType: string, 
  setSelectedPropertyType: (value: string) => void,
  selectedTimeHorizon: string,
  setSelectedTimeHorizon: (value: string) => void,
  selectedComparison: string,
  setSelectedComparison: (value: string) => void,
  onExport: () => void
}) => {
  const regionOptions = [
    { value: 'mumbai', label: 'Mumbai Metropolitan' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' }
  ];

  const propertyTypeOptions = [
    { value: 'all', label: 'All Property Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'luxury', label: 'Luxury Homes' },
    { value: 'affordable', label: 'Affordable Housing' }
  ];

  const timeHorizonOptions = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '12m', label: '12 Months' },
    { value: '24m', label: '24 Months' }
  ];

  const comparisonOptions = [
    { value: 'none', label: 'No Comparison' },
    { value: 'mumbai', label: 'vs Mumbai' },
    { value: 'delhi', label: 'vs Delhi NCR' },
    { value: 'bangalore', label: 'vs Bangalore' },
    { value: 'national', label: 'vs National Average' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
          <SelectContent>{regionOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
        
        <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>{propertyTypeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
        
        <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
          <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
          <SelectContent>{timeHorizonOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
        
        <Select value={selectedComparison} onValueChange={setSelectedComparison}>
          <SelectTrigger><SelectValue placeholder="Compare with..." /></SelectTrigger>
          <SelectContent>{comparisonOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
        
        <Button
          variant="outline"
          onClick={onExport}
          className="h-10"
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default MarketControls;
