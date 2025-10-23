"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
};

export function KpiCard({ title, value, change, icon: Icon }: KpiCardProps) {
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground flex items-center",
            isPositive ? "text-primary" : "text-destructive"
          )}
        >
          <ChangeIcon className="h-4 w-4 mr-1" />
          {isPositive ? "+" : ""}
          {change.toFixed(1)}% from last month
        </p>
      </CardContent>
    </Card>
  );
}
