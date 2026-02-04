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
  // Rule: useStore(s => s.primitive) ONLY.
  const init = useAppStore(s => s.init);
  const loading = useAppStore(s => s.loading);
  useEffect(() => {
    // Ensuring init is called safely
    const triggerInit = async () => {
      try {
        await init();
      } catch (err) {
        console.error("Initialization failed during mount:", err);
      }
    };
    triggerInit();
  }, [init]);
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
            {activeTab === 'home' && <DashboardView />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'profile' && <ProfileView />}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onAddClick={() => setIsSheetOpen(true)}
      />
      <AddEventSheet
        open={isSheetOpen}
        onOpenChange={(val) => setIsSheetOpen(val)}
      />
      <Toaster
        theme="dark"
        position="top-center"
        richColors
        toastOptions={{
          style: { 
            background: '#18181b', 
            border: '1px solid rgba(255,255,255,0.1)', 
            color: '#fafafa' 
          }
        }}
      />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}