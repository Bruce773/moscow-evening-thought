type Society = {
  name: string;
  href: string;
};

type HeroSectionProps = {
  societies: readonly Society[];
};

export function HeroSection({ societies }: HeroSectionProps) {
  return (
    <section
      className='mx-auto max-w-[790px] px-0 pb-[6.8rem] pt-[6.2rem] text-center sm:pb-[9.5rem] sm:pt-[6.5rem] lg:pb-[9.5rem] lg:pt-[clamp(6.5rem,14vw,10.5rem)]'
      id='top'
      aria-labelledby='site-title'
    >
      <div className='mb-6 flex items-center justify-center' aria-hidden='true'>
        <span className='h-px w-14 bg-[#d0ac63]/75' />
        <span className='mx-2 h-2 w-2 rotate-45 border border-[#d0ac63] opacity-90' />
        <span className='h-px w-14 bg-[#d0ac63]/75' />
      </div>
      <p className='m-0 font-sans text-[0.62rem] uppercase tracking-[0.27em] text-[#e8c77e]'>
        A discussion group
      </p>
      <h1
        id='site-title'
        className='mb-[1.8rem] mt-5 text-[clamp(3.5rem,16vw,4.8rem)] font-normal leading-[0.74] tracking-[-0.065em] text-[#f4ead3] sm:text-[clamp(3.9rem,9.5vw,7.6rem)]'
      >
        Moscow
        <span className='mt-[0.3em] block text-[0.61em] italic leading-none tracking-[-0.035em] text-[#e8c77e]'>
          Evening Thought
        </span>
      </h1>
      <p className='mb-[1.9rem] text-[1rem] italic tracking-[0.02em] text-[#c7b997]'>
        {/* Hosted by Bruce Johnson &amp; Carter Brown */}
      </p>
      <div className='mx-auto mb-[1.85rem] flex w-[min(285px,70%)] items-center justify-center'>
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
        <span className='mx-[0.55rem] h-[5px] w-[5px] rotate-45 bg-[#d0ac63]' />
        <span className='h-px w-full bg-[rgba(220,183,105,0.52)]' />
      </div>
      <p className='mx-auto max-w-[490px] text-sm italic leading-[1.75] text-[#ded2b7] sm:text-[clamp(1.05rem,1.65vw,1.23rem)] sm:leading-[1.82] mb-20'>
        &quot;...the only palliative is to keep the clean sea breeze of the
        centuries blowing through our minds, and this can be done only by
        reading old books.&quot; <br />
        (C.S. Lewis)
      </p>
      <p className='mx-auto max-w-[590px] text-[1rem] italic leading-[1.75] text-[#ded2b7] sm:text-[clamp(1.05rem,1.65vw,1.23rem)] sm:leading-[1.82]'>
        Our souls are affected by what we take into them. They ought to be
        oriented towards the Good, the True, and the Beautiful. Join us as we
        walk in the footsteps of those who came before us.
      </p>
      <div
        className='mx-auto mt-7 flex max-w-[660px] flex-wrap justify-center gap-2'
        aria-label='Related fellowships'
      >
        {societies.map(society => (
          <a
            href={society.href}
            key={society.name}
            target='_blank'
            rel='noreferrer'
            className='rounded-full border border-[rgba(210,174,98,0.23)] px-3 py-2 font-sans text-[0.58rem] uppercase tracking-[0.09em] text-[rgba(222,209,181,0.58)] transition-colors duration-200 hover:border-[rgba(232,199,126,0.6)] hover:text-[#e8c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c77e]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a31]'
          >
            {society.name}
          </a>
        ))}
      </div>
    </section>
  );
}
