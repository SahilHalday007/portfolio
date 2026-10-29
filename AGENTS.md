<!-- GSD:project-start source:PROJECT.md -->

## Project

**Sahil TUI Portfolio**

A React portfolio presented as a browser-based terminal workspace. Recruiters and collaborators can quickly understand Sahil's engineering focus, explore six content windows, inspect five real project stories, and make contact. Terminal modes and keyboard controls enrich the experience but never gate access to content.

**Core Value:** In seconds, a visitor understands Sahil builds software and AI systems for accessible learning and real-world interaction, then can explore evidence or contact him without needing to know terminal commands.

### Constraints

- **Framework**: React + Vite + strict TypeScript + Tailwind CSS; no Next.js.
- **Package manager**: npm.
- **Deployment**: static build for Vercel; no server required for the portfolio itself.
- **Typography**: JetBrains Mono only, self-hosted, with a metric-conscious monospace fallback.
- **Accessibility**: minimum 14px body text on phones, keyboard access, reduced-motion support, and WCAG AA contrast for semantic text in every theme.
- **Content**: unverified values must be explicit TODOs in typed content, not guesses.
- **Global counter**: server timezone is `Africa/Dar_es_Salaam`; client writes only through the constrained Supabase function; local fallback is labeled `(local)`.
- **Planning**: GSD artifacts remain in `.planning/` and are not committed; `docs/DESIGN.md` is committed before application code.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->

## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
