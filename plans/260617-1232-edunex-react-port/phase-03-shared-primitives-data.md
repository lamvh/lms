---
phase: 3
title: "Shared primitives & data"
status: pending
priority: P1
effort: "3h"
dependencies: [1]
---

# Phase 3: Shared primitives & data

## Overview
Port the prototype's global UI primitives and the `window.VZ` data model to typed ES modules consumed by
all LMS screens. No screen logic yet, only the shared layer.

## Requirements
- Functional: `Icon`, `Logo`, `Avatar`, `StatusBadge`, `FileIcon`, `Segmented`, `Toggle`, `Stat`, `Modal`, `Sheet`, `Tip` exported and importable; typed `edunex` data exports.
- Non-functional: TS interfaces for Teacher, ClassItem, Student, Material, Template, Homework, Submission, Result, Payment.

## Architecture
- `src/data/edunex.ts`: convert IIFE/`window.VZ` to module exports. Keep generators (`makeStudents`, zoom/roster mapping, `focusStudent` mutation) as pure init; export typed `teachers, classes, students, materials, templates, znsLog, homework, submissions, results, payments, DAYS, DAYS_FULL, todayIndex, focusStudent, stats` + lookups `teacherById/classById/studentById`.
- `src/types/edunex.ts`: shared interfaces.
- `src/components/Icon.tsx`: port the icon path map (60+ glyphs) verbatim; props `name, size, stroke, className, style`.
- `src/components/*`: port `ui.jsx` primitives. Convert inline styles to Tailwind utilities/arbitrary values; keep `shade()` helper (`src/lib/color.ts`). `Modal`/`Sheet` use `position:absolute inset-0` overlay (rendered inside app frame, not portal-to-body, matching prototype).
- `src/components/Logo.tsx`: port from `login.jsx` (gradient mark + Edu/Nex wordmark, `light` variant).

## Related Code Files
- Create: `src/data/edunex.ts`, `src/types/edunex.ts`, `src/lib/color.ts`
- Create: `src/components/{Icon,Logo,Avatar,StatusBadge,FileIcon,Segmented,Toggle,Stat,Modal,Sheet,Tip}.tsx`
- Source ref: `/tmp/edunex_design/edunex-lms/project/{src/icons.jsx,src/ui.jsx,edunex/login.jsx,edunex/data.js}`

## Implementation Steps
1. Define `src/types/edunex.ts` interfaces from `data.js` shapes (note `year` repurposed as learning focus; `zoom`, `roster`, `classes` added post-init).
2. Port `data.js` → `edunex.ts` preserving derived data (zoom ids, rosters, focusStudent overrides, stats). Export typed const.
3. Port `Icon` path map exactly; keep `fill` special-case for `dashboard`/`grid`.
4. Port each `ui.jsx` primitive to Tailwind; keep prop signatures identical so screens drop in.
5. Port `Logo`.

## Tests First (TDD)
- `edunex.data.test.ts`: `classById('c1').name === 'VIP Career Program'`; `focusStudent.name === 'Nguyễn Thảo My'` with `classes=['c2','c5','c6']`; `stats.teachers === 5`; rosters non-empty.
- `Icon.test.tsx`: renders `<svg>` with a path for a known name; falls back to `file` glyph for unknown.
- `Toggle.test.tsx`: click fires `onChange(!on)`. `Segmented.test.tsx`: clicking an option fires `onChange(value)`.
- `color.test.ts`: `shade('#F2B400', -18)` returns a valid darker hex.

## Success Criteria
- [ ] All primitives render and match prototype styling.
- [ ] Typed data model compiles under strict TS; derived fields intact.
- [ ] Tests green.

## Risk Assessment
- Data init order (zoom/roster/focusStudent mutate after array creation): preserve exact sequence or rosters/stats break.
- `shade()` bit math: cover with test to avoid off-by-one hex.
