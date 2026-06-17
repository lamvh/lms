# EduNex · Claude Design Summary

> What was built in the original Claude Design prototype (`design/prototype/`).
> This is the visual / design reference the React port is based on.
> Last updated: 2026-06-17

## What this covers

EduNex is an English + career coaching service for Vietnamese people in New Zealand
(founder Ms. Jane). Tagline: **Learn More · Achieve More · Be Unstoppable**.

The prototype delivers two things: a Vietnamese marketing **landing page**, and a full
multi-role **LMS app** (login + Admin desktop + Teacher desktop + Student mobile). Built
as a React 18 (UMD + in-browser Babel) prototype, ~95% inline styles driven by CSS-variable
design tokens, sample data on `window.VZ`.

## 1. Landing page (`EduNex Landing.html`)

Single Vietnamese marketing page, 10 sections, warm cream + gold palette, with a mobile
hamburger menu and responsive breakpoints.

| # | Section | Content |
|---|---------|---------|
| 1 | Nav | Sticky top bar, anchor links, "Tư vấn miễn phí" CTA, mobile hamburger |
| 2 | Hero | Headline + Ms. Jane photo slot, floating founder badge |
| 3 | D.C.I | Philosophy band (3-point value proposition) |
| 4 | English feature | Class photo + feature copy |
| 5 | Founder | Ms. Jane bio block |
| 6 | Packages | Course / pricing cards |
| 7 | Blog | Article cards band |
| 8 | Testimonials | Student feedback (marked illustrative) |
| 9 | CTA | "Liên hệ" contact / consultation band |
| 10 | Footer | Links + brand |

Photos use `<image-slot>` drag-drop placeholders (hero, English class, founder).

## 2. LMS app (`EduNex LMS.html`)

Role-routed from a single login. Three role experiences:

### Login
Role picker routing to Admin, Coach (Teacher), or Student.

### Admin (desktop · `edunex/shell.jsx`)
Sidebar-navigated desktop app, grouped nav:

- **Main:** Dashboard · Classes · Timetable · Materials
- **People:** Teachers · Students
- **Settings**

Screens: Dashboard, Class list, **Class detail**, Timetable (calendar), Materials library,
People (teachers / students lists), **Student detail**, Settings. The dashboard ships a
default "Balanced" layout.

### Teacher / Coach (desktop · `edunex/teacher.jsx`)
Focused coach scope with badge counts:

- Today's Classes · My Classes · Homework to Mark · Attendance · Student Progress
- Plus a Class detail view

### Student (mobile · `edunex/student.jsx`)
Bottom-tab mobile app:

- Home · Courses · Homework · Profile
- Plus course detail with Zoom link copy

## 3. Shared building blocks

- **Icons** (`src/icons.jsx`): single `Icon` set used across all screens.
- **UI primitives** (`src/ui.jsx`): Avatar, Stat, Modal, Sheet, Segmented, Toggle, Tip,
  StatusBadge, FileIcon.
- **Logo + login** (`edunex/login.jsx`).
- **Sample data** (`edunex/data.js` → `window.VZ`): classes, sessions, materials, people, etc.
- **Screen Map** (`Screen Map.html`): a design-canvas overview that renders the real
  components from the app, grouped by role, so every screen can be reviewed side by side.

## 4. Design system

### Typography
- Headings: **Bricolage Grotesque**
- Body / UI: **Plus Jakarta Sans**

### Landing palette (cream + gold)
`cream #FBF6EA` · `paper #FFFFFF` · `ink #22252E` · `gold #F2B400` · `green #2E9E6B`,
plus soft tints, borders and warm low-opacity card shadows.

### App palette (LMS)
- Primary warm-charcoal scale `p-900 #15171C … p-50 #F6F3EC` (sidebar, structure, headings)
- Accent EduNex gold `a-500 #F2B400` (+ 50 → 700 steps)
- Neutrals / surfaces, status colors (success / warn / danger / info / zalo)
- Radii `r-xs … r-pill`, shadows `sh-1 / sh-2 / sh-card / sh-pop`

(Full hex tables live in `docs/project-overview.md`.)

## 5. Conventions

- **No em dash** in any user-visible copy. Use ` · `, `:`, a comma, or parentheses.
- Vietnamese content throughout the landing page and LMS copy.
- Testimonials and sample data are illustrative placeholders, not real records.

## 6. Out of scope (design-tool only, not product)

The prototype ran inside a design harness that does **not** port to the app: the tweaks
panel, device frames, canvas/Screen Map scaling, and the tooling chrome. Backend, real
auth and persistence are also out of scope. The student app becomes responsive in the port
instead of a fixed device frame.
