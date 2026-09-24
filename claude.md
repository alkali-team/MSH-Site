# MHS Site — Next.js + Sanity Rebuild

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Sanity CMS — layered on **after** the static build is approved, not wired from day one
- Design source of truth: Figma (see Figma access below)

## Build order
1. Static Next.js + Tailwind build matching the Figma mockup pixel-perfect — desktop first (1920px frame), then mobile
2. Client review, fix deviations
3. Layer Sanity CMS on top of the approved static build

## Responsive scaling rule
- The Figma desktop frame at **1920px width** is the pixel-perfect reference.
- **Below 1920px down to the mobile breakpoint**: standard fixed responsive behavior (normal Tailwind breakpoints, e.g. `lg:`) — no fluid scaling here.
- **Above 1920px**: uncapped growth, gated by a custom `uw:` variant (`--breakpoint-uw: 120rem` in `globals.css` — **must be `rem` not `px`**, or Tailwind mis-sorts it against `lg`/`xl`/`2xl` in the cascade and it gets silently overridden).
- **Above 1920px there are two families of utilities**, both taking `X` = the element's exact px value in the Figma 1920 frame, both used behind the `uw:` variant:
  - **`uw-*` — grows forever** (plain proportional `vw`, 1:1 with viewport width). A 57px element becomes `2.969vw`: 57px at 1920, 114px at 3840.
  - **`cap-*` — grows, then freezes at `--uw-cap` (2600px)**. Same growth from 1920 to 2600, then stops. `cap-px-122` → 122px at 1920, 165.2px at 2600, still 165.2px at 3840. There is no `@media` breakpoint at the cap — it falls out of a `min()` between the growing `vw` term and a fixed `X * cap / 1920` ceiling. Use this where uncapped growth gets absurd on very wide screens — padding, gaps, side margins. The ceiling lives in one place (`--uw-cap` in `:root`).
  - Both families cover: `-w-`, `-h-`, `-text-`, `-leading-`, `-max-w-`, `-top-`, `-left-`, `-right-`, `-mt-`, `-pt-`, `-px-`, `-gap-`. Add more following the same one-line pattern as needed.
  - **Type uses `uw-*`; everything else uses `cap-*`.** Font sizes and line heights (`uw-text-*`, `uw-leading-*`) keep growing past 2600 so they stay in proportion with the layout around them. Spacing, sizes and positioning stay on `cap-*`, which freezes at 2600. (This reverses an earlier rule that put type on `cap-*` — the user changed it after seeing type fall out of scale on wide screens.)
  - Exceptions signed off so far, don't "fix" them back to `cap-*`:
    - `Header.tsx` keeps a couple of `uw-*` classes on purpose.
    - The hero collage in `home/Intro.tsx` uses `uw-*` **for its width only**. It's a full-bleed graphic: capping the width makes it shrink to ~50% of a 3840px screen instead of holding its 74.7%, leaving it floating small in the middle. Its vertical offset stays on `cap-*`, because that position is relative to the text block above it and the text is capped — the two have to stay in sync.
  - Both families also work **unprefixed** (no `uw:`), which makes them fluid all the way down instead of only above 1920. Required for any value larger than the breakpoint that would activate it — e.g. `lg:w-[1434px]` overflows every window narrower than 1434px.

### The 3840 frame — `xw:` (2560px)
Some sections are designed twice: a 1920 frame and a 3840 one that is a **different composition**, not the 1920 one scaled up (e.g. home's AI Advantage section: heading on top at 1920, heading in a left column at 3840).

- Custom breakpoint `--breakpoint-xw: 160rem` (2560px) switches to the 3840 composition. 2560 is a standard wide-monitor width and sits just under `--uw-cap`, so the 1920 layout hands off right before it would freeze.
- **Above 2560 the sizes are static — no scaling at all.** Use plain arbitrary values taken straight from the 3840 frame (`xw:text-[92px]`, `xw:w-[2830px]`). There is deliberately no vw-based utility family for this range: the whole point of the breakpoint is that the composition changes, not that it keeps growing.
- So the three ranges are: fixed `lg:` values from the 1920 frame → `uw:` scaling between 1920 and 2560 → fixed `xw:` values from the 3840 frame.
- All breakpoints in use: `lg:` 1024 (the 1920 design's values), `uw:` 1920 (scaling), `xw:` 2560 (structural switch).

### Gotchas with these utilities
- They match a **bare integer** only. `uw-top-[-100]` and `rotate-x-10deg` silently generate nothing — Tailwind never warns about a class that doesn't exist, so an element just won't move. `uw-top-100` is the form.
- Negatives are a separate utility with the dash in front: `-uw-top-100`, not `uw-top--100`. Capped negatives must use `max()` rather than `min()` — with negative numbers the ceiling is the larger value.
- Don't write `*/` inside a CSS comment in `globals.css` (e.g. spelling a pair of families as `uw-*/cap-*`) — it closes the comment early and breaks the file.
- A custom faster-than-linear growth formula was tried and **rejected** — don't reintroduce it as the default. It was fit from two guessed/eyeballed target sizes (not real Figma data): 57px→135.65px (1920→3840) for one element implied a ~2.38x growth factor at 3840, but a second element's guessed target (1434px→2721px) implied a DIFFERENT, slower-than-linear factor (~1.9x) — proving there's no single universal growth curve across different elements, just imprecise guessing. The formula is still defined in `globals.css` as `uw-w-<X>` / `uw-h-<X>` / `uw-text-<X>` utilities (not deleted, kept in case a specific element ever gets a real, confirmed (not eyeballed) target size at a specific width) — but it is NOT the default; use plain `vw` values unless told otherwise for a specific element.
- Mobile is a **separate Figma frame/layout**, not a scaled-down version of desktop.
- Exact mobile breakpoint width: TBD, pending inspection of the Figma mobile frame.

## Component structure & conventions

**Flex first. Keep it simple. Don't over-engineer.** This is the single most important rule here, and the one most often broken.

- Build every layout out of plain flex (`flex`, `items-center`, `flex-1`, `justify-between`, `ml-auto`) before reaching for anything else.
- **Don't abuse `absolute`.** It is for decorative elements anchored to a box — a sparkle in a figure's corner, an orb bleeding over a section edge. Everything structural stays in normal flow. A section built out of absolutely positioned pieces is a section that will break at the next width you try.
- **No compensating offsets.** If a layout only lands by adding negative margins or hand-computed `mr`/`mt` nudges, the structure underneath is wrong — fix the structure instead. Real example: AeonHire was built with `-cap-ml-238`, `cap-mr-75` and `items-start`; deleting all three and switching to `items-center` matched Figma *better*.
- **Two blocks that overlap in the Figma frame usually don't really overlap.** Check whether the overlapping part is just a transparent glow on an image. If it is, let the image overflow its own flex column (`w-[N%] max-w-none` — `max-w-none` is needed to defeat Tailwind's preflight `img { max-width: 100% }`) instead of absolutely positioning both blocks.
- **Every section uses the same 100px horizontal padding** (`cap-px-100`) — don't read it off each Figma frame. The frames vary (100, 122, 126, 196 across four sections) because they were laid out by hand; the site needs one consistent gutter.
- **Collapse redundant classes**: `cap-px-100`, never `cap-pl-100 cap-pr-100`.
- **Round Figma's slop.** The frames were laid out by hand, so mirrored values often differ by a few px (a card 100 from the left edge and 97 from the right, three columns at 23.86% / 27.94% / 26.68%). Pick one round number and use it on both sides — nobody can see 3px, and a symmetric value is far easier to maintain than three near-identical ones.
- **A `@container` element cannot query itself.** `cqw` written on the same element that declares `@container` silently escapes to the nearest *ancestor* container — and if there is none, to the viewport. On AeonHire's features card `gap-[11cqw]` rendered as 11% of the window (422px at 3840) instead of the intended 120px. Sizes on the container's own box must use another unit; only its children may use `cqw`.
- **`cqw` resolves against the container's *content box*, not its border box.** If the `@container` element has its own padding, divide by the inner width, not the full width. Getting this wrong makes everything inside come out uniformly too small with no obvious cause — on AeonHire's features card it produced 50px type where the design called for 57px, because the card is 1243px wide but only 1092px inside its padding.
- If a custom utility ends up unused after a refactor, delete it.

Drawn from the user's own coding style on a past project (`Railroad live/template-parts/blocks/`), adapted to Next.js/React:

- **Markup pattern**: each section is `<section>` wrapping a `<div className="container ...">` that holds the actual content + Tailwind utility classes. One section component = one `<section>`.
- **Header comment per component**, documenting:
  - Block name
  - Figma node reference (e.g. `Figma: node 1:7499`)
  - Expected dynamic fields once Sanity is wired up (our equivalent of the reference project's "ACF fields" comment) — e.g. `heading (text)`, `cta (link)`, even though for now they're hardcoded strings.
- **Utility-first Tailwind directly in JSX**, arbitrary values (`text-[42px]`) when a Figma pixel value doesn't match Tailwind's default scale — same instinct as the reference project.
- **Important deviation from the reference project**: its `.container` uses a fixed `max-width` (823px) — a capped-width design. **We can't copy that** — our confirmed rule is uncapped `vw` scaling above 1920px, so our container must stay percentage/`vw`-based with no `max-width` ceiling, or it would defeat the whole point of scaling up on ultra-wide monitors.
- Reference project used fixed px breakpoints (`text-[48px] lg:text-[96px]`); ours will look similar in spirit but the actual values come from the `vw` formula (`px_in_mockup / 1920 * 100`) instead of fixed px per breakpoint, per the Responsive scaling rule above.

## Figma access
- Personal access token lives in `.env.local` as `FIGMA_API_KEY` — gitignored, never committed, never placed in this file.
- Used directly against the Figma REST API (`api.figma.com`), not the claude.ai Figma OAuth connector.
- Note: the file is one large flat canvas (2900+ loose nodes on a single page, no organized frame/section structure or published Figma styles) — page mockups and reference/moodboard images are mixed together at different canvas coordinates. Locate things by node-id link the client gives you, not by browsing structure.

## Brand — Colors & Fonts
Source: reference image embedded in the Figma file (node `1:3962`), read pixel-by-pixel since it's a flat screenshot, not native Figma styles/variables.

**Fonts:**
- **Avenir is the default font for everything** — set it as the base `font-sans` in Tailwind config so every element gets it unless overridden. Confirmed by inspecting the actual Home frame (`1:7499`): H1, body copy, buttons, stat numbers, ALL-CAPS card labels — all Avenir, at weights 300/400/800.
- **Arimo is opt-in only**, applied via a specific Tailwind utility class (e.g. `font-arimo`), never a default. In the Home frame it's always weight 700 (bold), used specifically for short punchy "statement" headlines/taglines (e.g. "Why MSH", "AI is not their reliance." / "It's their advantage.") — not tied to a particular HTML tag, just that content style. One exception seen: a small italic disclaimer line also used Arimo (400, italic).
  Arimo is a **Google Font** — no local font files needed, load it directly (e.g. `next/font/google` once the project is scaffolded).
- TT Hoves — not in scope until we actually run into it while building a specific page/frame. Don't chase it down or bring it up proactively.

**Avenir font files** at `src/fonts/avenir/Avenir-<Weight>.ttf` (Light, Book, Regular, Medium, Heavy, Black — `.ttf` only, no `.woff2` yet, consider converting for web perf later). Load with `next/font/local`.

Exact `font-weight` values, taken directly from the Figma text styles (not guessed) so weights match pixel-perfect:

| CSS `font-weight` | File | Used on Home? |
|---|---|---|
| 300 | Avenir Light | yes |
| 400 | Avenir Regular | yes |
| 500 | Avenir Medium | not yet seen |
| 800 | Avenir Heavy | yes |
| 900 | Avenir Black | not yet seen |

**Avenir Book (350) not needed** — client confirmed, despite 4 instances of it turning up in the raw Home frame text styles (likely a mistake in the Figma file, not an intentional weight). Treat any text found styled as Avenir 350/Book while building as Regular (400) instead, unless told otherwise.

Note: 800/900 aren't standard Tailwind weight tokens (`font-normal`=400, `font-bold`=700, etc.) — will need arbitrary values (`font-[800]`) or custom weight tokens in Tailwind config rather than the defaults.

**Heading tags vs. fonts are independent decisions** — don't pick the HTML tag (`h1`/`h2`/`h3`/`p`) based on which font a text uses. The tag follows the page's semantic/structural outline (one `h1`, `h2` per section, `h3` for sub-headings or card titles within a section, `p` for body/captions); the font is just a visual style applied on top via a class, regardless of tag. Confirmed example: card titles in the same row use different fonts ("PREDICTIVE FIT SCORING" in Avenir 800 vs. "Real-Time Insights." in Arimo 700) despite being the same tag level. Large stat numbers (e.g. "500+ Hires") and testimonial quotes are visually big but are NOT headings — use `p`/`blockquote`, not `h2`/`h3`, to keep the document outline accessible/correct.

**Colors:**
| Swatch | Hex |
|---|---|
| Primary blue (large) | `#233298` |
| Primary navy, dark (large) | `#101055` |
| Periwinkle | `#496FF4` |
| Mid blue | `#293EB3` |
| Dark navy (small) | `#202E88` |
| Sky blue | `#4C9CDE` |
| Purple | `#8036AB` |
| Magenta / pink | `#AB4295` |

No usage roles (primary/secondary/accent/error, etc.) confirmed yet — TBD once we see them applied across real page frames.

## Pages in scope
- Home
- About — has an expanding-panel/click animation (variants shown by client are examples, not final)
- Solutions
- Industries
- Services — client showed alternate ways of presenting this content
- Case studies (template) — still a wireframe, lower priority

## Notes
- Some UI elements in the mockup are graphics/images rather than real components (e.g. a button that's actually an image) — recreate visually close by default; ask if an exact asset/export is needed.
- Not all frames in Figma are cropped to 1920 — build a 1920 frame and drop content into it, since blur/bleed effects are intentionally cut at the frame edge.
- Nav expands on click.
