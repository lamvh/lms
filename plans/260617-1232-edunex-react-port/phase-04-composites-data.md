---
phase: 4
title: "Composites & sample data"
status: pending
priority: P1
effort: "4h"
dependencies: [3]
---

# Phase 4: Composites & sample data

## Overview
Port the typed sample-data model (was bundled into the old shared-primitives phase) and the role-specific
composite components from section 03 ("Composites · by role") of `EduNex Components.html`: `Logo`,
`StatCards`, `ClassCard`, `SessionCard`, `ZoomPanel`. Each gets a `*.stories.tsx` driven by the sample
data. **After this phase the component library + Storybook is fully populated** — the build contract is
complete and screen assembly can begin.

## Requirements
- Functional: typed `edunex` data exports; `Logo`, `StatCards`, `ClassCard`, `SessionCard`, `ZoomPanel`
  exported with stories matching the Components page states.
- Non-functional: TS interfaces for Teacher, ClassItem, Student, Material, Template, Homework, Submission,
  Result, Payment; composites consume the typed data, not `window.VZ`.

## Architecture
- `src/data/edunex.ts`: convert the IIFE/`window.VZ` from `edunex/data.js` to module exports. Keep
  generators (`makeStudents`, zoom/roster mapping, `focusStudent` mutation) as pure init; export typed
  `teachers, classes, students, materials, templates, znsLog, homework, submissions, results, payments,
  DAYS, DAYS_FULL, todayIndex, focusStudent, stats` + lookups `teacherById/classById/studentById`.
- `src/types/edunex.ts`: shared interfaces (note `year` repurposed as learning focus; `zoom`, `roster`,
  `classes` added post-init).
- `src/components/Logo.tsx`: port from `edunex/login.jsx` (gradient mark + Edu/Nex wordmark; props
  `size, light, showText, textSize`). Used by login, app shells, landing nav.
- `src/components/StatCards.tsx`: admin KPI row of four `Stat` cards bound to `stats`.
- `src/components/ClassCard.tsx`: program summary (status badge, coach, schedule, room, quick actions);
  `status` drives the badge — states `active | soon | paused`. Props `c, openClass, notify`.
- `src/components/SessionCard.tsx`: student timetable row (time range, class, coach, room, Zoom);
  first card (`i=0`) flags "Next up". Props `s, i, open`.
- `src/components/ZoomPanel.tsx`: per-class Zoom management (editable URL + passcode, copy-to-clipboard).
  Props `c, notify`.
- Stories use the same fixtures the Components page uses: `C_ACTIVE = classes[0]`, `C_SOON`/`C_PAUSED`
  by status, `SESS = { ...C_ACTIVE.schedule[0], class:C_ACTIVE }`.

## Related Code Files
- Create: `src/data/edunex.ts`, `src/types/edunex.ts`
- Create: `src/components/{Logo,StatCards,ClassCard,SessionCard,ZoomPanel}.tsx`
- Create: matching `*.stories.tsx` for each composite
- Source ref: `design/prototype/{edunex/data.js,edunex/login.jsx,edunex/dashboard.jsx,edunex/classes.jsx,edunex/student.jsx}`;
  `design/prototype/EduNex Components.html` (section 03 blocks + the `C_ACTIVE/C_SOON/C_PAUSED/SESS` fixtures)

## Implementation Steps
1. Define `src/types/edunex.ts` interfaces from `data.js` shapes.
2. Port `data.js` → `edunex.ts` preserving derived data (zoom ids, rosters, `focusStudent` overrides,
   `stats`). Export typed const. Preserve init ORDER (zoom/roster/focusStudent mutate after array creation).
3. Port `Logo` from `login.jsx`.
4. Port `StatCards`, `ClassCard`, `SessionCard`, `ZoomPanel` from their source screens; keep prop
   signatures matching the Components page so later screens drop in.
5. Write `*.stories.tsx` per composite with the Components-page states, using the shared fixtures.

## Tests First (TDD)
- `edunex.data.test.ts`: `classById('c1').name === 'VIP Career Program'`;
  `focusStudent.name === 'Nguyễn Thảo My'` with `classes=['c2','c5','c6']`; `stats.teachers === 5`;
  rosters non-empty.
- `ClassCard.test.tsx`: renders the class name + `StatusBadge` matching `c.status`;
  `active`/`soon`/`paused` show the right badge label.
- `SessionCard.test.tsx`: `i=0` shows "Next up"; `i>0` does not.
- `ZoomPanel.test.tsx`: copy button calls `notify` (clipboard mocked).

## Success Criteria
- [ ] Typed data model compiles under strict TS; derived fields intact.
- [ ] All 5 composites render and match prototype styling across their states.
- [ ] Each composite has a stories file; Storybook section 03 mirrors the Components page.
- [ ] Storybook now covers the FULL build contract (foundations + primitives + composites).
- [ ] Tests green.

## Risk Assessment
- Data init order (zoom/roster/focusStudent mutate after array creation): preserve exact sequence or
  rosters/stats break.
- `ClassCard`/`SessionCard`/`ZoomPanel` pull markup from full screen files: extract only the card-level
  composite, leaving page layout for the screen phases.
