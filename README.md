# STEM Connect

Student-led STEM outreach at Independence High School in Ashburn, Virginia. The site uses static HTML, CSS, and JavaScript and runs on GitHub Pages without a bundler or server backend.

## Preview locally

Run `python3 -m http.server 8080` from this directory, then visit `http://localhost:8080/`. The content request requires HTTP, so opening `index.html` directly with `file://` will show the load error state.

## Structure

- `index.html` contains metadata, the favicon, the loading state, and the application entry point.
- `js/app.js` contains the explicit ten-route registry, source-to-content collections, page builders, accessible menu, and hash router.
- `css/styles.css` contains the Square-inspired green, white, and soft-gray design, responsive layouts, focus styles, and reduced-motion support.
- `site-extract.json` preserves source content from the original Independence iGEM site.
- `assets/` contains the STEM Connect mark, real community and historical research photos, the historical team photo, and the outdated support letter.

All original hash destinations remain available. Home, about/join, team, projects, gallery, archived updates, STEM Day, sponsors, donations, and contact appear in the complete navigation. Project links use the same hash router with a `project` query parameter. Unknown routes show a recovery page.

## Content and historical context

STEM Connect no longer competes in iGEM. Three full research descriptions and their original readings are preserved as archived proposals. Four dated updates retain their original wording. The historical team photo comes from the original site with an August 2024 filename. Gallery photos are not assigned to specific event dates without evidence.

STEM Day 2026 is announced for Saturday, November 21 from 10:00 AM to 4:00 PM at Independence High School. The site lists free admission, no sign-up, 20+ hands-on stations, and family-friendly drop-in attendance.

Meetings are listed as Wednesdays after school in room 2517 with a request to confirm the current schedule. The original contact form and STEM Day newsletter remain accessible as clearly labeled links to the hosted Square pages. Instagram remains `independence_igem`. No local form or payment backend is implied.

Donation guidance preserves the legacy check payee “Independence High School iGEM” and school mailing address, with instructions to confirm the current payee and process before mailing. Tax treatment is unverified. The old support letter is explicitly historical.

## Taste Skill design

The current design builds on [Taste Skill v2](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill), upstream commit `f624f37a8c650b9cc550253104925efe4c8de246`. Its green, white, near-black, and soft-gray palette is aligned with the original Square site. A persistent need-to-know strip keeps Room 2517, the Wednesday meeting schedule, and STEM Day details at the top of every route.

The home page interest picker groups eight archived activities into four interests. The full activity descriptions remain on the STEM Day page. Motion respects reduced-motion preferences, and the no-JavaScript fallback includes meeting information and hosted contact links.

The direction, copy deck, critique, and verification reports are in `.taste-skill/`. Generated browser screenshots are ignored. To run the fallback checks, set `TASTE_SKILL_ROOT` to a local copy of the upstream skill and run `node .taste-skill/verify-runtime.mjs http://localhost:8080`.

## Maintenance and checks

Edit current program copy and route presentation in `js/app.js`. Keep original historical copy in `site-extract.json`. The app derives the full project and update collections from that source. Update image captions only when their dates and subjects can be verified.

Run `node --check js/app.js` for JavaScript syntax. Preview all ten routes at desktop and mobile widths, including keyboard navigation, the mobile menu, research jump links, back/forward navigation, unknown routes, and a failed content request. Images have descriptive alt text and an inline failure message. The initial loading state and fetch-error retry work without dependencies.

Relative asset paths and hash navigation support GitHub Pages project paths without rewrite rules. The existing CNAME and publishing workflow are unchanged. The footer retains the original `tarushv.com` credit.
