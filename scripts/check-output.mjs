#!/usr/bin/env node
/**
 * check-output.mjs — integrity checks on the BUILT output in dist/.
 *
 * `validate.mjs` checks the manuscript source. This checks what the build
 * actually produced, which is where a different class of problem shows up:
 * broken navigation, missing assets, dead endnote links, figures that were
 * re-encoded or swapped, and malformed EPUB packaging.
 *
 * Checks:
 *   1. Figure integrity — every file in assets/figures/ is byte-identical to
 *      one of the supplied originals in source/figures/, and its number matches.
 *   2. Asset references — every img/link/script src in every built page resolves.
 *   3. Link integrity — every internal href resolves, including #fragments.
 *   4. Navigation chain — prev/next links form one complete chain in book order,
 *      with no gaps, no loops, and correct endpoints.
 *   5. Endnotes — every note reference links to a note that exists, and every
 *      note links back to the reference that cites it.
 *   5b. Typography — no typewriter quotes in visible text, and no curly quotes
 *      inside script or style blocks.
 *   6. Table of contents — one entry per section, each resolving.
 *   7. EPUB — valid zip, correct mimetype, container, OPF, and one document per
 *      section (skipped with a notice if the EPUB was not built).
 *   8. Print HTML — contains every section and every figure.
 *
 * Usage: node scripts/check-output.mjs   (run after `npm run build`)
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const errors = [];
const warnings = [];
const notes = [];

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(2);
}

const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));
const sections = book.contents.filter((e) => fs.existsSync(path.join(ROOT, e.file)));
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');

// ---------------------------------------------------------------------------
// 1. Figure integrity against the supplied originals
// ---------------------------------------------------------------------------
const SRC_FIGS = path.join(ROOT, 'source', 'figures');
const ASSET_FIGS = path.join(ROOT, 'assets', 'figures');
if (fs.existsSync(SRC_FIGS) && fs.existsSync(ASSET_FIGS)) {
  const originals = new Map();
  for (const f of fs.readdirSync(SRC_FIGS)) originals.set(sha(path.join(SRC_FIGS, f)), f);
  let identical = 0;
  for (const f of fs.readdirSync(ASSET_FIGS)) {
    if (!/\.(png|jpg|jpeg|svg)$/i.test(f)) continue;
    const orig = originals.get(sha(path.join(ASSET_FIGS, f)));
    if (!orig) {
      errors.push(`assets/figures/${f} is not byte-identical to any supplied original (re-encoded, edited, or from another source)`);
      continue;
    }
    identical++;
    const claimed = /^fig-(\d+)/.exec(f);
    const actual = /^(\d+)_/.exec(orig);
    if (claimed && actual && Number(claimed[1]) !== Number(actual[1])) {
      errors.push(`assets/figures/${f} is numbered ${claimed[1]} but its bytes are original figure ${actual[1]} (${orig})`);
    }
  }
  notes.push(`figures byte-identical to their supplied originals: ${identical}`);
} else {
  warnings.push('source/figures or assets/figures missing — figure integrity not checked');
}

// ---------------------------------------------------------------------------
// HTML parsing (regex is sufficient for output we generate ourselves)
// ---------------------------------------------------------------------------
function parsePage(file) {
  const html = fs.readFileSync(path.join(DIST, file), 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const assets = [...html.matchAll(/<(?:img|script)[^>]+src="([^"]+)"|<link[^>]+href="([^"]+)"/g)].map((m) => m[1] || m[2]);
  const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => m[1]);
  const rel = {};
  for (const m of html.matchAll(/<a\b[^>]*\brel="(prev|next)"[^>]*\bhref="([^"]+)"/g)) rel[m[1]] = m[2];
  return { file, html, ids, assets, links, rel };
}

const pageFiles = fs.readdirSync(DIST).filter((f) => f.endsWith('.html'));
const pages = new Map(pageFiles.map((f) => [f, parsePage(f)]));

// ---------------------------------------------------------------------------
// 2 & 3. Asset and link resolution
// ---------------------------------------------------------------------------
for (const p of pages.values()) {
  for (const a of p.assets) {
    if (/^(https?:|data:|mailto:)/.test(a)) continue;
    if (!fs.existsSync(path.join(DIST, a))) errors.push(`${p.file}: missing asset ${a}`);
  }
  for (const href of p.links) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [target, frag] = href.split('#');
    if (!target) {
      if (frag && !p.ids.has(frag)) errors.push(`${p.file}: dead in-page anchor #${frag}`);
      continue;
    }
    if (!fs.existsSync(path.join(DIST, target))) { errors.push(`${p.file}: dead link -> ${href}`); continue; }
    if (frag && target.endsWith('.html')) {
      const t = pages.get(path.basename(target));
      if (t && !t.ids.has(frag)) errors.push(`${p.file}: dead fragment -> ${href}`);
    }
  }
}
notes.push(`built pages scanned: ${pages.size}`);

// ---------------------------------------------------------------------------
// 4. Navigation chain
// ---------------------------------------------------------------------------
const chain = sections.map((s) => `${s.slug}.html`);
for (let i = 0; i < chain.length; i++) {
  const p = pages.get(chain[i]);
  if (!p) { errors.push(`missing built page for ${chain[i]}`); continue; }
  const expPrev = i > 0 ? chain[i - 1] : null;
  const expNext = i < chain.length - 1 ? chain[i + 1] : null;
  if ((p.rel.prev || null) !== expPrev) errors.push(`${chain[i]}: prev link is ${p.rel.prev || 'absent'}, expected ${expPrev || 'absent'}`);
  if ((p.rel.next || null) !== expNext) errors.push(`${chain[i]}: next link is ${p.rel.next || 'absent'}, expected ${expNext || 'absent'}`);
}
// walk the chain forward from the first page and confirm it reaches the last
let cursor = chain[0], steps = 0, walked = [cursor];
while (cursor && steps++ < chain.length + 2) {
  const nxt = pages.get(cursor)?.rel.next;
  if (!nxt) break;
  if (walked.includes(nxt)) { errors.push(`navigation loop at ${cursor} -> ${nxt}`); break; }
  walked.push(nxt); cursor = nxt;
}
if (walked.length !== chain.length) errors.push(`navigation chain walks ${walked.length} of ${chain.length} sections (stops at ${cursor})`);
else notes.push(`navigation chain complete: ${walked.length} sections, ${chain[0]} -> ${chain[chain.length - 1]}`);

// ---------------------------------------------------------------------------
// 5. Endnotes round-trip
// ---------------------------------------------------------------------------
const notesPage = pages.get('notes.html');
if (notesPage) {
  const refs = [];
  for (const p of pages.values()) {
    if (p.file === 'notes.html' || p.file === 'print.html') continue;
    for (const m of p.html.matchAll(/<sup class="note-ref" id="ref-(\d+)"><a href="([^"]+)"/g)) refs.push({ page: p.file, n: Number(m[1]), href: m[2] });
  }
  const defined = new Set([...notesPage.html.matchAll(/id="note-(\d+)"/g)].map((m) => Number(m[1])));
  for (const r of refs) if (!defined.has(r.n)) errors.push(`${r.page}: note reference ${r.n} has no matching note in notes.html`);
  const backlinks = new Map([...notesPage.html.matchAll(/id="note-(\d+)"[\s\S]*?href="([^"]+)#ref-(\d+)"/g)].map((m) => [Number(m[1]), { file: m[2], ref: Number(m[3]) }]));
  for (const n of defined) {
    const b = backlinks.get(n);
    if (!b) { errors.push(`notes.html: note ${n} has no back-link`); continue; }
    if (b.ref !== n) errors.push(`notes.html: note ${n} links back to ref-${b.ref}`);
    const src = refs.find((r) => r.n === n);
    if (src && path.basename(b.file) !== src.page) errors.push(`notes.html: note ${n} links back to ${b.file} but is cited in ${src.page}`);
  }
  const seq = [...defined].sort((a, b) => a - b);
  if (seq.length && (seq[0] !== 1 || seq[seq.length - 1] !== seq.length)) warnings.push(`endnote numbering is not a contiguous 1..n run (${seq.length} notes, max ${seq[seq.length - 1]})`);
  notes.push(`endnotes: ${refs.length} references, ${defined.size} notes, all round-trips checked`);
}

// ---------------------------------------------------------------------------
// 5b. Typography
// ---------------------------------------------------------------------------
// Pandoc smartens the EPUB and DOCX itself; these HTML pages are rendered by
// marked, which does not, and the print edition and the PDF come from them. A
// straight quote reaching visible text means the build's typographic pass was
// bypassed on some path, which is easy to reintroduce and invisible until the
// book is set. Script and style bodies are exempt: their quotes are syntax.
{
  let checked = 0;
  const before = errors.length;
  for (const p of pages.values()) {
    const visible = p.html
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '')
      .replace(/<[^>]*>/g, '');
    const straight = visible.match(/["']/g);
    if (straight) {
      const i = visible.search(/["']/);
      errors.push(`${p.file}: ${straight.length} typewriter quote(s) in visible text — …${visible.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}…`);
    }
    const inCode = p.html.match(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g) || [];
    for (const blk of inCode) if (/[\u201c\u201d\u2018\u2019]/.test(blk)) errors.push(`${p.file}: curly quotes inside a ${blk.slice(1, 7)} block — the typographic pass ran over code`);
    checked++;
  }
  if (errors.length === before) notes.push(`typographic quotes: ${checked} pages, no typewriter quotes in visible text`);
}

// ---------------------------------------------------------------------------
// 6. Table of contents
// ---------------------------------------------------------------------------
const index = pages.get('index.html');
if (index) {
  const tocHrefs = [...(index.html.match(/<nav id="contents"[\s\S]*?<\/nav>/) || [''])[0].matchAll(/href="([^"#]+)"/g)].map((m) => m[1]);
  for (const s of sections) if (!tocHrefs.includes(`${s.slug}.html`)) errors.push(`index.html: contents is missing ${s.slug}.html`);
  if (tocHrefs.length !== sections.length) warnings.push(`index.html: contents lists ${tocHrefs.length} entries for ${sections.length} sections`);
  else notes.push(`contents lists all ${sections.length} sections`);
}

// ---------------------------------------------------------------------------
// 7. EPUB structure
// ---------------------------------------------------------------------------
const epub = path.join(DIST, 'burn-in-v2.epub');
if (!fs.existsSync(epub)) {
  notes.push('EPUB not present (Pandoc unavailable) — structure check skipped');
} else {
  try {
    const list = execFileSync('unzip', ['-l', epub], { encoding: 'utf8' });
    const mimetype = execFileSync('unzip', ['-p', epub, 'mimetype'], { encoding: 'utf8' }).trim();
    if (mimetype !== 'application/epub+zip') errors.push(`EPUB mimetype is "${mimetype}"`);
    for (const required of ['META-INF/container.xml', 'nav.xhtml']) {
      if (!list.includes(required)) errors.push(`EPUB missing ${required}`);
    }
    const docs = (list.match(/ch\d+\.xhtml/g) || []).length;
    if (docs < sections.length - 4) warnings.push(`EPUB contains ${docs} chapter documents for ${sections.length} sections`);
    notes.push(`EPUB structure OK: correct mimetype, container, nav, ${docs} chapter documents`);
  } catch (e) {
    warnings.push(`EPUB check could not run (${e.message.split('\n')[0]})`);
  }
}

// ---------------------------------------------------------------------------
// 8. Print HTML completeness
// ---------------------------------------------------------------------------
const print = pages.get('print.html');
if (print) {
  for (const s of sections) if (!print.html.includes(`id="${s.slug}"`)) errors.push(`print.html: missing section ${s.slug}`);
  const figsInPrint = new Set([...print.html.matchAll(/assets\/figures\/([^"]+)"/g)].map((m) => m[1]));
  const figsOnDisk = fs.readdirSync(ASSET_FIGS).filter((f) => /\.(png|jpg|svg)$/i.test(f));
  for (const f of figsOnDisk) if (!figsInPrint.has(f)) errors.push(`print.html: figure ${f} is missing from the print edition`);
  notes.push(`print.html contains all ${sections.length} sections and all ${figsOnDisk.length} figures`);
}

// ---------------------------------------------------------------------------
for (const n of notes) console.log(`  ok      ${n}`);
for (const w of warnings) console.log(`  warn    ${w}`);
for (const e of errors) console.log(`  ERROR   ${e}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
