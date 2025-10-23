import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { MainHeader } from "@/components/layout/main-header";
import { cn } from "@/lib/utils";
import { ChatAssistant } from "@/components/chat/chat-assistant";

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
    <html lang="en" className="dark">
      <body className={cn("font-body antialiased")}>
        <SidebarProvider>
          <MainSidebar />
          <SidebarInset>
            <MainHeader />
            <main className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
              {children}
            </main>
            <ChatAssistant />
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
