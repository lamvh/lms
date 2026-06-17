---
phase: 1
title: "Scaffold & tooling"
status: pending
priority: P1
effort: "2h"
dependencies: []
---

# Phase 1: Scaffold & tooling

## Overview
Stand up the Vite + React + TypeScript + Tailwind project in `lms-edunex/`, mirror both token sets into
`tailwind.config`, register the `<image-slot>` custom element, set up Vitest + React Testing Library, and
wire a router skeleton. Foundation for every later phase.

## Requirements
- Functional: `npm run dev` serves a blank routed app; `npm run build` passes; `npm test` runs.
- Non-functional: TS strict mode; Tailwind tokens map to exact prototype hex/px values.

## Architecture
- Vite `react-ts` template. React Router (`react-router-dom` v6) with routes `/`, `/login`, `/admin/*`,
  `/student/*`, `/teacher/*` (stub elements for now).
- `tailwind.config.ts` → `theme.extend.colors` for both palettes (landing `cream/gold/ink`; app `p`/`a`/`ink`/`surface`/status scales), `fontFamily` (head=Bricolage Grotesque, body=Plus Jakarta Sans), `borderRadius`, `boxShadow` from `--sh-*`.
- Google Fonts via `index.html` `<link>` (preconnect + Bricolage Grotesque + Plus Jakarta Sans).
- `src/styles/index.css`: Tailwind layers + a minimal `:root` retaining CSS vars still consumed by `<image-slot>` and any unavoidable arbitrary-value fallbacks.
- `<image-slot>`: copy `image-slot.js` to `public/`, load once via `<script src="/image-slot.js">` in `index.html` (it self-registers the custom element). `src/lib/ImageSlot.tsx` = typed React wrapper; declare the custom element in `src/types/image-slot.d.ts` (JSX.IntrinsicElements).

## Related Code Files
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`
- Create: `src/main.tsx`, `src/routes.tsx`, `src/styles/index.css`
- Create: `src/lib/ImageSlot.tsx`, `src/types/image-slot.d.ts`
- Create: `public/image-slot.js` (copy from prototype), `public/assets/english-class.png` (copy)
- Create: `public/assets/ms-jane.png` (download from https://edunex.co.nz/wp-content/uploads/2025/03/Ms-Jane.png) <!-- Updated: Validation Session 1 - bundle Ms-Jane locally -->
- Create: `vitest.config.ts` (or merge into vite config), `src/test/setup.ts`
- Source ref: `/tmp/edunex_design/edunex-lms/project/{styles.css,edunex/theme.css,image-slot.js}`

## Implementation Steps
1. `npm create vite@latest . -- --template react-ts` in `lms-edunex/`; install deps.
2. Add Tailwind + PostCSS; configure `content` globs; build both token palettes into `theme.extend`.
3. Copy `image-slot.js` → `public/`; copy `assets/english-class.png` → `public/assets/`; download `Ms-Jane.png` → `public/assets/ms-jane.png`. Add `<script>` + font `<link>` to `index.html`.
4. Write `ImageSlot.tsx` wrapper (props: `id`, `src`, `shape`, `radius`, `className`, `alt`) rendering `<image-slot>`; add `.d.ts` intrinsic-element typing.
5. Install `react-router-dom`; create `routes.tsx` with stub route elements; mount in `main.tsx` importing `styles/index.css`.
6. Install Vitest + `@testing-library/react` + `jsdom`; add `test` script + `src/test/setup.ts`.

## Tests First (TDD)
- `src/lib/ImageSlot.test.tsx`: renders an `<image-slot>` element with passed `id`/`src`; applies `className`.
- `src/routes.test.tsx`: rendering router at `/` mounts landing stub; at `/login` mounts login stub.
- Write these (red) before implementing the wrapper/routes; make them green.

## Success Criteria
- [ ] `npm run dev`, `npm run build`, `npm test` all succeed.
- [ ] Tailwind config exposes both token sets (spot-check `bg-cream`, `text-gold`, `bg-p-900`, `text-a-500`).
- [ ] `<image-slot>` registers (no console error) and `ImageSlot` wrapper renders.
- [ ] Router resolves all 5 top-level paths to stub elements.

## Risk Assessment
- `<image-slot>` + TS intrinsic typing: mitigate with explicit `.d.ts`.
- Tailwind arbitrary values vs tokens drift: prefer named tokens; reserve `[..px]` for one-off hand-tuned values.
