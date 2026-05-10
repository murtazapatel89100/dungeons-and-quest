<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Repo Scope

This repository is a Next.js 16 App Router project for a Dungeons & Dragons companion site. The main routes are:

- `/` home
- `/learn` beginner guide
- `/characters` character builder
- `/rules` rules reference
- `/tools` DM utilities
- `/playstyles` playstyle explorer

The root layout is `src/app/layout.tsx`. Route pages live under `src/app/*/page.tsx`, shared UI lives in `src/components`, content/data lives in `src/lib`, and configuration lives in `config`.

## Next.js Notes

- Use the App Router conventions from the local docs in `node_modules/next/dist/docs/`.
- Put route metadata in the relevant `page.tsx` or `layout.tsx` file with the `metadata` export.
- Keep server-only code in server components unless a component needs browser APIs, state, or effects.
- Prefer the existing `src/app` file structure over introducing Pages Router patterns.

## Common Commands

- `npm install` - install dependencies
- `npm run dev` - start the local dev server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run Biome checks
- `npm run format` - format the codebase with Biome

## Editing Guidelines

- Keep changes scoped to the route or component that owns the behavior.
- Reuse the shared design system and existing component patterns before introducing new abstractions.
- Use ASCII by default.
- Do not revert unrelated user changes.
- Run `npm run lint` and `npm run build` before finishing work that touches application code.
