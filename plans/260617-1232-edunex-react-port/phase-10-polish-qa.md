---
phase: 10
title: "Polish & QA"
status: done
priority: P2
effort: "3h"
dependencies: [5, 7, 8, 9]
---

# Phase 10: Polish & QA

## Overview
Cross-wire the app, verify visual fidelity against the prototype, run responsive + accessibility passes,
and finalize. No new features.

## Requirements
- Functional: landing "Đăng nhập" + CTA "Vào app học viên" → `/login`; all cross-links resolve; full nav loop works (landing → login → role app → sign out → login).
- Non-functional: responsive across breakpoints; no console errors/warnings; `npm run build` + full test suite green; em-dash sweep clean.

## Architecture
- Integration wiring + an RTL nav-loop integration test.
- Visual diff checklist per screen vs prototype (manual; Playwright visual regression deferred per validation).

## Related Code Files
- Modify: cross-link hrefs in `src/landing/*`, any remaining stub routes
- Create: `src/test/nav-loop.test.tsx` (RTL nav-loop integration test)
- Source ref: prototype screens for visual comparison

## Implementation Steps
1. Wire all landing → app links to `/login`; verify every internal route reachable.
2. Responsive pass: landing breakpoints (980/560/400), admin desktop, student mobile.
3. Accessibility quick pass: alt text on `ImageSlot`, button/aria labels, focus states, color contrast on gold.
4. Repo-wide em-dash sweep (`grep -R "—" src/` must be empty in visible copy).
5. Run full `npm test` + `npm run build`; fix failures.
6. Playwright is deferred (validation: TDD = behavior/render tests, visual = manual). Skip unless user later requests visual regression. <!-- Updated: Validation Session 1 - Playwright deferred -->

## Tests First (TDD)
- `nav-loop.test.tsx` (integration): render app at `/`, click "Đăng nhập" → `/login`, sign in as student → `/student`, sign out → `/login`.
- Em-dash guard test over `src/` rendered strings (or a lint script).

## Success Criteria
- [x] All cross-links work; full nav loop passes.
- [x] Responsive + a11y passes done; no console errors.
- [x] `npm run build` + full suite green; em-dash sweep empty.

## Risk Assessment
- Visual drift only surfaces here: budget time to reconcile against prototype; treat mismatches as bugs. Without visual-regression automation, this reconciliation is manual, so do not rush it.
