# FOLLOW-UP ADVERSARIAL QA PROMPT

Audit the complete `burnin2book` repository you just created.

The current working directory is already the repository root. Do not create a nested repository directory.

Do not merely produce a review report. Fix problems directly in the manuscript, assets, build scripts, and preview, then update `editorial/FINAL_QA.md` with what you actually changed and verified.

Read the complete manuscript consecutively from beginning to end.

Audit for:

1. AI cadence or generic self-help prose.
2. One-sentence-paragraph abuse.
3. Repeated sentence openings or repeated rhetorical structures.
4. Overuse of "It did not," "You can," "I was," "Sometimes," "The goal is," "The lesson is," and "not X but Y" constructions.
5. Duplicate ideas across chapters.
6. Abrupt chapter transitions or inconsistent voice.
7. Timeline inconsistencies.
8. Personal-history contradictions.
9. Any remaining former-spouse references in the actual manuscript.
10. Any remaining $22M / real-estate-guru / Wealthbound / FIRE-as-solution positioning.
11. Unsupported medical claims.
12. Unsupported claims about apremilast/Otezla.
13. Unsupported claims about ayahuasca or bipolar disorder.
14. Unsupported or legally imprecise claims about the bank-fraud matter.
15. Suicide-attempt prose that is either evasive, unnecessarily graphic, method-instructional, romanticized, or over-spiritualized.
16. Places where Patrick's subjective experience is presented incorrectly as objective fact.
17. Excessive metaphysical certainty inherited from the 2021 edition.
18. Missing, duplicated, distorted, or broken figure assets.
19. Original figures whose retained context no longer matches the Version 2.0 argument.
20. Bad typography or "AI SaaS dashboard" visual patterns in the web preview.
21. Broken chapter navigation.
22. Broken print styles.
23. Build failures.
24. Missing endnotes or fake/unverified citations.
25. Any paragraph that could plausibly come from a generic AI motivational book rather than Patrick Tran's specific life and voice.

Run all available repository checks, including the equivalent of:

- `npm run validate`
- `npm run wordcount`
- `npm run build`

If an optional dependency such as Pandoc is unavailable, verify graceful fallback behavior rather than pretending an output exists.

Then run literal repository searches for:

- Alicia
- ex-wife
- my wife
- $22 million
- $22,000,000
- Wealthbound
- FIRE

Distinguish manuscript hits from editorial-audit documentation.

Fix all issues that can be fixed from the supplied source material.

For facts requiring Patrick's confirmation or external legal review, flag them clearly rather than inventing resolutions.

Update `editorial/FINAL_QA.md` with:

- commands run
- pass/fail results
- total word count
- chapter word counts
- figure totals by KEEP / MODIFY CONTEXT / CUT
- factual flags remaining
- legal flags remaining
- citations remaining to verify
- prohibited/legacy-term search results
- concise list of changes made during this audit

Do not return a plan.

Complete the audit and corrections.
