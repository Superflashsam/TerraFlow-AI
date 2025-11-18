"use client";

import React, { useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Booking = {
  id: string;
  date: Date;
  time: string;
  leadName: string;
  phone: string;
  property: string;
  agent: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  type: 'AI' | 'Manual';
};

const sample: Booking[] = [
  { id: 'b1', date: new Date(), time: '11:00 AM', leadName: 'Rajesh Kumar', phone: '+91 98765 43210', property: '3BHK Whitefield', agent: 'Anita', status: 'Confirmed', type: 'AI' },
  { id: 'b2', date: new Date(), time: '02:30 PM', leadName: 'Priya Sharma', phone: '+91 98765 00000', property: '2BHK Indiranagar', agent: 'Mohan', status: 'Pending', type: 'Manual' },
];

export function SchedulingTab() {
  const [value, setValue] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Booking | null>(null);
  const bookings = useMemo(() => sample.filter(b => b.date.toDateString() === value.toDateString()), [value]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Site Visit Calendar</CardTitle></CardHeader>
        <CardContent>
          <Calendar value={value} onChange={(d) => setValue(d as Date)} className="rounded-lg border" />
          <div className="mt-4 space-y-3">
            {bookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings for selected date.</p>}
            {bookings.map(b => (
              <Card key={b.id} className="p-4 cursor-pointer" onClick={() => setSelected(b)}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{b.time} · {b.leadName}</p>
                    <p className="text-xs text-muted-foreground">{b.property} · Agent: {b.agent}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={b.type === 'AI' ? 'bg-purple-100 text-purple-800 border-0' : 'bg-teal-100 text-teal-800 border-0'}>{b.type === 'AI' ? 'AI Scheduled' : 'Manual'}</Badge>
                    <Badge variant="outline" className="border-0">{b.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Booking Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {selected ? (
            <>
              <p className="text-sm"><strong>Lead:</strong> {selected.leadName} ({selected.phone})</p>
              <p className="text-sm"><strong>Property:</strong> {selected.property}</p>
              <p className="text-sm"><strong>Agent:</strong> {selected.agent}</p>
              <p className="text-sm"><strong>Status:</strong> {selected.status}</p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline">Reschedule</Button>
                <Button variant="outline">Cancel</Button>
                <Button>Add Notes</Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a booking to view details.</p>
          )}
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader><CardTitle>Scheduling Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Agent Availability</Label>
              <Select defaultValue="all"><SelectTrigger><SelectValue placeholder="Select agents"/></SelectTrigger><SelectContent><SelectItem value="all">All Agents</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2">
              <Label>Max bookings/day</Label>
              <Select defaultValue="8"><SelectTrigger><SelectValue placeholder="8"/></SelectTrigger><SelectContent><SelectItem value="8">8</SelectItem><SelectItem value="6">6</SelectItem><SelectItem value="10">10</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2">
              <Label>Minimum lead score</Label>
              <Select defaultValue="70"><SelectTrigger><SelectValue placeholder="70"/></SelectTrigger><SelectContent><SelectItem value="60">60</SelectItem><SelectItem value="70">70</SelectItem><SelectItem value="80">80</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Switch id="google-sync" defaultChecked/><Label htmlFor="google-sync">Sync Google Calendar</Label></div>
            <div className="flex items-center gap-2"><Switch id="outlook-sync"/><Label htmlFor="outlook-sync">Sync Outlook Calendar</Label></div>
            <div className="flex items-center gap-2"><Switch id="auto-confirm" defaultChecked/><Label htmlFor="auto-confirm">Auto-send confirmations</Label></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
