import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Event } from '@shared/types';
import { api } from './api-client';
interface AppState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  init: () => Promise<void>;
  addEvent: (eventData: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      init: async () => {
        if (get().initialized && get().user) return;
        set({ loading: true });
        try {
          const userId = localStorage.getItem('nocturne_user_id');
          if (userId) {
            try {
              const data = await api<User>(`/api/users/${userId}`);
              set({ user: data, initialized: true });
            } catch (e) {
              const guestUser: User = {
                id: 'guest-local',
                name: 'Convidado',
                events: [],
                preferences: { theme: 'dark', notificationsEnabled: false }
              };
              localStorage.removeItem('nocturne_user_id');
              set({ user: guestUser, initialized: true });
              console.warn('Failed to fetch existing user - using guest mode:', e);
            }
          } else {
            const newUser = await api<User>('/api/users', { 
              method: 'POST', 
              body: JSON.stringify({ name: 'Usuário' }) 
            });
            localStorage.setItem('nocturne_user_id', newUser.id);
            set({ user: newUser, initialized: true });
          }
        } catch (e) {
          const guestUser: User = { 
            id: 'guest-local', 
            name: 'Convidado', 
            events: [], 
            preferences: { theme: 'dark', notificationsEnabled: false } 
          };
          localStorage.removeItem('nocturne_user_id');
          set({ user: guestUser, initialized: true });
          console.warn('Failed to initialize with server - using guest mode:', e);
        } finally {
          set({ loading: false });
        }
      },
      addEvent: async (eventData) => {
        const user = get().user;
        if (!user || user.id === 'guest-local') { 
          console.warn('addEvent skipped in guest mode'); 
          return; 
        }
        set({ loading: true });
        try {
          const updatedUser = await api<User>(`/api/users/${user.id}/events`, {
            method: 'POST',
            body: JSON.stringify(eventData),
          });
          set({ user: updatedUser });
        } finally {
          set({ loading: false });
        }
      },
      deleteEvent: async (eventId) => {
        const user = get().user;
        if (!user || user.id === 'guest-local') { 
          console.warn('deleteEvent skipped in guest mode'); 
          return; 
        }
        try {
          const updatedUser = await api<User>(`/api/users/${user.id}/events/${eventId}`, {
            method: 'DELETE',
          });
          set({ user: updatedUser });
        } catch (e) {
          console.error('Delete event error:', e);
        }
      },
      updateProfile: async (updates) => {
        const user = get().user;
        if (!user || user.id === 'guest-local') { 
          console.warn('updateProfile skipped in guest mode'); 
          return; 
        }
        try {
          const updatedUser = await api<User>(`/api/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updates),
          });
          set({ user: updatedUser });
        } catch (e) {
          console.error('Update profile error:', e);
          throw e;
        }
      },
    }),
    {
      name: 'nocturne-storage',
      partialize: (state) => ({ 
        user: state.user, 
        initialized: state.initialized 
      }),
    }
  )
);