# Legal Review — BURN IN, Version 2.0

Passages and decisions that should receive publishing-law review before publication, and the posture the manuscript takes. This is an editorial flag list, not legal advice. Chapter-specific passages flagged by the chapter editors are collected in Section 6.

## 1. Posture

- **No identifiable living person is accused of anything beyond the public record.** The only allegation-adjacent material concerns a person convicted of bank fraud in federal court; the manuscript states only what the U.S. Attorney's Office press release states, and only in the endnote.
- **The former spouse does not appear** in any form: no name, description, characterization, diagnosis, or relationship anecdote. Reviewers should confirm that no passage implies a second parent's conduct or character.
- **Medical, pharmaceutical, and scientific claims** are limited to the sources listed in `BOOK_BIBLE.md` Section 4 and are labeled in `FACT_CHECK.md`. Drug-label language is quoted or closely paraphrased from the prescribing information. Causation is never asserted for Otezla (apremilast) or ayahuasca.
- **The suicide narrative** contains no method, location, timing, access, or injury detail beyond "the roof of an eight-story parking garage," "jumped," "landed in a bush rather than on the concrete," and "a hospital." It follows safe-messaging norms (no romanticizing, no instruction, resources given).
- **Third parties** are named only where they were named in the 2021 edition in neutral or favorable contexts, or are public figures discussed on the public record.

## 2. The bank-fraud matter (Chapters 4, 5, 10; Author's Note; Introduction)

**What the manuscript says in body text:** "Several of the commercial real-estate transactions I had entered were connected to a person I had trusted. That person was later convicted of bank fraud in federal court and sentenced to prison." Variants in the Introduction and Author's Note say the same thing in fewer words. The person is not named in body text; there is no description of him, his motives, or his conduct toward the author.

**What the endnote says:** cites the U.S. Attorney's Office, District of Minnesota press release ("Architect of massive $420 million bank fraud scheme sentenced to 3 years in prison," December 2025) and the IRS Criminal Investigation mirror, and summarizes the public facts: name as it appears in the release, 36-month sentence, restitution ordered, the scheme as described by prosecutors (purchase agreements assigned to novice investors at inflated prices; investors coached to give false information to lenders; hidden down-payment loans), and the guilty plea.

**Author's own exposure:** stated only as belief ("I believed I could be facing nearly ten million dollars in personal exposure"), never as debt. The manuscript explicitly separates (1) what the author feared, (2) what the public record established about the other person, and (3) what remains unknown and unaudited, and states that the author will not narrate the resolution of his own legal and financial matters.

**Review items:**
1. **Naming in the endnote.** The body text never names the convicted individual; the endnote necessarily identifies the case. Counsel and author should confirm they are comfortable with the endnote identifying the case by its public title and the defendant's name as it appears in the federal press release, or whether the endnote should cite the release by title and URL only.
2. **No implication about the author's transactions.** The press release describes a scheme in which investors were coached to provide false information to banks. The manuscript must not be read as admitting that the author did so, nor as claiming he did not. Reviewers should check Chapters 5 and 10 for any sentence that could be read either way and confirm the author is comfortable with the ambiguity as written.
3. **Any settlement, litigation, lender, or confidentiality obligations** the author has that could constrain what may be said, even in general terms. The manuscript was written without knowledge of any such obligations; the author must confirm none is breached by the sentences above.
4. **The 2021 edition** praised the same individual by name in a blurb and in acknowledgments. Those are removed. Counsel may want to consider whether anything in the first edition's continued availability interacts with the new edition.
5. **Do not add** "defrauded," "stole," "victim," "every deal," "he set out to," or any motive language during later edits. The validator flags the name in body text as an error.

## 3. The former spouse

- Removed entirely per the author's instruction. No name, no role, no anecdote, no "my wife," "my ex," "Adrian's mother," or "we" that implies a spouse in a scene.
- Adrian's diagnosis is told from the author's perspective using author-approved framing.
- Figure 33 (which contained the former spouse's name) and the back cover (which referenced her) are cut.
- Reviewers should confirm no passage could be read as characterizing her by implication (for example, a reference to who was or was not present at a hospital bed).

## 4. Other third parties

| Person | Treatment | Flag |
|---|---|---|
| Paul DeWolf (deceased) and his family | Public record of the 2013 homicide; his father's words from the 2021 edition paraphrased (not re-quoted at length) | The 2021 quotation was given for that edition; **re-confirm permission** with the DeWolf family for the paraphrase and the mention of the memorial scholarship. Perpetrators are not named. |
| Nurse in the apology story | Unnamed, favorable | None |
| Linda (histotechnician) and her dream | First name, favorable, as in 2021 | Confirm she is comfortable appearing again; consider omitting the name |
| Physicians named in Acknowledgments (Yamout, Kelley, Hung Tran) and mentors in the text (Paul Cederna, Steve Wolverton, Greg Morganroth if retained) | Named as in 2021, favorable or neutral | Confirm names and spellings; consider whether any prefers not to appear |
| Adam and Bill (older plastic surgeons) | First names, as in 2021 | None |
| First-edition team named in Acknowledgments (Serratore, David, Aksoy) | Neutral | Confirm |
| Ram Dass, Beyoncé, Warren Buffett, Michelangelo, Roger Bannister, Ajahn Brahm | Public figures, public facts, attributed quotations | None |
| The business coaching group, the podcast, and other investors from 2021 | Not named | None |
| Attorneys, clinicians who treated the author | Not named | None |

## 5. Medical and pharmaceutical language

- **Otezla (apremilast):** The manuscript says the author took samples of the drug around the period of his depression and wonders whether it contributed; it states the label's Warnings and Precautions language on depression (association, not causation; monitoring advice; trial percentages). It does not say the drug caused anything. Reviewers should confirm the quoted label language matches the current prescribing information at publication (the label is revised periodically).
- **Ayahuasca and bipolar vulnerability:** presented as retrospective uncertainty; cites a case report and a systematic review; never asserts causation. The author's "probable underlying bipolar vulnerability" is stated as his understanding, not as a diagnosis.
- **Definitions** (WHO burnout, NIMH depression, Mayo Clinic intussusception) are paraphrased from the cited pages.
- **Statistics** (physician suicide rate ratios, burnout prevalence, CCSK incidence) are cited to peer-reviewed sources. Direct fetches of several sources were blocked in the build environment; wording was confirmed from indexed excerpts. **Re-verify each against the live source before print** (see `FACT_CHECK.md`).
- **Nothing in the book is presented as medical advice**; the front matter says so.

## 6. Suicide-narrative safe messaging

- Method stated at the minimum level needed for honesty; no height in feet, no location, no time, no access route, no injuries, no treatment specifics.
- Resources (988 in the United States) appear in the front matter, Chapter 5, Chapter 6, and Chapter 13.
- The attempt is not framed as heroic, sacred, or transformative in itself; recovery is described as slow.
- The single religious interpretation ("caught by the hand of God") is presented as experience and appears once.
- `scripts/validate.mjs` warns on method/location vocabulary near "parking garage."

## 7. Copyright and permissions

- The 2021 edition's text is the author's own; reuse requires no permission from the author, but the publisher of the first edition (Legacy Launch Pad Publishing, per the 2021 copyright page) may hold rights in the edited text or the illustrations. **Confirm the author's rights to reuse the 2021 illustrations and edited text** before publication.
- Illustrations: the 36 figures were drawn for the 2021 edition (cover design credited to OneGraphica). Confirm ownership or license to reuse the 23 retained figures and the stacked wordmark.
- Quotations: Beyoncé (paraphrase of a documentary scene and one short quoted sentence from a Billboard interview), Ram Dass (one sentence from a documentary), Warren Buffett (well-known aphorism), the Vietnamese proverb, Ajahn Brahm (paraphrased anecdote), WHO/NIMH/FDA (public-domain or short paraphrase). All within fair-use norms for a trade book; no song lyrics or long excerpts.
- Dr. Elizabeth Mullen's 2021 quotation is not reproduced; the figure is paraphrased and attributed to the cooperative group's published study.

## 8. Chapter-by-chapter flags from the chapter editors

Collected from the per-chapter legal fragments produced during drafting and revision. Each entry quotes the passage and says why it was flagged.

<!-- CHAPTER_FLAGS -->
