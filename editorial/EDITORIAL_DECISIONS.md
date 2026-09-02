# Editorial Decisions — BURN IN, Version 2.0

The major decisions behind the rewrite, with reasons. Companion documents: `BOOK_BIBLE.md` (the working rules), `CUT_MATERIAL.md` (what left and why), `FIGURE_MANIFEST.md` (art), `FACT_CHECK.md` and `LEGAL_REVIEW.md` (claims), `FINAL_QA.md` (results).

## 1. This is a rewrite of the 2021 book, not a new book

The 2021 manuscript was read in full (200 PDF pages, about 54,000 words) before any structure was fixed. Everything that remained strong, true, and legally appropriate was carried forward: the family and immigration history, Berkeley and the yearbook, Michigan and the burn patient's hand, the plastic-surgery misery and the change of specialty, the nurse and the cake, the Organic Chemistry midterm, the crabs, the candle, the foundation, the ego material, meditation and beginner's mind, kindness and critical thinking, Adrian's diagnosis and treatment, the useful exercises, and the jokes. The author's voice in 2021 (irreverent, medical, specific) is the voice of 2.0, several years and one collapse later.

## 2. The former spouse is removed, not replaced

Per the author's instruction, the former spouse is not named, described, praised, criticized, or alluded to. The hospital-cafeteria anecdote, the dream-house letter, the shock-collar vision, the RuPaul material, the phone-hours story, and the hospital-bed scene are gone. Adrian's diagnosis is told from Patrick's perspective: he noticed the asymmetry and acted on it, which the author confirmed is acceptable. No alternate history was invented; where a scene needed a second adult it was cut or told without one. The validator fails the build on "my wife," "ex-wife," "Alicia," and "our marriage."

## 3. Real estate leaves; money stays

Every portfolio figure, transaction boast, FIRE tutorial, Monopoly lesson, asset-class opinion, Wealthbound reference, and call to join a community was removed (see `CUT_MATERIAL.md` §2). The 2021 book's financial claims are referred to exactly once, historically, without the number, in Chapter 10. What survives is the mature material: money as margin and optionality; liquidity (the "box of matches"); leverage as asymmetric risk; complexity; lifestyle inflation; due diligence; independent professional advice; not outsourcing judgment; the seduction of rapid success; confusing transaction size with wealth; confidence outrunning competence. The chapter states once that it is not financial advice.

## 4. From "The Victim Mindset" to "Agency Without Self-Blame"

The 2021 chapter's real insight (ownership changes what you can do next) is kept and its distortion (ownership as verdict; "happening for me") is corrected. Version 2.0's definition: agency is not the belief that everything that happens to you is your fault; it is the belief that whatever has happened, your next move still belongs to you. The Organic Chemistry story is retold as the model: the lesson was "do practice problems," not "you are a C student."

## 5. Burnout is defined precisely

The word "burnout" is no longer used for every form of suffering. Chapter 6 uses WHO's ICD-11 language (an occupational phenomenon with three dimensions, not a medical condition, not for other areas of life) and NIMH's description of depression, and separates burnout from depression, suicidality, mania and bipolar vulnerability, anxiety, sleep deprivation, medication effects, and substance effects. Sourced statistics replace the 2021 edition's unsourced ones.

## 6. The suicide attempt is a full, central, non-graphic chapter

Chapter 5 states plainly that the author went to the roof of an eight-story parking garage and jumped, expected to die, and survived after landing in a bush rather than on the concrete. The chapter includes the financial and legal fear, the early-morning legal calls, the nighttime terror, the hidden depression, continued professional functioning, hospital and treatment, slow recovery, and the bush seen years later with a hollow and flowers. It excludes location, access, calculations, injuries, and any method-optimizing detail. The attempt is not romanticized or made heroic; the meaning is survival, time, treatment, rebuilding, and humility. "Caught by the hand of God" appears once, as experience, without explanation. The earlier parking-garage passage from training (2021, p. 44) is quoted in Chapter 2 and re-examined rather than preserved with its minimization.

## 7. Psychiatric, medication, and psychedelic uncertainty

Otezla (apremilast): the manuscript says the author had taken samples around the period of his depression and wonders whether it contributed; the prescribing information's depression warning is stated in the label's own terms; causation is never asserted. Bipolar vulnerability: "probably," "came to understand." Ayahuasca: use in ceremonial settings in the years before the crisis is acknowledged; the case-report literature and the systematic review are cited; personal interpretation and evidence are kept in separate sentences. The 2021 line "I know all the diagnostic criteria for clinical depression" is examined as the sentence that kept the author from applying them.

## 8. Spirituality kept as experience, not doctrine

Meditation, awareness, surrender, humility, and beginner's mind remain. Claims about souls, death, reincarnation, vibrations, energy, manifestation, or a universe that intentionally sends events were removed or reframed as first-person experience ("it felt as though," "I experienced it as," "I began to wonder"). The retreats are described as what they were for the author without asserting what they were in fact.

## 9. Broader audience without flattening the physician

The book addresses founders, executives, physicians, creators, and professionals generally, but it does not translate every scene into generic terms. Medicine is the author's laboratory; the generalization is done through the argument (the achievement bargain, performing fine, shame and secrecy, margin, design) and occasional non-medical examples, never through lists of job titles beyond the Introduction and Author's Note.

## 10. Figures

All 36 original figures were classified: 9 kept, 16 kept with modified context, 11 cut (`FIGURE_MANIFEST.md`). Art tied to removed real-estate content, to the former spouse, to Wealthbound, or to death-as-liberation was cut. The stacked BURN-IN wordmark and the orange/gray/black palette were preserved; the V2 cover is a typographic derivation, not a redesign. No original art was redrawn.

## 11. Structure

Four parts following ACHIEVEMENT → CRACKS → COLLAPSE → SURVIVAL → UNDERSTANDING → REBUILDING → INTEGRATED AMBITION, with the collapse at the exact middle (Chapter 5 of 15). The Introduction keeps "Fourteen centimeters" as the opening because, after reading the whole 2021 manuscript, it remains the strongest opening and the reference introduction uses it; its content was preserved and its cadence reflowed into paragraphs. An Author's Note precedes it to tell the reader plainly what changed. The Epilogue returns to the bush. Chapter titles follow the working structure supplied by the author with small changes for rhythm.

## 12. Prose standard

The reference introduction supplied for Version 2.0 set the direction and the candor but not the cadence (95 percent of its paragraphs were single sentences). The bible's style sheet requires full paragraphs, varied sentence length, scenes, sustained argument, and rationed use of the tics the author flagged. `scripts/validate.mjs` enforces the mechanical parts (one-sentence-paragraph ratio, repeated openings, tic counts, em-dash density, generic vocabulary, legacy terms) so that human editing time goes to judgment rather than counting.

## 13. Legal posture on the fraud matter

The convicted individual is never named in body text. The endnote cites the U.S. Attorney's Office press release for the public facts (conviction, sentence, restitution, the described scheme). The manuscript separates what the author feared at the time, what the public record established about the other person, and what remains unknown; it does not say every transaction was fraudulent, does not attribute motive, does not describe the other person, and does not narrate how the author's own exposure resolved. See `LEGAL_REVIEW.md`.

## 14. Names and credentials

Third parties appear by first name or role, as in 2021, and only in flattering or neutral contexts. About the Author is written timelessly (no current employer, location, licensure, wealth, or company). Facts that could not be confirmed from the supplied materials are flagged in `FACT_CHECK.md` rather than guessed.

## 15. Process

A book bible was written first; chapters were drafted against it, each then audited by an adversarial editor and revised; the lead editor then read the whole manuscript consecutively and made the continuity pass; an adversarial QA pass followed the author's follow-up prompt; results are recorded in `FINAL_QA.md`.
