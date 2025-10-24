"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Mails,
  CheckSquare,
  Building2,
  Megaphone,
  FileText,
  AreaChart,
  ChevronLeft,
  ChevronRight,
  Settings,
  Contact,
  Bot,
  Search,
  User as UserIcon,
} from 'lucide-react';
import { Logo } from '../icons/logo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

// Softer spring animation curve
const softSpringEasing = "cubic-bezier(0.25, 1.1, 0.4, 1)";

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: string
}

const navigationItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Leads', href: '/leads' },
  { icon: Building2, label: 'Properties', href: '/properties' },
  { icon: Briefcase, label: 'Deals', href: '/deals' },
  { icon: Contact, label: 'Contacts', href: '/contacts' },
  { icon: Mails, label: 'Inbox', href: '/inbox', badge: '3' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
]

const secondaryItems: NavItem[] = [
  { icon: Megaphone, label: 'Marketing', href: '/marketing' },
  { icon: Bot, label: 'Automation', href: '/automation' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: AreaChart, label: 'Analytics', href: '/analytics' },
]

function SearchContainer({ isCollapsed }: { isCollapsed?: boolean }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`bg-black h-10 relative rounded-lg flex items-center transition-all duration-500 ${
          isCollapsed ? "w-10 min-w-10 justify-center" : "w-full"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div
          className={`flex items-center justify-center shrink-0 transition-all duration-500 ${
            isCollapsed ? "p-1" : "px-1"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="size-8 flex items-center justify-center">
            <Search size={16} className="text-neutral-50" />
          </div>
        </div>

        <div
          className={`flex-1 relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex flex-col justify-center size-full">
            <div className="flex flex-col gap-2 items-start justify-center pr-2 py-1 w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[14px] text-neutral-50 placeholder:text-neutral-400 leading-[20px]"
                tabIndex={isCollapsed ? -1 : 0}
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-lg border border-neutral-800 pointer-events-none"
        />
      </div>
    </div>
  );
}


function MenuItem({
  item,
  isCollapsed,
  isActive,
}: {
  item: NavItem;
  isCollapsed?: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 group ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <Link
        href={item.href}
        className={cn(
          "rounded-lg cursor-pointer transition-all duration-500 flex items-center relative",
          isActive ? "bg-neutral-800" : "hover:bg-neutral-800",
          isCollapsed ? "w-10 min-w-10 h-10 justify-center" : "w-full h-10 px-4 py-2"
        )}
        style={{ transitionTimingFunction: softSpringEasing }}
        title={isCollapsed ? item.label : undefined}
      >
        <div className={cn("flex items-center justify-center shrink-0", isActive ? 'text-neutral-50' : 'text-neutral-400 group-hover:text-neutral-300' )}>
          <Icon size={16} />
        </div>

        <div
          className={`flex-1 relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="text-[14px] text-neutral-50 leading-[20px] truncate">
            {item.label}
          </div>
        </div>
      </Link>
    </div>
  );
}


export function NewSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => setIsCollapsed((s) => !s);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setIsCollapsed(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <aside
      className={`bg-sidebar-background flex flex-col gap-4 items-start p-4 transition-all duration-500 h-screen ${
        isCollapsed ? "w-[88px]" : "w-72"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      {/* Header */}
       <div className={`w-full overflow-hidden transition-all duration-500 ${isCollapsed ? 'h-10' : 'h-10'}`} style={{ transitionTimingFunction: softSpringEasing }}>
          <div className="flex items-center justify-between">
              {!isCollapsed && (
                 <Link href="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-semibold text-sidebar-foreground">Terraflow AI</span>
                </Link>
              )}
              <div className={cn(isCollapsed && "w-full", "flex items-center", isCollapsed ? "justify-center" : "justify-end", "pr-1")}>
                  <button
                      type="button"
                      onClick={toggleCollapse}
                      className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
                      style={{ transitionTimingFunction: softSpringEasing }}
                      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  >
                      {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  </button>
              </div>
          </div>
      </div>
      <SearchContainer isCollapsed={isCollapsed} />

      {/* Main Nav */}
      <div className={`flex flex-col w-full overflow-y-auto transition-all duration-500 ${isCollapsed ? 'gap-2 items-center' : 'gap-4 items-start'}`} style={{ transitionTimingFunction: softSpringEasing }}>
          <div className="flex flex-col w-full">
                <div
                    className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
                    isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
                    }`}
                    style={{ transitionTimingFunction: softSpringEasing }}
                >
                    <div className="flex items-center h-10 px-4">
                    <div className="text-[14px] text-neutral-400">
                        Menu
                    </div>
                    </div>
                </div>
                {navigationItems.map((item) => (
                    <MenuItem key={item.href} item={item} isCollapsed={isCollapsed} isActive={pathname === item.href} />
                ))}
          </div>

          <div className="flex flex-col w-full">
                 <div
                    className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
                    isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
                    }`}
                    style={{ transitionTimingFunction: softSpringEasing }}
                >
                    <div className="flex items-center h-10 px-4">
                    <div className="text-[14px] text-neutral-400">
                        Tools
                    </div>
                    </div>
                </div>
               {secondaryItems.map((item) => (
                    <MenuItem key={item.href} item={item} isCollapsed={isCollapsed} isActive={pathname === item.href} />
                ))}
          </div>
      </div>
      
       {/* Settings Link */}
        <div className="w-full mt-auto">
             <MenuItem item={{label: 'Settings', href: '/settings', icon: Settings}} isCollapsed={isCollapsed} isActive={pathname.startsWith('/settings')} />
        </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="w-full mt-auto pt-2 border-t border-neutral-800">
          <div className="flex items-center gap-2 px-2 py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={getImagePlaceholder("user-avatar")?.imageUrl} alt="User avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="text-[14px] text-neutral-50">Sarah Johnson</div>
          </div>
        </div>
      )}
    </aside>
  );
}
