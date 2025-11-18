"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Metrics = {
  conversationsToday: number;
  qualified: number;
  scheduled: number;
  responseTime: string;
};

export function useTerraRealtime() {
  const [metrics, setMetrics] = useState<Metrics>({ conversationsToday: 247, qualified: 89, scheduled: 24, responseTime: '< 30 seconds' });
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    fetch('/api/socketio');
    const s = io('', { path: '/api/socketio' });
    setSocket(s);
    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('metrics:update', (m: Metrics) => setMetrics(m));
    return () => { s.close(); };
  }, []);

  return { metrics, connected, socket };
}

