'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useUserStore } from '@/lib/store/user';

function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [onHero, setOnHero] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const isHome = pathname === '/';

  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const cartCount = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items]
  );

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
    // Zustand persistence (skipHydration: true)
    useWishlistStore.persist.rehydrate();
    useUserStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Home hero: make logo white (invert) while the header sits on top of the hero imagery.
        // This keeps the brand mark readable on darker / saturated hero slides.
        if (pathname === '/') {
          const heroEl = document.getElementById('home-hero');
          if (heroEl) {
            const heroRect = heroEl.getBoundingClientRect();
            // If the hero still occupies the top portion of the viewport, we're "on hero".
            setOnHero(heroRect.bottom > 120);
          } else {
            setOnHero(false);
          }
        } else {
          setOnHero(false);
        }

        // Hide header as soon as the footer enters the viewport.
        // Requirement: when footer is visible, we should not show a second (fixed) header nav.
        const footerEl = document.getElementById('site-footer');
        if (!footerEl) {
          setFooterVisible(false);
          return;
        }

        const rect = footerEl.getBoundingClientRect();
        const isFooterVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setFooterVisible(isFooterVisible);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const shellClass = useMemo(() => {
    // Requirement: nav stays transparent (no blur / milky shadow) until the footer-docked nav takes over.
    return 'bg-transparent';
  }, []);

  const linkClass =
    'inline-flex items-center py-2 uppercase tracking-[0.25em] text-[11px] text-black/90 hover:text-black transition-colors leading-none';

  // When the footer is visible, remove the fixed header entirely so we never see two navs.
  if (footerVisible) return null;

  return (
    <header
      ref={(el) => {
        headerRef.current = el;
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-[opacity,transform] duration-200',
        shellClass
      )}
    >
      {/* Slightly more left-aligned than before (matches reference) */}
      <div className="mx-auto max-w-7xl px-0 sm:px-2 lg:px-4">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Delphine Home" className="inline-flex items-center">
            <Image
              src="/LOGO.png"
              alt="Delphine"
              width={240}
              height={70}
              priority={isHome}
              className={cn(
                'mt-2 h-14 w-auto sm:h-[72px]',
                // Make the logo white on hero slides (PNG is black-on-transparent).
                onHero ? 'filter invert' : ''
              )}
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/search"
              className={cn(
                linkClass,
                // Underline should remain visible even when the header overlaps imagery.
                'border-b border-black/80 pb-1'
              )}
            >
              SEARCH
            </Link>

            {hydrated && wishlistCount > 0 && (
              <Link href="/wishlist" className={linkClass}>
                WISHLIST ({wishlistCount})
              </Link>
            )}

            {hydrated && isAuthenticated ? (
              <Link
                href="/profile"
                className={cn(linkClass, 'normal-case tracking-[0.12em]')}
                title="Profile"
              >
                {userFirstName}
              </Link>
            ) : (
              <Link href="/account" className={linkClass}>
                Log in
              </Link>
            )}

            <button
              type="button"
              onClick={openCart}
              className={cn(linkClass, 'cursor-pointer')}
              aria-label="Open shopping bag"
            >
              SHOPPING BAG ({cartCount})
            </button>
          </nav>

          {/* Mobile: burger only (links live inside the overlay menu) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <CloseIcon className="h-5 w-5 text-black" />
              ) : (
                <BurgerIcon className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/30">
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-[360px] bg-white p-6">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Delphine Home">
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
                className="p-2"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-5 text-sm">
              <button
                type="button"
                className="text-left uppercase tracking-[0.25em]"
                onClick={() => {
                  setMobileOpen(false);
                  router.push('/search');
                }}
              >
                Search
              </button>

              {hydrated && wishlistCount > 0 && (
                <button
                  type="button"
                  className="text-left uppercase tracking-[0.25em]"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push('/wishlist');
                  }}
                >
                  Wishlist ({wishlistCount})
                </button>
              )}

              <button
                type="button"
                className={cn(
                  'text-left uppercase tracking-[0.25em]',
                  hydrated && isAuthenticated ? 'normal-case tracking-[0.12em]' : ''
                )}
                onClick={() => {
                  setMobileOpen(false);
                  router.push(hydrated && isAuthenticated ? '/profile' : '/account');
                }}
              >
                {hydrated && isAuthenticated ? userFirstName : 'Log in'}
              </button>

              <button
                type="button"
                className="text-left uppercase tracking-[0.25em]"
                onClick={() => {
                  setMobileOpen(false);
                  openCart();
                }}
              >
                Shopping bag ({cartCount})
              </button>

              <div className="h-px bg-black/10 my-2" />

              <Link
                href="/shop"
                className="uppercase tracking-[0.25em]"
                onClick={() => setMobileOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/shop?category=bikinis"
                className="uppercase tracking-[0.25em]"
                onClick={() => setMobileOpen(false)}
              >
                Bikinis
              </Link>
              <Link
                href="/shop?category=one-pieces"
                className="uppercase tracking-[0.25em]"
                onClick={() => setMobileOpen(false)}
              >
                One Pieces
              </Link>
              <Link
                href="/#our-story"
                className="uppercase tracking-[0.25em]"
                onClick={() => setMobileOpen(false)}
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
