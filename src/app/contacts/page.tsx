
"use client";

import React, { useState, useEffect } from 'react';
import { ContactsTable } from '@/components/contacts/contacts-table';
import { ContactsSidebar } from '@/components/contacts/contacts-sidebar';
import { ContactsHeader } from '@/components/contacts/contacts-header';
import { ContactDetailsPanel } from '@/components/contacts/contact-details-panel';
import { BulkActionsModal } from '@/components/contacts/bulk-actions-modal';

const CRMContactsHub = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    tags: []
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  // Mock contact data
  useEffect(() => {
    const mockContacts = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      company: 'Tech Solutions Pvt Ltd',
      status: 'hot_lead',
      category: 'buyer',
      lastInteraction: '2025-01-15',
      relationshipStrength: 85,
      dealValue: '₹2.5 Cr',
      profileImage: "https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?w=150&h=150&fit=crop&crop=face",
      alt: 'Professional headshot of Rajesh Kumar in business attire',
      tags: ['High Value', 'Mumbai'],
      interactionCount: 12,
      properties: ['3 BHK Andheri', '2 BHK Bandra']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      company: 'Marketing Agency',
      status: 'warm_lead',
      category: 'seller',
      lastInteraction: '2025-01-12',
      relationshipStrength: 72,
      dealValue: '₹1.8 Cr',
      profileImage: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=150&h=150&fit=crop&crop=face",
      alt: 'Professional photo of Priya Sharma smiling in office setting',
      tags: ['Quick Sale', 'Delhi'],
      interactionCount: 8,
      properties: ['4 BHK Gurgaon']
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      company: 'Construction Corp',
      status: 'cold_lead',
      category: 'investor',
      lastInteraction: '2025-01-08',
      relationshipStrength: 45,
      dealValue: '₹5.2 Cr',
      profileImage: "https://images.unsplash.com/photo-1580130379601-1a28f2e8df4a?w=150&h=150&fit=crop&crop=face",
      alt: 'Business portrait of Amit Patel in formal suit',
      tags: ['Bulk Purchase', 'Pune'],
      interactionCount: 15,
      properties: ['Commercial Complex', 'Residential Tower']
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      email: 'sunita.reddy@email.com',
      phone: '+91 65432 10987',
      company: 'IT Services Ltd',
      status: 'client',
      category: 'buyer',
      lastInteraction: '2025-01-14',
      relationshipStrength: 92,
      dealValue: '₹3.1 Cr',
      profileImage: "https://images.unsplash.com/photo-1498200705497-2c9e717e5ab8?w=150&h=150&fit=crop&crop=face",
      alt: 'Executive headshot of Sunita Reddy in professional business attire',
      tags: ['Repeat Client', 'Bangalore'],
      interactionCount: 25,
      properties: ['Luxury Villa', '3 BHK Apartment']
    }];

    setContacts(mockContacts);
  }, []);

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts((prev) => {
      if (prev?.includes(contactId)) {
        return prev?.filter((id) => id !== contactId);
      }
      return [...prev, contactId];
    });
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedContacts(filteredAndSortedContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setIsPanelOpen(true);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'on contacts:', selectedContacts);
    setIsBulkModalOpen(false);
    setSelectedContacts([]);
  };

  // Filter and sort contacts
  const filteredAndSortedContacts = contacts?.
  filter((contact) => {
    if (filters?.search && !contact?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !contact?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !contact?.company?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.category !== 'all' && contact?.category !== filters?.category) {
      return false;
    }
    if (filters?.status !== 'all' && contact?.status !== filters?.status) {
      return false;
    }
    return true;
  })?.
  sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];

    if (sortConfig?.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return (
    <>
      <div className="flex flex-col h-full">
          {/* Contacts Header */}
          <ContactsHeader
            selectedCount={selectedContacts?.length}
            totalCount={contacts?.length}
            onFiltersChange={handleFiltersChange}
            onBulkActions={() => setIsBulkModalOpen(true)} />


          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <ContactsSidebar
              contacts={contacts}
              filters={filters}
              onFiltersChange={handleFiltersChange} />


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              <ContactsTable
                contacts={filteredAndSortedContacts}
                selectedContacts={selectedContacts}
                sortConfig={sortConfig}
                onContactSelect={handleContactSelect}
                onSelectAll={handleSelectAll}
                onContactClick={handleContactClick}
                onSortChange={handleSortChange} />

            </div>

            {/* Contact Details Panel */}
            {isPanelOpen &&
            <ContactDetailsPanel
              contact={selectedContact}
              onClose={() => setIsPanelOpen(false)} />

            }
          </div>

          {/* Bulk Actions Modal */}
          {isBulkModalOpen &&
          <BulkActionsModal
            selectedCount={selectedContacts?.length}
            onAction={handleBulkAction}
            onClose={() => setIsBulkModalOpen(false)} />

          }
      </div>
    </>
  );
};

export default CRMContactsHub;
