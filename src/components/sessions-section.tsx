'use client';

import type { DiscussionEvent, DiscussionLeader } from '@/lib/discussion-events';
import { ContactUsForm } from '@/components/contact-us-form';
import { EmailSignupForm } from '@/components/email-signup-form';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type SessionsSectionProps = {
  upcomingSessions: readonly DiscussionEvent[];
  pastSessions: readonly DiscussionEvent[];
};

function formatDiscussionDate(dateTime?: string) {
  if (!dateTime) {
    return 'Date to be announced';
  }

  const date = new Date(`${dateTime}T12:00:00`);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  return `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} ${day}${suffix}, ${date.getFullYear()}`;
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden='true'
      className='h-4 w-4 shrink-0'
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
  );
}

function LeaderProfile({ leader }: { leader?: DiscussionLeader }) {
  if (!leader) {
    return null;
  }

  const profile = (
    <>
      {leader.portraitUrl ? (
        <Image
          src={leader.portraitUrl}
          alt={`Portrait of ${leader.name}`}
          width={80}
          height={80}
          className='h-20 w-20 rounded-full border border-[rgba(214,178,100,0.55)] object-cover'
        />
      ) : (
        <div
          aria-hidden='true'
          className='flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(214,178,100,0.55)] bg-[#0b2945] font-sans text-xl text-[#e8c77e]'
        >
          {leader.name
            .split(' ')
            .map(part => part[0])
            .join('')
            .replace('.', '')}
        </div>
      )}
      <div className='min-w-0'>
        <h4 className='font-normal text-xl text-[#f1e6cd]'>{leader.name}</h4>
        <p className='mt-2 text-[0.92rem] leading-6 text-[#c7b997]'>
          {leader.bio ?? 'Leader biography forthcoming.'}
        </p>
      </div>
    </>
  );

  return (
    <section className='border-t border-[rgba(214,178,100,0.31)] pt-6'>
      <p className='font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#e8c77e]'>
        Discussion leader
      </p>
      {leader.profileUrl ? (
        <a
          href={leader.profileUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 flex items-start gap-4 rounded-sm transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
        >
          {profile}
          <span className='sr-only'>Read {leader.name}&apos;s full profile</span>
        </a>
      ) : (
        <div className='mt-4 flex items-start gap-4'>{profile}</div>
      )}
    </section>
  );
}

function DiscussionModal({
  event,
  onClose,
}: {
  event: DiscussionEvent;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[#020a14]/85 p-4 backdrop-blur-sm sm:p-8'
      role='presentation'
      onMouseDown={onClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='discussion-modal-title'
        className='max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto border border-[rgba(214,178,100,0.7)] bg-[#071a31] shadow-2xl sm:max-h-[calc(100vh-4rem)]'
        onMouseDown={event => event.stopPropagation()}
      >
        <div className='p-6 sm:p-9 lg:p-11'>
          <div className='flex items-start justify-between gap-6'>
            <div>
              <p className='font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#e8c77e]'>
                Discussion evening
              </p>
              <h3
                id='discussion-modal-title'
                className='mt-3 text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] text-[#f1e6cd]'
              >
                {event.title}
              </h3>
              <time
                dateTime={event.dateTime}
                className='mt-3 block font-sans text-[0.8rem] tracking-[0.06em] text-[#c7b997]'
              >
                {formatDiscussionDate(event.dateTime)}
              </time>
            </div>
            <button
              ref={closeButtonRef}
              type='button'
              onClick={onClose}
              className='flex h-10 w-10 shrink-0 items-center justify-center border border-[rgba(214,178,100,0.55)] text-[#e8c77e] transition hover:bg-white/10 hover:text-[#f1e6cd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
              aria-label='Close discussion details'
            >
              <svg aria-hidden='true' className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
                <path d='m6 6 12 12M18 6 6 18' />
              </svg>
            </button>
          </div>

          {event.recordingUrl && (
            <div className='mt-8 aspect-video overflow-hidden border border-[rgba(214,178,100,0.4)] bg-[#020a14]'>
              <iframe
                className='h-full w-full'
                src={event.recordingUrl}
                title={`Recording: ${event.title}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            </div>
          )}

          <div className='mt-8 grid gap-6 md:grid-cols-2'>
            {event.source && (
              <section className='border-t border-[rgba(214,178,100,0.31)] pt-5'>
                <p className='font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#e8c77e]'>
                  Source
                </p>
                <a
                  href={event.source.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-3 inline-flex items-center gap-2 text-lg leading-snug text-[#f1e6cd] transition hover:text-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
                >
                  {event.source.label}
                  <ExternalLinkIcon />
                </a>
              </section>
            )}
            {event.supplementalReading && (
              <section className='border-t border-[rgba(214,178,100,0.31)] pt-5'>
                <p className='font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#e8c77e]'>
                  Supplemental reading
                </p>
                <a
                  href={event.supplementalReading.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-3 inline-flex items-center gap-2 text-lg leading-snug text-[#f1e6cd] transition hover:text-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
                >
                  {event.supplementalReading.label}
                  <ExternalLinkIcon />
                </a>
              </section>
            )}
          </div>

          <div className='mt-8'>
            <LeaderProfile leader={event.leader} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionCard({
  session,
  onSelect,
}: {
  session: DiscussionEvent;
  onSelect: (session: DiscussionEvent) => void;
}) {
  return (
    <button
      type='button'
      onClick={() => onSelect(session)}
      className='group min-h-[184px] w-full cursor-pointer border border-[rgba(214,178,100,0.55)] bg-[linear-gradient(130deg,rgba(10,35,56,0.62),rgba(8,27,48,0.36))] p-6 text-left transition hover:-translate-y-1 hover:border-[#e8c77e] hover:bg-[linear-gradient(130deg,rgba(15,48,76,0.8),rgba(8,27,48,0.6))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a31]'
    >
      <time
        dateTime={session.dateTime}
        className='font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#e8c77e]'
      >
        {formatDiscussionDate(session.dateTime)}
      </time>
      <h3 className='mt-3 text-[clamp(1.35rem,2.35vw,1.82rem)] font-normal leading-[1.15] text-[#f0e7d2]'>
        {session.title}
      </h3>
      <p className='mt-4 text-[0.95rem] italic text-[#c7b997]'>
        Discussion leader: {session.leader?.name ?? 'To be announced'}
      </p>
      <span className='mt-6 inline-flex items-center gap-2 border-t border-[rgba(214,178,100,0.31)] pt-4 font-sans text-[0.62rem] uppercase tracking-[0.15em] text-[#e8c77e] transition group-hover:text-[#f0e7d2]'>
        View discussion details
        <span aria-hidden='true' className='text-base leading-none'>→</span>
      </span>
    </button>
  );
}

export function SessionsSection({
  upcomingSessions,
  pastSessions,
}: SessionsSectionProps) {
  const [selectedSession, setSelectedSession] = useState<DiscussionEvent | null>(null);

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
              <SessionCard key={session.dateTime ?? session.title} session={session} onSelect={setSelectedSession} />
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
                <SessionCard key={session.dateTime ?? session.title} session={session} onSelect={setSelectedSession} />
              ))}
            </div>
          ) : (
            <p className='m-0 border-b border-[rgba(214,178,100,0.31)] py-5 text-[1.02rem] italic leading-[1.6] text-[#c7b997]'>
              {"There haven't been any discussion evenings yet"}
            </p>
          )}
        </div>
      </div>

      <div className='mx-auto mt-16 flex w-[min(285px,70%)] items-center justify-center sm:mt-20' aria-hidden='true'>
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
        <span className='mx-[0.55rem] h-[5px] w-[5px] rotate-45 bg-[#d0ac63]' />
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
      </div>
      <div className='mx-auto mt-12 max-w-[650px] border border-[rgba(214,178,100,0.55)] bg-[linear-gradient(130deg,rgba(10,35,56,0.62),rgba(8,27,48,0.36))] p-6 sm:p-9' id='email-list'>
        <div className='text-center'>
          <p className='m-0 font-sans text-[0.62rem] uppercase tracking-[0.23em] text-[#e8c77e]'>
            Stay informed
          </p>
          <h3 className='mt-3 text-xl font-normal leading-none text-[#f1e6cd] sm:text-[1.75rem]'>
            Get notified when the next discussion group happens.
          </h3>
        </div>
        <EmailSignupForm />
      </div>

      <div className='mx-auto mt-12 max-w-[650px] border border-[rgba(214,178,100,0.55)] bg-[linear-gradient(130deg,rgba(10,35,56,0.62),rgba(8,27,48,0.36))] p-6 sm:p-9' id='contact-us'>
        <div className='text-center'>
          <p className='m-0 font-sans text-[0.62rem] uppercase tracking-[0.23em] text-[#e8c77e]'>
            Contact us
          </p>
          <h3 className='mt-3 text-xl font-normal leading-none text-[#f1e6cd] sm:text-[1.75rem]'>
            Ask us a question or request a future discussion topic.
          </h3>
        </div>
        <ContactUsForm />
      </div>

      {selectedSession && (
        <DiscussionModal event={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
    </section>
  );
}
