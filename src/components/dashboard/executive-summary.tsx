"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';

const summaryStaticData = {
  keyAchievements: [
    "Q3 revenue targets exceeded by 12%",
    "Market share increased to 22.1%",
    "Lead conversion improved by 2.3%",
  ],
  focusAreas: [
    "Pune market recovery strategy",
    "Luxury segment expansion",
    "Digital transformation initiatives",
  ],
  nextActions: [
    "Q4 strategic planning session",
    "Competitive analysis review",
    "Technology roadmap update",
  ],
};

function SummarySection({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}

export function ExecutiveSummary() {
  const [generatedDate, setGeneratedDate] = useState<Date | null>(null);

  useEffect(() => {
    setGeneratedDate(new Date());
  }, []);

  return (
    <Card>
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-bold text-foreground">Executive Summary</h2>
                <p className="text-sm text-muted-foreground">
                    {generatedDate ? `Generated on ${format(generatedDate, "dd MMMM yyyy")}` : 'Loading date...'}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummarySection title="Key Achievements" items={summaryStaticData.keyAchievements} />
                <SummarySection title="Focus Areas" items={summaryStaticData.focusAreas} />
                <SummarySection title="Next Actions" items={summaryStaticData.nextActions} />
            </div>
        </CardContent>
    </Card>
  );
}
