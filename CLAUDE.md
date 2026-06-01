@AGENTS.md

# Stallion Portfolio — CLAUDE.md

## Project Overview

Next.js 16 (App Router) portfolio site built with TypeScript and Tailwind CSS v4.

**Root app directory:** `app/`  
**Dev server:** `npm run dev` (port 3000)

---

## Tech Stack & Required Libraries

Always use the libraries below — do not substitute alternatives.

| Concern | Library |
|---|---|
| HTTP client | `axios` |
| Server state / data fetching | `@tanstack/react-query` (`useQuery`) |
| Mutations | `@tanstack/react-query` (`useMutation`) |
| Smooth scroll | `lenis` |
| Icons | `lucide-react` |
| Animations | `gsap` + `@gsap/react` |
| Styling | Tailwind CSS v4 |

Install all before using:

```bash
npm install axios @tanstack/react-query lenis gsap @gsap/react lucide-react
```

---

## Data Fetching — Axios + TanStack Query

### QueryClient provider

Wrap the app in `app/providers.tsx` (a `"use client"` component) and import it in `app/layout.tsx`.

```tsx
// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 2 } },
  }));
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

### Axios instance

Create `lib/axios.ts` — all requests go through this instance.

```ts
// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
});
```

### useQuery pattern

```tsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["resource", id],
  queryFn: () => api.get(`/resource/${id}`).then((r) => r.data),
});
```

### useMutation pattern

```tsx
const mutation = useMutation({
  mutationFn: (payload: Payload) => api.post("/endpoint", payload).then((r) => r.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resource"] }),
  onError: (err) => console.error(err),
});
```

---

## Error Handling

- Every `useQuery` / `useMutation` must handle `isError` / `onError`.
- Use an `<ErrorBoundary>` at the page level to catch render errors.
- Show a user-visible error UI — never silently swallow errors.
- Axios errors: use `axios.isAxiosError(err)` to extract `err.response?.data?.message`.

```tsx
if (isError) return <ErrorState message={(error as Error).message} />;
```

---

## Skeleton Loading

- Show `<Skeleton />` components while `isLoading === true`.
- Match the skeleton shape to the real content (same height, width, border-radius).
- Use Tailwind's `animate-pulse` class for the shimmer effect.

```tsx
// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 ${className}`} />;
}
```

Usage:

```tsx
if (isLoading) return <ProjectCardSkeleton />;
```

---

## Loading Screen

- A full-screen overlay shown on initial page load / route transitions.
- Lives at `components/LoadingScreen.tsx`.
- Use GSAP to animate it out once content is ready.
- Unmount (not just hide) the loading screen after the exit animation completes.

```tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const el = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(el.current, { opacity: 0, duration: 0.6, delay: 1.2, onComplete });
  }, []);
  return (
    <div ref={el} className="fixed inset-0 z-9999 flex items-center justify-center bg-black">
      {/* logo / spinner */}
    </div>
  );
}
```

---

## GSAP Animations

- Import GSAP only in `"use client"` components.
- Always use the `useGSAP` hook from `@gsap/react` — it handles cleanup automatically.
- Register plugins at the top of the file: `gsap.registerPlugin(ScrollTrigger)`.
- Prefer `useGSAP` scope to avoid selector leaks.

```tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## Lenis Smooth Scroll

- Initialize Lenis once in a client component provider.
- Integrate Lenis RAF with GSAP ticker so ScrollTrigger stays in sync.

```tsx
// components/LenisProvider.tsx
"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);
  return <>{children}</>;
}
```

Add `<LenisProvider>` inside `<Providers>` in `app/layout.tsx`.

---

## Metadata

- Every page must export a `metadata` object or a `generateMetadata` function.
- The root layout sets default `title.template` and `description`.

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: "Stallion", template: "%s | Stallion" },
  description: "Stallion Portfolio",
  openGraph: { type: "website" },
};
```

```tsx
// app/projects/page.tsx
export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our work.",
};
```

For dynamic routes use `generateMetadata`:

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return { title: project.title, description: project.description };
}
```

---

## Responsive Design

- Mobile-first: base styles target small screens, larger breakpoints override.
- Use Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).
- Never hardcode pixel widths — use Tailwind spacing / sizing scale.
- Test every component at 375px, 768px, and 1440px.

---

## Lucide Icons

```tsx
import { ArrowRight, Github, ExternalLink } from "lucide-react";

<ArrowRight className="h-4 w-4" />
```

- Always set explicit size via `className` — never use `width`/`height` props.
- Mark decorative icons aria-hidden: `<ArrowRight aria-hidden="true" />`.

---

## Project Structure

```
app/
  layout.tsx          — root layout, metadata, providers
  page.tsx            — home page
  globals.css
  providers.tsx       — QueryClient + LenisProvider (client component)
  [section]/
    page.tsx
components/
  ui/                 — generic: Skeleton, ErrorState, Button …
  LoadingScreen.tsx
  LenisProvider.tsx
lib/
  axios.ts            — shared Axios instance
  queryKeys.ts        — centralised query key factory
public/
```

---

## Code Conventions

- `"use client"` only when using browser APIs, hooks, GSAP, or Lenis.
- Server Components are the default — prefer them for data fetching when possible.
- No `any` types — use proper TypeScript interfaces.
- No inline styles — Tailwind only.
- Keep components under ~150 lines; split if larger.
- No comments explaining *what* the code does — only *why* when non-obvious.
