
"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Building,
  Handshake,
  Workflow,
  Phone,
  Camera,
  Filter,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type ActivityType = {
  id: number;
  type: "lead" | "property" | "deal" | "workflow";
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: Date;
  actionable: boolean;
  priority: "high" | "medium" | "low";
};

const iconMap: { [key: string]: LucideIcon } = {
  UserPlus,
  Building,
  Handshake,
  Workflow,
  Phone,
  Camera,
  Activity,
};

export const ActivityFeed = () => {
  const [filter, setFilter] = useState("all");

  const activities: ActivityType[] = [
    {
      id: 1,
      type: "lead",
      icon: UserPlus,
      title: "New lead assigned",
      description: "Michael Rodriguez - High priority lead from website inquiry",
      timestamp: new Date(Date.now() - 300000),
      actionable: true,
      priority: "high",
    },
    {
      id: 2,
      type: "property",
      icon: Building,
      title: "Property listing updated",
      description: "Downtown Luxury Condo - Price reduced to $850,000",
      timestamp: new Date(Date.now() - 900000),
      actionable: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "deal",
      icon: Handshake,
      title: "Deal closed successfully",
      description: "Oceanview Villa - $2.5M commission: $75,000",
      timestamp: new Date(Date.now() - 1800000),
      actionable: false,
      priority: "high",
    },
    {
      id: 4,
      type: "workflow",
      icon: Workflow,
      title: "Automated follow-up sent",
      description: "Email sequence triggered for 5 warm leads",
      timestamp: new Date(Date.now() - 3600000),
      actionable: false,
      priority: "low",
    },
    {
      id: 5,
      type: "lead",
      icon: Phone,
      title: "Lead interaction logged",
      description: "Sarah Chen - Phone call completed, interested in viewing",
      timestamp: new Date(Date.now() - 5400000),
      actionable: true,
      priority: "medium",
    },
    {
      id: 6,
      type: "property",
      icon: Camera,
      title: "Property photos uploaded",
      description: "Modern Townhouse - 12 new high-resolution images added",
      timestamp: new Date(Date.now() - 7200000),
      actionable: false,
      priority: "low",
    },
  ];

  const filterOptions = [
    { value: "all", label: "All Activity" },
    { value: "lead", label: "Leads" },
    { value: "property", label: "Properties" },
    { value: "deal", label: "Deals" },
    { value: "workflow", label: "Workflows" },
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.type === filter);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    const colorMap = {
      high: "border-l-destructive",
      medium: "border-l-yellow-500",
      low: "border-l-muted-foreground",
    };
    return colorMap[priority] || "border-l-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Activity
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                    {filterOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto flex-1">
        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-muted/50 transition-colors duration-200 border-l-4 ${getPriorityColor(
                    activity.priority
                  )}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {activity.title}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>

                      {activity.actionable && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="default" size="sm">
                            Take Action
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Activity size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No activity found
            </h3>
            <p className="text-muted-foreground">
              No {filter === "all" ? "" : filter} activity to display at the
              moment.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <Link href="/analytics" className="w-full">
            <Button variant="ghost" size="sm" className="w-full">
            View All Activity
            <ArrowRight size={16} className="ml-2" />
            </Button>
        </Link>
      </div>
    </div>
  );
};
