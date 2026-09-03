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
| Legacy-term searches | PASS — see §6 |
| Figure integrity check | PASS — 23 references, 23 files, each used exactly once |
| Endnote integrity check | PASS — 18 markers, 18 definitions, no orphans, no duplicates |
| Rendered-output inspection | PASS — index, chapter, notes, dark mode, and PDF pages inspected visually |

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

## 3. Word counts (`npm run wordcount`)

**Manuscript total, excluding notes: 64,198 words.** Introduction + 15 chapters + epilogue: 62,808. Notes: 977. Total including notes: 65,175. The brief asked for approximately 55,000–70,000 polished words.

| File | Words | Target | Title |
|---|---|---|---|
| `00-front-matter.md` | 242 | — | Before You Begin |
| `01-authors-note.md` | 754 | — | Author's Note |
| `02-introduction.md` | 2,995 | 2,600–3,000 | Introduction: Fourteen Centimeters |
| `03-chapter-01.md` | 3,781 | 3,600–4,200 | 1. Who Am I, and How Did I Get Here? |
| `04-chapter-02.md` | 4,168 | 3,900–4,500 | 2. Where Am I Going? |
| `05-chapter-03.md` | 3,403 | 3,400–3,900 | 3. The Achievement Bargain |
| `06-chapter-04.md` | 3,920 | 3,900–4,500 | 4. Ego, Confidence, and Blind Spots |
| `07-chapter-05.md` | 4,537 | 4,400–5,000 | 5. The Cost of Performing Fine |
| `08-chapter-06.md` | 4,107 | 3,900–4,500 | 6. More Than Burnout |
| `09-chapter-07.md` | 3,313 | 3,300–3,800 | 7. Shame Loves Secrecy |
| `10-chapter-08.md` | 3,983 | 3,500–4,000 | 8. Agency Without Self-Blame |
| `11-chapter-09.md` | 3,776 | 3,500–4,000 | 9. Here and Now |
| `12-chapter-10.md` | 4,576 | 4,000–4,600 | 10. Money Creates Margin, Not Meaning |
| `13-chapter-11.md` | 3,846 | 3,500–4,000 | 11. We're All in This Together |
| `14-chapter-12.md` | 3,758 | 3,300–3,800 | 12. Design Beats Willpower |
| `15-chapter-13.md` | 3,377 | 3,300–3,800 | 13. The Burn In Protocol |
| `16-chapter-14.md` | 4,368 | 3,500–4,500 | 14. Ambition After Collapse |
| `17-chapter-15.md` | 3,488 | 2,900–3,600 | 15. What I Want My Children to Know |
| `18-epilogue.md` | 1,412 | 1,200–1,600 | Epilogue: Still Here |
| `19-acknowledgments.md` | 299 | — | Acknowledgments |
| `20-about-author.md` | 95 | — | About the Author |
| `21-notes.md` | 977 | — | Notes |

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

**Duplication found and fixed.** Two passages I had drafted duplicated material owned by other chapters and were cut: a second-retreat description in Chapter 4 (Chapter 9 owns the practice) and the 2021 commitments list plus the Tesla in Chapter 3 (Chapters 11 and 10 own them).

## 8. Continuity and structure

The complete manuscript was read consecutively, beginning to end, after all chapters existed. Findings:

- **Timeline** is internally consistent. No calendar date is attached to the crisis or the attempt anywhere in the book. Adrian's age is given only as "not yet two" at diagnosis, and his current health and age are never stated.
- **Cross-references** were checked in both directions and all resolve: Chapter 5's forward reference to Chapter 7 ("the machinery of that silence") is delivered by Chapter 7; Chapter 5's promise to return to the bush "at the very end of this book" is delivered by the Epilogue; Chapter 4's foreshadowing of the conviction ("I am getting ahead of the story") is picked up verbatim by Chapter 5; Chapter 10's closing line about people as margin is picked up by Chapter 11's opening; Chapter 9's reference to "the sentence that came through" points correctly to Chapter 4.
- **Handoffs** between all 15 chapters, the Introduction, and the Epilogue were read as a sequence. Each chapter's final paragraph sets up the next chapter's subject.
- **Voice** is consistent across the four parts. Chapter 5 is the only chapter with no figures and no deflecting humor, which is intentional.

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

## 12. Unresolved issues

None that block a read-through. The manuscript is complete, every chapter is in range, all builds pass, and the prohibited-term searches are clean. What stands between this repository and a publishable book is the list in §9 (author confirmations), §10 (counsel), §5 (re-verifying the fourteen sources against live pages), and a professional copyedit and cover design.
