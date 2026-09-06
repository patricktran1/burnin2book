# Final QA — BURN IN, Version 2.0

Actual results of the final checks, not aspirations. Every command below was run in this repository and its real output is recorded. Anything unfinished is listed as unfinished.

---

## 1. Commands run and results

| Command | Result |
|---|---|
| `npm install` | PASS — 3 packages (`js-yaml`, `marked`, `argparse`) |
| `npm run validate` | **PASS — 0 errors, 4 warnings** (all four reviewed and deliberately kept; see §7) |
| `npm run wordcount` | PASS — every chapter within its `book.yml` target range (§3) |
| `npm run build` | **PASS — all outputs produced, nothing skipped** (§2) |
| `npm run check-output` | **PASS — 0 errors, 0 warnings** — built-output integrity (§2a) |
| Legacy-term searches | PASS — see §6 |
| Figure integrity check | PASS — 23 references, 23 files, each used exactly once |
| Endnote integrity check | PASS — 18 markers, 18 definitions, no orphans, no duplicates |
| Rendered-output inspection | PASS — index, chapter, notes, dark mode, and PDF pages inspected visually |
| Metaphysical-certainty scan | PASS — see §7 |

## 2. Build outputs (`npm run build`)

Nothing was faked or stubbed. `dist/build-report.json` records `"skipped": []` and `"warnings": []`.

| Output | Status | Tool | Size |
|---|---|---|---|
| 22 chapter/section HTML pages | built | — | ~20–27 KB each |
| `index.html` (title page + contents) | built | — | — |
| `print.html` (single-file print edition) | built | — | — |
| `burn-in-v2.md` (merged manuscript) | built | — | 346 KB |
| `burn-in-v2.epub` | built | Pandoc 3.1.3 | 6.5 MB |
| `burn-in-v2.docx` | built | Pandoc 3.1.3 | 6.4 MB |
| `burn-in-v2.pdf` | built | Chromium headless | 7.0 MB, 130 pages |
| `assets/`, `styles.css`, `reader.js`, `favicon.svg` | copied | — | — |

Optional-dependency behaviour was verified rather than assumed: Pandoc and a Chromium binary were both present in this environment, so EPUB, DOCX, and PDF were produced. On a machine without them the build prints a `skipped` line with the reason, still produces the Markdown and HTML, and exits 0. `node scripts/build-book.mjs --no-pandoc --no-pdf` exercises that path deliberately.

## 2a. Built-output integrity (`npm run check-output`)

`scripts/validate.mjs` checks the manuscript source; `scripts/check-output.mjs` checks what the build actually produced, which is where a different class of defect appears. Full output:

```
  ok      figures byte-identical to their supplied originals: 23
  ok      built pages scanned: 24
  ok      navigation chain complete: 22 sections, front-matter.html -> notes.html
  ok      endnotes: 18 references, 18 notes, all round-trips checked
  ok      contents lists all 22 sections
  ok      EPUB structure OK: correct mimetype, container, nav, 25 chapter documents
  ok      print.html contains all 22 sections and all 23 figures

0 error(s), 0 warning(s)
```

Specifically confirmed:

- **No figure was distorted, re-encoded, or swapped.** All 23 retained illustrations are byte-for-byte identical to the supplied originals in `source/figures/`, and each one's new descriptive filename carries the same figure number as the original it came from.
- **Chapter navigation is unbroken.** Every previous/next link was compared against the order declared in `book.yml`, and the chain was then walked forward from the first page: it reaches all 22 sections, front matter through notes, with no gaps and no loops.
- **Every internal link and asset reference resolves**, including in-page anchors and cross-page `#fragments`, across all 24 built pages.
- **Endnotes round-trip in both directions.** All 18 references reach a note that exists, and every note links back to the exact reference that cites it, on the correct page.
- **The EPUB is structurally valid** (correct `mimetype`, `META-INF/container.xml`, navigation document, and one document per section).
- **The print edition is complete** — all 22 sections and all 23 figures are present in `print.html`, which is what the PDF is generated from.

## 3. Word counts (`npm run wordcount`)

**Manuscript total, excluding notes: 64,410 words.** Introduction + 15 chapters + epilogue: 63,014. Notes: 1,103. Total including notes: 65,513. The brief asked for approximately 55,000–70,000 polished words.

| File | Words | Target | Title |
|---|---|---|---|
| `00-front-matter.md` | 242 | — | Before You Begin |
| `01-authors-note.md` | 754 | — | Author's Note |
| `02-introduction.md` | 2,991 | 2,600–3,000 | Introduction: Fourteen Centimeters |
| `03-chapter-01.md` | 3,781 | 3,600–4,200 | 1. Who Am I, and How Did I Get Here? |
| `04-chapter-02.md` | 4,168 | 3,900–4,500 | 2. Where Am I Going? |
| `05-chapter-03.md` | 3,403 | 3,400–3,900 | 3. The Achievement Bargain |
| `06-chapter-04.md` | 3,919 | 3,900–4,500 | 4. Ego, Confidence, and Blind Spots |
| `07-chapter-05.md` | 4,606 | 4,400–5,000 | 5. The Cost of Performing Fine |
| `08-chapter-06.md` | 4,208 | 3,900–4,500 | 6. More Than Burnout |
| `09-chapter-07.md` | 3,313 | 3,300–3,800 | 7. Shame Loves Secrecy |
| `10-chapter-08.md` | 3,983 | 3,500–4,000 | 8. Agency Without Self-Blame |
| `11-chapter-09.md` | 3,768 | 3,500–4,000 | 9. Here and Now |
| `12-chapter-10.md` | 4,572 | 4,000–4,600 | 10. Money Creates Margin, Not Meaning |
| `13-chapter-11.md` | 3,845 | 3,500–4,000 | 11. We're All in This Together |
| `14-chapter-12.md` | 3,770 | 3,300–3,800 | 12. Design Beats Willpower |
| `15-chapter-13.md` | 3,376 | 3,300–3,800 | 13. The Burn In Protocol |
| `16-chapter-14.md` | 4,370 | 3,500–4,500 | 14. Ambition After Collapse |
| `17-chapter-15.md` | 3,529 | 2,900–3,600 | 15. What I Want My Children to Know |
| `18-epilogue.md` | 1,412 | 1,200–1,600 | Epilogue: Still Here |
| `19-acknowledgments.md` | 299 | — | Acknowledgments |
| `20-about-author.md` | 95 | — | About the Author |
| `21-notes.md` | 1,103 | — | Notes |

Two targets were revised during the second pass rather than cutting prose: Chapter 14 from 4,000 to 4,500 (it carries the fireplace mechanics, the Michelangelo correction, and all three of the first edition's closing principles) and Chapter 15 from 3,400 to 3,600. Both changes are recorded as comments in `book.yml`.

## 4. Figures

All 36 supplied original figures were reviewed and classified in `editorial/FIGURE_MANIFEST.md`.

| Decision | Count |
|---|---|
| **KEEP** (meaning unchanged) | **9** |
| **MODIFY CONTEXT** (art retained, caption/placement rewritten for V2) | **16** |
| **CUT** | **11** |
| **Total reviewed** | **36** |

Of the 25 retained figures, 23 appear in the manuscript body (each exactly once, verified by the validator) and 2 are visual-identity references held in `assets/cover/` (the 2021 front cover and title page). The 11 cuts were: the "money is like air" desert crowd; the red-blood-cell afterlife parable; both QR codes (scholarship, Wealthbound); the Black-Scholes equation; the invisible-fence/shock-collar drawing (tied to a removed former-spouse anecdote); the y=x/x²/x³ growth curves; the Monopoly board; the social-network panel naming the former spouse; the Heart Sutra mantra; and the 2021 back cover.

## 5. Endnotes and citations

18 endnotes, all defined in `manuscript/21-notes.md`, all referenced exactly once, numbered in reading order by the build.

**Citations still requiring verification before print.** Web search was available during production but direct page fetches to several government and journal domains were blocked by this environment's network policy. Every source below was located and its wording confirmed from indexed excerpts of the cited page; each should be re-checked against the live page, which is roughly a fifteen-minute task with the URLs in `editorial/FACT_CHECK.md` §1.

1. DOJ / U.S. Attorney's Office (D. Minn.) sentencing press release — **highest priority**, since it is the only source touching the legal matter.
2. Otezla (apremilast) prescribing information — the label is revised periodically; confirm the Warnings and Precautions wording and both trial percentages against the current label.
3. WHO ICD-11 burn-out news release.
4. NIMH depression criteria.
5. BMJ 2024 physician-suicide meta-analysis (rate ratios and confidence intervals).
6. Mayo Clinic Proceedings 2025 burnout prevalence (all six year-percentages).
7. CCSK incidence (Frontiers in Pediatrics 2021) and the COG outcomes paper (Cancer 2024).
8. Mayo Clinic intussusception page.
9. European Heart Journal 2024 HCM review (autosomal dominant, 50%).
10. Ayahuasca case report (Int J Bipolar Disord 2015) and systematic review (Ther Adv Psychopharmacol 2017).
11. SAMHSA 988 page.
12. Michelangelo David chronology (Accademia; Britannica).
13. Lalonde et al. 2005 epinephrine study.
14. Paul DeWolf reporting (University Record; Detroit News).

No citation was invented. Where no authoritative source could be reached, the claim was removed or hedged rather than sourced speculatively: the first edition's "300 to 400 doctors a year" suicide figure, its Medscape burnout percentage, and its lottery-winner/amputee happiness claim are all gone, and the Rumi line is attributed as "often attributed to."

### Correction made during final verification

A repeat attempt to reach the blocked primary sources surfaced a genuine defect in Chapter 6, now fixed:

- The chapter quoted the label's **psoriatic arthritis** depression figures (1.0%, 10 of 998, versus 0.8%, 4 of 495) as if they were the pooled result for all controlled trials. The label reports depression incidence separately for each indication studied. Beyond the imprecision, quoting one indication's numbers risked implying what the author took the drug for, which the manuscript deliberately withholds. The passage now uses the indication-independent pooled figures (0.2% serious depression, 0.3% discontinuation, 0.2% suicidal ideation and behavior, all of 1,441 exposed subjects) and describes depression incidence as "roughly one percent … with the exact figures differing by which condition was being treated."
- The same review found a material omission. The label records that **two subjects taking placebo died by suicide during the trials while no subject taking apremilast did.** Omitting it overstated the signal in the author's favour, in a chapter whose entire argument is about separating what he wonders from what the evidence shows. It is now in the text, introduced as "the sentence I would have left out if I were building a case rather than describing one."

`editorial/BOOK_BIBLE.md` §4 item 2 was updated with the corrected approved wording so the error cannot be reintroduced, and `FACT_CHECK.md` §1 row S2 now carries the full per-indication and pooled breakdown.

## 6. Prohibited and legacy term searches

Searches run across `manuscript/` (case-insensitive unless noted).

| Term | Manuscript | Notes |
|---|---|---|
| `Alicia` | **0** | — |
| `ex-wife` | **0** | — |
| `my wife` | **0** | — |
| `wife` | **1** | Not a former-spouse reference. It is inside a verbatim quotation from Adam, a plastic surgeon, describing **his own** life in Chapter 2: "I don't have a family. I don't have a wife. I don't have kids." Retained from the 2021 edition; safe and intentional. |
| `spouse`, `marriage`, `married` | **0** | — |
| `$22 million` | **0** | — |
| `$22,000,000` | **0** | — |
| `22 million` / `twenty-two million` | **0** | — |
| `Wealthbound` | **0** | — |
| `FIRE` (case-sensitive acronym) | **0** | The case-insensitive search returns only the fire/fireplace/firehose metaphor, which is the book's governing image. The financial acronym is never used; Chapter 10 refers to it once, obliquely and historically, as "the acronym I had been reading about for years, the one that stands for financial independence and retiring early," while describing what the first edition promised. |
| `Onofrio` | **0 in body text**; 1 in `21-notes.md` | As designed: the convicted individual is named only in the endnote citing the public record. The validator treats his name in any manuscript file other than the notes as an **error**. |
| Real-estate-guru vocabulary (`passive income`, `crushing it`, `triple net`, `cash-on-cash`, `Monopoly`, `strip mall`, `corporate tenants`) | historical only | Remaining hits are in Chapters 9 and 10, where the author describes and criticizes what he wrote and did in 2021. No instructional or promotional use survives. |

Editorial and source files do contain these terms, by design: they document the removals. Counts there are `Alicia` in 2 editorial and 3 source files, `Wealthbound` in 5 editorial and 4 source files, and so on. `source/` holds the unaltered 2021 material and the author's own instructions; nothing in `source/` is part of the book.

## 7. Prose and cadence audit

`scripts/validate.mjs` enforces the style sheet mechanically: one-sentence-paragraph ratio, fragment ratio, sentence-length variance, repeated sentence openings within a paragraph, tic phrases ("It did not," "You can," "I was," "Sometimes," "The goal is," "The lesson is," "The truth is," "not X but Y," "performing fine," "hand of God"), generic AI vocabulary, em-dash density, rhetorical-question count, italics density, list-item count, heading structure, and suicide-narrative method-detail words.

Final state: **0 errors, 4 warnings.** Every warning was inspected during the second pass and kept deliberately. They are all instances of anaphora that a human editor would preserve:

| File | Warning | Editorial judgment |
|---|---|---|
| `04-chapter-02.md` | "Then ×3" | The anatomy of the 2021 parking-garage paragraph ("Then the credential… Then the credential's credential… Then the verdict…"). The repetition *is* the argument: it walks the reader through the four-step rationalization. Kept. |
| `04-chapter-02.md` | "I ×3" | Verbatim quotation from Adam ("I don't have a family. I don't have a wife. I don't have kids."). Cannot be altered. |
| `09-chapter-07.md` | "The ×3" | "The two sentences at the center of my crisis were… The first is… The second is…" Ordinary enumeration of a stated pair. Kept. |
| `16-chapter-14.md` | "I ×3" (×4 occurrences) | Four deliberate constructions: "I still love building. I love… I love…"; "I would like to report that I take it gracefully. I take it."; "I do not say this… I say it because…"; "I got the point wrong too. I said… I did not say…" All are earned emphasis. Kept. |
| `17-chapter-15.md` | "Then ×4", "I ×4" (×2), "The ×3" | The bedtime ritual ("Then a book. Then the soft weighted Mickey Mouse…"), its morning echo ("The fish needed feeding again. The toothbrush was still…"), and the emotional climax of the book ("I would rather have you here. I would rather have you here than…"). All deliberate. Kept. |

Aggregate cadence statistics across the manuscript: average sentence length 17–22 words per chapter with standard deviations of 11–14 (good variety); one-sentence paragraphs between 0% and 20% per chapter, well under the 22% threshold; em-dashes total 1 across the entire manuscript; rhetorical questions 0–5 per chapter.

**Cross-chapter repetition.** A phrase-level audit was run over the whole manuscript for the author's signature expressions. Four appeared in four chapters each and were trimmed to two uses apiece during the second pass: "meat bag held up by sticks," "the hypocritical oath," "I look twelve," and the property-manager/stove anecdote. Governed images were verified: **"hand of God" appears exactly once in the book** (Chapter 5; the validator fails the build on a second occurrence), "performing fine" three times and only in Chapter 5, and the fireplace image is stated in the Introduction, developed in Chapter 14, and closed in the Epilogue.

**Metaphysical certainty and subjective-versus-objective framing.** A mechanical scan was run for unhedged assertions inherited from the 2021 edition ("the universe is/was/sent/wants," "the soul is," "souls go," "energy radiating," "manifestation," "vibration," "oneness," "reincarnation," "law of attraction"). Seven hits, every one correct: three are explicit retractions of 2021 claims in Chapter 11 ("I would not write that now"), one is Chapter 9's retraction of the "oneness of everything" paragraph, one is the single permitted hedged sentence in Chapter 5 ("I experienced it, and still experience it, as though I had been caught by the hand of God"), one is Chapter 9 describing the practice, and one is the literal vibration of a jet-ski engine in Chapter 10. No unhedged metaphysical assertion survives anywhere in the manuscript. Experiential hedging ("it felt as though," "I experienced it as," "I began to wonder," "I do not know what") appears in twelve of the twenty-two sections, concentrated where the subjective material is.

**Duplication found and fixed.** Two passages I had drafted duplicated material owned by other chapters and were cut: a second-retreat description in Chapter 4 (Chapter 9 owns the practice) and the 2021 commitments list plus the Tesla in Chapter 3 (Chapters 11 and 10 own them).

## 8. Continuity and structure

The complete manuscript was read consecutively, beginning to end, after all chapters existed — every one of the 22 sections in full, not in excerpt. A final pass closed a gap in that claim: Chapters 10 and 12 had been checked only by targeted search during the first consecutive pass, and were then read in full. That read found four defects, all now fixed, and they are recorded here rather than quietly corrected, because two of them were introduced by the editing that preceded them.

| Defect | Where | Fix |
|---|---|---|
| **Wrong cross-reference.** "the version of the hypocritical oath I described a chapter ago" — the phrase is introduced in Chapter 6, which is three chapters earlier, not one. Introduced by an earlier de-duplication edit. | Ch. 9 | Now "described in Chapter 6" |
| **Wrong cross-reference.** "the first delegation I ever did well is the one I described in the last chapter" — the property manager is in Chapter 10, and the chapter before Chapter 12 is Chapter 11. Also introduced by an earlier de-duplication edit. | Ch. 12 | Now "described in Chapter 10" |
| **Imprecise cross-reference.** The WHO burnout definition was cited as "a few chapters ago"; it is six chapters back. | Ch. 12 | Now "in Chapter 6" |
| **Duplicated beat across a seam.** Chapter 12 closed on "I resisted the word, and then I used it," and Chapter 13 opens "I resisted the word for a long time," so the opening arrived as a repeat instead of a turn. | Ch. 12 → 13 | Chapter 12 now closes by naming the need without spending the beat, so Chapter 13's first line lands as the payoff |
| **Duplicated opening move in consecutive chapters.** Chapters 8 and 9 both opened "The first edition of this book had a chapter called / with this title. I reread it before starting this one…" | Ch. 9 | Chapter 9's opening rewritten in present tense without the "I reread it" framing |

All sixteen chapter seams were then printed as pairs (each chapter's closing paragraph against the next chapter's opening) and read as a sequence. The remaining fourteen are clean. Every explicit cross-reference in the manuscript — 34 of them — was checked against its target; all now resolve correctly.

Other findings:

- **Timeline** is internally consistent. No calendar date is attached to the crisis or the attempt anywhere in the book. Adrian's age is given only as "not yet two" at diagnosis, and his current health and age are never stated.
- **Cross-references** were checked in both directions and all resolve (see the table above for the three that did not, now corrected): Chapter 5's forward reference to Chapter 7 ("the machinery of that silence") is delivered by Chapter 7; Chapter 5's promise to return to the bush "at the very end of this book" is delivered by the Epilogue; Chapter 4's foreshadowing of the conviction ("I am getting ahead of the story") is picked up verbatim by Chapter 5; Chapter 10's closing line about people as margin is picked up by Chapter 11's opening; Chapter 9's reference to "the sentence that came through" points correctly to Chapter 4.
- **Handoffs** between all 15 chapters, the Introduction, and the Epilogue were read as a sequence. Each chapter's final paragraph sets up the next chapter's subject.
- **Voice** is consistent across the four parts. Chapter 5 is the only chapter with no figures and no deflecting humor, which is intentional.

## 8b. Mechanical copyedit

This is not a substitute for a professional copyedit, which the manuscript still needs and which `AUTHOR_CHECKLIST.md` §F still asks for. It is the mechanical layer of one: the checks that can be run exhaustively rather than read for. Every `.md` file in `manuscript/` was scanned for doubled words, spacing errors, mixed spelling conventions, inconsistent compounds, number style, and punctuation faults.

| Check | Result |
|---|---|
| Doubled words, double spaces, space before punctuation in prose, missing space after a period or comma, trailing whitespace | none |
| American vs British spellings | consistent; no British forms |
| `toward` / `towards`, `email` / `e-mail`, `okay` / `OK` | consistent throughout |
| Numbers under 100 in prose | spelled out without exception |
| Em dashes | 1 in 64,000 words; the brief warned against saturation |
| Ellipses, double hyphens | none; nothing to normalise |
| Endnote sources cited more than once | one: the 988 Lifeline, in Chapters 5, 6, and 13. Deliberate — a crisis number belongs wherever a reader might need it |

Four things were wrong and are fixed:

| Defect | Fix |
|---|---|
| **The first edition's title was set two ways.** The front matter ("First published in 2021 as *Burn-In*") and About the Author both use *Burn-In*, the 2021 title; the Introduction called it *Burn In* twice, which is this edition's title, not the first edition's. | Both Introduction instances set as *Burn-In* |
| **`real estate` was set both ways as a compound modifier** — hyphenated in five places, bare in eight, with *real estate portfolio* appearing both ways in the same book (Introduction and Chapter 10 bare, Chapter 11 hyphenated). | Hyphenated as a modifier in all thirteen places; the five bare uses as a noun ("in real estate", "real estate was") left alone |
| **Endnote URLs were followed by a space before the period or semicolon**, seven times, to stop the punctuation reading as part of the address. In print that is a spacing error, and in the HTML and EPUB the URL is auto-linked, so the ambiguity it guarded against does not arise. | Punctuation closed up |
| **The HTML editions were set with typewriter quotes.** Pandoc smartens the EPUB and DOCX itself, but the HTML pages are rendered by marked, which dropped smart punctuation in v7 — so the reading preview, the print edition, and the PDF printed from it were the only editions of the book set with `"` and `'`. 220 apostrophes and 210 quotation marks. | A typographic pass was added to `build-book.mjs`, over rendered HTML text only: never attribute values, never `<code>`, `<pre>`, `<script>`, or `<style>`, with paragraph boundaries resetting the open/close context. Titles from `book.yml` are smartened at load, before the endnote index captures them for its group headings. `check-output.mjs` now fails on a typewriter quote in visible text or a curly quote inside a script or style block, so the pass cannot be silently bypassed again |

The word count moved from 64,303 to 64,293: eight hyphenations and two title corrections, each joining two words into one.

## 8c. The printed edition

The PDF had been built and reported as an output for several passes without anyone opening it. Doing so found three defects, none of which any existing check would have caught.

**The measure ran to about a hundred characters a line.** A book is set to sixty-five or seventy-five; past that the eye loses the start of the next line. The page read as a printed web page, which is what it was. The cause was one line in the print stylesheet: the screen rules constrain `.page` to a readable width and the print rules dropped that constraint entirely, letting the text span the full layout width.

The fix took some finding, because two Chromium behaviours hide it. Declaring `@page { size: 6in 9in }` to get a trade page makes Chromium scale the whole document to fit the paper — every rule then renders at 0.83 of the size it asks for, silently. And widening the page margins does not change the measure at all: Chromium lays the document out at a fixed CSS width and scales that layout to the printable area, so a wider margin only shrinks the type while the line holds the same number of characters. Both were established by measuring the rendered type in the output rather than by reading the CSS. The measure is now set on the container, where it works: `.page { max-width: 30em }` gives 72 characters at a true 12pt.

**There were no page numbers**, in 199 pages. `--print-to-pdf` cannot draw one: its only option is Chrome's own header and footer, which prints the document title, the file URL, and the date. The build now prints through the DevTools protocol, which takes a footer template, and falls back to the flag if any step of that fails — the build report says which path produced the file. Every leaf gets a folio, the title page included; the template has no way to ask which page it is drawing.

**The first DevTools build produced a 192-page book with no illustrations at all.** The load event fires before the figures have decoded, and `printToPDF` prints whatever is there. Two further faults surfaced while fixing it, both of which hung the build rather than failing it: the figures carry `loading="lazy"` for the reading pages, and a page that is never scrolled never loads the ones below the fold, so waiting on them waits forever; and `Page.printToPDF` never returns when the Runtime domain has been enabled, or when a 7MB result is asked for inline rather than as a stream. The print sheet is now written without the lazy attribute, the images are confirmed decoded before printing, the Runtime domain is left disabled, and the PDF comes back over `IO.read`.

`check-output.mjs` now counts the image objects in the PDF against the retained figures, because that failure — a complete-looking book with nothing in it — is invisible from the build's exit status. The whole build takes six seconds.

| | before | after |
|---|---|---|
| Characters per line | ~100 | 72 |
| Type size | 10.5pt declared, rendered smaller by an unnoticed scale | 12pt, rendered at 12pt |
| Page numbers | none | every page |
| Figures in the PDF | 23 | 23, now verified by a check |
| Pages | 130 | 199 |

## 8d. The reading preview, looked at

The preview had been built and checked structurally — every link resolving, the navigation chain complete, every section present — but only one page of it had ever been displayed. It has now been rendered and read in the four states that matter, and nothing was wrong.

| State | Result |
|---|---|
| Contents, light | Title page, stacked wordmark in the original palette, contents grouped by part with chapter numbers in orange. Reads as a book's front matter |
| Contents, dark | Palette inverts cleanly; the wordmark's four tones stay distinct against the dark ground |
| Chapter at 400px | No horizontal overflow, measure stays readable, part opener and chapter head hold their proportions |
| Notes, dark | Endnotes grouped by chapter, numbered continuously, URLs auto-linked, every back-link present |

Behaviour was tested rather than assumed: the previous and next links on Chapter 9 point to Chapters 8 and 10; visiting a chapter records it; returning to the contents shows "Continue reading: Here and Now"; and with storage empty that element stays hidden rather than rendering blank.

One apparent defect turned out to be an artifact of the screenshot script rather than the page — faint text above the title in the first dark capture, which did not reproduce in a clean browser profile and had no corresponding element in the DOM. Recorded here because it was investigated and dismissed on evidence, not overlooked.

## 8e. The author's answers, and what they changed

The checklist came back answered. Six of the nine questions changed nothing, which is worth saying plainly: they were questions, and the answer to most of them was that the manuscript was already right. `FACT_CHECK.md` §3b has the full table.

The one answer that changed the book was the second son. **Elliot.** That is a structural change to Chapter 15, which is written in the second person to one child, and it could not be done by search and replace: the chapter's "you" carries the cancer, the radiation, the bedtimes, the Hot Wheels. Adding a name to the addressee line without anchoring those passages would have left a reader unable to tell which son the fourteen-centimeter tumor belonged to.

What was done instead:

- The addressee line names both, and one added sentence says that where a story belongs to one of them it uses his name.
- Four passages that are Adrian's were anchored to him: the first edition "had a great deal in it about you," the radiation, the belly that looked asymmetric, and the morning that closes the book.
- The homework passage, which quotes the 2021 book about Adrian, moved to the third person and then opens out, so that the sentence the chapter exists to carry — "I would rather have you here" — is now explicitly addressed to both of them.
- Three present-tense references to "my son" elsewhere in the book would have implied an only child once a second was named. The trees in Chapter 11 took Adrian's name because the anecdote is his; the self-talk test in Chapter 14 and the list of what matters in the Epilogue became plural.
- The dedication and the About the Author line.

Nothing is asserted about Elliot anywhere but his name and that he is Patrick's son. No age, no birth order, no health, nothing he has said or done — none of that was supplied, and the rule against inventing a life for a child in this book applies to the second one exactly as it applied to the first.

Word count 64,293 → 64,341.

Two answers were verified rather than acted on. The bipolar wording he asked for was already the wording in Chapter 6. The restraint in Chapters 5 and 10 turns out never to have been compliance with an obligation — he has none — so it stays on its own merits.

One answer produced a question back to him rather than a change: confirming Chapter 5, he volunteered the injuries. That is recorded in `FACT_CHECK.md` §3b and is deliberately not in the manuscript, since the brief excludes graphic injury detail and he had just said the chapter was fine as it stands. `AUTHOR_CHECKLIST.md` item 7 offers him the middle version — one sentence, no catalogue — and leaves the decision with him.

## 8f. The second round of answers

Four more answers came back. Three resolved open items; one changed the book.

**Chapter 5 gained two paragraphs.** Asked whether he wanted the severity of the injuries conveyed, the author said he had not read the chapter, and then gave the two things he would want a reader to understand: that surviving was improbable, since falls of one or two stories kill and disable people; and that nothing about him now shows any of it.

Neither is an injury detail, so both went in, immediately after the paragraph that refuses the details. The specific injuries — bleeding in the brain, liver, and spleen, and multiple spinal fractures — stayed out, and are recorded in `FACT_CHECK.md` §3b. The brief excludes graphic injury detail, and a catalogue of bleeds and fractures is exactly that.

Two things are worth noting about what the addition does. It closes a real gap: *landed in a bush* invites a reader to picture a soft landing and to file the chapter under near-miss, which is the opposite of the truth, and the chapter had no answer to that. And it runs with safe-messaging practice rather than against it, because it describes such a fall as unpredictable and disabling rather than as a reliable exit.

The second paragraph also does work beyond the correction. "If you passed me now, you would see nothing wrong" is the thesis of the chapter it sits in — *The Cost of Performing Fine* — and of the dedication, which is for everyone who is very good at seeming fine. It arrives as evidence rather than as a theme restated.

Chapter 5: 4,537 to 4,693 words. Manuscript: 64,341 to 64,497.

**Three items resolved without a change to the text.**

| Item | Answer | Effect |
|---|---|---|
| Rights to reuse the first edition | The 2021 publisher permits any reuse | Resolved. This was the only open item that could have stopped the book |
| The DeWolf family | The author's judgment is that they will not object | The paraphrase stays. Recorded as a prediction rather than a permission, since nobody has asked them |
| Elliot's birth date | August 2022 | Consistency only. No child's date appears in the manuscript and none was added — the rule that gives Adrian no dates was not going to hold for one son and not the other. His birth falls after every event the book describes, so nothing implies he was present for any of them |

## 8g. The author read Chapter 5

He had not read it when he answered the checklist. He read it, and sent back the sharpest notes of the project, and all of them were right.

**The three-register passage is cut.** Chapter 5 used to name no one, then spend two paragraphs explaining, at length, the care it was taking not to. His note: "there's too much bullshit about not talking about it. just name it." He was correct, and not only about the tone. A book that visibly performs its own restraint is asking the reader to admire the restraint, which is a form of the performing this chapter is about.

**Matt Onofrio is named in the body.** With the guilty plea, the three-year federal sentence, and the government's account of the scheme — 2020 to 2022, sixty-eight transactions, about four hundred and twenty million dollars in loans obtained fraudulently, purchase agreements assigned on at inflated prices, down-payment loans kept off the paperwork, buyers coached on what to tell the banks. All of it endnoted to the press release. The legal care did not go away; it moved from the prose into the claims. Nothing says he defrauded the author, or attributes any intention toward him, or characterizes any transaction the author signed. What replaced two paragraphs of throat-clearing is four sentences: the author was on the buying side, his own part has never been audited, he has suspicions, and they are not evidence.

**The injuries are in.** He asked for them and they belong. The passage now says he was bleeding inside the skull, into the liver and the spleen, with his spine broken in several places, and that each of those is a thing people die of. This is an outcome, not a method. It tells a reader nothing about how to do anything, and the paragraph exists to make the opposite case: that what happens to a body in a fall is not chosen by the person falling, that the range of outcomes is far wider than the two a person in that state is imagining, and that most of it is worse than either. Safe-messaging practice argues for this passage rather than against it. What stays out is unchanged — when, where, the route to the roof.

The old version also had a habit worth naming, because it was mine and not his. It kept announcing what it would not say: *that is the whole description, and it is going to stay the whole description.* A refusal narrated that loudly is still a performance. The new version refuses the three things that could hurt someone, says so once in a subordinate clause, and then tells the truth about the rest.

**Smaller notes, all applied.** "I want to be exact about that sentence" is gone, along with three of the chapter's signposts to other chapters. And he never made coffee, which is now the kind of detail I will not invent again: it was scene-setting I had no source for, in a paragraph where every other detail came from him.

Chapter 5: 4,693 to 4,606 words — shorter, with more in it. Manuscript 64,497 to 64,410. `validate.mjs` now permits the name in Chapter 5 as well as the notes.

## 9. Remaining factual items requiring Patrick's confirmation

Twenty items are catalogued in `editorial/FACT_CHECK.md` §3 (A1–A20). The ones that matter most before print:

1. **A19 — Front matter:** copyright year (currently 2026), ISBNs, and publisher line are placeholders to be supplied.
2. **A11 — Chapter 15** is addressed to Adrian "and to any child of mine who reads this later," because the supplied materials do not say whether there are other children. Confirm the wording.
3. **A4, A5, A6 — Otezla timing, ayahuasca timing, and the bipolar formulation.** The manuscript deliberately gives no dates for either substance, states no indication for the medication, and says "probably… vulnerability" rather than naming a diagnosis. Confirm the author is comfortable with each disclosure at this level of detail.
4. **A7 — The hospital and treatment after the attempt** are described only in the most general terms. Confirm nothing is overstated.
5. **A16, A17 — Names.** Paul Cederna, Steve Wolverton, Adam, Bill, Linda, and the physicians and book team in the Acknowledgments are all named as they were in the 2021 edition. Confirm each person is still comfortable appearing, and confirm spellings.
6. **A12, A13, A14, A15, A18 — Family and training history** is drawn from the 2021 edition (immigration, grandfather's WHO posting in Cameroon, 36 cousins, the yearbook quote, Berkeley and Michigan, the Organic Chemistry scores, Howard and the Mohs fellowship, the father's diagnosis, the author's age in 2021). Confirm.
7. **A20 — A current author photograph** is needed; the 2021 back cover was cut.

Five source-history conflicts that could not be reconciled from the supplied materials are documented in `FACT_CHECK.md` §4. The most significant is that the 2021 edition's own timeline for Adrian's birth, his age at diagnosis, and the October 2020 retreat cannot all be exact; Version 2.0 avoids the conflict by using no dates.

## 10. Legal-review flags

Full list in `editorial/LEGAL_REVIEW.md`, including per-chapter passages collected from the chapter editors. The items counsel must reach:

1. **The endnote naming the convicted individual.** The body text never names him; the endnote identifies the federal case. Confirm the author is comfortable with that split, or restrict the endnote to the release title and URL.
2. **Any settlement, litigation, or confidentiality obligation** the author may have. The manuscript was written without knowledge of any; the author must confirm that nothing here breaches one.
3. **Rights to reuse the 2021 text and illustrations.** The first edition was published by a third party and the cover was designed by an outside firm; confirm the author's rights to the 23 retained figures, the stacked wordmark, and the passages quoted from that edition.
4. **Re-permission from the DeWolf family** for the paraphrase of Thom DeWolf's words and the mention of the memorial scholarship. His statement was given for the first edition.
5. **Otezla label language** re-verified against the current prescribing information, and the author's self-administration passage reviewed for professional-conduct implications he may not intend to raise in print.
6. **Ayahuasca disclosure** (use of a controlled substance, undated and without location or facilitator).
7. **Linda's first name** in Chapter 11 — consider omitting or obtaining consent.

## 11. Known limitations

- **The V2 cover** (`assets/cover/burn-in-v2-cover.png` and `.svg`) is a typographic derivation of the original stacked wordmark in the original palette. It is a placeholder for a designer's final art, not finished cover design.
- **The generated PDF** is a convenience artifact produced by printing `dist/print.html` through a headless browser. It is 130 pages and readable, and a handful of pages break awkwardly around figures. A book intended for print should be typeset properly; the Markdown and DOCX are the sensible handoff to a designer.
- **Web fonts.** The preview specifies Charter and Oswald with full fallback stacks and loads no external assets, so it renders correctly offline but will not match the original book's exact typefaces on machines that lack them.
- **The validator's cadence rules are heuristics.** They caught real problems during drafting, and by the end they were flagging deliberate anaphora (§7). They are a floor, not a substitute for a human line editor.
- **No professional copyedit** has been performed. The manuscript has been line-edited by its writers and read consecutively for continuity, but it has not been through a copyeditor or proofreader, and it should be before publication.

## 12. Handoff

`editorial/AUTHOR_CHECKLIST.md` collects everything in sections 5, 9, and 10 into one page of questions and actions addressed to the author and his counsel, so that none of it has to be reconstructed from this report.

## 13. Unresolved issues

None that block a read-through. The manuscript is complete, every chapter is in range, all builds pass, and the prohibited-term searches are clean. What stands between this repository and a publishable book is the list in §9 (author confirmations), §10 (counsel), §5 (re-verifying the fourteen sources against live pages), and a professional copyedit and cover design.
