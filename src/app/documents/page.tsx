"use client";

import { useState } from "react";
import { DocumentsSidebar } from "@/components/documents/sidebar";
import { DocumentsTopBar } from "@/components/documents/top-bar";
import { FilterBar } from "@/components/documents/filter-bar";
import { DocumentGrid } from "@/components/documents/grid-view";
import { DocumentList } from "@/components/documents/list-view";
import { DocumentDetailPanel } from "@/components/documents/detail-panel";
import { UploadModal } from "@/components/documents/upload-modal";
import { BulkActionsBar } from "@/components/documents/bulk-actions";
import { documents as mockDocuments } from "@/lib/placeholder-data";

export type ViewMode = "grid" | "list";
export type Document = typeof mockDocuments[0];

const DocumentsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const [modifiedFilter, setModifiedFilter] = useState("any");
  const [sizeFilter, setSizeFilter] = useState("any");

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFileType = fileTypeFilter === "all" || doc.type.toLowerCase() === fileTypeFilter.toLowerCase();
    return matchesSearch && matchesFileType;
  });

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

  return (
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          fileTypeFilter={fileTypeFilter}
          onFileTypeChange={setFileTypeFilter}
          modifiedFilter={modifiedFilter}
          onModifiedChange={setModifiedFilter}
          sizeFilter={sizeFilter}
          onSizeChange={setSizeFilter}
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
  );
};

export default DocumentsPage;
