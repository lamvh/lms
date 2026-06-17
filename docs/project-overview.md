# EduNex · Project Overview

> Living document. Summarizes the project and tracks every feature / change.
> Update the **Changelog** section on each meaningful change. Keep newest entries on top.

_Last updated: 2026-06-17_

## What this is

EduNex is an English + career coaching service for Vietnamese people in New Zealand (founder Ms. Jane).
This repo ports the Claude Design HTML/CSS/JS prototype into a real React app:

1. **Landing page** (`/`) : Vietnamese marketing page (10 sections).
2. **LMS app** : login + role apps (Admin desktop, Student mobile, Teacher desktop).

Tagline: **Learn More · Achieve More · Be Unstoppable**

## Stack

| Concern | Choice |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS (all design tokens as Tailwind theme tokens in `tailwind.config`) |
| Components | Component library + **Storybook 8** built first, from the `EduNex Components.html` build contract |
| Routing | React Router (`/`, `/login`, `/admin/*`, `/student/*`, `/teacher/*`) |
| Images | `<image-slot>` custom element, wrapped as a React component |
| Tests | Vitest + React Testing Library (behavior/render/routing; visual parity verified manually) |

Build order: **components + Storybook first → landing page → LMS app.**

Source prototype reference (the original "Claude Design"): `design/prototype/` — the
HTML/CSS/JS + React-UMD prototype this app is ported from. The component build contract is
`design/prototype/EduNex Components.html`; design summary in `design/prototype/design-summary.md`;
original design chats in `design/chats/`. See also `design/prototype/PROTOTYPE-NOTES.md`.
The repo is the source of truth; the prototype is kept as the visual/design reference.
Implementation plan: `plans/260617-1232-edunex-react-port/plan.md`.

## Project structure (target)

```
src/
  landing/      Landing page sections (Nav, Hero, Dci, Feature, Founder, Packages, Blog, Testimonials, Cta, Footer)
  app/
    Login.tsx
    admin/      AdminShell + Dashboard, Classes, ClassDetail, Calendar, Materials, People, StudentDetail, Settings
    student/    StudentApp (mobile, responsive)
    teacher/    TeacherApp (coach scope)
  components/   Shared primitives: Icon, Logo, Avatar, Stat, Modal, Sheet, Segmented, Toggle, Tip, StatusBadge, FileIcon
  data/         edunex.ts (typed sample data, ported from window.VZ)
  lib/          ImageSlot.tsx, color.ts
  types/        edunex.ts, image-slot.d.ts
public/         image-slot.js, assets/ (english-class.png, ms-jane.png)
```

## Typography

| Role | Font | Source |
|---|---|---|
| Headings | Bricolage Grotesque | Google Fonts |
| Body / UI | Plus Jakarta Sans | Google Fonts |

## Color schema (from Claude Design)

Two related token sets. The **landing page** uses a warm cream + gold palette; the **LMS app** uses a
warm-charcoal structure with the same gold accent on a cream canvas. Both go into `tailwind.config`.

### Landing palette

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FBF6EA` | page background |
| `cream-2` | `#F6EEDC` | soft panels / image backdrops |
| `paper` | `#FFFFFF` | cards |
| `ink` | `#22252E` | headings |
| `ink-2` | `#3C414C` | body text |
| `muted` | `#6E7280` | secondary text |
| `gold` | `#F2B400` | primary accent / buttons |
| `gold-600` | `#D29900` | accent hover |
| `gold-700` | `#A9760B` | accent text on light |
| `gold-soft` | `#FFF1CD` | accent fill soft |
| `gold-tint` | `#FCF6E6` | icon chip backgrounds |
| `line` | `#ECE1CC` | borders |
| `line-soft` | `#F4ECDC` | soft borders |
| `green` | `#2E9E6B` | success / positive |

Landing shadows: `sh-card`, `sh-soft` (warm low-opacity, see prototype `:root`).

### App palette (LMS)

**Primary scale (warm charcoal · sidebar, headings, structure)**

| `p-900` | `p-800` | `p-700` | `p-600` | `p-500` | `p-400` | `p-300` | `p-200` | `p-100` | `p-50` |
|---|---|---|---|---|---|---|---|---|---|
| `#15171C` | `#1C1F26` | `#242832` | `#333845` | `#474D5A` | `#6E7480` | `#A2A7B1` | `#D5D8DE` | `#E9E6DE` | `#F6F3EC` |

**Accent scale (EduNex gold)**

| `a-700` | `a-600` | `a-500` | `a-400` | `a-100` | `a-50` |
|---|---|---|---|---|---|
| `#B07E00` | `#D29900` | `#F2B400` | `#FFC93D` | `#FFEFC2` | `#FFF9E8` |

**Theme hooks:** `brand #22262F` · `brand-strong #15171C` · `accent #F2B400`

**Neutrals / surfaces**

| Token | Hex |
|---|---|
| `ink-900` | `#191B20` |
| `ink-700` | `#383D46` |
| `ink-500` | `#646A75` |
| `ink-400` | `#8B909B` |
| `ink-300` | `#AEB2BB` |
| `line` | `#E9E4D9` |
| `line-soft` | `#F1EDE3` |
| `bg` | `#F6F3EC` |
| `surface` | `#FFFFFF` |
| `surface-2` | `#FBF8F1` |
| `surface-3` | `#F1ECE1` |

**Status**

| Token | Color | Background |
|---|---|---|
| success | `#2E9E6B` | `#DFF2E8` |
| warn | `#C9821F` | `#FBF1E0` |
| danger | `#D55B43` | `#FBE7E2` |
| info | `#2A6298` | `#E5EEF6` |
| zalo | `#0068FF` | `#E5F0FF` |

### Radii & shadows (app)

- Radii: `r-xs 6px` · `r-sm 9px` · `r-md 13px` · `r-lg 18px` · `r-xl 24px` · `r-pill 999px`
- Shadows: `sh-1` (subtle), `sh-2` (raised), `sh-card` (cards), `sh-pop` (modals / popovers)

## Conventions

- **No em dash** (`—`) in any user-visible copy. Use ` · `, `:`, a comma, or parentheses.
- Files: kebab-case for non-component modules; PascalCase for React components.
- Keep components focused; split files over ~200 lines.

## Build order

P1 scaffold + Storybook → P2 foundations + icons → P3 shared primitives → **P4 composites + data
(component library + Storybook fully populated here)** → P5 landing page → P6 login + shell →
P7 admin screens → P8 student app → P9 teacher app → P10 polish + QA.
See the plan for phase detail and status.

## Changelog

> Add an entry per feature / change. Format: `### YYYY-MM-DD · summary` then bullets.

### 2026-06-17 · Phase 6 done: login & app shell
- `Login` (two-panel, role picker) routes by role: admin→`/admin`, coach→`/teacher`, student→`/student`.
- `AdminShell`: sidebar (Logo, New class, grouped nav, settings, user + sign-out), topbar (route title,
  search, bell), routed `<Outlet>`. Active nav + title derived from the URL via `NavLink`/`useLocation`.
- `ToastProvider`/`useNotify` context replaces the prototype's imperative toast stack; sign-out → `/login`.
- Nested admin routes wired (dashboard/classes/:id/calendar/materials/teachers/students/:id/settings)
  with placeholder screens (real ones land in P7). `/admin` redirects to dashboard.
- 7 new tests (role pick + routing, topbar title, redirect, sign-out) — 47 total.
- Verified: 47 tests, `build`, `build-storybook` all green.

### 2026-06-17 · Phase 5 done: landing page
- Ported `EduNex Landing.html` (10 sections) to React at `/`: Nav (sticky + mobile hamburger menu),
  Hero, D.C.I, English feature, Founder, Packages (4 tiers, Platinum "popular"), Blog, Testimonials,
  CTA band, Footer. Verbatim Vietnamese copy, no em dash. Static content in `landing-data.ts`.
- Full Tailwind port using the prototype's exact tokens + breakpoints (`max-[980px]/[560px]/[400px]`);
  `ImageSlot` for hero/founder/English photos (local `ms-jane.png` / `english-class.png`).
- `LandingPage` mounted at `/`; "Đăng nhập" / app links route to `/login`.
- 7 new tests (sections, 4 tiers + prices, login link, em-dash guard, hamburger toggle) — 40 total.
- Verified: 40 tests, `build`, `build-storybook`, dev server (HTTP 200 + assets) all green.
- Not yet done: pixel-by-pixel visual diff vs prototype (structure/tokens ported from source CSS).

### 2026-06-17 · Phase 4 done: composites & data (component library complete)
- Typed sample-data model `src/data/edunex.ts` + `src/types/edunex.ts` (teachers, classes, students,
  materials, templates, znsLog, homework, submissions, results, payments, stats + lookups), preserving
  the load-bearing init order (zoom/roster/focusStudent/stats). 5 data tests.
- 5 composites: Logo, StatCards, ClassCard (active/soon/paused), SessionCard (next-up/later),
  ZoomPanel (editable URL + passcode, copy). `to12` time helper. Each with stories.
- 11 new tests (data + ClassCard/SessionCard/ZoomPanel/to12) — 34 total passing.
- **Storybook now covers the entire build contract** (foundations + 13 primitives + 5 composites).
- Verified: 34 tests, `build`, `build-storybook` all green.

### 2026-06-17 · Phase 3 done: shared primitives
- Ported all 13 section-02 primitives to Tailwind components: Button (5 variants · sm · icon · loading ·
  disabled), StatusBadge, Chip, Tag, Field, Avatar, FileIcon, Segmented, Toggle, Stat, Tip, Modal, Sheet.
- `shade()` color helper in `src/lib/color.ts`. Modal/Sheet overlays are frame-scoped (`absolute inset-0`),
  not body portals, matching the prototype; shared `vz-rise`/`spin` keyframes in index.css.
- 14 new tests (Button, Toggle, Segmented, Field, Avatar, StatusBadge, shade) — 23 total passing.
- One `*.stories.tsx` per primitive with states from the Components page; Storybook section Primitives/*.
- Verified: 23 tests, `build`, `build-storybook` all green.

### 2026-06-17 · Phase 2 done: foundations & icons
- `Icon` component ported (57 stroke glyphs, typed `IconName`, `size`/`stroke`, `file` fallback for
  unknown names); `ICON_NAMES` export. 4 tests passing.
- Storybook: `Foundations/Icon` (full glyph grid + single controllable icon) and
  `Foundations/Overview` (color scales, typography, radii, shadows) — section 01 of the build contract.
- Verified: 9 tests green, `build` + `build-storybook` pass.

### 2026-06-17 · Phase 1 done: scaffold + tooling + Storybook
- Vite + React 18 + TypeScript (strict) scaffolded; React Router skeleton with 5 stub routes.
- All design tokens defined as Tailwind theme tokens in `tailwind.config.ts` (charcoal `p-*`, gold `a-*`,
  warm `ink-*`/surfaces/status, landing cream+gold, fonts head/body/mono, radii, shadows).
- `<image-slot>` custom element wired (`public/image-slot.js` + typed `ImageSlot` wrapper); `Ms-Jane.png`
  bundled locally.
- Vitest + RTL set up; 5 tests passing (ImageSlot wrapper, route resolution). Storybook 8 (Vite builder,
  Tailwind preview, autodocs) builds with a Welcome smoke story.
- Verified: `dev` (HTTP 200), `build`, `test`, `build-storybook` all green.

### 2026-06-17 · Plan restructured: components + Storybook first
- Fetched the `EduNex Components.html` build contract from the Claude Design handoff bundle
  (saved to `design/prototype/`), plus `design-summary.md` and chat transcripts (`design/chats/`).
- Reordered the plan so the component library + Storybook is built before any screen:
  P1 scaffold+Storybook → P2 foundations+icons → P3 primitives → P4 composites+data → then
  landing (P5) → LMS (P6–P10). Old P3 (primitives+data) split into P2/P3/P4; screens renumbered.
- Tokens now defined as Tailwind theme tokens (not a CSS-var layer); Storybook 8 + Vite + autodocs.

### 2026-06-17 · Project planned
- Fetched Claude Design handoff bundle (`EduNex Landing.html` + LMS prototype).
- Brainstorm + implementation plan created: `plans/260617-1232-edunex-react-port/`.
- Decisions: React + Vite + Tailwind + TypeScript; full Tailwind rewrite; keep `<image-slot>`;
  React Router; drop design-tool chrome; each role lands on its own home; dashboard ships default
  "Balanced" layout only; `Ms-Jane.png` bundled locally; TDD = behavior/render tests, visual manual.
- This overview created with the color schema captured from the Claude design.
- _No application code implemented yet._
