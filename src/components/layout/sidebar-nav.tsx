"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Mails,
  CheckSquare,
  Building2,
  Megaphone,
  Bot,
  FileText,
  AreaChart,
  Settings,
  Contact,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/deals", label: "Deals", icon: Briefcase },
  { href: "/contacts", label: "Contacts", icon: Contact },
  { href: "/inbox", label: "Inbox", icon: Mails },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/properties", label: "Properties", icon: Building2 },
];

const secondaryNavItems = [
    { href: "/marketing", label: "Marketing", icon: Megaphone },
    { href: "/automation", label: "Automation", icon: Bot },
    { href: "/documents", label: "Documents", icon: FileText },
    { href: "/analytics", label: "Analytics", icon: AreaChart },
]

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
          <SidebarMenu>
            {secondaryNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

export function BottomNav() {
    const pathname = usePathname();

    const isActive = (href: string) => {
      return pathname.startsWith(href);
    };
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip={{children: "Settings"}}>
                        <Link href="/settings">
                            <Settings/>
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
