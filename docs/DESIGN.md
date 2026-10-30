# Sahil TUI Portfolio — Design and Engineering Contract

**Status:** Approved direction; implementation has not started.
**Date:** 2026-10-29
**Platform:** React + Vite, static Vercel deployment.

## Concept

The portfolio is a usable terminal workspace, not a conventional portfolio decorated with terminal motifs. Tmux/Vim navigation, panes, a statusline, command input, keyboard modes, and ANSI palettes are the interface grammar. The work itself remains readable as ordinary content: commands are shortcuts, never prerequisites.

The first screen behaves like a personal `whoami` session. A block-letter SAHIL banner and one-sentence role statement occupy the main pane; a neighboring `neofetch`-style pane provides location, current focus, and a direct route into selected work. Project stories use a file-explorer list and detail pane. `webtui-master/` informed grid-aligned borders and palette references; its Astro app is not a runtime dependency. The adaptation follows the repository's MIT license and retains attribution here.

## Grid math and responsive composition

### Cell model

- `--cw: 1ch` is the horizontal character cell, measured using the self-hosted JetBrains Mono variable font.
- `--lh: 1.5rem` is the base line cell (24px at the root 16px size). Terminal rows, pane padding, borders, and gaps use integer multiples of `--cw` and `--lh`.
- Body text scales from 14px on 320px phones to 16px on wide screens. Line height remains snapped to `--lh`; it does not compress to fit a pane.
- The centered workspace uses two-cell side gutters on compact phones, three-cell gutters on tablets/desktops, and a 144-column maximum shell. These are target counts; CSS `ch` sizing plus device rounding may produce a one-cell variation.

| Viewport | Font | Approx. cell | Shell columns | Main composition |
|---:|---:|---:|---:|---|
| 320px | 14px | 8.4px | 34ch | One column; bottom tabs; pane stacks |
| 375px | 14px | 8.4px | 40ch | One column; compact command chips |
| 414px | 14px | 8.4px | 45ch | One column; full touch controls |
| 768px | 14.5px | 8.7px | 82ch | Two panes where content allows |
| 1024px | 15px | 9px | 108ch | 28ch navigator + 78ch detail |
| 1280px | 15px | 9px | 134ch | 32ch navigator + 100ch detail |
| 1536px | 15.5px | 9.3px | 144ch max | 34ch navigator + 108ch detail |
| 1920px+ | 16px | 9.6px | 144ch max | Centered shell; no stretched text measure |

Short viewports retain scrolling rather than clipping. Mobile controls respect safe-area insets. The project explorer opens details as a full-height pane on phones and returns through Escape/back controls. No interaction relies on hover.

## Typography and icon plan

- One family: JetBrains Mono Variable, self-hosted via `@fontsource-variable/jetbrains-mono` and copied/bundled locally. Preserve the OFL-1.1 copyright/license notice.
- Bundle/subset Latin, box drawing U+2500–U+257F, block elements U+2580–U+259F, and any additional required punctuation. Verify glyph coverage in the shipped font; do not depend on a font CDN.
- Fallback: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`. `font-display: swap`; preload the local variable face. The fallback is used only if the local asset fails.
- Hierarchy comes from size, weight, case, color, and spacing. `calt` ligatures are enabled for command/code spans only and disabled in prose.
- The home H1 is semantic text. An aria-hidden block-letter banner accompanies it at wide widths, with a compact banner and plain-heading fallback on narrow widths.
- One `Icon` component selects a self-hosted Symbols Nerd Font Mono subset when loaded and hand-built one-cell inline SVGs otherwise. Decorative ASCII/box glyphs are `aria-hidden`; controls retain text labels or accessible names. No emoji glyphs are used.

## Theme system

Every theme defines `--bg`, `--fg`, `--cursor`, `--sel`, `--sel-fg`, `--ansi-0` through `--ansi-15`, plus semantic `--accent`, `--ok`, `--warn`, `--err`, `--muted`, `--link`, and `--border`. Components use semantic tokens. ANSI values remain available for terminal samples and syntax accents. Semantic text values below were checked against their theme background with the WCAG relative-luminance formula. Palette-source values stay canonical; only semantic tokens are changed where needed for readable text.

### Tokyo Night (default)

Character: deep blue-black, vivid but calm. Source: Tokyo Night official foot palette, `tokyonight_night.ini`.

| Role | Value |
|---|---|
| Background / foreground | `#1a1b26` / `#c0caf5` |
| Cursor / selection / selection text | `#c0caf5` / `#283457` / `#c0caf5` |
| ANSI 0–7 | `#15161e`, `#f7768e`, `#9ece6a`, `#e0af68`, `#7aa2f7`, `#bb9af7`, `#7dcfff`, `#a9b1d6` |
| ANSI 8–15 | `#414868`, `#f7768e`, `#9ece6a`, `#e0af68`, `#7aa2f7`, `#bb9af7`, `#7dcfff`, `#c0caf5` |
| Semantic accent / ok / warn / err / muted / link / border | `#7aa2f7` / `#9ece6a` / `#e0af68` / `#f7768e` / `#a9b1d6` / `#7dcfff` / `#414868` |

### Gruvbox Dark (medium)

Character: warm retro earth. Source: Gruvbox dark-medium palette in the MIT WebTUI theme reference.

| Role | Value |
|---|---|
| Background / foreground | `#282828` / `#ebdbb2` |
| Cursor / selection / selection text | `#fabd2f` / `#504945` / `#fbf1c7` |
| ANSI 0–7 | `#282828`, `#cc241d`, `#98971a`, `#d79921`, `#458588`, `#b16286`, `#689d6a`, `#a89984` |
| ANSI 8–15 | `#928374`, `#fb4934`, `#b8bb26`, `#fabd2f`, `#83a598`, `#d3869b`, `#8ec07c`, `#fbf1c7` |
| Semantic accent / ok / warn / err / muted / link / border | `#83a598` / `#b8bb26` / `#fabd2f` / `#ff665c` / `#d5c4a1` / `#8ec07c` / `#665c54` |

Adjustment: semantic error uses `#ff665c` (5.13:1) rather than canonical ANSI red `#fb4934` (4.29:1) for small text. ANSI palette remains canonical.

### Catppuccin Mocha

Character: soft modern pastel on dark. Source: Catppuccin Mocha palette in the MIT WebTUI theme reference.

| Role | Value |
|---|---|
| Background / foreground | `#1e1e2e` / `#cdd6f4` |
| Cursor / selection / selection text | `#f5e0dc` / `#45475a` / `#cdd6f4` |
| ANSI 0–7 | `#45475a`, `#f38ba8`, `#a6e3a1`, `#f9e2af`, `#89b4fa`, `#f5c2e7`, `#94e2d5`, `#bac2de` |
| ANSI 8–15 | `#585b70`, `#f38ba8`, `#a6e3a1`, `#f9e2af`, `#89b4fa`, `#f5c2e7`, `#94e2d5`, `#cdd6f4` |
| Semantic accent / ok / warn / err / muted / link / border | `#89b4fa` / `#a6e3a1` / `#f9e2af` / `#f38ba8` / `#bac2de` / `#89dceb` / `#45475a` |

### Nord

Character: cool, restrained arctic. Source: Nord Polar Night, Snow Storm, Frost, and Aurora palette in the MIT WebTUI theme reference.

| Role | Value |
|---|---|
| Background / foreground | `#2e3440` / `#eceff4` |
| Cursor / selection / selection text | `#88c0d0` / `#434c5e` / `#eceff4` |
| ANSI 0–7 | `#3b4252`, `#bf616a`, `#a3be8c`, `#ebcb8b`, `#81a1c1`, `#b48ead`, `#88c0d0`, `#e5e9f0` |
| ANSI 8–15 | `#4c566a`, `#bf616a`, `#a3be8c`, `#ebcb8b`, `#81a1c1`, `#b48ead`, `#8fbcbb`, `#eceff4` |
| Semantic accent / ok / warn / err / muted / link / border | `#88c0d0` / `#a3be8c` / `#ebcb8b` / `#e78284` / `#d8dee9` / `#8fbcbb` / `#434c5e` |

Adjustment: semantic error uses `#e78284` (4.71:1) rather than Nord red `#bf616a` (4.03:1) for small text. ANSI palette remains canonical.

### Phosphor

Character: custom classic green phosphor on deep black; a named variant because there is no single canonical Phosphor terminal palette.

| Role | Value |
|---|---|
| Background / foreground | `#030803` / `#d9ffcf` |
| Cursor / selection / selection text | `#8cff65` / `#153b19` / `#d9ffcf` |
| ANSI 0–7 | `#050805`, `#9a4c3e`, `#7a9d45`, `#b5b05a`, `#4d806f`, `#79965a`, `#5f9c8a`, `#b4c0ad` |
| ANSI 8–15 | `#39443a`, `#ff806b`, `#8cff65`, `#dcf778`, `#81dcb7`, `#b5ff8a`, `#98f1dd`, `#e4ffe0` |
| Semantic accent / ok / warn / err / muted / link / border | `#8cff65` / `#74e36a` / `#d4f269` / `#ff9a8a` / `#b5e8a7` / `#98f1dd` / `#29412c` |

### Amber

Character: custom classic amber monochrome CRT variant; semantic warning/error states remain distinct by label and shape, not color alone.

| Role | Value |
|---|---|
| Background / foreground | `#0b0803` / `#ffe4a8` |
| Cursor / selection / selection text | `#ffbf47` / `#49300a` / `#ffe4a8` |
| ANSI 0–7 | `#0b0803`, `#a14b36`, `#8b854a`, `#c19a42`, `#8d7848`, `#a16f4a`, `#b08a50`, `#d7b97b` |
| ANSI 8–15 | `#756044`, `#ff8c69`, `#e2d36f`, `#ffd37a`, `#d9a24e`, `#e5aa74`, `#e6c785`, `#ffe4a8` |
| Semantic accent / ok / warn / err / muted / link / border | `#ffbf47` / `#f6c453` / `#ffd37a` / `#ff8c69` / `#f0ca7b` / `#ffc04a` / `#49300a` |

### Light (Catppuccin Latte)

Character: readable daytime terminal. Source: Catppuccin Latte palette in the MIT WebTUI theme reference.

| Role | Value |
|---|---|
| Background / foreground | `#eff1f5` / `#4c4f69` |
| Cursor / selection / selection text | `#1b5ec2` / `#ccd0da` / `#4c4f69` |
| ANSI 0–7 | `#5c5f77`, `#d20f39`, `#40a02b`, `#df8e1d`, `#1e66f5`, `#ea76cb`, `#179299`, `#acb0be` |
| ANSI 8–15 | `#6c6f85`, `#d20f39`, `#40a02b`, `#df8e1d`, `#1e66f5`, `#ea76cb`, `#179299`, `#bcc0cc` |
| Semantic accent / ok / warn / err / muted / link / border | `#1b5ec2` / `#2f7d22` / `#9a5b00` / `#d20f39` / `#5c5f77` / `#1b5ec2` / `#bcc0cc` |

Adjustments: semantic accent/link uses `#1b5ec2` (5.42:1) instead of canonical blue `#1e66f5` (4.34:1); semantic ok uses `#2f7d22` (4.55:1) instead of canonical green `#40a02b` (2.96:1). ANSI palette remains canonical.

### Contrast matrix

Ratios use WCAG relative luminance and the semantic token shown on the row against each `--bg`. All normal semantic text is at least 4.5:1; this includes `--muted`. Cursor and selection text are separately checked. Contrast is not inferred from color alone for state.

| Theme | `--fg` | `--muted` | `--accent` | `--ok` | `--warn` | `--err` | `--link` | Cursor on bg | Selection fg on sel |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Tokyo Night | 10.59 | 8.10 | 6.79 | 9.35 | 8.55 | 6.46 | 9.96 | 10.59 | 7.57 |
| Gruvbox Dark | 10.75 | 8.59 | 5.48 | 7.14 | 8.69 | 5.13 | 7.01 | 8.69 | 7.78 |
| Catppuccin Mocha | 11.34 | 9.26 | 7.79 | 11.03 | 12.91 | 7.08 | 10.54 | 12.95 | 6.31 |
| Nord | 10.84 | 9.25 | 6.24 | 6.13 | 8.00 | 4.71 | 5.99 | 6.24 | 7.49 |
| Phosphor | 18.42 | 14.49 | 15.97 | 12.44 | 16.06 | 9.85 | 15.97 | 15.97 | 11.46 |
| Amber | 16.11 | 12.80 | 12.18 | 12.32 | 14.14 | 8.77 | 12.27 | 12.18 | 9.89 |
| Catppuccin Latte | 7.06 | 5.53 | 5.42 | 4.55 | 4.80 | 4.80 | 5.42 | 5.42 | 5.17 |

First visit uses Light when `prefers-color-scheme: light`, otherwise Tokyo Night. Stored user choice wins. An inline head script sets the theme before content paint; React then hydrates the same choice. Phosphor/Amber CRT scanlines, vignette, and very subtle text glow are theme-only, static (no pulse), and disabled for reduced motion or low-power hints.

## Icon system

One `Icon` React component. The primary face is a self-hosted subset of Symbols Nerd Font Mono from the official Nerd Fonts release, only for explicitly mapped powerline separators, devicons, git/file type marks, and cat glyph. Keep license text. If the font is unavailable, use a matching hand-authored inline SVG path sized to one cell by one line. Box drawing and block elements are text glyphs, not icon substitutes. `scripts/check-no-emoji.mjs` scans authored source/content/metadata for emoji presentation codepoints; box drawing and text-presentation symbols are allow-listed.

## Information architecture

1. **whoami / Home:** semantic h1 and aria-hidden SAHIL block banner; one-sentence positioning, Tanzania / UTC+3, currently building SensePlay, obvious Work and Contact buttons; compact system-info pane.
2. **about:** neofetch card and concise story about accessibility, local context, polish, and practical engineering.
3. **projects:** project list with selected detail; SensePlay, SenseLink, SensePlay Analytics Engine, TOIO website work, Fablab Management System, Computer Vision Projects, and AR Experiential Marketing. Mobile uses a full-height selected-project detail view.
4. **stack:** grouped frontend, backend, data, infra, AI/ML, embedded packages; no percentage bars.
5. **log:** git-graph style experience entries; unknown dates remain typed TODOs.
6. **contact:** verified email and GitHub, LinkedIn TODO, simple mailto-backed form, CV TODO.

Every window is also reachable via visible links/tabs. Normal reading never needs a command.

## Modes and key bindings

| Mode / key | Behavior |
|---|---|
| NORMAL | Default navigation; shortcuts work only when focus is not in a text-editing control. |
| COMMAND | `:` focuses command input; `/` starts command search. |
| INSERT | Entered while the contact form has focus; normal-mode shortcuts are suspended. |
| `1`–`6` | Open the corresponding window. |
| `j` / `k`, arrow keys | Move selected items in lists; ignored in inputs/editable controls. |
| Enter | Open selected item or execute a command. |
| Escape | Close palette/detail/mode and return to NORMAL. |
| Ctrl+K | Open command palette; focus is managed and Escape closes it. |
| `?` | Open keybinding help. |

## Command grammar

Commands parse into a verb plus optional arguments; input is trimmed, quoted arguments are preserved, and paths/IDs are allow-listed. Supported verbs: `help`, `whoami`, `ls`, `cd <section>`, `cat <file>`, `open <project>`, `projects`, `stack`, `log`, `contact`, `theme <name>`, `pet`, `clear`, `history`, `neofetch`, `sudo hire sahil`, `exit`. `Tab` completes known verbs/sections/projects; Up/Down recall session history. Unknown commands report `command not found: <name>. Try 'help'.` A visible command-chip row invokes equivalent commands without a keyboard.

## Motion vocabulary

- CSS `steps()` for cursor blink and optional hero typing only.
- Framer Motion (`LazyMotion`/`m`) for short pane/window transitions using only transform, opacity, or clip-path.
- Duration tokens: 120ms for key feedback, 160ms for pane refresh, 200ms maximum for palette/sheet transitions.
- Boot log under 2.5s, session-only, skippable by any pointer/key input, and disabled for `prefers-reduced-motion`.
- Body copy is never typed out. No scroll-jacking. Pause intervals and animations when the document is hidden.
- Reduced motion uses immediate or opacity-only state transitions and disables boot, CRT texture, glow, and cursor animation.

## Cat state machine

Fixed sprite frame box; states are `idle`, `blink`, `tail-swish`, `sleep`, `happy`. Idle can switch to blink/tail-swish on bounded timers; 45s inactivity enters sleep and renders a static `z z Z`; pointer orientation on desktop is optional and only swaps a predefined frame. Petting from any state immediately enters happy, interrupts any reaction timer, renders a floating `+1`, and chooses one short speech line. After 900ms without a new pet it returns to awake-idle; after prolonged inactivity it may sleep again. Reduced motion freezes the idle animation but keeps button reactions instantaneous. The button has an accessible name, 44px minimum hit area, and a throttled polite live announcement.

## Counter data flow

1. Client mounts with a non-blocking `pet_today_count()` read. Server computes `day = (now() AT TIME ZONE 'Africa/Dar_es_Salaam')::date`.
2. When Supabase is configured, each click increments an optimistic queued delta; a 400ms debounce sends `pet_the_cat(p_by)` with `1 <= p_by <= 10`. Larger queues flush as repeated batches of at most 10; server-returned global count reconciles the display.
3. SQL enables RLS; anon has SELECT only. Direct INSERT/UPDATE/DELETE are revoked. A `SECURITY DEFINER` RPC with fixed `search_path` computes the day server-side and applies a clamped increment. No secrets are sent to the browser; only Supabase URL + anon key are public env.
4. Missing configuration or a failed RPC switches to a per-day localStorage count using `Intl.DateTimeFormat` with `Africa/Dar_es_Salaam`; label the displayed total `(local)`. Storage access is wrapped and never blocks petting.
5. Client soft limit: at most 10 clicks per batch and a short cooldown after bursts; network failure preserves local usability. No Realtime channel in v1.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Vite SPA no-JS content duplication | Keep a readable `noscript` summary with core profile/projects/contact; verify the fallback at build time against required names/links. |
| Box drawing or Nerd Font glyphs missing on fallback | Self-host tested font subsets; include inline SVG fallbacks for icons; verify glyph coverage from font assets. |
| Theme semantic contrast regresses | Keep palette tokens in one typed file; add a contrast assertion test over semantic text colors for all seven themes. |
| Theme flash before React initializes | Inline head bootstrap applies stored/system theme before CSS first paint, wrapped in try/catch for storage failures. |
| Anonymous Supabase RPC abuse | No direct table writes, narrow SECURITY DEFINER function, fixed search path, clamped batch size, client soft limit; document that anonymous aggregate counters cannot prove unique human visits and can still be spammed via direct RPC calls. |
| Credentials unavailable | Local fallback is complete and labeled. Configure Supabase later via `.env.example` and Vercel environment variables. |
| Project details have no public source link | Keep owner-provided descriptions, mark link TODO in typed content, never fabricate URLs or dates. |
| Font file licensing/provenance | Preserve OFL/NERD-font license text beside redistributed assets and document source. |
| Mobile TUI becomes cramped | Collapse panes, use bottom tab navigation and command chips, preserve 14px minimum and full content. Test 8 widths plus landscape/short viewports. |

## Reference provenance

`webtui-master/` is an MIT-licensed local reference. Palette values and the `1ch`/`1lh` box-border technique are adapted from its `@webtui/theme-*` and `@webtui/css` packages. Do not copy its Astro documentation app or rely on its CDN-hosted Nerd Font CSS. Font assets shipped here must be self-hosted and carry their upstream licenses.
