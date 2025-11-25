"use client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, useDroppable, useDraggable } from "@dnd-kit/core";
import { MoreVertical, Phone, Mail, MessageSquare, Calendar as CalendarIcon, IndianRupee, PlusCircle } from "lucide-react";

export type DealStage = "new" | "qualified" | "site-visit" | "negotiation" | "proposal-sent" | "closed-won" | "closed-lost";
export type ContactChannel = "phone" | "whatsapp" | "sms" | "email";

export type Agent = { id: string; name: string; avatarId: string; email?: string; phone?: string };
export type Deal = {
  id: string;
  property: string;
  value: number;
  currency: "INR";
  createdAt: string;
  client: { name: string; avatarId: string };
  contacts: ContactChannel[];
  source: string;
  agents: Agent[];
  priority: "Hot" | "Warm" | "Cold";
  ageDays: number;
  stage: DealStage;
  aiScore: number;
  expectedCloseDate?: string;
  status?: "won" | "lost";
};

function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

function ProgressRing({ score }: { score: number }) {
  const deg = Math.round((score / 100) * 360);
  return (
    <div className="relative w-7 h-7">
      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#22c55e ${deg}deg, #374151 ${deg}deg)` }} />
      <div className="absolute inset-[3px] bg-card rounded-full flex items-center justify-center text-[10px] text-foreground">{score}</div>
    </div>
  );
}

function ContactBadges({ channels }: { channels: ContactChannel[] }) {
  return (
    <div className="flex items-center gap-1">
      {channels.includes("phone") && <Phone className="h-3 w-3 text-muted-foreground" />}
      {channels.includes("whatsapp") && <MessageSquare className="h-3 w-3 text-green-500" />}
      {channels.includes("sms") && <MessageSquare className="h-3 w-3 text-orange-500" />}
      {channels.includes("email") && <Mail className="h-3 w-3 text-primary" />}
    </div>
  );
}

function DealCard({ deal, onClick }: { deal: Deal; onClick: (deal: Deal) => void }) {
  const clientAvatar = getImagePlaceholder(deal.client.avatarId)?.imageUrl;
  return (
    <Card className={cn("mb-3 hover:bg-muted transition-colors", deal.status === "won" ? "ring-1 ring-green-500/50" : deal.status === "lost" ? "ring-1 ring-red-500/50" : "")}>
      <CardContent className="p-3 space-y-3 cursor-pointer" onClick={() => onClick(deal)} aria-label={`Open deal ${deal.id}`} role="button" tabIndex={0}>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-sm text-foreground">{deal.property}</div>
            <div className="text-xs text-muted-foreground">{deal.id} · {deal.createdAt}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Deal</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold">
            <IndianRupee className="h-4 w-4" />
            <div className="text-base">{formatINR(deal.value)}</div>
          </div>
          <ProgressRing score={deal.aiScore} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6"><AvatarImage src={clientAvatar} /><AvatarFallback>{deal.client.name.charAt(0)}</AvatarFallback></Avatar>
            <div className="text-xs text-foreground">{deal.client.name}</div>
            <ContactBadges channels={deal.contacts} />
          </div>
          <Badge variant="outline" className={cn("text-xs", deal.priority === "Hot" ? "text-red-500" : deal.priority === "Warm" ? "text-yellow-500" : "text-blue-500")}>{deal.priority}</Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-[10px]">{deal.source}</Badge>
          <div className="flex items-center gap-2">
            {deal.agents.slice(0,2).map(a => (
              <Avatar key={a.id} className="h-6 w-6"><AvatarImage src={getImagePlaceholder(a.avatarId)?.imageUrl} /><AvatarFallback>{a.name.charAt(0)}</AvatarFallback></Avatar>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" />{deal.ageDays} days</div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 px-2">Call</Button>
            <Button variant="outline" size="sm" className="h-7 px-2">Email</Button>
            <Button variant="outline" size="sm" className="h-7 px-2">Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const stageDefs: { id: DealStage; title: string }[] = [
  { id: "new", title: "New" },
  { id: "qualified", title: "Qualified" },
  { id: "site-visit", title: "Site Visit" },
  { id: "negotiation", title: "Negotiation" },
  { id: "proposal-sent", title: "Proposal Sent" },
  { id: "closed-won", title: "Closed Won" },
  { id: "closed-lost", title: "Closed Lost" },
];

export function DealKanban({ deals, onDealClick, onStageChange, filters }: { deals: Deal[]; onDealClick: (deal: Deal) => void; onStageChange: (id: string, stage: DealStage) => void; filters?: { search?: string; stage?: DealStage | "all"; agentId?: string; minValue?: number; maxValue?: number; source?: string } }) {
  const { toast } = useToast();
  const sensors = useSensors(useSensor(PointerSensor));
  const filtered = useMemo(() => {
    return deals.filter(d => {
      if (filters?.stage && filters.stage !== "all" && d.stage !== filters.stage) return false;
      if (filters?.agentId && !d.agents.find(a => a.id === filters.agentId)) return false;
      if (filters?.minValue && d.value < filters.minValue) return false;
      if (filters?.maxValue && d.value > filters?.maxValue) return false;
      if (filters?.source && d.source !== filters.source) return false;
      if (filters?.search && !(`${d.property} ${d.client.name} ${d.id}`.toLowerCase().includes(filters.search.toLowerCase()))) return false;
      return true;
    });
  }, [deals, filters]);

  const byStage = useMemo(() => {
    const m: Record<DealStage, Deal[]> = { "new": [], "qualified": [], "site-visit": [], "negotiation": [], "proposal-sent": [], "closed-won": [], "closed-lost": [] };
    filtered.forEach(d => { m[d.stage].push(d); });
    return m;
  }, [filtered]);

  function handleDragEnd(e: DragEndEvent) {
    const overId = e.over?.id as DealStage | undefined;
    const dealId = e.active.id as string;
    if (overId) {
      onStageChange(dealId, overId);
      toast({ title: "Deal updated", description: `${dealId} moved to ${stageDefs.find(s => s.id === overId)?.title}` });
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-6 pb-4">
          {stageDefs.map(stage => {
            const items = byStage[stage.id];
            const total = items.reduce((sum, d) => sum + d.value, 0);
            return (
              <div key={stage.id} id={stage.id} className="flex flex-col w-80 shrink-0" aria-label={`${stage.title} column`} role="list">
                <div className="flex justify-between items-center p-2 mb-2">
                  <h3 className="font-semibold text-lg">{stage.title} <span className="text-muted-foreground text-sm font-normal">({items.length})</span></h3>
                  <span className="font-semibold text-muted-foreground">{formatINR(total)}</span>
                </div>
                <DroppableArea id={stage.id}>
                  {items.map(d => (
                    <DraggableItem key={d.id} id={d.id}>
                      <DealCard deal={d} onClick={onDealClick} />
                    </DraggableItem>
                  ))}
                  <Button variant="ghost" className="w-full justify-start mt-2"><PlusCircle className="mr-2" /> Add Deal</Button>
                </DroppableArea>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
}

function DroppableArea({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className="bg-card rounded-lg p-2 min-h-[200px]" role="listitem">{children}</div>;
}

function DraggableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return <div ref={setNodeRef} {...attributes} {...listeners}>{children}</div>;
}
