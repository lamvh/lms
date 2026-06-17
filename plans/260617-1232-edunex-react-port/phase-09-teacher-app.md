---
phase: 9
title: "Teacher app"
status: done
priority: P3
effort: "3h"
dependencies: [6]
---

# Phase 9: Teacher app

## Overview
Port the teacher/coach desktop app (`edunex/teacher.jsx`, 288 lines) at `/teacher/*`. Per the source notes,
the teacher role is thinner than admin (some prototype flows route coaches into admin). Port what exists;
flag gaps rather than inventing screens.

## Requirements
- Functional: `/teacher` renders the coach app (Ms. Jane scope: classes c1/c2, submissions queue); coach can view their classes and pending submissions; sign-out → `/login`.
- Non-functional: visual parity with prototype teacher view; data scoped to the signed-in coach.

## Architecture
- `src/app/teacher/TeacherApp.tsx`: port `teacher.jsx`. Likely a focused dashboard (coach's classes, `submissions` queue, quick grading actions) rather than the full admin nav.
- Reuse shared primitives + `useToasts`. Sign-out → `/login`.
- Data: filter `classes` by `teacher==='t1'` (Ms. Jane) and `submissions` for her classes (c1/c2).

## Related Code Files
- Create: `src/app/teacher/TeacherApp.tsx` (+ sub-views as the source defines)
- Modify: `src/routes.tsx` (teacher route)
- Source ref: `design/prototype/edunex/teacher.jsx`

## Implementation Steps
1. Read `teacher.jsx` fully; enumerate the actual views it renders.
2. Port the coach dashboard + submissions queue 1:1.
3. Wire any sub-navigation it has; sign-out.
4. Document in the phase any admin-routed flows that have no dedicated teacher screen (do not fabricate).

## Tests First (TDD)
- `TeacherApp.test.tsx`: renders Ms. Jane's classes (c1 "VIP Career Program", c2 "CV & Interview Mastery"); shows pending submissions for her classes; sign-out navigates to `/login`.

## Success Criteria
- [x] `/teacher` renders the ported coach app with coach-scoped data.
- [x] Gaps vs admin documented, not invented.
- [x] Tests green.

## Risk Assessment
- Partial role: avoid scope creep by building admin-equivalent teacher screens not present in source. Confirm with user if a missing teacher screen is actually wanted before building.
