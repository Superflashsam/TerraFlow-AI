import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { SidebarNav, BottomNav } from "./sidebar-nav";
import { Separator } from "@/components/ui/separator";

export function MainSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">Terraflow AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-1" />
        <BottomNav/>
      </SidebarFooter>
    </Sidebar>
  );
}
