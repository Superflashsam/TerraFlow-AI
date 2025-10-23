
"use client";
import React from 'react';

export const PipelineBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 px-6 pb-6 overflow-x-auto">
      <div className="flex gap-4 min-w-max pb-4">
        {children}
      </div>
    </div>
  );
};
