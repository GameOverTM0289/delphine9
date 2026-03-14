import Image from 'next/image';
import Link from 'next/link';

export function OurStoryLanding() {
  return (
    <section className="relative w-full overflow-hidden bg-[#E8DACB]">
      <div className="relative h-[90vh] min-h-[560px] w-full">
        <Image
          src="/landing/our-story.png"
          alt="Our story background"
          fill
          className="object-cover object-center"
        />
		{/* subtle darkening so white/black text reads better */}
		{/* Make the image slightly softer so dark typography stays readable */}
		<div className="absolute inset-0 bg-white/[0.12]" />

		<div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-4 pt-16 pb-14 text-center sm:pt-20 sm:pb-16">
          {/* Header - slightly lower than before */}
			<div className="mt-14 text-[11px] font-medium uppercase tracking-[0.35em] text-black/75">
            Our Story
          </div>

          {/* Main content pushed down */}
          <div className="flex flex-1 flex-col items-center justify-end pb-2">
            <h3 className="font-sans text-4xl font-light leading-[1.02] tracking-tight text-black sm:text-5xl md:text-6xl">
              Inspired by the
            </h3>
			<h2 className="-mt-1 font-sans text-5xl font-medium leading-[0.98] tracking-tight text-black sm:text-6xl md:text-7xl">
              Mediterranean
            </h2>

			<p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/70 sm:text-base">
              Delphine is a swimwear brand inspired by the enchanting beauty of the Mediterranean. We aim to
              translate the region&apos;s elegance, history, and natural wonders into swimwear that speaks of grace,
              freedom, and authenticity.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                href="/about"
                className="text-[12px] font-medium text-black/80 underline-offset-4 hover:underline"
              >
                Read more
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/70 text-black transition-colors hover:bg-white/85"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/70 text-black transition-colors hover:bg-white/85"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14 9h3V6h-3c-2 0-4 2-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.6.4-1 1-1Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStoryLanding;
