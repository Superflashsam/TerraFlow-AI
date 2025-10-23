import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { automationWorkflows } from "@/lib/placeholder-data";

function WorkflowCard({ workflow }: { workflow: any }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                    </div>
                    <workflow.icon className="h-8 w-8 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <Button variant={workflow.status === 'Active' ? 'default' : 'secondary'} size="sm">
                    {workflow.status}
                </Button>
            </CardContent>
        </Card>
    )
}

export default function AutomationPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Automation Workflows"
        description="Build and manage automated workflows to streamline your process."
      >
        <Button>
            <PlusCircle />
            Create Workflow
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {automationWorkflows.map(flow => <WorkflowCard key={flow.id} workflow={flow} />)}
      </div>
    </div>
  );
}
