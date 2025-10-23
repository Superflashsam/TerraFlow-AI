"use client";
import { dealsData } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getImagePlaceholder } from "@/lib/placeholder-images";

const stages = [
  { id: "new", title: "New" },
  { id: "qualified", title: "Qualified" },
  { id: "site-visit", title: "Site Visit" },
  { id: "negotiation", title: "Negotiation" },
  { id: "closed-won", title: "Closed-Won" },
  { id: "closed-lost", title: "Closed-Lost" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}


function DealCard({ deal }: { deal: { id: string; title: string; value: number; agent: string } }) {
  const agentAvatarId = deal.agent.toLowerCase().replace(' ', '-').substring(0, deal.agent.indexOf(' ') > -1 ? deal.agent.indexOf(' ') : 1);
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold">{deal.title}</h4>
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-primary font-bold text-lg mb-3">{formatCurrency(deal.value)}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{deal.id}</span>
          <Avatar className="h-6 w-6">
            <AvatarImage src={getImagePlaceholder(`avatar-${agentAvatarId}`)?.imageUrl} alt={deal.agent} />
            <AvatarFallback>{deal.agent.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({ stage }: { stage: { id: keyof typeof dealsData; title: string } }) {
    const deals = dealsData[stage.id] || [];
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="flex flex-col w-80 shrink-0">
        <div className="flex justify-between items-center p-2 mb-2">
            <h3 className="font-semibold text-lg">{stage.title} <span className="text-muted-foreground text-sm font-normal">({deals.length})</span></h3>
            <span className="font-semibold text-muted-foreground">{formatCurrency(totalValue)}</span>
        </div>
      <div className="bg-muted/50 rounded-lg p-2 h-full">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
         <Button variant="ghost" className="w-full justify-start mt-2">
            <PlusCircle className="mr-2" /> Add Deal
        </Button>
      </div>
    </div>
  );
}

export function DealKanban() {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-6 pb-4">
        {stages.map((stage) => (
          <KanbanColumn key={stage.id} stage={stage as { id: keyof typeof dealsData; title: string }} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
