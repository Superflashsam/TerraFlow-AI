
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, UserPlus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const leadSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number is too short." }).optional().or(z.literal('')),
    source: z.string().min(1, { message: "Please select a lead source." }),
    status: z.string().min(1, { message: "Please select a status." }),
    propertyInterest: z.string().optional(),
    budget: z.string().optional(),
    notes: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export const AddLeadModal = ({ isOpen, onClose, onAddLead }: { isOpen: boolean, onClose: () => void, onAddLead: (lead: LeadFormValues) => void }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            source: '',
            status: 'new',
            propertyInterest: '',
            budget: '',
            notes: ''
        }
    });

    const onSubmit = (data: LeadFormValues) => {
        onAddLead(data);
        reset();
        onClose();
    };
    
    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <UserPlus className="mr-2" />
                        Add New Lead
                    </DialogTitle>
                    <DialogDescription>
                        Manually enter the details for a new lead.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <div className="col-span-3">
                                <Input id="name" {...register("name")} />
                                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <div className="col-span-3">
                                <Input id="email" {...register("email")} />
                                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <div className="col-span-3">
                                <Input id="phone" {...register("phone")} />
                                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="source" className="text-right">Source</Label>
                            <div className="col-span-3">
                                <Select onValueChange={(value) => register("source").onChange({ target: { value } })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="website">Website</SelectItem>
                                        <SelectItem value="referral">Referral</SelectItem>
                                        <SelectItem value="social_media">Social Media</SelectItem>
                                        <SelectItem value="advertisement">Advertisement</SelectItem>
                                        <SelectItem value="walk_in">Walk-in</SelectItem>
                                    </SelectContent>
                                </Select>
                                 {errors.source && <p className="text-destructive text-sm mt-1">{errors.source.message}</p>}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <div className="col-span-3">
                                <Select defaultValue='new' onValueChange={(value) => register("status").onChange({ target: { value } })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="qualified">Qualified</SelectItem>
                                        <SelectItem value="unqualified">Unqualified</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-destructive text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="propertyInterest" className="text-right">Property Interest</Label>
                            <Input id="propertyInterest" className="col-span-3" {...register("propertyInterest")} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="budget" className="text-right">Budget</Label>
                            <Input id="budget" className="col-span-3" {...register("budget")} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">Notes</Label>
                            <Textarea id="notes" className="col-span-3" {...register("notes")} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit">
                            <PlusCircle className="mr-2" />
                            Add Lead
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
