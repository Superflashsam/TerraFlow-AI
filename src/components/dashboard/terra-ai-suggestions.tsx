"use client";

import {
  Sparkles,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const suggestions = [
    {
        icon: Target,
        text: "Follow up with 3 high-priority leads from last week",
    },
    {
        icon: TrendingUp,
        text: "Update pricing on 2 properties based on market trends",
    },
    {
        icon: Clock,
        text: "Schedule viewings for weekend - 5 interested prospects",
    },
];

export function TerraAiSuggestions() {
  return (
    <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
        <CardHeader className="flex-row items-start gap-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-accent-foreground" />
            </div>
            <div>
                <CardTitle>Terra AI Suggestions</CardTitle>
                <CardDescription>
                    Based on your recent activity, here are some recommended actions to boost your performance:
                </CardDescription>
            </div>
        </CardHeader>
      <CardContent>
            <div className="space-y-3">
                {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                        <div key={index} className="flex items-center space-x-3 text-sm">
                            <Icon size={16} className="text-accent" />
                            <span className="text-foreground">{suggestion.text}</span>
                        </div>
                    )
                })}
            </div>
            <div className="flex space-x-2 mt-6">
              <Button variant="outline" size="sm">
                View All Suggestions
              </Button>
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
            </div>
      </CardContent>
    </Card>
  );
}
