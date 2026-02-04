export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type EventType = 'task' | 'meeting' | 'reminder';
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO String
  endDate?: string;   // ISO String
  type: EventType;
}
export interface UserPreferences {
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
}
export interface User {
  id: string;
  name: string;
  events: Event[];
  preferences: UserPreferences;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}