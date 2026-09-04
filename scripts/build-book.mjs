#!/usr/bin/env node
/**
 * build-book.mjs — builds BURN IN, Version 2.0 from manuscript/*.md
 *
 * Always produces (in dist/):
 *   burn-in-v2.md          merged manuscript (Pandoc-flavoured Markdown, footnotes intact)
 *   index.html             title page + contents
 *   <slug>.html            one reading page per manuscript file (front matter, chapters, notes…)
 *   print.html             print-friendly single-file HTML
 *   assets/, styles.css, reader.js, favicon.svg
 *   build-report.json      what was built, what was skipped and why
 *
 * Produces only when the optional tool is available (never faked):
 *   burn-in-v2.epub, burn-in-v2.docx   — Pandoc
 *   burn-in-v2.pdf                     — Chromium/Chrome headless, wkhtmltopdf, or WeasyPrint
 *
 * Usage: node scripts/build-book.mjs [--no-pandoc] [--no-pdf]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import yaml from 'js-yaml';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PREVIEW = path.join(ROOT, 'preview');
const argv = process.argv.slice(2);
const NO_PANDOC = argv.includes('--no-pandoc');
const NO_PDF = argv.includes('--no-pdf');

const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));
const report = { built: [], skipped: [], warnings: [], startedAt: new Date().toISOString() };

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// typographic quotes
// ---------------------------------------------------------------------------
// Pandoc applies its `smart` extension to the EPUB and DOCX, so those editions
// already set curly quotes. The HTML pages here are rendered by marked, which
// dropped smartypants in v7 and passes straight quotes through, and the print
// edition and the PDF are printed from that HTML. Without this the reading
// preview and the PDF are the only editions of the book set with typewriter
// quotes. Runs over rendered HTML: text between tags only, never attribute
// values, never the contents of <code> or <pre>.

const ELISIONS = /^(?:cause|em|n|round|til|tis|twas|bout|nother|s)\b/i;

function smartenText(text, prevChar) {
  // marked escapes quotes in text content, so the characters arrive here as
  // entities. Decode just those two before deciding; the curly replacements
  // need no escaping, and &amp;quot; is left alone because the character
  // before `quot;` is a semicolon, not an ampersand.
  text = text.replace(/&quot;/g, '"').replace(/&#0*39;|&apos;/g, "'");
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== '"' && ch !== "'") { out += ch; prevChar = ch; continue; }
    const next = text[i + 1] || '';
    // An HTML entity (&quot; &amp;) never reaches here as a bare quote, so the
    // only decision is opening vs closing, made from the character before it.
    const opensHere = prevChar === '' || /[\s(\[{—–“‘]/.test(prevChar);
    if (ch === '"') {
      out += opensHere ? '“' : '”';
    } else if (/[A-Za-z0-9]/.test(prevChar) && /[A-Za-z]/.test(next)) {
      out += '’';                       // don't, I'm, o'clock
    } else if (/[A-Za-z]/.test(prevChar) && !/[A-Za-z0-9]/.test(next)) {
      out += '’';                       // the surgeons' lounge, 1990s'
    } else if (opensHere && ELISIONS.test(text.slice(i + 1))) {
      out += '’';                       // 'cause, 'em, 'til
    } else if (opensHere && /^\d\ds\b/.test(text.slice(i + 1))) {
      out += '’';                       // '60s
    } else {
      out += opensHere ? '‘' : '’';
    }
    prevChar = out[out.length - 1];
  }
  return { text: out, prevChar };
}

function smarten(html) {
  let out = '';
  let prevChar = '';
  let skipDepth = 0;
  const re = /<\/?([A-Za-z][\w-]*)\b[^>]*>|<!--[\s\S]*?-->/g;
  let last = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const chunk = html.slice(last, m.index);
    if (skipDepth > 0) { out += chunk; }
    else { const r = smartenText(chunk, prevChar); out += r.text; prevChar = r.prevChar; }
    const tag = (m[1] || '').toLowerCase();
    if (tag === 'code' || tag === 'pre' || tag === 'kbd' || tag === 'samp') {
      if (m[0].startsWith('</')) skipDepth = Math.max(0, skipDepth - 1);
      else if (!m[0].endsWith('/>')) skipDepth++;
    }
    // A block boundary resets the reader's context: a quote opening a new
    // paragraph must not be read as closing one from the paragraph before.
    if (/^(?:p|h[1-6]|li|blockquote|figcaption|div|section|hr|br|ol|ul|table|td|th)$/.test(tag)) prevChar = '';
    out += m[0];
    last = m.index + m[0].length;
  }
  const tailChunk = html.slice(last);
  out += skipDepth > 0 ? tailChunk : smartenText(tailChunk, prevChar).text;
  return out;
}

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
const numberWord = (n) => NUMBER_WORDS[n] ?? String(n);

function wordCount(md) {
  const text = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/[*_>#`]/g, '')
    .replace(/<[^>]+>/g, '');
  const w = text.replace(/[^\p{L}\p{N}'’-]+/gu, ' ').trim();
  return w ? w.split(/\s+/).length : 0;
}

function rmrfDistExceptReadme() {
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  for (const f of fs.readdirSync(DIST)) {
    if (f === 'README.md') continue;
    fs.rmSync(path.join(DIST, f), { recursive: true, force: true });
  }
}

function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function which(cmd) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim().split('\n')[0] : null;
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: opts.cwd || DIST, timeout: opts.timeout || 180000 });
  return { ok: r.status === 0, stdout: r.stdout, stderr: r.stderr, status: r.status, error: r.error };
}

// ---------------------------------------------------------------------------
// load manuscript
// ---------------------------------------------------------------------------
const entries = book.contents.map((e) => {
  const abs = path.join(ROOT, e.file);
  if (!fs.existsSync(abs)) {
    report.warnings.push(`missing manuscript file: ${e.file}`);
    return { ...e, missing: true, raw: '', body: '', title: e.title, words: 0 };
  }
  const raw = fs.readFileSync(abs, 'utf8');
  const h1 = raw.match(/^# (.+)$/m);
  const title = e.kind === 'chapter' || e.kind === 'introduction' || e.kind === 'epilogue' ? (h1 ? h1[1].trim() : e.title) : e.title;
  const body = raw.replace(/^# .+\n?/m, '');
  return { ...e, raw, body, title, words: wordCount(body), missing: false };
});

const notesEntry = entries.find((e) => e.kind === 'notes');
const readingEntries = entries.filter((e) => !e.missing);

// endnote definitions
const noteDefs = new Map();
if (notesEntry && !notesEntry.missing) {
  const lines = notesEntry.raw.split('\n');
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (m) { cur = m[1]; noteDefs.set(cur, m[2].trim()); continue; }
    if (cur && /^\s{2,}\S/.test(line)) { noteDefs.set(cur, `${noteDefs.get(cur)} ${line.trim()}`); continue; }
    if (!line.trim()) cur = null;
  }
}

// Titles, part names, and the blurbs come from book.yml rather than from the
// manuscript, so they never pass through the renderer. Smarten them once here;
// slugs are declared in book.yml and are not derived from these strings.
const typo = (v) => (typeof v === 'string' ? smartenText(v, '').text : v);
for (const k of ['title', 'subtitle', 'edition', 'author', 'description']) book[k] = typo(book[k]);
for (const e of entries) for (const k of ['title', 'part', 'part_title', 'kicker']) e[k] = typo(e[k]);

// global numbering in reading order
const noteOrder = []; // [{id, number, chapterSlug, chapterTitle}]
const noteNumber = new Map();
for (const e of readingEntries) {
  if (e.kind === 'notes') continue;
  const re = /\[\^([^\]]+)\](?!:)/g;
  let m;
  while ((m = re.exec(e.body))) {
    if (!noteNumber.has(m[1])) {
      const n = noteOrder.length + 1;
      noteNumber.set(m[1], n);
      noteOrder.push({ id: m[1], number: n, chapterSlug: e.slug, chapterTitle: displayTitle(e) });
      if (!noteDefs.has(m[1])) report.warnings.push(`endnote [^${m[1]}] in ${e.file} has no definition in the notes file`);
    }
  }
}

function displayTitle(e) {
  if (e.kind === 'chapter') return `Chapter ${e.number}: ${e.title}`;
  if (e.kind === 'introduction') return `Introduction: ${e.title}`;
  return e.title;
}

// ---------------------------------------------------------------------------
// markdown rendering
// ---------------------------------------------------------------------------
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    image({ href, text }) {
      const src = href.replace(/^(\.\.\/)+assets\//, 'assets/');
      const cap = smartenText(text || '', '').text;
      return `<figure class="figure"><img src="${esc(src)}" alt="${esc(cap)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`;
    },
    hr() {
      return '<hr class="scene-break" aria-hidden="true">';
    },
  },
});

function preprocess(md, { notesHref }) {
  return md.replace(/\[\^([^\]]+)\](?!:)/g, (_, id) => {
    const n = noteNumber.get(id);
    if (!n) return '';
    return `<sup class="note-ref" id="ref-${n}"><a href="${notesHref}#note-${n}" aria-label="Note ${n}">${n}</a></sup>`;
  });
}

function renderBody(e, { notesHref }) {
  if (e.kind === 'notes') return renderNotesBody();
  // image paths in the body are relative to manuscript/; the renderer normalises them.
  const html = marked.parse(preprocess(e.body, { notesHref }));
  // demote subheads inside a page: H2 stays H2 (chapter title is the H1 in the template)
  return smarten(html);
}

function renderNotesBody() {
  if (!noteOrder.length) return '<p class="muted">This edition has no endnotes.</p>';
  let html = '';
  let currentChapter = null;
  for (const n of noteOrder) {
    if (n.chapterTitle !== currentChapter) {
      if (currentChapter !== null) html += '</ol>';
      currentChapter = n.chapterTitle;
      html += `<h2 class="notes-group">${esc(currentChapter)}</h2><ol class="notes" start="${n.number}">`;
    }
    const text = noteDefs.get(n.id) || '<em>Definition missing.</em>';
    html += `<li id="note-${n.number}" value="${n.number}">${smarten(marked.parseInline(text))} <a class="backlink" href="${n.chapterSlug}.html#ref-${n.number}" aria-label="Back to text">↩</a></li>`;
  }
  html += '</ol>';
  return html;
}

// ---------------------------------------------------------------------------
// HTML templates
// ---------------------------------------------------------------------------
const meta = {
  title: book.title,
  subtitle: book.subtitle,
  edition: book.edition,
  author: book.author,
  year: book.year,
  description: book.description || '',
  lang: book.language || 'en',
};

function head(pageTitle, { extraClass = '', description = meta.description, canonical = '' } = {}) {
  return `<!doctype html>
<html lang="${meta.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(meta.author)}">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="book">
<meta property="og:image" content="assets/cover/burn-in-v2-cover.png">
<meta name="theme-color" content="#dc5231">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="styles.css">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
</head>
<body class="${extraClass}">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><span></span></div>`;
}

function topbar(e) {
  const crumb = e ? (e.kind === 'chapter' ? `${e.part} · ${e.part_title}` : e.title) : '';
  return `<header class="topbar">
<a class="wordmark" href="index.html" aria-label="${esc(meta.title)} home">${esc(meta.title)}</a>
<span class="crumb">${esc(crumb)}</span>
<a class="toc-link" href="index.html#contents">Contents</a>
</header>`;
}

function footer() {
  return `<footer class="site-footer"><p>© ${meta.year} ${esc(meta.author)} · <em>${esc(meta.title)}</em>, ${esc(meta.edition)}</p></footer>
<script src="reader.js" defer></script>
</body>
</html>`;
}

function partOpener(e, prev) {
  if (e.kind !== 'chapter') return '';
  if (prev && prev.kind === 'chapter' && prev.part === e.part) return '';
  return `<section class="part-opener"><p class="part-label">${esc(e.part)}</p><h2 class="part-title">${esc(e.part_title)}</h2></section>`;
}

function kicker(e) {
  if (e.kind === 'chapter') return `Chapter ${numberWord(e.number)}`;
  if (e.kind === 'introduction') return 'Introduction';
  if (e.kind === 'epilogue') return 'Epilogue';
  if (e.kind === 'notes') return 'Notes';
  return '';
}

function pageHeading(e) {
  const t = e.kind === 'epilogue' ? e.title.replace(/^Epilogue:\s*/i, '') : e.title;
  return `<header class="chapter-head">${kicker(e) ? `<p class="kicker">${esc(kicker(e))}</p>` : ''}<h1>${esc(t)}</h1></header>`;
}

function pager(prev, next) {
  const a = (x, rel, label) => x ? `<a rel="${rel}" href="${x.slug}.html"><span class="pager-label">${label}</span><span class="pager-title">${esc(displayTitle(x))}</span></a>` : '<span></span>';
  return `<nav class="pager" aria-label="Chapter navigation">${a(prev, 'prev', 'Previous')}${a(next, 'next', 'Next')}</nav>`;
}

function tocHtml({ hrefFor }) {
  let html = '<nav id="contents" class="toc" aria-label="Contents"><h2>Contents</h2>';
  let currentPart = null;
  let open = false;
  for (const e of readingEntries) {
    if (e.kind === 'chapter' && e.part !== currentPart) {
      if (open) html += '</ol>';
      currentPart = e.part;
      html += `<h3 class="toc-part"><span>${esc(e.part)}</span> ${esc(e.part_title)}</h3><ol class="toc-list">`;
      open = true;
    } else if (e.kind !== 'chapter' && currentPart !== null) {
      if (open) html += '</ol>';
      currentPart = null; open = false;
      html += '<ol class="toc-list toc-list--plain">';
      open = true;
    } else if (!open) {
      html += '<ol class="toc-list toc-list--plain">';
      open = true;
    }
    const num = e.kind === 'chapter' ? `<span class="toc-num">${e.number}</span>` : '';
    html += `<li>${num}<a href="${hrefFor(e)}">${esc(e.kind === 'chapter' ? e.title : displayTitle(e))}</a></li>`;
  }
  if (open) html += '</ol>';
  html += '</nav>';
  return html;
}

function titleBlock() {
  return `<section class="title-page">
<div class="stack" aria-label="${esc(meta.title)}"><span>${esc(meta.title)}</span><span>${esc(meta.title)}</span><span>${esc(meta.title)}</span><span>${esc(meta.title)}</span></div>
<p class="subtitle">${esc(meta.subtitle)}</p>
<p class="edition">${esc(meta.edition)}</p>
<p class="author">${esc(meta.author)}</p>
</section>`;
}

// ---------------------------------------------------------------------------
// write outputs
// ---------------------------------------------------------------------------
rmrfDistExceptReadme();
copyDir(path.join(ROOT, 'assets', 'figures'), path.join(DIST, 'assets', 'figures'));
copyDir(path.join(ROOT, 'assets', 'cover'), path.join(DIST, 'assets', 'cover'));
for (const f of ['styles.css', 'reader.js', 'favicon.svg']) {
  const src = path.join(PREVIEW, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
  else report.warnings.push(`preview asset missing: preview/${f}`);
}

// per-page HTML
readingEntries.forEach((e, i) => {
  const prev = readingEntries[i - 1] || null;
  const next = readingEntries[i + 1] || null;
  const body = renderBody(e, { notesHref: 'notes.html' });
  const html = `${head(`${e.kind === 'chapter' ? `Chapter ${e.number}: ` : ''}${e.title} · ${meta.title}`, { extraClass: 'reading' })}
${topbar(e)}
<main id="main" class="page">
${partOpener(e, prev)}
${pageHeading(e)}
<div class="prose">
${body}
</div>
</main>
${pager(prev, next)}
${footer()}`;
  fs.writeFileSync(path.join(DIST, `${e.slug}.html`), html);
});
report.built.push({ output: 'chapter pages', count: readingEntries.length });

// index.html
{
  const lastRead = `<p class="continue" hidden><a id="continue-link" href="#">Continue reading</a></p>`;
  const html = `${head(`${meta.title}: ${meta.subtitle} (${meta.edition}) by ${meta.author}`, { extraClass: 'home' })}
${topbar(null)}
<main id="main" class="page page--home">
${titleBlock()}
${lastRead}
${tocHtml({ hrefFor: (e) => `${e.slug}.html` })}
<section class="downloads"><h2>Other formats</h2><ul>
<li><a href="print.html">Print-friendly HTML</a> (single page; use your browser’s print dialog for PDF)</li>
<li><a href="burn-in-v2.md">Merged manuscript (Markdown)</a></li>
${fs.existsSync(path.join(DIST, 'burn-in-v2.epub')) ? '<li><a href="burn-in-v2.epub">EPUB</a></li>' : ''}
</ul></section>
</main>
${footer()}`;
  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  report.built.push({ output: 'index.html' });
}

// print.html — single file
{
  let body = '';
  let prev = null;
  for (const e of readingEntries) {
    body += `<article class="chapter-page" id="${e.slug}">${partOpener(e, prev)}${pageHeading(e)}<div class="prose">${renderBody(e, { notesHref: '' })}</div></article>`;
    prev = e;
  }
  const html = `${head(`${meta.title} (${meta.edition}) — print edition`, { extraClass: 'print-doc' })}
<main id="main" class="page">
${titleBlock()}
${tocHtml({ hrefFor: (e) => `#${e.slug}` })}
${body}
</main>
<footer class="site-footer"><p>© ${meta.year} ${esc(meta.author)}</p></footer>
</body></html>`;
  fs.writeFileSync(path.join(DIST, 'print.html'), html.replace(/<div class="progress"[^>]*><span><\/span><\/div>/, ''));
  report.built.push({ output: 'print.html' });
}

// merged markdown (Pandoc-flavoured)
{
  const parts = [];
  parts.push(`---\ntitle: "${meta.title}"\nsubtitle: "${meta.subtitle} (${meta.edition})"\nauthor: "${meta.author}"\ndate: "${meta.year}"\nlang: ${meta.lang}\n---\n`);
  let prevPart = null;
  for (const e of readingEntries) {
    if (e.kind === 'notes') continue;
    if (e.kind === 'chapter' && e.part !== prevPart) {
      parts.push(`\n# ${e.part}: ${e.part_title} {.part .unnumbered}\n`);
      prevPart = e.part;
    }
    const heading = e.kind === 'chapter' ? `# Chapter ${e.number}: ${e.title}` : `# ${e.title}`;
    const body = e.body.replace(/\]\((?:\.\.\/)+assets\//g, '](assets/');
    parts.push(`\n${heading}\n${body.trim()}\n`);
  }
  if (noteOrder.length) {
    parts.push('\n<!-- Endnote definitions (Pandoc renders these as numbered notes) -->\n');
    for (const n of noteOrder) parts.push(`[^${n.id}]: ${noteDefs.get(n.id) || 'Definition missing.'}\n`);
  }
  fs.writeFileSync(path.join(DIST, 'burn-in-v2.md'), parts.join(''));
  report.built.push({ output: 'burn-in-v2.md' });
}

// ---------------------------------------------------------------------------
// optional: Pandoc → EPUB, DOCX
// ---------------------------------------------------------------------------
const pandoc = NO_PANDOC ? null : which('pandoc');
if (!pandoc) {
  report.skipped.push({ output: 'burn-in-v2.epub', reason: NO_PANDOC ? '--no-pandoc' : 'Pandoc not installed (optional; see README)' });
  report.skipped.push({ output: 'burn-in-v2.docx', reason: NO_PANDOC ? '--no-pandoc' : 'Pandoc not installed (optional; see README)' });
} else {
  const version = run(pandoc, ['--version']).stdout.split('\n')[0];
  const coverPng = path.join(DIST, 'assets', 'cover', 'burn-in-v2-cover.png');
  const epubArgs = ['burn-in-v2.md', '-o', 'burn-in-v2.epub', '--toc', '--toc-depth=1', '--split-level=1', `--metadata=lang:${meta.lang}`, '--resource-path=.'];
  if (fs.existsSync(path.join(PREVIEW, 'epub.css'))) epubArgs.push(`--css=${path.join(PREVIEW, 'epub.css')}`);
  if (fs.existsSync(coverPng)) epubArgs.push(`--epub-cover-image=${coverPng}`);
  const epub = run(pandoc, epubArgs);
  if (epub.ok) report.built.push({ output: 'burn-in-v2.epub', tool: version });
  else report.skipped.push({ output: 'burn-in-v2.epub', reason: `pandoc failed: ${(epub.stderr || epub.error?.message || '').trim().slice(0, 500)}` });
  const docx = run(pandoc, ['burn-in-v2.md', '-o', 'burn-in-v2.docx', '--toc', '--toc-depth=1', '--resource-path=.']);
  if (docx.ok) report.built.push({ output: 'burn-in-v2.docx', tool: version });
  else report.skipped.push({ output: 'burn-in-v2.docx', reason: `pandoc failed: ${(docx.stderr || docx.error?.message || '').trim().slice(0, 500)}` });
}

// ---------------------------------------------------------------------------
// optional: PDF engine
// ---------------------------------------------------------------------------
function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  for (const c of ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable', 'chrome']) {
    const p = which(c);
    if (p) return p;
  }
  const pw = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw)) {
      for (const rel of ['chrome-linux/chrome', 'chrome-linux/headless_shell', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const p = path.join(pw, d, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null;
}

if (NO_PDF) {
  report.skipped.push({ output: 'burn-in-v2.pdf', reason: '--no-pdf' });
} else {
  const printHtml = `file://${path.join(DIST, 'print.html')}`;
  const pdfOut = path.join(DIST, 'burn-in-v2.pdf');
  const chrome = findChrome();
  const wk = which('wkhtmltopdf');
  const weasy = which('weasyprint');
  let done = false;
  if (chrome) {
    const r = run(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer', '--virtual-time-budget=15000', `--print-to-pdf=${pdfOut}`, printHtml], { timeout: 300000 });
    if (r.ok && fs.existsSync(pdfOut) && fs.statSync(pdfOut).size > 1000) { report.built.push({ output: 'burn-in-v2.pdf', tool: `Chromium headless (${chrome})` }); done = true; }
    else report.warnings.push(`Chromium PDF attempt failed: ${(r.stderr || r.error?.message || '').trim().slice(0, 300)}`);
  }
  if (!done && wk) {
    const r = run(wk, ['--quiet', '--enable-local-file-access', printHtml, pdfOut], { timeout: 300000 });
    if (r.ok) { report.built.push({ output: 'burn-in-v2.pdf', tool: 'wkhtmltopdf' }); done = true; }
  }
  if (!done && weasy) {
    const r = run(weasy, [path.join(DIST, 'print.html'), pdfOut], { timeout: 300000 });
    if (r.ok) { report.built.push({ output: 'burn-in-v2.pdf', tool: 'WeasyPrint' }); done = true; }
  }
  if (!done) report.skipped.push({ output: 'burn-in-v2.pdf', reason: 'no reliable PDF engine found (Chromium/Chrome, wkhtmltopdf, or WeasyPrint); open dist/print.html in a browser and print to PDF' });
}

// re-render index so the EPUB link appears if it was built
if (fs.existsSync(path.join(DIST, 'burn-in-v2.epub'))) {
  const idx = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  if (!idx.includes('burn-in-v2.epub')) {
    fs.writeFileSync(path.join(DIST, 'index.html'), idx.replace('</ul></section>', '<li><a href="burn-in-v2.epub">EPUB</a></li>\n<li><a href="burn-in-v2.docx">DOCX</a></li>' + (fs.existsSync(path.join(DIST, 'burn-in-v2.pdf')) ? '\n<li><a href="burn-in-v2.pdf">PDF</a></li>' : '') + '</ul></section>'));
  }
}

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------
const chapterWords = readingEntries.filter((e) => ['chapter', 'introduction', 'epilogue'].includes(e.kind)).reduce((a, e) => a + e.words, 0);
const manuscriptWords = readingEntries.filter((e) => e.kind !== 'notes').reduce((a, e) => a + e.words, 0);
report.words = { chaptersIntroEpilogue: chapterWords, manuscriptExcludingNotes: manuscriptWords, notes: notesEntry && !notesEntry.missing ? wordCount(notesEntry.body) : 0 };
report.endnotes = noteOrder.length;
report.finishedAt = new Date().toISOString();
fs.writeFileSync(path.join(DIST, 'build-report.json'), JSON.stringify(report, null, 2));

console.log(`BURN IN ${meta.edition} — build complete`);
for (const b of report.built) console.log(`  built    ${b.output}${b.count ? ` (${b.count})` : ''}${b.tool ? `  [${b.tool}]` : ''}`);
for (const s of report.skipped) console.log(`  skipped  ${s.output}: ${s.reason}`);
for (const w of report.warnings) console.log(`  warning  ${w}`);
console.log(`  words    ${manuscriptWords} (manuscript excluding notes); ${chapterWords} (introduction + chapters + epilogue); ${noteOrder.length} endnotes`);
process.exit(report.warnings.some((w) => w.startsWith('missing manuscript file')) ? 1 : 0);
