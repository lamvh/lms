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
| Styling | Tailwind CSS (design tokens mirrored into `tailwind.config`) |
| Routing | React Router (`/`, `/login`, `/admin/*`, `/student/*`, `/teacher/*`) |
| Images | `<image-slot>` custom element, wrapped as a React component |
| Tests | Vitest + React Testing Library (behavior/render/routing; visual parity verified manually) |

Source prototype reference: `/tmp/edunex_design/edunex-lms/project/`.
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

P1 scaffold → **P2 landing page (ships first)** → P3 primitives + data → P4 login + shell →
P5 admin screens → P6 student app → P7 teacher app → P8 polish + QA.
See the plan for phase detail and status.

## Changelog

> Add an entry per feature / change. Format: `### YYYY-MM-DD · summary` then bullets.

### 2026-06-17 · Project planned
- Fetched Claude Design handoff bundle (`EduNex Landing.html` + LMS prototype).
- Brainstorm + implementation plan created: `plans/260617-1232-edunex-react-port/`.
- Decisions: React + Vite + Tailwind + TypeScript; full Tailwind rewrite; keep `<image-slot>`;
  React Router; drop design-tool chrome; each role lands on its own home; dashboard ships default
  "Balanced" layout only; `Ms-Jane.png` bundled locally; TDD = behavior/render tests, visual manual.
- This overview created with the color schema captured from the Claude design.
- _No application code implemented yet._
