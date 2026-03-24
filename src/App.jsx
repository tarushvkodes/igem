import React, { useEffect, useMemo, useState } from "react";
import source from "../site-extract.json";

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

/** Shorter labels for a tighter nav */
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

const navItems = navOrder
  .map((route) => source.nav.find((item) => item.route === route))
  .filter(Boolean)
  .map((item) => ({
    ...item,
    shortName: navLabelOverride[item.route] ?? item.name,
  }));

const baseUrl = import.meta.env.BASE_URL;

const site = {
  name: "Independence High School iGEM",
  instagramHandle: source.site.instagram,
  instagramUrl: `https://www.instagram.com/${source.site.instagram}/`,
  address: source.site.address.replace("Learning Cir", "Learning Circle"),
  meeting:
    "Interested in Indy iGEM? You can come to our meetings! iGEM takes place on Wednesdays after school in room 2517 at Independence High School.",
  logo: `${baseUrl}assets/igem-logo.png`,
  stemImage: `${baseUrl}assets/stem-day.jpg`,
  sponsorPdf: `${baseUrl}assets/igem-letter-of-support.pdf`,
};

const projectSections = [
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

const updates = [
  {
    title: source.pages["progress-and-updates-blog"].texts[0],
    body: source.pages["progress-and-updates-blog"].texts[1],
  },
  {
    title: "June 2024 / May 2024 / January 2024",
    body: source.pages["progress-and-updates-blog"].texts[3],
  },
];

const stemActivities = source.pages["stem-day"].texts.slice(6, 14);

function getRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (raw === "photo-gallery") return "home";
  return navOrder.includes(raw) ? raw : "home";
}

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    if (!window.location.hash) {
      window.location.hash = "/home";
    }
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#\/?/, "").trim();
    if (raw === "photo-gallery") {
      window.location.hash = "/home";
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const activePage = useMemo(() => source.pages[route] ?? source.pages.home, [route]);

  useEffect(() => {
    document.title = `${activePage.title} | ${site.name}`;
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="header-accent" aria-hidden="true" />
        <div className="header-bar">
          <a
            href="#/home"
            className="brand"
            aria-label="Independence High School iGEM — home"
          >
            <span className="brand-mark">
              <img src={site.logo} alt="" />
            </span>
            <div className="brand-text">
              <strong>{site.name}</strong>
              <span>Synthetic biology · Independence HS</span>
            </div>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav
          id="primary-nav"
          className={`top-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a
              key={item.route}
              href={`#/${item.route}`}
              className={route === item.route ? "is-active" : ""}
              aria-current={route === item.route ? "page" : undefined}
            >
              {item.shortName}
            </a>
          ))}
        </nav>
      </header>

      <main id="main-content" className="page stagger" tabIndex={-1}>
        {renderPage(route)}
      </main>

      <footer className="site-footer">
        <div>
          <strong>{site.name}</strong>
          <p>{site.address}</p>
        </div>
        <div>
          <p>{site.meeting}</p>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">
            @{site.instagramHandle}
          </a>
        </div>
      </footer>
    </div>
  );
}

function PageHeader({ title, intro, variant = "default" }) {
  return (
    <section
      className={`page-header${variant === "hero" ? " page-header--hero" : ""}`}
    >
      {variant === "hero" ? (
        <p className="page-header-kicker">Independence High School · iGEM</p>
      ) : null}
      <h1>{title}</h1>
      {intro ? <p className="page-header-intro">{intro}</p> : null}
    </section>
  );
}

function SectionCard({ title, children, className = "" }) {
  return (
    <section className={`section-card ${className}`.trim()}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}

function renderPage(route) {
  switch (route) {
    case "about-igem":
      return <AboutPage />;
    case "our-team":
      return <TeamPage />;
    case "our-projects":
      return <ProjectsPage />;
    case "stem-day":
      return <StemDayPage />;
    case "progress-and-updates-blog":
      return <UpdatesPage />;
    case "sponsors":
      return <SponsorsPage />;
    case "donations":
      return <DonationsPage />;
    case "contact-us":
      return <ContactPage />;
    case "home":
    default:
      return <HomePage />;
  }
}

function HomePage() {
  return (
    <>
      <PageHeader
        variant="hero"
        title={source.pages.home.texts[0]}
        intro={site.meeting}
      />

      <div className="content-grid content-grid--two">
        <SectionCard title="News & updates">
          <p>{source.pages.home.texts[1]}</p>
          <p>{source.pages["progress-and-updates-blog"].texts[1]}</p>
          <div className="button-row">
            <a href="#/stem-day" className="button-link secondary">
              STEM Day
            </a>
            <a href="#/progress-and-updates-blog" className="button-link secondary">
              All updates
            </a>
          </div>
        </SectionCard>

        <SectionCard title="Support the team">
          <p>{source.pages.home.texts[6]}</p>
          <p>{source.pages.home.texts[8]}</p>
          <div className="button-row">
            <a href="#/sponsors" className="button-link">
              Sponsors
            </a>
            <a href="#/donations" className="button-link secondary">
              Donate
            </a>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Join iGEM!" className="join-card">
        <p>{source.pages["about-igem"].texts[1]}</p>
        <div className="button-row">
          <a href="#/about-igem" className="button-link">
            About iGEM
          </a>
          <a href="#/our-projects" className="button-link secondary">
            Our projects
          </a>
          <a href="#/contact-us" className="button-link secondary">
            Contact
          </a>
        </div>
      </SectionCard>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHeader
        title={source.pages["about-igem"].texts[0]}
        intro={source.pages["about-igem"].texts[1]}
      />

      <SectionCard title="Join iGEM!">
        <p>{source.pages["about-igem"].texts[2]}</p>
      </SectionCard>
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageHeader
        title={source.pages["our-team"].title}
        intro={source.pages["our-team"].texts[0]}
      />

      <div className="content-grid two-up">
        <SectionCard title="About the Team">
          <p>{source.pages["our-team"].texts[0]}</p>
        </SectionCard>
        <SectionCard title="Meetings">
          <p>{site.meeting}</p>
        </SectionCard>
      </div>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageHeader title={source.pages["our-projects"].title} />

      <div className="stack">
        {projectSections.map((project) => (
          <SectionCard key={project.title} title={project.title}>
            <p className="meta-line">{project.years}</p>
            <p>{project.body}</p>
          </SectionCard>
        ))}
      </div>
    </>
  );
}

function StemDayPage() {
  return (
    <>
      <PageHeader
        title={source.pages["stem-day"].texts[0]}
        intro={source.pages["stem-day"].texts[1]}
      />

      <div className="content-grid feature-grid feature-grid--stem">
        <SectionCard title="Event Details" className="stem-details">
          <p>
            {source.pages["stem-day"].texts[16]} {source.pages["stem-day"].texts[17]}
            {source.pages["stem-day"].texts[18]}
          </p>
          <p>{source.pages["stem-day"].texts[19]}</p>
          <p>{source.pages["stem-day"].texts[20]}</p>
        </SectionCard>
        <div className="image-frame image-frame--photo">
          <img src={site.stemImage} alt="STEM Day at Independence High School" />
        </div>
      </div>

      <SectionCard title="STEM Day 2026 Events Include...">
        <div className="tag-grid">
          {stemActivities.map((activity) => (
            <span key={activity} className="tag">
              {activity}
            </span>
          ))}
          <span className="tag">{source.pages["stem-day"].texts[13]}</span>
        </div>
      </SectionCard>
    </>
  );
}

function UpdatesPage() {
  return (
    <>
      <PageHeader title={source.pages["progress-and-updates-blog"].title} />

      <div className="stack">
        {updates.map((entry) => (
          <SectionCard key={entry.title} title={entry.title}>
            <p>{entry.body}</p>
          </SectionCard>
        ))}
      </div>
    </>
  );
}

function SponsorsPage() {
  return (
    <>
      <PageHeader
        title={source.pages.sponsors.title}
        intro={source.pages.sponsors.texts[0]}
      />

      <div className="content-grid two-up">
        <SectionCard title="Sponsors">
          <p>{source.pages.sponsors.texts[0]}</p>
          <div className="button-row">
            <a href={site.sponsorPdf} className="button-link" target="_blank" rel="noreferrer">
              Open Letter of Support
            </a>
          </div>
        </SectionCard>

        <SectionCard title={source.pages.sponsors.texts[2]}>
          <iframe
            className="pdf-frame"
            src={site.sponsorPdf}
            title="Independence High School iGEM Letter of Support"
          />
        </SectionCard>
      </div>
    </>
  );
}

function DonationsPage() {
  return (
    <>
      <PageHeader
        title={source.pages.donations.title}
        intro={source.pages.donations.texts[0]}
      />

      <SectionCard title="Instructions to Donate">
        <p>{source.pages.donations.texts[1]}</p>
        <ol className="steps-list">
          <li>{source.pages.donations.texts[2]}</li>
          <li>{source.pages.donations.texts[3]}</li>
          <li>{source.pages.donations.texts[4]}</li>
        </ol>
      </SectionCard>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHeader title={source.pages["contact-us"].title} />

      <div className="content-grid three-up">
        <SectionCard title="Address">
          <p>{site.address}</p>
        </SectionCard>
        <SectionCard title="Instagram">
          <p>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              @{site.instagramHandle}
            </a>
          </p>
        </SectionCard>
        <SectionCard title="Meetings">
          <p>{site.meeting}</p>
        </SectionCard>
      </div>
    </>
  );
}

export default App;
