# Sahil TUI Portfolio

React + Vite + strict TypeScript + Tailwind terminal portfolio. The interface is a browser TUI with six content windows, seven terminal themes, command input, and an accessible ASCII cat.

## Prerequisites

- Node.js 24 or later
- npm 11 or later

## Local development

```bash
npm install
npm run dev
```

Other checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The production output is a static Vite site:

```bash
npm run build
```

Deploy the generated `dist/` directory as a static site to Vercel.

## Fonts and licensing

Terminal text uses self-hosted JetBrains Mono Variable through `@fontsource-variable/jetbrains-mono`. The SIL Open Font License notice is preserved at `public/fonts/OFL.txt`.

## Supabase

The global cat counter integration is implemented in Phase 4. Until Supabase credentials are configured, the cat uses a clearly labeled local daily count.
