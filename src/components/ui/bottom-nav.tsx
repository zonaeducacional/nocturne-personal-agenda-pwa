import React from 'react';
import { Home, Calendar, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export type TabType = 'home' | 'calendar' | 'profile';
interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onAddClick: () => void;
}
export function BottomNav({ activeTab, onTabChange, onAddClick }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Today' },
    { id: 'calendar' as TabType, icon: Calendar, label: 'Calendar' },
    { id: 'profile' as TabType, icon: User, label: 'Profile' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-lg border-t border-white/10 px-6 pb-8 pt-2 safe-area-bottom">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors py-2",
                isActive ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
        {/* Floating Add Button in Nav Context */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10">
          <Button 
            onClick={onAddClick}
            size="icon" 
            className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 text-white"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}