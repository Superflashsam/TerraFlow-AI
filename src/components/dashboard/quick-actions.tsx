
"use client";
import React from "react";
import {
  UserPlus,
  Building,
  Workflow,
  Calendar,
  FileText,
  Send,
  BarChart3,
  MoreHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const QuickActions = () => {
  const primaryActions = [
    {
      id: "add-lead",
      title: "Add New Lead",
      description: "Capture and qualify new prospects",
      icon: UserPlus,
      color: "primary" as const,
      onClick: () => console.log("Add New Lead"),
    },
    {
      id: "add-property",
      title: "Add Property",
      description: "List new property for sale or rent",
      icon: Building,
      color: "secondary" as const,
      onClick: () => console.log("Add Property"),
    },
    {
      id: "create-workflow",
      title: "Create Workflow",
      description: "Automate your business processes",
      icon: Workflow,
      color: "accent" as const,
      onClick: () => console.log("Create Workflow"),
    },
  ];

  const secondaryActions = [
    {
      id: "schedule-viewing",
      title: "Schedule Viewing",
      icon: Calendar,
      onClick: () => console.log("Schedule viewing"),
    },
    {
      id: "generate-report",
      title: "Generate Report",
      icon: FileText,
      onClick: () => console.log("Generate report"),
    },
    {
      id: "send-proposal",
      title: "Send Proposal",
      icon: Send,
      onClick: () => console.log("Send proposal"),
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      icon: BarChart3,
      onClick: () => console.log("Market Analysis"),
    },
  ];

  const getColorClasses = (color: "primary" | "secondary" | "accent" | "success") => {
    const colorMap = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      success: "bg-green-500 text-white hover:bg-green-500/90",
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={cn(
                "p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg",
                getColorClasses(action.color)
              )}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <action.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-foreground">More Actions</h3>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {secondaryActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex items-center space-x-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <action.icon size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-accent-foreground" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Terra AI Suggestions
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your recent activity, here are some recommended actions
              to boost your performance:
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Target size={14} className="text-accent" />
                <span className="text-foreground">
                  Follow up with 3 high-priority leads from last week
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp size={14} className="text-accent" />
                <span className="text-foreground">
                  Update pricing on 2 properties based on market trends
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock size={14} className="text-accent" />
                <span className="text-foreground">
                  Schedule viewings for weekend - 5 interested prospects
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm">
                View All Suggestions
              </Button>
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
