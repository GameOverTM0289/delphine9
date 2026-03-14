import Link from 'next/link';
import Image from 'next/image';
import HeroCarouselDesktop from './HeroCarouselDesktop';

const HERO_SLIDES = [
  { src: '/landing/hero-image.png', alt: 'Delphine hero' },
  { src: '/landing/left-image.png', alt: 'Delphine swimwear editorial' },
  { src: '/landing/right-image.png', alt: 'Delphine swimwear editorial' },
];

export function HeroLanding() {
  return (
    <section id="home-hero" className="relative">
      {/* Hero image */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[90vh] min-h-[560px] max-h-[980px] w-full">
          {/* Desktop carousel */}
          <div className="hidden md:block">
            <HeroCarouselDesktop slides={HERO_SLIDES} />
          </div>

          {/* Mobile: keep a single hero image */}
          <div className="md:hidden absolute inset-0">
            <Image
              src={HERO_SLIDES[0].src}
              alt={HERO_SLIDES[0].alt}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Readability overlay (no milky/white wash) */}
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

          {/* Content */}
		<div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16">
            <h1 className="font-sans text-4xl font-medium leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl">
              Rythm of a free spirit
            </h1>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center justify-center rounded-md border border-black/15 bg-white/80 px-9 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-black shadow-[0_10px_22px_rgba(0,0,0,0.10)] transition hover:bg-white/90"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroLanding;
