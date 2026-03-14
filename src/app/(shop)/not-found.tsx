import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] pt-28 pb-20">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/60">
            404
          </p>

          <h1 className="heading-1 mt-4">This page isn’t available</h1>

          <p className="mt-4 text-sm leading-6 text-black/60">
            The link you followed doesn’t exist yet, or it may have been moved.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              Home
            </Link>
            <Link href="/shop" className="btn-outline">
              Shop
            </Link>
            <Link href="/search" className="btn-outline">
              Search
            </Link>
            <Link href="/account" className="btn-outline">
              My account
            </Link>
          </div>

          <div className="mx-auto mt-12 h-px w-24 bg-black/10" />

          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-black/50">
            Delphine — Inspired by the Mediterranean
          </p>
        </div>
      </div>
    </section>
  );
}
