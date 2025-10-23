
"use client";

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export const LeadCalendarView = ({ leads, onLeadClick }: { leads: any[], onLeadClick: (lead: any) => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const leadsByDate = leads.reduce((acc, lead) => {
    const activityDate = new Date(lead.lastActivity).toDateString();
    if (!acc[activityDate]) {
      acc[activityDate] = [];
    }
    acc[activityDate].push(lead);
    return acc;
  }, {} as { [key: string]: any[] });

  const selectedDateString = date?.toDateString();
  const leadsForSelectedDate = selectedDateString ? leadsByDate[selectedDateString] || [] : [];
  
  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
        new: 'bg-blue-500',
        contacted: 'bg-yellow-500',
        qualified: 'bg-orange-500',
        proposal: 'bg-purple-500',
        negotiation: 'bg-red-500',
        closed: 'bg-green-500',
    };
    return colors[stage] || 'bg-gray-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 h-full">
      <Card className="md:col-span-7 flex flex-col h-full">
        <CardHeader>
          <CardTitle>Leads Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
           <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 h-full w-full"
            classNames={{
                root: 'flex flex-col h-full',
                months: 'flex-1',
                month: 'flex flex-col h-full',
                table: 'flex-1 border-collapse',
                head_row: 'flex',
                row: 'flex w-full mt-2',
                day_cell: 'h-auto w-full text-center text-sm p-1 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
                day: 'h-24 w-full p-1 font-normal aria-selected:opacity-100 flex flex-col items-start justify-start',
            }}
            components={{
              DayContent: ({ date }) => {
                const dailyLeads = leadsByDate[date.toDateString()];
                return (
                  <>
                    <div className="self-start">{date.getDate()}</div>
                    {dailyLeads && (
                      <div className="flex flex-wrap mt-1 gap-1">
                        {dailyLeads.slice(0, 4).map(lead => (
                           <Avatar key={lead.id} className="h-6 w-6 border-2 border-background">
                             <AvatarImage src={lead.profileImage} alt={lead.name} />
                             <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                        ))}
                         {dailyLeads.length > 4 && (
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                            +{dailyLeads.length - 4}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              },
            }}
          />
        </CardContent>
      </Card>
      <Card className="md:col-span-5 flex flex-col h-full">
        <CardHeader>
          <CardTitle>
            Activities for {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {leadsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {leadsForSelectedDate.map(lead => (
                  <div key={lead.id} className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted" onClick={() => onLeadClick(lead)}>
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.profileImage} alt={lead.name} />
                            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                         </Avatar>
                        <span className="font-semibold text-sm">{lead.name}</span>
                       </div>
                      <Badge variant="outline" className={`capitalize border-0 ${getStageColor(lead.stage)} text-white`}>{lead.stage}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Next Action: {lead.nextAction}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last activity: {new Date(lead.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No activities for this day.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
