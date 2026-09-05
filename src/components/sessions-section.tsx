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
        Discussion leader:{' '}
        {session.leader && session.leaderUrl ? (
          <a
            href={session.leaderUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-[#e8c77e] transition hover:text-[#f0e7d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a31]'
          >
            <span>{session.leader}</span>
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
        ) : (
          <span>{session.leader ?? 'To be announced'}</span>
        )}
      </p>
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
        <div id='upcoming-discussions'>
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

      <div
        className='mx-auto mt-16 flex w-[min(285px,70%)] items-center justify-center sm:mt-20'
        aria-hidden='true'
      >
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
        <span className='mx-[0.55rem] h-[5px] w-[5px] rotate-45 bg-[#d0ac63]' />
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
      </div>
      <div
        className='mx-auto mt-12 max-w-[650px] border border-[rgba(214,178,100,0.55)] bg-[linear-gradient(130deg,rgba(10,35,56,0.62),rgba(8,27,48,0.36))] p-6 sm:p-9'
        id='email-list'
      >
        <div className='text-center'>
          <p className='m-0 font-sans text-[0.62rem] uppercase tracking-[0.23em] text-[#e8c77e]'>
            Stay informed
          </p>
          <h3 className='mt-3 text-xl font-normal leading-none text-[#f1e6cd] sm:text-[1.75rem]'>
            Get notified when the next discussion group happens.
          </h3>
        </div>
        <form
          className='mx-auto mt-7 flex max-w-[500px] flex-col gap-3 sm:flex-row'
          name='discussion-notifications'
          method='POST'
          action='/'
          data-netlify='true'
          netlify-honeypot='bot-field'
        >
          <input type='hidden' name='form-name' value='discussion-notifications' />
          <p className='hidden'>
            <label>
              Do not fill this out if you are human: <input name='bot-field' />
            </label>
          </p>
          <label className='sr-only' htmlFor='notification-email'>
            Email address
          </label>
          <input
            className='min-w-0 flex-1 border border-[rgba(214,178,100,0.55)] bg-[#071a31]/70 px-4 py-3 font-sans text-sm text-[#f1e7cd] placeholder:text-[#c7b997]/70 focus:border-[#e8c77e] focus:outline-none focus:ring-1 focus:ring-[#e8c77e]'
            id='notification-email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='Email address'
            required
          />
          <button
            className='border border-[#d0ac63] bg-[#d0ac63] px-5 py-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#071a31] transition-colors hover:bg-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a31]'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
