"use client";

import React from 'react';
import { FileText, MoreHorizontal, Download, Share, Star, Link as LinkIcon, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export const DocumentDetailsPanel = ({ document, onClose }: { document: any; onClose: () => void; }) => {
    return (
        <aside className="w-1/4 flex-shrink-0 bg-card border-l border-border p-6 flex flex-col gap-6 overflow-y-auto">
             <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Document Details</h2>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
            </div>
            
            <div className="text-center">
                 <div className="relative h-32 w-full bg-muted flex items-center justify-center rounded-lg mb-4">
                    {document.thumbnail ? (
                        <Image src={document.thumbnail} alt={document.name} layout="fill" objectFit="contain" className="p-4" />
                    ) : (
                        <FileText className="h-12 w-12 text-muted-foreground" />
                    )}
                </div>
                <h3 className="font-semibold">{document.name}</h3>
            </div>

            <div>
                <h4 className="font-medium text-sm mb-2">Details</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Type:</strong> {document.type}</p>
                    <p><strong>Size:</strong> {document.size}</p>
                    <p><strong>Modified:</strong> {document.modified}</p>
                     <div className="flex items-center gap-2">
                        <strong>Uploaded by:</strong>
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={getImagePlaceholder(document.uploadedBy.avatarId)?.imageUrl} />
                            <AvatarFallback>{document.uploadedBy.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{document.uploadedBy.name}</span>
                    </div>
                     {document.linkedTo && (
                        <div className="flex items-center gap-2">
                           <strong>Linked to:</strong>
                            <LinkIcon className="h-3 w-3"/>
                            <span className="text-blue-500">{document.linkedTo.name}</span>
                        </div>
                    )}
                </div>
            </div>

             <div>
                <h4 className="font-medium text-sm mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
                    <Button variant="outline" size="sm" className="h-6"><Plus className="h-3 w-3 mr-1"/>Add tag</Button>
                </div>
            </div>
            
            <div>
                 <h4 className="font-medium text-sm mb-2">Sharing & Permissions</h4>
                 <div className="space-y-2">
                    {document.sharedWith.map((person: any) => (
                         <div key={person.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={getImagePlaceholder(person.avatarId)?.imageUrl} />
                                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{person.name}</span>
                            </div>
                            <span className="text-muted-foreground">{person.role}</span>
                        </div>
                    ))}
                 </div>
                 <Button variant="outline" size="sm" className="mt-2 w-full"><Plus className="h-4 w-4 mr-1"/>Add people</Button>
            </div>

             <div>
                <h4 className="font-medium text-sm mb-2">Version History</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                   {document.versions.map((v: any) => (
                       <li key={v.version}>{`Version ${v.version} - ${v.date} by ${v.user}`}</li>
                   ))}
                </ul>
            </div>
            
            <div className="mt-auto space-y-2">
                <Button className="w-full">Download</Button>
                <Button variant="outline" className="w-full">Move</Button>
                <Button variant="destructive" className="w-full">Delete</Button>
            </div>

        </aside>
    )
}
