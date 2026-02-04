import React from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { EventCard } from '@/components/ui/event-card';
export function DashboardView() {
  const user = useAppStore(s => s.user);
  const events = user?.events ?? [];
  const todayEvents = events
    .filter(e => isToday(parseISO(e.startDate)))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const nextUp = todayEvents.length > 0 ? todayEvents[0] : null;
  return (
    <div className="px-6 py-12 space-y-8 animate-fade-in">
      <header className="space-y-1">
        <p className="text-zinc-500 font-medium capitalize">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>
        <h1 className="text-4xl font-display font-bold">
          Bom dia, <span className="text-indigo-400">{user?.name}</span>
        </h1>
      </header>
      {nextUp && (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-pink-600/20 rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-2 text-indigo-300 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Próximo</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{nextUp.title}</h2>
            <p className="text-zinc-400 text-sm">
              {format(parseISO(nextUp.startDate), 'HH:mm')}
            </p>
          </div>
          <ArrowRight className="absolute right-6 bottom-6 w-6 h-6 text-indigo-400/50" />
        </section>
      )}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Agenda de Hoje</h3>
          <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-full">
            {todayEvents.length} {todayEvents.length === 1 ? 'item' : 'itens'}
          </span>
        </div>
        <div className="space-y-4">
          {todayEvents.length > 0 ? (
            todayEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-white/5 rounded-3xl">
              <p>Nada agendado para hoje.</p>
              <p className="text-xs mt-1">Toque em + para adicionar um novo evento.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}