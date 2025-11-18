"use client";
import { useState, useEffect } from "react";
import { Bot, Send, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
type AiLeadQualificationOutput = {
  budget: string;
  location: string;
  timeline: string;
  siteVisitBooking?: string;
  qualified: boolean;
  summary: string;
};
import { useToast } from "@/hooks/use-toast";

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      { sender: 'ai', text: "Hello! I'm Terra, your AI assistant. How can I help you qualify a lead today? Tell me about your prospect." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);
    window.addEventListener('open-terra-chat', openHandler as EventListener);
    window.addEventListener('close-terra-chat', closeHandler as EventListener);
    return () => {
      window.removeEventListener('open-terra-chat', openHandler as EventListener);
      window.removeEventListener('close-terra-chat', closeHandler as EventListener);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const fullConversation = [...messages, userMessage].map(m => `${m.sender}: ${m.text}`).join('\n');
        const res = await fetch('/api/ai/lead-qualification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userDetails: fullConversation }),
        });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const result: AiLeadQualificationOutput = await res.json();

        let aiResponse = result.summary;
        if (result.siteVisitBooking) {
          aiResponse += `\n\nSite Visit: ${result.siteVisitBooking}`;
        }

        const aiMessage: Message = { sender: 'ai', text: aiResponse };
        setMessages(prev => [...prev, aiMessage]);

        if (result.qualified) {
          toast({
            title: 'Lead Qualified!',
            description: `Budget: ${result.budget}, Location: ${result.location}, Timeline: ${result.timeline}`,
          });
        }

    } catch (error) {
        console.error("AI Lead Qualification Error:", error);
        const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not communicate with the AI assistant.'
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-8 right-8 rounded-full h-16 w-16 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="h-8 w-8" />
        <span className="sr-only">Open AI Chat Assistant</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-8 right-8 w-96 h-[600px] shadow-2xl flex flex-col z-50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback><Bot/></AvatarFallback>
            </Avatar>
            <CardTitle>Terra Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                         {message.sender === 'ai' && <Avatar className="h-8 w-8 border"><AvatarFallback><Bot/></AvatarFallback></Avatar>}
                        <div className={`rounded-lg p-3 text-sm max-w-xs ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {message.text}
                        </div>
                        {message.sender === 'user' && <Avatar className="h-8 w-8"><AvatarFallback><User/></AvatarFallback></Avatar>}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border"><AvatarFallback><Bot/></AvatarFallback></Avatar>
                        <div className="rounded-lg p-3 text-sm bg-muted animate-pulse">Thinking...</div>
                    </div>
                )}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
