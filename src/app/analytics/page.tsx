import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { analyticsReports } from "@/lib/placeholder-data";

function ReportCard({ report }: { report: any }) {
    return (
        <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="flex-row items-start gap-4">
                 <report.icon className="h-8 w-8 text-muted-foreground" />
                <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Analytics &amp; Reports"
        description="Gain deep insights into your business performance."
      >
        <Button>
            <FileDown />
            Export All
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {analyticsReports.map(report => <ReportCard key={report.id} report={report} />)}
      </div>
    </div>
  );
}
