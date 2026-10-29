# SH/007 — Sahil Halday007 Portfolio

Interactive developer portfolio: terminal-inspired design, working command terminal, interactive pixel cat with a daily local click counter, and seven verified public projects.

**Stack:** plain HTML + CSS + vanilla JS. No build step, no dependencies, no trackers.

## Local preview

Any static server works:

```bash
npx serve .
# or
python -m http.server 8000
```

Or just open `index.html` in a browser.

## Checks

```bash
node js/main.js        # syntax check + counter logic self-check (asserts)
node -e "require('./js/main.js')"  # same, via require
```

## Deploy to GitHub Pages

This site is built for the `SahilHalday007.github.io` repository (currently hosting a placeholder page).

```bash
git remote add origin https://github.com/SahilHalday007/SahilHalday007.github.io.git
git push origin main
```

If the remote already exists and points elsewhere:

```bash
git remote set-url origin https://github.com/SahilHalday007/SahilHalday007.github.io.git
git push -f origin main
```

Then in GitHub: **Settings → Pages → Source: Deploy from a branch → `main` → `/ (root)` → Save.**

The site is live at https://sahilhalday007.github.io within a minute or two.

## Structure

```
index.html     — the whole page (semantic sections)
css/styles.css — design tokens + visual system
js/main.js     — nav, terminal, reveals, cat + counter (~no deps)
assets/        — real assets (MekiMeki PCB from the toio_games repo)
favicon.svg    — SH/007 terminal mark
```

The cat's click counter is stored in `localStorage` as `sh007_cat_clicks`
(`{"date":"YYYY-MM-DD","count":N}`, device-local calendar day). It counts clicks
in that browser only — no data leaves the device.
