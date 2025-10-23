
"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Building,
  Handshake,
  DollarSign,
  PlusCircle,
  SquareCheckBig,
  MessageSquarePlus,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/new-kpi-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickAccessWidget } from "@/components/dashboard/quick-access-widget";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PageHeader } from "@/components/shared/page-header";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const kpiData = [
    {
      title: "Active Leads",
      value: "247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      color: "primary" as const,
    },
    {
      title: "Properties Listed",
      value: "156",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Building,
      color: "secondary" as const,
    },
    {
      title: "Deals Closed",
      value: "24",
      change: "+18.7%",
      changeType: "positive" as const,
      icon: Handshake,
      color: "success" as const,
    },
    {
      title: "Monthly Revenue",
      value: "$1.45M",
      change: "+24.1%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "accent" as const,
    },
  ];

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Welcome back, Sarah! 👋"
        description={currentTime ? formatDateTime(currentTime) : "Loading..."}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        <div className="xl:col-span-2">
          <ActivityFeed />
        </div>

        <div className="xl:col-span-1">
          <QuickAccessWidget />
        </div>
      </div>

      <div className="mb-8">
        <PerformanceChart />
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
