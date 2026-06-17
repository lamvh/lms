---
phase: 1
title: "Scaffold, tooling & Storybook"
status: done
priority: P1
effort: "3h"
dependencies: []
---

# Phase 1: Scaffold, tooling & Storybook

## Overview
Stand up the Vite + React + TypeScript + Tailwind project in `lms-edunex/`, mirror both token sets into
`tailwind.config` as **Tailwind theme tokens**, register the `<image-slot>` custom element, set up
Vitest + React Testing Library, **install and configure Storybook 8 (Vite builder, Tailwind in preview,
autodocs)**, and wire a router skeleton. Foundation for every later phase.

## Requirements
- Functional: `npm run dev` serves a blank routed app; `npm run build` passes; `npm test` runs;
  `npm run storybook` serves an (empty) Storybook with Tailwind styles + fonts applied.
- Non-functional: TS strict mode; Tailwind tokens map to exact prototype hex/px values.

## Architecture
- Vite `react-ts` template. React Router (`react-router-dom` v6) with routes `/`, `/login`, `/admin/*`,
  `/student/*`, `/teacher/*` (stub elements for now).
- `tailwind.config.ts` → `theme.extend` holds ALL design tokens as named Tailwind tokens:
  - `colors`: landing `cream/gold/ink`; app charcoal `p-50…p-900`, gold `a-50…a-700`, `ink-*`,
    `bg`, `surface`, `surface-2`, `surface-3`, `line`, `line-soft`, and status pairs
    (`success`/`success-bg`, `warn`/`warn-bg`, `danger`/`danger-bg`, `info`/`info-bg`, `zalo`/`zalo-bg`).
  - `fontFamily`: `head` = Bricolage Grotesque, `body` = Plus Jakarta Sans, `mono` = JetBrains Mono.
  - `borderRadius`: `xs 6 / sm 9 / md 13 / lg 18 / xl 24 / pill 999`.
  - `boxShadow`: `sh-1 / sh-2 / sh-card / sh-pop` (exact values from `theme.css`).
  - Components consume these via utilities (`bg-a-500`, `rounded-md`, `shadow-pop`, `font-head`).
    No CSS-var token layer; the `--radius-scale` knob is dropped (design-tool only).
- Google Fonts via `index.html` `<link>` (preconnect + Bricolage Grotesque + Plus Jakarta Sans + JetBrains Mono).
- `src/styles/index.css`: Tailwind layers + a minimal `:root` retaining ONLY the CSS vars still consumed by
  `<image-slot>`. App/landing tokens live in Tailwind config, not as CSS vars.
- `<image-slot>`: copy `image-slot.js` to `public/`, load once via `<script src="/image-slot.js">` in
  `index.html` (it self-registers the custom element). `src/lib/ImageSlot.tsx` = typed React wrapper;
  declare the custom element in `src/types/image-slot.d.ts` (JSX.IntrinsicElements).
- **Storybook 8**: `@storybook/react-vite` framework, `.storybook/main.ts` (stories glob
  `src/**/*.stories.@(ts|tsx)`, autodocs on), `.storybook/preview.ts` imports `src/styles/index.css`
  so Tailwind + tokens + fonts apply in stories. Global cream `bg` background via parameters.

## Related Code Files
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`
- Create: `src/main.tsx`, `src/routes.tsx`, `src/styles/index.css`
- Create: `src/lib/ImageSlot.tsx`, `src/types/image-slot.d.ts`
- Create: `public/image-slot.js` (copy from prototype), `public/assets/english-class.png` (copy)
- Create: `public/assets/ms-jane.png` (download from https://edunex.co.nz/wp-content/uploads/2025/03/Ms-Jane.png)
- Create: `vitest.config.ts` (or merge into vite config), `src/test/setup.ts`
- Create: `.storybook/main.ts`, `.storybook/preview.ts`
- Source ref: `design/prototype/{styles.css,edunex/theme.css,image-slot.js}` and `design/prototype/EduNex Components.html` (token values: `PRIMARY`/`ACCENT`/`SURF`/`STATUS_TOKENS` arrays + radii/shadow rows)

## Implementation Steps
1. `npm create vite@latest . -- --template react-ts` in `lms-edunex/`; install deps.
2. Add Tailwind + PostCSS; configure `content` globs; build both token palettes into `theme.extend`
   as named tokens (colors, fonts, radii, shadows) using exact hex/px from `EduNex Components.html` + `theme.css`.
3. Copy `image-slot.js` → `public/`; copy `assets/english-class.png` → `public/assets/`; download
   `Ms-Jane.png` → `public/assets/ms-jane.png`. Add `<script>` + font `<link>` (incl. JetBrains Mono) to `index.html`.
4. Write `ImageSlot.tsx` wrapper (props: `id`, `src`, `shape`, `radius`, `className`, `alt`) rendering
   `<image-slot>`; add `.d.ts` intrinsic-element typing.
5. Install `react-router-dom`; create `routes.tsx` with stub route elements; mount in `main.tsx`
   importing `styles/index.css`.
6. Install Vitest + `@testing-library/react` + `jsdom`; add `test` script + `src/test/setup.ts`.
7. `npx storybook@latest init --builder vite` (or add `@storybook/react-vite` manually); set
   `.storybook/preview.ts` to import `src/styles/index.css`; remove the boilerplate example stories;
   add `storybook` + `build-storybook` scripts.

## Tests First (TDD)
- `src/lib/ImageSlot.test.tsx`: renders an `<image-slot>` element with passed `id`/`src`; applies `className`.
- `src/routes.test.tsx`: rendering router at `/` mounts landing stub; at `/login` mounts login stub.
- Write these (red) before implementing the wrapper/routes; make them green.

## Success Criteria
- [x] `npm run dev` (HTTP 200), `npm run build` (tsc -b + vite), `npm test` (5 passing), `npm run build-storybook` all succeed.
- [x] Tailwind config exposes both token sets (`bg-cream`, `text-gold`, `bg-p-900`, `text-a-500`, `rounded-md`, `shadow-sh-pop`, `font-head` — verified in build + Welcome story).
- [x] Storybook builds with Tailwind styles + fonts applied (cream background, Welcome smoke story).
- [x] `<image-slot>` served at `/image-slot.js` (HTTP 200); `ImageSlot` wrapper renders (test green).
- [x] Router resolves `/`, `/login`, `/admin/*`, `/student/*`, `/teacher/*` to stub elements (tests green).

Note: shadow utilities are `shadow-sh-1/sh-2/sh-card/sh-pop` (token names keep the `sh-` prefix).

## Risk Assessment
- `<image-slot>` + TS intrinsic typing: mitigate with explicit `.d.ts`.
- Tailwind arbitrary values vs tokens drift: prefer named tokens; reserve `[..px]` for one-off hand-tuned values.
- Storybook Vite/Tailwind wiring: ensure `preview.ts` imports the same `index.css` as the app, else stories render unstyled.
