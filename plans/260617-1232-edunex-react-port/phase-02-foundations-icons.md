---
phase: 2
title: "Foundations & Icons"
status: pending
priority: P1
effort: "2h"
dependencies: [1]
---

# Phase 2: Foundations & Icons

## Overview
Make the design foundations real and visible in Storybook: the token scales (already in `tailwind.config`
from P1) documented as stories, and the `Icon` component ported from the prototype's icon set. This is
section 01 ("Foundations") of `EduNex Components.html`.

## Requirements
- Functional: `Icon` component renders any of the 51 named glyphs; foundation stories render color
  scales, typography specimens, radii, shadows, and the full icon grid.
- Non-functional: icon paths ported verbatim; `Icon` inherits `currentColor` and accepts `size`/`stroke`.

## Architecture
- `src/components/Icon.tsx`: port the path map from `src/icons.jsx` verbatim (props `name, size=20,
  stroke=1.7, className, style`). Keep the `fill` special-case for `dashboard`/`grid`. Unknown name → `file` glyph.
- `src/components/Icon.stories.tsx`: grid of all 51 names (the `ICONS` array in the Components page),
  each cell showing the glyph + mono label (mirrors the Components page icon grid).
- `src/stories/Foundations.stories.tsx` (docs-only, no product component):
  - **Colors**: swatch rows for Primary (`p-*`), Accent (`a-*`), Surfaces/neutrals, Status — values from
    the `PRIMARY`/`ACCENT`/`SURF`/`STATUS_TOKENS` arrays in `EduNex Components.html`.
  - **Typography**: Bricolage 46/700, Head 24/700, Body 15/500, Eyebrow 11/700, Mono 12 specimens.
  - **Radii & shadow**: swatch tiles for `r-xs…r-pill` and `sh-1/sh-2/sh-card/sh-pop`.

## Related Code Files
- Create: `src/components/Icon.tsx`, `src/components/Icon.stories.tsx`
- Create: `src/stories/Foundations.stories.tsx`
- Source ref: `design/prototype/src/icons.jsx` (icon paths); `design/prototype/EduNex Components.html`
  (`ICONS`, `PRIMARY`, `ACCENT`, `SURF`, `STATUS_TOKENS`, type/radii/shadow rows)

## Implementation Steps
1. Port `icons.jsx` → `Icon.tsx`: copy the path map, type `name` as a union of the glyph keys,
   keep stroke/fill behavior. Unknown name falls back to `file`.
2. Write `Icon.stories.tsx`: render the icon grid for all names.
3. Write `Foundations.stories.tsx`: color swatches, type specimens, radii + shadow tiles using Tailwind tokens.

## Tests First (TDD)
- `Icon.test.tsx`: renders `<svg>` with a path for a known name (`dashboard`); falls back to the `file`
  glyph for an unknown name; applies `size` to width/height.

## Success Criteria
- [ ] `Icon` renders all 51 names without error; Storybook icon grid matches the Components page.
- [ ] Foundation stories show the exact token hex values from the Components page.
- [ ] Tests green.

## Risk Assessment
- Icon `name` union vs runtime fallback: keep a permissive `string` accept with union autocomplete to avoid
  blocking screens that pass dynamic names; still fall back to `file`.
