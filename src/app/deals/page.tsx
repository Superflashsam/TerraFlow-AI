"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { PlusCircle, LayoutGrid, List } from "lucide-react";
import { DealKanban } from "@/components/deals/deal-kanban";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export default function DealsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Deals Pipeline"
        description="Visualize and manage your sales pipeline."
      >
        <div className="flex items-center gap-2">
           <ToggleGroup type="single" defaultValue="kanban" variant="outline">
            <ToggleGroupItem value="kanban" aria-label="Kanban view">
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button>
            <PlusCircle />
            Add Deal
          </Button>
        </div>
      </PageHeader>
      <DealKanban />
    </div>
  );
}
