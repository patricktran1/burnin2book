# BURN IN, Version 2.0

The manuscript, editorial audit trail, and build system for **BURN IN: Building a Life You Can Stay In**, the substantially rewritten second edition of Patrick Tran's 2021 book *Burn-In*.

The Markdown files in `manuscript/` are the source of truth. Everything else is either input (`source/`), retained art (`assets/`), editorial record (`editorial/`), or tooling (`scripts/`, `preview/`).

## Repository layout

```
README.md
book.yml                 chapter order, titles, parts, word-count targets
package.json             npm scripts (build, preview, validate, wordcount)
vercel.json              static deployment of dist/

manuscript/              the book, one Markdown file per section
  00-front-matter.md     copyright, dedication, note to the reader
  01-authors-note.md
  02-introduction.md
  03-chapter-01.md … 17-chapter-15.md
  18-epilogue.md
  19-acknowledgments.md
  20-about-author.md
  21-notes.md            endnote definitions ([^id]: …), grouped by chapter

assets/
  figures/               the 23 original illustrations retained in the body (stable descriptive names)
  cover/                 2021 cover and title page (identity reference) and the V2 typographic cover

editorial/
  BOOK_BIBLE.md          structure, chapter briefs, style sheet, facts, legal language, verified sources
  EDITORIAL_DECISIONS.md major decisions and why
  FIGURE_MANIFEST.md     all 36 original figures: KEEP / MODIFY CONTEXT / CUT, with rationale
  FACT_CHECK.md          every checkable claim with a label
  LEGAL_REVIEW.md        passages for publishing-law review
  CUT_MATERIAL.md        what was removed from the 2021 edition and why
  CHANGELOG_V2.md        edition-to-edition changes
  FINAL_QA.md            actual results of the final checks
  AUTHOR_CHECKLIST.md    the decisions, confirmations, and permissions still owed

source/                  canonical inputs: the 2021 print PDF, its extracted text, the 36 extracted figures,
                         the contact sheet, author-confirmed facts, the V2 introduction reference, the prompts

scripts/
  build-book.mjs         merged Markdown, reading preview, print HTML, optional EPUB/DOCX/PDF
  validate.mjs           legacy-term, structure, figure, endnote, and prose-cadence checks
  word-count.mjs         per-file and total word counts against targets
  serve.mjs              tiny static server for dist/

preview/                 stylesheet, reader script, favicon, EPUB stylesheet for the generated pages
dist/                    generated output (git-ignored except its README)
```

## Build

Requires Node 18 or newer.

```
npm install
npm run validate     # checks the manuscript source; exits non-zero on errors
npm run wordcount    # per-file counts and totals against book.yml targets
npm run build        # writes dist/
npm run check-output # checks the built output in dist/
npm run check        # validate + wordcount + build + check-output
npm run preview      # build, then serve dist/ at http://localhost:4173
```

`npm run build` always produces:

- `dist/burn-in-v2.md` — the merged manuscript (Pandoc-flavoured Markdown; endnotes as footnotes)
- `dist/index.html` plus one page per section — the reading preview (title page, contents, chapter navigation, figures, notes, progress hairline, keyboard navigation, responsive layout, dark mode, print stylesheet)
- `dist/print.html` — print-friendly single-file HTML; open it in a browser and print to PDF if no PDF engine is installed
- `dist/build-report.json` — what was built, what was skipped, and why

### Optional outputs (never faked)

- **EPUB and DOCX** are generated only if [Pandoc](https://pandoc.org/installing.html) is on your `PATH` (`pandoc --version`). Without it the build prints a `skipped` line and continues. Pandoc 3.x is recommended (`--split-level` is used; on older Pandoc the EPUB step reports the failure and the rest of the build still succeeds).
- **PDF** is generated only if a reliable engine is found: Chromium/Chrome headless (also detected under Playwright's `PLAYWRIGHT_BROWSERS_PATH` or `CHROME_PATH`), `wkhtmltopdf`, or `weasyprint`. Otherwise the build says so and points you to `dist/print.html`.

Flags: `node scripts/build-book.mjs --no-pandoc --no-pdf` skips the optional steps deliberately.

## Manuscript conventions

- One `#` heading per file (the title); `##` subheads sparingly; `* * *` for scene breaks.
- Figures: `![Caption sentence.](../assets/figures/fig-NN-name.png)` on its own line. The caption is the alt text. Each retained figure appears once.
- Endnotes: `[^c05-1]` in the text; `[^c05-1]: source` in `manuscript/21-notes.md`. The build numbers them in reading order; Pandoc renders them as footnotes.
- `npm run check-output` runs after a build and checks what was actually produced: that every retained figure is byte-identical to its supplied original (nothing re-encoded or swapped), that the previous/next chain reaches every section in `book.yml` order with no gaps or loops, that every internal link, asset, and `#fragment` resolves, that all endnotes round-trip in both directions, that no typewriter quote survives in visible text (and no curly quote has been introduced into a script or style block), that the EPUB is structurally valid, and that the print edition contains every section and figure.
- `npm run validate` fails on legacy terms that must not appear in the manuscript (former-spouse references, `$22 million`, `Wealthbound`, placeholders), missing figures, unresolved endnotes, and structural errors; it warns on prose-cadence patterns (one-sentence-paragraph runs, repeated openings, tic phrases, em-dash density, generic vocabulary) and on `FIRE` outside historical use.

## Deploying the preview

The repository is Vercel-ready: `vercel.json` runs `npm run build` and serves `dist/` as a static site with clean URLs. Any static host that can run `npm run build` will work; the output has no server-side dependencies.

## Status

The manuscript is complete: front matter, Author's Note, Introduction, fifteen chapters in four parts, Epilogue, Acknowledgments, About the Author, and Notes — **64,293 words** excluding endnotes. `npm run validate` passes with 0 errors, and `npm run build` produces every output including EPUB, DOCX, and PDF. `editorial/FINAL_QA.md` records the actual results, the four deliberately-kept cadence warnings, the fourteen citations to re-verify against live pages, the twenty items needing the author's confirmation, and the legal-review flags.

## Editorial record

If you are the author picking this up, start with `editorial/AUTHOR_CHECKLIST.md` — one page of the decisions, confirmations, and permissions that only you can supply. For how the rewrite was made, start with `editorial/BOOK_BIBLE.md`, then `editorial/EDITORIAL_DECISIONS.md`. `editorial/FINAL_QA.md` records the actual results of the final validation, word counts, figure totals, legacy-term searches, and open items requiring the author's confirmation or counsel's review.
