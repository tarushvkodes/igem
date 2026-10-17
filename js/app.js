(function () {
  "use strict";

  const INSTAGRAM = "https://www.instagram.com/independence_igem/";
  const CONTACT = "https://independenceigem.square.site/contact-us";
  const NEWSLETTER = "https://independenceigem.square.site/stem-day";
  const ADDRESS = "23115 Learning Circle, Ashburn, VA 20148";
  const CONFIRM_MEETING = "Please confirm the current meeting schedule with the team before visiting.";
  const STEM_DAY_DATE = "November 21, 2026";
  const STEM_DAY_TIME = "10:00 AM–4:00 PM";
  const PHOTOS = [
    { src: "stem-day-2026-station.webp", alt: "Student volunteers guiding a young visitor through a hands-on science station", caption: "Students sharing hands-on science.", group: "Community archive" },
    { src: "stem-day-2026-face-painting.webp", alt: "Fossil dig trays beside a student volunteer in a dinosaur costume", caption: "Fossil trays and a prehistoric visitor.", group: "STEM Day archive" },
    { src: "stem-day-2026-fossils.webp", alt: "Student volunteers at a face-painting table with a handmade National Art Honor Society sign", caption: "A creative corner at STEM Day.", group: "STEM Day archive" },
    { src: "stem-day-2026-poster.webp", alt: "A handmade STEM Day welcome poster outside Independence High School", caption: "An invitation to get curious.", group: "Event materials" },
    { src: "archive-1.jpeg", alt: "Blue gloved hands forming a heart in front of an Indy Nation shirt", caption: "An Indy Nation welcome from the laboratory.", group: "Historical iGEM gallery" },
    { src: "archive-2.jpeg", alt: "Gloved hands handling a laboratory bottle beside colorful sample tubes", caption: "Samples and equipment at the lab bench.", group: "Historical iGEM gallery" },
    { src: "archive-3.jpeg", alt: "Gloved hand connecting a cable to an illuminated gel electrophoresis tank", caption: "Connecting the gel electrophoresis tank.", group: "Historical iGEM gallery" },
    { src: "archive-4.jpeg", alt: "A gloved hand using a micropipette above laboratory sample tubes", caption: "Practising with a micropipette.", group: "Historical iGEM gallery" },
    { src: "archive-5.png", alt: "A student pipetting at a school laboratory bench with electrophoresis equipment", caption: "A student working at the laboratory bench.", group: "Historical iGEM gallery" },
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

  const INTERESTS = [
    { id: "life", label: "Living things", items: [3, 4], photo: 1 },
    { id: "chemistry", label: "Chemistry", items: [1, 2], photo: 0 },
    { id: "engineering", label: "Making & coding", items: [0, 5], photo: 7 },
    { id: "everyday", label: "Art & everyday science", items: [6, 7], photo: 2 },
  ];

  function link(route, label, className = "text-link") {
    return `<a class="${className}" href="#/${route}">${label}</a>`;
  }

  function external(href, label, className = "text-link") {
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
  }

  function photo(index, className = "", eager = false) {
    const item = PHOTOS[index];
    return `<figure class="photo ${className}"><div class="photo-frame"><img src="assets/${item.src}" alt="${escape(item.alt)}" width="1600" height="1200" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""} /></div><figcaption>${item.caption} ${item.group}.</figcaption></figure>`;
  }

  function heading(title, intro, tone = "paper") {
    return `<header class="page-intro field ${tone}"><div class="wrap"><h1 tabindex="-1">${title}</h1><p class="lede">${intro}</p></div></header>`;
  }

  function joinStrip() {
    return `<section class="join-chapter field lime"><div class="join-image">${photo(3)}</div><div class="join-copy"><h2>See you in 2517</h2><p>Wednesdays after school at Independence High School. Bring your interests. No research background needed.</p>${link("about-igem", "Join STEM Connect", "button-link")}<p class="note">Confirm the current meeting schedule before visiting.</p></div></section>`;
  }

  function masthead() {
    return `<div class="masthead" aria-label="STEM Connect in our school and community">${photo(0, "mast-photo-a", true)}<div class="room-tile"><p class="room-number">Room<br>2517</p><p class="room-tile-detail">Wednesdays<br>after school</p></div>${photo(1, "mast-photo-b", true)}${photo(6, "mast-photo-c", true)}${photo(3, "mast-photo-d", true)}</div>`;
  }

  function activityResult(interest) {
    return `<div class="interest-photo">${photo(interest.photo)}</div><div class="interest-stories">${interest.items.map((index) => `<article><h3>${STEM_ACTIVITY_HIGHLIGHTS[index].title}</h3><p>${STEM_ACTIVITY_HIGHLIGHTS[index].body}</p></article>`).join("")}<p class="note">From our activity planning archive. The 2026 station lineup may vary.</p>${link("stem-day", "Explore all activities")}</div>`;
  }

  function activityBrowser() {
    return `<section class="interest-chapter field forest"><div class="wrap"><div class="chapter-top"><h2>Find your experiment</h2><p>Pick an interest. Explore real activities from our STEM Day planning archive.</p></div><div class="interest-controls" role="group" aria-label="STEM interests">${INTERESTS.map((interest, index) => `<button type="button" data-interest="${interest.id}" aria-pressed="${index === 0}">${interest.label}</button>`).join("")}</div><div id="activity-results" class="interest-result" aria-live="polite" aria-atomic="true">${activityResult(INTERESTS[0])}</div></div></section>`;
  }

  function homePage() {
    return `<section class="home-hero field paper">${masthead()}<div class="hero-bottom wrap"><div class="hero-intro"><p>Student-led science and outreach at Independence High School in Ashburn, Virginia.</p><div class="hero-links">${link("stem-day", "STEM Day 2026", "button-link")}${link("about-igem", "Join the club")}</div></div><h1 tabindex="-1"><span class="line"><span>STEM</span></span> <span class="line"><span>Connect</span></span></h1></div></section>
      <section class="statement-chapter field sage"><div class="wrap"><p class="brand-statement">Connecting students through STEM. Inspiring the next generation.</p><div class="statement-bottom"><p>We take the questions we ask after school and turn them into hands-on discoveries for younger learners.</p>${link("our-team", "Meet our people")}</div></div></section>
      ${activityBrowser()}
      <section class="community-board field paper"><div class="board-heading"><h2>From our room<br>to the community</h2></div><div class="board-photo">${photo(0)}</div><div class="board-room"><p class="room-number">2517</p><p>Wednesdays after school.<br>Independence High School.</p>${link("about-igem", "Come along")}</div><div class="board-list"><p>Design an activity.<br>Mentor a younger learner.<br>Welcome a family.<br>Try something new.</p></div><div class="board-story"><p>We began as Independence iGEM. Today, STEM Connect focuses on outreach.</p>${link("our-projects", "Read our research history")}</div></section>
      <section class="history-chapter field cream"><div class="wrap history-text"><p>Our laboratory work, school-day questions and community events have a home here. Explore the ${link("photo-gallery", "photographs")}, read the ${link("progress-and-updates-blog", "original updates")} or help with the next chapter through ${link("sponsors", "community support")}.</p></div></section>${joinStrip()}`;
  }

  function aboutPage() {
    return `${heading("Science,<br>shared", "A student-led outreach community at Independence High School in Ashburn, Virginia.", "sage")}
      <section class="field paper story-split wrap"><div class="reading"><h2>A place to explore</h2><p>STEM Connect creates opportunities to explore science, technology, engineering, and math together.</p><p>Our focus is hands-on discovery, community outreach, and student leadership. We plan interactive activities, mentor younger learners, and make room for different interests and experience levels.</p><p>Formerly Independence iGEM, we no longer compete in iGEM. Our earlier research remains here as a record of the work that shaped us.</p>${link("our-projects", "Read our research history")}</div>${photo(4)}</section>
      <section class="meeting-chapter field forest wrap"><h2>Room 2517</h2><div><p class="lede">Wednesdays after school.<br>Independence High School.</p><p>No research background needed. Explore activity planning, mentoring, and hands-on science with other students.</p><p>${CONFIRM_MEETING}</p>${link("contact-us", "Contact the team", "button-link")}</div></section>
      <section class="archive-chapter field cream wrap"><h2>Our iGEM beginnings</h2><div class="reading"><p class="note">The original introduction and interest-meeting notice below are historical. STEM Connect no longer competes in iGEM.</p>${paragraphs(collections.about[1])}<h3>Past interest meeting</h3>${paragraphs(collections.about[2])}</div></section>`;
  }

  function teamPage() {
    return `${heading("Our people", "Students, makers, mentors and question-askers. A community built by showing up for each other.")}
      <section class="team-chapter field forest wrap"><figure class="photo team-photo"><div class="photo-frame"><img src="assets/team-2024.png" width="640" height="318" alt="Historical Independence iGEM team together on the school bleachers" loading="eager" /></div><figcaption>The Independence iGEM team on the school bleachers, from the August 2024 archive.</figcaption></figure><div class="team-story"><h2>Bring what you love</h2><p>From designing an activity and explaining an idea to welcoming families, there are many ways to contribute. Bring the skills you have and make space for something new.</p>${link("about-igem", "Join STEM Connect", "button-link")}</div></section>
      <section class="archive-chapter field cream wrap"><h2>Where we started</h2><div class="reading"><p class="note">The original team description below reflects past membership and competition plans.</p>${paragraphs(collections.team)}</div></section>${joinStrip()}`;
  }

  function projectsPage() {
    const shortTitles = ["Innate immunity", "Lyme vaccine", "Gene drives"];
    const pictures = [6, 7, 5];
    return `${heading("Research archive", "Three proposals from our Independence iGEM years. Our focus today is community outreach.", "sage")}
      <div class="archive-summary wrap field paper"><p>The original plans below retain their historical wording. They describe proposals, not current research or established results.</p><nav class="project-index" aria-label="Research on this page">${collections.projects.map((project, index) => link(`our-projects?project=${project.id}`, shortTitles[index])).join("")}</nav></div>
      ${collections.projects.map((project, index) => `<article class="research-article field ${["cream", "sage", "paper"][index]} wrap" id="${project.id}"><div class="research-aside"><h2>${shortTitles[index]}</h2>${photo(pictures[index])}<p>${project.period}</p></div><div class="reading"><p class="original-title">${escape(project.title)}</p>${paragraphs(project.body)}${index === 0 ? `<div class="readings"><h3>Readings & credit</h3>${external("https://doi.org/10.1161/CIRCRESAHA.124.325023", "Circulation Research · DOI 10.1161/CIRCRESAHA.124.325023")}${external("https://www.science.org/doi/10.1126/science.adf6582", "Science · DOI 10.1126/science.adf6582")}${external("https://li.biol.vt.edu/", "Original image credit · Li Laboratory, Virginia Tech")}</div>` : ""}</div></article>`).join("")}
      <div class="archive-close field lime wrap">${link("progress-and-updates-blog", "Read the original updates")}</div>`;
  }

  function galleryPage() {
    return `${heading("Science, in company", "Real school science and outreach, from our community and research archive.", "forest")}
      <div class="gallery-intro wrap field cream"><p>Photographs from past STEM Day activities and our iGEM research archive.</p></div><section class="gallery-grid field paper wrap" aria-label="Community and research photographs">${PHOTOS.map((item, index) => photo(index)).join("")}</section><section class="social-chapter field sage wrap"><h2>Keep in touch</h2><nav aria-label="Community social media">${external(INSTAGRAM, "@independence_igem")}</nav></section>`;
  }

  function updatesPage() {
    return `${heading("How we got here", "Four original updates from Independence iGEM. Meeting invitations, events and competition plans are historical.", "cream")}
      <div class="timeline">${collections.updates.map((update, index) => `<article class="update-entry field ${["sage", "paper", "cream", "forest"][index]} wrap"><div><h2>${update.heading}</h2><p class="update-date">${escape(update.date)}</p></div><div class="reading">${paragraphs(update.body)}</div></article>`).join("")}</div>${joinStrip()}`;
  }

  function stemDayPage() {
    return `${heading("STEM Day 2026", `${STEM_DAY_DATE} · ${STEM_DAY_TIME}. A free day of hands-on science for our community.`, "sage")}
      <section class="event-chapter field paper wrap">${photo(0, "event-photo", true)}<div class="event-details"><p class="event-kicker">Save the date</p><h2>STEM Day</h2><p class="lede">Saturday, ${STEM_DAY_DATE}<br>${STEM_DAY_TIME}</p><p>Independence High School<br>${ADDRESS}</p><p>Free entry for all ages. No sign-up required.</p>${external(NEWSLETTER, "Visit the STEM Day page", "button-link")}</div></section>
      <section class="program-chapter field cream wrap"><h2>Learning by doing</h2><div class="reading"><p>Explore 20+ hands-on stations designed and led by student volunteers, with a free prize at the end.</p><p>Past favorites include Vortex Canon, Planetarium, Air Trajectory, Strawberry DNA Extraction, Ocean Zones, Elephant Toothpaste, Hovercrafts, and more.</p><p>Bring the whole family and drop in any time from 10:00 AM to 4:00 PM.</p></div></section>
      ${activityBrowser()}
      <section class="activity-archive field paper wrap"><h2>All the activities</h2><div class="activity-list">${STEM_ACTIVITY_HIGHLIGHTS.map((activity) => `<article><h3>${activity.title}</h3><p>${activity.body}</p></article>`).join("")}</div></section>
      <section class="photo-duo field sage wrap">${photo(1)}${photo(2)}</section><section class="social-chapter field cream wrap"><h2>Stay curious</h2><div><p>Follow along for activity previews and event updates.</p><nav aria-label="More STEM Day resources">${external(NEWSLETTER, "Visit the STEM Day page")}${link("photo-gallery", "See the photo archive")}</nav></div></section>`;
  }

  function sponsorsPage() {
    return `${heading("Support<br>science", "Help students bring hands-on science into the community.", "sage")}
      <section class="support-chapter field paper wrap"><div class="reading"><h2>Start something local</h2><p>Science outreach takes materials, time, and people who believe young minds deserve room to explore. If your business or organization would like to support STEM Connect, start a conversation with our team.</p><p>We can discuss current materials and outreach needs.</p>${link("contact-us", "Contact the team", "button-link")}</div>${photo(2)}</section>
      <section class="archive-chapter field cream wrap"><h2>Our earlier chapter</h2><div class="reading"><p>The historical Independence High School iGEM Letter of Support describes the former competition program. Its budget and tax language are outdated.</p>${external("assets/igem-letter-of-support.pdf", "Read the historical letter · PDF")}<details class="source-detail"><summary>Original sponsorship introduction</summary>${paragraphs(collections.sponsors[0])}</details></div></section>${joinStrip()}`;
  }

  function donationsPage() {
    return `${heading("Help ideas<br>grow", "Thank you for supporting student-led discovery and community outreach.", "forest")}
      <section class="donation-chapter field paper wrap"><div class="reading"><h2>Let's talk first</h2><p>Contact the team to confirm the current donation process before sending a contribution.</p>${link("contact-us", "Confirm how to donate", "button-link")}<p class="note">Confirm current tax treatment with the school. There is no online checkout here.</p>${photo(0)}</div><aside class="legacy-donation"><h2>Check by mail</h2><p>The original instructions named “Independence High School iGEM” as the payee. Ask the team or school to confirm the current payee and mailing process before sending a check.</p><p>Original mailing address</p><address>Independence High School<br>${ADDRESS}</address><p>The earlier instructions made a tax-deductibility claim. Current tax treatment is unconfirmed.</p></aside></section>${joinStrip()}`;
  }

  function contactPage() {
    return `${heading("Come say hello", "Join the community, ask about activities or talk about supporting STEM Connect.", "sage")}
      <section class="contact-chapter field paper wrap"><div class="contact-primary"><h2>One hello away</h2><p>Our contact form is hosted on the original site under the Independence iGEM name.</p>${external(CONTACT, "Open contact form", "button-link")}${photo(3)}</div><div class="contact-details"><article><h2>Room 2517</h2><p>Wednesdays after school.<br>Independence High School.</p><p>${CONFIRM_MEETING}</p></article><article><h3>Find us at school</h3><address>Independence High School<br>${ADDRESS}</address></article><article><h3>Follow our community</h3>${external(INSTAGRAM, "@independence_igem")}</article><article><h3>STEM Day</h3><p>The full activity listing is hosted on our original site.</p>${external(NEWSLETTER, "Visit the STEM Day page")}</article></div></section>`;
  }

  function buildCollections(data) {
    if (!data.pages || !ROUTES.every((route) => Array.isArray(data.pages[route.id]?.texts))) throw new Error("Site content is incomplete.");
    const projects = data.pages["our-projects"].texts;
    if (projects.length < 8) throw new Error("Research archive is incomplete.");
    const updateTexts = data.pages["progress-and-updates-blog"].texts;
    const olderUpdates = updateTexts[3].split(/\n?-{5,}\n?/).map((entry) => entry.trim()).filter(Boolean);
    return {
      projects: [
        { id: "innate-immunity", title: projects[2], period: "2025 proposal. Originally labelled 2025–present.", body: projects[0] },
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
    main.innerHTML = route ? route.build() : heading("Page not found", "We couldn’t find that page.") + `<div class="wrap not-found">${link("home", "Back to home", "button-link")}</div>`;
    document.title = `${route?.title || "Page not found"} | STEM Connect`;
    document.querySelectorAll("[data-route]").forEach((anchor) => {
      const active = anchor.dataset.route === route?.id;
      if (active) anchor.setAttribute("aria-current", "page");
      else anchor.removeAttribute("aria-current");
    });
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
    const targets = [...main.querySelectorAll("h1:not(:has(.line)), h2, h3, .hero-intro > *, .brand-statement, .statement-bottom > *, .photo-frame, .reading > p, .interest-controls > button, .chapter-top > p, .interest-stories article > p, .interest-stories > .note, .board-list > p, .board-story > p, .history-text > p, .join-copy > p, .team-story > p, .contact-primary > p, .contact-details article > p, .event-details > p, .archive-summary > p, .update-date, .research-aside > p"), ...document.querySelectorAll(".site-footer .photo-frame, .footer-brand, .footer-motto")];
    targets.forEach((element) => motionObserver.observe(element));
  }

  function shell(root) {
    root.innerHTML = `<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="need-to-know" aria-label="Club highlights"><a href="#/about-igem"><strong>Club meetings</strong><span>Wednesdays after school · Room 2517</span></a><a href="#/stem-day"><strong>STEM Day 2026</strong><span>Nov 21 · 10 AM–4 PM</span></a></div><div class="header-inner"><a class="brand" href="#/home" data-route="home" aria-label="STEM Connect home"><img src="assets/stem-connect.svg" alt="" width="40" height="40" /><span>stem connect</span></a><nav class="quick-nav" aria-label="Primary">${link("about-igem", "About")}${link("stem-day", "STEM Day")}${link("photo-gallery", "Gallery")}</nav><div class="header-actions">${link("about-igem", "Join", "button-link")}<button id="nav-toggle" class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">+</span></button></div><nav id="primary-nav" aria-label="All pages">${ROUTES.map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}</nav></div></header><main id="main-content"></main><footer class="site-footer field forest"><div class="wrap"><a class="footer-brand" href="#/home">STEM Connect</a><div class="footer-middle"><div><p class="footer-motto">Connecting students through STEM.<br>Inspiring the next generation.</p><p>Independence High School<br>${ADDRESS}</p>${external(INSTAGRAM, "@independence_igem")}</div><nav class="footer-nav" aria-label="Explore all pages">${ROUTES.map((route) => `<a href="#/${route.id}" data-route="${route.id}">${route.label}</a>`).join("")}</nav></div><div class="footer-bottom"><span>Student-led in Ashburn, Virginia.<br>Formerly Independence iGEM.</span><span>A site by <a href="https://tarushv.com" target="_blank" rel="noopener noreferrer">tarushv<span class="sr-only"> (opens in a new tab)</span></a></span></div><div class="footer-photos">${photo(1)}${photo(7)}${photo(2)}</div></div></footer>`;
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
