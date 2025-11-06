
import React, { useState } from 'react';
import AppIcon from '../../../components/contacts/app-icon';

const GeographicHeatMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapView, setMapView] = useState('value'); // 'value', 'velocity', 'opportunity'

  const heatMapData = [
    {
      id: 1,
      zone: "Bandra West",
      lat: 19.0596,
      lng: 72.8295,
      avgValue: "₹2.8 Cr",
      velocity: 85,
      opportunity: 92,
      properties: 245,
      growth: 12.5
    },
    {
      id: 2,
      zone: "Andheri East",
      lat: 19.1136,
      lng: 72.8697,
      avgValue: "₹1.9 Cr",
      velocity: 78,
      opportunity: 88,
      properties: 432,
      growth: 8.3
    },
    {
      id: 3,
      zone: "Powai",
      lat: 19.1197,
      lng: 72.9059,
      avgValue: "₹2.2 Cr",
      velocity: 82,
      opportunity: 95,
      properties: 189,
      growth: 15.2
    },
    {
      id: 4,
      zone: "Worli",
      lat: 19.0176,
      lng: 72.8118,
      avgValue: "₹4.5 Cr",
      velocity: 65,
      opportunity: 75,
      properties: 98,
      growth: 6.8
    },
    {
      id: 5,
      zone: "Thane West",
      lat: 19.2183,
      lng: 72.9781,
      avgValue: "₹1.2 Cr",
      velocity: 91,
      opportunity: 89,
      properties: 567,
      growth: 18.7
    }
  ];

  const getHeatIntensity = (zone: any) => {
    switch (mapView) {
      case 'value':
        return zone?.velocity;
      case 'velocity':
        return zone?.velocity;
      case 'opportunity':
        return zone?.opportunity;
      default:
        return zone?.velocity;
    }
  };

  const getHeatColor = (intensity: number) => {
    if (intensity >= 90) return 'bg-red-500';
    if (intensity >= 80) return 'bg-orange-500';
    if (intensity >= 70) return 'bg-yellow-500';
    if (intensity >= 60) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Geographic Market Analysis</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMapView('value')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                mapView === 'value' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Property Values
            </button>
            <button
              onClick={() => setMapView('velocity')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                mapView === 'velocity' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Market Velocity
            </button>
            <button
              onClick={() => setMapView('opportunity')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                mapView === 'opportunity' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Opportunities
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="relative">
          {/* Map Container */}
          <div className="w-full h-96 bg-muted rounded-lg overflow-hidden relative">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Mumbai Real Estate Market Heat Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=19.0760,72.8777&z=11&output=embed"
              className="absolute inset-0"
            />
            
            {/* Heat Map Overlays */}
            {heatMapData?.map((zone) => (
              <div
                key={zone?.id}
                className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-200 ${getHeatColor(getHeatIntensity(zone))} opacity-70 hover:opacity-100 hover:scale-125`}
                style={{
                  left: `${20 + (zone?.id * 15)}%`,
                  top: `${30 + (zone?.id * 10)}%`,
                }}
                onClick={() => setSelectedZone(zone as any)}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Heat Intensity:</span>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-xs text-muted-foreground">Low</span>
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <AppIcon name="ZoomIn" size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Click zones for details</span>
            </div>
          </div>
        </div>

        {/* Zone Details Panel */}
        {selectedZone && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-foreground">{(selectedZone as any)?.zone}</h4>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <AppIcon name="X" size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Avg Property Value</span>
                <p className="text-lg font-semibold text-foreground">{(selectedZone as any)?.avgValue}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Market Velocity</span>
                <p className="text-lg font-semibold text-foreground">{(selectedZone as any)?.velocity}%</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Active Properties</span>
                <p className="text-lg font-semibold text-foreground">{(selectedZone as any)?.properties}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">YoY Growth</span>
                <p className="text-lg font-semibold text-accent">+{(selectedZone as any)?.growth}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographicHeatMap;
