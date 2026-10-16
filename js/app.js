(function () {
  "use strict";

  const INSTAGRAM = "https://www.instagram.com/independence_igem/";
  const CONTACT = "https://independenceigem.square.site/contact-us";
  const NEWSLETTER = "https://independenceigem.square.site/stem-day";
  const ADDRESS = "23115 Learning Circle, Ashburn, VA 20148";
  const MEETING = "Wednesdays after school · Room 2517";
  const CONFIRM_MEETING = "Please confirm the current meeting schedule with the team before visiting.";
  const PHOTOS = [
    { src: "stem-day-2026-station.webp", alt: "Student volunteers guiding a young visitor through a hands-on science station", caption: "Small discoveries. Shared excitement.", group: "Community archive" },
    { src: "stem-day-2026-fossils.webp", alt: "Children exploring a fossil dig table beside a volunteer in a dinosaur costume", caption: "A little digging, a lot of discovery.", group: "Community archive" },
    { src: "stem-day-2026-face-painting.webp", alt: "A student volunteer painting a visitor’s face at a community activity table", caption: "Science makes room for creativity.", group: "Community archive" },
    { src: "stem-day-2026-poster.webp", alt: "A handmade STEM Day welcome poster outside Independence High School", caption: "An invitation to get curious.", group: "Event materials" },
    { src: "archive-1.jpeg", alt: "Blue gloved hands forming a heart in front of an Indy Nation shirt", caption: "A love of science, and a sense of belonging.", group: "Historical iGEM gallery" },
    { src: "archive-2.jpeg", alt: "Gloved hands handling a laboratory bottle beside colorful sample tubes", caption: "Learning our way around the lab.", group: "Historical iGEM gallery" },
    { src: "archive-3.jpeg", alt: "Gloved hand connecting a cable to an illuminated gel electrophoresis tank", caption: "Seeing the science in a different light.", group: "Historical iGEM gallery" },
    { src: "archive-4.jpeg", alt: "A gloved hand using a micropipette above laboratory sample tubes", caption: "Practice, precision, and a good question.", group: "Historical iGEM gallery" },
    { src: "archive-5.png", alt: "A student pipetting at a school laboratory bench with electrophoresis equipment", caption: "Research starts with hands-on learning.", group: "Historical iGEM gallery" },
  ];
  const STEM_ACTIVITY_HIGHLIGHTS = [
    {
      title: "Hovercraft + Paper Airplane Lab",
      body:
        "Young visitors experiment with lift, drag, balance, and thrust by building simple flyers and testing how design changes affect flight time, height, and control.",
    },
    {
      title: "Water Wonders",
      body:
        "A playful chemistry station explores polarity, surface tension, capillary action, and solubility through penny-drop tests, color-mixing challenges, and water movement demos.",
    },
    {
      title: "Chemical Reactions Corner",
      body:
        "Color changes, precipitation reactions, and safe dry-ice demonstrations help students see how scientists recognize when a reaction is happening and why timing matters.",
    },
    {
      title: "Strawberry DNA Bracelets",
      body:
        "Kids help mash, filter, and separate strawberry DNA, then take home a tiny bracelet keepsake that turns a big genetics idea into something tangible.",
    },
    {
      title: "Microscopes, Fossils, and Nature Stations",
      body:
        "From bug observations and fossil digs to plant propagation and ocean-themed activities, these stations connect biology, Earth science, and curiosity-driven discovery.",
    },
    {
      title: "Engineering + Coding Challenges",
      body:
        "Visitors can tinker with micro:bits, try BattleBots-inspired design ideas, explore cyber puzzles, and see how problem-solving and iteration power modern technology.",
    },
    {
      title: "Health + Public Science",
      body:
        "Interactive demos on heart rate, blood pressure, and Glo Germ hygiene show how science supports everyday health decisions in ways students can measure for themselves.",
    },
    {
      title: "Make-and-Take Creativity",
      body:
        "Cloud clay, jellyfish salt painting, and environmental filter-building bring an artistic, hands-on finish to the day while still tying back to real scientific concepts.",
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

  function link(route, label, className = "text-link") {
    return `<a class="${className}" href="#/${route}">${label}<span aria-hidden="true">↗</span></a>`;
  }

  function external(href, label, className = "text-link") {
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
  }

  function photo(index, className = "", eager = false) {
    const item = PHOTOS[index];
    return `<figure class="photo ${className}"><div class="photo-frame"><img src="assets/${item.src}" alt="${escape(item.alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""} /></div><figcaption><span>${item.caption}</span><span>${item.group}</span></figcaption></figure>`;
  }

  function heading(eyebrow, title, intro = "") {
    return `<header class="page-intro wrap"><p class="eyebrow">${eyebrow}</p><h1 tabindex="-1">${title}</h1>${intro ? `<p class="page-lede">${intro}</p>` : ""}</header>`;
  }

  function joinStrip() {
    return `<section class="join-strip wrap"><div><p class="eyebrow">There’s a place for your curiosity</p><h2>Come with a question.<br>Leave with <em>a connection.</em></h2></div>${link("about-igem", "Find your place", "round-link")}</section>`;
  }

  function homePage() {
    return `<section class="home-hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="live-dot"></span> Student-led. Community-minded.</p><h1 tabindex="-1">Curiosity<br>brings us<br><em>together.</em></h1><p class="hero-lede">Connecting students through STEM.<br>Inspiring the next generation.</p>${link("about-igem", "Get to know us", "button-link")}<p class="hero-location">Independence High School<br>Ashburn, Virginia</p></div><div class="hero-visual">${photo(0, "hero-photo", true)}<div class="hero-stamp" aria-hidden="true"><img src="assets/stem-connect.svg" alt="" /><span>Ideas grow<br>when we connect.</span></div><span class="photo-index" aria-hidden="true">01 / IN OUR ELEMENT</span></div></section>
      <div class="word-band" aria-hidden="true"><span>Ask.</span><i>✳</i><span>Explore.</span><i>✳</i><span>Connect.</span><i>✳</i><span>Repeat.</span></div>
      <section class="mission wrap"><p class="eyebrow">A shared spark</p><div><h2>Big ideas begin<br>with a simple <em>“what if?”</em></h2><div class="mission-bottom"><p>We’re STEM Connect, a student-led community at Independence High School. We bring science beyond the classroom through hands-on learning, outreach, and opportunities to lead.</p>${link("our-team", "Meet our community")}</div></div></section>
      <section class="feature-event wrap"><div class="event-image">${photo(1)}</div><div class="event-copy"><p class="eyebrow">Out in the community / Event archive</p><h2>Little hands.<br><em>Big discoveries.</em></h2><p>From strawberry DNA to flying hovercrafts, STEM Day opens a world of questions for younger learners and the students who guide them.</p><div class="event-facts"><div><strong>20+</strong><span>stations in the source listing</span></div><div><strong>300+</strong><span>visitors reported for the prior year</span></div></div>${link("stem-day", "Explore STEM Day")}</div></section>
      <section class="paths wrap"><div class="section-top"><p class="eyebrow">Follow your curiosity</p><p>More ways to connect.</p></div>${link("our-projects", '<span><small>01 / Our foundations</small>Research with a purpose</span>', "path-row")}${link("photo-gallery", '<span><small>02 / Moments that matter</small>See us in our element</span>', "path-row")}${link("sponsors", '<span><small>03 / Make it possible</small>Help the next idea grow</span>', "path-row")}</section>${joinStrip()}`;
  }

  function aboutPage() {
    return `${heading("About STEM Connect", "Good questions.<br><em>Great company.</em>", "Connecting students through STEM. Inspiring the next generation.")}
      <section class="split-section wrap"><div class="reading"><h2>Science is better<br>when it’s <em>shared.</em></h2><p>STEM Connect is a student-led community at Independence High School in Ashburn, Virginia. We create opportunities to explore science, technology, engineering, and math together.</p><p>Our focus is hands-on discovery, community outreach, and student leadership. We plan interactive activities, mentor younger learners, and make room for different interests and experience levels.</p><p>Formerly Independence iGEM, we no longer compete in iGEM. Our earlier research remains here as a clearly marked archive of the work that shaped us.</p>${link("our-projects", "Explore our research archive")}</div>${photo(4, "about-photo")}</section>
      <section class="meeting-panel wrap"><p class="eyebrow">Join us</p><div><h2>Bring your curiosity.<br><em>We’ll bring the questions.</em></h2><p>No research background needed. Come explore outreach, activity planning, mentoring, and hands-on science with other students.</p><p class="meeting-time">${MEETING}</p><p>Independence High School<br>${CONFIRM_MEETING}</p>${link("contact-us", "Connect with the team", "button-link")}</div></section>
      <section class="archive-note wrap"><p class="eyebrow">Where we started / Original iGEM introduction</p><div class="reading">${paragraphs(collections.about[1])}<p class="fine-print">The introduction above is preserved as historical context. STEM Connect does not currently participate in the competition.</p><h3>Historical interest meeting notice</h3>${paragraphs(collections.about[2])}<p class="fine-print">This is a past notice from the original site, not a current invitation. Use the meeting information above and confirm before visiting.</p></div></section>`;
  }

  function teamPage() {
    return `${heading("Our people", "Different interests.<br><em>One shared spark.</em>", "Students, makers, mentors, and question-askers. A community built by showing up for each other.")}
      <section class="team-feature wrap"><figure class="photo team-photo"><div class="photo-frame"><img src="assets/team-2024.png" alt="Historical Independence iGEM team posing together on school bleachers" loading="eager" /></div><figcaption><span>The Independence iGEM team, from our archive.</span><span>Source photo dated August 2024</span></figcaption></figure><div class="team-caption"><p class="eyebrow">Our foundations</p><p>Our name has changed. Our curiosity connects us.</p></div></section>
      <section class="mission wrap"><p class="eyebrow">Student-led, together</p><div><h2>Find your people.<br>Find your <em>next question.</em></h2><div class="mission-bottom"><p>There are many ways to contribute, from designing an activity and explaining a scientific idea to welcoming families and helping an event run. Bring the skills you have and make space for something new.</p>${link("about-igem", "Join STEM Connect")}</div></div></section>
      <section class="archive-note wrap"><p class="eyebrow">Original team description / Historical</p><div class="reading">${paragraphs(collections.team)}<p class="fine-print">This original description documents an earlier iGEM team. The membership count and competition plans are historical, not a current roster or commitment.</p></div></section>${joinStrip()}`;
  }

  function projectsPage() {
    return `${heading("Research archive / Former Independence iGEM", "Questions that<br>pushed us <em>further.</em>", "Three research directions from our iGEM history, preserved in full. STEM Connect no longer competes in iGEM.")}
      <section class="archive-banner wrap"><span class="archive-label">Historical research</span><p>The original descriptions below include plans and future-tense language from the time they were written. They are archival proposals, not statements of current research, validated outcomes, or medical guidance. The former “2025–present” label is historical.</p></section>
      <nav class="project-index wrap" aria-label="Research on this page">${collections.projects.map((project, index) => `<a href="#/our-projects?project=${project.id}"><span>0${index + 1}</span>${escape(project.title)}<span aria-hidden="true">↓</span></a>`).join("")}</nav>
      <div class="project-list wrap">${collections.projects.map((project, index) => `<article class="research-article" id="${project.id}"><aside><span class="project-number">0${index + 1}</span><p class="eyebrow">${project.period}</p><span class="archive-label">Archived proposal</span></aside><div class="reading"><h2>${project.title}</h2>${paragraphs(project.body)}${index === 0 ? `<div class="readings"><h3>Original readings & credit</h3>${external("https://doi.org/10.1161/CIRCRESAHA.124.325023", "Circulation Research · DOI 10.1161/CIRCRESAHA.124.325023")}${external("https://www.science.org/doi/10.1126/science.adf6582", "Science · DOI 10.1126/science.adf6582")}${external("https://li.biol.vt.edu/", "Original image credit · Li Laboratory, Virginia Tech")}</div>` : ""}</div></article>`).join("")}</div>
      <section class="archive-links wrap"><p>Follow the story behind the research.</p>${link("progress-and-updates-blog", "Read the archived updates")}</section>`;
  }

  function galleryPage() {
    return `${heading("Photo gallery", "A little science.<br><em>A lot of life.</em>", "From the lab bench to the activity table. Real moments from our student research and community outreach archive.")}
      <p class="gallery-note wrap">Historical photos are preserved from the original site and supplied STEM Day collection. Exact event dates are not confirmed; image filenames do not establish when an event took place.</p>
      <section class="gallery-grid wrap" aria-label="Community and research photographs">${PHOTOS.map((item, index) => photo(index, index % 3 === 0 ? "gallery-wide" : "")).join("")}</section>
      <section class="social-strip wrap"><div><p class="eyebrow">Stay connected</p><h2>More from <em>our community.</em></h2></div>${external(INSTAGRAM, "@independence_igem")}</section>`;
  }

  function updatesPage() {
    return `${heading("Updates archive", "Notes from<br><em>the journey.</em>", "Original updates from Independence iGEM. A record of the students, ideas, and events that came before STEM Connect.")}
      <section class="archive-banner wrap"><span class="archive-label">2024–2025 archive</span><p>These entries retain their original wording. Interest meetings, project plans, competition references, and event announcements are historical.</p></section>
      <div class="timeline wrap">${collections.updates.map((update) => `<article class="update-entry"><p class="update-date">${escape(update.date)}</p><div class="reading"><h2>${update.heading}</h2>${paragraphs(update.body)}</div></article>`).join("")}</div>${joinStrip()}`;
  }

  function stemDayPage() {
    return `${heading("STEM Day / Event archive", "For the joy<br>of <em>finding out.</em>", "A school full of hands-on science. A community of students helping younger minds explore.")}
      <section class="stem-main wrap">${photo(0, "stem-main-photo", true)}<aside class="event-ticket"><p class="eyebrow">Original 2026 listing</p><h2>STEM<br><em>Day.</em></h2><dl><div><dt>Listed date</dt><dd>May 16, 2026</dd></div><div><dt>Location</dt><dd>Independence High School<br>${ADDRESS}</dd></div><div><dt>Entry in the listing</dt><dd>Free · All ages<br>No sign-ups required</dd></div></dl><p class="fine-print">Past listing. The source also displayed February 28, creating a date conflict. No future event date is announced here.</p></aside></section>
      <section class="mission wrap"><p class="eyebrow">Hands-on, minds open</p><div><h2>One question leads<br>to <em>another.</em></h2><div class="reading"><p>STEM Day brings young visitors through a series of student-led science, technology, engineering, and math activities. The archived listing described 20+ stations, a free prize at the end, and more than 300 visitors in the prior year.</p><p>The original program named Vortex Canon, Planetarium, Air Trajectory, Strawberry DNA Extraction, Ocean Zones, Elephant Toothpaste, Hovercrafts, and dozens more.</p><p class="fine-print">The photos show our community activities and are not presented as proof of an event on the listed date.</p></div></div></section>
      <section class="activity-section wrap"><div class="section-top"><p class="eyebrow">From the activity planning archive</p><h2>Room to <em>explore.</em></h2></div><div class="activity-list">${STEM_ACTIVITY_HIGHLIGHTS.map((activity, index) => `<article><span class="activity-number">${String(index + 1).padStart(2, "0")}</span><div><h3>${activity.title}</h3><p>${activity.body}</p></div></article>`).join("")}</div></section>
      <section class="photo-pair wrap">${photo(1)}${photo(2)}</section><section class="social-strip wrap"><div><p class="eyebrow">Keep the connection going</p><h2>Stay <em>curious.</em></h2><p>The original site hosts the STEM Day newsletter. Its event dates may be historical.</p></div><div class="link-stack">${external(NEWSLETTER, "STEM Day newsletter · Original site")}${link("photo-gallery", "Explore the photo archive")}</div></section>`;
  }

  function sponsorsPage() {
    return `${heading("Our supporters", "Help a good<br>idea <em>grow.</em>", "Community support gives students space to learn, lead, and share their curiosity with the next generation.")}
      <section class="support-feature wrap"><div class="reading"><h2>Local support.<br><em>Lasting connections.</em></h2><p>Science outreach takes materials, time, and people who believe young minds deserve room to explore. If your business or organization would like to support STEM Connect, start a conversation with our team.</p><p>We can discuss current needs and confirm how your support can help. Our original competition budget and sponsorship materials are historical.</p>${link("contact-us", "Talk with the team", "button-link")}</div>${photo(2)}</section>
      <section class="document-section wrap"><p class="eyebrow">From our archive</p><div><h2>A letter from<br><em>an earlier chapter.</em></h2><p>The Independence High School iGEM Letter of Support is outdated. It describes the former competition program and must not be used as a current sponsorship offer, budget, or statement of tax treatment.</p>${external("assets/igem-letter-of-support.pdf", "Read the historical letter · PDF")}<details class="source-detail"><summary>Original sponsorship introduction</summary>${paragraphs(collections.sponsors[0])}</details></div></section>`;
  }

  function donationsPage() {
    return `${heading("Support STEM Connect", "More discovery.<br><em>Made possible by you.</em>", "Thank you for helping students find their interests in science, build confidence, and bring learning into the community.")}
      <section class="donation-layout wrap"><div class="reading"><h2>Start with<br><em>a conversation.</em></h2><p>Your support can help students create hands-on STEM experiences and share their curiosity. Please contact the team to confirm the current donation process before sending a contribution.</p>${link("contact-us", "Confirm how to donate", "button-link")}<p class="fine-print">The original site made a tax-deductibility claim. We have not verified current tax treatment. Confirm it with the school before relying on that claim.</p></div><aside class="legacy-donation"><p class="eyebrow">Historical instructions / Check by mail</p><h3>Before you send a check</h3><ol><li><strong>Confirm the current payee.</strong> The original instructions named “Independence High School iGEM.” This is a legacy name. Ask the team or school for the correct current payee before writing or mailing a check.</li><li><strong>Confirm the mailing process.</strong> The original site directed supporters to mail checks to Independence High School.</li><li><strong>Original mailing address</strong><address>Independence High School<br>${ADDRESS}</address></li></ol><p>There is no online payment checkout on this site.</p></aside></section>${joinStrip()}`;
  }

  function contactPage() {
    return `${heading("Get in touch", "Every connection<br>starts with <em>hello.</em>", "Want to join, support a student activity, or ask about STEM Day? We’d like to hear from you.")}
      <section class="contact-layout wrap"><div class="contact-primary"><p class="eyebrow">Send a message</p><h2>Let’s start<br><em>something good.</em></h2><p>Our contact form is hosted on the original Independence iGEM website. It opens in a new tab.</p>${external(CONTACT, "Open the original contact form", "button-link")}<p class="fine-print">The hosted form still uses our former name.</p></div><div class="contact-details"><article><p class="eyebrow">Around school</p><h3>${MEETING}</h3><p>${CONFIRM_MEETING}</p></article><article><p class="eyebrow">Find us</p><h3>Independence High School</h3><address>${ADDRESS}</address></article><article><p class="eyebrow">On Instagram</p>${external(INSTAGRAM, "@independence_igem")}<p>Our original account, still connecting our community.</p></article><article><p class="eyebrow">STEM Day newsletter</p>${external(NEWSLETTER, "Visit the original newsletter page")}<p>Hosted on the original site. Event information there may be historical.</p></article></div></section>`;
  }

  function buildCollections(data) {
    if (!data.pages || !ROUTES.every((route) => Array.isArray(data.pages[route.id]?.texts))) throw new Error("Site content is incomplete.");
    const projects = data.pages["our-projects"].texts;
    if (projects.length < 8) throw new Error("Research archive is incomplete.");
    const updateTexts = data.pages["progress-and-updates-blog"].texts;
    const olderUpdates = updateTexts[3].split(/\n?-{5,}\n?/).map((entry) => entry.trim()).filter(Boolean);
    return {
      projects: [
        { id: "innate-immunity", title: projects[2], period: "2025 archive · Originally labeled 2025–present", body: projects[0] },
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

  function closeMenu(restoreFocus = false) {
    const toggle = document.getElementById("nav-toggle");
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = 'Menu <span aria-hidden="true">+</span>';
    document.getElementById("primary-nav").classList.remove("is-open");
    if (restoreFocus && wasOpen) toggle.focus();
  }

  function render(focus = true) {
    const [routeId, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
    const route = ROUTES.find((item) => item.id === (routeId || "home"));
    const main = document.getElementById("main-content");
    closeMenu();
    main.innerHTML = route ? route.build() : heading("A wrong turn, a new question", "Let’s get you<br><em>connected.</em>", "We couldn’t find that page.") + `<div class="wrap not-found">${link("home", "Back to home", "button-link")}</div>`;
    document.title = `${route?.title || "Page not found"} | STEM Connect`;
    document.querySelectorAll("[data-route]").forEach((anchor) => {
      const active = anchor.dataset.route === route?.id;
      if (active) anchor.setAttribute("aria-current", "page");
      else anchor.removeAttribute("aria-current");
    });
    main.classList.remove("page-enter");
    requestAnimationFrame(() => main.classList.add("page-enter"));
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
      message.textContent = "This archive photo couldn’t load. Please try again later.";
      img.replaceWith(message);
    }, { once: true }));
  }

  function shell(root) {
    root.innerHTML = `<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="#/home" data-route="home" aria-label="STEM Connect home"><img src="assets/stem-connect.svg" alt="" width="44" height="44" /><span>stem<span class="brand-connect">connect</span></span></a><button id="nav-toggle" class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">+</span></button><nav id="primary-nav" aria-label="Primary">${ROUTES.filter((route) => route.id !== "home").map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}</nav></div></header><main id="main-content"></main><footer class="site-footer"><div class="footer-top wrap"><div><a class="footer-brand" href="#/home">stem <em>connect</em><img src="assets/stem-connect.svg" alt="" /></a><p>Connecting students through STEM.<br>Inspiring the next generation.</p></div><div class="footer-contact"><p>Independence High School<br>${ADDRESS}</p>${external(INSTAGRAM, "@independence_igem")}</div></div><nav class="footer-nav wrap" aria-label="All pages">${ROUTES.map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}</nav><div class="footer-bottom wrap"><span>STEM Connect · Student-led in Ashburn, VA</span><span>Formerly Independence iGEM</span><span>a site by <a href="https://tarushv.com" target="_blank" rel="noopener noreferrer">tarushv<span class="sr-only"> (opens in a new tab)</span></a></span></div></footer>`;
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
      nav.classList.toggle("is-open", open);
    });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(true); });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
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
    matchMedia("(min-width: 1180px)").addEventListener("change", () => closeMenu());
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
