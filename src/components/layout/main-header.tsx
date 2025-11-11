import { Search, Bell, CheckSquare, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { initialTasks } from "@/lib/placeholder-data";

export function MainHeader() {
  const overdueTasks = initialTasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'done');

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-8">
      {/* This can be a trigger for mobile sidebar if needed */}
      {/* <Button variant="ghost" size="icon" className="lg:hidden"><Menu /></Button> */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads, properties..."
            className="w-full rounded-lg bg-muted pl-8 shadow-none md:w-[280px] lg:w-[320px]"
          />
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg cursor-pointer">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium hidden sm:block">All Systems Operational</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>All systems are running smoothly.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            {overdueTasks.length > 0 && <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>}
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
           {overdueTasks.length > 0 ? overdueTasks.slice(0, 3).map(task => (
            <DropdownMenuItem key={task.id} asChild>
              <Link href="/tasks">
                <div className="flex items-start gap-3">
                    <div className="h-9 w-9 flex items-center justify-center">
                        <CheckSquare className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                        <p className="font-medium">Overdue Task</p>
                        <p className="text-xs text-muted-foreground truncate">{task.title}</p>
                    </div>
                </div>
              </Link>
            </DropdownMenuItem>
          )) : (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={getImagePlaceholder("user-avatar")?.imageUrl} alt="User avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/settings">Profile</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
