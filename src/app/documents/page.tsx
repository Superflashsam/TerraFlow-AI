import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Documents &amp; Compliance"
        description="Manage contracts, agreements, and RERA compliance."
      >
        <Button>
            <PlusCircle />
            Upload Document
        </Button>
      </PageHeader>
       <Card>
        <CardHeader>
            <CardTitle>Document Center</CardTitle>
            <CardDescription>Coming Soon: A secure hub for all your important files.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This section will be your central repository for all documents, with e-signature integration and compliance tracking.</p>
        </CardContent>
      </Card>
    </div>
  );
}
