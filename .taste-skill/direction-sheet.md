# DIRECTION SHEET — Colour chapters
seed 222383801 · drawn 2026-10-16 · sector education · tone bold
Brief: STEM Connect students share hands-on science in Room 2517 at Independence High School in Ashburn

| | |
| --- | --- |
| Direction | Colour chapters |
| Hero | Mosaic masthead, title on axis |
| Type | Switzer |
| Colour | kept from the brand |
| Sections | intro (Edge-to-edge heavy paragraph) → showcase (Square plate, spare text) → features (Mosaic of unlike tiles) → about (Two columns, highlighted words) → cta (The action tile) → footer (Name first, places under it) |
| Motion | Masked headline |
| Photographs | the "People" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Every section is a chapter with its own flat colour, floor to ceiling. The page reads like a set of posters hung in a row, held together by one typeface and one grid. The colours are not decoration: they come from the subject (the brand's packaging, the artist's record sleeves, the product's own colour ways, the categories of the content) and each chapter's colour means that chapter. Decide the sequence like a designer orders a book: a strong opener, a quiet second, a surprise in the middle, a dark or very light closer.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Sections are full-bleed fields, each at least 90svh tall, butted directly against each other with no gap and no divider. Inside every field the same 12-column grid and the same margins apply, and each field holds one thing: a huge heading (8–12vw) with a small paragraph, or one photograph with a caption, or one list. Text colour is chosen per field for strong contrast (ink or paper, never grey). Headings start on the same left edge in every chapter, so the eye feels the system as colours change. The navigation and the footer take the colours of the first and last chapter.

## 3. Type — Switzer
One neo-grotesk doing everything: semibold headings pulled tight, small regular text, no capitals and no second voice. Suits software, hardware and studio pages that want to look exact and unshowy.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap" rel="stylesheet">
```
- Display: **Switzer** — weight 600 · tracking -0.04em · leading 0.95 · sentence case; charcoal rather than pure black
- Text: **Switzer** — 400 for body, 500 for emphasis · leading 1.5 · tracking -0.005em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One typeface in two weights. Headings very large and tight; body 18–20px. Because colour is loud, the type stays plain: no italics, no second face.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. Four to six flat fields used at full strength, one per section, each with its assigned text colour. No tints, no gradients between them: the hard edge where two fields meet is the look.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /private/tmp/stem-taste-skill-upstream/skills/taste-skill/scripts/assets.mjs "room postcard"`, then "room old map" and "share science", then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Sparing. One photograph or object per chapter at most, either cut out and sitting directly on the colour, or a plain rectangle with generous colour around it. Photographs should be simple enough not to fight the field.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "People" set (figures, silhouettes and portraits, mostly unposed)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/685/1600/1000` — Man sitting on a rock looking over a sea of clouds · mid tone · pale gold, grey, dark brown · calm area: right · native landscape · photo: Joshua Earle
- `https://picsum.photos/id/669/1600/1000` — Person in a mustard jacket and grey beanie seen from behind in fog · light tone · mustard, pale grey, white · calm area: left · native landscape · photo: Luke Pamer
- `https://picsum.photos/id/177/1600/1000` — Hiker with a backpack looking over a hazy mountain valley · mid tone · warm tan, hazy gold, olive · calm area: left · native landscape · photo: Danka & Peter
- `https://picsum.photos/id/338/1600/1000` — Person in a hooded coat seen from behind facing a misty sea · mid tone · slate blue, grey, charcoal · calm area: left · native landscape · photo: Patryk Sobczak
- `https://picsum.photos/id/375/1600/1000` — Person in a hooded jacket sitting among white daisies at dusk · dark tone · navy, dark green, white · calm area: top · native landscape · photo: Wellington Sanipe
- `https://picsum.photos/id/550/1600/1000` — Woman seen from behind looking over a blurred city at dusk · mid tone · dusty pink, warm grey, dark brown · calm area: top · native portrait · photo: Christopher Sardegna
- `https://picsum.photos/id/281/1600/1000` — Skateboarder in mid-air at a concrete skatepark with palm trees · mid tone · warm grey, teal, tan · calm area: bottom · native landscape · photo: Victor Erixon
- `https://picsum.photos/id/334/1600/1000` — Man carrying a guitar walking along a foggy beach, monochrome · light tone · light grey, white, charcoal · black-and-white · calm area: top · native landscape · photo: Kimberly Richards
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, interior-and-table, mountain, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Mosaic masthead, title on axis
The top 52% of the viewport is a full-width masthead band built as a gutterless mosaic: a CSS grid of 6 columns and 2 rows in which four cells are photographs (object-fit: cover, all greyscale via filter: grayscale(1) contrast(1.05)) and the rest are flat tiles in two or three palette colours. One photograph spans two columns and one colour tile spans both rows; cells butt together with no gap. The header lies flush on the band's upper edge: the wordmark in a solid ink block at far left, a flat accent-coloured tab holding three text links that runs from the block to 42% of the width, and the single action as a text link at the far right. Below the band, on the paper ground: a standfirst of one sentence at 20px on the 16px left margin, max 30ch, and, starting exactly at 42% of the width, the title on two lines at clamp(64px, 8.3vw, 128px), medium weight, tracking -0.06em, leading 0.9, running to the right margin. The title's first baseline sits about 110px under the band.

On a phone: The band becomes a mosaic of 3 columns and 2 rows taking the top 38% of the screen: two photographs and four colour tiles. The header is a single row above it with the wordmark block and a menu word. The axis collapses to the 16px left margin: the title at 13vw on two lines, then the standfirst at 17px beneath it. The action sits as a text link at the foot of the screen.
Headline: The title of the report, programme or product, 2-5 words, at most 26 characters across two lines.

Adjusted for this page:
- Its action is a text link: the primary action on the first screen is a real button (filled or solid-bordered, 44px or taller), placed where the blueprint puts the link. A second action may stay a link.
- It numbers things 01, 02: drop the numbers unless they are real data (a price, a date, a count).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. intro — Edge-to-edge heavy paragraph (band)
A full-bleed flat colour field, at least 90svh tall, filled by one paragraph and nothing else. The paragraph is 35–55 words in the heaviest weight at clamp(36px, 5vw, 76px), leading 0.98, left-aligned, running from a 16px left margin to a 16px right margin so its lines reach both edges; use `text-wrap: pretty` and no hyphenation. No heading: the paragraph is the section. In two or three places a word-sized gap (an inline-block spacer 2.5em wide) opens inside a line. One small photograph, 9vw wide at 4:5 with square corners, is absolutely placed over the first two lines, rotated 4 degrees, covering parts of two words; a second chip at 6vw may sit in one of the gaps. Text takes the field's assigned ink at full contrast. The field butts against the section above with no space between them. On a page without images, drop the chips and close the gaps.
On a phone: The same field and weight at 9.5vw with leading 1.0 and 14px margins, so each line holds two or three words and the paragraph runs about fourteen lines. Remove the inline gaps. The photograph chip grows to 26vw and sits over the right end of lines three and four, still tilted.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 2. showcase — Square plate, spare text (split)
One flat field split 50/50, at least 88svh tall. Left half: a single square photograph filling the half's width minus 40px margins, vertically centred, square corners. A large simple shape may be laid over it to turn the photograph into the object it stands for: a ring 86% of its width with a 6px stroke and a small solid dot at the centre makes a record; a notch cut by clip-path makes a ticket stub. Right half, a flex column with space-between: at the top a row of three plain text tabs at 18px (editions, years, variants), the active one in full ink and the others at 40%; in the middle the title, two to four words at 32–40px bold, with a 34ch description 48px below; along the bottom two filled rectangular cells side by side, each half the column wide and 72px tall, acting as the two actions, one in ink and one a tone off the field.
On a phone: The square photograph comes first at full width with 16px margins. The tabs sit under it as one row at 17px. Then the title at 28px, the description, and the two action cells stacked, each full width and 60px tall.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 3. features — Mosaic of unlike tiles (mosaic)
A 12-column grid with 8px gaps and rows of 96px, filled with no empty cells and no outlines. Six to eight filled tiles in four sizes only: 6×5, 6×3, 3×3 and 3×2 (columns × rows). The rule that keeps it from being a card grid: no two neighbouring tiles hold the same kind of thing. One tile is the heading alone, two to four words at 4vw, top-left. One is a photograph covering its tile. One is a single figure at 6vw with a caption. One is a short list of four lines at 20px. The others are a single sentence each at 28–32px. Text sits top-left with 24px padding; tiles holding one sentence leave their lower half empty. Tile fills: the ground one tone darker, two palette colours, and photographs. One corner radius everywhere, either 0 or 8px.
On a phone: Two columns with 6px gaps. The heading tile and the photograph tile span both columns; sentence tiles span both at their natural height; the figure and list tiles sit side by side as a pair of squares. Order: heading, photograph, pair, sentence, sentence.

Adjusted for this page:
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 4. about — Two columns, highlighted words (statement)
The story is set as text far larger than anything else on the page: 110–160 words at clamp(22px, 2.1vw, 32px), tight leading 1.18, in the soft ink, flowing through two columns that fill the full width between 24px margins (`columns: 2; column-gap: 32px`, justified, with hyphenation on). No heading. The name at the start is in full ink. Six or seven single words or short phrases carry a flat highlighter background in three or four palette colours, built with an inline `background-color`, `box-decoration-break: clone` and 0.1em of horizontal padding; they mark the facts a scanning reader wants (a place, a year, a client, a skill). The final short sentence is highlighted entire in the strongest colour and is the link to contact. Padding 120px top and bottom. No image and no portrait.
On a phone: One column at 20px, left-aligned and unjustified, leading 1.25, with 18px margins. Keep four or five highlights so no line carries two. The final highlighted sentence sits on its own line with 24px above it and works as a full-width tap target.

### 5. cta — The action tile (grid)
The close is one row of the board. Three filled tiles sit side by side with 8–14px gaps, all 360px tall and sharing one radius: a wide centre tile spanning columns 3–10 in the accent colour, flanked by two narrow tiles (columns 1–2 and 11–12) that run off the left and right viewport edges, as if the row had been cropped from a longer one. The centre tile holds, left-aligned and vertically centred with 40px padding: a heading of three to five words at 40px, two lines at 17px, and the action. The action is either one rectangular button or an email field 420px wide in the paper colour with the submit button nested inside its right end. The flanking tiles hold no text: one is a photograph covering the tile, the other a flat palette colour. No shadows, no outlines.
On a phone: The accent tile runs full width, about 300px tall, heading at 28px, field and button stacked at full width. The two flanking tiles follow beneath as a pair, each half width and 120px tall, with the same gap and the same radius.

Adjusted for this page:
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.

### 6. footer — Name first, places under it (list)
The wordmark opens the footer instead of closing it. On a full-bleed field in the page's inverse or final chapter colour, the name spans the full content width as the first thing, its cap line pushed 8% above the footer's top edge so the tops of the letters are sliced off by the section (`overflow: hidden` and a negative top margin in `em`). 72px beneath, a two-part row: columns 1–5 list the places or ways to reach the studio (cities, or email and telephone), one per line at 32–36px in the accent ink, each a link; columns 7–12 hold three columns of small links at 15px, top-aligned with the first place. A final row 96px lower carries the legal line at the left and a back-to-top text link at the right, both 13px. The field is about 90svh tall, and nothing sits between the wordmark and the row but space.
On a phone: The sliced wordmark stays at the top, fitted to the width. Places follow as a list at 26px, then the link columns two across at 15px. Legal line and back-to-top link share the last row at 12px, at opposite margins.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It crops letters along their top: the inspector fails that (jurors read it as broken). Crop at the bottom edge or a side instead.

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Colour at scale. A whole screen of one saturated colour is rich on its own, so a chapter needs few elements; it still needs its content at full size, because a coloured screen with one small line on it reads as empty.

## 10. How this direction goes wrong
Check contrast on every field with the palette's assigned ink. Do not put cards on the fields. Do not use more than six colours. Two neighbouring fields should differ clearly in lightness as well as hue.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Anidachi** (One Page Love, studied score 7.6) `opl-anidachi`
  Idea: A toy brand built from one custom modular wordmark and one 3D device, both of which change colour with each full-bleed candy-coloured section.
  Hero: A saturated sky-blue field covering the top 92% of the viewport. The custom modular wordmark is repeated in four stacked rows, each spanning the full width inside 30px margins, drawn tone-on-tone in a slightly lighter blue that brightens row by row toward the bottom, so the name works as wallpaper. A tiny white pixel-cat mark sits top-left; a white rounded button with blue text top-right. A 3D flower-shaped toy device hangs on a carabiner from the top edge at centre, barely entered on desktop and fully visible on mobile, where it covers the pattern. A pale ice section starts at the bottom edge.
  Worth taking: Repeat the wordmark as tone-on-tone rows filling the hero, stepping the tint row by row, so the brand name is the background pattern.
- **Warm & Fuzzy** (Awwwards Site of the Day, studied score 7.7) `aww-warm-fuzzy`
  Idea: A showreel-first studio site in which every section takes one flat, loud colour (blue, black, yellow) under heavy grotesk type and a chunky custom wordmark.
  Hero: The showreel plays full-bleed with a visible film-grain overlay and no scrim. A chunky hand-cut wordmark sits top left, 16px from the edges; the same top line continues with a one-sentence status link, a tiny thumbnail beside the latest project's name, and three caps links at the far right, all white over the footage. A small green caps play label floats at dead centre. The tagline is anchored bottom left, 16px from both edges, in white grotesk caps at 47px (3.3vw) on one line spanning 56% of the width. A tiny square pause control sits bottom right.
  Worth taking: Give every section one flat saturated background and change it at each section break, keeping type strictly black or white.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to /Users/tarushvkosgi/.t3/worktrees/igem/t3-8b6e775a/.taste-skill/direction.json · reprint with `node draw.mjs --show`
