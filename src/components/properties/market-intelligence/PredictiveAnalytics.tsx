
import React, { useState } from 'react';
import AppIcon from '../../../components/contacts/app-icon';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('price');

  const predictiveModels = {
    price: {
      title: "Price Prediction Model",
      accuracy: 87.5,
      confidence: 92,
      predictions: [
        { period: "Next Quarter", value: "₹13,250/sq ft", change: "+1.9%" },
        { period: "6 Months", value: "₹13,650/sq ft", change: "+5.0%" },
        { period: "12 Months", value: "₹14,200/sq ft", change: "+9.2%" }
      ],
      factors: [
        { name: "Interest Rates", impact: 35, trend: "negative" },
        { name: "Supply Pipeline", impact: 28, trend: "positive" },
        { name: "Economic Growth", impact: 22, trend: "positive" },
        { name: "Policy Changes", impact: 15, trend: "neutral" }
      ]
    },
    demand: {
      title: "Demand Forecasting",
      accuracy: 84.2,
      confidence: 89,
      predictions: [
        { period: "Next Quarter", value: "1,850 units", change: "+8.5%" },
        { period: "6 Months", value: "3,920 units", change: "+12.3%" },
        { period: "12 Months", value: "8,150 units", change: "+18.7%" }
      ],
      factors: [
        { name: "Population Growth", impact: 32, trend: "positive" },
        { name: "Employment Rate", impact: 28, trend: "positive" },
        { name: "Infrastructure Dev", impact: 25, trend: "positive" },
        { name: "Affordability Index", impact: 15, trend: "negative" }
      ]
    },
    investment: {
      title: "Investment Opportunity Scoring",
      accuracy: 91.3,
      confidence: 95,
      predictions: [
        { period: "High ROI Zones", value: "Powai, Thane", change: "Score: 94/100" },
        { period: "Emerging Areas", value: "Kalyan, Dombivli", change: "Score: 87/100" },
        { period: "Premium Segment", value: "Worli, BKC", change: "Score: 82/100" }
      ],
      factors: [
        { name: "Price Appreciation", impact: 40, trend: "positive" },
        { name: "Rental Yield", impact: 25, trend: "positive" },
        { name: "Liquidity", impact: 20, trend: "neutral" },
        { name: "Development Risk", impact: 15, trend: "negative" }
      ]
    }
  };

  const currentModel = predictiveModels[selectedModel as keyof typeof predictiveModels];

  const marketOpportunities = [
    {
      id: 1,
      title: "Affordable Housing Surge",
      probability: 78,
      impact: "High",
      timeframe: "6-12 months",
      description: "Government policy changes expected to boost affordable housing demand by 25-30%",
      icon: "Home",
      category: "Policy Impact"
    },
    {
      id: 2,
      title: "Commercial Real Estate Recovery",
      probability: 65,
      impact: "Medium",
      timeframe: "12-18 months",
      description: "Return to office trends and new business formations driving commercial space demand",
      icon: "Building",
      category: "Market Shift"
    },
    {
      id: 3,
      title: "Infrastructure Development Boost",
      probability: 85,
      impact: "High",
      timeframe: "18-24 months",
      description: "Metro line extensions and highway projects to increase property values in connected areas",
      icon: "Map",
      category: "Infrastructure"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Predictive Analytics Models</h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(predictiveModels)?.map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedModel === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {model?.title}
            </button>
          ))}
        </div>

        {/* Model Accuracy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Model Accuracy</span>
              <AppIcon name="Target" size={16} className="text-accent" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{currentModel?.accuracy}%</div>
            <div className="w-full bg-background rounded-full h-2 mt-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentModel?.accuracy}%` }}
              />
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Confidence Level</span>
              <AppIcon name="Shield" size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-semibold text-foreground">{currentModel?.confidence}%</div>
            <div className="w-full bg-background rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentModel?.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-foreground">Forecast Results</h4>
          {currentModel?.predictions?.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <span className="text-sm text-muted-foreground">{prediction?.period}</span>
                <p className="text-lg font-semibold text-foreground">{prediction?.value}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  prediction?.change?.includes('+') ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {prediction?.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Influencing Factors */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Key Influencing Factors</h4>
          <div className="space-y-3">
            {currentModel?.factors?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-foreground">{factor?.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    factor?.trend === 'positive' ? 'bg-accent' :
                    factor?.trend === 'negative' ? 'bg-destructive' : 'bg-secondary'
                  }`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-background rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${factor?.impact}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{factor?.impact}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Market Opportunities */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Predicted Market Opportunities</h3>
        
        <div className="space-y-4">
          {marketOpportunities?.map((opportunity) => (
            <div key={opportunity?.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <AppIcon name={opportunity?.icon} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{opportunity?.title}</h4>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                      {opportunity?.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{opportunity?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Probability:</span>
                        <span className="text-sm font-medium text-foreground">{opportunity?.probability}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Impact:</span>
                        <span className={`text-sm font-medium ${
                          opportunity?.impact === 'High' ? 'text-accent' :
                          opportunity?.impact === 'Medium' ? 'text-yellow-500' : 'text-muted-foreground'
                        }`}>
                          {opportunity?.impact}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{opportunity?.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
