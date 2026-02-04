import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { BottomNav, TabType } from '@/components/ui/bottom-nav';
import { DashboardView } from '@/components/views/DashboardView';
import { CalendarView } from '@/components/views/CalendarView';
import { ProfileView } from '@/components/views/ProfileView';
import { AddEventSheet } from '@/components/modals/AddEventSheet';
import { useAppStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';
export function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const init = useAppStore(s => s.init);
  const loading = useAppStore(s => s.loading);
  useEffect(() => {
    init();
  }, [init]);
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <DashboardView />;
      case 'calendar': return <CalendarView />;
      case 'profile': return <ProfileView />;
      default: return null;
    }
  };
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 flex flex-col max-w-lg mx-auto relative overflow-hidden">
      <main className="flex-1 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddClick={() => setIsSheetOpen(true)} 
      />
      <AddEventSheet 
        open={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />
      <Toaster theme="dark" position="top-center" richColors />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}