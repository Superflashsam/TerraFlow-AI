
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import MarketMetricsCard from './MarketMetricsCard';
import MarketControls from './MarketControls';
import GeographicHeatMap from './GeographicHeatMap';
import CompetitiveAnalysis from './CompetitiveAnalysis';
import MarketTrendChart from './MarketTrendChart';
import PredictiveAnalytics from './PredictiveAnalytics';
import AppIcon from '@/components/contacts/app-icon';

const MarketIntelligence = () => {
  const [selectedRegion, setSelectedRegion] = useState('mumbai');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState('12m');
  const [selectedComparison, setSelectedComparison] = useState('none');
  const [activeTab, setActiveTab] = useState('overview');

  const marketMetrics = [
    {
      title: "Average Property Value",
      value: "₹13.2 Cr",
      change: 8.5,
      trend: [45, 52, 48, 61, 55, 67, 69, 78, 82, 85, 88, 92],
      icon: "Home",
      unit: ""
    },
    {
      title: "Market Velocity",
      value: "78%",
      change: 12.3,
      trend: [65, 68, 72, 69, 74, 78, 82, 79, 85, 88, 84, 78],
      icon: "TrendingUp",
      unit: ""
    },
    {
      title: "Inventory Levels",
      value: "3,450",
      change: -5.2,
      trend: [95, 92, 88, 85, 82, 78, 75, 72, 69, 65, 62, 58],
      icon: "Package",
      unit: ""
    },
    {
      title: "Price Appreciation",
      value: "15.8%",
      change: 3.7,
      trend: [12, 13, 14, 15, 16, 17, 15, 16, 17, 18, 16, 15.8],
      icon: "ArrowUp",
      unit: ""
    },
    {
      title: "Demand Index",
      value: "92",
      change: 6.9,
      trend: [78, 82, 85, 88, 90, 87, 89, 91, 93, 95, 94, 92],
      icon: "Activity",
      unit: ""
    }
  ];

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting market intelligence report...');
  };

  const tabNavigation = [
    { id: 'overview', label: 'Market Overview', icon: 'BarChart3' },
    { id: 'geographic', label: 'Geographic Analysis', icon: 'Map' },
    { id: 'competitive', label: 'Competitive Intelligence', icon: 'Users' },
    { id: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' },
    { id: 'predictive', label: 'Predictive Analytics', icon: 'Brain' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="w-full">
          {/* Page Header */}
          <PageHeader
            title="Market Intelligence Dashboard"
            description="Comprehensive market analysis, competitive insights, and predictive analytics for strategic real estate decisions"
          />

          {/* Global Controls */}
          <MarketControls
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            selectedTimeHorizon={selectedTimeHorizon}
            setSelectedTimeHorizon={setSelectedTimeHorizon}
            selectedComparison={selectedComparison}
            setSelectedComparison={setSelectedComparison}
            onExport={handleExport}
          />

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabNavigation?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <AppIcon name={tab.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {marketMetrics?.map((metric, index) => (
                  <MarketMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    trend={metric?.trend}
                    icon={metric?.icon}
                    unit={metric?.unit}
                  />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GeographicHeatMap />
                </div>
                <div className="lg:col-span-1">
                  <CompetitiveAnalysis />
                </div>
              </div>

              {/* Market Trends */}
              <MarketTrendChart />
            </div>
          )}

          {activeTab === 'geographic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {marketMetrics?.map((metric, index) => (
                  <MarketMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    trend={metric?.trend}
                    icon={metric?.icon}
                    unit={metric?.unit}
                  />
                ))}
              </div>
              <GeographicHeatMap />
            </div>
          )}

          {activeTab === 'competitive' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketMetrics?.slice(0, 3)?.map((metric, index) => (
                  <MarketMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    trend={metric?.trend}
                    icon={metric?.icon}
                    unit={metric?.unit}
                  />
                ))}
              </div>
              <CompetitiveAnalysis />
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketMetrics?.slice(0, 4)?.map((metric, index) => (
                  <MarketMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    trend={metric?.trend}
                    icon={metric?.icon}
                    unit={metric?.unit}
                  />
                ))}
              </div>
              <MarketTrendChart />
            </div>
          )}

          {activeTab === 'predictive' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketMetrics?.slice(1, 4)?.map((metric, index) => (
                  <MarketMetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    trend={metric?.trend}
                    icon={metric?.icon}
                    unit={metric?.unit}
                  />
                ))}
              </div>
              <PredictiveAnalytics />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MarketIntelligence;
