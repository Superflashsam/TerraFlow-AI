"use client";

import React, { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/properties/property-card';
import { FilterHeader } from '@/components/properties/filter-header';
import { PropertyStats } from '@/components/properties/property-stats';
import { BulkActions } from '@/components/properties/bulk-actions';
import { PhotoManager } from '@/components/properties/photo-manager';
import { PerformanceDashboard } from '@/components/properties/performance-dashboard';
import { AddPropertyModal } from '@/components/properties/add-property-modal';
import { properties as mockPropertiesData } from '@/lib/placeholder-data';
import { Home, BarChart3, Camera, Users, List, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'listings', label: 'Property Listings', icon: Home },
  { id: 'analytics', label: 'Performance Dashboard', icon: BarChart3 },
  { id: 'photos', label: 'Photo Manager', icon: Camera }
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState(mockPropertiesData);
  const [filteredProperties, setFilteredProperties] = useState(mockPropertiesData);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('listings');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [filters, setFilters] = useState({
    status: 'all',
    propertyType: 'all',
    priceRange: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    let filtered = [...properties];

    if (filters?.status && filters?.status !== 'all') {
      filtered = filtered?.filter(prop => prop?.status === filters?.status);
    }
    if (filters?.propertyType && filters?.propertyType !== 'all') {
      filtered = filtered?.filter(prop => prop?.type.toLowerCase() === filters?.propertyType);
    }
    if(filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p, 10));
      filtered = filtered.filter(prop => {
        const price = parseInt(prop.price.replace(/[^0-9]/g, ''), 10);
        if(filters.priceRange.includes('+')) return price >= min;
        return price >= min * 100000 && price <= max * 100000;
      })
    }
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(prop =>
        prop.title.toLowerCase().includes(query) ||
        prop.address.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handlePropertySelect = (propertyId: string) => {
    const newSelected = new Set(selectedProperties);
    if (newSelected.has(propertyId)) {
      newSelected.delete(propertyId);
    } else {
      newSelected.add(propertyId);
    }
    setSelectedProperties(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p.id.toString()));
    }
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowEditor(true);
  };

  const handleCreateProperty = () => {
    setEditingProperty(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingProperty(null);
  };

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      setProperties(prev =>
        prev.map(p => p.id === (editingProperty as any).id ? { ...p, ...propertyData } : p)
      );
    } else {
      const newProperty = {
        ...propertyData,
        id: Date.now(),
        daysOnMarket: 0,
        views: 0,
        inquiries: 0,
        showings: 0,
        listingDate: new Date().toISOString().split('T')[0],
        performance: {
          conversionRate: 0,
          avgTimeOnSite: '0:00',
          inquiryQuality: 'New'
        }
      };
      setProperties(prev => [newProperty, ...prev]);
    }
    handleCloseEditor();
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <FilterHeader 
          onFiltersChange={setFilters}
          onCreateProperty={handleCreateProperty}
          propertiesCount={filteredProperties.length}
          selectedCount={selectedProperties.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="bg-card border-b border-border">
          <div className="px-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'listings' && (
            <>
              <PropertyStats properties={filteredProperties} />
              {selectedProperties.length > 0 && (
                <div className="mb-6">
                  <BulkActions 
                    selectedCount={selectedProperties.length}
                    onClearSelection={() => setSelectedProperties([])}
                  />
                </div>
              )}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="selectAll" className="text-sm text-muted-foreground">
                    Select all ({filteredProperties.length} properties)
                  </label>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isSelected={selectedProperties.includes(property.id.toString())}
                        onSelect={() => handlePropertySelect(property.id.toString())}
                        onEdit={() => handleEditProperty(property)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg">
                    <table className="w-full">
                       <thead className="bg-muted/50">
                          <tr>
                            <th className="p-4 text-left font-medium text-muted-foreground"><Table /></th>
                            <th className="p-4 text-left font-medium text-muted-foreground">Property</th>
                            <th className="p-4 text-left font-medium text-muted-foreground">Price</th>
                            <th className="p-4 text-left font-medium text-muted-foreground">Status</th>
                            <th className="p-4 text-left font-medium text-muted-foreground">Agent</th>
                          </tr>
                       </thead>
                       <tbody>
                        {filteredProperties.map((property) => (
                           <tr key={property.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                             <td className="p-4">
                                <input
                                  type="checkbox"
                                  checked={selectedProperties.includes(property.id.toString())}
                                  onChange={() => handlePropertySelect(property.id.toString())}
                                  className="rounded border-border text-primary focus:ring-primary"
                                />
                             </td>
                              <td className="p-4">
                                <div className="font-medium text-foreground">{property.title}</div>
                                <div className="text-sm text-muted-foreground">{property.address}</div>
                              </td>
                             <td className="p-4 font-medium text-primary">{property.price}</td>
                             <td className="p-4">{property.status}</td>
                             <td className="p-4">{property.agent}</td>
                           </tr>
                        ))}
                       </tbody>
                    </table>
                  </div>
                )}
                
                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted text-muted-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No Properties Found</h3>
                    <p className="text-muted-foreground mb-4">
                      No properties found matching your criteria. Try adjusting the filters.
                    </p>
                    <Button
                      onClick={handleCreateProperty}
                    >
                      Create First Property
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <PerformanceDashboard properties={properties} />
          )}

          {activeTab === 'photos' && (
            <PhotoManager properties={properties} />
          )}
        </div>
      </main>

      {showEditor && (
        <AddPropertyModal
          property={editingProperty}
          onClose={handleCloseEditor}
          onSubmit={handleSaveProperty}
          isOpen={showEditor}
        />
      )}
    </div>
  );
}
