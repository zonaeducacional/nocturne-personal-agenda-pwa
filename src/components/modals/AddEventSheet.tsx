import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import type { EventType } from '@shared/types';
import { toast } from 'sonner';
interface AddEventSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function AddEventSheet({ open, onOpenChange }: AddEventSheetProps) {
  const addEvent = useAppStore(s => s.addEvent);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'task' as EventType,
    date: new Date().toISOString().slice(0, 16), // datetime-local format
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    try {
      await addEvent({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        startDate: new Date(formData.date).toISOString(),
      });
      toast.success('Event added successfully');
      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        type: 'task',
        date: new Date().toISOString().slice(0, 16),
      });
    } catch (err) {
      toast.error('Failed to save event');
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[32px] bg-zinc-900 border-white/10 pb-10 sm:max-w-md mx-auto h-[90vh]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">New Event</SheetTitle>
          <SheetDescription className="text-zinc-500">Plan your next move.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-400">Event Title</Label>
            <Input 
              id="title" 
              placeholder="Meeting with designers..." 
              className="bg-zinc-950 border-white/10"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="text-zinc-400">Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={v => setFormData(prev => ({ ...prev, type: v as EventType }))}
            >
              <SelectTrigger className="bg-zinc-950 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10">
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-zinc-400">Date & Time</Label>
            <Input 
              id="date" 
              type="datetime-local" 
              className="bg-zinc-950 border-white/10"
              value={formData.date}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-400">Notes (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Add some details..." 
              className="bg-zinc-950 border-white/10 resize-none"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <SheetFooter className="pt-4">
            <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-lg font-bold rounded-2xl">
              Create Event
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}