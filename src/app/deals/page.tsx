"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import dynamic from "next/dynamic";
import type { Deal, DealStage } from "@/components/deals/deal-kanban";
const DealKanban = dynamic(
  () => import("@/components/deals/deal-kanban").then((m) => m.DealKanban),
  { ssr: false, loading: () => <div className="h-40 rounded-lg bg-muted animate-pulse" /> }
);
import { IndianRupee, Handshake, LineChart, Clock, PlusCircle, Filter, Search, Users, Calendar as CalendarIcon, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function DealsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pipeline");
  const [filters, setFilters] = useState<{ search?: string; stage?: DealStage | "all"; agentId?: string; minValue?: number; maxValue?: number; source?: string }>({ stage: "all" });
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [deals, setDeals] = useState<Deal[]>([
    { id: "DEAL-0721", property: "Prestige Lakeview 3BHK", value: 24000000, currency: "INR", createdAt: "Nov 14, 2025", client: { name: "Rajesh Kumar", avatarId: "avatar-rajesh" }, contacts: ["phone", "whatsapp", "email"], source: "99acres", agents: [{ id: "priya", name: "Priya Sharma", avatarId: "avatar-priya" }], priority: "Hot", ageDays: 17, stage: "new", aiScore: 78, expectedCloseDate: "2025-12-04" },
    { id: "DEAL-0722", property: "Kalyani Nagar Penthouse", value: 38000000, currency: "INR", createdAt: "Nov 02, 2025", client: { name: "Amit Desai", avatarId: "avatar-amit" }, contacts: ["phone", "email"], source: "Referral", agents: [{ id: "vikram", name: "Vikram Rao", avatarId: "avatar-1" }], priority: "Warm", ageDays: 29, stage: "qualified", aiScore: 65, expectedCloseDate: "2025-12-15" },
    { id: "DEAL-0723", property: "Whitefield Villa 4BHK", value: 25000000, currency: "INR", createdAt: "Nov 10, 2025", client: { name: "Neha Gupta", avatarId: "avatar-sunita" }, contacts: ["phone", "sms"], source: "Website", agents: [{ id: "priya", name: "Priya Sharma", avatarId: "avatar-priya" }, { id: "rajesh", name: "Rajesh Kumar", avatarId: "avatar-rajesh" }], priority: "Hot", ageDays: 21, stage: "site-visit", aiScore: 72 },
    { id: "DEAL-0724", property: "Brigade Commercial Office", value: 12000000, currency: "INR", createdAt: "Oct 28, 2025", client: { name: "Sunil Reddy", avatarId: "avatar-2" }, contacts: ["email"], source: "Event", agents: [{ id: "deepa", name: "Deepa Nair", avatarId: "avatar-sunita" }], priority: "Warm", ageDays: 34, stage: "negotiation", aiScore: 59 },
    { id: "DEAL-0725", property: "Baner Apartment 2BHK", value: 6500000, currency: "INR", createdAt: "Nov 09, 2025", client: { name: "Sneha Patel", avatarId: "avatar-sunita" }, contacts: ["whatsapp", "sms"], source: "Referral", agents: [{ id: "amit", name: "Amit Patel", avatarId: "avatar-amit" }], priority: "Cold", ageDays: 22, stage: "proposal-sent", aiScore: 48 },
    { id: "DEAL-0726", property: "Koregaon Park Villa", value: 25000000, currency: "INR", createdAt: "Nov 01, 2025", client: { name: "Rajiv Verma", avatarId: "avatar-3" }, contacts: ["phone"], source: "99acres", agents: [{ id: "vikram", name: "Vikram Rao", avatarId: "avatar-1" }], priority: "Warm", ageDays: 30, stage: "qualified", aiScore: 67 },
    { id: "DEAL-0727", property: "Wakad Modern Flat", value: 7000000, currency: "INR", createdAt: "Oct 25, 2025", client: { name: "Pooja Sharma", avatarId: "avatar-priya" }, contacts: ["email"], source: "Website", agents: [{ id: "rajesh", name: "Rajesh Kumar", avatarId: "avatar-rajesh" }], priority: "Cold", ageDays: 37, stage: "new", aiScore: 40 },
    { id: "DEAL-0728", property: "Oceanview Penthouse", value: 25000000, currency: "INR", createdAt: "Oct 20, 2025", client: { name: "Kavya Reddy", avatarId: "avatar-2" }, contacts: ["phone", "email"], source: "Referral", agents: [{ id: "priya", name: "Priya Sharma", avatarId: "avatar-priya" }], priority: "Hot", ageDays: 42, stage: "closed-won", aiScore: 90, status: "won" },
    { id: "DEAL-0729", property: "Green Valley Plot", value: 2000000, currency: "INR", createdAt: "Oct 15, 2025", client: { name: "Anil Shah", avatarId: "avatar-1" }, contacts: ["sms"], source: "Event", agents: [{ id: "deepa", name: "Deepa Nair", avatarId: "avatar-sunita" }], priority: "Warm", ageDays: 47, stage: "closed-lost", aiScore: 35, status: "lost" },
    { id: "DEAL-0730", property: "Bandra Highrise 3BHK", value: 18000000, currency: "INR", createdAt: "Oct 22, 2025", client: { name: "Rohit Kulkarni", avatarId: "avatar-amit" }, contacts: ["phone", "whatsapp"], source: "Website", agents: [{ id: "amit", name: "Amit Patel", avatarId: "avatar-amit" }], priority: "Hot", ageDays: 40, stage: "site-visit", aiScore: 74 },
    { id: "DEAL-0731", property: "Kalyani Nagar Office", value: 14500000, currency: "INR", createdAt: "Oct 19, 2025", client: { name: "Meera Joshi", avatarId: "avatar-3" }, contacts: ["email"], source: "Referral", agents: [{ id: "rajesh", name: "Rajesh Kumar", avatarId: "avatar-rajesh" }], priority: "Warm", ageDays: 43, stage: "negotiation", aiScore: 61 },
    { id: "DEAL-0732", property: "Powai Lakeview 2BHK", value: 11000000, currency: "INR", createdAt: "Oct 12, 2025", client: { name: "Sakshi Jain", avatarId: "avatar-priya" }, contacts: ["phone"], source: "Website", agents: [{ id: "deepa", name: "Deepa Nair", avatarId: "avatar-sunita" }], priority: "Cold", ageDays: 50, stage: "proposal-sent", aiScore: 45 },
    { id: "DEAL-0733", property: "Thane Commercial Space", value: 13500000, currency: "INR", createdAt: "Oct 08, 2025", client: { name: "Abhishek Rao", avatarId: "avatar-2" }, contacts: ["email", "sms"], source: "Event", agents: [{ id: "vikram", name: "Vikram Rao", avatarId: "avatar-1" }], priority: "Warm", ageDays: 54, stage: "qualified", aiScore: 58 },
    { id: "DEAL-0734", property: "Noida IT Park Unit", value: 22000000, currency: "INR", createdAt: "Oct 03, 2025", client: { name: "Divya Kapoor", avatarId: "avatar-3" }, contacts: ["email"], source: "Referral", agents: [{ id: "priya", name: "Priya Sharma", avatarId: "avatar-priya" }], priority: "Hot", ageDays: 59, stage: "negotiation", aiScore: 69 },
    { id: "DEAL-0735", property: "Pune Hinjewadi Office", value: 16000000, currency: "INR", createdAt: "Sep 28, 2025", client: { name: "Varun Mehta", avatarId: "avatar-amit" }, contacts: ["phone"], source: "99acres", agents: [{ id: "amit", name: "Amit Patel", avatarId: "avatar-amit" }], priority: "Warm", ageDays: 64, stage: "closed-won", aiScore: 88, status: "won" },
  ]);

  const metrics = useMemo(() => {
    const totalValue = deals.filter(d => d.stage !== "closed-lost").reduce((sum, d) => sum + d.value, 0);
    const active = deals.filter(d => d.stage !== "closed-won" && d.stage !== "closed-lost").length;
    const conversion = Math.round(((deals.filter(d => d.stage === "closed-won").length) / deals.length) * 1000) / 10;
    const avgCycle = Math.round(deals.reduce((sum, d) => sum + d.ageDays, 0) / deals.length);
    return { totalValue, active, conversion, avgCycle };
  }, [deals]);

  function handleStageChange(id: string, stage: DealStage) {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage, status: stage === "closed-won" ? "won" : stage === "closed-lost" ? "lost" : d.status } : d));
  }

  function openDeal(d: Deal) {
    setSelectedDeal(d);
    setDetailsOpen(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deals Pipeline</h1>
          <div className="text-sm text-muted-foreground">Manage pipeline, analyze performance, and schedule key steps</div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary text-primary-foreground" onClick={() => setAddOpen(true)}><PlusCircle className="mr-2" />Add Deal</Button>
          <Button variant="outline" onClick={() => setFilterOpen(true)}><Filter className="mr-2" />Filters</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search deals" className="pl-8 bg-card" value={filters.search || ""} onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))} />
        </div>
        <Select value={filters.stage || "all"} onValueChange={(v) => setFilters(f => ({ ...f, stage: v as any }))}>
          <SelectTrigger className="w-40 bg-card"><SelectValue placeholder="Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="site-visit">Site Visit</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
            <SelectItem value="closed-won">Closed Won</SelectItem>
            <SelectItem value="closed-lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.source ?? "all"} onValueChange={(v) => setFilters(f => ({ ...f, source: v === "all" ? undefined : v }))}>
          <SelectTrigger className="w-40 bg-card"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="99acres">99acres</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.agentId ?? "all"} onValueChange={(v) => setFilters(f => ({ ...f, agentId: v === "all" ? undefined : v }))}>
          <SelectTrigger className="w-48 bg-card"><SelectValue placeholder="Assigned Agent" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="priya">Priya Sharma</SelectItem>
            <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
            <SelectItem value="amit">Amit Patel</SelectItem>
            <SelectItem value="deepa">Deepa Nair</SelectItem>
            <SelectItem value="vikram">Vikram Rao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="flex items-center gap-2"><IndianRupee className="text-primary" /><div className="text-sm">Total Pipeline</div></div><div className="font-bold text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(metrics.totalValue)}</div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="flex items-center gap-2"><Handshake className="text-primary" /><div className="text-sm">Active Deals</div></div><div className="font-bold text-foreground">{metrics.active}</div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="flex items-center gap-2"><LineChart className="text-primary" /><div className="text-sm">Conversion Rate</div></div><div className="font-bold text-foreground">{metrics.conversion}%</div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center justify-between"><div className="flex items-center gap-2"><Clock className="text-primary" /><div className="text-sm">Avg. Cycle Time</div></div><div className="font-bold text-foreground">{metrics.avgCycle} Days</div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card">
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-4">
          <div className="w-[80%]">
            <DealKanban
              deals={deals}
              onDealClick={openDeal}
              onStageChange={handleStageChange}
              filters={filters}
            />
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1"><CardContent className="p-4"><Calendar className="rounded-md border" /></CardContent></Card>
            <Card className="lg:col-span-2"><CardContent className="p-4 space-y-3">
              {deals.slice(0,8).map(d => (
                <div key={d.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer" onClick={() => openDeal(d)}>
                  <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-muted-foreground" /><div className="text-sm text-foreground">{d.property}</div><Badge variant="outline" className="text-xs">{d.expectedCloseDate || d.createdAt}</Badge></div>
                  <div className="text-sm text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(d.value)}</div>
                </div>
              ))}
            </CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Agents</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map(d => (
                  <TableRow key={d.id} className="cursor-pointer" onClick={() => openDeal(d)}>
                    <TableCell>{d.id}</TableCell>
                    <TableCell>{d.property}</TableCell>
                    <TableCell>{d.client.name}</TableCell>
                    <TableCell>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(d.value)}</TableCell>
                    <TableCell>{d.agents.map(a => a.name).join(", ")}</TableCell>
                    <TableCell>{d.stage}</TableCell>
                    <TableCell>{d.status || ""}</TableCell>
                    <TableCell>{d.ageDays} days</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card><CardContent className="p-4 space-y-2"><div className="font-semibold">Stage Distribution</div><div className="text-sm text-muted-foreground">New: {deals.filter(d => d.stage==='new').length} · Qualified: {deals.filter(d => d.stage==='qualified').length} · Site Visit: {deals.filter(d => d.stage==='site-visit').length}</div></CardContent></Card>
            <Card><CardContent className="p-4 space-y-2"><div className="font-semibold">Top Sources</div><div className="text-sm text-muted-foreground">{Array.from(new Set(deals.map(d => d.source))).join(", ")}</div></CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent side="right" className="sm:max-w-[40vw] md:max-w-[40vw]">
          <SheetHeader><SheetTitle>Deal Details</SheetTitle></SheetHeader>
          {selectedDeal && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-foreground">{selectedDeal.property}</div>
                  <div className="text-sm text-muted-foreground">{selectedDeal.id} · {selectedDeal.stage}</div>
                </div>
                <div className="text-primary font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(selectedDeal.value)}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Client</div><div className="text-sm text-foreground">{selectedDeal.client.name}</div></CardContent></Card>
                <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Source</div><div className="text-sm text-foreground">{selectedDeal.source}</div></CardContent></Card>
                <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">AI Score</div><div className="text-sm text-foreground">{selectedDeal.aiScore}</div></CardContent></Card>
                <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Age</div><div className="text-sm text-foreground">{selectedDeal.ageDays} days</div></CardContent></Card>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Timeline</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Created {selectedDeal.createdAt}</div>
                  <div>Stage {selectedDeal.stage}</div>
                  <div>Next step {selectedDeal.expectedCloseDate || "TBD"}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">Mark as Won</Button>
                <Button variant="destructive">Mark as Lost</Button>
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Duplicate</Button>
                <Button variant="outline">Export PDF</Button>
                <Button variant="outline">Add Reminder</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Deal</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Property" id="property" />
            <Input placeholder="Client" id="client" />
            <Input placeholder="Value (₹)" id="value" type="number" />
            <Select defaultValue="new"><SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger><SelectContent><SelectItem value="new">New</SelectItem><SelectItem value="qualified">Qualified</SelectItem><SelectItem value="site-visit">Site Visit</SelectItem><SelectItem value="negotiation">Negotiation</SelectItem><SelectItem value="proposal-sent">Proposal Sent</SelectItem></SelectContent></Select>
          </div>
          <DialogFooter>
            <Button onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { toast({ title: "Deal added" }); setAddOpen(false); }}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Filters</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Select value={filters.stage || "all"} onValueChange={(v) => setFilters(f => ({ ...f, stage: v as any }))}><SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="new">New</SelectItem><SelectItem value="qualified">Qualified</SelectItem><SelectItem value="site-visit">Site Visit</SelectItem><SelectItem value="negotiation">Negotiation</SelectItem><SelectItem value="proposal-sent">Proposal Sent</SelectItem><SelectItem value="closed-won">Closed Won</SelectItem><SelectItem value="closed-lost">Closed Lost</SelectItem></SelectContent></Select>
            <Select value={filters.source ?? "all"} onValueChange={(v) => setFilters(f => ({ ...f, source: v === "all" ? undefined : v }))}><SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Website">Website</SelectItem><SelectItem value="Referral">Referral</SelectItem><SelectItem value="99acres">99acres</SelectItem><SelectItem value="Event">Event</SelectItem></SelectContent></Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilters({ stage: "all" })}>Reset</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => setFilterOpen(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
