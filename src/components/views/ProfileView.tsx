import React from 'react';
import { User as UserIcon, Shield, Info, LogOut } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function ProfileView() {
  const user = useAppStore(s => s.user);
  const updateProfile = useAppStore(s => s.updateProfile);
  const handleUpdateName = async (newName: string) => {
    if (!user || newName === user.name) return;
    try {
      await updateProfile({ name: newName });
      toast.success('Perfil atualizado');
    } catch (e) {
      toast.error('Erro ao atualizar perfil');
    }
  };
  return (
    <div className="px-6 py-12 space-y-8 animate-fade-in">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">{user?.name}</h1>
          <p className="text-zinc-500 text-sm">Membro desde Abr 2025</p>
        </div>
      </header>
      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Geral</h3>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name" className="text-zinc-400">Nome de exibição</Label>
              <Input
                id="display-name"
                className="bg-zinc-900 border-white/10 text-zinc-50"
                defaultValue={user?.name}
                onBlur={(e) => handleUpdateName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label className="text-zinc-50">Notificações</Label>
                <p className="text-xs text-zinc-500">Habilitar lembretes diários da agenda</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Informações do App</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { icon: Shield, label: 'Pol��tica de Privacidade' },
              { icon: Info, label: 'Sobre Nocturne' },
              { 
                icon: LogOut, 
                label: 'Limpar cache local', 
                color: 'text-red-400', 
                onClick: () => {
                  localStorage.removeItem('nocturne-storage');
                  localStorage.removeItem('nocturne_user_id');
                  window.location.reload();
                }
              }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={item.onClick}
                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left"
              >
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