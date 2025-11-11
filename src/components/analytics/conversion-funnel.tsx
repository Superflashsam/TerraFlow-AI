"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const funnelData = [
  { stage: 'Leads', count: 1247, percentage: 100 },
  { stage: 'Contacted', count: 892, percentage: 71.5 },
  { stage: 'Qualified', count: 445, percentage: 35.7 },
  { stage: 'Site Visit', count: 178, percentage: 14.3 },
  { stage: 'Proposal Sent', count: 89, percentage: 7.1 },
  { stage: 'Negotiation', count: 42, percentage: 3.4 },
  { stage: 'Closed Won', count: 24, percentage: 1.9 },
]

export function ConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead to Deal Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {funnelData.map((item, index) => (
            <div key={item.stage} className="relative h-12 flex items-center pr-4">
              <div
                className="absolute left-0 top-0 h-full bg-teal-500 transition-all duration-300 rounded-r-md opacity-80"
                style={{ width: `${item.percentage}%`, background: `hsl(160, 100%, ${90 - (index * 7)}%)` }}
              />
              <div className="relative z-10 w-full flex justify-between items-center px-4">
                <span className="font-medium text-sm text-foreground">{item.stage}</span>
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-lg text-foreground">{item.count}</span>
                    <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                </div>
              </div>
               {index < funnelData.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 text-xs text-destructive-foreground bg-destructive/80 px-1.5 py-0.5 rounded-full">
                  &#8595; {((funnelData[index+1].count / item.count) * 100).toFixed(1)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
