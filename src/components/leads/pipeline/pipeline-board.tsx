
"use client";
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const PipelineBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="flex h-full p-6 space-x-4 min-w-max">
        {children}
      </div>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  );
};
