import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src', 'scripts', 'public', 'docs', 'index.html', 'README.md', 'PRODUCT.md', 'AGENTS.md'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.html', '.css', '.md', '.txt', '.xml', '.yml', '.yaml']);
const findings = [];

// Extended pictographs, emoji-style symbols, and their presentation modifiers.
const emojiCodepoints = [
  [0x1f000, 0x1faff],
  [0x1fc00, 0x1ffff],
  [0x2600, 0x26ff],
  [0x2700, 0x27bf],
  [0x2300, 0x23ff],
  [0x2b00, 0x2bff],
];
const modifiers = new Set([0xfe0e, 0xfe0f, 0x200d]);
const regionalIndicators = [0x1f1e6, 0x1f1ff];
const allowedSymbols = new Set([0x2190, 0x2191, 0x2192, 0x2193, 0x2194, 0x2195, 0x21b3, 0x21b5]);

function codepointLabel(cp) {
  return `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
}

function scanText(file, text) {
  const points = Array.from(text);
  for (let i = 0; i < points.length; i += 1) {
    const cp = points[i].codePointAt(0);
    if (cp === undefined) continue;
    const inRange = emojiCodepoints.some(([start, end]) => cp >= start && cp <= end);
    if (inRange || modifiers.has(cp) || (cp >= regionalIndicators[0] && cp <= regionalIndicators[1])) {
      if (allowedSymbols.has(cp)) continue;
      findings.push(`${file}: ${codepointLabel(cp)}`);
    }
  }
}

function walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (EXTENSIONS.has(path.extname(target))) scanText(target, fs.readFileSync(target, 'utf8'));
    return;
  }
  for (const entry of fs.readdirSync(target)) walk(path.join(target, entry));
}

for (const root of ROOTS) walk(root);

if (process.argv.includes('--self-test')) {
  const allowed = '╭─ projects ─╮ █ ▓ ▒ ░ ● ○ ◆ ▸ ■ □ › → ↗ ↓';
  const originalRoots = [...ROOTS];
  ROOTS.length = 0;
  scanText('allowed.txt', allowed);
  if (findings.length) {
    console.error(`Self-test failed: allowed terminal symbols were rejected: ${findings.join(', ')}`);
    process.exit(1);
  }
  scanText('rejected.txt', '\u{1f98a}');
  if (findings.length !== 1) {
    console.error('Self-test failed: an emoji presentation codepoint was not rejected.');
    process.exit(1);
  }
  ROOTS.push(...originalRoots);
  findings.length = 0;
  console.log('PASS: terminal symbols are allowed and emoji are rejected.');
}

if (findings.length) {
  console.error(`Emoji presentation codepoints are not allowed:\n${[...new Set(findings)].join('\n')}`);
  process.exit(1);
}
console.log('PASS: no emoji presentation codepoints found.');
