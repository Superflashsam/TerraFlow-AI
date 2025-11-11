"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, FileText } from "lucide-react"

const reports = [
  { title: "Weekly Pipeline Report", lastRun: "Yesterday", format: "PDF" },
  { title: "Monthly Agent Performance", lastRun: "Nov 1", format: "CSV" },
  { title: "Source ROI Analysis", lastRun: "3 days ago", format: "Excel" },
]

export function CustomReports() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Custom Reports</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <Card key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{report.title}</p>
                        <p className="text-sm text-muted-foreground">Last run: {report.lastRun}</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {report.format}
                </Button>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
