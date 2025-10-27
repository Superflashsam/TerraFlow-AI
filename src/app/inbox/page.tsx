
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
  User,
  Bot
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { conversations, selectedConversation } from "@/lib/placeholder-data";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";

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
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-accent' : 'hover:bg-accent/50'}`}
      onClick={onSelect}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={`https://picsum.photos/seed/${conv.name}/40/40`} data-ai-hint="person portrait" />
          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-background p-0.5 rounded-full">
          {getChannelIcon(conv.channel)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold text-sm">{conv.name}</h3>
          <span className="text-xs text-muted-foreground">{conv.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
      </div>
      {conv.unread > 0 && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center self-center">
          {conv.unread}
        </div>
      )}
    </div>
  );
}

function AiPanel() {
    return (
        <div className="w-80 border-l p-4 space-y-4">
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

export default function InboxPage() {
    const [currentConversation, setCurrentConversation] = useState(conversations[0]);

    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
        <PageHeader
            title="Unified Inbox"
            description="Manage all your customer conversations in one place."
        >
             <div className="flex items-center gap-2">
                <Button variant="outline"><Filter className="mr-2"/> Filter</Button>
                <Button><Inbox className="mr-2"/> New Conversation</Button>
            </div>
        </PageHeader>
        
        <div className="border rounded-lg grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden">
          <div className="flex flex-col border-r md:col-span-4 lg:col-span-3">
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
                <ConversationItem key={conv.id} conv={conv} active={conv.id === currentConversation.id} onSelect={() => setCurrentConversation(conv)} />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:col-span-8 lg:col-span-9">
             <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://picsum.photos/seed/${selectedConversation.name}/40/40`} data-ai-hint="person portrait" />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold text-lg">{selectedConversation.name}</h2>
                    <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Archive className="mr-2"/> Archive</Button>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2"/> Delete</Button>
              </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {selectedConversation.messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 ${msg.from === 'Agent' ? 'justify-end' : ''}`}>
                        {msg.from !== 'Agent' && 
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://picsum.photos/seed/${selectedConversation.name}/40/40`} data-ai-hint="person portrait" />
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
                     <div className="p-4 border-t bg-background">
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

