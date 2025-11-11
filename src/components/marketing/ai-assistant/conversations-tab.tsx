"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Check, Clock, X, MessageSquare, Bot, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const mockConversations = [
  {
    id: 1,
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
    status: "Active",
    sentiment: "Positive",
    score: 87,
    lastMessage: "Terra: Great! I can schedule a site visit for the 3BHK in Whitefield for you. What day works best?",
    time: "2 min ago",
    channel: "WhatsApp"
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    status: "Qualified",
    sentiment: "Positive",
    score: 92,
    lastMessage: "Terra: Perfect! I've booked that for you and sent a calendar invite. Your agent will meet you there.",
    time: "15 min ago",
    channel: "Webchat"
  },
  {
    id: 3,
    name: "Amit Patel",
    avatar: "https://i.pravatar.cc/150?u=amit",
    status: "Unresponsive",
    sentiment: "Neutral",
    score: 65,
    lastMessage: "Terra: Just following up, were you still interested in learning more about the properties in Bandra?",
    time: "1 hour ago",
    channel: "SMS"
  }
];

const mockSelectedConversation = {
    ...mockConversations[0],
    history: [
        { sender: 'lead', text: "Hi, I'm interested in the 3BHK in Whitefield." },
        { sender: 'ai', text: "Hello Rajesh! It's a great choice. It has a fantastic view and is close to the metro. What's your budget like?" },
        { sender: 'lead', text: "Around 85L to 1Cr." },
        { sender: 'system', text: "Lead budget updated." },
        { sender: 'ai', text: "That fits perfectly. Are you looking to move in soon?" },
        { sender: 'lead', text: "Yes, in the next 1-2 months." },
        { sender: 'ai', text: "Excellent. I see you have a high lead score of 87. You seem like a great fit for this property." },
        { sender: 'system', text: "Lead qualified." },
        { sender: 'ai', text: "Great! I can schedule a site visit for the 3BHK in Whitefield for you. What day works best?" },
    ],
    insights: {
        intent: "High purchase intent",
        objections: "None detected",
        action: "Schedule site visit ASAP",
        conversion: "78%"
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    const colors: { [key: string]: string } = {
        Active: 'bg-green-100 text-green-800',
        Qualified: 'bg-blue-100 text-blue-800',
        Scheduled: 'bg-purple-100 text-purple-800',
        Unresponsive: 'bg-gray-100 text-gray-800',
    };
    return <Badge variant="outline" className={`border-0 ${colors[status]}`}>{status}</Badge>;
};

const SentimentEmoji = ({ sentiment }: { sentiment: string }) => {
    if (sentiment === "Positive") return "😊";
    if (sentiment === "Neutral") return "😐";
    if (sentiment === "Negative") return "😞";
    return "";
};

export const ConversationsTab = () => {
    const [selectedConvoId, setSelectedConvoId] = useState<number | null>(1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-20rem)]">
            {/* Left: Conversation List */}
            <div className="lg:col-span-1 flex flex-col h-full">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search conversations..." className="pl-10" />
                    </div>
                     <div className="flex gap-2 mt-2">
                        <Select defaultValue="all"><SelectTrigger className="flex-1"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem></SelectContent></Select>
                        <Select defaultValue="all"><SelectTrigger className="flex-1"><SelectValue placeholder="Sentiment" /></SelectTrigger><SelectContent><SelectItem value="all">All Sentiments</SelectItem></SelectContent></Select>
                        <Button variant="outline" size="icon"><SlidersHorizontal className="h-4 w-4" /></Button>
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {mockConversations.map(convo => (
                            <Card key={convo.id} className={`p-4 cursor-pointer transition-all ${selectedConvoId === convo.id ? 'bg-muted ring-2 ring-primary' : 'hover:bg-muted/50'}`} onClick={() => setSelectedConvoId(convo.id)}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Avatar><AvatarImage src={convo.avatar} /><AvatarFallback>{convo.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{convo.name}</p>
                                            <p className="text-xs text-muted-foreground">{convo.time}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={convo.status} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 truncate">{convo.lastMessage}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${convo.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>Score: {convo.score}</div>
                                    <div className="text-lg"><SentimentEmoji sentiment={convo.sentiment} /></div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            {/* Right: Conversation Detail */}
            <div className="lg:col-span-2 flex flex-col h-full bg-card border rounded-lg">
                {selectedConvoId ? (
                    <>
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Avatar><AvatarImage src={mockSelectedConversation.avatar} /><AvatarFallback>{mockSelectedConversation.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{mockSelectedConversation.name}</p>
                                    <p className="text-xs text-muted-foreground">{mockSelectedConversation.channel}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setSelectedConvoId(null)}>Close</Button>
                        </div>
                        <div className="flex-1 grid grid-cols-3 overflow-hidden">
                            <ScrollArea className="col-span-2 border-r">
                                <div className="p-6 space-y-6">
                                    {mockSelectedConversation.history.map((msg, index) => (
                                        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'ai' ? '' : 'justify-end'}`}>
                                            {msg.sender === 'ai' && <Avatar className="h-8 w-8"><Bot/></Avatar>}
                                            {msg.sender === 'system' ? (
                                                <p className="text-xs text-muted-foreground text-center w-full py-2">-- {msg.text} --</p>
                                            ) : (
                                                <div className={`rounded-lg p-3 max-w-md shadow-sm text-sm ${msg.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                                    <p>{msg.text}</p>
                                                </div>
                                            )}
                                            {msg.sender === 'lead' && <Avatar className="h-8 w-8"><User/></Avatar>}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="col-span-1 p-4 space-y-4">
                                <h4 className="font-semibold">Lead Snapshot</h4>
                                <div className="text-sm space-y-1 text-muted-foreground">
                                    <p><strong>Score:</strong> {mockSelectedConversation.score}/100</p>
                                    <p><strong>Stage:</strong> {mockSelectedConversation.status}</p>
                                    <p><strong>Interest:</strong> 3BHK in Whitefield</p>
                                    <p><strong>Budget:</strong> ₹80L-1Cr</p>
                                    <p><strong>Timeline:</strong> Immediate</p>
                                </div>
                                <Separator />
                                <h4 className="font-semibold">Terra's AI Insights</h4>
                                <div className="text-sm space-y-1 text-muted-foreground">
                                    <p><strong>Intent:</strong> {mockSelectedConversation.insights.intent}</p>
                                    <p><strong>Objections:</strong> {mockSelectedConversation.insights.objections}</p>
                                    <p><strong>Recommendation:</strong> {mockSelectedConversation.insights.action}</p>
                                    <p><strong>Conversion Chance:</strong> {mockSelectedConversation.insights.conversion}</p>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                     <Button className="w-full">Take Over Conversation</Button>
                                     <Button variant="outline" className="w-full">View Lead Profile</Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <MessageSquare className="w-16 h-16 mb-4" />
                        <p>Select a conversation to view details</p>
                    </div>
                )}
            </div>
        </div>
    )
}
