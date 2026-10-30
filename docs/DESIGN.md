# Sahil Portfolio — CLIfolio-Derived Design Contract

**Status:** Replacement visual world, approved by explicit owner override.
**Date:** 2026-10-31.
**Reference:** https://clifolio.framer.website/ (independent Framer template; this portfolio is not affiliated with it and copies no source code).
**Platform:** React + Vite + strict TypeScript + Tailwind CSS, static Vercel deployment.
**Mode:** Experience — the work itself leads; the interface recedes into a command-line reading order.

## Concept

A single scrolling CLI-style portfolio page. A sticky blurred prompt header, typed hero session, profile rows, quick-start summary, featured project panel with truthful count tiles, full project list, experience log, and fixed status footer. The old six-pane tmux workspace is evidence only; it does not constrain this world.

## Page structure and reading order

1. **Sticky header:** prompt logo `>. sahil@portfolio:~$` linking to `#top`; centered anchor nav `About / Projects / Experience / Contact`; right-side `Available` pill with cyan dot and text.
2. **Hero:** double-bordered ASCII SAHIL panel; typed `$ whoami` line with block cursor; `h1` positioning statement; profile rows for name, location, position, and focus; quick-start paragraph; primary `View projects` and ghost `Contact` buttons.
3. **Featured project:** Fablab Management System panel with label, title, category/file tags, problem and role copy, stack pills, repository button, and three truthful count tiles: project stories, stack groups, log entries.
4. **Projects:** all seven project cards in a responsive grid; each card has a pill row, title, problem excerpt, stack pills, verified links, and visible TODOs where links are missing.
5. **Experience:** log-style entries with hash, role, detail, and date or explicit TODO.
6. **Fixed footer:** copyright, version pill, and GitHub/email icon links; body reserves bottom padding so content is never covered.

There is no blog section because no posts were supplied; nothing is invented to fill the reference template's blog slot.

## Palette and material

Near-black ground with green/cyan terminal accents and pale secondary text.

| Role | Value |
|---|---|
| Page ground | `#09090B` |
| Panel ground | `#1D2025` |
| Footer ground | `#1F2028` |
| Primary green | `#00FF6A` |
| Signal cyan | `#00FFFF` |
| Pale secondary | `#A8D7E3` |
| Info blue | `#78B5FF` |
| Accent purple | `#C084FC` |
| Accent yellow | `#FACC15` |
| Accent red | `#F87171` |

Panels use 1px green borders and 8px radii; tags use 2px-radius pills with translucent tinted backgrounds and solid text; stats tiles use 5px radii on panel ground; buttons use 8px radii. Primary buttons are solid green with near-black text; secondary buttons are transparent with green borders and green text. State is never carried by color alone: every status has text, every active nav item has position and label, and links are underlined.

## Typography

Prompt, headings, tags, buttons, stats, and footer use JetBrains Mono. Body and excerpts use Fragment Mono with Inter as the descriptive companion, loaded remotely per the owner's exact-match override. Monospace fallbacks apply if a remote face fails. Display type is sized for reading, not decoration; ASCII art stays in bordered panels with horizontal containment on narrow screens.

## Motion vocabulary

- One authored moment: the hero `$ whoami` line types once, fast, with a blinking block cursor, then rests as ordinary text.
- Supporting continuity only: section entrances fade, project cards stagger as a list with a capped total delay, and command-like controls acknowledge presses.
- Theme and state changes transition color and border only; no layout-property animation.
- Smooth anchor scrolling, disabled under reduced motion; all loops and typing stop or resolve immediately when reduced motion is preferred.
- Content is visible by default so failed scripts never blank the page.

## Responsive rules

Content width caps at 1200px with generous hero padding on desktop and compact gutters on phones. The featured panel and project grid collapse to one column; the header keeps prompt, menu control, and availability reachable; the fixed footer stays above safe-area insets. Touch targets stay at least 44px.

## Content truth

All copy comes from the owner brief, `src/content.ts`, or verified public repositories. The seven stories are SensePlay, SenseLink, SensePlay Analytics Engine, TOIO website development, Fablab Management System, Computer Vision Projects, and AR Experiential Marketing. Missing links and dates remain visible TODOs. Counts shown in tiles are derived from shipped content, never marketing metrics.

## Constraints and provenance

Remote fonts are allowed only by this explicit owner override. No trackers, accounts, contact backend, emoji, or invented outcomes. Shipping rasters, if any are added later, must carry provenance; none ship in this revision.
