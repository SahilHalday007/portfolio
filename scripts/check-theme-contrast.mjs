import fs from 'node:fs';

const palettes = JSON.parse(fs.readFileSync(new URL('../src/themes/palettes.json', import.meta.url), 'utf8'));
const required = ['bg', 'fg', 'cursor', 'sel', 'selFg', 'accent', 'ok', 'warn', 'err', 'muted', 'link', 'border'];
const failures = [];

function luminance(hex) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrast(a, b) {
  const hi = Math.max(luminance(a), luminance(b));
  const lo = Math.min(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

for (const [name, theme] of Object.entries(palettes)) {
  for (const key of required) {
    if (typeof theme[key] !== 'string' || !/^#[0-9a-f]{6}$/i.test(theme[key])) {
      failures.push(`${name}: ${key} is missing or not a six-digit hex color`);
    }
  }
  if (!Array.isArray(theme.ansi) || theme.ansi.length !== 16 || theme.ansi.some((hex) => !/^#[0-9a-f]{6}$/i.test(hex))) {
    failures.push(`${name}: ANSI palette must contain exactly 16 six-digit colors`);
  }
  for (const key of ['fg', 'accent', 'ok', 'warn', 'err', 'muted', 'link']) {
    const ratio = contrast(theme[key], theme.bg);
    if (ratio < 4.5) failures.push(`${name}: ${key} contrast ${ratio.toFixed(2)}:1 < 4.5:1`);
  }
  if (contrast(theme.cursor, theme.bg) < 3) failures.push(`${name}: cursor contrast is below 3:1`);
  if (contrast(theme.selFg, theme.sel) < 3) failures.push(`${name}: selection text contrast is below 3:1`);
  console.log(`${name}: fg ${contrast(theme.fg, theme.bg).toFixed(2)} · muted ${contrast(theme.muted, theme.bg).toFixed(2)} · accent ${contrast(theme.accent, theme.bg).toFixed(2)}`);
}

if (failures.length) {
  console.error(`FAIL:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('PASS: all seven themes expose complete ANSI-16 palettes and meet semantic contrast targets.');
