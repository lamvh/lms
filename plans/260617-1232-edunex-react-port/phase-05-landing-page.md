---
phase: 5
title: "Landing page"
status: pending
priority: P1
effort: "5h"
dependencies: [4]
---

# Phase 5: Landing page

## Overview
Port `EduNex Landing.html` (10 sections) to typed React components at `/`. Primary deliverable;
ships independently of the LMS app. Full Tailwind, pixel-matched to the prototype.

## Requirements
- Functional: all 10 sections render; sticky nav; mobile hamburger toggles menu; smooth-scroll anchors; "Đăng nhập" links to `/login`.
- Non-functional: responsive at 980 / 560 / 400 px breakpoints matching prototype; Vietnamese copy verbatim; no em dash.

## Architecture
- `src/landing/LandingPage.tsx` composes section components in `src/landing/`:
  `Nav`, `Hero`, `Dci`, `Feature`, `Founder`, `Packages`, `Blog`, `Testimonials`, `Cta`, `Footer`.
- Reuse `ImageSlot` with local srcs: hero + founder `/assets/ms-jane.png`, feature `/assets/english-class.png`. <!-- Updated: Validation Session 1 - local Ms-Jane src -->
- Static section data (packages, blog posts, testimonials, DCI cards) as typed local consts in each component.
- Mobile menu: local `useState` open/close (replaces prototype's imperative `display` toggle).
- Inline SVGs (logo mark, trust icons, ticks, arrows) → small inline JSX or reuse landing-local icon snippets.

## Related Code Files
- Create: `src/landing/LandingPage.tsx` + 10 section components + `src/landing/landing-data.ts`
- Modify: `src/routes.tsx` (mount `LandingPage` at `/`)
- Source ref: `design/prototype/EduNex Landing.html` (lines 262-586 markup; 10-258 styles → Tailwind)

## Implementation Steps
1. Translate `:root` landing tokens to Tailwind classes (already in config from P1); map `.btn`, `.eyebrow`, `.kicker`, `.logo` to component classes/utilities.
2. Build `Nav` (sticky, blur, desktop links + actions, hamburger + mobile menu).
3. `Hero` (eyebrow, h1 with highlighted span, lead, CTA pair, trust row, media with glow + ImageSlot + floating badge).
4. `Dci` (3 cards: Dream / Collaborate / Inspire), `Feature` (2-col + 4-item checklist + chip), `Founder` (quote + signature).
5. `Packages` (4 tiers; "popular" variant on Platinum), `Blog` (3 external post cards), `Testimonials` (3 cards + disclaimer).
6. `Cta` (dark gradient band + glow + actions), `Footer` (4-col grid + bottom bar + socials).
7. Apply responsive utilities per prototype breakpoints; verify each section visually before next.

## Tests First (TDD)
- `LandingPage.test.tsx`: renders all 10 section landmarks; hero h1 contains "chinh phục giấc mơ".
- `Nav.test.tsx`: hamburger click toggles mobile menu visibility; "Đăng nhập" anchor href = `/login`.
- `Packages.test.tsx`: renders 4 tiers; Platinum card carries the "popular" marker; prices `$49/$199/$399/$4,000`.
- Assert no em dash (—) in rendered text via a guard test.

## Success Criteria
- [ ] All 10 sections present and visually match prototype at desktop + mobile.
- [ ] Hamburger menu works; anchor links smooth-scroll; "Đăng nhập" → `/login`.
- [ ] Images render via `ImageSlot`; no console errors.
- [ ] Tests green; em-dash guard passes.

## Risk Assessment
- Pixel drift from full Tailwind rewrite: verify section-by-section against prototype; use arbitrary values for exact `font-size`/`gap`/`radius`.
- `Ms-Jane.png` now bundled locally (`/assets/ms-jane.png`) per validation; no external dependency.
