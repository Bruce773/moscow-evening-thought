import { HeroSection } from '@/components/hero-section';
import { SessionsSection } from '@/components/sessions-section';
import { connection } from 'next/server';

type Session = {
  date: string;
  dateTime: string;
  title: string;
  leader: string;
  recordingUrl?: string;
};

type Society = {
  name: string;
  href: string;
};

const sessions: readonly Session[] = [
  {
    date: 'August 29, 2026',
    dateTime: '2026-08-29',
    title: "Augustine's Confessions (Books XI-XIII)",
    leader: 'Sam Garner',
    recordingUrl: 'https://www.youtube.com/embed/rGLoiybEiVQ',
  },
];

const societies: readonly Society[] = [
  {
    name: 'Florentine Platonic Academy',
    href: 'https://en.wikipedia.org/wiki/Platonic_Academy_(Florence)',
  },
  {
    name: 'Society of Dilettanti',
    href: 'https://en.wikipedia.org/wiki/Society_of_Dilettanti',
  },
  {
    name: 'Lunar Society of Birmingham',
    href: 'https://en.wikipedia.org/wiki/Lunar_Society_of_Birmingham',
  },
  {
    name: 'The Inklings',
    href: 'https://en.wikipedia.org/wiki/Inklings',
  },
  {
    name: 'Society of Christian Philosophers',
    href: 'https://www.societyofchristianphilosophers.com/',
  },
];

export default async function Home() {
  await connection();

  const today = new Date().toISOString().slice(0, 10);
  const upcomingSessions = sessions.filter(session => session.dateTime >= today);
  const pastSessions = sessions.filter(session => session.dateTime < today);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a31] bg-[url('/bg.png')] bg-[position:center_top] bg-repeat-y bg-[length:100%_auto] text-[#f1e7cd]">
      <div className='pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_11%,rgba(14,59,92,0.06),rgba(3,11,26,0.3)_66%)]' />
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,14,30,0.28),rgba(3,13,28,0.5)_46%,rgba(3,13,28,0.78))]' />
      <div className='relative mx-auto min-h-screen max-w-[1180px] border-x border-[rgba(220,183,105,0.52)] px-5 sm:px-8 lg:px-[8.5vw]'>
        <div className='pointer-events-none absolute left-[3vw] right-[3vw] top-[11px] hidden h-px bg-gradient-to-r from-transparent via-[#d0ac63] to-transparent sm:block' />
        <div className='pointer-events-none absolute left-[3vw] right-[3vw] bottom-[11px] hidden h-px bg-gradient-to-r from-transparent via-[#d0ac63] to-transparent sm:block' />

        <HeroSection societies={societies} />

        <SessionsSection
          upcomingSessions={upcomingSessions}
          pastSessions={pastSessions}
        />

        <footer className='flex flex-col gap-3 border-t border-[rgba(215,181,104,0.38)] py-7 font-sans text-[0.57rem] uppercase tracking-[0.14em] text-[#c7b997] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-7 mb-5'>
          <span>Moscow Evening Thought</span>
          <span>The Great Books, centered around The Word made flesh</span>
        </footer>
      </div>
    </main>
  );
}
