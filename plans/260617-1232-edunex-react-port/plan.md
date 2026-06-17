---
title: "EduNex React Port (Landing + LMS)"
description: "Port Claude Design EduNex prototype to React + Vite + Tailwind + TypeScript: landing page first, then full LMS app"
status: pending
priority: P2
effort: ~32h
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

Two deliverables: (1) `EduNex Landing.html` marketing page, (2) full EduNex LMS app
(login + admin / student / teacher screens). Vietnamese content. EduNex = English + career coaching
for Vietnamese people in New Zealand, founder Ms. Jane.

**Brainstorm summary:** [260617-1232-edunex-port-brainstorm.md](../260617-1232-edunex-port-brainstorm.md)

## Confirmed stack & decisions

| Decision | Choice |
|---|---|
| Stack | React 18 + Vite + Tailwind + **TypeScript** |
| CSS | **Full Tailwind rewrite** (tokens mirrored to `tailwind.config`; arbitrary values for hand-tuned numbers; delete source CSS files) |
| Images | Keep `<image-slot>` (React-wrapped custom element; read-only outside design runtime) |
| Routing | **React Router** replaces `useState('screen')` switcher |
| Build order | **Landing first**, then LMS in phases |
| Dropped | Design-tool chrome: tweaks-panel, device frames, Stage scaling, tooling bar |
| Copy rule | No em dash in visible copy; use ` · ` / `:` / comma |
| Mode | **TDD** (Vitest + React Testing Library; tests-first per phase) |

## Phases

| Phase | Name | Status | Effort |
|-------|------|--------|--------|
| 1 | [Scaffold & tooling](./phase-01-scaffold-tooling.md) | Pending | 2h |
| 2 | [Landing page](./phase-02-landing-page.md) | Pending | 5h |
| 3 | [Shared primitives & data](./phase-03-shared-primitives-data.md) | Pending | 3h |
| 4 | [Login & app shell](./phase-04-login-app-shell.md) | Pending | 3h |
| 5 | [Admin screens](./phase-05-admin-screens.md) | Pending | 8h |
| 6 | [Student app](./phase-06-student-app.md) | Pending | 5h |
| 7 | [Teacher app](./phase-07-teacher-app.md) | Pending | 3h |
| 8 | [Polish & QA](./phase-08-polish-qa.md) | Pending | 3h |

## Dependency chain

P1 → P2 (landing ships after scaffold; no app deps).
P1 → P3 → P4 → {P5, P6, P7} → P8.
P2 is independent of P3-P7 and can ship/deploy on its own after P1.

## Token sets (both go in tailwind.config)

- **Landing palette** (inline in `EduNex Landing.html`): `cream #FBF6EA`, `gold #F2B400`, `ink #22252E`,
  fonts Bricolage Grotesque (head) + Plus Jakarta Sans (body).
- **App palette** (`edunex/theme.css` over `styles.css`): charcoal `p-900 #15171C … p-50 #F6F3EC`,
  gold `a-500 #F2B400`, neutrals `ink-*`, `bg #F6F3EC`, surfaces, status colors, radii `--r-*`, shadows `--sh-*`.

## Source map (prototype → port)

| Source | Port target |
|---|---|
| `EduNex Landing.html` | `src/landing/*` |
| `src/icons.jsx` | `src/components/Icon.tsx` |
| `src/ui.jsx` | `src/components/*` (Avatar, Stat, Modal, Sheet, Segmented, Toggle, Tip, StatusBadge, FileIcon) |
| `edunex/login.jsx` | `src/components/Logo.tsx`, `src/app/Login.tsx` |
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
