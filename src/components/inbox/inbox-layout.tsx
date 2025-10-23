"use client";

import { conversations, selectedConversation } from "@/lib/placeholder-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Paperclip,
  Send,
  MoreVertical,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getImagePlaceholder } from "@/lib/placeholder-images";

function ConversationItem({ conv, active }: { conv: any, active: boolean }) {
  return (
    <div className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer ${active ? 'bg-accent' : 'hover:bg-accent/50'}`}>
      <Avatar>
        <AvatarImage src={`https://picsum.photos/seed/${conv.name}/40/40`} data-ai-hint="person portrait" />
        <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{conv.name}</h3>
          <span className="text-xs text-muted-foreground">{conv.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
      </div>
      {conv.unread > 0 && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {conv.unread}
        </div>
      )}
    </div>
  );
}

export function InboxLayout() {
  return (
    <div className="border rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full overflow-hidden">
      <div className="flex flex-col border-r md:col-span-1 lg:col-span-1">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations" className="pl-8" />
          </div>
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="whatsapp"><MessageSquare/></TabsTrigger>
              <TabsTrigger value="email"><Mail/></TabsTrigger>
              <TabsTrigger value="sms"><Phone/></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <ConversationItem key={conv.id} conv={conv} active={conv.id === 1} />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:col-span-2 lg:col-span-3 h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://picsum.photos/seed/${selectedConversation.name}/40/40`} data-ai-hint="person portrait" />
              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">{selectedConversation.name}</h2>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {selectedConversation.messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.from === 'Agent' ? 'justify-end' : ''}`}>
              {msg.from !== 'Agent' && <Avatar className="h-8 w-8"><AvatarImage src={`https://picsum.photos/seed/${selectedConversation.name}/40/40`} data-ai-hint="person portrait" /><AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback></Avatar>}
              <div className={`rounded-lg p-3 max-w-md ${msg.from === 'Agent' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === 'Agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
              </div>
              {msg.from === 'Agent' && <Avatar className="h-8 w-8"><AvatarImage src={getImagePlaceholder("user-avatar")?.imageUrl} /><AvatarFallback>A</AvatarFallback></Avatar>}
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-background">
          <div className="relative">
            <Textarea placeholder="Type your message..." className="pr-24" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon">
                <Paperclip />
              </Button>
              <Button size="icon">
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
