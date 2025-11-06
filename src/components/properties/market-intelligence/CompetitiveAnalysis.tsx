
import React from 'react';
import AppIcon from '../../../components/contacts/app-icon';

const CompetitiveAnalysis = () => {
  const competitorData = [
  {
    id: 1,
    name: "Lodha Group",
    marketShare: 18.5,
    avgPrice: "₹12,500/sq ft",
    projects: 24,
    trend: 'up',
    change: 2.3,
    logo: "https://images.unsplash.com/photo-1656646425215-a3f999cf9c17",
    logoAlt: "Modern corporate building representing Lodha Group real estate company"
  },
  {
    id: 2,
    name: "Godrej Properties",
    marketShare: 15.2,
    avgPrice: "₹11,800/sq ft",
    projects: 19,
    trend: 'up',
    change: 1.8,
    logo: "https://images.unsplash.com/photo-1621176302196-9ab38d681980",
    logoAlt: "Glass office building facade representing Godrej Properties corporate headquarters"
  },
  {
    id: 3,
    name: "Oberoi Realty",
    marketShare: 12.8,
    avgPrice: "₹15,200/sq ft",
    projects: 12,
    trend: 'down',
    change: -0.5,
    logo: "https://images.unsplash.com/photo-1614224352143-ef0bcc52828d",
    logoAlt: "Luxury residential tower representing Oberoi Realty premium properties"
  },
  {
    id: 4,
    name: "Tata Housing",
    marketShare: 11.3,
    avgPrice: "₹10,900/sq ft",
    projects: 16,
    trend: 'up',
    change: 3.1,
    logo: "https://images.unsplash.com/photo-1707299651614-18f443d09e5a",
    logoAlt: "Contemporary residential complex representing Tata Housing development projects"
  },
  {
    id: 5,
    name: "Mahindra Lifespace",
    marketShare: 8.9,
    avgPrice: "₹9,750/sq ft",
    projects: 14,
    trend: 'up',
    change: 1.2,
    logo: "https://images.unsplash.com/photo-1657100941036-29a23baa25a2",
    logoAlt: "Sustainable green building representing Mahindra Lifespace eco-friendly developments"
  }];


  const pricingComparison = [
  { segment: "Luxury (₹15K+)", ourShare: 22, competitor: 28 },
  { segment: "Premium (₹10-15K)", ourShare: 35, competitor: 31 },
  { segment: "Mid-range (₹7-10K)", ourShare: 28, competitor: 25 },
  { segment: "Affordable (<₹7K)", ourShare: 15, competitor: 16 }];


  return (
    <div className="space-y-6">
      {/* Market Share Analysis */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Market Share Analysis</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AppIcon name="Calendar" size={16} />
            <span>Last 12 months</span>
          </div>
        </div>

        <div className="space-y-4">
          {competitorData?.map((competitor) =>
          <div key={competitor?.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors">
              <img
              src={competitor?.logo}
              alt={competitor?.logoAlt}
              className="w-12 h-12 rounded-lg object-cover" />

              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{competitor?.name}</h4>
                  <div className={`flex items-center space-x-1 ${
                competitor?.trend === 'up' ? 'text-accent' : 'text-destructive'}`
                }>
                    <AppIcon name={competitor?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                    <span className="text-sm font-medium">{Math.abs(competitor?.change)}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{competitor?.marketShare}% market share</span>
                  <span>{competitor?.projects} active projects</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${competitor?.marketShare}%` }} />

                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Avg Price</p>
                <p className="font-semibold text-foreground">{competitor?.avgPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pricing Comparison */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Pricing Segment Analysis</h3>
        
        <div className="space-y-4">
          {pricingComparison?.map((segment, index) =>
          <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{segment?.segment}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-primary">Our Share: {segment?.ourShare}%</span>
                  <span className="text-muted-foreground">Market Avg: {segment?.competitor}%</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${segment?.ourShare}%` }} />

                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${segment?.competitor}%` }} />

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Market Insights */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Competitive Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AppIcon name="TrendingUp" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Opportunity</span>
            </div>
            <p className="text-sm text-foreground">
              Premium segment shows 15% growth potential with limited competition in South Mumbai luxury projects.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-500/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AppIcon name="AlertTriangle" size={16} className="text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">Watch</span>
            </div>
            <p className="text-sm text-foreground">
              Affordable housing segment becoming saturated. Consider strategic partnerships or differentiation.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default CompetitiveAnalysis;
