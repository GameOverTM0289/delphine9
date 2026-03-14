import Link from "next/link";

import { defaultProducts } from "@/lib/data/products";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const results = q
    ? defaultProducts.filter((p) =>
        [p.name, p.description, p.category]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : defaultProducts;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-16">
      <h1 className="text-3xl tracking-tight">Search</h1>

      <form action="/search" method="get" className="mt-6 flex max-w-lg gap-2">
        <input
          name="q"
          defaultValue={searchParams.q || ""}
          placeholder="Search products"
          className="h-12 flex-1 border border-black/20 bg-white px-3 text-sm outline-none focus:border-black/40"
        />
        <button
          type="submit"
          className="h-12 border border-black/20 bg-black px-4 text-sm text-white transition-colors hover:bg-black/85"
        >
          Search
        </button>
      </form>

      <p className="mt-4 text-sm text-black/70">
        {q ? (
          <>
            Showing {results.length} result{results.length === 1 ? "" : "s"} for "{searchParams.q}".
          </>
        ) : (
          <>Showing all products.</>
        )}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group border border-black/10 bg-white p-4 transition-colors hover:border-black/20"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm tracking-wide">{p.name}</div>
                <div className="mt-1 text-xs text-black/60">{p.category}</div>
              </div>
              <div className="text-sm">€{p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
