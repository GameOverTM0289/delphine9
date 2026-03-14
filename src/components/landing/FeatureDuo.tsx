import Image from "next/image";
import Link from "next/link";

type DuoCardProps = {
  alt: string;
  src: string;
  hoverSrc: string;
};

function DuoCard({ alt, src, hoverSrc }: DuoCardProps) {
  return (
    <Link href="/shop" className="group relative block overflow-hidden bg-white">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={hoverSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}

export function FeatureDuo() {
  return (
    <section className="bg-beige pb-12 pt-8 sm:pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-5 sm:gap-8">
          <DuoCard
            alt="Red one-piece"
            src="/landing/left-image.png"
            hoverSrc="/landing/first-product.png"
          />
          <DuoCard
            alt="Yellow one-piece"
            src="/landing/right-image.png"
            hoverSrc="/landing/third-product.png"
          />
        </div>
      </div>
    </section>
  );
}
