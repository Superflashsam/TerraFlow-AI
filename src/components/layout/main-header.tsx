import { Search, Bell, User, CheckSquare } from "lucide-react";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getImagePlaceholder } from "@/lib/placeholder-images";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-8">
      <SidebarTrigger className="md:hidden" />
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={getImagePlaceholder("avatar-1")?.imageUrl} />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">New lead assigned</p>
                <p className="text-xs text-muted-foreground">John Doe is interested in Downtown Lofts.</p>
              </div>
            </div>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                 <AvatarImage src={getImagePlaceholder("avatar-2")?.imageUrl} />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Site visit confirmed</p>
                <p className="text-xs text-muted-foreground">Sara Miller confirmed for tomorrow at 2 PM.</p>
              </div>
            </div>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Task Due Today</p>
                <p className="text-xs text-muted-foreground">Follow up with the client from last week.</p>
              </div>
            </div>
          </DropdownMenuItem>
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
