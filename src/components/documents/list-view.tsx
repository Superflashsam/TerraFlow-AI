
"use client";

import React, { useEffect, useState } from 'react';
import { Download, Share2, Star, MoreVertical, Link2 } from "lucide-react";
import type { Document } from "@/app/documents/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface DocumentListProps {
  documents: Document[];
  onDocumentSelect: (doc: Document) => void;
  selectedDocumentIds: string[];
  onCheckboxToggle: (docId: string | string[]) => void;
}

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return "text-red-500";
    case "docx":
    case "doc":
      return "text-blue-500";
    case "xlsx":
    case "xls":
      return "text-green-500";
    case "jpg":
    case "jpeg":
    case "png":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
};

const DraggableRow = ({ doc, selectedDocumentIds, onCheckboxToggle, onDocumentSelect }: { doc: Document, selectedDocumentIds: string[], onCheckboxToggle: any, onDocumentSelect: any }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: doc.id,
        data: { document: doc }
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            key={doc.id}
            className="border-border hover:bg-card/50 cursor-pointer group touch-none"
            onClick={() => onDocumentSelect(doc)}
        >
            <TableCell>
            <Checkbox
                checked={selectedDocumentIds.includes(doc.id)}
                onCheckedChange={() => onCheckboxToggle(doc.id)}
                onClick={(e) => e.stopPropagation()}
            />
            </TableCell>
            <TableCell>
            <div className="flex items-center gap-3">
                {doc.starred && <Star className="h-4 w-4 fill-primary text-primary" />}
                <span className="font-medium text-foreground">{doc.name}</span>
            </div>
            </TableCell>
            <TableCell>
            <span className={`font-medium ${getTypeColor(doc.type)}`}>{doc.type}</span>
            </TableCell>
            <TableCell className="text-muted-foreground">{doc.size}</TableCell>
            <TableCell className="text-muted-foreground">{doc.modified}</TableCell>
            <TableCell>
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                    {doc.uploadedBy.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{doc.uploadedBy.name}</span>
            </div>
            </TableCell>
            <TableCell>
            {doc.linkedTo && (
                <div className="flex items-center gap-2 text-sm text-primary">
                <Link2 className="h-3 w-3" />
                <span className="truncate">{doc.linkedTo.name}</span>
                </div>
            )}
            </TableCell>
            <TableCell>
            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                >
                <Download className="h-4 w-4" />
                </Button>
                <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                >
                <Share2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Preview</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </TableCell>
        </TableRow>
    );
};

export const DocumentList = ({
  documents,
  onDocumentSelect,
  selectedDocumentIds,
  onCheckboxToggle,
}: DocumentListProps) => {
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedDocumentIds.length > 0 && selectedDocumentIds.length === documents.length}
                onCheckedChange={(checked) => onCheckboxToggle(checked ? documents.map(d => d.id) : [])}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-24">Type</TableHead>
            <TableHead className="w-24">Size</TableHead>
            <TableHead className="w-40">Modified</TableHead>
            <TableHead className="w-40">Uploaded By</TableHead>
            <TableHead className="w-48">Linked To</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <DraggableRow 
                key={doc.id}
                doc={doc}
                selectedDocumentIds={selectedDocumentIds}
                onCheckboxToggle={onCheckboxToggle}
                onDocumentSelect={onDocumentSelect}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
