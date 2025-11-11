
"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DocumentsSidebar } from "@/components/documents/sidebar";
import { DocumentsTopBar } from "@/components/documents/top-bar";
import { FilterBar } from "@/components/documents/filter-bar";
import { DocumentGrid } from "@/components/documents/grid-view";
import { DocumentList } from "@/components/documents/list-view";
import { DocumentDetailPanel } from "@/components/documents/detail-panel";
import { UploadModal } from "@/components/documents/upload-modal";
import { BulkActionsBar } from "@/components/documents/bulk-actions";
import { documents as mockDocuments } from "@/lib/placeholder-data";
import { useDebounce } from "@/hooks/use-debounce";

export type ViewMode = "grid" | "list";
export type Document = typeof mockDocuments[0];

const DocumentsPage = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    fileType: "all",
    dateRange: { from: undefined, to: undefined },
    size: "any",
    sort: { key: 'modified', direction: 'desc' }
  });

  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);

  const filteredDocuments = React.useMemo(() => {
    let filtered = documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesFileType = filters.fileType === "all" || doc.type.toLowerCase() === filters.fileType.toLowerCase();
      
      const modifiedDate = new Date(doc.modified);
      const matchesDate = (!filters.dateRange.from || modifiedDate >= filters.dateRange.from) && 
                          (!filters.dateRange.to || modifiedDate <= filters.dateRange.to);

      const sizeInKb = parseFloat(doc.size) * (doc.size.includes('MB') ? 1024 : 1);
      const matchesSize = filters.size === 'any' ||
                          (filters.size === 'small' && sizeInKb < 1024) ||
                          (filters.size === 'medium' && sizeInKb >= 1024 && sizeInKb <= 10240) ||
                          (filters.size === 'large' && sizeInKb > 10240);

      return matchesSearch && matchesFileType && matchesDate && matchesSize;
    });

    filtered.sort((a, b) => {
        const { key, direction } = filters.sort;
        const valA = a[key as keyof Document];
        const valB = b[key as keyof Document];
        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
        return direction === 'desc' ? comparison * -1 : comparison;
    });

    return filtered;
  }, [documents, debouncedSearchQuery, filters]);


  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleCheckboxToggle = (docId: string) => {
    setSelectedDocumentIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleClearSelection = () => {
    setSelectedDocumentIds([]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
        setDocuments((docs) => {
            const oldIndex = docs.findIndex(d => d.id === active.id);
            const newIndex = docs.findIndex(d => d.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
              return arrayMove(docs, oldIndex, newIndex);
            }
            return docs;
        });
    }
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen w-full bg-background">
        {/* Left Sidebar */}
        <DocumentsSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DocumentsTopBar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onUploadClick={() => setIsUploadModalOpen(true)}
          />

          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
          />

          {/* Documents Display */}
          <div className="flex-1 overflow-auto">
            {viewMode === "grid" ? (
              <DocumentGrid
                documents={filteredDocuments}
                onDocumentSelect={handleDocumentSelect}
                selectedDocumentIds={selectedDocumentIds}
                onCheckboxToggle={handleCheckboxToggle}
              />
            ) : (
              <DocumentList
                documents={filteredDocuments}
                onDocumentSelect={handleDocumentSelect}
                selectedDocumentIds={selectedDocumentIds}
                onCheckboxToggle={handleCheckboxToggle}
              />
            )}
          </div>

          {/* Bulk Actions Bar */}
          {selectedDocumentIds.length > 0 && (
            <BulkActionsBar
              selectedCount={selectedDocumentIds.length}
              onClearSelection={handleClearSelection}
            />
          )}
        </div>

        {/* Right Detail Panel */}
        {selectedDocument && (
          <DocumentDetailPanel
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}

        {/* Upload Modal */}
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={() => {}}
        />
      </div>
    </DndContext>
  );
};

export default DocumentsPage;
