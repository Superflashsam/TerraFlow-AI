
"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  Building,
  Download,
  MoreHorizontal,
  DollarSign,
  LineChart as LineChartIcon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

const useIsTablet = () => {
    const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined);
    
    React.useEffect(() => {
        const mql = window.matchMedia(`(min-width: 768px) and (max-width: 1024px)`);
        const onChange = () => {
            setIsTablet(mql.matches);
        };
        mql.addEventListener("change", onChange);
        setIsTablet(mql.matches);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isTablet;
}


export const PerformanceChart = () => {
  const [chartType, setChartType] = useState("revenue");
  const [timeRange, setTimeRange] = useState("6months");
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const salesData = [
    { month: "Jul", sales: 850000, deals: 12, leads: 45 },
    { month: "Aug", sales: 920000, deals: 15, leads: 52 },
    { month: "Sep", sales: 1100000, deals: 18, leads: 48 },
    { month: "Oct", sales: 980000, deals: 14, leads: 55 },
    { month: "Nov", sales: 1250000, deals: 20, leads: 62 },
    { month: "Dec", sales: 1450000, deals: 24, leads: 58 },
  ];

  const leadConversionData = [
    { month: "Jul", leads: 45, converted: 12, rate: 26.7 },
    { month: "Aug", leads: 52, converted: 15, rate: 28.8 },
    { month: "Sep", leads: 48, converted: 18, rate: 37.5 },
    { month: "Oct", leads: 55, converted: 14, rate: 25.5 },
    { month: "Nov", leads: 62, converted: 20, rate: 32.3 },
    { month: "Dec", leads: 58, converted: 24, rate: 41.4 },
  ];

  const propertyTypeData = [
    { name: "Residential", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Commercial", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Industrial", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Land", value: 10, color: "hsl(var(--chart-4))" },
  ];
  
  const revenueMarketData = [
    { month: 'Jan', revenue: 2500000, marketPerformance: 80 },
    { month: 'Feb', revenue: 2900000, marketPerformance: 85 },
    { month: 'Mar', revenue: 3200000, marketPerformance: 90 },
    { month: 'Apr', revenue: 2950000, marketPerformance: 82 },
    { month: 'May', revenue: 3500000, marketPerformance: 92 },
    { month: 'Jun', revenue: 4100000, marketPerformance: 95 },
    { month: 'Jul', revenue: 3800000, marketPerformance: 93 },
    { month: 'Aug', revenue: 4200000, marketPerformance: 91 },
    { month: 'Sep', revenue: 4000000, marketPerformance: 88 },
    { month: 'Oct', revenue: 4500000, marketPerformance: 94 },
  ];


  const chartOptions = [
    { id: "revenue", label: "Revenue", icon: DollarSign },
    { id: "sales", label: "Sales Performance", icon: TrendingUp },
    { id: "leads", label: "Lead Conversion", icon: Users },
    { id: "properties", label: "Property Types", icon: Building },
  ];

  const timeRanges = [
    { id: "3months", label: "3M" },
    { id: "6months", label: "6M" },
    { id: "1year", label: "1Y" },
    { id: "all", label: "All" },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('₹', '₹');
  };

  const formatYAxisCurrency = (value: number) => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  }


  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-popover-foreground">
                 {entry.name === "Revenue"
                  ? formatCurrency(entry.value)
                  : entry.name === "Sales"
                  ? formatCurrency(entry.value)
                  : entry.name === "Market Performance"
                  ? `${entry.value}%`
                  : entry.name === "Conversion Rate"
                  ? formatPercentage(entry.value)
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case "revenue":
        return (
           <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueMarketData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatYAxisCurrency}
              />
               <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
               <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="marketPerformance" name="Market Performance" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        );
      case "sales":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#salesGradient)"
                name="Sales"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "leads":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadConversionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                yAxisId="left"
                dataKey="leads"
                fill="hsl(var(--secondary))"
                name="Total Leads"
                opacity={0.7}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--accent))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                name="Conversion Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "properties":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };
  
  const ChartIcon =
    chartOptions.find((o) => o.id === chartType)?.icon || TrendingUp;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Performance Analytics</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            {chartType !== "properties" && (
                <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                    {timeRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>{range.label}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
          {isMobile || isTablet ? (
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center gap-2">
                      <option.icon size={16} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {chartOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setChartType(option.id)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    chartType === option.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <option.icon size={16} />
                  <span className="hidden lg:inline">{option.label}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </CardHeader>

      <CardContent>{renderChart()}</CardContent>

      {chartType === "properties" && (
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {propertyTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter className="border-t pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {chartType === "revenue" && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">₹3.45Cr</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">+15.2%</p>
                <p className="text-sm text-muted-foreground">Y-o-Y Growth</p>
              </div>
               <div className="text-center">
                <p className="text-2xl font-bold text-foreground">89%</p>
                <p className="text-sm text-muted-foreground">Avg. Market Perf.</p>
              </div>
            </>
          )}

          {chartType === "sales" && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">$6.55M</p>
                <p className="text-sm text-muted-foreground">Total Sales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">103</p>
                <p className="text-sm text-muted-foreground">Deals Closed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">+18.5%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </>
          )}

          {chartType === "leads" && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">320</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">103</p>
                <p className="text-sm text-muted-foreground">Converted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">32.2%</p>
                <p className="text-sm text-muted-foreground">Avg. Conversion</p>
              </div>
            </>
          )}

          {chartType === "properties" && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">89</p>
                <p className="text-sm text-muted-foreground">Sold This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">24 days</p>
                <p className="text-sm text-muted-foreground">
                  Avg. Days on Market
                </p>
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

    