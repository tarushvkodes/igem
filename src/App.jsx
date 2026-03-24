import React, { useEffect, useMemo, useState } from "react";
import source from "../site-extract.json";

const navOrder = [
  "home",
  "about-igem",
  "our-team",
  "our-projects",
  "stem-day",
  "progress-and-updates-blog",
  "photo-gallery",
  "sponsors",
  "donations",
  "contact-us",
];

const navItems = navOrder.map((route) => source.nav.find((item) => item.route === route));

const site = {
  name: "Independence High School iGEM",
  shortName: "Indy iGEM",
  instagramHandle: source.site.instagram,
  instagramUrl: `https://www.instagram.com/${source.site.instagram}/`,
  address: source.site.address.replace("Learning Cir", "Learning Circle"),
  meeting:
    "Interested in Indy iGEM? You can come to our meetings! iGEM takes place on Wednesdays after school in room 2517 at Independence High School.",
  logo: "./assets/igem-logo.png",
  dnaImage: "./assets/dna.jpg",
  stemImage: "./assets/stem-day.jpg",
};

const projectCards = [
  {
    years: "2025 to present",
    title: "Restoring balance in innate immunity",
    body: source.pages["our-projects"].texts[0],
  },
  {
    years: "2023 to 2025",
    title: "Lyme disease mRNA vaccine",
    body: source.pages["our-projects"].texts[3],
  },
  {
    years: "2021 to 2022",
    title: "Lyme-bacteria-inactivating gene drives",
    body: source.pages["our-projects"].texts[5],
  },
];

const updateEntries = [
  {
    date: source.pages["progress-and-updates-blog"].texts[0],
    text: source.pages["progress-and-updates-blog"].texts[1],
  },
  {
    date: "JUNE 2024 / MAY 2024 / JANUARY 2024",
    text: source.pages["progress-and-updates-blog"].texts[3],
  },
];

const galleryItems = [
  {
    title: "Club identity",
    image: site.logo,
    caption: "The iGEM logo image used on the original home page banner.",
  },
  {
    title: "Join iGEM visual",
    image: site.dnaImage,
    caption: 'The DNA image featured on the original "What is iGEM?" page.',
  },
  {
    title: "STEM Day visual",
    image: site.stemImage,
    caption: 'The STEM Day image used on the original "STEM Day 2026" page.',
  },
];

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "").trim();
  return navOrder.includes(hash) ? hash : "home";
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    if (!window.location.hash) {
      window.location.hash = "/home";
    }
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const activePage = useMemo(
    () => source.pages[route] ?? source.pages.home,
    [route],
  );

  useEffect(() => {
    document.title = `${activePage.title} | ${site.name}`;
  }, [activePage]);

  return (
    <div className="app-shell">
      <SiteFrame route={route}>{renderPage(route)}</SiteFrame>
    </div>
  );
}

function SiteFrame({ route, children }) {
  return (
    <div className="brutalist-site">
      <header className="site-header">
        <a href="#/home" className="brand-block">
          <img src={site.logo} alt="Independence High School iGEM logo" />
          <div>
            <span className="kicker">Student biotech club</span>
            <strong>{site.name}</strong>
          </div>
        </a>
        <div className="header-stamp">
          <span>Ashburn, VA</span>
          <span>MIT iGEM pathway</span>
        </div>
      </header>

      <div className="app-grid">
        <aside className="sidebar">
          <p className="sidebar-label">Site map</p>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <a
                key={item.route}
                href={`#/${item.route}`}
                className={route === item.route ? "is-active" : ""}
              >
                <span>{item.name}</span>
                <small>{item.title}</small>
              </a>
            ))}
          </nav>
          <div className="sidebar-note">
            <p>Original site details retained.</p>
            <p>{site.address}</p>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              @{site.instagramHandle}
            </a>
          </div>
        </aside>

        <main className="page-shell">{children}</main>
      </div>

      <footer className="site-footer">
        <div>
          <strong>{site.name}</strong>
          <p>{site.address}</p>
        </div>
        <div>
          <p>{site.meeting}</p>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">
            Follow @{site.instagramHandle}
          </a>
        </div>
      </footer>
    </div>
  );
}

function PageIntro({ title, dek, stamp }) {
  return (
    <section className="page-intro">
      <div className="page-intro-main">
        <p className="kicker">Independence High School iGEM</p>
        <h1>{title}</h1>
        <p className="dek">{dek}</p>
      </div>
      <div className="intro-stamp">{stamp}</div>
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
    case "photo-gallery":
      return <GalleryPage />;
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
      <PageIntro
        title="Biotech with scraped knuckles."
        dek={source.pages.home.texts[0]}
        stamp="BRUTALIST EDITION"
      />

      <section className="hero-slab">
        <div className="hero-copy">
          <p>{site.meeting}</p>
          <div className="action-row">
            <a href="#/about-igem" className="action-block">
              Learn what iGEM is
            </a>
            <a href="#/donations" className="action-block alt">
              Help fund the team
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <img src={site.logo} alt="Indy iGEM logo" />
          <ul>
            <li>{source.pages.home.texts[1]}</li>
            <li>{source.pages.home.texts[2]}</li>
          </ul>
        </div>
      </section>

      <section className="brutal-grid">
        <article className="panel">
          <span className="panel-tag">Latest news</span>
          <h2>{source.pages.home.texts[9]}</h2>
          <p>{source.pages["progress-and-updates-blog"].texts[1]}</p>
        </article>
        <article className="panel acid">
          <span className="panel-tag">Join the club</span>
          <h2>{source.pages.home.texts[3]}</h2>
          <p>{source.pages.home.texts[4]}</p>
        </article>
        <article className="panel">
          <span className="panel-tag">Need</span>
          <h2>{source.pages.home.texts[5]}</h2>
          <p>{source.pages.home.texts[6]}</p>
          <h2>{source.pages.home.texts[7]}</h2>
          <p>{source.pages.home.texts[8]}</p>
        </article>
      </section>

      <section className="link-wall">
        {projectCards.map((project) => (
          <a key={project.title} href="#/our-projects" className="wall-card">
            <small>{project.years}</small>
            <strong>{project.title}</strong>
          </a>
        ))}
        <a href="#/stem-day" className="wall-card accent">
          <small>Community event</small>
          <strong>STEM Day 2026</strong>
        </a>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro
        title={source.pages["about-igem"].texts[0]}
        dek={source.pages["about-igem"].texts[1]}
        stamp="JOIN iGEM!"
      />
      <section className="split-block">
        <div className="panel">
          <span className="panel-tag">Original join note</span>
          <p>{source.pages["about-igem"].texts[2]}</p>
          <p>{source.pages["about-igem"].texts[3]}</p>
        </div>
        <div className="media-panel">
          <img src={site.dnaImage} alt="DNA illustration from original site" />
        </div>
      </section>
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageIntro
        title={source.pages["our-team"].title}
        dek={source.pages["our-team"].texts[0]}
        stamp="AROUND 20 MEMBERS"
      />
      <section className="brutal-grid">
        <article className="panel">
          <span className="panel-tag">Who they are</span>
          <p>{source.pages["our-team"].texts[0]}</p>
        </article>
        <article className="panel acid">
          <span className="panel-tag">Where to find them</span>
          <p>{site.meeting}</p>
          <p>{site.address}</p>
        </article>
      </section>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageIntro
        title={source.pages["our-projects"].title}
        dek="Three phases of club research pulled from the original site, presented as blunt project dossiers."
        stamp="RESEARCH DOSSIERS"
      />
      <section className="stack">
        {projectCards.map((project) => (
          <article key={project.title} className="project-strip">
            <div className="project-meta">
              <span>{project.years}</span>
              <h2>{project.title}</h2>
            </div>
            <p>{project.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function StemDayPage() {
  return (
    <>
      <PageIntro
        title={source.pages["stem-day"].texts[0]}
        dek={source.pages["stem-day"].texts[1]}
        stamp="300+ VISITORS LAST YEAR"
      />
      <section className="split-block">
        <div className="media-panel">
          <img src={site.stemImage} alt="Original STEM Day graphic" />
        </div>
        <div className="panel acid">
          <span className="panel-tag">Event details</span>
          <p>
            {source.pages["stem-day"].texts[16]} {source.pages["stem-day"].texts[17]}
            {source.pages["stem-day"].texts[18]}
          </p>
          <p>{source.pages["stem-day"].texts[19]}</p>
          <p>{source.pages["stem-day"].texts[20]}</p>
        </div>
      </section>
      <section className="link-wall">
        {source.pages["stem-day"].texts.slice(6, 14).map((activity) => (
          <div key={activity} className="wall-card">
            <strong>{activity}</strong>
          </div>
        ))}
      </section>
    </>
  );
}

function UpdatesPage() {
  return (
    <>
      <PageIntro
        title={source.pages["progress-and-updates-blog"].title}
        dek="An archive of club momentum, exactly the kind of running log that suits a raw, poster-heavy aesthetic."
        stamp="PROGRESS LOG"
      />
      <section className="stack">
        {updateEntries.map((entry) => (
          <article key={entry.date} className="update-block">
            <div className="update-date">{entry.date}</div>
            <p>{entry.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageIntro
        title={source.pages["photo-gallery"].title}
        dek="The original site exposed a gallery page with minimal body copy, so this page turns the original visual assets into a hard-edged archive wall."
        stamp="VISUAL ARCHIVE"
      />
      <section className="gallery-grid">
        {galleryItems.map((item) => (
          <figure key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} />
            <figcaption>
              <strong>{item.title}</strong>
              <p>{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

function SponsorsPage() {
  return (
    <>
      <PageIntro
        title={source.pages.sponsors.title}
        dek={source.pages.sponsors.texts[0]}
        stamp="SPONSORS NEEDED"
      />
      <section className="brutal-grid">
        <article className="panel acid">
          <span className="panel-tag">Original callout</span>
          <h2>{source.pages.sponsors.texts[1]}</h2>
          <p>{source.pages.sponsors.texts[0]}</p>
        </article>
        <article className="panel">
          <span className="panel-tag">Referenced asset</span>
          <h2>{source.pages.sponsors.texts[2]}</h2>
          <p>
            The original site references a letter of support below this heading,
            but no linked file was exposed in the extracted site data.
          </p>
        </article>
      </section>
    </>
  );
}

function DonationsPage() {
  return (
    <>
      <PageIntro
        title={source.pages.donations.title}
        dek={source.pages.donations.texts[0]}
        stamp="TAX-DEDUCTIBLE"
      />
      <section className="stack">
        <article className="project-strip">
          <div className="project-meta">
            <span>Original instructions</span>
            <h2>How to donate</h2>
          </div>
          <div>
            <p>{source.pages.donations.texts[1]}</p>
            <ol className="steps-list">
              <li>{source.pages.donations.texts[2]}</li>
              <li>{source.pages.donations.texts[3]}</li>
              <li>{source.pages.donations.texts[4]}</li>
            </ol>
          </div>
        </article>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageIntro
        title={source.pages["contact-us"].title}
        dek="The original contact page carried its title but little body copy. This version preserves the contact intent and surfaces the club details already present across the site."
        stamp="GET IN TOUCH"
      />
      <section className="brutal-grid">
        <article className="panel">
          <span className="panel-tag">Address</span>
          <p>{site.address}</p>
        </article>
        <article className="panel acid">
          <span className="panel-tag">Instagram</span>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer">
            @{site.instagramHandle}
          </a>
        </article>
        <article className="panel">
          <span className="panel-tag">Meetings</span>
          <p>{site.meeting}</p>
        </article>
      </section>
    </>
  );
}

export default App;
