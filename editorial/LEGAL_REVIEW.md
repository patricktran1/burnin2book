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

### Introduction

1. **The fraud matter (primary flag).** Passage: "Then parts of the financial world I had built began to unravel. Several of the commercial real-estate transactions I had entered were connected to a person I had trusted, and that person was later convicted of federal bank fraud and sentenced to prison. Long before I knew how that story would resolve, I became terrified that the consequences would destroy me financially. I believed I could be exposed to liabilities approaching ten million dollars. I imagined bankruptcy, and I imagined losing everything."
   Why: This uses the Bible §3 approved framing. The individual is not named; no character, motive, or intent is attributed; no claim that Patrick owed anything or that any specific transaction was adjudicated; the ten-million figure is framed as belief at the time. The endnote to the public record (DOJ press release, Bible §4 source 1) is placed in Chapter 5 per the brief, so this chapter's sentence stands without a citation. Counsel should confirm they are comfortable with "connected to a person I had trusted" and "convicted of federal bank fraud and sentenced to prison" appearing here uncited, and that "the financial world I had built" does not imply anything about the scale of holdings.

2. **"Someone lied to you."** Passage (generic second person, in the section before the fraud is introduced): "Some of the time you are being exploited, the business is failing, the relationship is unhealthy, someone lied to you, you are sick, or your brain is not functioning the way it should."
   Why: This is a list of generic situations from the approved reference and is not directed at any person. Because it appears two paragraphs before the fraud passage, counsel may wish to confirm it cannot be read as an assertion about the convicted individual's conduct toward Patrick (Bible §3 forbids "he defrauded me," "I was tricked into lying," etc.). If there is any concern, "someone lied to you" can be cut without loss.

3. **Suicide-narrative content.** Passages: "at one point during that period I thought about jumping from a parking garage. In the first edition I wrote about that thought and then minimized it, telling myself and the reader that it was not 'real' suicidality because I did not believe I would actually do it. Years later, I would jump from a parking garage." And: "I survived something I should not have survived."
   Why: Complies with Bible §3 (no date, city, height, access, injuries, or method-optimizing detail; the phrase "top floor" from the 2021 text was deliberately omitted). Counsel and the sensitivity reader should confirm the level of detail is acceptable for an Introduction that precedes the front-matter 988 notice only by a few pages. The validator's method-detail scan returned no hits.

4. **First-edition financial claims, restated as history.** Passage: "When I wrote the first edition of Burn In, I believed I had created substantial financial security through real estate investing, and I thought I had solved one part of the burnout equation."
   Why: The 2021 edition stated a portfolio figure and used FIRE language; both are omitted here per FACTS_AUTHOR_CONFIRMED.md. No figures, no brand names, no advice. Low risk; included so counsel can see the only reference to the earlier positioning.

5. **Medical statements about Adrian.** Passages: the diagnosis, the "roughly a dozen or so children a year" rarity clause with endnote, the intussusception description with endnote, and the ruler caption ("it was displacing his organs").
   Why: The rarity sentence paraphrases the cooperative group's published data (Bible §4 source 7) and does not reproduce Dr. Elizabeth Mullen's 2021 quotation, so no re-permission is needed for this chapter. No statement is made about Adrian's current health, age, remission, or prognosis. The medical details (mass size, en bloc resection, green bile, port, transfusions) come from the author's account in the 2021 edition and the author-confirmed facts; a parent's account of his own child's care, but counsel may wish to note that the child cannot consent to publication. Author to confirm every clinical detail at proof.

6. **Former spouse.** No reference of any kind. The 2021 text credited a second parent with noticing the asymmetry (p. 20); this chapter follows the author-confirmed instruction that Patrick noticed it and acted on it. The plural "we/our" of the 2021 worry passage (p. 21) has been rewritten in the first person singular. Counsel should confirm the singular framing raises no issue.

7. **Third parties.** None named. Lawyers are referred to only as "the calls with lawyers." No coaching group, podcast, community, lender, or business is named.

### Chapter 1

No former spouse, no convicted individual, no portfolio or dollar figures, no suicide narrative, no method or location detail, and no medication or substance claims appear in this chapter. The passages below are the only ones counsel may want to look at.

1. **A named living physician (mentor).**
   > "The surgeon was Paul Cederna, and the operation was a series of Z-plasties ... Dr. Cederna would breathe out a long sigh, as if he were feeling the release of the scar's tension in his own body: 'Ahhhhh.'"
   Why: Dr. Cederna is named in full, as he was in the 2021 edition, and depicted favorably. Bible §3 allows mentors by name as in 2021. Suggest a courtesy notice; no permission issue is apparent. The patient in the scene is unnamed and undated, described only by injury and outcome; no identifying detail beyond what the first edition printed.

2. **Father's medical information.**
   > "my father passed out ... his electrocardiogram showed concerning signs ... my father has hypertrophic cardiomyopathy. One wall of his heart is about two and a half times thicker than it should be ..." and the paragraph describing the mechanism of his syncope and his treatment options.
   Why: health information about a living family member, republished from the 2021 edition with more clinical detail preserved. Confirm the author's father consents to its republication. The acknowledgments brief names the parents (Myngoc and Chi); this chapter does not name the father.

3. **Genetic risk to the author and to a minor.**
   > "each of his first-degree relatives has a fifty percent chance of carrying it too. That includes me. That includes Adrian." and "I would need to be tested, and so would Adrian."
   Why: states a possible inherited risk to a minor child. No test results, diagnosis, or current health status for Adrian are stated, consistent with bible §2. Author to confirm he is comfortable leaving the testing question open in print.

4. **Grandfather's public office.**
   > "He served the government of South Vietnam as its minister of health, something like a surgeon general, helping to establish hospitals and clinics."
   Why: a factual claim about a deceased relative's government role, taken from the first edition. Not defamatory; flagged only because it is a checkable historical claim that this build could not verify against a public record.

5. **Self-disclosure of a minor deception.**
   > "I told my students that I was a researcher, which was also true, and I let them assume I was a graduate student, which was not. I did not tell them I was an undergraduate because I did not want them to take me less seriously."
   Why: the author admits misleading students while teaching a lab at UC Berkeley. Self-directed, decades old, and present in the 2021 edition (p. 119, in stronger terms: "I created this elaborate backstory"). No third party is named. Low risk; confirm the author is comfortable with the V2 framing.

6. **Foreshadowing of the crisis without facts.**
   > "There would come a time, not many years after I typed 'How lucky am I?', when the reflex would meet something it could not process, and I would find out what happens to a person whose main coping mechanism fails silently."
   Why: included for completeness. It asserts nothing about the fraud matter, third parties, finances, or the attempt; it refers only to the author's own coping. No action needed.

7. **A named school.**
   > "At St. Leo's, where I went to kindergarten, the teachers sent each child home every day with a paper apple colored to reflect that day's behavior."
   Why: names a school (as the 2021 acknowledgments did) and describes an ordinary behavior chart. Benign; no teacher is named.

### Chapter 3

No former spouse, no convicted individual, no dollar figures for the author's own finances, no suicide narrative, no medication or substance claims, no employer, coaching group, or company names appear in this chapter. The passages below are the only ones counsel may want to look at.

1. **An anonymized living third party (the founder friend).**
   > "A friend of mine sold his company, an outcome he had worked toward for the better part of a decade and had described, the whole time, as the thing that would finally let him breathe. Within a month he was back at a desk building the next one. When I asked him why, he did not talk about money. He said that sitting still felt like dying, and he said it without irony, as a plain description of a physical state."
   Why: describes a real, unnamed person and attributes a quoted sentence to him. The example was supplied by the chapter brief rather than the 2021 text. The author should confirm the person exists as described, that the account is accurate, and that the person cannot be identified from "sold his company"; if there is any doubt, the passage should become a general observation without the quotation. Nothing unflattering is said.

2. **The author's own investing, referenced without figures.**
   > "The number was no longer a salary. It was a portfolio, and a portfolio does not feel like a have-do-be number while you are building it. Building one feels like prudence."
   Why: the only reference to the author's real-estate investing in the chapter. No amounts, asset names, partners, or performance claims; framed as self-criticism, consistent with bible §2 (no portfolio boasting, no figures). Included so counsel can confirm it stays on the right side of that rule.

3. **Affordable housing as a resident.**
   > "When I was a resident in Washington, DC, my salary was low enough that I qualified for affordable housing, and I took it."
   Why: states that the author received a means-tested housing benefit. The 2021 edition said only that he qualified. Author to confirm he actually used the program; if he did not, "and I took it" must be cut so the book does not misstate receipt of a public or subsidized benefit.

4. **Generic criticism of medical employers and administrators.**
   > "For many people who make it through the gauntlet, the easiest next step is to take a job with a large medical employer … You work when they tell you to work, you see the patients they assign to you, and you get, in short, what you get." and "the administrator who overrules you and who would not last a day in your shoes."
   Why: carried from the 2021 edition (pp. 53–54). No employer, hospital, or individual is named or identifiable. Opinion, not fact. Low risk; flagged for completeness.

5. **Published statistic.**
   > "a national survey of US physicians found that 62.8 percent reported at least one symptom of burnout, up from 38.2 percent the year before; by 2023 the figure had fallen to 45.2 percent, roughly where it had stood in 2011."
   Why: cited to Shanafelt et al. (bible §4 source 6) in endnote [^c03-1]. Bible §4 notes the wording was confirmed from indexed excerpts and must be re-verified against the live article before print. Not a legal exposure; a verification item.

6. **The proverb and the family's immigration.**
   > "My grandparents and my parents left a country, a language, and a war so that the generation after them would have what they had not."
   Why: benign statement about living and deceased relatives, consistent with Chapter 1 and the 2021 edition. No action beyond the author's confirmation that "grandparents" is accurate on both sides.

7. **Reference to Adrian.**
   > "Then one side of my son's abdomen looked different from the other, and I met the first thing I could not outwork"
   Why: a single clause about a minor's past illness, already published in the first edition and re-narrated in the Introduction. No current health status, age, or outcome stated, per bible §2. No action needed.

8. **Self-criticism of the first edition.**
   > "I would add only that I wrote it while doing precisely what it describes, and that the man writing it could not see this" and "I was pointing, as usual, at someone else."
   Why: the author criticizes only himself. Included so counsel can see that the chapter's candor about the 2021 edition does not extend to any third party, publisher, or collaborator.

### Chapter 5

Passages publishing counsel should review, with the reason for each.

## 1. The fraud matter (bible Section 3)

> "Several of the commercial real-estate transactions I had entered were connected to a person I had trusted. That person was later convicted of bank fraud in federal court and sentenced to prison.[^c05-1]"

Approved framing reproduced verbatim. The endnote (scratchpad `draft/notes/c05.md`) names the convicted individual from the DOJ press release; the body does not. Counsel to confirm the endnote's summary of the public record and that the sentence "The release does not mention the author or any transaction he took part in" is accurate against the live page.

> "The second register is what the public record later established about the other person: a guilty plea, a federal conviction for bank fraud, a prison sentence. That record is public, and the note at the back of this book will tell you where to find it. It says nothing about me. It does not describe my transactions or characterize them, and I am not going to borrow its findings to characterize them for you."

Restates only what the public record contains (plea, conviction, sentence). Confirm "It says nothing about me" is accurate (per bible Section 4, source 1, the release does not mention Patrick).

> "The third register is what I still do not know, and what nobody has audited: which of the deals I took part in were exactly what they appeared to be on the day I signed, what I understood at each closing and what I should have understood, and how much of my own trouble came from the transactions themselves and how much from the speed with which I entered them."

Counsel to confirm this does not read as an assertion that any transaction Patrick took part in was fraudulent, or as an admission about his own conduct. It is framed as unknown. No motive or intent is attributed to the other person anywhere in the chapter.

> "Chapter 4 told you, in passing, that one of the people connected to those rooms would later be convicted of bank fraud, and that I was getting ahead of the story."

Links the convicted person to the "rooms" (the 2021 edition's business community, PDF pp. 66–67, which named a "Matt" and his profession). Counsel to weigh whether this linkage, combined with the first edition, makes identification easier than the endnote already does, and whether that matters given the conviction is public record. The former community and coaching group are not named.

> "I believed I could be facing nearly ten million dollars in personal exposure. ... It describes a belief. It does not describe a debt. Nobody handed me a bill for ten million dollars; what I had was a set of documents I had signed, a growing list of things the attorneys did not yet know, and a mind that treated every unknown as though it had already resolved in the worst available direction."

Approved fear framing. "A set of documents I had signed" is the only reference to instruments; no guarantees, lenders, or amounts are described. Author to confirm comfort with this clause.

> "I am not going to narrate the legal and financial resolution here. Parts of it are not mine alone to tell, and it is not the point."

Per bible. No settlement, lawsuit, lender, or bankruptcy outcome is stated anywhere in the chapter.

> "The attorneys were in the Midwest, where the working day begins before mine did ... the attorneys, who were good at their jobs, kept telling me with great care that they did not yet know."

References to counsel are general (location, tone, uncertainty). No privileged content or legal advice is disclosed. Counsel to confirm.

> "Bankruptcy is a legal process. People go through it and come out the other side with their children still speaking to them and their hands still able to hold a scalpel."

General statement; no claim about the author's own filing status.

## 2. Medical and medication statements

> "During this period I was also taking samples of a medication I prescribe, a drug whose label carries a warning I had read many times on behalf of other people."

Drug not named here (Chapter 6 names Otezla and cites the prescribing information). No causal claim. Confirm the unnamed "warning" reference is acceptable ahead of Chapter 6's sourced statement.

> "And in the years before the crisis, in ceremonial settings, I had used ayahuasca."

Admission of use of a substance whose legal status varies by jurisdiction; no place, date, or organizer is given, per bible Section 2. No causal claim.

> "I could have drawn you the physiology on a napkin, the stress hormones and the nervous system locked in the posture it takes when the threat is in the room, and the drawing would have been correct and no help at all."

General physiology stated as the author's own understanding. Not a treatment claim. Flagged as NEEDS SOURCE in the fact-check log; cut if the book's standard requires sourcing.

> "I do not believe that depression in a person who keeps functioning is a milder illness; I believe it is the same illness in someone with more practice at concealment ..."

Clinical opinion, hedged. Not medical advice.

## 3. Suicide-narrative safety (bible Section 3)

> "I went to the roof of an eight-story parking garage and jumped. I expected to die. Instead I landed in a bush rather than on the concrete around it. That is the whole description, and it is going to stay the whole description. I am not going to tell you when, or where, or how I got to the roof, or what the fall did to my body, partly because those details help no one who is well and could harm someone who is not, and partly because they were never the hard part."

Contains only the three approved facts. Counsel and, if available, a safe-messaging reviewer to confirm that the refusal sentence ("what the fall did to my body") is acceptable: it acknowledges injury without describing it.

> "I had made a decision, the most final one a person can make, and it had been overruled by a bush."

Reviewer to confirm tone does not romanticize; intent is flat, not comic.

> "in the United States you can call or text 988 at any hour and reach a person.[^c05-2]"

Accurate per SAMHSA (source 11). Chapter 13 carries fuller guidance.

## 4. Third parties and privacy

> "Then there was a hospital, and people whose job it was to keep me alive, and after them, people whose job it was to ask why I had not wanted to be."

No hospital name, city, clinician, or treatment specifics. Per bible.

> "I told a few people the truth. Who and how I am going to leave out, because the who is theirs ..."

No third party identified.

> Composite clinical scene: "A patient in her eighties or nineties, somebody's mother, somebody's grandmother, is sitting on the table with a skin cancer on the side of her nose and her daughter in the chair against the wall."

Written as a representative "shape" of a morning, not an identifiable patient. No PHI. Confirm acceptable as composite.

> Mentions of parents ("left a war behind and built two careers in medicine and dentistry") and son ("whose tumor I could still describe in centimeters"; "my son's college fund").

Family biography already public in the first edition. No current health status for Adrian is stated. The former spouse is not present or alluded to.

## 5. Quotation of the first edition

> "If you took away all my material possessions today, even if I went bankrupt, I would not be fazed. I know that I could get it back."

Verbatim from *Burn-In* (2021), PDF p. 99. Confirm the author holds rights to quote the first edition (publisher of record for the 2021 edition).

### Chapter 6

1. **Otezla (apremilast), the sample closet, and self-administration.**
   > "Around the period of the depression I had been taking samples of a drug I prescribe, Otezla, whose generic name is apremilast. I took it the way physicians take things from the sample closet: no one weighed the risks and benefits on my behalf, because the physician who would have done the weighing was the patient, and the patient was busy."
   > "I am saying that a physician with a history of exactly the kind of thought the label warns about took a drug carrying that label out of a closet, told no one, and monitored himself with the same instrument that was malfunctioning. If I had done that for a patient, I would have deserved every question that followed."
   Why: names a branded prescription product and quotes/paraphrases its FDA label. Wording tracks the label (Warnings and Precautions, Depression) and the trial figures in bible Section 4, item 2, and the text states twice that no causal claim is made. Counsel should confirm the label paraphrase against the current label before print, and consider whether the author's admission of taking samples without a prescribing record has any professional-conduct implication he wishes to make in print (author-confirmed fact, but the "no one weighed the risks" framing is the author's inference about his own conduct).

2. **Ayahuasca and bipolar vulnerability.**
   > "In the years before the crisis, in ceremonial settings, I drank ayahuasca."
   > "What I wonder is this: whether a serotonergic brew, taken by a man with a bipolar vulnerability nobody had detected, unmasked something, or accelerated it, or interacted with it in a way that made the years that followed more dangerous than they would otherwise have been."
   > "There are published case reports of mania after ayahuasca in people with bipolar disorder."
   Why: admission of use of a Schedule I substance (DMT) in an unspecified setting and jurisdiction; no date, place, or facilitator is given, per the bible. The literature statements follow Section 4, item 10; the cited case report is a single case, while the sentence uses the bible's approved plural "case reports." No causal claim is made.

3. **Probable bipolar vulnerability.**
   > "I probably have an underlying bipolar vulnerability."
   > "Probably, because I am describing an understanding I arrived at later and with help, not a verdict I am prepared to stamp on my own chart in a book."
   Why: self-disclosure of a mental-health condition, hedged as instructed (no formal diagnosis asserted). Confirm the author is comfortable with this level of disclosure in print.

4. **Reference to the legal and financial matter.**
   > "For a long stretch I lived under severe financial and legal stress of a kind I had never experienced and had not believed could happen to me. The previous chapter tells that story and I am not going to tell it again."
   > "The fear is about money and about a legal matter she cannot control and will not discuss."
   > "attorneys in the Midwest whose mornings began before mine"
   Why: no third party is named or characterized; no resolution, debt, or lender is described; consistent with Section 3. Flagged only so counsel can confirm the chapter adds nothing to Chapter 5's treatment.

5. **Suicide-narrative safety.**
   > "If you are in the United States and the thought has moved from wanting it to stop to how to make it stop, call or text 988..."
   > "None of them will be any use to someone who is not alive to read them, and I say that as a man who very nearly was not."
   Why: the chapter contains no method or location detail and does not use the phrase "parking garage"; the 988 information follows Section 4, item 11. Flagged for the usual sensitivity review of suicide-adjacent language.

6. **Quotations from the 2021 edition.**
   > "Burnout is a feeling of not having enough money, time or both to do what you love with those you love."
   > "I've never had major depressive disorder. As a physician, I know all the diagnostic criteria for clinical depression."
   > "from You 1.X to You 2.0"
   Why: self-quotation from the author's own prior book; rights presumably with the author, but confirm the first edition's publishing agreement permits reuse.

### Chapter 8

1. **The fraud matter (approved framing, no endnote here).**
   > "Several of the commercial transactions I had entered turned out to be connected to a person I had trusted, who was later convicted of bank fraud in federal court and sentenced to prison. I chose to sign; I did not choose what the public record would later say about someone else."

   Why: uses the Section 3 approved framing verbatim in substance; the convicted individual is not named; no motive, character, or intent is attributed. The Chapter 5 endnote ([^c05-1]) carries the public-record citation; this chapter deliberately repeats none of it. Counsel should confirm that "I chose to sign" cannot be read as an admission about the content of any document, and that "what the public record would later say about someone else" does not imply the record characterizes Patrick's transactions (the DOJ release does not mention him).

2. **Responsibility without causation passage.**
   > "I am responsible for what I do next about the fact that I signed those documents, in the sense that the next move is mine and nobody else's. I am not the author of every consequence that followed, and I did not make the choices other people made."

   Why: "those documents" is unspecified by design. Counsel should confirm the sentence does not (a) admit that any document Patrick signed was false, or (b) attribute wrongdoing to "other people" in a way that could identify the convicted individual or any co-party.

3. **The accept pile.**
   > "Acceptance covers a diagnosis, a market, and the public record about another person, which I can neither change nor take as an account of my own life."

   Why: refers obliquely to the conviction. Confirms Patrick is not disputing the record and not claiming it describes him. Low risk; included for completeness.

4. **Uncontrolled legal outcome.**
   > "What I actually could not control, the outcome of a legal matter I did not fully understand, my mind filed under 'control,' and therefore under 'my fault.'"

   Why: Section 2 prohibits describing how Patrick's exposure resolved. This sentence describes only his state of mind at the time and does not narrate any outcome, settlement, lender, or lawsuit. Counsel to confirm "a legal matter" is acceptably vague.

5. **Third parties at Berkeley (unnamed).**
   > "The instructor was not good, I decided. He had a melodic French accent, and I concluded that the accent was part of the problem. It was not part of the problem."
   > "A.J., 153 out of 155. J.S., 151."

   Why: the Organic Chemistry instructor and GSI are unnamed; the unflattering judgment is presented as Patrick's own error and explicitly retracted. The two classmates appear only as initials and scores, as in the 2021 edition. Very low risk; flagged because Section 3 asks for "nothing unflattering" about mentors and staff.

6. **Modesto market statement (historical).**
   > "It also had very few dermatologists, which meant more patients who actually needed a Mohs surgeon…"

   Why: a past-tense recollection of the 2021 edition's "fewer dermatologists in the area." No competitor or practice is identified; no claim about the present market or Patrick's current practice status or location. Low risk.

7. **Mental-health and treatment references.**
   > "several years and a hospital to see"; "I was ill"; "the next move was to tell someone, and then the next was to get treatment, and then the next was to take the treatment"

   Why: consistent with Section 2 (no hospital name, dates, or treatment specifics; no method or location detail; no mention of the parking garage in this chapter). Included so counsel can confirm the chapter stays inside the Chapter 5 safety envelope.

No former-spouse references, no portfolio figures, no real-estate instruction, no medication or substance claims, and no statistics appear in this chapter. The chapter carries no endnotes.

### Chapter 9

No third party is named in this chapter. The convicted individual, the former spouse, the coaching group, the retreat organization, and the meditation teachers are all unnamed. No portfolio figures, no real-estate instruction, no method or location detail. The following passages are flagged for counsel's attention as a precaution.

1. "It moved on to my mother's rental houses, then to the duplexes I had bought, then to the strip mall and the office buildings, with a stop at a business coaching group along the way."
   Why: describes the content of the 2021 chapter as history. No figures, no names, no advice. Confirm counsel is comfortable that "the strip mall and the office buildings" is not read as a present-tense ownership claim (the sentence is about what the first edition discussed).

2. "At four in the morning, on almost no sleep, with a call to attorneys in the Midwest already waiting on the calendar, I would lie in the dark and compose the story of my life, and the story was always the same: I had been a fool, I had lost what I had been given, I was finished."
   Why: references the legal crisis. It describes the author's fear and self-judgment only; it does not describe any lawsuit, lender, settlement, debt, or the other person. "Attorneys in the Midwest" is author-confirmed.

3. "Then whatever a clinician has prescribed, taken as prescribed, which is a sentence I would have skipped past in 2021 and now consider load-bearing."
   Why: reads as general guidance about medication adherence. It does not name a drug, a diagnosis, or state that the author takes anything. Confirm it does not need the book's "not medical advice" disclaimer to be echoed here (the front matter carries it).

4. "A practice is not a treatment… You would not treat pneumonia with breathing exercises. Breathing exercises are good for you. They are not antibiotics."
   Why: a statement about meditation's limits relative to medical care. Opinion and analogy, no clinical claim; flagged only because it touches medical advice.

5. "In 2021 I illustrated the wave with a claim that lottery winners and amputees both return to their previous level of happiness within a year. I had read it somewhere. I did not check it, and I am not going to repeat it here as though I had."
   Why: the author retracts an unsourced statistic from his own prior book. No defamation exposure; flagged so counsel knows a first-edition claim is being publicly walked back.

6. "One of the teachers on the retreats gave me this as a grounding technique."
   Why: an unnamed private individual is referenced favorably. The 2021 acknowledgments named this person; V2 does not. No flag beyond confirming the author is comfortable with the anonymized reference.

7. "The first edition called this the hypocritical oath, and I am keeping the phrase: doing the things you tell your patients not to do, and knowing better the entire time."
   Why: a generalization about physicians, applied to the author himself. No individual or institution identified.

### Chapter 10

Passages publishing counsel should review, with the reason for each.

1. **The fraud matter (cross-reference to Chapter 5).**
   > "Chapter 5 told you that several of the commercial transactions I entered were connected to a person later convicted of bank fraud in federal court, and it separated what I feared at the time from what the public record established about that person and from what nobody has audited. I am not going to reopen those registers, name anyone, or narrate how any of it resolved. This chapter is about the decisions that were mine, because those are the ones I can learn from and the ones you can use. A conviction on someone else's record tells you nothing about how to run your own life. The decisions do."

   Why: uses only the bible's approved framing; the convicted individual is not named, characterized, or given a motive; no resolution is narrated. Counsel should confirm the sentence "A conviction on someone else's record tells you nothing about how to run your own life" cannot be read as commenting on the record's findings, and that the reference to Chapter 5's endnote (the DOJ release) is sufficient without a second citation here.

2. **The "rooms" and the coaching community.**
   > "The rooms I described in 2021 with such gratitude, full of people worth ten or a hundred times what I was worth, were rooms where everyone was buying. Everyone was leveraged. Everyone had a bigger number than mine and a story about how the number had gotten bigger, and the stories agreed with one another, and the agreement felt like evidence."
   > "Nobody in those rooms was paid to tell me no."
   > "...surrounded by people whose certainty I mistook for experience."

   Why: describes an unnamed real-estate investing community and coaching group in general terms. No group, podcast, or person is named; no individual is accused of anything. Counsel should confirm that "everyone was leveraged" reads as the author's impression rather than a factual claim about identifiable persons.

3. **The nurse anesthetist.**
   > "That fall I joined a business coaching group, where a nurse anesthetist I met introduced me to commercial property: corporate tenants on long leases, tenants who handle their own maintenance and never call about a toilet. What needed to change, he suggested, was not my strategy but my thinking. I needed to think bigger."

   Why: a real, unnamed third party (named "Matt" in the 2021 edition) described by role only, with nothing unflattering. He is not the convicted individual and the text does not connect him to the fraud matter. Counsel should confirm that placing him in the same paragraph as the speed-of-acquisition narrative does not imply responsibility for the author's later decisions; the paragraph attributes the decisions to the author.

4. **Independent advice / outsourced judgment.**
   > "I do not mean the deal's attorney, who is competent and paid by the transaction, or the accountant somebody at the table recommends."
   > "In real estate I outsourced my judgment to the people whose interests the judgment was supposed to check."

   Why: generic references to transaction counsel and accountants. No firm or professional is named or implied. Counsel should confirm "paid by the transaction" is acceptable as a general description of deal counsel and does not suggest misconduct by any identifiable attorney.

5. **Leverage, liquidity, and the author's own financial condition.**
   > "I got on it fast, with borrowed money..."
   > "I had a large number and a lot of pride, and I did not think hard enough about how much of the number was borrowed."
   > "He can be rich and one bad year from ruin. I know, because when my own bad year came, the number turned out to be no protection at all..."
   > "There were months in which I was very poor in spirit with a great deal of paper wealth..."

   Why: the bible forbids portfolio figures, statements about how the exposure resolved, and any statement that the author went bankrupt or did not. These sentences assert none of that, but counsel should read them to confirm they cannot be construed as admissions about specific loans, lenders, or insolvency.

6. **Disclaimer.**
   > "I should say once, dryly, that nothing in it is personal financial advice, that I am a dermatologist, and that anyone who takes investment instruction from a dermatologist has already made the first mistake."

   Why: the chapter's sole disclaimer, in the author's voice per the brief. Counsel should decide whether the front matter's "not medical, legal, or financial advice" note is sufficient or whether this line needs strengthening.

7. **Warren Buffett quotation.**
   > "Warren Buffett's famous first rule is never lose money, and his second is never forget the first."

   Why: widely quoted aphorism used without endnote per bible Section 4 item 19. Low risk; flagged for completeness.

8. **Trade names.**
   Apple Store, Tesla Model X (falcon-wing doors) appear as ordinary consumer references drawn from the 2021 edition. No endorsement or disparagement. Low risk; flagged for completeness.

No former-spouse references, no dollar figures for the portfolio or losses, no suicide-method detail, no medication or substance claims appear in this chapter.

### Chapter 12

Overall: low-risk chapter. No former spouse, no convicted individual, no figures, no company names, no medical causation claims, no method or location detail. Passages counsel may want to read:

1. **Patient-dismissal language.**
   > "A practice that will end its relationship with a patient who abuses its people, and will do it properly, with notice and with the patient's care handed on, is a practice that has decided in advance whose afternoon it is protecting."
   Why: describes terminating a physician–patient relationship. Written generically (no statute, no jurisdiction, no specific patient, no claim that his own practice has or had such a policy). Counsel to confirm the phrasing cannot be read as advice on patient abandonment rules, and that "with notice and with the patient's care handed on" is acceptable as a general description rather than a legal standard.

2. **Quoted first-edition rant about patients.**
   > "I wrote that spending time with me was a luxury, that I was booked out eight months, that the people who yelled at my staff or left one-star reviews over a wait time or a parking ticket had shown me they did not see my time as valuable, and therefore did not see me as valuable."
   Why: self-quotation from the 2021 edition (pp. 114–115) about unnamed patients as a class, explicitly retracted in tone. No identifiable individual. Confirm no reviewer or patient could be identified by the "parking ticket" or "one-star review" details (they are from the published 2021 text).

3. **Allusion to medication samples.**
   > "The sample closet in a dermatology office is a default too, and I have written in an earlier chapter about what I took from mine and what I still wonder about it."
   Why: refers to the author-confirmed fact that he took samples of a medication he prescribes. No drug named, no diagnosis, no causation. Confirm consistency with Chapter 6's approved Otezla wording (bible Sections 2–4).

4. **Allusion to the legal matter.**
   > "The morning block, my time, had been quietly replaced by a recurring legal call for reasons I have already described, and the calendar recorded that substitution without comment."
   Also: "a call from an attorney" among examples of unexpected events, and "the decisions were the part where I needed help."
   Why: refers to the crisis without narrating resolution, lenders, settlements, or the other person. Compliant with Section 3; flagged only so counsel sees every reference to the matter in one place.

5. **EMR anecdote.**
   > "One of the worst chart notes I have ever read had, in the physical exam section, the sentence 'Patient remains intubated and sedated.'"
   Why: describes a real chart error. No patient, clinician, hospital, date, or location identified; the anecdote appeared in the 2021 edition (p. 15). Confirm no PHI concern. V2 does not say who wrote or signed the note.

6. **Third-party attributions.**
   - Jerry Seinfeld's "don't break the chain" advice: hedged as "is said to have told younger comedians." Popular attribution, not verified against a primary source (fact-check: NEEDS SOURCE). Not defamatory; counsel may prefer the name be cut if unverifiable.
   - Ajahn Brahm, *Opening the Door of Your Heart*: short paraphrase with two brief quoted lines ("The hall is finished"; "What's done is finished"), attributed to the book, as in the 2021 edition. Fair-use scope.
   - World Health Organization: one short attributed quotation of the ICD-11 burnout definition.
   - "Hot Wheels": nominative use of a trademark in a domestic anecdote; no endorsement implied.

7. **Handymen and the black-mold shower.**
   > "The handymen were not wrong about the cost of the repair; they were wrong about the cost of not looking, which they could not have known."
   Why: unnamed tradespeople; no disparagement; explicitly excused. No property address or seller named. From the 2021 edition (pp. 120–121).

8. **Statements about staff and airline rules.**
   "The airline's rule is a design, not a mood" replaces the 2021 claim that abusive passengers are "put on a list, and you're never flying again." V2 asserts only that a rule exists, generically. No airline named.

Nothing in this chapter names the convicted individual, the former spouse, the coaching group, the podcast, or any business entity, and nothing states a dollar figure, a date in the crisis period, or Adrian's current health.

### Chapter 13

No third party is named in this chapter. The convicted individual, the former spouse, the coaching group, the podcast, and any lender or counterparty are absent. No dollar figures appear. The passages below are the ones publishing counsel should still read.

1. **"In the years before the crisis I was adding floors, quickly, in a market where every floor seemed to hold, and I did not go back down to check what the building was standing on. The collapse did the checking for me."**
   Why: a metaphorical admission that Patrick expanded faster than his own diligence supported. It parallels Chapter 10's approved "trust but verify as a sentence he wrote and did not live," but counsel should confirm that a general statement of this kind cannot be read as an admission bearing on any unresolved matter. No transaction, counterparty, or figure is referenced.

2. **"Connect comes first because I did everything in the reverse order, and the reverse order nearly killed me."** and **"A clinician of your own, seen while you are still functioning, is the difference between a diagnosis and an autopsy."**
   Why: suicide-narrative safety review. Neither sentence contains method, date, location, or injury detail. The second is deliberately blunt; a sensitivity reader should confirm it does not read as flippant about suicide.

3. **"In 2021 I had a book, a coaching group, and rooms full of people who wanted what I wanted. That is a great deal of contact and almost no connection."** and **"massive action, taken by a sleep-deprived man in the wrong rooms, is just a bigger error"** and **"The rooms I was elevating in were rooms where everyone's chart pointed the same way."**
   Why: mildly unflattering characterization of an unnamed peer community. No group, program, or person is identified; the criticism is of Patrick's own choice of rooms. Low risk, but counsel should confirm the group is not identifiable from context in combination with other chapters.

4. **"If a clinician you trust recommends medication for your mind, the correct response is the one you would want from your own patient: take it seriously, take it as prescribed, and report back honestly, including about anything else you have been taking, especially the things you prescribed yourself."**
   Why: general health guidance from a physician-author. No drug is named and no diagnosis is claimed. Confirm the front-matter "not medical advice" note is sufficient.

5. **"Make no major financial decisions until the state is better. Do not sell, sign, refinance, or double down. This is the only sentence about money in this chapter that resembles advice, and it is advice to do nothing."**
   Why: generic financial guidance; confirm it sits comfortably under the front-matter disclaimer and Chapter 10's "not personal financial advice" line.

6. **"In the United States, if you are thinking about ending your life, call or text 988. It is free, confidential, and answered at every hour, and you do not have to be sure it is bad enough."[^c13-1]**
   Why: the factual portion follows Bible Section 4 item 11 (SAMHSA), which was confirmed from indexed excerpts only and must be re-verified against the live page before print. The final clause is encouragement, not a description of the service's policy.

7. **"In the first edition, on the same page as a promise to go to the moon, build a real estate empire, and pursue enlightenment at the same time, I wrote this…"**
   Why: reproduces a 2021 boast verbatim ("real estate empire," 2021 PDF p. 71) in a self-critical frame. Not a legal exposure, but the author's Version 2.0 instruction is to avoid real-estate boasting; the editor should decide whether the quotation is acceptable as critique or should be softened to "an empire."

8. **"the board I described two chapters ago, people who can say no to you and are not in your deals"**
   Why: "your deals" is generic second-person advice; confirm it cannot be read as a reference to any specific transaction.

