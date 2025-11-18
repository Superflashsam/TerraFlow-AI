"use client";

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export type TerraMessage = {
  id: string;
  sender: 'ai' | 'lead' | 'system';
  text: string;
  timestamp: string;
  intent?: string;
  sentiment?: string;
};

export type TerraConversation = {
  id: string;
  name: string;
  avatar: string;
  status: 'Active' | 'Qualified' | 'Scheduled' | 'Unresponsive';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  lastMessage: string;
  time: string;
  channel: 'WhatsApp' | 'Webchat' | 'SMS';
  messages: TerraMessage[];
};

export type SchedulingEvent = {
  conversationId: string;
  leadName: string;
  leadScore: number;
  reason: string;
  timestamp: string;
};

export function useTerraConversations() {
  const [conversations, setConversations] = useState<TerraConversation[]>([]);
  const [connected, setConnected] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<TerraMessage | null>(null);
  const [schedulingEvents, setSchedulingEvents] = useState<SchedulingEvent[]>([]);

  useEffect(() => {
    fetch('/api/socketio');
    const s = io('', { path: '/api/socketio' });
    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('conversation:bootstrap', (list: TerraConversation[]) => setConversations(list));
    s.on('conversation:update', (c: TerraConversation) => {
      setConversations(prev => {
        const idx = prev.findIndex(p => p.id === c.id);
        if (idx >= 0) {
          const copy = prev.slice();
          copy[idx] = c;
          return copy;
        }
        return [c, ...prev];
      });
    });
    s.on('conversation:message', (data: { conversationId: string; message: TerraMessage }) => {
      setConversations(prev => {
        const idx = prev.findIndex(p => p.id === data.conversationId);
        if (idx >= 0) {
          const copy = prev.slice();
          const conv = { ...copy[idx] };
          conv.messages = [...conv.messages, data.message];
          conv.lastMessage = data.message.text;
          copy[idx] = conv;
          return copy;
        }
        return prev;
      });
    });
    s.on('conversation:message:stream:start', (data: { conversationId: string; message: TerraMessage }) => {
      setStreamingMessage(data.message);
    });
    s.on('conversation:message:stream:chunk', (data: { conversationId: string; chunk: string }) => {
      setStreamingMessage(prev => prev ? { ...prev, text: prev.text + data.chunk } : null);
    });
    s.on('conversation:message:stream:end', () => {
      setStreamingMessage(null);
    });
    s.on('scheduling:triggered', (event: Omit<SchedulingEvent, 'timestamp'>) => {
      setSchedulingEvents(prev => [...prev, { ...event, timestamp: new Date().toISOString() }]);
    });
    return () => { s.close(); };
  }, []);

  return { conversations, connected, streamingMessage, schedulingEvents };
}

