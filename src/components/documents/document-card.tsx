
"use client";

import { useState } from "react";
import {
  FileText,
  Image,
  FileSpreadsheet,
  Download,
  Share2,
  Star,
  MoreVertical,
  Link2,
} from "lucide-react";
import type { Document } from "@/app/documents/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DocumentCardProps {
  document: Document;
  onSelect: (doc: Document) => void;
  isSelected: boolean;
  onCheckboxToggle: (docId: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="h-12 w-12 text-red-500" />;
    case "docx":
    case "doc":
      return <FileText className="h-12 w-12 text-blue-500" />;
    case "xlsx":
    case "xls":
      return <FileSpreadsheet className="h-12 w-12 text-green-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <Image className="h-12 w-12 text-purple-500" />;
    default:
      return <FileText className="h-12 w-12 text-gray-500" />;
  }
};

export const DocumentCard = ({
  document,
  onSelect,
  isSelected,
  onCheckboxToggle,
}: DocumentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isStarred, setIsStarred] = useState(document.starred);
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: document.id,
    data: { document },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="relative bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer group touch-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(document)}
    >
      {/* Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onCheckboxToggle(document.id)}
          onClick={(e) => e.stopPropagation()}
          className={`${isHovered || isSelected ? "opacity-100" : "opacity-0"} transition-opacity`}
        />
      </div>

      {/* Actions */}
      {isHovered && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-card/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-card/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-card/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsStarred(!isStarred);
            }}
          >
            <Star className={`h-4 w-4 ${isStarred ? "fill-primary text-primary" : ""}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button size="icon" variant="ghost" className="h-8 w-8 bg-card/80 backdrop-blur-sm">
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
      )}

      {/* File Icon */}
      <div className="flex justify-center mb-3 mt-6">{getFileIcon(document.type)}</div>

      {/* File Name */}
      <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2 text-center">
        {document.name}
      </h3>

      {/* Metadata */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>{document.size}</span>
          <span>{document.modified}</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[10px]">
              {document.uploadedBy.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{document.uploadedBy.name}</span>
        </div>
      </div>

      {/* Linked Entity */}
      {document.linkedTo && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-primary">
          <Link2 className="h-3 w-3" />
          <span className="truncate">Linked to: {document.linkedTo.name}</span>
        </div>
      )}
    </div>
  );
};
