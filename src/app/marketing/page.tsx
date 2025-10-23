import { PageHeader } from "@/components/shared/page-header";
import { ContentGenerator } from "@/components/marketing/content-generator";

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Marketing Automation"
        description="Generate content, manage campaigns, and plan social media posts."
      />
      <ContentGenerator />
    </div>
  );
}
