import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useAppStore } from '@/lib/store';
import { format, isSameDay, parseISO } from 'date-fns';
import { EventCard } from '@/components/ui/event-card';
export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const user = useAppStore(s => s.user);
  const events = user?.events ?? [];
  const selectedEvents = events.filter(e => 
    selectedDate && isSameDay(parseISO(e.startDate), selectedDate)
  ).sort((a, b) => a.startDate.localeCompare(b.startDate));
  // Visual cues for days with events
  const modifiers = {
    hasEvent: events.map(e => parseISO(e.startDate)),
  };
  const modifierStyles = {
    hasEvent: { color: 'white', fontWeight: 'bold', textDecoration: 'underline', textDecorationColor: '#6366f1' }
  };
  return (
    <div className="px-6 py-12 space-y-8 animate-fade-in">
      <header className="space-y-1">
        <h1 className="text-4xl font-display font-bold">Calendar</h1>
      </header>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border-0"
          modifiers={modifiers}
          modifiersStyles={modifierStyles}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Selected Date'}
          </h3>
          <span className="text-xs text-zinc-500">{selectedEvents.length} events</span>
        </div>
        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="py-8 text-center text-zinc-500 text-sm">
            Free day! No events planned.
          </div>
        )}
      </div>
    </div>
  );
}