---
phase: 8
title: "Student app"
status: done
priority: P2
effort: "5h"
dependencies: [6]
---

# Phase 8: Student app

## Overview
Port the student mobile app (`edunex/student.jsx`, 653 lines) at `/student/*`. In the prototype it ran
inside an iOS device frame; here it renders responsively (mobile-first, optionally max-width constrained on desktop).

## Requirements
- Functional: bottom-tab navigation (Home, Timetable, Materials, Profile per prototype tabs); each tab renders focus-student data (classes c2/c5/c6, homework, results, payments); bottom sheets work.
- Non-functional: mobile-first responsive; touch-friendly; no device-frame chrome.

## Architecture
- `src/app/student/StudentApp.tsx`: port shell + tab state. Replace iOS frame with a responsive container (`max-w-[440px] mx-auto` on desktop, full-width on mobile). Drop `IOSDevice`/safe-area frame; keep `Sheet` for bottom sheets.
- Tab views as sub-components under `src/app/student/` (Home, Timetable, Materials, Profile, plus any detail pages the prototype exposes via `initialPage`).
- Routing: `/student` index → Home; tabs as nested routes OR internal tab state (prototype uses `tab`/`page`). Prefer nested routes (`/student/timetable`, `/student/materials`, `/student/profile`) for shareable URLs; keep deep `page` as internal state where needed.
- Data: `focusStudent`, `homework`, `results`, `payments`, `materials` filtered to student's classes.

## Related Code Files
- Create: `src/app/student/StudentApp.tsx` + tab/view components + `src/app/student/student-tabs.ts`
- Modify: `src/routes.tsx` (student nested routes)
- Source ref: `design/prototype/edunex/student.jsx`

## Implementation Steps
1. Port shell + bottom tab bar; responsive container replacing iOS frame.
2. Home tab (greeting, next session, homework due, quick links).
3. Timetable tab (student's class schedule).
4. Materials tab (materials for enrolled classes, `FileIcon`, download toast).
5. Profile tab (student info, results, payments/invoices, sign-out → `/login`).
6. Wire bottom sheets (`Sheet`) for detail actions.

## Tests First (TDD)
- `StudentApp.test.tsx`: renders bottom tab bar; default tab is Home; tapping Materials shows enrolled-class materials.
- `StudentProfile.test.tsx`: shows focus student "Nguyễn Thảo My" and her invoices; sign-out navigates to `/login`.
- `StudentTimetable.test.tsx`: shows sessions only for classes c2/c5/c6.

## Success Criteria
- [x] All student tabs render focus-student data; navigation + sheets work.
- [x] Responsive on mobile and desktop without device frame.
- [x] Tests green.

## Risk Assessment
- `student.jsx` is large with internal `page` deep-nav: map carefully to routes vs internal state; do not lose any sub-screen.
- Removing iOS frame may expose layout assumptions (fixed widths): convert to responsive units.
