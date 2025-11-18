
"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameMonth, isToday, startOfMonth, startOfToday } from 'date-fns';

export const LeadCalendarView = ({ leads, onLeadClick }: { leads: any[], onLeadClick: (lead: any) => void }) => {
  let today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = startOfMonth(new Date(currentMonth));

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const leadsByDate = leads.reduce((acc, lead) => {
    const activityDate = new Date(lead.lastActivity).toDateString();
    if (!acc[activityDate]) {
      acc[activityDate] = [];
    }
    acc[activityDate].push(lead);
    return acc;
  }, {} as { [key: string]: any[] });
  
  const leadsForSelectedDate = leadsByDate[selectedDay.toDateString()] || [];

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
  
  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

  return (
    <div className="flex-1 px-6 pb-6 overflow-hidden h-full">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-semibold">Leads Calendar</h3>
            <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-muted rounded-lg" onClick={previousMonth}>
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="text-lg font-medium">{format(firstDayCurrentMonth, 'MMMM yyyy')}</h4>
                <button className="p-2 hover:bg-muted rounded-lg" onClick={nextMonth}>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, dayIdx) => {
              const dailyLeads = leadsByDate[day.toDateString()];
              return (
                <div
                  key={day.toString()}
                  className={`
                    p-2 rounded-lg text-sm flex flex-col aspect-square
                    ${dayIdx === 0 && colStartClasses[getDay(day)]}
                    ${!isSameMonth(day, firstDayCurrentMonth) && 'text-muted-foreground/50'}
                    ${isEqual(day, selectedDay) && 'bg-primary/10 ring-2 ring-primary'}
                    ${!isEqual(day, selectedDay) && isToday(day) && 'bg-accent text-accent-foreground'}
                    ${!isEqual(day, selectedDay) && !isToday(day) && 'hover:bg-muted'}
                    transition-all cursor-pointer
                  `}
                  onClick={() => setSelectedDay(day)}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')} className="font-semibold">
                    {format(day, 'd')}
                  </time>
                  {dailyLeads && (
                    <div className="flex flex-wrap -space-x-2 mt-2">
                      {dailyLeads.slice(0, 3).map((lead: any) => (
                        <Avatar key={lead.id} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={lead.profileImage} alt={lead.name} />
                          <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {dailyLeads.length > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs ring-2 ring-background">
                          +{dailyLeads.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-card rounded-xl p-6 border border-border overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Activities</h3>
            <span className="text-sm text-muted-foreground">{format(selectedDay, "E, MMM d")}</span>
          </div>
          
          <div className="space-y-4">
            {leadsForSelectedDate.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">No activities for this day</p>
              </div>
            ) : (
              leadsForSelectedDate.map((lead: any) => (
                <div key={lead.id} className="bg-muted/50 rounded-lg p-3 border border-border hover:border-primary/50 cursor-pointer" onClick={() => onLeadClick(lead)}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.profileImage} alt={lead.name} />
                        <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">{lead.name}</span>
                    </div>
                    <Badge variant="outline" className={`capitalize border-0 text-white text-xs ${getStageColor(lead.stage)}`}>{lead.stage}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Next Action: {lead.nextAction}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last activity: {new Date(lead.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
