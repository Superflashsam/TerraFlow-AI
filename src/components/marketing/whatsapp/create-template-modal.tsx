"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Video, FileText, Send, MessageSquare, Info, Plus } from 'lucide-react';

export const CreateTemplateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [bodyText, setBodyText] = useState("Hello {{1}}, we have a new property listing for you: {{2}}. Let us know if you're interested!");
    
    const addVariable = (variable: string) => {
        setBodyText(prev => `${prev} {{${variable}}}`);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare />
                        Create WhatsApp Template
                    </DialogTitle>
                    <DialogDescription>Design a new message template and submit it for approval.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 flex-1 overflow-y-auto">
                    {/* Editor Column */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="template-name">Template Name</Label>
                            <Input id="template-name" placeholder="e.g., property_launch_announcement" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select defaultValue="marketing">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="utility">Utility</SelectItem>
                                        <SelectItem value="authentication">Authentication</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select defaultValue="en_US">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en_US">English (US)</SelectItem>
                                        <SelectItem value="en_GB">English (UK)</SelectItem>
                                        <SelectItem value="hi">Hindi</SelectItem>
                                        <SelectItem value="mr">Marathi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Header (Optional)</Label>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="flex-1"><ImageIcon className="mr-2 h-4 w-4" />Image</Button>
                                <Button variant="outline" size="sm" className="flex-1"><Video className="mr-2 h-4 w-4" />Video</Button>
                                <Button variant="outline" size="sm" className="flex-1"><FileText className="mr-2 h-4 w-4" />Document</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="template-body">Body</Label>
                            <Textarea id="template-body" value={bodyText} onChange={e => setBodyText(e.target.value)} rows={6} maxLength={1024} />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="xs" onClick={() => addVariable("name")}>&#123;&#123;name&#125;&#125;</Button>
                                    <Button variant="outline" size="xs" onClick={() => addVariable("property")}>&#123;&#123;property&#125;&#125;</Button>
                                    <Button variant="outline" size="xs" onClick={() => addVariable("date")}>&#123;&#123;date&#125;&#125;</Button>
                                    <Button variant="outline" size="xs"><Plus className="h-4 w-4" /></Button>
                                </div>
                                <p className="text-xs text-muted-foreground">{bodyText.length}/1024</p>
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="template-footer">Footer (Optional)</Label>
                            <Input id="template-footer" placeholder="e.g., Your Trusted Real Estate Partner" maxLength={60} />
                        </div>
                        
                         <div className="space-y-2">
                            <Label>Buttons (Optional)</Label>
                            <div className="space-y-2">
                                <Input placeholder="Button 1: View Property (URL)" />
                                <Input placeholder="Button 2: Call Agent (Phone)" />
                                <Input placeholder="Button 3: Not Interested (Quick Reply)" />
                            </div>
                        </div>
                    </div>

                    {/* Preview Column */}
                    <div>
                        <Label>Preview</Label>
                         <div className="mt-2 bg-green-100 dark:bg-green-900/20 p-4 rounded-lg h-full flex items-center justify-center">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm w-full max-w-sm">
                                <div className="space-y-1">
                                    <p className="font-bold">Terraflow AI</p>
                                    <p className="text-sm">{bodyText.replace(/\{\{1\}\}/g, "{name}").replace(/\{\{2\}\}/g, "{property}")}</p>
                                    <p className="text-xs text-muted-foreground text-right">10:30 AM</p>
                                </div>
                                <div className="border-t mt-3 pt-2 space-y-1">
                                    <Button variant="outline" size="sm" className="w-full justify-center bg-gray-200 dark:bg-gray-700">View Property</Button>
                                    <Button variant="outline" size="sm" className="w-full justify-center bg-gray-200 dark:bg-gray-700">Call Agent</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-0">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Info className="mr-2 h-4 w-4" />
                        All templates require approval from Meta before they can be used.
                    </div>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                    <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Submit for Approval
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}