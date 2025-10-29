
"use client";

import { useState } from "react";
import {
  Inbox,
  Send,
  Archive,
  Trash2,
  Filter,
  Search,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Bot,
  Video
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { conversations as originalConversations, selectedConversation } from "@/lib/placeholder-data";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const conversations = originalConversations.map(c => ({
    ...c,
    avatar: getImagePlaceholder(`inbox-${c.name.toLowerCase()}`)?.imageUrl
}))

function ConversationItem({ conv, active, onSelect }: { conv: any, active: boolean, onSelect: () => void }) {
  const getChannelIcon = (channel: string) => {
    switch(channel.toLowerCase()) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'email': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'sms': return <Phone className="w-4 h-4 text-purple-500" />;
      default: return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    }
  }

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        active ? 'bg-primary/10' : 'hover:bg-muted'
      )}
      onClick={onSelect}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={conv.avatar} data-ai-hint="person portrait" />
          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-background p-0.5 rounded-full">
          {getChannelIcon(conv.channel)}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
          <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
      </div>
      {conv.unread > 0 && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center self-center shrink-0">
          {conv.unread}
        </div>
      )}
    </div>
  );
}

function AiPanel() {
    return (
        <div className="w-full lg:w-80 border-l p-4 space-y-4 bg-card shrink-0">
             <div className="flex items-center gap-2">
                <Sparkles className="text-primary"/>
                <h3 className="font-semibold">AI Insights</h3>
             </div>
             <div className="bg-muted p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Sentiment Analysis</p>
                <p className="text-muted-foreground">Positive (92%)</p>
             </div>
              <div className="bg-muted p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">AI-Generated Summary</p>
                <p className="text-muted-foreground text-xs">Alice is interested in the downtown apartment and wants to schedule a viewing for Thursday at 3 PM.</p>
             </div>
             <div className="bg-muted p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Suggested Reply</p>
                <p className="text-muted-foreground text-xs">"Great! Thursday at 3 PM is confirmed. I've sent a calendar invite. Looking forward to showing you the apartment."</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Use this reply</Button>
             </div>
        </div>
    )
}

const channelFilters = [
  { id: 'all', label: 'All', icon: Inbox },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'sms', label: 'SMS', icon: Phone },
]

export default function InboxPage() {
    const [currentConversation, setCurrentConversation] = useState(conversations[0]);
    const [activeChannel, setActiveChannel] = useState('all');

    return (
      <div className="flex flex-col h-full bg-background overflow-hidden">
        <PageHeader
            title="Unified Inbox"
            description="Manage all your customer conversations in one place."
        >
             <div className="flex items-center gap-2">
                <Button variant="outline"><Filter className="mr-2 h-4 w-4"/> Filter</Button>
                <Button><Inbox className="mr-2 h-4 w-4"/> New Conversation</Button>
            </div>
        </PageHeader>
        
        <div className="border rounded-lg grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-0">
          <div className="flex flex-col border-r md:col-span-4 lg:col-span-3 h-full">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations" className="pl-8" />
              </div>
            </div>
             <div className="p-2 border-b">
                <ScrollArea className="w-full whitespace-nowrap">
                   <div className="flex space-x-1">
                    {channelFilters.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <Button
                          key={channel.id}
                          variant={activeChannel === channel.id ? 'secondary': 'ghost'}
                          size="sm"
                          className="flex items-center gap-2 shrink-0"
                          onClick={() => setActiveChannel(channel.id)}
                        >
                          <Icon className={cn("h-4 w-4", activeChannel === channel.id ? "text-primary" : "text-muted-foreground")} />
                          {channel.label}
                          <Badge variant={activeChannel === channel.id ? 'default': 'secondary'} className="ml-1">
                            {channel.id === 'all' ? conversations.length : conversations.filter(c => c.channel.toLowerCase() === channel.id).length}
                          </Badge>
                        </Button>
                      )
                    })}
                  </div>
                  <div className="h-1" />
                </ScrollArea>
              </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations.map((conv) => (
                  <ConversationItem key={conv.id} conv={conv} active={conv.id === currentConversation.id} onSelect={() => setCurrentConversation(conv)} />
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="hidden md:flex md:flex-col md:col-span-8 lg:col-span-9 h-full">
             <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={getImagePlaceholder('inbox-alice')?.imageUrl} data-ai-hint="person portrait" />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold text-lg">{selectedConversation.name}</h2>
                    <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button variant="outline" size="icon"><Phone className="h-4 w-4"/></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Start a call</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button variant="outline" size="icon"><Video className="h-4 w-4"/></Button>
                        </TooltipTrigger>
                         <TooltipContent><p>Start a video call</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button variant="outline" size="icon"><Archive className="h-4 w-4"/></Button>
                        </TooltipTrigger>
                         <TooltipContent><p>Archive Conversation</p></TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                        </TooltipTrigger>
                         <TooltipContent><p>Delete Conversation</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1">
                      <div className="p-6 space-y-6">
                        {selectedConversation.messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-3 ${msg.from === 'Agent' ? 'justify-end' : ''}`}>
                            {msg.from !== 'Agent' && 
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={getImagePlaceholder('inbox-alice')?.imageUrl} data-ai-hint="person portrait" />
                                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                                </Avatar>}
                            <div className={`rounded-lg p-3 max-w-md shadow-sm ${msg.from === 'Agent' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.from === 'Agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                            </div>
                            {msg.from === 'Agent' && <Avatar className="h-8 w-8"><AvatarImage src={getImagePlaceholder("user-avatar")?.imageUrl} /><AvatarFallback>A</AvatarFallback></Avatar>}
                            </div>
                        ))}
                      </div>
                    </ScrollArea>
                     <div className="p-4 border-t bg-card">
                      <div className="relative">
                        <Textarea placeholder="Type your message or use '/' for commands..." className="pr-20" rows={2} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           <Button variant="ghost" size="icon"><Sparkles className="text-primary"/></Button>
                           <Button size="icon">
                            <Send />
                          </Button>
                        </div>
                      </div>
                    </div>
                </div>
                <AiPanel/>
            </div>
          </div>
        </div>
      </div>
    );
}
