(function () {
  "use strict";

  const INSTAGRAM = "https://www.instagram.com/independence_igem/";
  const CONTACT = "https://independenceigem.square.site/contact-us";
  const NEWSLETTER = "https://independenceigem.square.site/stem-day";
  const VOLUNTEER_SIGNUP = "/signup/";
  const ADDRESS = "23115 Learning Circle, Ashburn, VA 20148";
  const CONFIRM_MEETING = "Please confirm the current meeting schedule with the team before visiting.";
  const STEM_DAY_DATE = "November 21, 2026";
  const STEM_DAY_TIME = "10:00 AM–4:00 PM";
  const PHOTOS = [
    { src: "stem-day-2026-station.webp", src400: "stem-day-2026-station-400.webp", src800: "stem-day-2026-station-800.webp", src1400: "stem-day-2026-station-1400.webp", alt: "Student volunteers guiding a young visitor through a hands-on science station", caption: "Students sharing hands-on science.", group: "Community archive", width: 1600, height: 1200 },
    { src: "stem-day-2026-face-painting.webp", src400: "stem-day-2026-face-painting-400.webp", src800: "stem-day-2026-face-painting-800.webp", src1400: "stem-day-2026-face-painting-1400.webp", alt: "Fossil dig trays beside a student volunteer in a dinosaur costume", caption: "Fossil trays and a prehistoric visitor.", group: "STEM Day archive", width: 1600, height: 1200 },
    { src: "stem-day-2026-fossils.webp", src400: "stem-day-2026-fossils-400.webp", src800: "stem-day-2026-fossils-800.webp", src1400: "stem-day-2026-fossils-1400.webp", alt: "Student volunteers at a face-painting table with a handmade National Art Honor Society sign", caption: "A creative corner at STEM Day.", group: "STEM Day archive", width: 1600, height: 1200 },
    { src: "stem-day-2026-poster.webp", src400: "stem-day-2026-poster-400.webp", src800: "stem-day-2026-poster-800.webp", src1600: "stem-day-2026-poster-1600.webp", alt: "A handmade STEM Day welcome poster outside Independence High School, reading 'STEM Day · 9–3 · Free entry'", caption: "An invitation to get curious.", group: "Event materials", width: 1200, height: 900 },
    { src: "archive-1.webp", src800: "archive-1-800.webp", alt: "Blue gloved hands forming a heart in front of an Indy Nation shirt", caption: "An Indy Nation welcome from the laboratory.", group: "Historical iGEM gallery", width: 1120, height: 840 },
    { src: "archive-2.webp", src800: "archive-2-800.webp", alt: "Gloved hands handling a laboratory bottle beside colorful sample tubes", caption: "Samples and equipment at the lab bench.", group: "Historical iGEM gallery", width: 1120, height: 1400 },
    { src: "archive-3.webp", src800: "archive-3-800.webp", alt: "Gloved hand connecting a cable to an illuminated gel electrophoresis tank", caption: "Connecting the gel electrophoresis tank.", group: "Historical iGEM gallery", width: 1120, height: 1120 },
    { src: "archive-4.webp", src800: "archive-4-800.webp", alt: "A gloved hand using a micropipette above laboratory sample tubes", caption: "Practising with a micropipette.", group: "Historical iGEM gallery", width: 1120, height: 1400 },
    { src: "archive-5.webp", src800: "archive-5-800.webp", alt: "A student pipetting at a school laboratory bench with electrophoresis equipment", caption: "A student working at the laboratory bench.", group: "Historical iGEM gallery", width: 998, height: 755 },
  ];
  const STEM_ACTIVITY_HIGHLIGHTS = [
    {
      title: "Hovercraft + Paper Airplane Lab",
      body:
        "Young visitors experiment with lift, drag, balance, and thrust by building simple flyers and testing how design changes affect flight time, height, and control.",
      teaser: "Experiment with lift, drag, balance and thrust by building simple flyers.",
    },
    {
      title: "Water Wonders",
      body:
        "A playful chemistry station explores polarity, surface tension, capillary action, and solubility through penny-drop tests, color-mixing challenges, and water movement demos.",
      teaser: "Polarity, surface tension and solubility in penny-drop and color-mixing demos.",
    },
    {
      title: "Chemical Reactions Corner",
      body:
        "Color changes, precipitation reactions, and safe dry-ice demonstrations help students see how scientists recognize when a reaction is happening and why timing matters.",
      teaser: "Color changes, precipitation reactions and safe dry-ice demonstrations.",
    },
    {
      title: "Strawberry DNA Bracelets",
      body:
        "Kids help mash, filter, and separate strawberry DNA, then take home a tiny bracelet keepsake that turns a big genetics idea into something tangible.",
      teaser: "Mash, filter and keep strawberry DNA as a bracelet.",
    },
    {
      title: "Microscopes, Fossils, and Nature Stations",
      body:
        "From bug observations and fossil digs to plant propagation and ocean-themed activities, these stations connect biology, Earth science, and curiosity-driven discovery.",
      teaser: "Fossil digs, bug observations and nature stations.",
    },
    {
      title: "Engineering + Coding Challenges",
      body:
        "Visitors can tinker with micro:bits, try BattleBots-inspired design ideas, explore cyber puzzles, and see how problem-solving and iteration power modern technology.",
      teaser: "Tinker with micro:bits, BattleBots-inspired designs and cyber puzzles.",
    },
    {
      title: "Health + Public Science",
      body:
        "Interactive demos on heart rate, blood pressure, and Glo Germ hygiene show how science supports everyday health decisions in ways students can measure for themselves.",
      teaser: "Heart rate, blood pressure and Glo Germ hygiene demos you can measure.",
    },
    {
      title: "Make-and-Take Creativity",
      body:
        "Cloud clay, jellyfish salt painting, and environmental filter-building bring an artistic, hands-on finish to the day while still tying back to real scientific concepts.",
      teaser: "Cloud clay, jellyfish salt painting and environmental filter-building.",
    },
  ];

  const ROUTES = [
    { id: "home", label: "Home", title: "Home", build: homePage },
    { id: "about-igem", label: "About", title: "About & join", build: aboutPage },
    { id: "our-team", label: "Team", title: "Our people", build: teamPage },
    { id: "our-projects", label: "Research", title: "Research archive", build: projectsPage },
    { id: "photo-gallery", label: "Gallery", title: "Photo gallery", build: galleryPage },
    { id: "progress-and-updates-blog", label: "Updates", title: "Updates archive", build: updatesPage },
    { id: "stem-day", label: "STEM Day", title: "STEM Day", build: stemDayPage },
    { id: "sponsors", label: "Sponsors", title: "Our supporters", build: sponsorsPage },
    { id: "donations", label: "Donate", title: "Support curiosity", build: donationsPage },
    { id: "contact-us", label: "Contact", title: "Get in touch", build: contactPage },
  ];
  let collections;

  function escape(text) {
    return String(text).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function paragraphs(text) {
    return text.split(/\n\s*\n/).filter(Boolean).map((part) => `<p>${escape(part)}</p>`).join("");
  }

  const INTERESTS = [
    { id: "life", label: "Living things", items: [3, 4], photo: 1 },
    { id: "chemistry", label: "Chemistry", items: [1, 2], photo: 5 },
    { id: "engineering", label: "Making & coding", items: [0, 5], photo: 7 },
    { id: "everyday", label: "Art & everyday science", items: [6, 7], photo: 2 },
  ];

  function link(route, label, className = "text-link") {
    return `<a class="${className}" href="#/${route}">${label}</a>`;
  }

  function external(href, label, className = "text-link") {
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
  }

  // Placement sizes (measured from the r8 captures at a 1440px viewport):
  // default/wide — gallery, lightbox-style and other large placements keep
  // "(max-width: 700px) 100vw, 90vw". Masthead small tiles b/c/d render at
  // ~430px (~30vw) on desktop and at most half width on small screens, so
  // they pass "(max-width: 700px) 50vw, 30vw". The interest photo and the
  // community-board photo render at ~40vw on desktop but full width on
  // mobile, so they pass "(max-width: 700px) 100vw, 40vw". Masthead photo A
  // spans two of the masthead's columns (~33vw desktop, ~60vw on the small
  // 3-column grid), the gallery's narrow (3n+2) slots render at ~438px
  // (~30vw) on desktop and stack full-width on mobile, and each photo-duo
  // slot is half the row on desktop and full-width on mobile. R11: the
  // join-strip image column is 2 of the chapter's 12 columns (~16vw), the
  // two-column reading/story/event placements render at ~46–50vw, and the
  // research aside sits in the 42fr column minus its padding (~38vw).
  // Masthead photo D spans columns 4–7 of 6, i.e. ~50vw on desktop.
  function photo(index, className = "", eager = false, suppressPriority = false, decorative = false, suppressGroup = false, sizes = "(max-width: 700px) 100vw, 90vw") {
    const item = PHOTOS[index];
    const candidates = [];
    if (item.src400) candidates.push(`assets/${item.src400} 400w`);
    if (item.src800) candidates.push(`assets/${item.src800} 800w`);
    if (item.src1400) candidates.push(`assets/${item.src1400} 1400w`);
    if (item.src800) candidates.push(`assets/${item.src} ${item.width}w`);
    if (item.src1600) candidates.push(`assets/${item.src1600} 1600w`);
    const srcset = candidates.length ? ` srcset="${candidates.join(", ")}" sizes="${sizes}"` : "";
    return `<figure class="photo ${className}"><div class="photo-frame"><img src="assets/${item.src}"${srcset} alt="${decorative ? "" : escape(item.alt)}" width="${item.width}" height="${item.height}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager && !suppressPriority ? ' fetchpriority="high"' : ""} /></div><figcaption>${item.caption}${suppressGroup ? "" : ` ${item.group}.`}</figcaption></figure>`;
  }

  function firstSentence(text) {
    const trimmed = String(text).trim();
    const match = trimmed.match(/^[^.!?]+[.!?]/);
    if (!match) return trimmed;
    const first = match[0].trim();
    // Update bodies open with a greeting ("Happy June!") — the standfirst is
    // the first content sentence after it, not the greeting itself.
    if (/^happy\b/i.test(first) && first.split(/\s+/).length <= 4) {
      const rest = trimmed.slice(match[0].length).trim();
      const next = rest.match(/^[^.!?]+[.!?]/);
      if (next) return next[0].trim();
    }
    return first;
  }

  function heading(title, intro, tone = "paper", cta = "", headerClass = "") {
    return `<header class="page-intro field ${tone}${headerClass ? ` ${headerClass}` : ""}"><div class="wrap"><h1 tabindex="-1">${title}</h1><p class="lede">${intro}</p>${cta}</div></header>`;
  }

  function joinStrip() {
    return `<section class="join-chapter field lime"><div class="join-image">${photo(3, "", false, false, false, false, "(max-width: 700px) 100vw, 16vw")}</div><div class="join-copy"><h2>See you in 2517</h2><p>Wednesdays after school at Independence High School. Bring your interests. No research background needed.</p>${link("about-igem", "Join the club", "button-link")}<p class="note">Confirm the current meeting schedule before visiting.</p></div></section>`;
  }

  function masthead() {
    // Photo A (the station scene) is NOT decorative here: its content
    // appears nowhere else on the home page, so it carries the same alt
    // text it has in the gallery (PHOTOS[0].alt). The other masthead
    // tiles stay decorative (alt="").
    return `<div class="masthead">${photo(0, "mast-photo-a", true, false, false, false, "(max-width: 700px) 60vw, 33vw")}<div class="room-tile"><p class="room-number">Room<br>2517</p></div>${photo(1, "mast-photo-b", false, true, true, false, "(max-width: 700px) 50vw, 30vw")}${photo(6, "mast-photo-c", false, true, true, false, "(max-width: 700px) 50vw, 30vw")}${photo(3, "mast-photo-d", false, true, false, false, "(max-width: 700px) 50vw, 50vw")}</div>`;
  }

  function activityResult(interest) {
    return `<div class="interest-photo">${photo(interest.photo, "", false, false, false, false, "(max-width: 700px) 100vw, 40vw")}</div><div class="interest-stories">${interest.items.map((index) => `<article><h3>${STEM_ACTIVITY_HIGHLIGHTS[index].title}</h3><p>${STEM_ACTIVITY_HIGHLIGHTS[index].teaser || STEM_ACTIVITY_HIGHLIGHTS[index].body}</p></article>`).join("")}<p class="note">From our activity planning archive. The 2026 station lineup may vary.</p>${link("stem-day", "Explore all activities", "text-link chapter-link")}</div>`;
  }

  function activityBrowser() {
    return `<section class="interest-chapter field forest"><div class="wrap"><div class="chapter-top"><h2>Find your experiment</h2><p>Pick an interest. Explore real activities from our STEM Day planning archive.</p></div><div class="interest-controls" role="group" aria-label="STEM interests">${INTERESTS.map((interest, index) => `<button type="button" data-interest="${interest.id}" aria-pressed="${index === 0}">${interest.label}</button>`).join("")}</div><div id="activity-results" class="interest-result" aria-live="polite" aria-atomic="true">${activityResult(INTERESTS[0])}</div></div></section>`;
  }

  function homePage() {
    return `<section class="home-hero field paper"><div class="hero-bottom wrap"><h1 tabindex="-1"><span class="line"><span>STEM</span></span> <span class="line"><span>Connect</span></span></h1><div class="hero-intro"><p>Student-led science and outreach at Independence High School in Ashburn, Virginia.</p><div class="hero-links">${link("about-igem", "Join the club", "button-link")}${link("stem-day", "STEM Day 2026", "button-link secondary")}<a class="text-link hero-volunteer" href="${VOLUNTEER_SIGNUP}">Volunteer at STEM Day</a></div></div></div>${masthead()}</section>
      <section class="statement-chapter field sage"><div class="wrap"><p class="brand-statement">Connecting students through STEM. Inspiring the next generation.</p><div class="statement-bottom"><p>We take the questions we ask after school and turn them into hands-on discoveries for younger learners.</p>${link("our-team", "Meet our people", "text-link chapter-link")}</div></div></section>
      ${activityBrowser()}
      <section class="community-board field paper"><div class="board-heading"><h2>From our room<br>to the community</h2></div><div class="board-photo">${photo(6, "", false, false, false, false, "(max-width: 700px) 100vw, 40vw")}</div><div class="board-room"><p class="room-number">New faces welcome</p><p>No experience needed. Bring a question.</p>${link("about-igem", "Come along", "text-link chapter-link")}</div><div class="board-list"><p>Design an activity.<br>Mentor a younger learner.<br>Welcome a family.<br>Try something new.</p></div><div class="board-story"><p>We began as Independence iGEM. Today, STEM Connect focuses on outreach.</p>${link("our-projects", "Read our research history", "text-link chapter-link")}</div></section>
      ${joinStrip()}`;
  }

  function aboutPage() {
    return `${heading("Science,<br>shared", "A student-led outreach community at Independence High School in Ashburn, Virginia.", "sage")}
      <section class="field paper story-split wrap"><div class="reading"><h2>A place to explore</h2><p>STEM Connect creates opportunities to explore science, technology, engineering, and math together.</p><p>Our focus is hands-on discovery, community outreach, and student leadership. We plan interactive activities, mentor younger learners, and make room for different interests and experience levels.</p><p>Formerly Independence iGEM, we no longer compete in iGEM. Our earlier research remains here as a record of the work that shaped us.</p>${link("our-projects", "Read our research history", "text-link chapter-link")}</div>${photo(4, "", false, false, false, false, "(max-width: 700px) 100vw, 46vw")}</section>
      <section class="meeting-chapter field forest wrap"><h2>Room 2517</h2><div><p class="lede">Wednesdays after school.<br>Independence High School.</p><p>No research background needed. Explore activity planning, mentoring, and hands-on science with other students.</p><p>${CONFIRM_MEETING}</p>${link("contact-us", "Contact the team", "button-link")}</div></section>
      <section class="archive-chapter field cream wrap"><h2>Our iGEM beginnings</h2><div class="reading"><p class="note">The original introduction and interest-meeting notice below are historical. STEM Connect no longer competes in iGEM.</p><details class="source-detail"><summary>Read the original Independence iGEM introduction</summary>${paragraphs(collections.about[1])}<h3>Past interest meeting</h3>${paragraphs(collections.about[2])}</details></div></section>`;
  }

  function teamPage() {
    return `${heading("Our people", "Students, makers, mentors and question-askers. A community built by showing up for each other.", "sage")}
      <section class="team-chapter field forest wrap"><figure class="photo team-photo"><div class="photo-frame"><img src="assets/team-2024.webp" width="639" height="314" alt="Historical Independence iGEM team together on the school bleachers" loading="lazy" /></div><figcaption>The Independence iGEM team on the school bleachers, from the August 2024 archive.</figcaption></figure><div class="team-story"><h2>Bring what you love</h2><p>From designing an activity and explaining an idea to welcoming families, there are many ways to contribute. Bring the skills you have and make space for something new.</p>${link("about-igem", "Join the club", "button-link")}</div></section>
      <section class="archive-chapter field cream wrap"><h2>Where we started</h2><div class="reading"><p class="note">The original team description below reflects past membership and competition plans.</p><details class="source-detail"><summary>Read the original Independence iGEM team page</summary>${paragraphs(collections.team)}</details></div></section>`;
  }

  function projectsPage() {
    const shortTitles = ["Innate immunity", "Lyme vaccine", "Gene drives"];
    const pictures = [6, 7, 5];
    const ledes = [
      "Non-toxic treatments for an innate immune system whose memory drives chronic inflammation — in obesity, atherosclerosis, sepsis and some cancers.",
      "An mRNA vaccine for Lyme disease, building on the University of Pennsylvania's 2023 design.",
      "An engineered bacterium that mimics Wolbachia, the insect symbiont — proven first in fruit flies — to break Lyme transmission.",
    ];
    return `${heading("Research archive", "Three proposals from our Independence iGEM years. Our focus today is community outreach.", "sage")}
      <div class="archive-summary wrap field paper"><p>The original plans below retain their historical wording. They describe proposals, not current research or established results.</p><nav class="project-index" aria-label="Research on this page">${collections.projects.map((project, index) => link(`our-projects?project=${project.id}`, shortTitles[index], "text-link chapter-link")).join("")}</nav></div>
      ${collections.projects.map((project, index) => `<article class="research-article${index > 0 ? " research-article--disclosed" : ""} field ${["cream", "sage", "paper"][index]} wrap" id="${project.id}"><div class="research-aside"><h2>${shortTitles[index]}</h2>${photo(pictures[index], "", false, false, false, false, "(max-width: 700px) 100vw, 38vw")}<p>${project.period}</p></div><div class="reading"><p class="lede">${ledes[index]}</p>${index === 0 ? `<p class="original-title">${escape(project.title)}</p>` : ""}${index === 0 ? paragraphs(project.body) : `<details class="history-disclosure source-detail"><summary>Read the full proposal</summary>${paragraphs(project.body)}</details>`}${index === 0 ? `<div class="readings"><h3>Readings & credit</h3>${external("https://doi.org/10.1161/CIRCRESAHA.124.325023", "Circulation Research · DOI 10.1161/CIRCRESAHA.124.325023")}${external("https://www.science.org/doi/10.1126/science.adf6582", "Science · DOI 10.1126/science.adf6582")}${external("https://li.biol.vt.edu/", "Original image credit · Li Laboratory, Virginia Tech")}</div>` : ""}</div></article>`).join("")}
      <div class="archive-close field lime wrap">${link("progress-and-updates-blog", "Read the original updates", "text-link chapter-link")}</div>`;
  }

  function galleryPage() {
    const groups = ["Community archive", "STEM Day archive", "Event materials", "Historical iGEM gallery"];
    const groupIds = ["gallery-community", "gallery-stem-day", "gallery-event-materials", "gallery-historical"];
    return `${heading("Science, in company", "Real school science and outreach, from our community and research archive.", "sage")}
      <div class="gallery-index wrap" role="group" aria-label="Gallery sections">${groups.map((group, index) => `<button type="button" data-scroll-target="${groupIds[index]}">${group}</button>`).join("")}</div>
      ${groups.map((group, index) => `<section class="gallery-group field paper wrap" id="${groupIds[index]}" tabindex="-1"><h2>${group}</h2><div class="gallery-grid">${PHOTOS.map((item, photoIndex) => {
        if (item.group !== group) return "";
        const slot = PHOTOS.slice(0, photoIndex).filter((entry) => entry.group === group).length;
        return photo(photoIndex, "", false, false, false, true, slot % 3 === 1 ? "(max-width: 700px) 100vw, 30vw" : slot % 3 === 2 ? "(max-width: 700px) 100vw, 95vw" : "(max-width: 700px) 100vw, 63vw");
      }).join("")}</div></section>`).join("")}`;
  }

  function updatesPage() {
    return `${heading("How we got here", "Four original updates from Independence iGEM. Meeting invitations, events and competition plans are historical.", "sage")}
      <div class="timeline">${collections.updates.map((update, index) => `<article class="update-entry${index > 0 ? " update-entry--archive" : ""} field cream wrap"><div><h2>${update.heading}</h2><p class="update-date">${escape(update.date)}</p></div><div class="reading">${index === 0 ? `${paragraphs(update.body)}${photo(8, "photo--balanced", false, false, false, false, "(max-width: 700px) 100vw, 50vw")}` : `<p>${escape(firstSentence(update.body))}</p><details class="source-detail"><summary>Read the full update</summary>${paragraphs(update.body)}</details>`}</div></article>`).join("")}</div>`;
  }

  function stemDayPage() {
    return `${heading("STEM Day 2026", `${STEM_DAY_DATE} · ${STEM_DAY_TIME}. A free day of hands-on science for our community.`, "sage", `<a class="button-link" href="${VOLUNTEER_SIGNUP}">Volunteer at STEM Day</a><p class="note">Families: free entry and no sign-up needed — drop in any time between 10 and 4.</p>`)}
      <section class="event-chapter field paper wrap">${photo(0, "event-photo", true, false, false, false, "(max-width: 700px) 100vw, 50vw")}<div class="event-details"><p class="event-kicker">Save the date</p><h2>STEM Day</h2><p>${STEM_DAY_DATE}</p><p>Independence High School<br>${ADDRESS}</p><p>Independence students: help run a station or lead your own.</p></div></section>
      <section class="program-chapter field cream wrap"><h2>Learning by doing</h2><div class="reading"><p>Explore 20+ hands-on stations designed and led by student volunteers, with a free prize at the end.</p><p>Past favorites include Vortex Canon, Planetarium, Air Trajectory, Strawberry DNA Extraction, Ocean Zones, Elephant Toothpaste, Hovercrafts, and more.</p><p>Bring the whole family and drop in any time.</p></div></section>
      <section class="activity-archive field paper wrap"><h2>All the activities</h2><div class="activity-list">${STEM_ACTIVITY_HIGHLIGHTS.map((activity) => `<article><h3>${activity.title}</h3><p>${activity.body}</p></article>`).join("")}</div></section>
      <section class="photo-duo field sage wrap">${photo(1, "", false, false, false, false, "(max-width: 700px) 100vw, 50vw")}${photo(2, "", false, false, false, false, "(max-width: 700px) 100vw, 50vw")}</section><section class="social-chapter field cream wrap"><h2>Stay curious</h2><div><p>Follow along for activity previews and event updates.</p><nav aria-label="More STEM Day resources">${link("photo-gallery", "See the photo archive", "text-link chapter-link")}</nav></div></section>`;
  }

  function sponsorsPage() {
    return `${heading("Support<br>science", "Help students bring hands-on science into the community.", "sage")}
      <section class="support-chapter field paper wrap"><div class="reading"><h2>Start something local</h2><p>Science outreach takes materials, time, and people who believe young minds deserve room to explore. If your business or organization would like to support STEM Connect, start a conversation with our team.</p><p>We can discuss current materials and outreach needs.</p>${link("contact-us", "Contact the team", "button-link")}</div>${photo(2, "photo--balanced", false, false, false, false, "(max-width: 700px) 100vw, 46vw")}</section>
      <section class="archive-chapter field cream wrap"><h2>Our earlier chapter</h2><div class="reading"><p>The historical Independence High School iGEM Letter of Support describes the former competition program. Its budget and tax language are outdated.</p>${external("assets/igem-letter-of-support.pdf", "Read the historical letter · PDF, 0.9 MB")}<details class="source-detail"><summary>Original sponsorship introduction</summary>${paragraphs(collections.sponsors[0])}</details></div></section>`;
  }

  function donationsPage() {
    return `${heading("Help ideas<br>grow", "Thank you for supporting student-led discovery and community outreach.", "sage")}
      <section class="donation-chapter field paper wrap"><div class="reading"><h2>Let's talk first</h2><p>Contact the team to confirm the current donation process before sending a contribution.</p>${link("contact-us", "Confirm how to donate", "button-link")}<p class="note">Confirm current tax treatment with the school. There is no online checkout here.</p>${photo(0, "", false, false, false, false, "(max-width: 700px) 100vw, 46vw")}</div><aside class="legacy-donation"><h2>Check by mail</h2><p>The original instructions named “Independence High School iGEM” as the payee. Ask the team or school to confirm the current payee and mailing process before sending a check.</p><p>Original mailing address</p><address>Independence High School<br>${ADDRESS}</address><p>The earlier instructions made a tax-deductibility claim. Current tax treatment is unconfirmed.</p></aside></section>`;
  }

  function contactPage() {
    return `${heading("Come say hello", "Join the community, ask about activities or talk about supporting STEM Connect.", "sage")}
      <section class="contact-chapter field paper wrap"><div class="contact-primary"><h2>One hello away</h2><p>Our contact form is hosted on the original site under the Independence iGEM name.</p>${external(CONTACT, "Open contact form", "button-link")}${photo(3, "", false, false, false, false, "(max-width: 700px) 100vw, 46vw")}</div><div class="contact-details"><article><h3>Room 2517</h3><p>Wednesdays after school.</p><address>Independence High School<br>${ADDRESS}</address><p>${CONFIRM_MEETING}</p></article><article><h3>Follow our community</h3>${external(INSTAGRAM, "@independence_igem")}</article><article><h3>STEM Day</h3><p>The full activity listing is hosted on our original site.</p>${external(NEWSLETTER, "Visit the STEM Day page")}</article></div></section>`;
  }

  function buildCollections(data) {
    if (!data.pages || !ROUTES.every((route) => Array.isArray(data.pages[route.id]?.texts))) throw new Error("Site content is incomplete.");
    const projects = data.pages["our-projects"].texts;
    if (projects.length < 8) throw new Error("Research archive is incomplete.");
    const updateTexts = data.pages["progress-and-updates-blog"].texts;
    const olderUpdates = updateTexts[3].split(/\n?-{5,}\n?/).map((entry) => entry.trim()).filter(Boolean);
    return {
      projects: [
        { id: "innate-immunity", title: projects[2], period: "2025 proposal. Originally labelled 2025–present.", body: projects[0].replace(/\n\nReadings:[\s\S]*$/, "") },
        { id: "mrna-vaccine", title: "Lyme disease mRNA vaccine", period: "2023–2025", body: projects[3] },
        { id: "gene-drives", title: projects[7], period: "2021–2022", body: projects[5] },
      ],
      updates: [{ date: "September 2025", heading: "A new school year", body: updateTexts[1] }, ...olderUpdates.map((entry, index) => {
        const split = entry.indexOf(":");
        return { date: entry.slice(0, split).trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()), heading: ["Science, shared", "Getting ready for STEM Day", "A growing team"][index], body: entry.slice(split + 1).trim() };
      })],
      about: data.pages["about-igem"].texts,
      team: data.pages["our-team"].texts[0],
      sponsors: data.pages.sponsors.texts,
    };
  }

  function setBackgroundInert(on) {
    const elements = [document.getElementById("main-content"), document.querySelector(".site-footer"), document.querySelector(".need-to-know"), document.querySelector(".skip-link")];
    elements.forEach((element) => {
      if (!element) return;
      if (on) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
  }

  function closeMenu(restoreFocus = false) {
    const toggle = document.getElementById("nav-toggle");
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = 'Menu <span aria-hidden="true">+</span>';
    document.getElementById("primary-nav").classList.remove("is-open");
    document.body.classList.remove("menu-open");
    setBackgroundInert(false);
    if (restoreFocus && wasOpen) toggle.focus();
  }

  function render(focus = true) {
    const [routeId, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
    const route = ROUTES.find((item) => item.id === (routeId || "home"));
    const main = document.getElementById("main-content");
    closeMenu();
    main.innerHTML = route ? route.build() : heading("Page not found", "We couldn't find that page. Try the menu — every page we publish is listed there.", "paper", "", "not-found-intro") + `<div class="wrap not-found">${link("home", "Back to home", "button-link")}</div>`;
    document.title = `${route?.title || "Page not found"} | STEM Connect`;
    document.querySelectorAll("[data-route]").forEach((anchor) => {
      const active = anchor.dataset.route === route?.id;
      if (active) anchor.setAttribute("aria-current", "page");
      else anchor.removeAttribute("aria-current");
    });
    const quickNav = document.querySelector(".quick-nav");
    if (quickNav) {
      quickNav.querySelector(".quick-nav-current")?.remove();
      const currentLabels = { "progress-and-updates-blog": "Updates", sponsors: "Sponsors", donations: "Donate", "contact-us": "Contact" };
      const currentLabel = route ? currentLabels[route.id] : undefined;
      if (currentLabel) {
        const currentSpan = document.createElement("span");
        currentSpan.className = "quick-nav-current";
        currentSpan.setAttribute("aria-current", "page");
        currentSpan.textContent = currentLabel;
        quickNav.appendChild(currentSpan);
      }
    }
    const headerCurrent = document.getElementById("header-current");
    if (headerCurrent) {
      if (route && route.id !== "home") {
        headerCurrent.textContent = route.label;
        headerCurrent.hidden = false;
      } else {
        headerCurrent.textContent = "";
        headerCurrent.hidden = true;
      }
    }
    const navToggle = document.getElementById("nav-toggle");
    if (navToggle) {
      const inlineRoutes = ["about-igem", "our-team", "our-projects", "stem-day", "photo-gallery"];
      const currentInMenuOnly = !!route && !inlineRoutes.includes(route.id);
      navToggle.classList.toggle("has-current", currentInMenuOnly);
      if (currentInMenuOnly) navToggle.setAttribute("aria-label", `Menu — the current section, ${route.label}, is in this menu`);
      else navToggle.removeAttribute("aria-label");
    }
    bindActivities(main);
    animateSections(main);
    window.scrollTo({ top: 0, behavior: "instant" });
    const project = new URLSearchParams(query).get("project");
    const target = route?.id === "our-projects" && project ? document.getElementById(project) : null;
    if (target && target.classList.contains("research-article")) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else if (focus) main.querySelector("h1").focus({ preventScroll: true });
    main.querySelectorAll("img").forEach((img) => img.addEventListener("error", () => {
      const message = document.createElement("p");
      message.className = "image-error";
      message.setAttribute("role", "status");
      message.textContent = "This archive photo couldn’t load. Please try again later.";
      img.replaceWith(message);
    }, { once: true }));
  }

  function bindActivities(main) {
    main.querySelectorAll("[data-interest]").forEach((button) => button.addEventListener("click", () => {
      const interest = INTERESTS.find((item) => item.id === button.dataset.interest);
      main.querySelectorAll("[data-interest]").forEach((control) => control.setAttribute("aria-pressed", String(control === button)));
      main.querySelector("#activity-results").innerHTML = activityResult(interest);
    }));
  }

  let motionObserver;
  function animateSections(main) {
    motionObserver?.disconnect();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const headlineLines = main.querySelectorAll(".line > span");
    headlineLines.forEach((line, index) => {
      line.style.setProperty("--entry-delay", `${110 * index}ms`);
      line.classList.add("signature-line");
    });
    const seen = new Set();
    motionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        const element = entry.target;
        seen.add(element);
        motionObserver.unobserve(element);
        const picture = element.matches(".photo-frame");
        const image = picture ? element.querySelector("img") : null;
        const index = [...element.parentElement.children].indexOf(element) % 3;
        const target = image || element;
        target.style.setProperty("--entry-delay", `${index * 70}ms`);
        target.classList.add(picture ? "picture-enter" : "text-enter");
      }
    }, { threshold: .08 });
    const targets = [...main.querySelectorAll("h1:not(:has(.line)), h2, h3, .hero-intro > *, .brand-statement, .statement-bottom > *, .photo-frame, .reading > p, .interest-controls > button, .chapter-top > p, .interest-stories article > p, .interest-stories > .note, .board-list > p, .board-story > p, .join-copy > p, .team-story > p, .contact-primary > p, .contact-details article > p, .event-details > p, .archive-summary > p, .update-date, .research-aside > p"), ...document.querySelectorAll(".site-footer .photo-frame, .footer-brand, .footer-motto")];
    targets.forEach((element) => motionObserver.observe(element));
  }

  function shell(root) {
    root.innerHTML = `<a class="skip-link" href="#main-content">Skip to content</a><div class="need-to-know" role="region" aria-label="Club highlights"><a href="#/about-igem"><strong>Club meetings</strong><span>Wednesdays after school · Room 2517</span></a><a href="#/stem-day"><strong>STEM Day 2026</strong><span>Nov 21 · 10 AM–4 PM</span></a></div><header class="site-header"><div class="header-inner"><a class="brand" href="#/home" data-route="home" aria-label="STEM Connect home"><img src="assets/stem-connect.svg" alt="" width="40" height="40" /><span>STEM Connect</span></a><span class="header-current" id="header-current" aria-current="page" hidden></span><nav class="quick-nav" aria-label="Primary"><a class="text-link" href="#/about-igem" data-route="about-igem">About</a><a class="text-link" href="#/our-team" data-route="our-team">Team</a><a class="text-link" href="#/our-projects" data-route="our-projects">Research</a><a class="text-link" href="#/stem-day" data-route="stem-day">STEM Day</a><a class="text-link" href="#/photo-gallery" data-route="photo-gallery">Gallery</a></nav><div class="header-actions">${link("about-igem", "Join the club", "button-link")}<button id="nav-toggle" class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">+</span></button></div></div></header><nav id="primary-nav" aria-label="All pages">${ROUTES.map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}<a class="menu-join" href="#/about-igem">Join the club</a><div class="menu-wordmark" aria-hidden="true">STEM Connect</div></nav><main id="main-content"></main><footer class="site-footer field forest"><div class="wrap"><a class="footer-brand" href="#/home">STEM Connect</a><div class="footer-middle"><p class="footer-motto">Connecting students through STEM. Inspiring the next generation.</p><nav class="footer-nav" aria-label="Explore all pages">${ROUTES.map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}</nav></div><div class="footer-bottom"><span class="footer-address">Independence High School · ${ADDRESS} · ${external(INSTAGRAM, "@independence_igem")}</span><span class="footer-credits">Student-led in Ashburn, Virginia. Formerly Independence iGEM. A site by <a href="https://tarushv.com" target="_blank" rel="noopener noreferrer">tarushv<span class="sr-only"> (opens in a new tab)</span></a></span></div></div></footer>`;
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      if (!open) { closeMenu(); return; }
      toggle.setAttribute("aria-expanded", "true");
      toggle.innerHTML = 'Close <span aria-hidden="true">−</span>';
      nav.classList.add("is-open");
      document.body.classList.add("menu-open");
      setBackgroundInert(true);
    });
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-scroll-target]");
      if (!button) return;
      const target = document.getElementById(button.dataset.scrollTarget);
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView();
      }
    });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(true); });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const nav = document.getElementById("primary-nav");
      if (!nav || !nav.classList.contains("is-open")) return;
      const focusables = [...document.querySelectorAll(".site-header a, .site-header button, #primary-nav a")].filter((element) => {
        const style = getComputedStyle(element);
        return style.visibility !== "hidden" && style.display !== "none" && element.getClientRects().length > 0;
      });
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && (document.activeElement === first || !focusables.includes(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !focusables.includes(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header, #primary-nav")) closeMenu();
      const anchor = event.target.closest("a");
      if (anchor?.getAttribute("href") === "#main-content") {
        event.preventDefault();
        const main = document.getElementById("main-content");
        main.tabIndex = -1;
        main.focus();
      } else if (anchor?.getAttribute("href") === location.hash) {
        event.preventDefault();
        render();
      }
    });
    matchMedia("(min-width: 800px)").addEventListener("change", () => closeMenu());
  }

  async function boot() {
    const root = document.getElementById("app");
    try {
      const response = await fetch("site-extract.json?v=2026-10-15");
      if (!response.ok) throw new Error(`Content request failed (${response.status}).`);
      collections = buildCollections(await response.json());
      shell(root);
      render(false);
      window.addEventListener("hashchange", () => render());
    } catch (error) {
      root.innerHTML = `<main class="loading-screen"><img src="assets/stem-connect.svg" width="64" height="64" alt="" /><h1>We couldn’t load the site.</h1><p>Please try again. If you’re previewing locally, serve this folder over HTTP.</p><button class="button-link" id="retry-load" type="button">Try again ↗</button>${external(CONTACT, "Contact us on the original site")}</main>`;
      document.getElementById("retry-load").addEventListener("click", boot, { once: true });
      console.error("STEM Connect could not load.", error);
    }
  }

  boot();
})();
