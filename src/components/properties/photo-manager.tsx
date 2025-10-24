"use client";

import React, { useState } from 'react';
import { Upload, Grid, List, Download, Shuffle, Star, Edit, Trash2, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockPhotos = [
  {
    id: '1',
    url: "https://images.unsplash.com/photo-1721614463238-c327d3d42ccf",
    alt: 'Modern living room with contemporary furniture and large windows',
    isMain: true,
    title: 'Living Room'
  },
  {
    id: '2',
    url: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
    alt: 'Spacious modern kitchen with granite countertops and stainless steel appliances',
    isMain: false,
    title: 'Kitchen'
  },
  {
    id: '3',
    url: "https://images.unsplash.com/photo-1617098900591-3f90928e8c54",
    alt: 'Master bedroom with king-size bed and elegant decor',
    isMain: false,
    title: 'Master Bedroom'
  },
  {
    id: '4',
    url: "https://images.unsplash.com/photo-1701250421566-a6ef7ce9bc40",
    alt: 'Luxurious bathroom with marble finishes and modern fixtures',
    isMain: false,
    title: 'Bathroom'
  }
];

export const PhotoManager = ({ properties }: { properties: any[] }) => {
  const [selectedProperty, setSelectedProperty] = useState(properties?.[0]?.id.toString() || '');
  const [viewMode, setViewMode] = useState('grid');
  const [uploading, setUploading] = useState(false);

  const currentProperty = properties.find((p) => p.id.toString() === selectedProperty);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setUploading(true);

    setTimeout(() => {
      console.log('Uploading photos for property:', selectedProperty, files);
      setUploading(false);
    }, 2000);
  };

  const handlePhotoDelete = (photoIndex: number) => {
    console.log('Deleting photo:', photoIndex, 'from property:', selectedProperty);
  };

  const handleSetMainPhoto = (photoIndex: number) => {
    console.log('Setting main photo:', photoIndex, 'for property:', selectedProperty);
  };

  const propertyOptions = properties.map((property) => ({
    value: property.id.toString(),
    label: property.title
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Photo Manager</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage property photos, optimize images, and organize galleries
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-foreground">Property:</label>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="min-w-[200px]">
                    <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                    {propertyOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Upload New Photos</h3>
          <div className="text-sm text-muted-foreground">
            {currentProperty ? `${mockPhotos.length} photos` : 'No property selected'}
          </div>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="bulk-photo-upload"
            disabled={!selectedProperty} />

          <label htmlFor="bulk-photo-upload" className={`cursor-pointer ${!selectedProperty ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="space-y-3">
              <Upload size={40} className="mx-auto text-muted-foreground" />
              <div>
                <div className="text-foreground font-medium">
                  {uploading ? 'Uploading photos...' : 'Drop photos here or click to upload'}
                </div>
                <div className="text-sm text-muted-foreground">
                  Supports: JPG, PNG, WebP • Max: 10MB per photo • Recommended: 1920x1080
                </div>
              </div>
            </div>
          </label>
        </div>

        {uploading &&
        <div className="mt-4 bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Loader2 size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-primary">Processing photos...</div>
                <div className="text-sm text-muted-foreground">
                  Optimizing images and generating thumbnails
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      {selectedProperty &&
      <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-foreground">
              Photo Gallery - {currentProperty?.title}
            </h3>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download size={14} className="mr-1" />
                Download All
              </Button>
              <Button variant="outline" size="sm">
                <Shuffle size={14} className="mr-1" />
                Auto-Optimize
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ?
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockPhotos.map((photo, index) =>
                <div key={photo.id} className="relative group">
                  <div className="relative">
                    <img src={photo.url} alt={photo.alt} className="w-full h-48 object-cover rounded-lg" />
                    {photo.isMain &&
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">Main Photo</div>
                    }
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        {!photo.isMain &&
                          <button onClick={() => handleSetMainPhoto(index)} className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90" title="Set as Main Photo">
                            <Star size={14} />
                          </button>
                        }
                        <button className="bg-card text-foreground p-2 rounded-full hover:bg-muted" title="Edit Photo">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handlePhotoDelete(index)} className="bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90" title="Delete Photo">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-foreground">{photo.title}</div>
                    <div className="text-xs text-muted-foreground">1920x1080 • 2.4MB</div>
                  </div>
                </div>
              )}
            </div> :
            <div className="space-y-3">
              {mockPhotos.map((photo, index) =>
                <div key={photo.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <img src={photo.url} alt={photo.alt} className="w-20 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{photo.title}</div>
                    <div className="text-sm text-muted-foreground">1920x1080 • 2.4MB • Uploaded 2 hours ago</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {photo.isMain &&
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">Main</span>
                    }
                    <button className="p-2 text-muted-foreground hover:text-primary">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handlePhotoDelete(index)} className="p-2 text-muted-foreground hover:text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
          {mockPhotos.length === 0 &&
            <div className="text-center py-8 text-muted-foreground">No photos uploaded for this property yet.</div>
          }
        </div>
      }

      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-3">Photo Management Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Best Practices</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Use high-resolution images (1920x1080 or higher)</li>
              <li>Ensure proper lighting and staging</li>
              <li>Include photos of all major rooms</li>
              <li>Set the most appealing photo as main</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Performance Impact</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Properties with 10+ photos get 47% more views</li>
              <li>High-quality images increase inquiry rates by 23%</li>
              <li>Virtual tours boost showing requests by 35%</li>
              <li>Optimized images improve page load by 40%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
