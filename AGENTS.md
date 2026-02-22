# AGENTS.md

Guidelines for coding agents working in this repository.

## Project Snapshot

- Project: `reddit-pixels`
- Stack: Next.js 12 + React 18
- Package manager: `yarn` (lockfile is `yarn.lock`)
- Local dev command: `yarn dev` (runs on port `6969`)

## Default Working Rules

- Make focused, minimal changes that solve the requested task.
- Prefer updating existing patterns over introducing new architectural styles.
- Keep diffs small and easy to review.
- Avoid unrelated refactors unless explicitly requested.

## Safe Commands (No Confirmation Needed)

- Install dependencies: `yarn install`
- Run dev server: `yarn dev`
- Build: `yarn build`
- Run app: `yarn start`
- Lint: `yarn lint`
- Read/search files and run diagnostics.

## Confirmation Required

Get explicit user approval before running:

- `git commit*`
- `git push*`

## Code Style Expectations

- Follow existing ESLint/Prettier conventions.
- Keep naming and file organization consistent with nearby code.
- Do not add heavy dependencies unless necessary for the task.
- Add brief comments only when logic is non-obvious.

## Editing Guidelines

- Preserve existing behavior unless the task requires a behavior change.
- If behavior changes, document impact clearly in the final response.
- Update related code paths when making interface or data-shape changes.
- Do not modify secrets in `.env` files.

## Validation Before Hand-off

When changes affect runtime code, run the most relevant checks:

1. `yarn lint`
2. `yarn build` (for structural or integration-level changes)

If a check is skipped, state that explicitly in the final hand-off.

## Response Format for Agent Hand-off

Include:

1. What changed (files + purpose)
2. Validation performed (and results)
3. Any risks, assumptions, or follow-up actions
