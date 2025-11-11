"use client";

import React from 'react';
import { DocumentCard } from './document-card';

export const DocumentGrid = ({ documents, onSelect, onCheckboxChange, selectedDocuments }: { documents: any[]; onSelect: (doc: any) => void; onCheckboxChange: (docId: string, isChecked: boolean) => void; selectedDocuments: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map(doc => (
            <DocumentCard 
                key={doc.id} 
                document={doc} 
                onSelect={() => onSelect(doc)}
                onCheckboxChange={(isChecked) => onCheckboxChange(doc.id, isChecked)}
                isSelected={selectedDocuments.includes(doc.id)}
            />
        ))}
    </div>
  )
}
