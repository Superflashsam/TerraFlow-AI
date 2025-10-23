'use client'

import { useState, useEffect } from 'react'
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
  Bot
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../icons/logo'

interface NavItem {
  icon: any
  label: string
  href: string
  badge?: string
}

const navigationItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Leads', href: '/leads' },
  { icon: Briefcase, label: 'Deals', href: '/deals' },
  { icon: Contact, label: 'Contacts', href: '/contacts' },
  { icon: Mails, label: 'Inbox', href: '/inbox', badge: '3' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Building2, label: 'Properties', href: '/properties' },
]

const secondaryItems: NavItem[] = [
  { icon: Megaphone, label: 'Marketing', href: '/marketing' },
  { icon: Bot, label: 'Automation', href: '/automation' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: AreaChart, label: 'Analytics', href: '/analytics' },
]

export function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

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
    <div className="relative">
      <aside 
        className={`
          fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border flex-shrink-0">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold text-sidebar-foreground">Terraflow AI</span>
            </Link>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Primary Navigation */}
          <div className="px-3 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-sidebar-primary/10 text-sidebar-primary font-semibold' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto px-2 py-0.5 bg-sidebar-primary text-sidebar-primary-foreground text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  
                  {isCollapsed && (
                    <div className="
                      absolute left-full ml-4 px-3 py-2 bg-popover text-popover-foreground text-sm
                      rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100
                      whitespace-nowrap z-50 transition-opacity delay-300
                    ">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="my-4 mx-3 border-t border-sidebar-border" />

          <div className="px-3 space-y-1">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-sidebar-primary/10 text-sidebar-primary font-semibold' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  
                  {isCollapsed && (
                    <div className="
                      absolute left-full ml-4 px-3 py-2 bg-popover text-popover-foreground text-sm
                      rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100
                      whitespace-nowrap z-50 transition-opacity delay-300
                    ">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Settings (Bottom) */}
        <div className="border-t border-sidebar-border p-3 flex-shrink-0">
          <Link
            href="/settings"
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-200 group relative
              ${pathname.startsWith('/settings') 
                ? 'bg-sidebar-primary/10 text-sidebar-primary font-semibold' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }
            `}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            
            {!isCollapsed && (
              <span className="font-medium">Settings</span>
            )}
            
            {isCollapsed && (
              <div className="
                absolute left-full ml-4 px-3 py-2 bg-popover text-popover-foreground text-sm
                rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100
                whitespace-nowrap z-50 transition-opacity delay-300
              ">
                Settings
              </div>
            )}
          </Link>
        </div>
      </aside>
       <div
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'pl-20' : 'pl-64'}
        `}
      >
      </div>
    </div>
  )
}
