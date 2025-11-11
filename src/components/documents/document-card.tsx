"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, MoreHorizontal, Download, Share, Star, Link as LinkIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';

export const DocumentCard = ({ document, onSelect, onCheckboxChange, isSelected }: { document: any; onSelect: () => void; onCheckboxChange: (checked: boolean) => void; isSelected: boolean; }) => {
    return (
        <Card className="overflow-hidden" onClick={onSelect}>
             <div className="relative h-32 bg-muted flex items-center justify-center">
                {document.thumbnail ? (
                    <Image src={document.thumbnail} alt={document.name} layout="fill" objectFit="cover" />
                ) : (
                    <FileText className="h-12 w-12 text-muted-foreground" />
                )}
                 <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={isSelected} onCheckedChange={onCheckboxChange} />
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-sm truncate mb-2">{document.name}</h3>
                 <div className="text-xs text-muted-foreground space-y-1">
                    <p>{document.size} ・ {document.modified}</p>
                     <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={getImagePlaceholder(document.uploadedBy.avatarId)?.imageUrl} />
                            <AvatarFallback>{document.uploadedBy.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{document.uploadedBy.name}</span>
                    </div>
                    {document.linkedTo && (
                        <div className="flex items-center gap-2 text-blue-500">
                            <LinkIcon className="h-3 w-3"/>
                            <span>{document.linkedTo.name}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-end gap-1 mt-2">
                    <button className="p-2 rounded-md hover:bg-muted"><Download className="h-4 w-4"/></button>
                    <button className="p-2 rounded-md hover:bg-muted"><Share className="h-4 w-4"/></button>
                    <button className="p-2 rounded-md hover:bg-muted"><Star className="h-4 w-4"/></button>
                    <button className="p-2 rounded-md hover:bg-muted"><MoreHorizontal className="h-4 w-4"/></button>
                </div>
            </CardContent>
        </Card>
    );
}
