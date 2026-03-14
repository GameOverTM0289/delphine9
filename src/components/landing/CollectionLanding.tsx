import Image from "next/image";
import Link from "next/link";

type CollectionItem = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  href?: string;
};

const ITEMS: CollectionItem[] = [
  {
    src: "/landing/first-product.png",
    alt: "Delphine collection spring",
    title: "Spring 2024",
    subtitle: "Mediterranean sun",
    href: "/shop",
  },
  {
    src: "/landing/second-product.png",
    alt: "Delphine collection fall",
    title: "Fall 2025",
    subtitle: "Region's elegance",
    href: "/shop",
  },
  {
    src: "/landing/third-product.png",
    alt: "Delphine collection summer",
    title: "Summer 2026",
    subtitle: "Enchanting beauty",
    href: "/shop",
  },
];

export function CollectionLanding() {
  return (
    <section className="bg-beige py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/80">COLLECTION</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {ITEMS.map((item) => {
            const content = (
              <>
                <div className="group relative overflow-hidden bg-white">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-[15px] font-normal tracking-[0.04em] text-black/90">{item.title}</p>
                  <p className="mt-0.5 text-sm font-normal tracking-[0.04em] text-black/60">{item.subtitle}</p>
                </div>
              </>
            );

            return item.href ? (
              <Link key={item.title} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
