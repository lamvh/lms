---
title: "EduNex React Port (Components + Storybook → Landing → LMS)"
description: "Port Claude Design EduNex prototype to React + Vite + Tailwind + TypeScript: component library + Storybook first (from the Components build contract), then landing page, then full LMS app"
status: pending
priority: P2
effort: ~36h
branch: ""
tags: [react, vite, tailwind, typescript, port, landing, lms]
blockedBy: []
blocks: []
created: "2026-06-17"
createdBy: "ck:plan"
source: skill
mode: tdd
---

# EduNex React Port (Landing + LMS)

## Overview

Recreate the Claude Design EduNex prototype as a real React app in empty target dir `lms-edunex/`.
Source prototype: `design/prototype/` (React 18 UMD + in-browser Babel, global-scope
components, `window.VZ` data, inline-style + CSS-var tokens).

Three deliverables, in this order: (1) a **component library + Storybook** built from the
`EduNex Components.html` build contract, (2) `EduNex Landing.html` marketing page, (3) full EduNex LMS app
(login + admin / student / teacher screens). Vietnamese content. EduNex = English + career coaching
for Vietnamese people in New Zealand, founder Ms. Jane.

**Build-contract source:** `design/prototype/EduNex Components.html` — enumerates every component
across its states. Storybook is the living version of this contract; screens are assembled only
after the system exists.

**Brainstorm summary:** [260617-1232-edunex-port-brainstorm.md](../260617-1232-edunex-port-brainstorm.md)

## Confirmed stack & decisions

| Decision | Choice |
|---|---|
| Stack | React 18 + Vite + Tailwind + **TypeScript** |
| CSS | **Full Tailwind rewrite** (tokens mirrored to `tailwind.config`; arbitrary values for hand-tuned numbers; delete source CSS files) |
| Images | Keep `<image-slot>` (React-wrapped custom element; read-only outside design runtime) |
| Routing | **React Router** replaces `useState('screen')` switcher |
| Tokens | **Tailwind theme tokens** — all design tokens (gold/charcoal scales, radii, shadows, fonts) defined in `tailwind.config`; components use utility classes (`bg-a-500`, `rounded-md`, `shadow-pop`, `font-head`). No CSS-var layer except where `<image-slot>` needs it. |
| Storybook | **Storybook 8** (Vite builder, Tailwind wired into preview, autodocs). One `*.stories.tsx` per component covering all states in the Components page. |
| Build order | **Components + Storybook first**, then Landing, then LMS in phases |
| Dropped | Design-tool chrome: tweaks-panel, device frames, Stage scaling, tooling bar |
| Copy rule | No em dash in visible copy; use ` · ` / `:` / comma |
| Mode | **TDD** (Vitest + React Testing Library; tests-first per phase) |

## Phases

| Phase | Name | Status | Effort |
|-------|------|--------|--------|
| 1 | [Scaffold, tooling & Storybook](./phase-01-scaffold-tooling.md) | Done | 3h |
| 2 | [Foundations & Icons](./phase-02-foundations-icons.md) | Done | 2h |
| 3 | [Shared primitives](./phase-03-shared-primitives.md) | Done | 4h |
| 4 | [Composites & sample data](./phase-04-composites-data.md) | Done | 4h |
| 5 | [Landing page](./phase-05-landing-page.md) | Pending | 5h |
| 6 | [Login & app shell](./phase-06-login-app-shell.md) | Pending | 3h |
| 7 | [Admin screens](./phase-07-admin-screens.md) | Pending | 8h |
| 8 | [Student app](./phase-08-student-app.md) | Pending | 5h |
| 9 | [Teacher app](./phase-09-teacher-app.md) | Pending | 3h |
| 10 | [Polish & QA](./phase-10-polish-qa.md) | Pending | 3h |

## Dependency chain

P1 → P2 → P3 → P4 (component library + Storybook fully populated after P4, before any screen).
P4 → P5 (landing reuses Logo + tokens) and P4 → P6 → {P7, P8, P9} → P10.
Landing (P5) depends only on P1–P4 tokens/Logo and can ship/deploy on its own once P5 is done.

## Token sets (both go in tailwind.config)

- **Landing palette** (inline in `EduNex Landing.html`): `cream #FBF6EA`, `gold #F2B400`, `ink #22252E`,
  fonts Bricolage Grotesque (head) + Plus Jakarta Sans (body).
- **App palette** (`edunex/theme.css` over `styles.css`): charcoal `p-900 #15171C … p-50 #F6F3EC`,
  gold `a-500 #F2B400`, neutrals `ink-*`, `bg #F6F3EC`, surfaces, status colors, radii `--r-*`, shadows `--sh-*`.

## Source map (prototype → port)

| Source | Port target |
|---|---|
| `EduNex Components.html` | component inventory + states → one `*.stories.tsx` per component (P2–P4) |
| `EduNex Landing.html` | `src/landing/*` |
| `src/icons.jsx` | `src/components/Icon.tsx` |
| `src/ui.jsx` | `src/components/*` (Avatar, Stat, Modal, Sheet, Segmented, Toggle, Tip, StatusBadge, FileIcon, Button, Chip, Tag, Field) |
| `edunex/login.jsx` | `src/components/Logo.tsx`, `src/app/Login.tsx` |
| `edunex/{dashboard,classes,student}.jsx` (composites) | `src/components/{StatCards,ClassCard,SessionCard,ZoomPanel}.tsx` |
| `edunex/data.js` (`window.VZ`) | `src/data/edunex.ts` (typed) |
| `edunex/shell.jsx` | `src/app/admin/AdminShell.tsx` |
| `edunex/dashboard|classes|calendar|people.jsx`, `src/admin-materials.jsx` | `src/app/admin/*` |
| `edunex/student.jsx` | `src/app/student/*` |
| `edunex/teacher.jsx` | `src/app/teacher/*` |
| `image-slot.js` | `public/image-slot.js` + `src/lib/ImageSlot.tsx` |
| `assets/english-class.png` | `public/assets/english-class.png` |
| `Ms-Jane.png` (remote edunex.co.nz) | downloaded → `public/assets/ms-jane.png` (self-contained) |

## Out of scope

- Design-tool harness (`tweaks-panel.jsx`, `frames/`, `edunex/canvas.jsx`, `Screen Map.html`, `verify/`).
- Backend / real auth / persistence (prototype data stays static).
- `src/wireframe.jsx` lo-fi wireframes (exploration artifact, not product).

## Open questions

- Whether to deploy landing (P2) independently before LMS is done (sequencing only; not implementation-blocking).

## Validation Log

### Session 1 (2026-06-17)
Verification: greenfield target (empty dir) so plan file-refs are create-targets, not existing-symbol claims. All source prototype refs confirmed present in `design/prototype/`. Failed: 0.

Decisions confirmed (4 questions):
1. **Post-login routing** → each role lands on its own home (admin→`/admin`, coach→`/teacher`, student→`/student`). Resolves prior open question. Propagated: P4.
2. **Admin dashboard variants** → port default "Balanced" only; drop the 3-variant tweak switcher (design-tool feature, not product). Propagated: P5 (already aligned).
3. **Ms-Jane.png** → download locally to `public/assets/ms-jane.png` (self-contained). Propagated: P1 (copy step), P2 (use local src).
4. **TDD scope** → Vitest + RTL behavior/render/routing tests; visual parity verified manually per section. Playwright visual regression is OUT (P8 "optional" downgraded to deferred). Propagated: P2, P8.

### Whole-Plan Consistency Sweep
Re-read all phase files + plan.md. Checked for stale terms (remote-image refs, "all roles to /admin", optional/Playwright smoke, unresolved open questions). All propagated; no contradictions remain. Em-dash refs that survive are intentional (rule/test references). 

Recommendation: proceed to implementation. No unresolved contradictions.

### Session 2 (2026-06-17) — Restructure: components + Storybook first

Trigger: fetched `EduNex Components.html` build contract from the Claude Design handoff bundle
(`design/prototype/`), plus `design-summary.md` and chat transcripts (`design/chats/`).

Restructured the plan so the **component library + Storybook is built before any screen**, matching
the build contract's intent ("implement the system before screens are assembled").

Decisions confirmed (4 questions):
1. **Styling** → full Tailwind rewrite (unchanged from Session 1).
2. **Tokens** → defined as **Tailwind theme tokens** in `tailwind.config` (not a CSS-var layer);
   components use utility classes. CSS vars retained only where `<image-slot>` needs them.
3. **Storybook** → **Storybook 8** + Vite builder + Tailwind in preview + autodocs. One stories
   file per component, a story per state from the Components page.
4. **Phase order** → components/Storybook (P1–P4) → Landing (P5) → LMS (P6–P10).

Phase changes:
- P1 gains Storybook 8 setup.
- Old P3 (shared primitives & data) split into: **P2 Foundations & Icons**, **P3 Shared primitives**,
  **P4 Composites & sample data** — each adds `*.stories.tsx`.
- Screens renumbered: Landing P2→P5, Login P4→P6, Admin P5→P7, Student P6→P8, Teacher P7→P9, Polish P8→P10.

Component inventory (the finite contract from `EduNex Components.html`):
- Foundations: color scales, typography, radii & shadows, 51-name Icon set.
- Primitives: Button, StatusBadge, Chip, Tag, Field, Avatar, FileIcon, Segmented, Toggle, Stat, Tip, Modal, Sheet.
- Composites: Logo, StatCards, ClassCard, SessionCard, ZoomPanel.
