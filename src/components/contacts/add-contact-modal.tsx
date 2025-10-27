
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().optional(),
    company: z.string().optional(),
    category: z.string().min(1, { message: "Please select a category." }),
    status: z.string().min(1, { message: "Please select a status." }),
    dealValue: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const AddContactModal = ({ isOpen, onClose, onAddContact }: { isOpen: boolean, onClose: () => void, onAddContact: (contact: ContactFormValues) => void }) => {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            company: '',
            category: 'buyer',
            status: 'new',
            dealValue: ''
        }
    });

    const onSubmit = (data: ContactFormValues) => {
        onAddContact(data);
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
                        Add New Contact
                    </DialogTitle>
                    <DialogDescription>
                        Manually enter the details for a new contact.
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
                            <Input id="phone" className="col-span-3" {...register("phone")} />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">Company</Label>
                            <Input id="company" className="col-span-3" {...register("company")} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Category</Label>
                             <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="buyer">Buyer</SelectItem>
                                                <SelectItem value="seller">Seller</SelectItem>
                                                <SelectItem value="investor">Investor</SelectItem>
                                                <SelectItem value="tenant">Tenant</SelectItem>
                                                <SelectItem value="landlord">Landlord</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                             <Label className="text-right">Status</Label>
                             <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue/></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="hot_lead">Hot Lead</SelectItem>
                                                <SelectItem value="warm_lead">Warm Lead</SelectItem>
                                                <SelectItem value="cold_lead">Cold Lead</SelectItem>
                                                <SelectItem value="client">Client</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && <p className="text-destructive text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dealValue" className="text-right">Deal Value</Label>
                            <Input id="dealValue" className="col-span-3" {...register("dealValue")} placeholder="e.g., ₹2.5 Cr" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Contact</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
