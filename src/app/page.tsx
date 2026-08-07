type Session = {
  date: string;
  dateTime: string;
  title: string;
  leader: string;
};

type Society = {
  name: string;
  description: string;
  href: string;
};

const upcomingSessions: readonly Session[] = [
  {
    date: "August 29, 2026",
    dateTime: "2026-08-29",
    title: "Augustine's Confessions (Books XI-XIII)",
    leader: "Sam Garner",
  },
];

const pastSessions: readonly Session[] = [];

const societies: readonly Society[] = [
  {
    name: "Florentine Platonic Academy",
    description: "A Renaissance circle devoted to recovering the wisdom of Plato.",
    href: "https://en.wikipedia.org/wiki/Platonic_Academy_(Florence)",
  },
  {
    name: "Society of Dilettanti",
    description: "A learned society with a long tradition of artistic and classical study.",
    href: "https://www.dilettanti.org/",
  },
  {
    name: "Lunar Society of Birmingham",
    description: "An eighteenth-century fellowship of thinkers, makers, and natural philosophers.",
    href: "https://www.birmingham.gov.uk/info/50242/local_history/1714/lunar_society",
  },
  {
    name: "The Inklings",
    description: "The Oxford literary fellowship of Lewis, Tolkien, and their friends.",
    href: "https://en.wikipedia.org/wiki/Inklings",
  },
  {
    name: "Society of Christian Philosophers",
    description: "A community fostering philosophy shaped by the Christian intellectual tradition.",
    href: "https://www.societyofchristianphilosophers.com/",
  },
];

function SessionCard({ session }: { session: Session }) {
  return (
    <article className="session-card">
      <time dateTime={session.dateTime} className="session-date">
        {session.date}
      </time>
      <h3>{session.title}</h3>
      <p>
        Discussion leader <span>{session.leader}</span>
      </p>
    </article>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-overlay" />
      <div className="page-frame">
        <header className="masthead">
          <a className="monogram" href="#top" aria-label="Moscow Evening Thought home">
            MET
          </a>
          <nav aria-label="Main navigation">
            <a href="#sessions">Sessions</a>
            <a href="#fellowships">Fellowships</a>
          </nav>
        </header>

        <section className="hero" id="top" aria-labelledby="site-title">
          <div className="ornament-line" aria-hidden="true">
            <span />
          </div>
          <p className="eyebrow">A reading fellowship</p>
          <h1 id="site-title">
            Moscow
            <span>Evening Thought</span>
          </h1>
          <p className="hosts">Hosted by Bruce Johnson &amp; Carter Brown</p>
          <div className="hero-rule" aria-hidden="true">
            <i />
          </div>
          <p className="invitation">
            &quot;...the only palliative is to keep the clean sea breeze of the
            centuries blowing through our minds, and this can be done only by
            reading old books.&quot; (C.S. Lewis) Our souls need constant feeding.
            If you&apos;re seeing this page, you probably already know this. Join us
            as we walk in the footsteps of those who came before us.
          </p>
          <a className="scroll-cue" href="#sessions">
            View the next gathering <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="sessions-section" id="sessions" aria-labelledby="sessions-title">
          <div className="section-heading">
            <p className="eyebrow">The calendar</p>
            <h2 id="sessions-title">Sessions</h2>
          </div>

          <div className="session-columns">
            <div>
              <h3 className="column-label">Upcoming</h3>
              <div className="session-list">
                {upcomingSessions.map((session) => (
                  <SessionCard key={session.dateTime} session={session} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="column-label">Past gatherings</h3>
              {pastSessions.length > 0 ? (
                <div className="session-list">
                  {pastSessions.map((session) => (
                    <SessionCard key={session.dateTime} session={session} />
                  ))}
                </div>
              ) : (
                <p className="empty-state">
                  The first entries in our common notebook are yet to be written.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="fellowships-section" id="fellowships" aria-labelledby="fellowships-title">
          <div className="section-heading">
            <p className="eyebrow">In good company</p>
            <h2 id="fellowships-title">Fellowships of the mind</h2>
          </div>
          <p className="section-intro">
            We are inspired by the tables, libraries, and long conversations that
            have kept learning alive across the centuries.
          </p>
          <div className="society-grid">
            {societies.map((society, index) => (
              <a
                className="society-link"
                href={society.href}
                key={society.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className="society-number">0{index + 1}</span>
                <span>
                  <strong>{society.name}</strong>
                  <small>{society.description}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>Moscow Evening Thought</span>
          <span>Read slowly. Think deeply. Gather often.</span>
        </footer>
      </div>
    </main>
  );
}
