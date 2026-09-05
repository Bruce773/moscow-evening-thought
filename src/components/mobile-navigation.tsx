'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#top', label: 'What is This Group?' },
  { href: '#upcoming-discussions', label: 'Upcoming Discussions' },
  { href: '#email-list', label: 'Join Our Email List' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideInteraction = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeMenu = () => setIsOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideInteraction);
    window.addEventListener('scroll', closeMenu, { passive: true });
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideInteraction);
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className='fixed right-5 top-5 z-20 sm:hidden' ref={navigationRef}>
      <button
        className='border border-[rgba(214,178,100,0.55)] bg-[#071a31]/90 px-4 py-2 font-sans text-[0.61rem] uppercase tracking-[0.16em] text-[#e8c77e] transition hover:border-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
        type='button'
        aria-expanded={isOpen}
        aria-controls='mobile-navigation'
        onClick={() => setIsOpen(open => !open)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <nav
        className={`absolute right-0 top-full mt-2 w-56 origin-top-right border border-[rgba(214,178,100,0.55)] bg-[#071a31]/95 p-2 shadow-xl shadow-[#020812]/50 transition-all duration-200 ease-out ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
        id='mobile-navigation'
        aria-label='Mobile navigation'
        aria-hidden={!isOpen}
      >
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className='block px-3 py-3 font-sans text-[0.61rem] uppercase tracking-[0.13em] text-[#ded2b7] transition-colors hover:bg-[#0e3b5c]/60 hover:text-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60'
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
