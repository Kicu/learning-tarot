# Working Notes

## Teaching preferences (stated 2026-07-30)
- **Prose style (added 2026-08-01):** `writing-style.md` at the repo root governs all lesson prose. Flowing sentences over staccato fragments; avoid "Here is X and it is not Y" and "This is Z: it does A, it does B" patterns. When revising existing text, change no more than ~25–30% of it.
- **Examples must be concretely anchored (2026-08-08, lesson 3 feedback):** "A job lives in Wands when the question is about fire" confused him — a bare noun plus stacked metaphors plus parallel clauses. Write examples as "take your own job: when X bothers you → Wands; when it's really about salary → Pentacles". One example fully spelled out beats two compressed parallel ones.
- **Verify every external link before citing it** (2026-08-01: caught a fabricated sacred-texts preface URL in lesson 1). sacred-texts.com sits behind a Cloudflare challenge — check its URLs via the Wayback Machine, not curl.
- **Framing: "both, kept labelled."** Teach the esoteric system properly — it is what the cards actually encode — but always flag what is documented history vs. later invention. This is a hard requirement, not a stylistic preference. Every lesson uses the two-callout convention below.
- Owns a physical RWS deck → every lesson should include a hands-on step with the real cards.
- Wants the *why* behind meanings, not lookup-table memorisation. "Say what it means and why it means that" is the mission's load-bearing phrase.

## Callout convention (structural, do not drop)
Two visually distinct callouts carry the labelling requirement:
- `.callout.documented` — claims backed by dated documentary evidence. Cite the source.
- `.callout.invented` — claims that are tradition, invention, or assertion. Say who asserted it and when.

## Canonical naming decisions
Not yet promoted to `GLOSSARY.md` — glossary entries are only added once Mateusz can *use* a term correctly. These are my consistency rules in the meantime:

| Use | Avoid | Why |
|---|---|---|
| Rider–Waite–Smith (RWS) | Rider-Waite | Smith drew all 78 cards; standard modern practice credits her. |
| trumps / Major Arcana | Majors (informal only) | "Trumps" is the historically accurate term and reveals the game origin. |
| suit cards / Minor Arcana | Minors, pips | "Pip" is reserved for the *unillustrated* pre-1909 number cards — a real distinction. |
| trionfi | tarocchi | The 15th-c. word in the earliest documents. |

**Polish terms (2026-08-08):** `reference/polish-glossary.html` is the canonical Polish vocabulary, built at Mateusz's request. Headwords chosen there: Buławy / Kielichy / Miecze / Denary for suits, Najwyższa Kapłanka for II (RWS naming, not Papieżyca), Siła at VIII per the deck in hand. If a lesson ever gives a Polish term, it must match that file.

## Lesson arc (provisional)
1. **Where tarot comes from** — three historical layers; the Magician as case study. ← built
2. **Deck anatomy** — 22 + 56, the four suits and their elements, court ranks. Hands-on sorting. ← built (with `reference/deck-map.html`)
3. **The four suits as four kinds of problem** — Wands/Cups/Swords/Pentacles; how suit alone constrains meaning. ← built (kind-not-topic is the load-bearing idea; work = Wands vs Pentacles, love = Cups vs Swords pairs)
4. **Numbers 1–10 as a narrative arc** — read a suit card you have never seen from number + suit alone. ← built (ten-chapter table; fives/sixes/tens titles as evidence; Six of Swords as the worked prediction). Revised 2026-08-09 at Mateusz's request: chapter names are now the order's own words (Ace "root" from Book T; 2–10 from the Sub Spe manuscript: Initiation, Resultant, Realization, Opposition, Accomplishment, Skill and courage, Solitary success, Fundamental force, Completed force), the table carries a Sephira column (Kether · Crown … Malkuth · Kingdom), and row 1 is labelled Ace. He prefers traditional sourcing over my invented teaching labels — keep that in mind for future tables.
5. **Court cards** — the four ranks as postures toward the suit's material.
6. **Trumps I–XI** then **XII–XXI + Fool** — in two lessons, using the layer decoder.
7. **Reversals** — and the honest case that they are optional. Waite's own position.
8. **Three-card spreads** — position as grammar. First full reading.
9. **Celtic Cross** — Waite's own spread, from Pictorial Key.
10. **Reading aloud** — narrative construction, hedging language, the ethics of not predicting.

## Maintenance
- `index.html` at the repo root is the course home page (added 2026-08-08). It lists all lessons (built + planned arc, with an "Up next" marker) and all reference sheets. **Update it whenever a lesson or reference is added**, and move the "Up next" tag. Every lesson/reference footer nav carries a "Course home" link back to it.

## Open questions to revisit
- Does he want reversals at all? Many strong readers skip them. Ask at lesson 7.
- Community: r/tarot suggested 2026-08-11, prompted by his question on how suit mood weighs on a live reading (learning record 0003). No response yet — don't push, but if he mentions visiting, ask what surprised him.
