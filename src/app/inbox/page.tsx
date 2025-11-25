
"use client";

import { useMemo, useState } from "react";
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
  Video,
  Star,
  StarOff,
  MoreVertical,
  Building,
  BadgeCheck,
  CheckCheck,
  Check,
  Paperclip,
  Smile,
  LayoutTemplate,
  Settings,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

type Channel = "whatsapp" | "email" | "sms" | "webchat" | "social";

type Conversation = {
  id: string;
  name: string;
  channel: Channel;
  source?: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  starred?: boolean;
  pinned?: boolean;
  linkedProperty?: string;
  status?: "Active" | "Qualified" | "Closed";
};

type Attachment = { id: string; type: "image" | "pdf" | "doc"; url: string; name: string };

type Message = {
  id: string;
  type: "whatsapp" | "email" | "sms" | "webchat" | "social" | "ai";
  from: "agent" | "lead" | "ai";
  text?: string;
  subject?: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  attachments?: Attachment[];
};

const sampleConversations: Conversation[] = [
  { id: "1", name: "Priya Sharma", channel: "whatsapp", source: "Website", lastMessage: "Can we book a villa visit for Saturday?", time: "3:51 pm", unread: 2, starred: true, pinned: true, linkedProperty: "3BHK Whitefield Villa", status: "Active" },
  { id: "2", name: "Amit Patel", channel: "email", source: "Referral", lastMessage: "Amenities and budget around 1.2Cr", time: "2:20 pm", unread: 0, starred: false, linkedProperty: "Penthouse Kalyani Nagar", status: "Qualified" },
  { id: "3", name: "Sunil Reddy", channel: "sms", source: "Website", lastMessage: "Please call me on Sunday", time: "Yesterday", unread: 1, starred: false, status: "Active" },
  { id: "4", name: "Rajesh Kumar", channel: "webchat", source: "Landing Page", lastMessage: "Interested in 2BHK Wakad", time: "Mon", unread: 0, starred: true, status: "Qualified" },
  { id: "5", name: "New Lead (99acres)", channel: "webchat", source: "99acres", lastMessage: "Hi, interested in Kalyani Nagar listing…", time: "Tue", unread: 3, starred: false, status: "Active" },
  { id: "6", name: "Neha Gupta", channel: "email", source: "Campaign", lastMessage: "Sharing documents and floor plan", time: "Wed", unread: 0, starred: false, status: "Active" },
  { id: "7", name: "Vikram Rao", channel: "whatsapp", source: "WhatsApp", lastMessage: "Is parking covered?", time: "Thu", unread: 0, starred: false, status: "Active" },
  { id: "8", name: "Deepa Nair", channel: "sms", source: "SMS", lastMessage: "Can we reschedule visit?", time: "Fri", unread: 0, starred: false, status: "Active" },
  { id: "9", name: "Sneha Patel", channel: "email", source: "Social Ads", lastMessage: "Budget 85L, available Thu 11am", time: "10/20", unread: 0, starred: false, status: "Qualified" },
  { id: "10", name: "Arjun Mehta", channel: "whatsapp", source: "WhatsApp", lastMessage: "Please share brochure PDF", time: "10/19", unread: 0, starred: false, status: "Active" },
  { id: "11", name: "Kalyani Nagar Inquiry", channel: "social", source: "Instagram DM", lastMessage: "Is the penthouse pet-friendly?", time: "10/18", unread: 0, starred: false, status: "Active" },
];

const messagesByConversation: Record<string, Message[]> = {
  "1": [
    { id: "m1", type: "whatsapp", from: "lead", text: "We want to book a villa visit this weekend.", timestamp: "3:49 pm", status: "read" },
    { id: "m2", type: "ai", from: "ai", text: "Suggest proposing Thursday 11am or Saturday 3pm.", timestamp: "3:50 pm" },
    { id: "m3", type: "whatsapp", from: "agent", text: "Thursday 11am works. Shall I book?", timestamp: "3:51 pm", status: "delivered" },
  ],
  "2": [
    { id: "m1", type: "email", from: "lead", subject: "Amenities and budget", text: "Looking for 1.2Cr budget, want clubhouse, gym.", timestamp: "2:18 pm" },
    { id: "m2", type: "email", from: "agent", subject: "Re: Amenities and budget", text: "Sharing brochure and amenity list.", timestamp: "2:20 pm", attachments: [{ id: "a1", type: "pdf", url: "#", name: "Prestige-Lakeside-Brochure.pdf" }] },
  ],
  "3": [
    { id: "m1", type: "sms", from: "lead", text: "Please call me on Sunday.", timestamp: "Yesterday", status: "sent" },
    { id: "m2", type: "sms", from: "agent", text: "Sure, scheduled for Sunday 11am.", timestamp: "Yesterday", status: "delivered" },
  ],
  "4": [
    { id: "m1", type: "webchat", from: "lead", text: "Interested in 2BHK Wakad.", timestamp: "Mon" },
    { id: "m2", type: "ai", from: "ai", text: "Lead prefers 2BHK near tech park, budget around 70L.", timestamp: "Mon" },
  ],
  "5": [
    { id: "m1", type: "webchat", from: "lead", text: "Hi, I am interested in your Kalyani Nagar listing…", timestamp: "Tue" },
    { id: "m2", type: "ai", from: "ai", text: "Offer visit slots Thu/Fri 11am.", timestamp: "Tue" },
  ],
  "6": [
    { id: "m1", type: "email", from: "lead", subject: "Floor plan and documents", text: "Sharing floor plan and KYC.", timestamp: "Wed", attachments: [{ id: "a2", type: "doc", url: "#", name: "Sale-Agreement-Draft.docx" }] },
    { id: "m2", type: "email", from: "agent", subject: "Re: Floor plan and documents", text: "Received, thank you.", timestamp: "Wed" },
  ],
  "7": [
    { id: "m1", type: "whatsapp", from: "lead", text: "Is parking covered?", timestamp: "Thu" },
    { id: "m2", type: "whatsapp", from: "agent", text: "Yes, covered parking for two vehicles.", timestamp: "Thu", status: "read" },
  ],
  "8": [
    { id: "m1", type: "sms", from: "lead", text: "Can we reschedule visit?", timestamp: "Fri" },
    { id: "m2", type: "sms", from: "agent", text: "Sure, proposing Saturday 4pm.", timestamp: "Fri" },
  ],
  "9": [
    { id: "m1", type: "email", from: "lead", subject: "Visit availability and budget", text: "Budget 85L, available Thu 11am.", timestamp: "10/20" },
    { id: "m2", type: "email", from: "agent", subject: "Re: Visit availability and budget", text: "Booked Thursday 11am.", timestamp: "10/20" },
  ],
  "10": [
    { id: "m1", type: "whatsapp", from: "lead", text: "Please share brochure PDF.", timestamp: "10/19" },
    { id: "m2", type: "whatsapp", from: "agent", text: "Sent brochure and details.", timestamp: "10/19", attachments: [{ id: "a3", type: "pdf", url: "#", name: "Brochure.pdf" }] },
  ],
  "11": [
    { id: "m1", type: "social", from: "lead", text: "Is the penthouse pet-friendly?", timestamp: "10/18" },
    { id: "m2", type: "ai", from: "ai", text: "Mention pet policy and nearby parks.", timestamp: "10/18" },
  ],
};

function ChannelIcon({ channel }: { channel: Channel }) {
  switch (channel) {
    case "whatsapp":
      return <MessageSquare className="w-4 h-4 text-green-600" />;
    case "email":
      return <Mail className="w-4 h-4 text-primary" />;
    case "sms":
      return <Phone className="w-4 h-4 text-orange-500" />;
    case "webchat":
      return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    case "social":
      return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    default:
      return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
  }
}

function ConversationListItem({ conv, active, onSelect, onToggleStar }: { conv: Conversation, active: boolean, onSelect: () => void, onToggleStar: () => void }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 ease-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-primary/10" : "hover:bg-muted"
      )}
      onClick={onSelect}
      aria-label={`Open conversation with ${conv.name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(); }}
    >
      <div className="relative">
        <Avatar className="h-9 w-9">
          <AvatarImage src={conv.avatar} />
          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-background p-0.5 rounded-full">
          <ChannelIcon channel={conv.channel} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate text-foreground">{conv.name}</h3>
          <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
      </div>
      <div className="flex items-center gap-2">
        {conv.unread > 0 && (
          <div className="bg-green-600 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {conv.unread}
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); onToggleStar(); }} aria-label={conv.starred ? "Unstar" : "Star"} aria-pressed={conv.starred} className="transition-colors">
          {conv.starred ? <Star className="h-4 w-4 text-primary" /> : <StarOff className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );
}

function EmailMessageCard({ msg }: { msg: Message }) {
  return (
    <div className="rounded-lg p-3 bg-muted text-foreground shadow-sm transition-colors duration-300">
      <div className="text-xs text-muted-foreground">{msg.timestamp}</div>
      <div className="font-semibold">{msg.subject}</div>
      <div className="text-sm mt-1">{msg.text}</div>
      {msg.attachments && (
        <div className="flex items-center gap-2 mt-2">
          {msg.attachments.map(a => (
            <div key={a.id} className="flex items-center gap-2 px-2 py-1 rounded bg-card">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{a.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Message }) {
  const right = msg.from === "agent";
  const isWhatsapp = msg.type === "whatsapp";
  const bubbleColor = right ? (isWhatsapp ? "bg-green-600 text-white" : "bg-primary text-primary-foreground") : "bg-muted text-foreground";
  return (
    <div className={cn("flex items-end gap-3", right ? "justify-end" : "")}>      
      {!right && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format"} />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("rounded-lg p-3 max-w-md shadow-sm transition-colors duration-300", bubbleColor)}>
        <div className="text-sm">{msg.text}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={cn("text-xs", right ? "text-primary-foreground/80" : "text-muted-foreground")}>{msg.timestamp}</span>
          {isWhatsapp && right && (
            msg.status === "read" ? <CheckCheck className="h-3 w-3" /> : msg.status === "delivered" ? <Check className="h-3 w-3" /> : null
          )}
        </div>
        {msg.attachments && (
          <div className="flex items-center gap-2 mt-2">
            {msg.attachments.map(a => (
              <div key={a.id} className="flex items-center gap-2 px-2 py-1 rounded bg-card">
                <Paperclip className="h-4 w-4" />
                <span className="text-xs">{a.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {right && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80&auto=format"} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function TerraAIBubble({ msg }: { msg: Message }) {
  return (
    <div className="flex items-end gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={"https://res.cloudinary.com/dvic0tda9/image/upload/v1722222222/bot_avatar.png"} />
        <AvatarFallback>T</AvatarFallback>
      </Avatar>
      <div className="rounded-lg p-3 max-w-md shadow-sm bg-muted text-foreground transition-colors duration-300">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <Badge variant="outline">AI</Badge>
        </div>
        <div className="text-sm mt-1">{msg.text}</div>
        <div className="text-xs text-muted-foreground mt-1">{msg.timestamp}</div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [list, setList] = useState<Conversation[]>(sampleConversations);
  const [activeChannel, setActiveChannel] = useState<Channel | "all">("all");
  const [currentId, setCurrentId] = useState<string>(list[0].id);
  const currentConversation = useMemo(() => list.find(l => l.id === currentId)!, [list, currentId]);
  const currentMessages = useMemo(() => messagesByConversation[currentId] || [], [currentId]);
  const [composeText, setComposeText] = useState("");
  const { toast } = useToast();
  const counts = useMemo(() => {
    const by = { all: list.length, whatsapp: 0, email: 0, sms: 0, webchat: 0, social: 0 } as Record<string, number>;
    list.forEach(c => { by[c.channel] = (by[c.channel] || 0) + 1; });
    return by;
  }, [list]);

  const filteredList = useMemo(() => activeChannel === "all" ? list : list.filter(c => c.channel === activeChannel), [list, activeChannel]);

  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "whatsapp", label: "WhatsApp", count: counts.whatsapp },
    { id: "email", label: "Email", count: counts.email },
    { id: "sms", label: "SMS", count: counts.sms },
    { id: "webchat", label: "Webchat", count: counts.webchat },
    { id: "social", label: "Social", count: counts.social },
  ];

  const pinned = filteredList.filter(c => c.pinned);
  const recent = filteredList.filter(c => !c.pinned).slice(0, Math.max(0, filteredList.length - 5));
  const older = filteredList.filter(c => !c.pinned).slice(Math.max(0, filteredList.length - 5));

  const setStar = (id: string, starred: boolean) => setList(prev => prev.map(c => c.id === id ? { ...c, starred } : c));

  return (
    <div className="h-full bg-background transition-colors duration-300 ease-micro">
      <div className="sticky top-0 z-30 bg-background">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Unified Inbox</h1>
            </div>
            <div className="flex-1 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              {tabs.map(t => (
                <Button key={t.id} variant={activeChannel === t.id ? "secondary" : "ghost"} size="sm" className="flex items-center gap-2" onClick={() => setActiveChannel(t.id as any)} aria-label={`Filter ${t.label}`} role="tab" aria-selected={activeChannel === t.id}>
                  <span className={cn("text-sm", activeChannel === t.id ? "text-primary" : "text-muted-foreground")}>{t.label}</span>
                  <Badge variant={activeChannel === t.id ? "default" : "secondary"}>{t.count}</Badge>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts, conversations or messages…" className="pl-8 bg-card text-foreground border-0" aria-label="Search inbox" />
              </div>
              <TooltipProvider>
                <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="Filter" onClick={() => toast({ title: "Filters", description: "Open filters" })}><Filter className="h-4 w-4 text-muted-foreground" /></Button></TooltipTrigger><TooltipContent>Filter</TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="Archive" onClick={() => toast({ title: "Archived", description: "Conversation archived" })}><Archive className="h-4 w-4 text-muted-foreground" /></Button></TooltipTrigger><TooltipContent>Archive</TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="Settings" onClick={() => toast({ title: "Settings", description: "Open settings" })}><Settings className="h-4 w-4 text-muted-foreground" /></Button></TooltipTrigger><TooltipContent>Settings</TooltipContent></Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <PanelGroup direction="horizontal" className="h-[calc(100%-56px)]">
        <Panel defaultSize={20} minSize={16} className="flex flex-col border-r">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
                {tabs.map(t => (
                  <Button key={`chip-${t.id}`} variant={activeChannel === t.id ? "secondary" : "ghost"} size="sm" onClick={() => setActiveChannel(t.id as any)} className="gap-2 transition-colors" aria-label={`Show ${t.label}`}>
                    {t.label}
                    <Badge variant={activeChannel === t.id ? "default" : "secondary"}>{t.count}</Badge>
                  </Button>
                ))}
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground" aria-label="Start New Conversation" onClick={() => toast({ title: "New conversation", description: "Starting" })}><Inbox className="h-4 w-4 mr-1" />New</Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-3 py-2 space-y-2">
              <div className="text-xs text-muted-foreground">Pinned</div>
              {pinned.length === 0 && <div className="text-xs text-muted-foreground">No pinned conversations</div>}
              {pinned.map(c => (
                <ConversationListItem key={c.id} conv={c} active={c.id === currentId} onSelect={() => setCurrentId(c.id)} onToggleStar={() => setStar(c.id, !c.starred)} />
              ))}
              <div className="pt-2 border-t" />
              <div className="text-xs text-muted-foreground">Recent</div>
              {recent.map(c => (
                <ConversationListItem key={c.id} conv={c} active={c.id === currentId} onSelect={() => setCurrentId(c.id)} onToggleStar={() => setStar(c.id, !c.starred)} />
              ))}
              <div className="pt-2 border-t" />
              <div className="text-xs text-muted-foreground">Older</div>
              {older.map(c => (
                <ConversationListItem key={c.id} conv={c} active={c.id === currentId} onSelect={() => setCurrentId(c.id)} onToggleStar={() => setStar(c.id, !c.starred)} />
              ))}
            </div>
            {filteredList.length === 0 && (
              <div className="p-6 text-center">
                <div className="text-muted-foreground">No conversations</div>
                <Button className="mt-2 bg-primary text-primary-foreground" onClick={() => toast({ title: "New conversation", description: "Starting" })}>Start New Conversation</Button>
              </div>
            )}
          </ScrollArea>
        </Panel>
        <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors cursor-col-resize" />
        <Panel defaultSize={55} minSize={35} className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format"} />
                <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-foreground font-semibold text-base">{currentConversation.name}</div>
                  <Badge variant="secondary" className="text-xs">Lead</Badge>
                  <Badge variant="secondary" className="text-xs">Agent</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs"><ChannelIcon channel={currentConversation.channel} /> {currentConversation.channel}</Badge>
                  {currentConversation.source && <Badge variant="outline" className="text-xs">{currentConversation.source}</Badge>}
                  {currentConversation.linkedProperty && <Badge variant="outline" className="text-xs"><Building className="h-3 w-3 mr-1" />{currentConversation.linkedProperty}</Badge>}
                  {currentConversation.status && (
                    <Badge variant="outline" className={cn("text-xs", currentConversation.status === "Qualified" ? "text-primary" : currentConversation.status === "Closed" ? "text-red-500" : "text-green-600")}>{currentConversation.status}</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2" role="toolbar" aria-label="Conversation actions">
              <Button variant="outline" size="sm" aria-label="Call" onClick={() => toast({ title: "Call", description: "Starting call" })}><Phone className="h-4 w-4 mr-1" />Call</Button>
              <Button variant="outline" size="sm" aria-label="Email" onClick={() => toast({ title: "Email", description: "Opening email" })}><Mail className="h-4 w-4 mr-1" />Email</Button>
              <Button variant="outline" size="sm" aria-label="Schedule Visit" onClick={() => toast({ title: "Site visit", description: "Scheduling" })}><BadgeCheck className="h-4 w-4 mr-1" />Schedule Visit</Button>
              <Button variant="destructive" size="sm" aria-label="Mark Closed" onClick={() => toast({ title: "Closed", description: "Marked as closed" })}>Mark Closed</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="More"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast({ title: "Assign", description: "Assigning conversation" })}>Assign</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Link property", description: "Linking property" })}>Link Property</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Export", description: "Exporting chat" })}>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {currentMessages.map((m) => {
                if (m.type === "email") return <EmailMessageCard key={m.id} msg={m} />;
                if (m.type === "ai") return <TerraAIBubble key={m.id} msg={m} />;
                return <ChatBubble key={m.id} msg={m} />;
              })}
            </div>
          </ScrollArea>

          <div className="px-4 py-3 border-t bg-card">
            <div className="flex items-end gap-2">
              <Textarea rows={2} placeholder="Type your message…" className="flex-1 bg-card text-foreground border" aria-label="Message input" value={composeText} onChange={(e) => setComposeText(e.target.value)} />
              <Button variant="outline" size="icon" aria-label="Attach" onClick={() => toast({ title: "Attach", description: "Attach files" })}><Paperclip className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" aria-label="Emoji" onClick={() => toast({ title: "Emoji", description: "Open emoji picker" })}><Smile className="h-4 w-4" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" aria-label="Templates"><LayoutTemplate className="h-4 w-4 mr-1" />Templates<ChevronDown className="h-4 w-4 ml-1" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setComposeText((t) => `${t} Welcome to TerraFlow! How can I help today?`)}>Welcome message</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setComposeText((t) => `${t} Just checking in—would you like to schedule a viewing?`)}>Follow-up</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setComposeText((t) => `${t} Are you available Thursday at 11am for a site visit?`)}>Schedule visit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="secondary" size="sm" aria-label="Suggest a reply" onClick={() => setComposeText((t) => `${t} Confirming Thursday 11am. Sharing location and contact details.`)}><Sparkles className="h-4 w-4 mr-1 text-primary" />Suggest a reply</Button>
              <Button className="bg-primary text-primary-foreground" size="sm" aria-label="Send" disabled={!composeText.trim()} onClick={() => { toast({ title: "Message sent", description: composeText.trim() }); setComposeText(""); }}><Send className="h-4 w-4 mr-1" />Send</Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Cmd+Enter to send</div>
          </div>
        </Panel>
        <PanelResizeHandle className="w-1 bg-border hover:bg-primary/40 transition-colors cursor-col-resize" />
        <Panel defaultSize={25} minSize={20} className="flex flex-col border-l bg-card">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="rounded-lg p-4 bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  <div className="font-semibold text-foreground">AI Insights</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="text-2xl">🙂</div>
                  <div className="text-sm text-foreground">92% Positive</div>
                </div>
                <div className="mt-3 text-sm text-foreground">Lead is interested in 3BHK, available for visit, budget ₹85L.</div>
                <Button className="mt-3 bg-primary text-primary-foreground" size="sm" aria-label="Schedule callback" onClick={() => toast({ title: "Callback scheduled", description: "Thu, 11am" })}>Schedule callback Thu, 11am</Button>
                <div className="mt-3 text-xs text-muted-foreground">Recommended reply</div>
                <Button variant="outline" size="sm" className="mt-1" aria-label="Insert AI reply" onClick={() => setComposeText((t) => `${t} Confirm visit for Thu 11am and share location`)}>Confirm visit for Thu 11am and share location</Button>
              </div>

              <div className="rounded-lg p-4 bg-muted transition-colors">
                <div className="font-semibold text-foreground">Contact / Lead</div>
                <div className="flex items-center gap-3 mt-2">
                  <Avatar className="h-9 w-9"><AvatarImage src={"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format"} /><AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <div className="text-foreground text-sm">{currentConversation.name}</div>
                    <div className="text-xs text-muted-foreground">{currentConversation.source}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-foreground/80">
                  <div>Stage: <span className="text-[#32B8C6]">{currentConversation.status || "Active"}</span></div>
                  <div>Lead score: 86</div>
                  <div>Agent: Priya Sharma</div>
                  <div>Channel: {currentConversation.channel}</div>
                </div>
                {currentConversation.linkedProperty && (
                  <div className="mt-2">
                    <Badge variant="outline"><Building className="h-3 w-3 mr-1" />{currentConversation.linkedProperty}</Badge>
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">Hot Lead</Badge>
                  <Badge variant="secondary">Budget: 60–90L</Badge>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-muted transition-colors">
                <div className="font-semibold text-foreground">Activity</div>
                <div className="mt-2 space-y-2 text-sm text-foreground/80">
                  <div>Last contact: Today 3:51 pm</div>
                  <div>Visit scheduled: Thu 11am</div>
                  <div>Property sent: Whitefield Villa brochure</div>
                  <div>Follow-up: Sun 6pm</div>
                  <div>Deal status: Negotiation</div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-muted transition-colors">
                <div className="font-semibold text-foreground">Actions</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Site visit", description: "Booked" })}>Book site visit</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Note added", description: "Saved" })}>Add note</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Export", description: "Chat exported" })}>Export chat</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Property", description: "Linked" })}>Link property</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "WhatsApp", description: "Message sent" })}>Send WhatsApp</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Email", description: "Message sent" })}>Send Email</Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Panel>
      </PanelGroup>
    </div>
  );
}
