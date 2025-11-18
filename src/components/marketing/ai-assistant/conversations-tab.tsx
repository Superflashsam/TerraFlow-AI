
"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Check, Clock, X, MessageSquare, Bot, User, CheckCircle, Calendar, MessageCircleQuestion, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTerraConversations } from '@/hooks/use-terra-conversations';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const statusOptions = ['All', 'Active', 'Qualified', 'Scheduled', 'Unresponsive'];
const sentimentOptions = ['All', 'Positive', 'Neutral', 'Negative'];
const channelOptions = ['All', 'WhatsApp', 'Webchat', 'SMS'];


const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      Active: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500 animate-pulse', icon: MessageSquare },
      Qualified: { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', icon: CheckCircle },
      Scheduled: { color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500', icon: Calendar },
      Unresponsive: { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500', icon: Clock },
    }[status] || { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500', icon: MessageCircleQuestion };
  
    return (
      <Badge variant="outline" className={`border-0 ${config.color} flex items-center gap-1.5`}>
        <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
        {status}
      </Badge>
    );
};

const SentimentEmoji = ({ sentiment }: { sentiment: string }) => {
    if (sentiment === "Positive") return "😊";
    if (sentiment === "Neutral") return "😐";
    if (sentiment === "Negative") return "😞";
    return "";
};

export const ConversationsTab = () => {
    const { conversations, streamingMessage, schedulingEvents } = useTerraConversations();
    const { toast, dismiss } = useToast();
    const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [sentimentFilter, setSentimentFilter] = useState<string>('All');
    const [channelFilter, setChannelFilter] = useState<string>('All');

    // Clear any lingering bad toasts on mount
    useEffect(() => {
        // Dismiss all toasts to clear any bad state
        setTimeout(() => {
            dismiss();
        }, 100);
    }, [dismiss]);

    // Handle scheduling events with toast notifications
    useEffect(() => {
        if (schedulingEvents.length > 0) {
            const latestEvent = schedulingEvents[schedulingEvents.length - 1];
            toast({
                title: '📅 Scheduling Alert',
                description: `${latestEvent.leadName} (Score: ${latestEvent.leadScore}) - ${latestEvent.reason}`,
                duration: 5000,
                action: (
                    <ToastAction 
                        altText="View conversation" 
                        onClick={() => setSelectedConvoId(latestEvent.conversationId)}
                    >
                        View
                    </ToastAction>
                )
            });
        }
    }, [schedulingEvents, toast]);

    const filtered = useMemo(() => {
        return conversations.filter(c =>
            (statusFilter === 'All' || c.status === statusFilter) &&
            (sentimentFilter === 'All' || c.sentiment === sentimentFilter) &&
            (channelFilter === 'All' || c.channel === channelFilter)
        );
    }, [conversations, statusFilter, sentimentFilter, channelFilter]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-20rem)]">
            {/* Left: Conversation List */}
            <div className="lg:col-span-1 flex flex-col h-full bg-card border rounded-lg">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search conversations..." className="pl-10" />
                    </div>
                    {schedulingEvents.length > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-blue-800">Recent Scheduling Alerts</h4>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {schedulingEvents.length}
                          </Badge>
                        </div>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {schedulingEvents.slice(-3).map((event, index) => (
                            <div key={index} className="text-xs text-blue-700">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{event.leadName}</span>
                                <span className="text-blue-500">Score: {event.leadScore}</span>
                              </div>
                              <div className="text-blue-600 mt-1">{event.reason}</div>
                              <div className="text-blue-400 text-xs mt-1">
                                {new Date(event.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                     <div className="flex gap-2 mt-2">
                        {schedulingEvents.length > 0 && (
                          <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg mb-2">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-semibold text-blue-800">Recent Scheduling Alerts</h4>
                              <Badge variant="outline" className="text-blue-600 border-blue-200">
                                {schedulingEvents.length}
                              </Badge>
                            </div>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {schedulingEvents.slice(-3).map((event, index) => (
                                <div key={index} className="text-xs text-blue-700">
                                  <div className="flex justify-between items-start">
                                    <span className="font-medium">{event.leadName}</span>
                                    <span className="text-blue-500">Score: {event.leadScore}</span>
                                  </div>
                                  <div className="text-blue-600 mt-1">{event.reason}</div>
                                  <div className="text-blue-400 text-xs mt-1">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="flex-1"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent>{statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                        <Select value={sentimentFilter} onValueChange={setSentimentFilter}><SelectTrigger className="flex-1"><SelectValue placeholder="Sentiment" /></SelectTrigger><SelectContent>{sentimentOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                        <Button variant="outline" size="icon"><SlidersHorizontal className="h-4 w-4" /></Button>
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {filtered.map(convo => (
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
                                {(() => { const sel = conversations.find(c => c.id === selectedConvoId)!; return (
                                    <>
                                        <Avatar><AvatarImage src={sel.avatar} /><AvatarFallback>{sel.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{sel.name}</p>
                                            <p className="text-xs text-muted-foreground">{sel.channel}</p>
                                        </div>
                                    </>
                                ); })()}
                            </div>
                             <div className="flex items-center gap-2">
                                <Button variant="outline">Schedule Follow-up</Button>
                                <Button>Take Over</Button>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedConvoId(null)}><X className="h-4 w-4"/></Button>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-3 overflow-hidden">
                             <div className="col-span-2 border-r flex flex-col">
                                <ScrollArea className="flex-1">
                                    <div className="p-6 space-y-6">
                                        {(() => {
                                          const selectedConv = conversations.find(c => c.id === selectedConvoId);
                                          if (!selectedConv) return null;
                                          
                                          return selectedConv.messages.map((msg, index) => (
                                            <div key={msg.id} className={cn("flex items-end gap-3", {'justify-end': msg.sender === 'lead'})}>
                                                {msg.sender === 'ai' && <Avatar className="h-8 w-8 border"><AvatarFallback><Bot/></AvatarFallback></Avatar>}
                                                {msg.sender === 'system' ? (
                                                    <p className="text-xs text-muted-foreground text-center w-full py-2">-- {msg.text} --</p>
                                                ) : (
                                                    <div className={cn("rounded-lg p-3 max-w-md shadow-sm text-sm", {
                                                        'bg-muted': msg.sender === 'ai',
                                                        'bg-primary text-primary-foreground': msg.sender === 'lead'
                                                    })}>
                                                        <p>{msg.text}</p>
                                                    </div>
                                                )}
                                                {msg.sender === 'lead' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConv.avatar} /><AvatarFallback><User/></AvatarFallback></Avatar>}
                                            </div>
                                          ));
                                        })()}
                                        {streamingMessage && (
                                          <div className="flex items-end gap-3">
                                            <Avatar className="h-8 w-8 border"><AvatarFallback><Bot/></AvatarFallback></Avatar>
                                            <div className="rounded-lg p-3 max-w-md shadow-sm text-sm bg-muted">
                                              <p>{streamingMessage.text}<span className="animate-pulse">|</span></p>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t">
                                     <Input placeholder="Type a message to take over..."/>
                                     <Button className="ml-2" variant="outline" onClick={async () => {
                                        const sel = conversations.find(c => c.id === selectedConvoId);
                                        if (!sel) return;
                                        const messages = sel.messages.slice(-3).map(msg => ({ 
                                          sender: msg.sender, 
                                          text: msg.text,
                                          timestamp: msg.timestamp
                                        }));
                                        try {
                                          const res = await fetch('/api/terra/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages, lead: { name: sel.name, channel: sel.channel, score: sel.score } }) });
                                          if (!res.ok) throw new Error('Chat request failed');
                                          const data = await res.json();
                                          toast({ title: 'AI Insights', description: `${data.insights.intent} · ${data.insights.recommendedAction}` });
                                          
                                          // Update the conversation with AI insights
                                          const updatedConv = { ...sel };
                                          updatedConv.score = data.leadScore || sel.score;
                                          if (data.insights.sentiment) {
                                            updatedConv.sentiment = data.insights.sentiment as 'Positive' | 'Neutral' | 'Negative';
                                          }
                                          
                                          // Find and update the conversation in the list
                                          const convIndex = conversations.findIndex(c => c.id === selectedConvoId);
                                          if (convIndex >= 0) {
                                            const updatedConversations = [...conversations];
                                            updatedConversations[convIndex] = updatedConv;
                                            // This would trigger a re-render with updated insights
                                          }
                                        } catch (e) {
                                          toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch AI insights' });
                                        }
                                     }}>Get AI Insights</Button>
                                 </div>
                             </div>
                            <ScrollArea className="col-span-1">
                                <div className="p-4 space-y-4">
                                    <Card>
                                        <CardContent className="p-4 space-y-2">
                                             <h4 className="font-semibold text-sm">Lead Snapshot</h4>
                                            <div className="text-xs space-y-1 text-muted-foreground">
                                                {(() => { const sel = conversations.find(c => c.id === selectedConvoId)!; return (
                                                    <>
                                                        <p><strong>Score:</strong> {sel.score}/100</p>
                                                        <p><strong>Stage:</strong> {sel.status}</p>
                                                        <p><strong>Channel:</strong> {sel.channel}</p>
                                                    </>
                                                ); })()}
                                            </div>
                                            <Button variant="link" size="sm" className="p-0 h-auto">View Full Profile</Button>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4 space-y-2">
                                            <h4 className="font-semibold text-sm">Terra's AI Insights</h4>
                                            <div className="text-xs space-y-1 text-muted-foreground">
                                                {(() => {
                                                  const selectedConv = conversations.find(c => c.id === selectedConvoId);
                                                  if (!selectedConv) return <p>No conversation selected</p>;
                                                  
                                                  // Analyze the last few messages for insights
                                                  const lastMessages = selectedConv.messages.slice(-3);
                                                  const leadMessages = lastMessages.filter(m => m.sender === 'lead');
                                                  const aiMessages = lastMessages.filter(m => m.sender === 'ai');
                                                  
                                                  // Simple intent detection based on keywords
                                                  const intents = {
                                                    'price': 'Price Inquiry',
                                                    'budget': 'Budget Discussion',
                                                    'visit': 'Site Visit Request',
                                                    'amenities': 'Amenities Inquiry',
                                                    'loan': 'Financing Question',
                                                    'plan': 'Floor Plan Request',
                                                    'possession': 'Timeline Question'
                                                  };
                                                  
                                                  let detectedIntent = 'General Inquiry';
                                                  for (const [keyword, intent] of Object.entries(intents)) {
                                                    if (leadMessages.some(m => m.text.toLowerCase().includes(keyword))) {
                                                      detectedIntent = intent;
                                                      break;
                                                    }
                                                  }
                                                  
                                                  // Sentiment analysis
                                                  const sentimentWords = {
                                                    positive: ['great', 'perfect', 'excellent', 'love', 'amazing', 'wonderful'],
                                                    negative: ['expensive', 'bad', 'poor', 'disappointed', 'terrible', 'awful']
                                                  };
                                                  
                                                  let sentiment = 'Neutral';
                                                  const leadText = leadMessages.map(m => m.text.toLowerCase()).join(' ');
                                                  if (sentimentWords.positive.some(word => leadText.includes(word))) {
                                                    sentiment = 'Positive';
                                                  } else if (sentimentWords.negative.some(word => leadText.includes(word))) {
                                                    sentiment = 'Negative';
                                                  }
                                                  
                                                  // Objections detection
                                                  const objections = [];
                                                  if (leadText.includes('expensive') || leadText.includes('cost')) objections.push('Price concern');
                                                  if (leadText.includes('far') || leadText.includes('location')) objections.push('Location concern');
                                                  if (leadText.includes('delay') || leadText.includes('late')) objections.push('Timeline concern');
                                                  
                                                  // Recommendation
                                                  let recommendation = 'Continue engagement';
                                                  if (selectedConv.score >= 85) recommendation = 'Schedule site visit';
                                                  else if (selectedConv.score >= 70) recommendation = 'Share detailed information';
                                                  else if (selectedConv.score < 60) recommendation = 'Address concerns first';
                                                  
                                                  // Conversion chance
                                                  const conversionChance = selectedConv.score >= 85 ? 'High (80-90%)' : 
                                                                         selectedConv.score >= 70 ? 'Medium (60-75%)' : 
                                                                         selectedConv.score >= 60 ? 'Low (40-55%)' : 'Very Low (<40%)';
                                                  
                                                  return (
                                                    <>
                                                      <p><strong>Intent:</strong> {detectedIntent}</p>
                                                      <p><strong>Objections:</strong> {objections.length > 0 ? objections.join(', ') : 'None detected'}</p>
                                                      <p><strong>Recommendation:</strong> {recommendation}</p>
                                                      <p><strong>Conversion Chance:</strong> {conversionChance}</p>
                                                    </>
                                                  );
                                                })()}
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => {
                                            const sel = conversations.find(c => c.id === selectedConvoId);
                                            if (!sel) return;
                                            const rows = [
                                              ['Name','Status','Sentiment','Score','Channel','Time'],
                                              [sel.name, sel.status, sel.sentiment, String(sel.score), sel.channel, sel.time],
                                              [],
                                              ['Message History'],
                                              ['Sender','Message','Timestamp']
                                            ];
                                            
                                            sel.messages.forEach(msg => {
                                              rows.push([
                                                msg.sender === 'ai' ? 'Terra' : msg.sender === 'lead' ? sel.name : 'System',
                                                msg.text,
                                                new Date(msg.timestamp).toLocaleString()
                                              ]);
                                            });
                                            
                                            const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
                                            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `conversation-${sel.id}.csv`;
                                            a.click();
                                            URL.revokeObjectURL(url);
                                        }}>Export CSV</Button>
                                        <Button variant="outline" onClick={() => {
                                            const sel = conversations.find(c => c.id === selectedConvoId);
                                            if (!sel) return;
                                            const w = window.open('', '_blank');
                                            if (!w) return;
                                            
                                            let transcriptHtml = `
                                              <html>
                                                <head>
                                                  <title>Conversation Transcript - ${sel.name}</title>
                                                  <style>
                                                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                                                    .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                                                    .message { margin: 15px 0; padding: 10px; border-radius: 5px; }
                                                    .ai-message { background: #f5f5f5; margin-right: 50px; }
                                                    .lead-message { background: #e3f2fd; margin-left: 50px; text-align: right; }
                                                    .timestamp { font-size: 0.8em; color: #666; margin-top: 5px; }
                                                    .metadata { background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                                                  </style>
                                                </head>
                                                <body>
                                                  <div class="header">
                                                    <h1>Conversation Transcript</h1>
                                                    <h2>${sel.name}</h2>
                                                  </div>
                                                  
                                                  <div class="metadata">
                                                    <p><strong>Status:</strong> ${sel.status}</p>
                                                    <p><strong>Channel:</strong> ${sel.channel}</p>
                                                    <p><strong>Sentiment:</strong> ${sel.sentiment}</p>
                                                    <p><strong>Score:</strong> ${sel.score}/100</p>
                                                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                                                  </div>
                                                  
                                                  <h3>Message History</h3>
                                            `;
                                            
                                            sel.messages.forEach(msg => {
                                              const senderName = msg.sender === 'ai' ? 'Terra' : msg.sender === 'lead' ? sel.name : 'System';
                                              const messageClass = msg.sender === 'ai' ? 'ai-message' : msg.sender === 'lead' ? 'lead-message' : 'system-message';
                                              
                                              transcriptHtml += `
                                                <div class="message ${messageClass}">
                                                  <strong>${senderName}</strong>
                                                  <div>${msg.text}</div>
                                                  <div class="timestamp">${new Date(msg.timestamp).toLocaleString()}</div>
                                                </div>
                                              `;
                                            });
                                            
                                            transcriptHtml += `
                                                </body>
                                              </html>
                                            `;
                                            
                                            w.document.write(transcriptHtml);
                                            w.document.close();
                                            w.print();
                                        }}>Export PDF</Button>
                                    </div>
                                </div>
                            </ScrollArea>
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
