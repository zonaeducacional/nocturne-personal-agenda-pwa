import React from 'react';
import { User, Settings, Shield, Info, LogOut } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
export function ProfileView() {
  const user = useAppStore(s => s.user);
  const setUser = useAppStore(s => s.setUser);
  const handleUpdateName = (newName: string) => {
    if (!user) return;
    setUser({ ...user, name: newName });
    toast.success('Profile updated');
  };
  return (
    <div className="px-6 py-12 space-y-8 animate-fade-in">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">{user?.name}</h1>
          <p className="text-zinc-500 text-sm">Member since Apr 2025</p>
        </div>
      </header>
      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">General</h3>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name" className="text-zinc-400">Display Name</Label>
              <Input 
                id="display-name"
                className="bg-zinc-900 border-white/10" 
                defaultValue={user?.name}
                onBlur={(e) => handleUpdateName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label className="text-zinc-50">Notifications</Label>
                <p className="text-xs text-zinc-500">Enable daily agenda reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">App Info</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, label: 'Privacy Policy' },
              { icon: Info, label: 'About Nocturne' },
              { icon: LogOut, label: 'Clear Local Cache', color: 'text-red-400' }
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                <item.icon className={cn("w-5 h-5 text-zinc-400", item.color)} />
                <span className={cn("text-sm font-medium", item.color)}>{item.label}</span>
              </button>
            ))}
          </div>
        </section>
        <footer className="text-center py-4">
          <p className="text-xs text-zinc-600">v1.0.0 (Core Foundation)</p>
        </footer>
      </div>
    </div>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}