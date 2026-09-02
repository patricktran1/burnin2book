#!/usr/bin/env node
/**
 * word-count.mjs — per-file and total word counts for the manuscript, with targets from book.yml.
 * Usage: node scripts/word-count.mjs [--json]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsonOut = process.argv.includes('--json');
const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));

function wordCount(md) {
  const text = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[*_>#`]/g, '')
    .replace(/<[^>]+>/g, '');
  const w = text.replace(/[^\p{L}\p{N}'’-]+/gu, ' ').trim();
  return w ? w.split(/\s+/).length : 0;
}

const rows = book.contents.map((e) => {
  const abs = path.join(ROOT, e.file);
  const exists = fs.existsSync(abs);
  const md = exists ? fs.readFileSync(abs, 'utf8') : '';
  const words = wordCount(md);
  let status = '';
  if (!exists) status = 'MISSING';
  else if (e.min && words < e.min) status = `below min ${e.min}`;
  else if (e.max && words > e.max) status = `above max ${e.max}`;
  else if (e.min || e.max) status = 'in range';
  return { file: e.file, kind: e.kind, title: e.kind === 'chapter' ? `Chapter ${e.number}: ${e.title}` : e.title, words, min: e.min || null, max: e.max || null, status };
});

const total = rows.reduce((a, r) => a + r.words, 0);
const notes = rows.filter((r) => r.kind === 'notes').reduce((a, r) => a + r.words, 0);
const chapters = rows.filter((r) => ['chapter', 'introduction', 'epilogue'].includes(r.kind)).reduce((a, r) => a + r.words, 0);
const summary = { totalIncludingNotes: total, manuscriptExcludingNotes: total - notes, introductionChaptersEpilogue: chapters, notes };

if (jsonOut) {
  console.log(JSON.stringify({ rows, summary }, null, 2));
} else {
  const pad = (s, n) => String(s).padEnd(n);
  console.log(pad('File', 30) + pad('Words', 8) + pad('Target', 14) + 'Title');
  for (const r of rows) console.log(pad(r.file.replace('manuscript/', ''), 30) + pad(r.words, 8) + pad(r.min ? `${r.min}–${r.max}` : '', 14) + `${r.title}${r.status && r.status !== 'in range' ? `   [${r.status}]` : ''}`);
  console.log('');
  console.log(`Introduction + chapters + epilogue: ${chapters}`);
  console.log(`Manuscript excluding notes:         ${total - notes}`);
  console.log(`Notes:                              ${notes}`);
  console.log(`Total including notes:              ${total}`);
}
