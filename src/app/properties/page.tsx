import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Properties"
        description="Manage your property listings."
      >
        <Button>
            <PlusCircle />
            Add Listing
        </Button>
      </PageHeader>
       <Card>
        <CardHeader>
            <CardTitle>Property Listings</CardTitle>
            <CardDescription>Coming Soon: Grid, list, and map views of your properties.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will display all your property listings, with features for editing, bulk import, and linking to deals.</p>
        </CardContent>
      </Card>
    </div>
  );
}
