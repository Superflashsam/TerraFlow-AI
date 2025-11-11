"use client";

import type { Document } from "@/app/documents/page";
import { DocumentCard } from "./document-card";

interface DocumentGridProps {
  documents: Document[];
  onDocumentSelect: (doc: Document) => void;
  selectedDocumentIds: string[];
  onCheckboxToggle: (docId: string) => void;
}

export const DocumentGrid = ({
  documents,
  onDocumentSelect,
  selectedDocumentIds,
  onCheckboxToggle,
}: DocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onSelect={onDocumentSelect}
          isSelected={selectedDocumentIds.includes(doc.id)}
          onCheckboxToggle={onCheckboxToggle}
        />
      ))}
    </div>
  );
};
