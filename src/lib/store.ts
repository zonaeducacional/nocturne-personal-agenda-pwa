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
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
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
          // Check for existing ID in local storage or create new
          const storedUser = localStorage.getItem('nocturne_user_id');
          if (storedUser) {
            const data = await api<User>(`/api/users/${storedUser}`);
            set({ user: data, initialized: true });
          } else {
            const newUser = await api<User>('/api/users', { method: 'POST', body: JSON.stringify({ name: 'User' }) });
            localStorage.setItem('nocturne_user_id', newUser.id);
            set({ user: newUser, initialized: true });
          }
        } catch (e) {
          console.error('Failed to init app state', e);
        } finally {
          set({ loading: false });
        }
      },
      addEvent: async (eventData) => {
        const user = get().user;
        if (!user) return;
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
        if (!user) return;
        try {
          const updatedUser = await api<User>(`/api/users/${user.id}/events/${eventId}`, {
            method: 'DELETE',
          });
          set({ user: updatedUser });
        } catch (e) {
          console.error(e);
        }
      },
    }),
    {
      name: 'nocturne-storage',
      partialize: (state) => ({ user: state.user, initialized: state.initialized }),
    }
  )
);