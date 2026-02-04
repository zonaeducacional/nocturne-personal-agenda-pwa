import type { User, Chat, ChatMessage } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A', events: [], preferences: { theme: 'dark', notificationsEnabled: true } },
  { id: 'u2', name: 'User B', events: [], preferences: { theme: 'dark', notificationsEnabled: true } }
];

export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
  