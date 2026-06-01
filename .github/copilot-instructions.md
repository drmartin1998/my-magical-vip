# AI Copilot Instructions for my-magical-vip

## Project Overview
This is a **Next.js 16 (App Router) project** with React 19, TypeScript, Tailwind CSS v4, and ESLint. The codebase is a fresh `create-next-app` scaffold with minimal custom code—focus on extending it rather than refactoring.

## Architecture & Structure

### Core Stack
- **Framework**: Next.js 16.0.6 with App Router (`app/` directory)
- **UI Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Type Checking**: Strict TypeScript (`strict: true` in `tsconfig.json`)
- **Linting**: ESLint with Next.js and Core Web Vitals configs
- **Hosting**: Vercel (optimized for Next.js)

### Key Files & Their Roles
- **`app/layout.tsx`** - Root layout with metadata, font imports (Geist family), and Tailwind font variables
- **`app/page.tsx`** - Home page component; uses `next/image` and Tailwind classes
- **`app/globals.css`** - Global styles with Tailwind's `@import` and CSS custom properties (theme variables)
- **`tsconfig.json`** - Path alias `@/*` points to root for imports
- **`eslint.config.mjs`** - ESLint config with Next.js core-web-vitals and TypeScript overrides

## Development Workflows
- Do not make changes directly on `main`. Always create a development branch for new work.
- Before making any changes check the current branch. If you are on `main`, create a new branch before editing files.
- Follow the GitHub project board workflow: move items to `In progress` when starting work, and to `In review` only after opening a pull request.
- For user-visible feature changes, always create or update a matching `.feature` file under `features/` to keep behavior specs aligned with code changes.

### Starting Development
```bash
vercel dev       # Starts Next.js dev server on localhost:3000 with hot reload
vercel build    # Production build (check for TS/lint errors)
npm start        # Runs production server
npm run lint     # Runs ESLint
```

### Common Tasks
- **Edit a page**: Modify `app/page.tsx` or create new route files in `app/`—hot reload is automatic
- **Add styles**: Use Tailwind utility classes in JSX; global styles go in `globals.css`
- **New routes**: Create `app/your-route/page.tsx` (Next.js App Router)
- **Create components**: Place in `components/` or co-locate with routes; use `.tsx` extension

## Code Patterns & Conventions

### Components
- Use **functional components** with TypeScript; export as `export default` or named exports
- Type component props explicitly: `interface Props { ... }` above function
- Use `React.ReactNode` for children in layout-type components

### Styling
- **Tailwind-first approach**: Use utility classes in `className` attributes
- **Dark mode**: Classes use `dark:` prefix (e.g., `dark:bg-black`); respects `prefers-color-scheme`
- **Font variables**: Access `--font-geist-sans` and `--font-geist-mono` via CSS custom properties
- **Theme colors**: Define in `globals.css` via `--background` and `--foreground` custom properties

### Imports
- Use path alias: `import { SomeComponent } from "@/components/SomeComponent"`
- Next.js exports: `import Image from "next/image"`, `import type { Metadata } from "next"`
- Always use `type` imports for TypeScript types

### Type Safety
- **Strict mode enabled**: No `any` types without comment explaining why
- **Metadata**: Use `export const metadata: Metadata = { ... }` in layout/page components
- **Image optimization**: Use `next/image` with width/height for performance

## Key Integration Points

### ESLint Configuration
- **Config file**: `eslint.config.mjs` uses flat config format (ESLint v9+)
- **Includes**: Next.js core-web-vitals, TypeScript overrides, and custom global ignores
- **Ignored paths**: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run `npm run lint` to check code

### Tailwind & PostCSS
- **Config**: Tailwind v4 uses `@import` in CSS (no separate config file needed)
- **PostCSS**: `postcss.config.mjs` auto-configured by Next.js
- **Fonts**: Geist fonts loaded via `next/font/google` and applied via CSS variables in `layout.tsx`

## AI Agent Priorities

1. **Preserve strict TypeScript**: Always add type annotations; don't leave props untyped
2. **Tailwind-first UI**: Prefer utility classes over custom CSS; check Tailwind v4 docs for class names
3. **Next.js App Router patterns**: Use `app/` routes, server components by default, `"use client"` sparingly
4. **Dark mode support**: Include `dark:` class variants for accessible theming
5. **Image optimization**: Always use `next/image` with explicit dimensions
6. **Lint before suggesting**: Run `npm run lint` to catch errors early

## Behavior Specification

- Store repository Gherkin feature specs under `features/`
- Every user-visible feature change should create or update a matching `.feature` file in the same change
- Prefer updating an existing `.feature` file for the relevant area before creating a new one
- Write declarative Gherkin focused on business behavior and observable outcomes, not implementation details
- When feature behavior changes, prefer the `@gherkin-feature-writer` agent or `/gherkin-feature-spec` skill to keep the spec current

## Spec Kit

- Spec Kit is installed in this repository; use `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, and `/speckit.implement` for structured feature work
- Use Spec Kit by default for backlog items and user-visible feature work
- Skip Spec Kit only for small, well-bounded fixes that do not materially change behavior, requirements, or user flows
- Treat Spec Kit artifacts under `specs/` as planning and delivery artifacts, not as replacements for the Gherkin files in `features/`
- Keep Spec Kit specs, plans, and tasks aligned with the current repository constitution in `.specify/memory/constitution.md`

## Learning Resources
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19)

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

## Required workflow for GitHub Project and backlog work

When implementing any backlog item, GitHub Project #2 item, or user-visible feature:

1. Create a development branch before making any code changes.
2. Do not implement backlog or project work directly on `main`.
3. If the current branch is `main`, stop and create a development branch before editing files.
4. Move the project item status to `In progress` when work starts.

## Required Spec Kit workflow for feature work

Use Spec Kit for any new feature, behavior change, or backlog item that changes user-visible behavior.

Follow this sequence unless the task is a trivial bug fix or a narrowly scoped non-behavioral change:

1. Use `speckit.specify` to create or update the feature specification in `specs/`.
2. Use `speckit.clarify` when requirements or edge cases are underspecified.
3. Use `speckit.plan` to generate the implementation plan.
4. Use `speckit.tasks` to generate the ordered task list.
5. Use `speckit.implement` or `@story-to-code` to execute the approved work.

Spec Kit artifacts in `specs/` are planning and delivery artifacts. They do not replace repository Gherkin feature files in `features/`.

## Required Gherkin workflow for user-visible behavior

For every user-visible behavior change:

1. Create or update the matching `.feature` file under `features/`.
2. Prefer updating an existing feature file before creating a new one.
3. Use declarative Gherkin that describes observable business behavior, not implementation details.
4. Prefer `@gherkin-feature-writer` or `/gherkin-feature-spec` for this step.

## Validation and completion workflow

After implementation:

1. Use `@regression-verifier` for regression validation when behavior changed.
2. Run the repository's existing validation commands.
3. Open a pull request targeting `main` when the work is ready.
4. Move the project item status to `In review` only after the pull request is opened.
