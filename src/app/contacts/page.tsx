import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Contacts"
        description="Manage all your buyers, sellers, and relationships."
      >
        <Button>
            <PlusCircle />
            Add Contact
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
            <CardTitle>Contacts List</CardTitle>
            <CardDescription>Coming Soon: A full-featured CRM to manage your contacts.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will contain a table of all your contacts with advanced filtering and segmentation options.</p>
        </CardContent>
      </Card>
    </div>
  );
}
