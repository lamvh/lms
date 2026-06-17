---
phase: 7
title: "Admin screens"
status: pending
priority: P2
effort: "8h"
dependencies: [6]
---

# Phase 7: Admin screens

## Overview
Port all admin desktop screens that mount inside `AdminShell`: dashboard, classes list, class detail,
timetable, materials, teachers, students, student detail, settings. Largest phase.

## Requirements
- Functional: each route renders its screen from typed `edunex` data; intra-app nav works (open class, open student, back); search/filter/toggle interactions behave as in prototype.
- Non-functional: visual parity with prototype; no console errors; data-driven (no hardcoded duplicates).

## Architecture
- One component per screen under `src/app/admin/`:
  - `Dashboard.tsx` (port `edunex/dashboard.jsx`; has layout variants: port the default "Balanced" variant only, drop the tweak-driven variant switch).
  - `ClassList.tsx` + `ClassDetail.tsx` (port `edunex/classes.jsx`; class detail reads `:classId`, shows roster, schedule, zoom, materials count).
  - `CalendarView.tsx` (port `edunex/calendar.jsx`; weekly timetable from `schedule`, `todayIndex`).
  - `MaterialsLibrary.tsx` (port `src/admin-materials.jsx`; grouped by class/session, `FileIcon` by type).
  - `PeopleView.tsx` (port `edunex/people.jsx`; `kind="teachers"|"students"`), `StudentDetail.tsx` (reads `:studentId`).
  - `Settings.tsx` (minimal; port `SettingsView` if present, else simple placeholder matching shell title).
- Use shared primitives (Stat, StatusBadge, Avatar, FileIcon, Segmented, Modal, Tip) and `useToasts`.
- Navigation via `useNavigate`/`Link` (replaces `go/openClass/openStudent` callbacks).

## Related Code Files
- Create: `src/app/admin/{Dashboard,ClassList,ClassDetail,CalendarView,MaterialsLibrary,PeopleView,StudentDetail,Settings}.tsx`
- Modify: `src/routes.tsx` (replace P6 stubs with real screens)
- Source ref: `design/prototype/{edunex/dashboard.jsx,edunex/classes.jsx,edunex/calendar.jsx,edunex/people.jsx,src/admin-materials.jsx}`

## Implementation Steps
1. Dashboard (default variant): stat cards, today's sessions, recent activity, class quick-cards.
2. Classes list → class cards/table; click → `/admin/classes/:classId`.
3. Class detail: header, roster (avatars from roster ids), schedule, zoom block, materials count, back link.
4. Timetable: week grid Mon-Sun from `classes[].schedule`, highlight `todayIndex`.
5. Materials: grouped list by class+session, `FileIcon`, download affordance (toast on click).
6. People: teachers grid + students grid; student row click → `/admin/students/:studentId`.
7. Student detail: focus-student data (homework, results, payments, classes).
8. Settings placeholder.

## Tests First (TDD)
- `ClassDetail.test.tsx`: at `/admin/classes/c1` shows "VIP Career Program" and a non-empty roster.
- `CalendarView.test.tsx`: renders 7 day columns; today column flagged.
- `MaterialsLibrary.test.tsx`: groups materials by class; renders correct count of items.
- `PeopleView.test.tsx`: teachers mode renders 5 teachers; student click navigates to detail route.
- `Dashboard.test.tsx`: renders `stats.teachers`/sessions values from data.

## Success Criteria
- [ ] All 9 admin routes render real, data-driven screens matching prototype.
- [ ] Cross-screen navigation (open class/student, back) works via router.
- [ ] Tests green; no console errors.

## Risk Assessment
- Dashboard variant system: only the default variant is in scope; document the drop so it is not mistaken for missing work.
- Largest surface: split into sub-commits per screen; verify each against prototype before next.
- Some screens may import primitives not yet covered: confirm P3/P4 coverage before starting; add any missing primitive/composite there, not ad hoc.
