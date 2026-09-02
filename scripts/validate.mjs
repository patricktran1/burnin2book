#!/usr/bin/env node
/**
 * validate.mjs — manuscript validator for BURN IN, Version 2.0
 *
 * Dependency-free. Checks:
 *   - legacy terms that must not appear in the manuscript (former spouse, $22M, Wealthbound, FIRE-as-advice)
 *   - placeholders (TODO, TBD, [INSERT ...])
 *   - heading structure (exactly one H1 per chapter file, limited H2s, no H3+)
 *   - figure references resolve to real files; each figure used at most once
 *   - endnote references [^id] resolve to definitions in manuscript/21-notes.md
 *   - prose-cadence heuristics: one-sentence-paragraph ratio, fragment ratio,
 *     repeated sentence openings, tic phrases, em-dash density, rhetorical questions,
 *     italics density, sentence-length variety, generic "AI-ism" vocabulary
 *   - narrative-safety heuristics for the suicide chapter (method detail words)
 *   - word counts per file with target ranges from book.yml (if present)
 *
 * Usage:
 *   node scripts/validate.mjs                 # validate the whole manuscript
 *   node scripts/validate.mjs manuscript/07-chapter-05.md [more files]
 *   node scripts/validate.mjs --strict        # treat warnings as errors
 *   node scripts/validate.mjs --json          # machine-readable report
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANUSCRIPT_DIR = path.join(ROOT, 'manuscript');
const NOTES_FILE = path.join(MANUSCRIPT_DIR, '21-notes.md');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const jsonOut = args.includes('--json');
const fileArgs = args.filter((a) => !a.startsWith('--'));

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Terms that must never appear in manuscript prose (case-insensitive unless noted). */
const LEGACY_ERRORS = [
  { re: /\bAlicia\b/g, label: 'Alicia (former spouse name)' },
  { re: /\bex-wife\b/gi, label: 'ex-wife' },
  { re: /\bmy wife\b/gi, label: 'my wife' },
  { re: /\bour marriage\b/gi, label: 'our marriage' },
  { re: /\$22 million\b/gi, label: '$22 million' },
  { re: /\$22,000,000\b/g, label: '$22,000,000' },
  { re: /\b22[- ]million[- ]dollar\b/gi, label: '22-million-dollar' },
  { re: /\btwenty-two million\b/gi, label: 'twenty-two million' },
  { re: /\bWealthbound\b/gi, label: 'Wealthbound' },
  { re: /\bTODO\b|\bTBD\b|\[INSERT|\bXXX\b|lorem ipsum/gi, label: 'placeholder text' },
];

/** Terms that are allowed only in specific files (e.g., the notes file). */
const RESTRICTED = [
  { re: /\bOnofrio\b/g, label: 'Onofrio (convicted individual named in body text)', allowIn: ['21-notes.md'] },
  { re: /\bFIRE\b/g, label: 'FIRE (only where historically necessary)', allowIn: [], warnOnly: true, max: 3 },
];

/** Sentence-opening tics: max count per chapter before a warning. */
const TICS = [
  { name: 'It did not / It didn\'t', re: /(^|[.!?]\s+)It (did not|didn['’]t)\b/g, max: 3 },
  { name: 'You can', re: /(^|[.!?]\s+)You can\b/g, max: 6 },
  { name: 'I was', re: /(^|[.!?]\s+)I was\b/g, max: 10 },
  { name: 'Sometimes', re: /(^|[.!?]\s+)Sometimes\b/g, max: 4 },
  { name: 'The goal is', re: /\bThe goal (is|was) (not )?/g, max: 2 },
  { name: 'The lesson is', re: /\bThe lesson (is|was)\b/g, max: 1 },
  { name: 'The truth is', re: /\bThe truth is\b/g, max: 1 },
  { name: 'This matters because', re: /\bThis matters because\b/g, max: 1 },
  { name: 'Not X. Not Y. (sentence-initial "Not" fragments)', re: /(^|[.!?]\s+)Not [^.!?]{1,40}[.!?]/g, max: 4 },
  { name: 'It is not about', re: /\bIt (is|was|['’]s) not about\b/g, max: 2 },
  { name: 'high performers ... performing fine (slogan drift)', re: /\bperforming fine\b/gi, max: 3 },
  { name: 'hand of God (use once in the whole book)', re: /\bhand of God\b/gi, max: 1, bookMax: 1 },
];

/** Generic vocabulary that signals AI/LinkedIn cadence. Warn above threshold. */
const AI_ISMS = [
  { re: /\bdelve\b/gi, max: 0 },
  { re: /\btapestry\b/gi, max: 0 },
  { re: /\btestament to\b/gi, max: 0 },
  { re: /\bit['’]s important to note\b/gi, max: 0 },
  { re: /\bin today['’]s (world|fast-paced)\b/gi, max: 0 },
  { re: /\bgame[- ]changer\b/gi, max: 0 },
  { re: /\bunpack\b/gi, max: 1 },
  { re: /\bnavigat(e|ing)\b/gi, max: 2 },
  { re: /\bjourney\b/gi, max: 3 },
  { re: /\bembrace\b/gi, max: 2 },
  { re: /\bresilien(t|ce)\b/gi, max: 4 },
  { re: /\bempower(ed|ing|s)?\b/gi, max: 1 },
  { re: /\bthrive\b/gi, max: 2 },
  { re: /\bauthentic\b/gi, max: 2 },
  { re: /\bvibrant\b/gi, max: 1 },
  { re: /\bprofound(ly)?\b/gi, max: 2 },
  { re: /\bultimately\b/gi, max: 2 },
  { re: /\bthat said\b/gi, max: 1 },
  { re: /\bhere['’]s the thing\b/gi, max: 1 },
  { re: /\blet that sink in\b/gi, max: 0 },
  { re: /\bread that again\b/gi, max: 0 },
];

/** Suicide-chapter safety heuristics: words that suggest method/location detail. */
const METHOD_DETAIL = /\b(\d+\s*(feet|foot|ft|meters|metres|m)\b|address|located at|intersection|GPS|stairwell|elevator to the|railing|ledge|velocity|terminal|impact speed|calculat|mph|kilometers per hour)\b/gi;

const TARGETS_DEFAULT = { min: 250, max: 6500 };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readBookYml() {
  const p = path.join(ROOT, 'book.yml');
  if (!fs.existsSync(p)) return null;
  // Minimal YAML reader for the subset we use (no external deps).
  const text = fs.readFileSync(p, 'utf8');
  const files = [];
  let cur = null;
  for (const raw of text.split('\n')) {
    const line = raw.replace(/#.*$/, '').trimEnd();
    if (!line.trim()) continue;
    const m = line.match(/^\s*-\s*file:\s*(.+)$/);
    if (m) {
      cur = { file: m[1].trim().replace(/^["']|["']$/g, '') };
      files.push(cur);
      continue;
    }
    const kv = line.match(/^\s+(\w+):\s*(.+)$/);
    if (kv && cur) {
      const [, k, v] = kv;
      cur[k] = v.trim().replace(/^["']|["']$/g, '');
    }
  }
  return files;
}

function stripMarkdown(md) {
  return md
    .replace(/^```[\s\S]*?```/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/^\s*\*\s\*\s\*\s*$/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function paragraphs(md) {
  const body = md
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !/^#/.test(p))
    .filter((p) => !/^!\[/.test(p))
    .filter((p) => !/^\*\s\*\s\*$/.test(p))
    .filter((p) => !/^>/.test(p))
    .filter((p) => !/^[-*]\s/.test(p))
    .filter((p) => !/^\d+\.\s/.test(p))
    .filter((p) => !/^\[\^[^\]]+\]:/.test(p));
  return body;
}

function sentences(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  // Split on terminal punctuation followed by space + capital/quote; keep simple.
  const parts = clean.split(/(?<=[.!?]["”’']?)\s+(?=["“‘']?[A-Z0-9])/);
  return parts.map((s) => s.trim()).filter(Boolean);
}

function wordCount(text) {
  const w = text.replace(/[^\p{L}\p{N}'’-]+/gu, ' ').trim();
  return w ? w.split(/\s+/).length : 0;
}

function stddev(nums) {
  if (!nums.length) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const v = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
  return Math.sqrt(v);
}

function countMatches(re, text) {
  re.lastIndex = 0;
  const m = text.match(re);
  return m ? m.length : 0;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateFile(file, ctx) {
  const rel = path.relative(ROOT, file);
  const base = path.basename(file);
  const md = fs.readFileSync(file, 'utf8');
  const errors = [];
  const warnings = [];
  const isNotes = base === '21-notes.md';
  const isFrontOrBack = /^(00|01|19|20|21)-/.test(base);
  const isChapter = /chapter-\d+\.md$/.test(base) || /(introduction|epilogue)\.md$/.test(base);
  const isSuicideChapter = /chapter-05\.md$/.test(base);

  // Legacy terms
  for (const { re, label } of LEGACY_ERRORS) {
    const n = countMatches(re, md);
    if (n) {
      const lines = md.split('\n').map((l, i) => ({ l, i })).filter(({ l }) => { re.lastIndex = 0; return re.test(l); });
      errors.push(`legacy/placeholder term "${label}" appears ${n}× (lines ${lines.map((x) => x.i + 1).join(', ')})`);
    }
  }
  for (const { re, label, allowIn, warnOnly, max } of RESTRICTED) {
    const n = countMatches(re, md);
    if (!n) continue;
    if (allowIn.includes(base)) continue;
    if (warnOnly) {
      if (n > (max ?? 0)) warnings.push(`restricted term "${label}" appears ${n}×`);
      else warnings.push(`restricted term "${label}" appears ${n}× (check each use is historical, not advice)`);
    } else {
      errors.push(`restricted term "${label}" appears ${n}× outside ${allowIn.join(', ')}`);
    }
  }

  // Headings
  const h1s = md.match(/^# .+$/gm) || [];
  const h2s = md.match(/^## .+$/gm) || [];
  const h3s = md.match(/^###+ .+$/gm) || [];
  if (!isNotes) {
    if (h1s.length !== 1) errors.push(`expected exactly one H1, found ${h1s.length}`);
    if (h2s.length > 4 && !isFrontOrBack) warnings.push(`${h2s.length} H2 subheads (prefer ≤4; use scene breaks "* * *" instead)`);
    if (h3s.length) warnings.push(`${h3s.length} H3+ headings (avoid deep heading levels inside chapters)`);
  }

  // Figures
  const figRe = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while ((m = figRe.exec(md))) {
    const [, alt, src] = m;
    const abs = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(abs)) errors.push(`figure not found: ${src}`);
    if (!alt || alt.trim().length < 8) warnings.push(`figure ${src} has a very short or empty caption/alt text`);
    ctx.figureUses.push({ src: path.basename(src), file: rel });
  }

  // Notes references
  const refRe = /\[\^([^\]]+)\](?!:)/g;
  while ((m = refRe.exec(md))) ctx.noteRefs.push({ id: m[1], file: rel });
  const defRe = /^\[\^([^\]]+)\]:/gm;
  while ((m = defRe.exec(md))) ctx.noteDefs.push({ id: m[1], file: rel });

  // Prose stats (skip notes file)
  const stats = {};
  if (!isNotes) {
    const paras = paragraphs(md);
    const text = stripMarkdown(md);
    const sents = sentences(text);
    const words = wordCount(text);
    stats.words = words;
    stats.paragraphs = paras.length;
    stats.sentences = sents.length;
    const sentLens = sents.map(wordCount);
    stats.avgSentence = sents.length ? +(words / sents.length).toFixed(1) : 0;
    stats.sentenceStd = +stddev(sentLens).toFixed(1);

    const oneSentence = paras.filter((p) => sentences(stripMarkdown(p)).length === 1).length;
    const fragments = paras.filter((p) => wordCount(stripMarkdown(p)) < 8).length;
    stats.oneSentenceParagraphRatio = paras.length ? +(oneSentence / paras.length).toFixed(2) : 0;
    stats.fragmentParagraphRatio = paras.length ? +(fragments / paras.length).toFixed(2) : 0;
    if (isChapter && paras.length > 20) {
      if (stats.oneSentenceParagraphRatio > 0.22) warnings.push(`one-sentence paragraphs: ${oneSentence}/${paras.length} (${Math.round(stats.oneSentenceParagraphRatio * 100)}%) — too many; merge into full paragraphs`);
      if (stats.fragmentParagraphRatio > 0.08) warnings.push(`very short paragraphs (<8 words): ${fragments}/${paras.length} — fragments used as rhythm`);
      if (stats.sentenceStd < 6) warnings.push(`low sentence-length variety (std dev ${stats.sentenceStd})`);
    }

    // Repeated openings: 3+ consecutive sentences sharing first word (excluding "I", "The", "It", "A"? no—include all, but require ≥3)
    const firstWords = sents.map((s) => (s.match(/^["“‘']?([A-Za-z']+)/) || [, ''])[1].toLowerCase());
    let run = 1;
    const runs = [];
    for (let i = 1; i < firstWords.length; i++) {
      if (firstWords[i] && firstWords[i] === firstWords[i - 1]) run++;
      else { if (run >= 3) runs.push(`${firstWords[i - 1]} ×${run}`); run = 1; }
    }
    if (run >= 3) runs.push(`${firstWords[firstWords.length - 1]} ×${run}`);
    if (runs.length) warnings.push(`repeated sentence openings in a row: ${runs.join('; ')}`);

    // Two-word opening repetition across the chapter (e.g., "I was" appears 12 times as sentence start)
    const twoWord = {};
    for (const s of sents) {
      const mm = s.match(/^["“‘']?([A-Za-z']+\s+[A-Za-z']+)/);
      if (mm) twoWord[mm[1].toLowerCase()] = (twoWord[mm[1].toLowerCase()] || 0) + 1;
    }
    const heavy = Object.entries(twoWord).filter(([k, v]) => v >= 8 && !/^(i (had|have|am|did|do|went|could|would|think|know|remember)|there (is|are|was|were)|it (is|was)|he (was|had)|she (was|had)|we (were|had)|that (is|was))$/.test(k));
    if (heavy.length) warnings.push(`sentence openings used 8+ times: ${heavy.map(([k, v]) => `"${k}" ×${v}`).join(', ')}`);

    // Tics
    for (const t of TICS) {
      const n = countMatches(t.re, text);
      if (n > t.max) warnings.push(`tic "${t.name}" used ${n}× (max ${t.max})`);
      if (t.bookMax != null) ctx.bookCounts[t.name] = (ctx.bookCounts[t.name] || 0) + n;
    }

    // AI-isms
    const ai = [];
    for (const a of AI_ISMS) {
      const n = countMatches(a.re, text);
      if (n > a.max) ai.push(`${a.re.source.replace(/\\b/g, '').replace(/\(.*?\)/g, '')} ×${n}`);
    }
    if (ai.length) warnings.push(`generic vocabulary: ${ai.join(', ')}`);

    // Em-dashes, questions, italics
    const emDashes = countMatches(/—/g, md);
    stats.emDashes = emDashes;
    if (isChapter && emDashes > 10) warnings.push(`${emDashes} em-dashes (aim ≤10 per chapter)`);
    const questions = sents.filter((s) => /\?["”’']?$/.test(s)).length;
    stats.questions = questions;
    if (isChapter && questions > 10) warnings.push(`${questions} rhetorical/direct questions (aim ≤10)`);
    const italics = countMatches(/(?<!\*)\*[^*\n]{1,80}\*(?!\*)/g, md.replace(/^\*\s\*\s\*$/gm, ''));
    stats.italics = italics;
    if (isChapter && italics > 25) warnings.push(`${italics} italic spans (avoid excessive italics)`);
    const lists = (md.match(/^\s*[-*]\s+\S/gm) || []).length + (md.match(/^\s*\d+\.\s+\S/gm) || []).length;
    stats.listItems = lists;
    if (isChapter && lists > 24) warnings.push(`${lists} list items (prose should carry the argument)`);

    // Safety heuristics for the suicide chapter and anywhere "garage" appears
    if (isSuicideChapter || /parking garage/i.test(text)) {
      const hits = text.match(METHOD_DETAIL) || [];
      if (hits.length) warnings.push(`possible method/location detail near suicide narrative: ${[...new Set(hits.map((h) => h.toLowerCase()))].join(', ')} — review`);
    }

    // Word-count targets
    const t = ctx.targets[base] || TARGETS_DEFAULT;
    if (isChapter) {
      if (words < (t.min ?? 0)) warnings.push(`word count ${words} below target minimum ${t.min}`);
      if (t.max && words > t.max) warnings.push(`word count ${words} above target maximum ${t.max}`);
    }
  }

  return { file: rel, errors, warnings, stats };
}

function main() {
  const book = readBookYml();
  const targets = {};
  if (book) for (const f of book) if (f.min || f.max) targets[path.basename(f.file)] = { min: +f.min || 0, max: +f.max || 0 };

  let files;
  if (fileArgs.length) files = fileArgs.map((f) => path.resolve(ROOT, f));
  else if (book) files = book.map((f) => path.join(ROOT, f.file));
  else files = fs.readdirSync(MANUSCRIPT_DIR).filter((f) => f.endsWith('.md')).sort().map((f) => path.join(MANUSCRIPT_DIR, f));

  const ctx = { figureUses: [], noteRefs: [], noteDefs: [], bookCounts: {}, targets };
  const reports = [];
  for (const f of files) {
    if (!fs.existsSync(f)) { reports.push({ file: path.relative(ROOT, f), errors: ['file missing'], warnings: [], stats: {} }); continue; }
    reports.push(validateFile(f, ctx));
  }

  // Aggregate checks (only meaningful for whole-book runs, but harmless otherwise)
  const aggregate = { errors: [], warnings: [] };
  const wholeBook = !fileArgs.length;
  if (wholeBook) {
    // notes: refs must have defs; defs should be used
    if (fs.existsSync(NOTES_FILE) && !files.includes(NOTES_FILE)) {
      const notesMd = fs.readFileSync(NOTES_FILE, 'utf8');
      let m; const defRe = /^\[\^([^\]]+)\]:/gm;
      while ((m = defRe.exec(notesMd))) ctx.noteDefs.push({ id: m[1], file: 'manuscript/21-notes.md' });
    }
    const defIds = new Set(ctx.noteDefs.map((d) => d.id));
    const refIds = new Set(ctx.noteRefs.map((r) => r.id));
    for (const r of ctx.noteRefs) if (!defIds.has(r.id)) aggregate.errors.push(`endnote [^${r.id}] referenced in ${r.file} has no definition`);
    for (const d of ctx.noteDefs) if (!refIds.has(d.id)) aggregate.warnings.push(`endnote [^${d.id}] defined in ${d.file} is never referenced`);
    const dupDefs = ctx.noteDefs.map((d) => d.id).filter((id, i, a) => a.indexOf(id) !== i);
    if (dupDefs.length) aggregate.errors.push(`duplicate endnote definitions: ${[...new Set(dupDefs)].join(', ')}`);

    // figures used at most once
    const seen = {};
    for (const u of ctx.figureUses) (seen[u.src] ||= []).push(u.file);
    for (const [src, where] of Object.entries(seen)) if (where.length > 1) aggregate.warnings.push(`figure ${src} used ${where.length}× (${where.join(', ')})`);

    // retained figures that are never placed
    const figDir = path.join(ROOT, 'assets', 'figures');
    if (fs.existsSync(figDir)) {
      for (const f of fs.readdirSync(figDir)) if (/\.(png|jpg|svg)$/i.test(f) && !seen[f]) aggregate.warnings.push(`retained figure ${f} is not referenced by any manuscript file`);
    }

    for (const [name, n] of Object.entries(ctx.bookCounts)) {
      const t = TICS.find((x) => x.name === name);
      if (t?.bookMax != null && n > t.bookMax) aggregate.errors.push(`"${name}" appears ${n}× across the book (max ${t.bookMax})`);
    }
  }

  const totalWords = reports.reduce((a, r) => a + (r.stats.words || 0), 0);
  const errorCount = reports.reduce((a, r) => a + r.errors.length, 0) + aggregate.errors.length;
  const warningCount = reports.reduce((a, r) => a + r.warnings.length, 0) + aggregate.warnings.length;

  if (jsonOut) {
    console.log(JSON.stringify({ reports, aggregate, totalWords, errorCount, warningCount }, null, 2));
  } else {
    for (const r of reports) {
      const s = r.stats;
      const line = s.words != null
        ? `${r.file}  —  ${s.words} words, ${s.paragraphs} paras, avg sentence ${s.avgSentence} (sd ${s.sentenceStd}), 1-sent paras ${Math.round((s.oneSentenceParagraphRatio || 0) * 100)}%, em-dashes ${s.emDashes}, questions ${s.questions}`
        : r.file;
      console.log(line);
      for (const e of r.errors) console.log(`   ERROR   ${e}`);
      for (const w of r.warnings) console.log(`   warn    ${w}`);
    }
    if (wholeBook) {
      for (const e of aggregate.errors) console.log(`ERROR   ${e}`);
      for (const w of aggregate.warnings) console.log(`warn    ${w}`);
      console.log(`\nTotal manuscript words (prose, excluding notes): ${totalWords}`);
    }
    console.log(`\n${errorCount} error(s), ${warningCount} warning(s)${strict ? ' [strict]' : ''}`);
  }
  process.exit(errorCount > 0 || (strict && warningCount > 0) ? 1 : 0);
}

main();
