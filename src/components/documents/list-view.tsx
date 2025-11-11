"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, MoreHorizontal, Share, Star } from 'lucide-react';
import { getImagePlaceholder } from '@/lib/placeholder-images';

export const DocumentList = ({ documents, onSelect, onCheckboxChange, selectedDocuments, onSelectAll }: { documents: any[]; onSelect: (doc: any) => void; onCheckboxChange: (docId: string, isChecked: boolean) => void; selectedDocuments: string[]; onSelectAll: (checked: boolean) => void; }) => {
    const isAllSelected = documents.length > 0 && selectedDocuments.length === documents.length;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]"><Checkbox checked={isAllSelected} onCheckedChange={(checked) => onSelectAll(!!checked)} /></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Uploaded by</TableHead>
                    <TableHead>Linked to</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documents.map(doc => (
                    <TableRow key={doc.id} onClick={() => onSelect(doc)} className="cursor-pointer">
                        <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox 
                                checked={selectedDocuments.includes(doc.id)} 
                                onCheckedChange={(checked) => onCheckboxChange(doc.id, !!checked)}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.modified}</TableCell>
                        <TableCell>
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={getImagePlaceholder(doc.uploadedBy.avatarId)?.imageUrl} />
                                <AvatarFallback>{doc.uploadedBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{doc.linkedTo.name}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
                           <Button variant="ghost" size="icon"><Share className="h-4 w-4"/></Button>
                           <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
