(function () {
  "use strict";

  const NAV_ROUTES = [
    "home",
    "about-igem",
    "our-team",
    "our-projects",
    "stem-day",
    "progress-and-updates-blog",
    "sponsors",
    "donations",
    "contact-us",
  ];

  const NAV_LABELS = {
    home: "Home",
    "about-igem": "About",
    "our-team": "Team",
    "our-projects": "Projects",
    "stem-day": "STEM Day",
    "progress-and-updates-blog": "Updates",
    sponsors: "Sponsors",
    donations: "Donate",
    "contact-us": "Contact",
  };

  const STEM_PHOTOS = [
    {
      src: "assets/stem-day-2026-poster.webp",
      alt: "STEM Day 2026 sign outside Independence High School",
      caption: "The welcome sign that greeted families at STEM Day 2026.",
      className: "stem-photo-card stem-photo-card--poster",
      position: "50% 42%",
    },
    {
      src: "assets/stem-day-2026-station.webp",
      alt: "Students leading a STEM activity station during STEM Day 2026",
      caption: "Student volunteers guiding visitors through a hands-on STEM station.",
      className: "stem-photo-card stem-photo-card--feature",
      position: "64% 48%",
    },
    {
      src: "assets/stem-day-2026-face-painting.webp",
      alt: "Face painting activity table at STEM Day 2026",
      caption: "Creative stations mixed art, science, and community fun.",
      className: "stem-photo-card",
      position: "58% 52%",
    },
    {
      src: "assets/stem-day-2026-fossils.webp",
      alt: "Fossil dig station with a dinosaur costume at STEM Day 2026",
      caption: "The fossil dig brought out some prehistoric energy.",
      className: "stem-photo-card",
      position: "68% 44%",
    },
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

  const state = {
    source: null,
    site: null,
    navItems: [],
    projectSections: [],
    updates: [],
  };

  function getRoute() {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();
    if (raw === "photo-gallery") return "home";
    return NAV_ROUTES.includes(raw) ? raw : "home";
  }

  function getPage(route) {
    return state.source.pages[route] ?? state.source.pages.home;
  }

  function buildSite(data) {
    return {
      name: "Independence High School iGEM",
      instagramHandle: data.site.instagram,
      instagramUrl: `https://www.instagram.com/${data.site.instagram}/`,
      address: data.site.address.replace("Learning Cir", "Learning Circle"),
      meeting:
        "Interested in Indy iGEM? You can come to our meetings! iGEM takes place on Wednesdays after school in room 2517 at Independence High School.",
      logo: "assets/igem-logo.png",
      sponsorPdf: "assets/igem-letter-of-support.pdf",
    };
  }

  function buildNavItems(data) {
    return NAV_ROUTES.map((route) => data.nav.find((item) => item.route === route))
      .filter(Boolean)
      .map((item) => ({
        ...item,
        shortName: NAV_LABELS[item.route] ?? item.name,
      }));
  }

  function buildProjectSections(data) {
    const projectPage = data.pages["our-projects"];
    return [
      {
        years: projectPage.texts[1],
        title: projectPage.texts[2],
        body: projectPage.texts[0],
      },
      {
        years: projectPage.texts[4],
        title: "Lyme disease mRNA vaccine",
        body: projectPage.texts[3],
      },
      {
        years: projectPage.texts[6],
        title: projectPage.texts[7],
        body: projectPage.texts[5],
      },
    ];
  }

  function buildUpdates(data) {
    const updatesPage = data.pages["progress-and-updates-blog"];
    return [
      {
        title: updatesPage.texts[0],
        body: updatesPage.texts[1],
      },
      {
        title: "June 2024 / May 2024 / January 2024",
        body: updatesPage.texts[3],
      },
    ];
  }

  function initFromData(data) {
    state.source = data;
    state.site = buildSite(data);
    state.navItems = buildNavItems(data);
    state.projectSections = buildProjectSections(data);
    state.updates = buildUpdates(data);
  }

  function textEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    return el;
  }

  function appendChildren(parent, children) {
    children.filter(Boolean).forEach((child) => parent.appendChild(child));
    return parent;
  }

  function createGrid(className, children) {
    const grid = document.createElement("div");
    grid.className = className;
    return appendChildren(grid, children);
  }

  function createParagraph(text, className = "") {
    return textEl("p", className, text);
  }

  function createLink({ href, label, external, className = "" }) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (className) link.className = className;
    if (external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    return link;
  }

  function createInstagramLink() {
    return createLink({
      href: state.site.instagramUrl,
      label: "@" + state.site.instagramHandle,
      external: true,
    });
  }

  function pageHeader(title, intro, variant) {
    const sec = document.createElement("section");
    sec.className =
      "page-header" + (variant === "hero" ? " page-header--hero" : "");

    if (variant === "hero") {
      sec.appendChild(
        textEl("p", "page-header-kicker", "Independence High School · iGEM"),
      );
    }

    sec.appendChild(textEl("h1", "", title));
    if (intro) sec.appendChild(textEl("p", "page-header-intro", intro));
    return sec;
  }

  function sectionCard(title, children, className) {
    const sec = document.createElement("section");
    sec.className = "section-card" + (className ? " " + className : "");
    if (title) sec.appendChild(textEl("h2", "", title));
    return appendChildren(sec, children);
  }

  function buttonRow(links) {
    const row = document.createElement("div");
    row.className = "button-row";

    links.forEach(({ href, label, secondary, external }) => {
      row.appendChild(
        createLink({
          href,
          label,
          external,
          className: "button-link" + (secondary ? " secondary" : ""),
        }),
      );
    });

    return row;
  }

  function createStack(cards) {
    return createGrid("stack", cards);
  }

  function createProjectCard(project) {
    return sectionCard(project.title, [
      textEl("p", "meta-line", project.years),
      createParagraph(project.body),
    ]);
  }

  function createUpdateCard(entry) {
    return sectionCard(entry.title, [createParagraph(entry.body)]);
  }

  function stemPhotoCard(photo) {
    const figure = document.createElement("figure");
    figure.className = photo.className;

    const frame = document.createElement("div");
    frame.className = "image-frame image-frame--stem-gallery";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (photo.position) img.style.objectPosition = photo.position;

    frame.appendChild(img);
    figure.appendChild(frame);
    return figure;
  }

  function createStemShowcase() {
    const showcase = document.createElement("section");
    showcase.className = "stem-showcase";

    const stemPage = getPage("stem-day");
    const details = sectionCard(
      "STEM Day 2.0 at a Glance",
      [
        createParagraph(
          "STEM Day 2.0 will bring families into Independence High School for a full lineup of student-led science, engineering, technology, and creativity stations designed to keep younger learners moving, making, and asking questions.",
        ),
        createParagraph(
          "The 2026 lineup pairs returning favorites with new demos, mixing high-energy crowd-pleasers, take-home projects, and hands-on investigations across biology, chemistry, physics, environmental science, coding, and health.",
        ),
        createParagraph(
          stemPage.texts[16] +
            stemPage.texts[17] +
            stemPage.texts[18] +
            "\n" +
            stemPage.texts[19] +
            "\n" +
            stemPage.texts[20],
        ),
      ],
      "stem-details stem-details--feature",
    );

    const photoGrid = createGrid(
      "stem-photo-grid",
      STEM_PHOTOS.map(stemPhotoCard),
    );

    showcase.appendChild(details);
    showcase.appendChild(photoGrid);
    return showcase;
  }

  function createStemActivitiesGrid() {
    return createGrid(
      "content-grid",
      STEM_ACTIVITY_HIGHLIGHTS.map((activity) =>
        sectionCard(
          activity.title,
          [createParagraph(activity.body)],
          "stem-activity-card",
        ),
      ),
    );
  }

  function homePage() {
    const home = getPage("home");
    const about = getPage("about-igem");
    const updates = getPage("progress-and-updates-blog");

    return [
      pageHeader(home.texts[0], state.site.meeting, "hero"),
      createGrid("content-grid content-grid--two", [
        sectionCard("News & updates", [
          createParagraph(home.texts[1]),
          createParagraph(updates.texts[1]),
          buttonRow([
            { href: "#/stem-day", label: "STEM Day", secondary: true },
            {
              href: "#/progress-and-updates-blog",
              label: "All updates",
              secondary: true,
            },
          ]),
        ]),
        sectionCard("Support the team", [
          createParagraph(home.texts[6]),
          createParagraph(home.texts[8]),
          buttonRow([
            { href: "#/sponsors", label: "Sponsors" },
            { href: "#/donations", label: "Donate", secondary: true },
          ]),
        ]),
      ]),
      sectionCard(
        "Join iGEM!",
        [
          createParagraph(about.texts[1]),
          buttonRow([
            { href: "#/about-igem", label: "About iGEM" },
            { href: "#/our-projects", label: "Our projects", secondary: true },
            { href: "#/contact-us", label: "Contact", secondary: true },
          ]),
        ],
        "join-card",
      ),
    ];
  }

  function aboutPage() {
    const page = getPage("about-igem");
    return [
      pageHeader(page.texts[0], page.texts[1]),
      sectionCard("Join iGEM!", [createParagraph(page.texts[2])]),
    ];
  }

  function teamPage() {
    const page = getPage("our-team");
    return [
      pageHeader(page.title, page.texts[0]),
      createGrid("content-grid two-up", [
        sectionCard("About the Team", [createParagraph(page.texts[0])]),
        sectionCard("Meetings", [createParagraph(state.site.meeting)]),
      ]),
    ];
  }

  function projectsPage() {
    return [
      pageHeader(getPage("our-projects").title),
      createStack(state.projectSections.map(createProjectCard)),
    ];
  }

  function stemDayPage() {
    const page = getPage("stem-day");
    return [
      pageHeader(page.texts[0], page.texts[1]),
      createStemShowcase(),
      sectionCard(
        "Upcoming STEM Day 2.0 Activities",
        [
          createParagraph(
            "These public-facing highlights are drawn from the 2026 planning materials and grouped to show the range of experiences families can expect on Saturday, May 16, 2026.",
          ),
          createStemActivitiesGrid(),
        ],
        "stem-activity-section",
      ),
    ];
  }

  function updatesPage() {
    return [
      pageHeader(getPage("progress-and-updates-blog").title),
      createStack(state.updates.map(createUpdateCard)),
    ];
  }

  function sponsorsPage() {
    const page = getPage("sponsors");
    const iframeSec = sectionCard(page.texts[2], []);
    const iframe = document.createElement("iframe");
    iframe.className = "pdf-frame";
    iframe.src = state.site.sponsorPdf;
    iframe.title = "Independence High School iGEM Letter of Support";
    iframeSec.appendChild(iframe);

    return [
      pageHeader(page.title, page.texts[0]),
      createGrid("content-grid two-up", [
        sectionCard("Sponsors", [
          createParagraph(page.texts[0]),
          buttonRow([
            {
              href: state.site.sponsorPdf,
              label: "Open Letter of Support",
              external: true,
            },
          ]),
        ]),
        iframeSec,
      ]),
    ];
  }

  function donationsPage() {
    const page = getPage("donations");
    const steps = document.createElement("ol");
    steps.className = "steps-list";

    [2, 3, 4].forEach((index) => {
      steps.appendChild(textEl("li", "", page.texts[index]));
    });

    return [
      pageHeader(page.title, page.texts[0]),
      sectionCard("Instructions to Donate", [
        createParagraph(page.texts[1]),
        steps,
      ]),
    ];
  }

  function contactPage() {
    const instagram = document.createElement("p");
    instagram.appendChild(createInstagramLink());

    return [
      pageHeader(getPage("contact-us").title),
      createGrid("content-grid three-up", [
        sectionCard("Address", [createParagraph(state.site.address)]),
        sectionCard("Instagram", [instagram]),
        sectionCard("Meetings", [createParagraph(state.site.meeting)]),
      ]),
    ];
  }

  const PAGE_BUILDERS = {
    home: homePage,
    "about-igem": aboutPage,
    "our-team": teamPage,
    "our-projects": projectsPage,
    "stem-day": stemDayPage,
    "progress-and-updates-blog": updatesPage,
    sponsors: sponsorsPage,
    donations: donationsPage,
    "contact-us": contactPage,
  };

  function pageContentForRoute(route) {
    return (PAGE_BUILDERS[route] ?? PAGE_BUILDERS.home)();
  }

  function refreshStagger(el) {
    el.classList.remove("stagger");
    void el.offsetHeight;
    el.classList.add("stagger");
  }

  function updateNavActive(route) {
    document.querySelectorAll("#primary-nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkRoute = href.replace(/^#\/?/, "");
      const isActive = linkRoute === route;

      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function closeNavMenu() {
    const nav = document.getElementById("primary-nav");
    const toggle = document.getElementById("nav-toggle");

    if (nav) nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  }

  function render() {
    const route = getRoute();
    const main = document.getElementById("main-content");
    if (!main) return;

    main.replaceChildren(...pageContentForRoute(route));
    refreshStagger(main);
    updateNavActive(route);
    closeNavMenu();

    const activePage = getPage(route);
    document.title = activePage.title + " | " + state.site.name;
    window.scrollTo(0, 0);
  }

  function buildBrand() {
    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "#/home";
    brand.setAttribute("aria-label", "Independence High School iGEM — home");

    const mark = document.createElement("span");
    mark.className = "brand-mark";
    const logo = document.createElement("img");
    logo.src = state.site.logo;
    logo.alt = "";
    mark.appendChild(logo);

    const brandText = document.createElement("div");
    brandText.className = "brand-text";
    brandText.appendChild(textEl("strong", "", state.site.name));
    brandText.appendChild(
      textEl("span", "", "Synthetic biology · Independence HS"),
    );

    brand.appendChild(mark);
    brand.appendChild(brandText);
    return brand;
  }

  function buildNav() {
    const nav = document.createElement("nav");
    nav.id = "primary-nav";
    nav.className = "top-nav";
    nav.setAttribute("aria-label", "Primary");

    state.navItems.forEach((item) => {
      nav.appendChild(
        createLink({
          href: "#/" + item.route,
          label: item.shortName,
        }),
      );
    });

    return nav;
  }

  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";

    const left = document.createElement("div");
    left.appendChild(textEl("strong", "", state.site.name));
    left.appendChild(createParagraph(state.site.address));

    const right = document.createElement("div");
    right.appendChild(createParagraph(state.site.meeting));
    right.appendChild(createInstagramLink());

    footer.appendChild(left);
    footer.appendChild(right);
    return footer;
  }

  function setupMenuToggle(toggle, nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNavMenu();
      }
    });
  }

  function buildShell(root) {
    const shell = document.createElement("div");
    shell.className = "app-shell";

    const skip = createLink({
      href: "#main-content",
      label: "Skip to main content",
      className: "skip-link",
    });
    shell.appendChild(skip);

    const header = document.createElement("header");
    header.className = "site-header";

    const accent = document.createElement("div");
    accent.className = "header-accent";
    accent.setAttribute("aria-hidden", "true");
    header.appendChild(accent);

    const bar = document.createElement("div");
    bar.className = "header-bar";
    bar.appendChild(buildBrand());

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.id = "nav-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-nav");
    toggle.textContent = "Menu";
    bar.appendChild(toggle);
    header.appendChild(bar);

    const nav = buildNav();
    header.appendChild(nav);
    shell.appendChild(header);

    setupMenuToggle(toggle, nav);

    const main = document.createElement("main");
    main.id = "main-content";
    main.className = "page stagger";
    main.tabIndex = -1;
    shell.appendChild(main);

    shell.appendChild(buildFooter());
    root.appendChild(shell);
  }

  function fixLegacyHash() {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();
    if (raw === "photo-gallery") {
      window.location.hash = "/home";
    }
  }

  function renderLoadError(root, error) {
    root.innerHTML =
      "<p style=\"padding:2rem;font-family:system-ui\">Could not load site data (site-extract.json). Serve this folder over HTTP (not file://) or check the path.</p>";
    console.error(error);
  }

  async function boot() {
    const root = document.getElementById("app");
    if (!root) return;

    try {
      const res = await fetch(new URL("site-extract.json", window.location.href));
      if (!res.ok) throw new Error("HTTP " + res.status);
      initFromData(await res.json());
    } catch (error) {
      renderLoadError(root, error);
      return;
    }

    buildShell(root);
    window.addEventListener("hashchange", render);

    if (!window.location.hash) window.location.hash = "/home";
    fixLegacyHash();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
