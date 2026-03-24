(function () {
  "use strict";

  const navOrder = [
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

  const navLabelOverride = {
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

  let source;
  let site;
  let navItems;
  let projectSections;
  let updates;
  let stemActivities;

  function getRoute() {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();
    if (raw === "photo-gallery") return "home";
    return navOrder.includes(raw) ? raw : "home";
  }

  function initFromData(data) {
    source = data;
    site = {
      name: "Independence High School iGEM",
      instagramHandle: source.site.instagram,
      instagramUrl: `https://www.instagram.com/${source.site.instagram}/`,
      address: source.site.address.replace("Learning Cir", "Learning Circle"),
      meeting:
        "Interested in Indy iGEM? You can come to our meetings! iGEM takes place on Wednesdays after school in room 2517 at Independence High School.",
      logo: "assets/igem-logo.png",
      stemImage: "assets/stem-day.jpg",
      sponsorPdf: "assets/igem-letter-of-support.pdf",
    };
    navItems = navOrder
      .map((route) => source.nav.find((item) => item.route === route))
      .filter(Boolean)
      .map((item) => ({
        ...item,
        shortName: navLabelOverride[item.route] ?? item.name,
      }));
    projectSections = [
      {
        years: source.pages["our-projects"].texts[1],
        title: source.pages["our-projects"].texts[2],
        body: source.pages["our-projects"].texts[0],
      },
      {
        years: source.pages["our-projects"].texts[4],
        title: "Lyme disease mRNA vaccine",
        body: source.pages["our-projects"].texts[3],
      },
      {
        years: source.pages["our-projects"].texts[6],
        title: source.pages["our-projects"].texts[7],
        body: source.pages["our-projects"].texts[5],
      },
    ];
    updates = [
      {
        title: source.pages["progress-and-updates-blog"].texts[0],
        body: source.pages["progress-and-updates-blog"].texts[1],
      },
      {
        title: "June 2024 / May 2024 / January 2024",
        body: source.pages["progress-and-updates-blog"].texts[3],
      },
    ];
    stemActivities = source.pages["stem-day"].texts.slice(6, 14);
  }

  function textEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    return el;
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

  function sectionCard(title, innerEls, className) {
    const sec = document.createElement("section");
    sec.className = "section-card" + (className ? " " + className : "");
    if (title) sec.appendChild(textEl("h2", "", title));
    innerEls.forEach((node) => sec.appendChild(node));
    return sec;
  }

  function buttonRow(links) {
    const row = document.createElement("div");
    row.className = "button-row";
    links.forEach(({ href, label, secondary, external }) => {
      const a = document.createElement("a");
      a.href = href;
      a.className = "button-link" + (secondary ? " secondary" : "");
      a.textContent = label;
      if (external) {
        a.target = "_blank";
        a.rel = "noreferrer";
      }
      row.appendChild(a);
    });
    return row;
  }

  function homePage() {
    return [
      pageHeader(source.pages.home.texts[0], site.meeting, "hero"),
      (() => {
        const grid = document.createElement("div");
        grid.className = "content-grid content-grid--two";
        grid.appendChild(
          sectionCard(
            "News & updates",
            [
              textEl("p", "", source.pages.home.texts[1]),
              textEl("p", "", source.pages["progress-and-updates-blog"].texts[1]),
              buttonRow([
                { href: "#/stem-day", label: "STEM Day", secondary: true },
                {
                  href: "#/progress-and-updates-blog",
                  label: "All updates",
                  secondary: true,
                },
              ]),
            ],
            "",
          ),
        );
        grid.appendChild(
          sectionCard(
            "Support the team",
            [
              textEl("p", "", source.pages.home.texts[6]),
              textEl("p", "", source.pages.home.texts[8]),
              buttonRow([
                { href: "#/sponsors", label: "Sponsors" },
                { href: "#/donations", label: "Donate", secondary: true },
              ]),
            ],
            "",
          ),
        );
        return grid;
      })(),
      sectionCard(
        "Join iGEM!",
        [
          textEl("p", "", source.pages["about-igem"].texts[1]),
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
    return [
      pageHeader(
        source.pages["about-igem"].texts[0],
        source.pages["about-igem"].texts[1],
      ),
      sectionCard("Join iGEM!", [
        textEl("p", "", source.pages["about-igem"].texts[2]),
      ]),
    ];
  }

  function teamPage() {
    return [
      pageHeader(
        source.pages["our-team"].title,
        source.pages["our-team"].texts[0],
      ),
      (() => {
        const grid = document.createElement("div");
        grid.className = "content-grid two-up";
        grid.appendChild(
          sectionCard("About the Team", [
            textEl("p", "", source.pages["our-team"].texts[0]),
          ]),
        );
        grid.appendChild(
          sectionCard("Meetings", [textEl("p", "", site.meeting)]),
        );
        return grid;
      })(),
    ];
  }

  function projectsPage() {
    const parts = [pageHeader(source.pages["our-projects"].title)];
    const stack = document.createElement("div");
    stack.className = "stack";
    projectSections.forEach((project) => {
      const meta = textEl("p", "meta-line", project.years);
      const body = textEl("p", "", project.body);
      stack.appendChild(sectionCard(project.title, [meta, body]));
    });
    parts.push(stack);
    return parts;
  }

  function stemDayPage() {
    const grid = document.createElement("div");
    grid.className = "content-grid feature-grid feature-grid--stem";
    grid.appendChild(
      sectionCard(
        "Event Details",
        [
          textEl(
            "p",
            "",
            source.pages["stem-day"].texts[16] +
              source.pages["stem-day"].texts[17] +
              source.pages["stem-day"].texts[18],
          ),
          textEl("p", "", source.pages["stem-day"].texts[19]),
          textEl("p", "", source.pages["stem-day"].texts[20]),
        ],
        "stem-details",
      ),
    );
    const frame = document.createElement("div");
    frame.className = "image-frame image-frame--photo";
    const img = document.createElement("img");
    img.src = site.stemImage;
    img.alt = "STEM Day at Independence High School";
    frame.appendChild(img);
    grid.appendChild(frame);

    const tagGrid = document.createElement("div");
    tagGrid.className = "tag-grid";
    stemActivities.forEach((activity) => {
      tagGrid.appendChild(textEl("span", "tag", activity));
    });
    tagGrid.appendChild(
      textEl("span", "tag", source.pages["stem-day"].texts[13]),
    );

    return [
      pageHeader(
        source.pages["stem-day"].texts[0],
        source.pages["stem-day"].texts[1],
      ),
      grid,
      sectionCard("STEM Day 2026 Events Include...", [tagGrid]),
    ];
  }

  function updatesPage() {
    const parts = [
      pageHeader(source.pages["progress-and-updates-blog"].title),
    ];
    const stack = document.createElement("div");
    stack.className = "stack";
    updates.forEach((entry) => {
      stack.appendChild(sectionCard(entry.title, [textEl("p", "", entry.body)]));
    });
    parts.push(stack);
    return parts;
  }

  function sponsorsPage() {
    const grid = document.createElement("div");
    grid.className = "content-grid two-up";
    const row = buttonRow([
      {
        href: site.sponsorPdf,
        label: "Open Letter of Support",
        external: true,
      },
    ]);
    grid.appendChild(
      sectionCard("Sponsors", [
        textEl("p", "", source.pages.sponsors.texts[0]),
        row,
      ]),
    );
    const iframeSec = sectionCard(source.pages.sponsors.texts[2], []);
    const iframe = document.createElement("iframe");
    iframe.className = "pdf-frame";
    iframe.src = site.sponsorPdf;
    iframe.title = "Independence High School iGEM Letter of Support";
    iframeSec.appendChild(iframe);
    grid.appendChild(iframeSec);
    return [
      pageHeader(
        source.pages.sponsors.title,
        source.pages.sponsors.texts[0],
      ),
      grid,
    ];
  }

  function donationsPage() {
    const ol = document.createElement("ol");
    ol.className = "steps-list";
    [2, 3, 4].forEach((i) => {
      ol.appendChild(textEl("li", "", source.pages.donations.texts[i]));
    });
    return [
      pageHeader(
        source.pages.donations.title,
        source.pages.donations.texts[0],
      ),
      sectionCard("Instructions to Donate", [
        textEl("p", "", source.pages.donations.texts[1]),
        ol,
      ]),
    ];
  }

  function contactPage() {
    const grid = document.createElement("div");
    grid.className = "content-grid three-up";
    grid.appendChild(
      sectionCard("Address", [textEl("p", "", site.address)]),
    );
    const ig = document.createElement("p");
    const a = document.createElement("a");
    a.href = site.instagramUrl;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "@" + site.instagramHandle;
    ig.appendChild(a);
    grid.appendChild(sectionCard("Instagram", [ig]));
    grid.appendChild(
      sectionCard("Meetings", [textEl("p", "", site.meeting)]),
    );
    return [pageHeader(source.pages["contact-us"].title), grid];
  }

  function pageContentForRoute(route) {
    switch (route) {
      case "about-igem":
        return aboutPage();
      case "our-team":
        return teamPage();
      case "our-projects":
        return projectsPage();
      case "stem-day":
        return stemDayPage();
      case "progress-and-updates-blog":
        return updatesPage();
      case "sponsors":
        return sponsorsPage();
      case "donations":
        return donationsPage();
      case "contact-us":
        return contactPage();
      case "home":
      default:
        return homePage();
    }
  }

  function refreshStagger(el) {
    el.classList.remove("stagger");
    void el.offsetHeight;
    el.classList.add("stagger");
  }

  function updateNavActive(route) {
    document.querySelectorAll("#primary-nav a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const r = href.replace(/^#\/?/, "");
      const active = r === route;
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function render() {
    const route = getRoute();
    const main = document.getElementById("main-content");
    if (!main) return;
    main.replaceChildren();
    pageContentForRoute(route).forEach((node) => main.appendChild(node));
    refreshStagger(main);
    updateNavActive(route);
    const activePage = source.pages[route] ?? source.pages.home;
    document.title = activePage.title + " | " + site.name;
    window.scrollTo(0, 0);
    const nav = document.getElementById("primary-nav");
    const toggle = document.getElementById("nav-toggle");
    if (nav) nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  }

  function buildShell(root) {
    const shell = document.createElement("div");
    shell.className = "app-shell";

    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main-content";
    skip.textContent = "Skip to main content";
    shell.appendChild(skip);

    const header = document.createElement("header");
    header.className = "site-header";
    const accent = document.createElement("div");
    accent.className = "header-accent";
    accent.setAttribute("aria-hidden", "true");
    header.appendChild(accent);

    const bar = document.createElement("div");
    bar.className = "header-bar";
    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "#/home";
    brand.setAttribute(
      "aria-label",
      "Independence High School iGEM — home",
    );
    const mark = document.createElement("span");
    mark.className = "brand-mark";
    const logo = document.createElement("img");
    logo.src = site.logo;
    logo.alt = "";
    mark.appendChild(logo);
    brand.appendChild(mark);
    const brandText = document.createElement("div");
    brandText.className = "brand-text";
    brandText.appendChild(textEl("strong", "", site.name));
    brandText.appendChild(
      textEl("span", "", "Synthetic biology · Independence HS"),
    );
    brand.appendChild(brandText);
    bar.appendChild(brand);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.id = "nav-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-nav");
    toggle.textContent = "Menu";
    bar.appendChild(toggle);
    header.appendChild(bar);

    const nav = document.createElement("nav");
    nav.id = "primary-nav";
    nav.className = "top-nav";
    nav.setAttribute("aria-label", "Primary");
    navItems.forEach((item) => {
      const a = document.createElement("a");
      a.href = "#/" + item.route;
      a.textContent = item.shortName;
      nav.appendChild(a);
    });
    header.appendChild(nav);
    shell.appendChild(header);

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });

    const main = document.createElement("main");
    main.id = "main-content";
    main.className = "page stagger";
    main.tabIndex = -1;
    shell.appendChild(main);

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    const col1 = document.createElement("div");
    col1.appendChild(textEl("strong", "", site.name));
    col1.appendChild(textEl("p", "", site.address));
    const col2 = document.createElement("div");
    col2.appendChild(textEl("p", "", site.meeting));
    const ig = document.createElement("a");
    ig.href = site.instagramUrl;
    ig.target = "_blank";
    ig.rel = "noreferrer";
    ig.textContent = "@" + site.instagramHandle;
    col2.appendChild(ig);
    footer.appendChild(col1);
    footer.appendChild(col2);
    shell.appendChild(footer);

    root.appendChild(shell);
  }

  function fixLegacyHash() {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();
    if (raw === "photo-gallery") {
      window.location.hash = "/home";
    }
  }

  async function boot() {
    const root = document.getElementById("app");
    if (!root) return;

    try {
      const res = await fetch(new URL("site-extract.json", window.location.href));
      if (!res.ok) throw new Error("HTTP " + res.status);
      initFromData(await res.json());
    } catch (err) {
      root.innerHTML =
        "<p style=\"padding:2rem;font-family:system-ui\">Could not load site data (site-extract.json). Serve this folder over HTTP (not file://) or check the path.</p>";
      console.error(err);
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
