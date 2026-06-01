# My Magical VIP Constitution

## Core Principles

### I. Behavior First
Every user-visible change must be described in business terms before or alongside implementation. Repository Gherkin files under `features/` are the canonical acceptance criteria for shipped behavior; Spec Kit artifacts in `specs/` are used to explore, plan, and break down work without replacing those `.feature` files.

### II. Preserve the Existing Stack
Implementation plans and generated code must fit the existing Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, and Shopify architecture. Prefer extension of current pages, components, APIs, and helpers over speculative refactors or stack changes.

### III. Type Safety and Clarity Are Non-Negotiable
All planned and implemented work must preserve strict TypeScript, explicit data shapes, and understandable flow. Avoid `any`, implementation-shaped fallbacks, and hidden behavior; surface constraints and failure cases directly in specs, plans, and code.

### IV. Validate Real User Paths
Feature plans must account for the real booking journey: package selection, date selection, park selection, booking confirmation, checkout, capacity rules, and waiting list behavior when relevant. When behavior changes, Playwright coverage and Gherkin coverage should remain aligned with the public flow.

### V. Use Safe, Incremental Delivery
Favor small, reversible changes that preserve production behavior. Plans should call out dependencies, affected pages or APIs, and operational impacts such as blackout dates, admin workflows, and authenticated routes before implementation begins.

## Project Constraints

- Use `vercel dev` for local development when the application must be running.
- Use `npm run lint` for linting, `npm run build` for production build validation, and `npm test` for Playwright tests.
- Public acceptance behavior lives in `features/`; Spec Kit feature work products live in `specs/`.
- Prefer declarative, stakeholder-readable requirements in specs and `.feature` files; avoid implementation details in high-level artifacts unless the artifact is specifically a technical plan.
- Admin APIs and admin pages should continue to assume authentication for protected operations.

## Workflow Expectations

1. Start larger feature work with Spec Kit when it benefits from clarification, planning, or task breakdown.
2. Keep the resulting `specs/` artifacts aligned with the actual intended feature scope.
3. Create or update the matching `.feature` file in `features/` for every user-visible behavior change.
4. Implement using existing repository conventions, then validate with the repository's existing commands.

## Governance

This constitution guides all Spec Kit outputs in this repository. Specs, plans, tasks, and implementation proposals should be treated as non-compliant if they contradict the stack, skip required behavior specs, or ignore the established validation workflow. Amendments should update this file and any overlapping guidance in `AGENTS.md` or `.github/copilot-instructions.md`.

**Version**: 1.0.0 | **Ratified**: 2026-05-22 | **Last Amended**: 2026-05-22
