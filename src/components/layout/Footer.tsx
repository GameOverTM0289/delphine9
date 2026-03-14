'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useUserStore } from '@/lib/store/user';

function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const FOOTER_LINKS = {
  Shop: [
    { label: 'My account', href: '/account' },
    { label: 'Item and sizes', href: '/sizes' },
    // Intentionally not implemented yet → will show our custom 404
    { label: 'Gift options', href: '/gift-options' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Payment and invoices', href: '/payment' },
    { label: 'Email us', href: '/contact' },
  ],
  Help: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Purchase conditions', href: '/terms' },
    // Intentionally not implemented yet → will show our custom 404
    { label: 'Gift card conditions', href: '/gift-card-conditions' },
    { label: 'Cookies settings', href: '/cookies' },
  ],
  About: [
    { label: 'About us', href: '/about' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const user = useUserStore((s) => s.user);
  const userFirstName = useMemo(() => {
    const name = user?.name?.trim();
    if (!name) return 'Profile';
    return name.split(' ')[0] || 'Profile';
  }, [user]);

  useEffect(() => {
    setHydrated(true);
    useWishlistStore.persist.rehydrate();
    useUserStore.persist.rehydrate();
  }, []);

  const cartCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const cartLabel = `SHOPPING BAG (${cartCount})`;

  return (
    <footer id="site-footer" className="bg-white">
      {/* Sentinel used by the fixed Header to know when the footer is in view */}
      <div id="footer-sentinel" className="h-px w-full" />

      {/* Docked nav (appears in footer; header hides when footer is visible) */}
      <div className="sticky top-0 z-40 border-t border-black/10 border-b border-black/10 bg-white">
          {/* Match header left alignment */}
          <div className="mx-auto max-w-7xl px-0 sm:px-2 lg:px-4">
            <div className="flex h-16 items-center justify-between sm:h-20">
              <Link href="/" aria-label="Delphine home" className="inline-flex items-center">
                <Image
                  src="/LOGO.png"
                  alt="Delphine"
                  width={240}
                  height={70}
                  className="mt-1 h-14 w-auto sm:h-[72px]"
                />
              </Link>

              {/* Desktop links */}
              <nav className="hidden items-center gap-8 md:flex">
                <Link
                  href="/search"
                  className={cn(
                    'inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-black hover:opacity-70 leading-none',
                    // Use a real border underline so it never disappears when the docked nav is sticky.
                    'border-b border-black/80 pb-1'
                  )}
                >
                  Search
                </Link>

                {hydrated && wishlistCount > 0 && (
                  <Link
                    href="/wishlist"
                    className="inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-black hover:opacity-70 leading-none"
                  >
                    Wishlist ({wishlistCount})
                  </Link>
                )}

                {hydrated && isAuthenticated ? (
                  <Link
                    href="/profile"
                    className="inline-flex items-center py-2 text-[11px] font-medium normal-case tracking-[0.12em] text-black hover:opacity-70 leading-none"
                  >
                    {userFirstName}
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    className="inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-black hover:opacity-70 leading-none"
                  >
                    Log in
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => openCart()}
                  className="inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-black hover:opacity-70 leading-none"
                >
                  {cartLabel}
                </button>
              </nav>

              {/* Mobile: burger only (links live inside the overlay menu) */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black/5"
                >
                  {mobileOpen ? (
                    <CloseIcon className="h-5 w-5" />
                  ) : (
                    <BurgerIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu (footer dock) */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm">
              <div className="mx-auto max-w-6xl px-4 pt-20">
                <div className="flex items-center justify-between">
                  <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Delphine home">
                    <Image
                      src="/LOGO.png"
                      alt="Delphine"
                      width={190}
                      height={56}
                      className="h-12 w-auto"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black/5"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="mt-10 grid gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      router.push('/search');
                    }}
                    className="text-left text-xs font-medium uppercase tracking-[0.28em] text-black"
                  >
                    Search
                  </button>

                  {hydrated && wishlistCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push('/wishlist');
                      }}
                      className="text-left text-xs font-medium uppercase tracking-[0.28em] text-black"
                    >
                      Wishlist ({wishlistCount})
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      router.push(hydrated && isAuthenticated ? '/profile' : '/account');
                    }}
                    className={cn(
                      'text-left text-xs font-medium uppercase tracking-[0.28em] text-black',
                      hydrated && isAuthenticated ? 'normal-case tracking-[0.12em]' : ''
                    )}
                  >
                    {hydrated && isAuthenticated ? userFirstName : 'Log in'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
                    className="text-left text-xs font-medium uppercase tracking-[0.28em] text-black"
                  >
                    {cartLabel}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      router.push('/shop');
                    }}
                    className="text-left text-xs font-medium uppercase tracking-[0.28em] text-black"
                  >
                    Shop
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>

      <div
        className={cn(
          'mx-auto max-w-7xl px-2 sm:px-4 lg:px-8',
          isHome ? 'py-24 sm:py-28' : 'py-24 sm:py-28'
        )}
      >
        <div className="grid gap-12 sm:grid-cols-3">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-black">{title}</h3>
              <ul className="mt-6 space-y-4">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('http') ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium uppercase tracking-[0.22em] text-black/80 hover:text-black"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-xs font-medium uppercase tracking-[0.22em] text-black/80 hover:text-black"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
