import { useEffect, useMemo, useState } from "react";

const site = {
  name: "Independence High School iGEM",
  shortName: "Indy iGEM",
  tagline: "Student-led synthetic biology, community science, and ambitious research in Ashburn, Virginia.",
  meeting: "Wednesdays after school in room 2517 at Independence High School",
  address: "23115 Learning Circle, Ashburn, VA 20148",
  instagram: "https://www.instagram.com/independence_igem/",
  logo: "./assets/igem-logo.png",
  dnaImage: "./assets/dna.jpg",
  stemImage: "./assets/stem-day.jpg",
  navigation: [
    { id: "mission", label: "Mission" },
    { id: "projects", label: "Projects" },
    { id: "stem-day", label: "STEM Day" },
    { id: "updates", label: "Updates" },
    { id: "support", label: "Support" },
    { id: "contact", label: "Contact" },
  ],
  heroBullets: [
    "Independence High School's student-driven iGEM team",
    "Synthetic biology research with real-world purpose",
    "School outreach, STEM Day, and community partnerships",
  ],
  announcements: [
    "STEM Day returns with 20+ hands-on stations and free entry for all ages.",
    "The team is actively seeking sponsors and tax-deductible donations.",
    "Students interested in research and biotech are welcome to join.",
  ],
  stats: [
    { value: "20+", label: "active student members" },
    { value: "300+", label: "visitors at last STEM Day" },
    { value: "3", label: "major project eras highlighted" },
    { value: "1", label: "mission: science that serves people" },
  ],
  mission:
    "Independence High School's iGEM team brings together students across grade levels to explore synthetic biology, pursue original research, and grow into future scientists, engineers, and science communicators.",
  igem:
    "International Genetically Engineered Machines (iGEM) is a global competition founded by MIT where student teams design biology-based solutions for real problems. It blends research, engineering, and public impact.",
  join:
    "If you're interested in science research, biotech, or building something meaningful with a motivated team, join meetings after school and follow along as the club grows.",
  projects: [
    {
      years: "2025 to present",
      title: "Restoring balance in innate immunity",
      summary:
        "The current project explores non-toxic alternatives to 4-PBA that may help regulate the TLR4 pathway and reduce chronic inflammatory imbalance.",
      details:
        "The team plans predictive software screening first, followed by lab testing in murine macrophage cultures with western blot and ELISA assays, and potentially flow cytometry in a later phase.",
    },
    {
      years: "2023 to 2025",
      title: "Lyme disease mRNA vaccine",
      summary:
        "Students investigated a Lyme-focused mRNA vaccine concept inspired by emerging mRNA platforms and recent university research.",
      details:
        "The work aimed to build on momentum in vaccine innovation while giving club members hands-on experience in modern biotechnology thinking.",
    },
    {
      years: "2021 to 2022",
      title: "Lyme-bacteria-inactivating gene drives",
      summary:
        "An earlier concept focused on engineered bacteria modeled after Wolbachia to help detect and inactivate Lyme disease in insect vectors.",
      details:
        "The proposal combined proof-of-principle work in fruit flies with longer-term ambitions for disease tracking and intervention in tick populations.",
    },
  ],
  stemDay: {
    title: "STEM Day 2026",
    description:
      "STEM Day is the club's signature outreach event, designed to bring fun science activities to young learners through more than twenty hands-on stations.",
    details: [
      "Independence High School",
      "February 28, 10 AM to 3 PM",
      "Free entry for visitors of all ages",
      "No sign-ups required",
    ],
    activities: [
      "Vortex cannon",
      "Planetarium",
      "Air trajectory",
      "Strawberry DNA extraction",
      "Ocean zones",
      "Elephant toothpaste",
      "Hovercrafts",
    ],
  },
  updates: [
    {
      date: "September 2025",
      text: "The school year is back underway, the project idea is entering its final drafts, and the interest meeting is around the corner.",
    },
    {
      date: "June 2024",
      text: "STEM Day was a major success, with strong turnout and positive experiences for both kids and volunteers.",
    },
    {
      date: "May 2024",
      text: "New members built foundational biotech skills while the club prepared for its biggest fundraising event of the year.",
    },
    {
      date: "January 2024",
      text: "The organization rapidly expanded into a roughly 20-person team with specialized departments and a growing culture of learning.",
    },
  ],
  support: [
    {
      title: "Sponsor the season",
      text: "Businesses and community partners can help cover competition, lab, outreach, and travel costs for a young and ambitious team.",
    },
    {
      title: "Make a tax-deductible donation",
      text: "Checks should be made out to Independence High School iGEM and mailed to the school address listed below.",
    },
    {
      title: "Amplify the work",
      text: "Follow the club on Instagram, share STEM Day with families, and connect students with mentors or research opportunities.",
    },
  ],
};

const designs = [
  { id: "editorial", name: "Editorial Green", mood: "Magazine-like, calm, ambitious", className: "theme-editorial" },
  { id: "lab", name: "Lab Notebook", mood: "Tactile, research-driven, human", className: "theme-lab" },
  { id: "signal", name: "Signal Pulse", mood: "Bold, future-facing, kinetic", className: "theme-signal" },
  { id: "atlas", name: "Bio Atlas", mood: "Institutional, polished, trustworthy", className: "theme-atlas" },
  { id: "festival", name: "STEM Festival", mood: "Playful, public-facing, energetic", className: "theme-festival" },
];

function App() {
  const [designId, setDesignId] = useState(designs[0].id);
  const activeDesign = useMemo(
    () => designs.find((design) => design.id === designId) ?? designs[0],
    [designId],
  );

  useEffect(() => {
    document.body.className = activeDesign.className;
  }, [activeDesign]);

  return (
    <div className={`app-shell ${activeDesign.className}`}>
      <DesignDock activeDesign={activeDesign} onChange={setDesignId} />
      <main>{renderDesign(activeDesign.id)}</main>
    </div>
  );
}

function DesignDock({ activeDesign, onChange }) {
  return (
    <aside className="design-dock">
      <div>
        <p className="eyebrow">Design switcher</p>
        <h1>Indy iGEM concepts</h1>
        <p className="dock-copy">
          Five complete directions built from the current site&apos;s content and image assets.
          Switch instantly to compare tone, layout, and emphasis.
        </p>
      </div>
      <div className="design-grid" role="tablist" aria-label="Site designs">
        {designs.map((design) => (
          <button
            key={design.id}
            className={design.id === activeDesign.id ? "is-active" : ""}
            onClick={() => onChange(design.id)}
            role="tab"
            aria-selected={design.id === activeDesign.id}
          >
            <strong>{design.name}</strong>
            <span>{design.mood}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function SiteNav({ inverse = false }) {
  return (
    <nav className={`site-nav ${inverse ? "inverse" : ""}`}>
      <a className="site-mark" href="#top">
        <img src={site.logo} alt="" />
        <span>{site.shortName}</span>
      </a>
      <div className="site-links">
        {site.navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function renderDesign(designId) {
  switch (designId) {
    case "lab":
      return <LabNotebookSite />;
    case "signal":
      return <SignalPulseSite />;
    case "atlas":
      return <BioAtlasSite />;
    case "festival":
      return <StemFestivalSite />;
    case "editorial":
    default:
      return <EditorialSite />;
  }
}

function EditorialSite() {
  return (
    <div className="site site-editorial" id="top">
      <SiteNav />
      <section className="hero editorial-hero">
        <div className="hero-copy">
          <p className="eyebrow">Synthetic biology at Independence High School</p>
          <h2>Young researchers building science that matters.</h2>
          <p className="lede">{site.tagline}</p>
          <div className="button-row">
            <a className="primary-button" href="#support">Support the team</a>
            <a className="ghost-button" href="#mission">Explore the club</a>
          </div>
        </div>
        <div className="hero-panel">
          <img src={site.logo} alt="Independence iGEM logo" />
          <ul>
            {site.heroBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="announcement-strip">
        {site.announcements.map((item) => <p key={item}>{item}</p>)}
      </section>
      <section className="stats-band">
        {site.stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>
      <section className="two-column-section" id="mission">
        <div>
          <p className="eyebrow">Mission</p>
          <h3>Research, outreach, and the next generation of scientists.</h3>
        </div>
        <div className="stacked-copy">
          <p>{site.mission}</p>
          <p>{site.igem}</p>
          <p>{site.join}</p>
        </div>
      </section>
      <section className="split-visual">
        <img src={site.dnaImage} alt="DNA illustration from the current site" />
        <div>
          <p className="eyebrow">Join iGEM</p>
          <h3>Students with curiosity belong here.</h3>
          <p>{site.meeting}</p>
          <a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">Follow @independence_igem</a>
        </div>
      </section>
      <section className="project-timeline" id="projects">
        <p className="eyebrow">Projects</p>
        <h3>A record of growing ambition.</h3>
        <div className="timeline-list">
          {site.projects.map((project) => (
            <article key={project.title}>
              <span>{project.years}</span>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <p>{project.details}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="stem-feature" id="stem-day">
        <div>
          <p className="eyebrow">STEM Day 2026</p>
          <h3>One of the club&apos;s biggest public moments.</h3>
          <p>{site.stemDay.description}</p>
          <ul className="detail-list">
            {site.stemDay.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <div className="image-card">
          <img src={site.stemImage} alt="STEM Day visual from the current site" />
          <div className="chip-cloud">
            {site.stemDay.activities.map((activity) => <span key={activity}>{activity}</span>)}
          </div>
        </div>
      </section>
      <section className="update-grid" id="updates">
        <div>
          <p className="eyebrow">Progress and updates</p>
          <h3>Momentum from the school year and beyond.</h3>
        </div>
        <div className="cards">
          {site.updates.map((update) => (
            <article key={update.date}>
              <span>{update.date}</span>
              <p>{update.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="support-panel" id="support">
        <div>
          <p className="eyebrow">Support</p>
          <h3>Help this student team go further.</h3>
        </div>
        <div className="cards">
          {site.support.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="site-footer" id="contact">
        <div>
          <h3>{site.name}</h3>
          <p>{site.address}</p>
        </div>
        <div>
          <p>{site.meeting}</p>
          <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

function LabNotebookSite() {
  return (
    <div className="site site-lab" id="top">
      <SiteNav />
      <section className="lab-header">
        <div className="lab-title">
          <p className="eyebrow">Field notes from Ashburn</p>
          <h2>Indy iGEM as a working lab notebook.</h2>
          <p>{site.tagline}</p>
        </div>
        <div className="lab-sticker">
          <img src={site.logo} alt="Independence iGEM logo" />
          <p>{site.meeting}</p>
        </div>
      </section>
      <section className="lab-board" id="mission">
        <article className="paper-card taped">
          <span className="card-label">Club mission</span>
          <p>{site.mission}</p>
        </article>
        <article className="paper-card">
          <span className="card-label">What iGEM is</span>
          <p>{site.igem}</p>
        </article>
        <article className="paper-card graph-paper">
          <span className="card-label">Why students join</span>
          <p>{site.join}</p>
        </article>
      </section>
      <section className="lab-image-row">
        <figure className="photo-frame">
          <img src={site.dnaImage} alt="DNA visual from current site" />
          <figcaption>This could be you.</figcaption>
        </figure>
        <div className="note-column">
          {site.announcements.map((item, index) => (
            <article key={item} className={`sticky-note note-${index + 1}`}>{item}</article>
          ))}
        </div>
      </section>
      <section className="lab-projects" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Research archive</p>
          <h3>Projects, hypotheses, and evolving scope.</h3>
        </div>
        <div className="lab-project-list">
          {site.projects.map((project) => (
            <article key={project.title} className="paper-card">
              <span className="card-label">{project.years}</span>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <p>{project.details}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="lab-stem-layout" id="stem-day">
        <div className="paper-card graph-paper">
          <span className="card-label">STEM Day 2026</span>
          <h3>{site.stemDay.title}</h3>
          <p>{site.stemDay.description}</p>
          <ul className="detail-list">
            {site.stemDay.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <img src={site.stemImage} alt="STEM Day graphic" className="lab-stem-photo" />
      </section>
      <section className="lab-updates" id="updates">
        {site.updates.map((update) => (
          <article key={update.date} className="update-line">
            <strong>{update.date}</strong>
            <p>{update.text}</p>
          </article>
        ))}
      </section>
      <section className="lab-support" id="support">
        {site.support.map((item) => (
          <article key={item.title} className="paper-card">
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <footer className="lab-footer" id="contact">
        <p>{site.address}</p>
        <a href={site.instagram} target="_blank" rel="noreferrer">@independence_igem</a>
      </footer>
    </div>
  );
}

function SignalPulseSite() {
  return (
    <div className="site site-signal" id="top">
      <SiteNav inverse />
      <section className="signal-hero">
        <div className="signal-grid">
          <div className="signal-copy">
            <p className="eyebrow">Signal Pulse</p>
            <h2>Student biotech with momentum, not inertia.</h2>
            <p>{site.tagline}</p>
            <div className="button-row">
              <a className="primary-button" href="#projects">View projects</a>
              <a className="ghost-button" href="#stem-day">See STEM Day</a>
            </div>
          </div>
          <div className="signal-orbit">
            <img src={site.logo} alt="Independence iGEM logo" />
            <div className="pulse-ring pulse-ring-1" />
            <div className="pulse-ring pulse-ring-2" />
            <div className="pulse-ring pulse-ring-3" />
          </div>
        </div>
        <div className="signal-marquee">
          {site.heroBullets.concat(site.announcements).map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
      <section className="signal-panels" id="mission">
        <article><h3>Why this team exists</h3><p>{site.mission}</p></article>
        <article><h3>Why iGEM matters</h3><p>{site.igem}</p></article>
        <article><h3>How to get involved</h3><p>{site.join}</p></article>
      </section>
      <section className="signal-projects" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Project spectrum</p>
          <h3>Three eras of increasingly ambitious science.</h3>
        </div>
        <div className="signal-cards">
          {site.projects.map((project) => (
            <article key={project.title}>
              <span>{project.years}</span>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <p>{project.details}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="signal-feature" id="stem-day">
        <img src={site.stemImage} alt="STEM Day graphic from current site" />
        <div>
          <p className="eyebrow">Community signal boost</p>
          <h3>{site.stemDay.title}</h3>
          <p>{site.stemDay.description}</p>
          <div className="chip-cloud">
            {site.stemDay.activities.map((activity) => <span key={activity}>{activity}</span>)}
          </div>
        </div>
      </section>
      <section className="signal-updates" id="updates">
        {site.updates.map((update) => (
          <article key={update.date}>
            <span>{update.date}</span>
            <p>{update.text}</p>
          </article>
        ))}
      </section>
      <section className="signal-support" id="support">
        <div className="section-heading">
          <p className="eyebrow">Fuel the work</p>
          <h3>Sponsors, donations, and community amplification.</h3>
        </div>
        <div className="signal-cards">
          {site.support.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="signal-footer" id="contact">
        <div><strong>{site.name}</strong><p>{site.address}</p></div>
        <div><p>{site.meeting}</p><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></div>
      </footer>
    </div>
  );
}

function BioAtlasSite() {
  return (
    <div className="site site-atlas" id="top">
      <SiteNav />
      <section className="atlas-hero">
        <div className="atlas-copy">
          <p className="eyebrow">Bio Atlas</p>
          <h2>Mapping a student pathway into research, design, and service.</h2>
          <p>{site.tagline}</p>
        </div>
        <div className="atlas-stats">
          {site.stats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="atlas-mission" id="mission">
        <article><h3>Club overview</h3><p>{site.mission}</p></article>
        <article><h3>Global context</h3><p>{site.igem}</p></article>
        <article><h3>Student pathway</h3><p>{site.join}</p></article>
      </section>
      <section className="atlas-map" id="projects">
        <div className="atlas-sidebar">
          <p className="eyebrow">Research map</p>
          <h3>From gene drives to immune regulation.</h3>
          <p>Each phase reflects a team growing in technical depth, confidence, and public-minded scientific ambition.</p>
        </div>
        <div className="atlas-route">
          {site.projects.map((project) => (
            <article key={project.title}>
              <span>{project.years}</span>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <p>{project.details}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="atlas-duo" id="stem-day">
        <article className="atlas-card image"><img src={site.dnaImage} alt="DNA visual from current site" /></article>
        <article className="atlas-card">
          <p className="eyebrow">Programs and outreach</p>
          <h3>{site.stemDay.title}</h3>
          <p>{site.stemDay.description}</p>
          <ul className="detail-list">
            {site.stemDay.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </article>
      </section>
      <section className="atlas-updates" id="updates">
        <div className="section-heading">
          <p className="eyebrow">Recent progress</p>
          <h3>Club growth, event preparation, and project development.</h3>
        </div>
        <div className="atlas-update-list">
          {site.updates.map((update) => (
            <article key={update.date}>
              <h4>{update.date}</h4>
              <p>{update.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="atlas-support" id="support">
        {site.support.map((item) => (
          <article key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <footer className="atlas-footer" id="contact">
        <div><strong>{site.name}</strong><p>{site.address}</p></div>
        <div><p>{site.meeting}</p><a href={site.instagram} target="_blank" rel="noreferrer">@independence_igem</a></div>
      </footer>
    </div>
  );
}

function StemFestivalSite() {
  return (
    <div className="site site-festival" id="top">
      <SiteNav />
      <section className="festival-hero">
        <div className="festival-badge">Community science club</div>
        <h2>Bright ideas, busy labs, and a STEM Day people remember.</h2>
        <p>{site.tagline}</p>
        <div className="festival-actions">
          <a className="primary-button" href="#stem-day">Explore STEM Day</a>
          <a className="ghost-button" href="#support">Become a sponsor</a>
        </div>
      </section>
      <section className="festival-ribbons">
        {site.announcements.map((item) => <article key={item}>{item}</article>)}
      </section>
      <section className="festival-layout" id="mission">
        <div className="festival-card tall">
          <p className="eyebrow">Who we are</p>
          <h3>{site.shortName}</h3>
          <p>{site.mission}</p>
          <p>{site.join}</p>
        </div>
        <div className="festival-card image-card"><img src={site.logo} alt="Independence iGEM logo" /></div>
        <div className="festival-card"><p className="eyebrow">What iGEM means</p><p>{site.igem}</p></div>
      </section>
      <section className="festival-projects" id="projects">
        {site.projects.map((project) => (
          <article key={project.title}>
            <span>{project.years}</span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <p>{project.details}</p>
          </article>
        ))}
      </section>
      <section className="festival-stem" id="stem-day">
        <div className="festival-stem-copy">
          <p className="eyebrow">The big outreach event</p>
          <h3>{site.stemDay.title}</h3>
          <p>{site.stemDay.description}</p>
          <ul className="detail-list">
            {site.stemDay.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <div className="festival-poster">
          <img src={site.stemImage} alt="STEM Day graphic from current site" />
          <div className="chip-cloud">
            {site.stemDay.activities.map((activity) => <span key={activity}>{activity}</span>)}
          </div>
        </div>
      </section>
      <section className="festival-updates" id="updates">
        {site.updates.map((update) => <article key={update.date}><h4>{update.date}</h4><p>{update.text}</p></article>)}
      </section>
      <section className="festival-support" id="support">
        {site.support.map((item) => <article key={item.title} className="festival-card"><h4>{item.title}</h4><p>{item.text}</p></article>)}
      </section>
      <footer className="festival-footer" id="contact">
        <strong>{site.name}</strong>
        <p>{site.address}</p>
        <a href={site.instagram} target="_blank" rel="noreferrer">Follow on Instagram</a>
      </footer>
    </div>
  );
}

export default App;
