# EduNex Port · Brainstorm Summary

_2026-06-17 · source: Claude Design handoff bundle `edunex-lms`_

## Problem statement
Port Claude Design HTML/CSS/JS prototype to a real React app. Two deliverables:
1. `EduNex Landing.html` — marketing landing page (Vietnamese; EduNex = English + career coaching for Vietnamese in New Zealand, founder Ms. Jane).
2. Full **EduNex LMS app** — login + admin/teacher/student screens.

Target dir `/Users/lamvh/src/lms-edunex/` is empty (no git, no package.json).

## Source prototype facts
- Runtime: React 18 UMD + in-browser Babel (`type="text/babel"`), global-scope components (`window.X`), data on `window.VZ`.
- Styling: ~95% inline styles driven by CSS-variable tokens in `styles.css` + `edunex/theme.css`; utility classes `.btn/.card/.navlink/.badge`.
- `app.jsx` harness = design-tool chrome (tooling tabs, tweaks panel, device frames, scaling `Stage`, landing shown via iframe). NOT product.
- Fonts: Bricolage Grotesque (head) + Plus Jakarta Sans (body). Palette: cream/gold.
- `<image-slot>` custom element (`image-slot.js`) = drag-drop image placeholder; persists only inside claude.ai/design runtime.
- Project rule: no em dash (—) in visible copy; use ` · ` / `:` / comma.

### Real app surface (~3,900 lines)
- Landing (1 page, 10 sections: Nav · Hero · DCI · English feature · Founder · Packages · Blog · Testimonials · CTA · Footer).
- Login (role-routed: admin / coach / student).
- Admin (`edunex/shell.jsx` router): dashboard, classes, class detail, timetable, materials, teachers, students, student detail, settings.
- Student (`edunex/student.jsx`, mobile).
- Teacher (`edunex/teacher.jsx`) — partial; some flows route to admin.
- Primitives: `src/icons.jsx` (Icon), `src/ui.jsx` (Avatar, StatusBadge, FileIcon, Segmented, Toggle, Stat, Modal, Sheet, Tip), `edunex/login.jsx` (Logo, LoginScreen).
- Data: `edunex/data.js` → `window.VZ`.

## Confirmed decisions
| Decision | Choice |
|---|---|
| Stack | React + Vite + Tailwind |
| Scope | Landing + full LMS app |
| Images | Keep `<image-slot>` placeholders (wrapped React component) |
| CSS | **Full Tailwind rewrite** (delete CSS files; tokens → tailwind.config; arbitrary values for hand-tuned numbers) |
| Language | **TypeScript** (typed data model + props) |
| Build order | **Landing first**, then LMS in phases |
| Routing | React Router replaces `useState('screen')` switcher: `/`, `/login`, `/admin/*`, `/student/*`, `/teacher/*` |
| Design-tool chrome | **Dropped** (tweaks-panel, frames, Stage, tooling bar); student app becomes responsive |

## Target architecture
```
lms-edunex/
  index.html · tailwind.config.ts · vite.config.ts · tsconfig.json
  src/
    main.tsx              register image-slot.js, mount router
    styles/index.css      Tailwind layers + @font-face/preconnect + token vars retained for image-slot
    lib/ImageSlot.tsx     React wrapper for <image-slot>
    data/edunex.ts        typed port of window.VZ
    types/                shared TS types
    components/           Icon, Logo, Avatar, Stat, Modal, Sheet, Segmented, Toggle, Tip, StatusBadge, FileIcon
    landing/              Nav, Hero, Dci, Feature, Founder, Packages, Blog, Testimonials, Cta, Footer + LandingPage
    app/
      Login.tsx
      admin/  AdminShell + Dashboard, Classes, ClassDetail, Calendar, Materials, People, StudentDetail, Settings
      student/ StudentApp
      teacher/ TeacherApp
    routes.tsx
```

## Proposed phases (for /ck:plan)
- **P0 Scaffold**: Vite+React+TS+Tailwind, fonts, tokens→tailwind.config, router skeleton, ImageSlot wrapper, register image-slot.js.
- **P1 Landing page**: port 10 sections to typed components, mobile hamburger menu, responsive breakpoints (980/560/400). Primary deliverable.
- **P2 Primitives + data**: Icon set, Logo, ui primitives, typed `data/edunex.ts`.
- **P3 Login + routing shell**: LoginScreen, role routing, admin shell (sidebar/topbar/router).
- **P4 Admin screens**: dashboard, classes, class detail, timetable, materials, people, student detail, settings.
- **P5 Student app (mobile)**: responsive port of student.jsx.
- **P6 Teacher app**: port teacher.jsx (note partial coverage).
- **P7 Polish/QA**: cross-links (landing→/login), responsive pass, visual diff vs prototype, em-dash sweep.

## Risks
- **Full Tailwind rewrite drift**: hand-tuned pixel values may shift. Mitigation: mirror exact tokens in tailwind.config; use arbitrary values `[15px]` etc; visual-diff each landing section vs prototype before moving on.
- **image-slot outside design runtime**: drag-drop won't persist; renders `src` read-only. Acceptable per user choice; wrapper keeps swap-to-`<img>` trivial.
- **Teacher role partial** in source; teacher screens may be thinner than admin.
- **`<image-slot>` + TS**: need JSX intrinsic-element typing for the custom element.

## Open questions
- None blocking. Confirm at plan time whether `/admin` is the default post-login landing for all roles or each role lands on its own home.
