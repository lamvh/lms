# EduNex LMS — Project rules

## No em dash in design content — IMPORTANT
Never use the em dash character (—) in any user-visible content across designs:
copy, headings, titles, labels, subtitles, captions, button text, chrome/tab titles,
canvas section titles. Use a middle dot ` · `, a colon `:`, a comma, parentheses, or
just rephrase. Applies to every design in this project (landing page, EduNex LMS
screens, Screen Map, any deck or doc). Code comments are exempt, but prefer ` · ` there
too for consistency.

## Main file
`EduNex LMS.html` is the main prototype. It loads the `edunex/` components + shared
primitives in `src/` (icons, ui, admin-materials) + `frames/` + `styles.css` +
`edunex/theme.css`. Keep `index.html` (the older Vina NZ build) but treat
**EduNex LMS as the canonical app**.

## EduNex LMS and Screen Map must stay in sync — IMPORTANT (both directions)
`Screen Map.html` is a design-canvas overview of every EduNex screen, grouped by role
(Login · Admin desktop · Teacher desktop · Student mobile). It renders the **real**
components from `EduNex LMS.html` inside artboards via `edunex/canvas.jsx`.

They share the same `edunex/` source components, so a change to a screen's design,
copy, layout or data shows up in **both** automatically. The two must never drift —
**whenever you touch one, verify and update the other.**

**When you change EduNex LMS → update the Screen Map:**

- **New screen / view added** to an app (a new `view` in `edunex/shell.jsx` or
  `edunex/teacher.jsx`, or a new `tab`/`page` in `edunex/student.jsx`) →
  add a matching `<DCArtboard>` in `edunex/canvas.jsx` under the right `<DCSection>`.
- **Screen removed / renamed** → remove or rename its `<DCArtboard>` to match.
- **New script file** loaded in `EduNex LMS.html` → add the same `<script>` tag to
  `Screen Map.html` (same load order) so the canvas can mount it.
- **Component prop / signature change** that affects how a screen mounts → update the
  board wrappers (`AdminBoard` / `TeacherBoard` / `StudentBoard`) in `edunex/canvas.jsx`.

**When you change the Screen Map → reflect it back in EduNex LMS:**

- **A screen edited directly on the canvas** (design, copy, layout) actually lives in
  the shared `edunex/` component — the edit already affects `EduNex LMS.html`. Re-open
  `EduNex LMS.html` and confirm the screen still looks/works right in the real app
  (correct role, navigation, frame size).
- **A new screen designed first on the canvas** → also wire it into the real app: add
  its `view`/`tab`/`page` and nav entry in the matching `edunex/` shell so users can
  reach it in `EduNex LMS.html`, not just see it on the map.
- **A screen deleted/renamed on the canvas** → remove or rename it in the `edunex/`
  shell + nav too, so the app and the map agree.

The Screen Map relies on these "addressable" props — keep them working:
- `AdminApp({ initialView, initialClassId, initialStudentId })` — `edunex/shell.jsx`
- `TeacherApp({ initialView, initialClassId })` — `edunex/teacher.jsx`
- `StudentApp({ initialTab, initialPage })` — `edunex/student.jsx`

After any EduNex change, re-open `Screen Map.html` and confirm all artboards still
render (no blank cards, no console errors) before finishing.
