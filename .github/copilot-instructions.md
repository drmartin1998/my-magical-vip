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

### Key Files & Their Roles
- **`app/layout.tsx`** - Root layout with metadata, font imports (Geist family), and Tailwind font variables
- **`app/page.tsx`** - Home page component; uses `next/image` and Tailwind classes
- **`app/globals.css`** - Global styles with Tailwind's `@import` and CSS custom properties (theme variables)
- **`tsconfig.json`** - Path alias `@/*` points to root for imports
- **`eslint.config.mjs`** - ESLint config with Next.js core-web-vitals and TypeScript overrides

## Development Workflows

### Starting Development
```bash
npm run dev      # Starts Next.js dev server on localhost:3000 with hot reload
npm run build    # Production build (check for TS/lint errors)
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

## Learning Resources
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19)
