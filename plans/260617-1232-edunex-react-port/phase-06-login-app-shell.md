---
phase: 6
title: "Login & app shell"
status: done
priority: P1
effort: "3h"
dependencies: [4]
---

# Phase 6: Login & app shell

## Overview
Port the login screen and the admin shell (sidebar + topbar + nested router), establishing role-based
routing that replaces the prototype's `useState('screen')` switcher.

## Requirements
- Functional: `/login` renders two-panel login with role picker (admin/coach/student); "Sign in" routes by role (admin→`/admin`, coach→`/teacher`, student→`/student`). Admin shell renders sidebar nav + topbar + outlet; nav switches admin sub-routes.
- Non-functional: sign-out returns to `/login`; toasts work; active nav state correct.

## Architecture
- `src/app/Login.tsx`: port `LoginScreen`; replace `onSignIn(role)` callback with `useNavigate()`. Keep brand panel (stats from `data.stats`), form panel, role buttons.
- `src/app/admin/AdminShell.tsx`: port `shell.jsx`. Sidebar (Logo, "New class", grouped NAV, settings, user footer + sign-out), topbar (page title from route, search, bell), `<Outlet/>` main, toast stack.
- Routing: `/admin` parent route → AdminShell with child routes `dashboard`, `classes`, `classes/:classId`, `calendar`, `materials`, `teachers`, `students`, `students/:studentId`, `settings`. Default index → `dashboard`. Screen components stubbed here, filled in P7 (admin)/P8 (student)/P9 (teacher).
- Toast: shared `useToasts()` hook (port `notify` logic) provided via context to child screens.
- Post-login routing: each role lands on its own home (admin→`/admin`, coach→`/teacher`, student→`/student`). <!-- Updated: Validation Session 1 - confirmed each-role-own-home -->

## Related Code Files
- Create: `src/app/Login.tsx`, `src/app/admin/AdminShell.tsx`, `src/app/admin/useToasts.ts`, `src/app/admin/admin-nav.ts`
- Modify: `src/routes.tsx` (nested admin routes; login)
- Source ref: `design/prototype/{edunex/login.jsx,edunex/shell.jsx,edunex/app.jsx}`

## Implementation Steps
1. Port `Login.tsx`; wire role → `navigate()`.
2. Map `shell.jsx` `view`/`go()` state to React Router nested routes; convert `NAV` config to `admin-nav.ts`; derive active state + page title from current path.
3. Extract `notify`/toast stack into `useToasts` hook + context.
4. Define nested route tree in `routes.tsx` with stub screen elements.
5. Wire sign-out → `/login`.

## Tests First (TDD)
- `Login.test.tsx`: role buttons update selected role + email; clicking "Sign in" as coach navigates to `/teacher` (assert via memory router).
- `AdminShell.test.tsx`: navigating to `/admin/classes` marks Classes nav active and sets topbar title "Classes"; sign-out navigates to `/login`.
- `useToasts.test.ts`: `notify()` adds a toast and auto-removes after timeout (fake timers).

## Success Criteria
- [x] Login renders + routes by role; shell nav drives admin sub-routes with correct active state/title.
- [x] Toasts appear and auto-dismiss; sign-out works.
- [x] Tests green.

## Risk Assessment
- State-to-route mapping (classId/studentId were component state, now route params): ensure detail routes read params.
- Topbar title map must cover all views incl. `class`/`studentDetail` equivalents.
