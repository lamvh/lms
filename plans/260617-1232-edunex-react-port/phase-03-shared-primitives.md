---
phase: 3
title: "Shared primitives"
status: done
priority: P1
effort: "4h"
dependencies: [2]
---

# Phase 3: Shared primitives

## Overview
Port the prototype's shared UI primitives to typed React components, each with a `*.stories.tsx` covering
the states shown in section 02 ("Shared primitives") of `EduNex Components.html`. No screen logic and no
data model yet (data lands in P4 with the composites that need it). After this phase, every primitive in
the build contract exists and is browsable in Storybook.

## Requirements
- Functional: `Button`, `StatusBadge`, `Chip`, `Tag`, `Field`, `Avatar`, `FileIcon`, `Segmented`,
  `Toggle`, `Stat`, `Tip`, `Modal`, `Sheet` exported, importable, and each has a stories file.
- Non-functional: prop signatures match the prototype so screens drop in; styling via Tailwind tokens.

## Architecture
- Port `src/ui.jsx` primitives to `src/components/*.tsx`. Convert inline styles to Tailwind utilities
  (arbitrary values only for hand-tuned numbers). Keep `shade()` helper in `src/lib/color.ts`.
- `Button` (`src/components/Button.tsx`): variants `primary | accent | ghost | soft | zalo`, plus
  `sm`, `icon`-only, `disabled`, and `loading` (spinner). Mirrors the `.btn .btn-*` classes the
  Components page documents. Hover states come from Tailwind `hover:` utilities (the `force-hover` doc
  classes are documentation-only and not ported).
- `StatusBadge`: `status='active|soon|paused'` (+ a `warn`/"Overdue" style for reuse) with colored dot.
- `Chip` (`is-on` selected state) and `Tag` (static label).
- `Field` (`src/components/Field.tsx`): single-line input; states `default | focus | error | disabled`;
  gold focus ring.
- `Avatar`: initials from `name` or explicit `short`, gradient fill via `shade()`, optional `ring`, `size`.
- `FileIcon`: type-colored chip for `pdf|doc|slides|audio|video|image|link` (`FILE_META` map).
- `Segmented`: single-select switch, `size='md|sm'`, optional per-option `icon`.
- `Toggle`: binary on/off, gold when on, `size`.
- `Stat`: KPI card, `tone='brand|green|amber|plum'`.
- `Tip`: hover tooltip wrapper.
- `Modal` / `Sheet`: overlay uses `absolute inset-0` inside the app frame (NOT portal-to-body),
  matching the prototype; `Modal` centered desktop dialog, `Sheet` mobile bottom sheet with grab handle.

## Related Code Files
- Create: `src/lib/color.ts`
- Create: `src/components/{Button,StatusBadge,Chip,Tag,Field,Avatar,FileIcon,Segmented,Toggle,Stat,Tip,Modal,Sheet}.tsx`
- Create: matching `*.stories.tsx` for each of the above (states from the Components page)
- Source ref: `design/prototype/src/ui.jsx`; `design/prototype/EduNex Components.html` (section 02 blocks define the states each story must show)

## Implementation Steps
1. Port `shade()` → `src/lib/color.ts`.
2. Port each `ui.jsx` primitive to a Tailwind component, keeping prop names identical.
3. Add `Button`, `Chip`, `Tag`, `Field` (documented in the Components page via CSS classes, not in `ui.jsx`):
   build as React components using the same token classes (`.btn .btn-primary` → Tailwind utilities).
4. Write one `*.stories.tsx` per component, one story per state shown in the Components page
   (e.g. Button: primary / ghost / soft / zalo / with-icon / icon-only / small / loading / disabled).

## Tests First (TDD)
- `color.test.ts`: `shade('#F2B400', -18)` returns a valid darker hex.
- `Button.test.tsx`: renders label; `disabled` sets the disabled attr; `loading` shows spinner + disables click.
- `Toggle.test.tsx`: click fires `onChange(!on)`. `Segmented.test.tsx`: clicking an option fires `onChange(value)`.
- `Field.test.tsx`: `error` applies error styling; `disabled` blocks input.

## Success Criteria
- [x] All 13 primitives render and match prototype styling across their states.
- [x] Each primitive has a stories file; Storybook section mirrors the Components page section 02.
- [x] Tests green (23 total); `build` + `build-storybook` pass.

## Risk Assessment
- Button/Chip/Field have no `ui.jsx` source (only CSS classes in the prototype): derive exact look from
  `styles.css`/`theme.css` `.btn`/`.chip`/`.field` rules; verify against the Components page demos.
- `shade()` bit math: cover with test to avoid off-by-one hex.
- Modal/Sheet overlay scoping: keep `absolute inset-0` (frame-scoped) so stories and screens match the prototype.
