This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub Project automation

This repo includes a small script for moving issue cards on the linked GitHub Project board.

The workspace MCP config also includes the hosted GitHub **projects** toolset at `https://api.githubcopilot.com/mcp/x/projects`, so MCP-capable editors can query and update GitHub Projects directly alongside the local project-status script.

1. Add a `COPILOT_PROJECTS_TOKEN` secret to the repository's `copilot` environment. The token must be able to edit the target GitHub Project and read the issue's repository.
2. The script defaults to the `drmartin1998` user project `#2` and its `Status` field. Override with `GITHUB_PROJECT_OWNER`, `GITHUB_PROJECT_NUMBER`, or `GITHUB_PROJECT_STATUS_FIELD` if needed.
3. Move an issue to **Ready** with:

```bash
npm run project:ready -- --issue 1
```

To set a different status:

```bash
npm run project:status -- --issue 1 --status "In Progress"
```

## Spec Kit

This repository now includes **GitHub Spec Kit** scaffolding for structured spec-driven work.

- Core files live under **`.specify/`**
- Copilot prompt files live under **`.github/prompts/`**
- Spec Kit agents live under **`.github/agents/`** with the `speckit.*` prefix

Common commands in Copilot-supported environments:

```text
/speckit.constitution
/speckit.specify
/speckit.plan
/speckit.tasks
/speckit.implement
```

Use Spec Kit for planning and task breakdown in `specs/`, and keep the repository Gherkin files in `features/` as the canonical acceptance criteria for shipped behavior.
