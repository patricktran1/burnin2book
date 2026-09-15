# Publication Handoff — BURN IN, Version 2.0

One page. Every task that stands between this repository and a publishable book, who owns it, and the specific thing that closes it.

**Two categories were closed by author decision rather than by evidence, and are marked as such:** naming consents (§A) and the DeWolf family paraphrase (C4). Neither is represented as cleared or permitted. Factual verification (§B) is unaffected by those decisions and keeps its real statuses.

**State of the book.** The manuscript is complete and frozen: 62,317 words excluding notes, 22 sections, 18 endnotes, 23 figures. Developmental and register editing closed at `4937da5`; every change since is a factual correction traceable to source verification. `npm run validate` reports 0 errors and 5 reviewed warnings, `npm run check-output` reports 0 errors and 0 warnings, and all outputs build (HTML, Markdown, EPUB, DOCX, and a 202-page PDF). Nothing below blocks a read-through.

**Source verification is open.** Twelve of fourteen citations have been checked against real documents by independent reviewers; four items remain, listed in §B. No source in this book was opened from the build environment — every primary host is refused at its network gateway — so the remaining items need someone with ordinary library and court-record access.

---

## A. Naming consents — closed by author decision

**Author elects to proceed without requesting consent.** Recorded 15 September 2026 as the author's decision, on his stated view that consent is not required here.

**Consent has not been obtained and is not represented as obtained anywhere in this repository.** Nothing was sent to anyone. The five people below — Paul Cederna, Steve Wolverton, Adam, Bill and Linda — are named in the manuscript as they were in the 2021 edition, and none has been contacted about this edition. This is a decision, not a clearance, and it is recorded so that a later reader of these files cannot mistake one for the other.

Drafted messages remain in `CONSENT_REQUESTS.md`. They are **unused and unsent**, retained only in case the author reverses this decision. They are not a pending task and no owner is assigned to them.

## B. Source verification — owner: Patrick, or a researcher acting for him

Two different kinds of gap. They are not interchangeable, and an access limit is not a doubt about a number.

What closes an item depends on the claim. A **legal disposition** requires the primary court record; news coverage is never sole authority for one. **Other factual details** require directly inspected, reliable supporting evidence, which a court record can supply but so can other primary or contemporaneous sources. A **figure verified in its source's own abstract** is closed for the claim as written, and further reading is optional unless a manuscript claim comes to depend on material outside it.

| # | Item | Kind | Status | What closes it |
|---|---|---|---|---|
| B1 | **S5 — physician suicide, pooled estimates** (Ch. 2) | — | **Verified** from the original abstract. No action | — |
| B2 | **S5 — the 24% ten-most-recent-studies figure** (Ch. 2) | Claim-level gap | **Corroborated by the authors' institution, not abstract-verified.** The paper's own definition of that subgroup is unread | The full text of Zimmermann et al., *BMJ* 2024;386:e078964 — read how the paper defines and frames the ten-most-recent-studies subgroup |
| B3 | **S6 — burnout prevalence** (Ch. 3) | **Closed for the claim as written** | All six percentages are **verified** from the original abstract. The manuscript asserts nothing beyond them | **Nothing.** Reading the full *Mayo Clinic Proceedings* 2025 article is **optional**, and becomes necessary only if a manuscript claim comes to depend on material outside the abstract. It does not today. Independent of B2 |
| B4 | **S14 — Jones's final disposition** (Ch. 11) | Provisional attribution | Two of three dispositions rest on complete appellate opinions. The third rests on an AP report of a guilty plea; a federal opinion confirms only that an earlier plea was withdrawn | **The primary court record.** This is a legal disposition, and the standard applied throughout this book is that news coverage is never sole authority for one — the other two dispositions were held to it and rest on complete opinions. Nothing short of the record closes this. **It is the one open item where a sentence in the book — "three men were later convicted or pleaded guilty" — is not yet fully sourced** |
| B5 | **S14 — 24 July 2013 discovery date and the PlayStation 3** | Provisional attribution | **Unresolved. No additional evidence obtained.** Both rest on news reporting alone; the appellate opinions name no brand and date the burglary to the night of 23 July | **Directly inspected, reliable supporting evidence** — read, not retrieved in summary. A court record is one route but is **not required**: a charging document, a police or medical examiner's record, or a contemporaneous account from a source with direct knowledge would each do. Provisional until such evidence is obtained and inspected. The body text names neither, so nothing in the book is exposed; the endnote carries both, and the manuscript's silence does not establish them |

## C. Legal and permissions — owner: Patrick

| # | Item | Status | What closes it |
|---|---|---|---|
| C1 | **Publishing attorney** | **Declined.** Recorded in `LEGAL_REVIEW.md` §0 | Nothing. Your decision, on the record |
| C2 | **Rights to reuse the first edition** | **Granted** — the 2021 publisher permits any reuse | Nothing. This was the only item that could have stopped the book |
| C3 | **Obligations constraining the account** | **None** — no settlement, litigation, lender, or confidentiality agreement | Nothing |
| C4 | **The DeWolf family paraphrase** | **Closed by author decision.** The author elects not to contact the family. The paraphrase stands on his judgment that they will not object | **Nothing pending.** No outreach is planned and none is a task. Permission has not been sought and is not recorded as obtained; if the family is ever contacted and affirmatively grants permission, that response — not the sending of a note — would be what changes this row |
| C5 | **Naming Matt Onofrio** | Named in Chapter 5 with the plea, the sentence, and the scale of the scheme, all endnoted to the government's own account | Nothing outstanding |

## D. Front matter and production — owner: Patrick, then a designer

| # | Item | Status | What closes it |
|---|---|---|---|
| D1 | **Copyright year, ISBNs, publisher line** | Placeholders — copyright currently reads 2026 | The real values |
| D2 | **Cover** | `assets/cover/burn-in-v2-cover.png` is a typographic derivation of the original wordmark in the original palette — a placeholder | A designer's finished art |
| D3 | **Author photo** | Missing; the 2021 back cover was cut | A current photograph |
| D4 | **Copyedit** | Mechanical layer done (spelling, compounds, number style, spacing, doubled words, punctuation, typographic quotes — findings in `FINAL_QA.md` §8b). No professional pass | A human copyeditor, then a proofreader |
| D5 | **Typesetting** | `dist/burn-in-v2.pdf` is readable — 202 pages, ~72 characters to the line, page numbers — but printed from HTML, not typeset | A designer working from `dist/burn-in-v2.docx` or `dist/burn-in-v2.md` |
| D6 | **Read it aloud** | Not done | You. It is still the fastest way to find a sentence that sounds like someone else wrote it |

## E. Personal-history confirmations — owner: Patrick

Catalogued as A1–A20 in `FACT_CHECK.md` §3. Drawn from the 2021 edition and your fact sheet; none is asserted beyond what the sources support, but each wants your eye before print. The ones that matter most:

| # | Item | What closes it |
|---|---|---|
| E1 | **Otezla timing, ayahuasca timing, the bipolar formulation** (A4, A5, A6) | Your confirmation that you are comfortable with each disclosure at this level of detail. The manuscript gives no dates for either substance, states no indication for the medication, and says "vulnerability" rather than naming a diagnosis |
| E2 | **Hospital and treatment after the attempt** (A7) | Your confirmation that nothing is overstated. Described only in general terms |
| E3 | **Family and training history** (A12–A15, A18) | Your confirmation. Immigration, the grandfather's WHO posting, 36 cousins, the yearbook quote, Berkeley and Michigan, the Organic Chemistry scores, Howard, the Mohs fellowship, your father's diagnosis, your age in 2021 |
| E4 | **Your age in the summer of 2021** | Thirty-two is consistent with a 1988 birth and a birthday later in the year. Confirm if the sentence is to stay |

**Closed, for the record:** Elliot named throughout and the dedication set; no child's birth date anywhere in the book; the Michelangelo account settled on the conservative reading; S1 and S2 verified against full documents.
