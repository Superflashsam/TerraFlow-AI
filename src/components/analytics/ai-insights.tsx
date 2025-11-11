"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingDown, Target, DollarSign, Flame } from "lucide-react"

const insights = [
  {
    icon: Flame,
    title: "Hot Leads Needing Attention",
    description: "12 leads with score >80 haven't been contacted in 24 hours.",
    action: "View Leads",
  },
  {
    icon: TrendingDown,
    title: "Declining Conversion Rate",
    description: "Your conversion rate dropped 2.3% this week. Main issue: slow response time (avg 25 min vs 18 min last week).",
    action: "View Analysis",
  },
  {
    icon: Target,
    title: "Best Performing Source",
    description: "99acres leads convert 2x better (12.4% vs 6.2% avg). Consider increasing budget here.",
    action: "View Campaign",
  },
  {
    icon: DollarSign,
    title: "Revenue Opportunity",
    description: "₹45L in deals stuck in 'Proposal Sent' for 7+ days. Follow up now to close faster.",
    action: "View Deals",
  },
];

export function AiInsights() {
  return (
    <Card className="bg-gradient-to-r from-accent/50 to-secondary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary"/>
            Terra's Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel opts={{
            align: "start",
            loop: true,
        }}>
          <CarouselContent>
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-start justify-between aspect-square p-6">
                        <div>
                            <Icon className="h-8 w-8 mb-4 text-primary" />
                            <h4 className="font-semibold">{insight.title}</h4>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                        <Button variant="outline" size="sm">{insight.action}</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  )
}
