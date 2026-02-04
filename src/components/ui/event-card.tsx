import React from 'react';
import { format } from 'date-fns';
import { MoreVertical, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Event, EventType } from '@shared/types';
interface EventCardProps {
  event: Event;
  onDelete?: () => void;
}
const typeStyles: Record<EventType, string> = {
  task: "border-l-indigo-500",
  meeting: "border-l-pink-500",
  reminder: "border-l-emerald-500",
};
export function EventCard({ event, onDelete }: EventCardProps) {
  const startTime = format(new Date(event.startDate), 'HH:mm');
  return (
    <div className={cn(
      "group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all border-l-4",
      typeStyles[event.type]
    )}>
      <div className="flex flex-col items-center min-w-[50px]">
        <span className="text-sm font-bold text-zinc-100">{startTime}</span>
        <Clock className="w-3 h-3 text-zinc-500 mt-1" />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="text-base font-semibold text-zinc-50">{event.title}</h4>
        {event.description && (
          <p className="text-sm text-zinc-400 line-clamp-1">{event.description}</p>
        )}
      </div>
      <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}