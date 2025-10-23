import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { PlusCircle, Upload } from "lucide-react";
import { LeadsTable } from "@/components/leads/leads-table";

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Leads"
        description="Manage and track your potential customers."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload />
            Import Leads
          </Button>
          <Button>
            <PlusCircle />
            Add Lead
          </Button>
        </div>
      </PageHeader>
      <LeadsTable />
    </div>
  );
}
