# EduNex — Project Guide for Claude

This is the EduNex repo: a React 18 + Vite + TypeScript + Tailwind app ported from an
original HTML/CSS/JS prototype (the "Claude Design").

## Source of truth

- **This repo is the source of truth.** Features and behavior live in the code here.
- **`design/prototype/`** holds the original "Claude Design" — the HTML/CSS/JS + React-UMD
  prototype the app was ported from. Treat it as the **visual / design reference**, not
  runnable app code. Notes: `design/prototype/PROTOTYPE-NOTES.md`.
- When code and prototype disagree, the **repo wins**. Do not regenerate the app from the
  prototype; use the prototype only to check intended look & layout.

## Staying in sync (why the prototype lives in-repo)

A fresh Claude session only knows what is committed to this repo — it has no memory of
previous chats or temp directories. To keep "Claude in sync" with your changes:

1. Make code changes in `src/`.
2. **Update `docs/project-overview.md`** — add a newest-on-top entry to its Changelog
   section describing the change. This is the human- and AI-readable history.
3. Commit and push.

Any Claude session opened against the repo then reads `CLAUDE.md` + `docs/project-overview.md`
+ the code, and is automatically up to date. No external sync step is needed.

## Key docs

- `docs/project-overview.md` — living overview + changelog (read this first).
- `plans/260617-1232-edunex-react-port/` — the porting plan and phases.

## Conventions

- TypeScript strict. Tailwind for styling (design tokens mirrored in `tailwind.config`).
- Routes: `/`, `/login`, `/admin/*`, `/student/*`, `/teacher/*`.
- Tests: Vitest + React Testing Library. Run tests before pushing; don't skip failing tests.
- Conventional commits, no AI references in commit messages.
