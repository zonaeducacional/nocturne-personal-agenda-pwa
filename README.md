# Cloudflare Workers + React Boilerplate

A production-ready fullstack template for Cloudflare Workers featuring Durable Objects for stateful entities (Users, Chats), React 18 with TypeScript, Shadcn UI, Tailwind CSS, TanStack Query, and Hono routing. Includes indexed entity listing, pagination, CRUD operations, and a responsive dashboard UI.

## ✨ Key Features

- **Durable Objects for Entities**: One DO instance per User/ChatBoard with automatic indexing for listing/pagination.
- **Type-Safe API**: Shared types between frontend/backend, full TypeScript support.
- **Modern React Stack**: Routing (React Router), State (Zustand/Immer), Query (TanStack Query), UI (Shadcn/Tailwind).
- **Cloudflare-Native**: Workers, Durable Objects (SQLite-backed), Wrangler deployment.
- **Developer Experience**: Hot reload, error boundaries, theme toggle, mobile-responsive sidebar.
- **Production-Ready**: CORS, logging, error handling, client error reporting.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zonaeducacional/nocturne-personal-agenda-pwa)

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject + IndexedEntity pattern)
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI, Lucide Icons
- **Data**: TanStack Query, React Hook Form, Zod
- **State/UI**: Framer Motion, Sonner (toasts), Sidebar (Radix)
- **Build/Deploy**: Bun, Wrangler, Cloudflare Vite Plugin
- **Dev Tools**: ESLint, TypeScript, Tailwind IntelliSense

## 🚀 Quick Start

1. **Prerequisites**
   - [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
   - [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest`)

2. **Clone & Install**
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

3. **Generate Types** (from Workers bindings)
   ```bash
   bun run cf-typegen
   ```

4. **Development**
   ```bash
   bun run dev  # Starts dev server at http://localhost:3000 (frontend + API proxy)
   ```

5. **Build & Preview**
   ```bash
   bun run build
   bun run preview
   ```

## 💻 Usage Examples

### API Endpoints (via `/api/*`)
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user `{ "name": "John" }`
- `GET /api/chats` - List chats
- `POST /api/chats` - Create chat `{ "title": "My Chat" }`
- `GET/POST /api/chats/:id/messages` - List/send messages
- `DELETE /api/users/:id` - Delete user

All responses: `{ success: true, data: ... }`

### Frontend Customization
- Edit `src/pages/HomePage.tsx` for your app UI
- Use `src/lib/api-client.ts` for API calls: `api<User[]>('/api/users')`
- Add routes in `src/main.tsx`
- Extend entities in `worker/entities.ts` & routes in `worker/user-routes.ts`
- UI components in `src/components/ui/*` (Shadcn)

**DO NOT** modify `worker/core-utils.ts`, `worker/index.ts`, or `wrangler.jsonc`.

## 🔧 Development Workflow

- **Frontend**: `src/` - Vite dev server with HMR
- **Backend**: `worker/` - Routes auto-reload in dev
- **Shared Types**: `shared/` - Auto-imported via paths
- **Mock Data**: `shared/mock-data.ts` - Seeds on first request
- **Linting**: `bun run lint`
- **Theme**: Dark/Light mode with `useTheme()` hook
- **Error Reporting**: Auto-logs client errors to `/api/client-errors`

Hot reload works for both frontend and worker routes.

## 🚀 Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun run deploy
```

Or manually:

1. Login: `wrangler login`
2. Deploy: `wrangler deploy`
3. Custom Domain: Edit `wrangler.jsonc`

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zonaeducacional/nocturne-personal-agenda-pwa)

**Assets**: Static frontend served from Workers. API routes (`/api/*`) handled by Worker first.

## 📚 Project Structure

```
├── shared/          # Shared types & mocks
├── src/             # React frontend (Vite)
│   ├── components/  # Shadcn UI + custom
│   ├── pages/       # Routes
│   └── lib/         # Utils, API client
├── worker/          # Cloudflare Worker backend
│   ├── core-utils.ts # Entity framework (DO NOT MODIFY)
│   ├── entities.ts  # User/Chat entities
│   └── user-routes.ts # Your API routes
├── tsconfig*.json   # TypeScript configs
├── vite.config.ts   # Vite + Cloudflare plugin
└── wrangler.jsonc   # Worker config
```

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Make changes
4. `bun run lint`
5. PR to `main`

## ⚠️ Important Notes

- **Entities**: Extend `IndexedEntity` in `worker/entities.ts`
- **Routes**: Add to `worker/user-routes.ts` as `userRoutes(app)`
- **Seed Data**: Auto-seeds from `shared/mock-data.ts`
- **Limits**: Durable Objects use SQLite storage (storage API)

## 📄 License

MIT - See [LICENSE](LICENSE) (add your own if needed).

---

⭐ **Star on GitHub** | 💬 **Issues** | 🐛 **Bugs**