import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Tasks &amp; Calendar"
        description="Organize your work and manage your schedule."
      >
        <Button>
            <PlusCircle />
            Create Task
        </Button>
      </PageHeader>
       <Card>
        <CardHeader>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Coming Soon: A complete task list and calendar view.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will allow you to manage tasks, set reminders, and view your schedule on a calendar integrated with Google and Outlook.</p>
        </CardContent>
      </Card>
    </div>
  );
}
