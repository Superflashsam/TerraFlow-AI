"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Check, X, TrendingUp, BarChart } from 'lucide-react';

export const TerraScribePanel = ({ property }: { property: any }) => {
    const insights = {
        summary: "This 4-bed villa in a prime school district offers excellent value. Strong appreciation potential due to upcoming infrastructure projects. Ideal for families looking for a long-term home.",
        pros: ["High-growth area", "Modern construction", "Good school district", "Spacious layout"],
        cons: ["Slightly above average price/sqft", "Backyard requires landscaping"],
        investmentPotential: "High (8/10)",
        marketTrend: "Prices in this area are up 12% YoY."
    }

  return (
    <Card className="bg-accent/20 border-accent/30">
      <CardHeader>
        <div className="flex items-center space-x-2">
            <Sparkles className="text-primary"/>
            <CardTitle>TerraScribe Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold text-sm mb-2">AI Summary</h4>
            <p className="text-sm text-muted-foreground">{insights.summary}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center"><Check size={16} className="mr-1 text-green-500"/> Pros</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                    {insights.pros.map(pro => <li key={pro}>{pro}</li>)}
                </ul>
            </div>
             <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center"><X size={16} className="mr-1 text-destructive"/> Cons</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                    {insights.cons.map(con => <li key={con}>{con}</li>)}
                </ul>
            </div>
        </div>
         <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center"><TrendingUp size={16} className="mr-1 text-primary"/> Investment Potential</h4>
            <p className="text-sm text-muted-foreground">{insights.investmentPotential}</p>
        </div>
         <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center"><BarChart size={16} className="mr-1 text-primary"/> Market Trend</h4>
            <p className="text-sm text-muted-foreground">{insights.marketTrend}</p>
        </div>
      </CardContent>
    </Card>
  );
};
