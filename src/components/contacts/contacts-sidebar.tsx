
"use client";

import React from 'react';
import AppIcon from './app-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const ContactsSidebar = ({ contacts, filters, onFiltersChange }: { contacts: any[], filters: any, onFiltersChange: (filters: any) => void }) => {
  const getCategoryCount = (category: string) => {
    return contacts?.filter(contact => contact?.category === category)?.length || 0;
  };

  const getStatusCount = (status: string) => {
    return contacts?.filter(contact => contact?.status === status)?.length || 0;
  };

  const getTagCount = (tag: string) => {
    return contacts?.filter(contact => contact?.tags?.includes(tag))?.length || 0;
  };

  const handleCategoryClick = (category: string) => {
    onFiltersChange?.({
      ...filters,
      category: category
    });
  };

  const handleStatusClick = (status: string) => {
    onFiltersChange?.({
      ...filters,
      status: status
    });
  };

  const allTags = [...new Set(contacts?.flatMap(contact => contact?.tags || []))];

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <Accordion type="multiple" defaultValue={["categories", "status"]}>
          {/* Contact Categories */}
          <AccordionItem value="categories">
            <AccordionTrigger>
                <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <AppIcon name="Users" size={16} />
                    <span>Categories</span>
                </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.category === 'all' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span>All Contacts</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {contacts?.length}
                  </span>
                </button>
                
                <button
                  onClick={() => handleCategoryClick('buyer')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.category === 'buyer' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AppIcon name="Home" size={14} />
                    <span>Buyers</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getCategoryCount('buyer')}
                  </span>
                </button>
                
                <button
                  onClick={() => handleCategoryClick('seller')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.category === 'seller' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AppIcon name="Tag" size={14} />
                    <span>Sellers</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getCategoryCount('seller')}
                  </span>
                </button>
                
                <button
                  onClick={() => handleCategoryClick('investor')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.category === 'investor' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AppIcon name="TrendingUp" size={14} />
                    <span>Investors</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getCategoryCount('investor')}
                  </span>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Lead Status */}
          <AccordionItem value="status">
            <AccordionTrigger>
                <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <AppIcon name="Target" size={16} />
                    <span>Lead Status</span>
                </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleStatusClick('hot_lead')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.status === 'hot_lead' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Hot Leads</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getStatusCount('hot_lead')}
                  </span>
                </button>
                
                <button
                  onClick={() => handleStatusClick('warm_lead')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.status === 'warm_lead' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Warm Leads</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getStatusCount('warm_lead')}
                  </span>
                </button>
                
                <button
                  onClick={() => handleStatusClick('cold_lead')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.status === 'cold_lead' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Cold Leads</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getStatusCount('cold_lead')}
                  </span>
                </button>
                
                <button
                  onClick={() => handleStatusClick('client')}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                    filters?.status === 'client' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active Clients</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {getStatusCount('client')}
                  </span>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Popular Tags */}
          <AccordionItem value="tags">
             <AccordionTrigger>
                <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <AppIcon name="Hash" size={16} />
                    <span>Tags</span>
                </h3>
             </AccordionTrigger>
             <AccordionContent>
                <div className="space-y-2 pt-2">
                    {allTags?.slice(0, 8)?.map((tag) => (
                    <button
                        key={tag}
                        className="w-full flex items-center justify-between p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <span>{tag}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {getTagCount(tag)}
                        </span>
                    </button>
                    ))}
                </div>
             </AccordionContent>
          </AccordionItem>

          {/* Saved Searches */}
           <AccordionItem value="saved-searches">
             <AccordionTrigger>
                <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <AppIcon name="Bookmark" size={16} />
                    <span>Saved Searches</span>
                </h3>
             </AccordionTrigger>
             <AccordionContent>
                <div className="space-y-2 pt-2">
                    <button className="w-full flex items-center justify-between p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <span>High Value Buyers</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">12</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <span>Mumbai Sellers</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">8</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <span>Inactive 30+ Days</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">5</span>
                    </button>
                </div>
             </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
