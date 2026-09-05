type Session = {
  date?: string;
  dateTime?: string;
  title: string;
  leader?: string;
  leaderUrl?: string;
  textUrl?: string;
  recordingUrl?: string;
};

type SessionsSectionProps = {
  upcomingSessions: readonly Session[];
  pastSessions: readonly Session[];
};

function SessionCard({ session }: { session: Session }) {
  return (
    <article className='min-h-[184px] border border-[rgba(214,178,100,0.55)] bg-[linear-gradient(130deg,rgba(10,35,56,0.62),rgba(8,27,48,0.36))] p-6'>
      {session.date ? (
        <time
          dateTime={session.dateTime}
          className='font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#e8c77e]'
        >
          {session.date}
        </time>
      ) : (
        <p className='m-0 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#e8c77e]'>
          Date to be announced
        </p>
      )}
      <h3 className='mt-3 text-[clamp(1.35rem,2.35vw,1.82rem)] font-normal leading-[1.15] text-[#f0e7d2]'>
        {session.title}
      </h3>
      <p className='mt-4 text-[0.95rem] italic text-[#c7b997]'>
        Discussion leader: <span>{session.leader ?? 'To be announced'}</span>
      </p>
      {session.leaderUrl && (
        <a
          href={session.leaderUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-5 flex items-center gap-2 border-t border-[rgba(214,178,100,0.31)] pt-4 font-sans text-[0.62rem] uppercase tracking-[0.15em] text-[#e8c77e] transition hover:text-[#f0e7d2]'
        >
          <span>Leader bio</span>
          <svg
            aria-hidden='true'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M14 5h5v5' />
            <path d='M10 14 19 5' />
            <path d='M19 13v6H5V5h6' />
          </svg>
        </a>
      )}
      {session.textUrl && (
        <a
          href={session.textUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-5 flex items-center gap-2 border-t border-[rgba(214,178,100,0.31)] pt-4 font-sans text-[0.62rem] uppercase tracking-[0.15em] text-[#e8c77e] transition hover:text-[#f0e7d2]'
        >
          <span>Read text</span>
          <svg
            aria-hidden='true'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M14 5h5v5' />
            <path d='M10 14 19 5' />
            <path d='M19 13v6H5V5h6' />
          </svg>
        </a>
      )}
      {session.recordingUrl && (
        <details className='mt-5 border-t border-[rgba(214,178,100,0.31)] pt-4'>
          <summary className='cursor-pointer font-sans text-[0.62rem] uppercase tracking-[0.15em] text-[#e8c77e]'>
            Watch recording
          </summary>
          <div className='mt-4 aspect-video overflow-hidden border border-[rgba(214,178,100,0.4)]'>
            <iframe
              className='h-full w-full'
              src={session.recordingUrl}
              title={`Recording: ${session.title}`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>
        </details>
      )}
    </article>
  );
}

export function SessionsSection({
  upcomingSessions,
  pastSessions,
}: SessionsSectionProps) {
  return (
    <section
      className='border-t border-[rgba(220,183,105,0.52)] py-[4.7rem] sm:py-[7rem]'
      id='sessions'
      aria-labelledby='sessions-title'
    >
      <div className='text-center'>
        <p className='m-0 font-sans text-[0.62rem] uppercase tracking-[0.27em] text-[#e8c77e]'>
          Our calendar
        </p>
        <h2
          id='sessions-title'
          className='mt-[0.7rem] text-[clamp(2.4rem,5vw,4rem)] font-normal leading-none tracking-[-0.04em] text-[#f1e6cd]'
        >
          Discussion Evenings
        </h2>
      </div>

      <div className='mt-12 grid gap-[clamp(2.2rem,5vw,5rem)] lg:grid-cols-2 sm:mt-[3.7rem]'>
        <div>
          <h3 className='mb-4 border-b border-[rgba(220,183,105,0.52)] pb-[0.8rem] font-sans text-[0.65rem] font-normal uppercase tracking-[0.23em] text-[#e8c77e]'>
            Upcoming
          </h3>
          <div className='grid gap-4'>
            {upcomingSessions.map(session => (
              <SessionCard
                key={session.dateTime ?? session.title}
                session={session}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className='mb-4 border-b border-[rgba(220,183,105,0.52)] pb-[0.8rem] font-sans text-[0.65rem] font-normal uppercase tracking-[0.23em] text-[#e8c77e]'>
            Previous
          </h3>
          {pastSessions.length > 0 ? (
            <div className='grid gap-4'>
              {pastSessions.map(session => (
                <SessionCard
                  key={session.dateTime ?? session.title}
                  session={session}
                />
              ))}
            </div>
          ) : (
            <p className='m-0 border-b border-[rgba(214,178,100,0.31)] py-5 text-[1.02rem] italic leading-[1.6] text-[#c7b997]'>
              {"There haven't been any discussion evenings yet"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
