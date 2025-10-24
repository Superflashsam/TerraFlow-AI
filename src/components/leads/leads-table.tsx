
"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreVertical, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { LeadScoreBadge } from './lead-score-badge';
import { LeadStatusBadge } from './lead-status-badge';
import { LeadContextMenu } from './lead-context-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const LeadTable = ({
  leads,
  selectedLeads,
  onSelectionChange,
  filters,
}: {
  leads: any[];
  selectedLeads: string[];
  onSelectionChange: (ids: string[]) => void;
  filters: any;
}) => {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: 'lastContact', direction: 'desc' });
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    position: { x: number; y: number } | null;
    lead: any | null;
  }>({ show: false, position: null, lead: null });

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = [...leads];

    // Apply filters
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead: any) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query)
      );
    }
    
    if (filters.source) {
      filtered = filtered.filter(lead => lead.source === filters.source);
    }

    if (filters.scoreRange) {
      const [min, max] = filters.scoreRange.split('-').map(Number);
      filtered = filtered.filter(lead => lead.aiScore >= min && lead.aiScore <= max);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(lead => lead.propertyInterest === filters.propertyType);
    }

    if (filters.location) {
      filtered = filtered.filter(lead => lead.location === filters.location);
    }

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'lastContact') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [leads, filters, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked) {
      onSelectionChange(filteredAndSortedLeads.map((lead) => lead.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedLeads, leadId]);
    } else {
      onSelectionChange(selectedLeads.filter((id) => id !== leadId));
    }
  };

  const handleRowClick = (lead: any, event: React.MouseEvent) => {
     if ((event.target as HTMLElement).closest('[data-noclick]')) {
      return;
    }
    router.push(`/lead-detail?leadId=${lead.id}`);
  };

  const handleContextMenu = (
    event: React.MouseEvent,
    lead: any
  ) => {
    event.preventDefault();
    setContextMenu({
      show: true,
      position: { x: event.clientX, y: event.clientY },
      lead,
    });
  };

  const handleContextAction = (action: string, lead: any) => {
    console.log(`Action: ${action} for lead:`, lead);
    switch (action) {
      case 'view':
        router.push(`/lead-detail?leadId=${lead.id}`);
        break;
      case 'call':
        window.open(`tel:${lead.phone}`);
        break;
      case 'email':
        window.open(`mailto:${lead.email}`);
        break;
      default:
        console.log(`Handling ${action} for lead ${lead.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="text-primary" />
    ) : (
      <ArrowDown size={14} className="text-primary" />
    );
  };

  const isAllSelected =
    filteredAndSortedLeads.length > 0 &&
    filteredAndSortedLeads.every((lead) => selectedLeads.includes(lead.id));
    
  const isIndeterminate = selectedLeads.length > 0 && !isAllSelected;


  return (
    <>
      <div className="overflow-y-auto flex-1">
        <table className="w-full">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected || isIndeterminate}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  <span>Lead Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="font-medium text-foreground">Contact</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="font-medium text-foreground">
                  Property Interest
                </span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('aiScore')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  <span>AI Score</span>
                  {getSortIcon('aiScore')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastContact')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  <span>Last Contact</span>
                  {getSortIcon('lastContact')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="font-medium text-foreground">Status</span>
              </th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                onClick={(e) => handleRowClick(lead, e)}
                onContextMenu={(e) => handleContextMenu(e, lead)}
              >
                <td className="px-4 py-4" data-noclick>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={(checked) =>
                      handleSelectLead(lead.id, !!checked)
                    }
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarFallback>{lead.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.source}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-foreground">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.phone}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {lead.propertyInterest.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lead.location}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <LeadScoreBadge score={lead.aiScore} size="sm" />
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-foreground">
                    {formatDate(lead.lastContact)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <LeadStatusBadge status={lead.status} size="sm" />
                </td>
                <td className="px-4 py-4" data-noclick>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContextMenu(e, lead);
                    }}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAndSortedLeads.length === 0 && (
            <div className="text-center py-12">
            <Users size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
                No leads found
            </h3>
            <p className="text-muted-foreground mb-4">
                Try adjusting your filters or add new leads to get started.
            </p>
            <Button variant="outline">Clear Filters</Button>
            </div>
        )}
      </div>


      {contextMenu.show && (
        <LeadContextMenu
          lead={contextMenu.lead}
          position={contextMenu.position}
          onClose={() => setContextMenu({ show: false, position: null, lead: null })}
          onAction={handleContextAction}
        />
      )}
    </>
  );
};

export { LeadTable };
