'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = {
  src: string;
  alt: string;
};

export default function HeroCarouselDesktop({ slides }: { slides: Slide[] }) {
  const safeSlides = useMemo(() => slides.filter((s) => s?.src), [slides]);
  const [index, setIndex] = useState(0);

  // Auto-slide only on desktop.
  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const mql = window.matchMedia('(min-width: 768px)');
    if (!mql.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [safeSlides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length);
  const goNext = () => setIndex((i) => (i + 1) % safeSlides.length);

  if (safeSlides.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {safeSlides.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-out',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Controls (desktop only) */}
      {safeSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className={cn(
              'absolute left-5 top-1/2 -translate-y-1/2',
              'hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full',
              'bg-white/65 backdrop-blur-md border border-black/10',
              'text-black/80 hover:bg-white/80 hover:text-black transition'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className={cn(
              'absolute right-5 top-1/2 -translate-y-1/2',
              'hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full',
              'bg-white/65 backdrop-blur-md border border-black/10',
              'text-black/80 hover:bg-white/80 hover:text-black transition'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
