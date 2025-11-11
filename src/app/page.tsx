
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Building,
  Handshake,
  DollarSign,
  UserPlus,
  Workflow,
  MoreHorizontal,
  Calendar,
  FileText,
  Send,
  BarChart3,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/new-kpi-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickAccessWidget } from "@/components/dashboard/quick-access-widget";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { MarketIntelligenceCard } from "@/components/dashboard/market-intelligence-card";
import { TerraAiSuggestions } from "@/components/dashboard/terra-ai-suggestions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddLeadModal } from "@/components/leads/add-lead-modal";
import { AddPropertyModal } from "@/components/properties/add-property-modal";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleAddNewLead = (newLead: any) => {
    console.log("New Lead Added:", newLead);
    // Here you would typically handle the state update for leads
  };
  
  const handleAddProperty = (newProperty: any) => {
    console.log("New Property Added:", newProperty);
    // Here you would typically handle the state update for properties
  };


  const kpiData = [
    {
      title: "Active Leads",
      value: "247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      color: "primary" as const,
      href: "/leads",
    },
    {
      title: "Properties Listed",
      value: "156",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Building,
      color: "secondary" as const,
      href: "/properties",
    },
    {
      title: "Deals Closed",
      value: "24",
      change: "+18.7%",
      changeType: "positive" as const,
      icon: Handshake,
      color: "success" as const,
      href: "/deals",
    },
    {
      title: "Monthly Revenue",
      value: "$1.45M",
      change: "+24.1%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "accent" as const,
      href: "/analytics",
    },
  ];

  const quickActions = [
    {
      id: "add-lead",
      title: "Add New Lead",
      icon: UserPlus,
      color: "primary" as const,
      onClick: () => setIsAddLeadModalOpen(true),
    },
    {
      id: "add-property",
      title: "Add Property",
      icon: Building,
      color: "secondary" as const,
      onClick: () => setIsAddPropertyModalOpen(true),
    },
  ];

  const moreActions = [
     {
      id: "create-workflow",
      title: "Create Workflow",
      icon: Workflow,
      onClick: () => router.push("/automation"),
    },
    {
      id: "schedule-viewing",
      title: "Schedule Viewing",
      icon: Calendar,
      onClick: () => router.push("/tasks"),
    },
    {
      id: "generate-report",
      title: "Generate Report",
      icon: FileText,
      onClick: () => router.push("/analytics"),
    },
    {
      id: "send-proposal",
      title: "Send Proposal",
      icon: Send,
      onClick: () => router.push("/marketing"),
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      icon: BarChart3,
      onClick: () => router.push("/properties"),
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
    <>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Welcome back, Sarah! 👋"
          description={currentTime ? formatDateTime(currentTime) : "Loading..."}
        >
          <div className="flex items-center space-x-2">
            {quickActions.map((action) => (
              <Button key={action.id} onClick={action.onClick} variant={action.color as any} size="sm">
                <action.icon className="mr-2 h-4 w-4" />
                {action.title}
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="ml-2">More Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {moreActions.map((action) => (
                  <DropdownMenuItem key={action.id} onClick={action.onClick}>
                    <action.icon className="mr-2 h-4 w-4" />
                    <span>{action.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </PageHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Link href={kpi.href} key={index}>
              <KPICard
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ActivityFeed />
          </div>

          <div className="xl:col-span-1">
            <QuickAccessWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8">
            <MarketIntelligenceCard />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
            <TerraAiSuggestions />
        </div>
      </div>

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={handleAddNewLead}
      />

      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
        onSubmit={handleAddProperty}
        property={null}
      />
    </>
  );
};

export default Dashboard;
