import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { Event } from "../shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // USERS
  app.get('/api/users/:id', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c, 'User not found');
    return ok(c, await user.getState());
  });
  app.post('/api/users', async (c) => {
    const { name, id } = (await c.req.json()) as { name?: string, id?: string };
    const userId = id || crypto.randomUUID();
    const newUser = await UserEntity.create(c.env, { 
      id: userId, 
      name: name?.trim() || 'New User',
      events: [],
      preferences: { theme: 'dark', notificationsEnabled: true }
    });
    return ok(c, newUser);
  });
  app.patch('/api/users/:id', async (c) => {
    const updates = await c.req.json();
    const user = new UserEntity(c.env, c.req.param('id'));
    await user.patch(updates);
    return ok(c, await user.getState());
  });
  // EVENTS
  app.post('/api/users/:id/events', async (c) => {
    const event = (await c.req.json()) as Event;
    if (!event.title) return bad(c, 'Title required');
    const user = new UserEntity(c.env, c.req.param('id'));
    const updated = await user.addEvent({ ...event, id: crypto.randomUUID() });
    return ok(c, updated);
  });
  app.delete('/api/users/:id/events/:eventId', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    const updated = await user.deleteEvent(c.req.param('eventId'));
    return ok(c, updated);
  });
}