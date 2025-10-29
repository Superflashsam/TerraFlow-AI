import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MainHeader } from "@/components/layout/main-header";
import { cn } from "@/lib/utils";
import { ChatAssistant } from "@/components/chat/chat-assistant";
import { NewSidebar } from "@/components/layout/new-sidebar";

export const metadata: Metadata = {
  title: "Terraflow AI",
  description: "AI-Powered Real Estate CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-body antialiased bg-app-background")}>
        <div className="flex h-screen w-full overflow-hidden">
          <NewSidebar />
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <MainHeader />
            <main className="flex-1 p-6">
              {children}
            </main>
            <ChatAssistant />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
