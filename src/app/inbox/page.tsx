import { PageHeader } from "@/components/shared/page-header";
import { InboxLayout } from "@/components/inbox/inbox-layout";

export default function InboxPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <PageHeader
                title="Unified Inbox"
                description="All your conversations in one place."
                className="flex-shrink-0 mb-4"
            />
            <InboxLayout />
        </div>
    );
}
