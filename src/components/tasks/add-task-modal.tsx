
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

const taskSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    description: z.string().optional(),
    dueDate: z.string().min(1, { message: "Due date is required." }),
    priority: z.string().min(1, { message: "Please select a priority." }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: { isOpen: boolean, onClose: () => void, onAddTask: (task: TaskFormValues) => void }) => {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: format(new Date(), 'yyyy-MM-dd'),
            priority: 'medium',
        }
    });

    const onSubmit = (data: TaskFormValues) => {
        onAddTask(data);
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
                        <CheckSquare className="mr-2" />
                        Add New Task
                    </DialogTitle>
                    <DialogDescription>
                        Enter the details for a new task.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <div className="col-span-3">
                                <Input id="title" {...register("title")} />
                                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <div className="col-span-3">
                                <Textarea id="description" {...register("description")} />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                             <div className="col-span-3">
                                <Input id="dueDate" type="date" {...register("dueDate")} />
                                {errors.dueDate && <p className="text-destructive text-sm mt-1">{errors.dueDate.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Priority</Label>
                             <div className="col-span-3">
                                <Controller
                                    control={control}
                                    name="priority"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.priority && <p className="text-destructive text-sm mt-1">{errors.priority.message}</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
