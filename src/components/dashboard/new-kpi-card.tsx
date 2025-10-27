
"use client";
import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type KPICardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  color?: "primary" | "secondary" | "accent" | "success";
};

export const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = "primary",
}: KPICardProps) => {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-green-500";
    if (changeType === "negative") return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return TrendingUp;
    if (changeType === "negative") return TrendingDown;
    return Minus;
  };

  const ChangeIcon = getChangeIcon();

  const getColorClasses = () => {
    const colorMap = {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      success: "bg-green-500 text-white",
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            getColorClasses()
          )}
        >
          <Icon size={24} />
        </div>
        <div
          className={cn("flex items-center space-x-1 text-sm", getChangeColor())}
        >
          <ChangeIcon size={16} />
          <span className="font-medium">{change}</span>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};
