"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Badge = "new" | "points" | null;

type Product = {
  id: string;
  title: string;
  image: string;
  age: string;
  pieces: number;
  rating: number;
  reviews: number;
  price: number;
  badge: Badge;
  inStock: boolean;
  playType: "Build Together" | "Solo build" | "Display";
  productType: "Sets" | "Home decor" | "Collectibles";
};

const PRODUCTS: Product[] = [
  {
    id: "p0",
    title: "Ginger Sahur",
    image: "/lego/sahur.png",
    age: "18+",
    pieces: 1847,
    rating: 4.9,
    reviews: 812,
    price: 199.99,
    badge: "new",
    inStock: false,
    playType: "Display",
    productType: "Sets",
  },
  {
    id: "p1",
    title: "Battle of the Plex",
    image: "/lego/plex.png",
    age: "10+",
    pieces: 1247,
    rating: 4.7,
    reviews: 231,
    price: 99.99,
    badge: "points",
    inStock: false,
    playType: "Build Together",
    productType: "Sets",
  },
  {
    id: "p2",
    title: "The Bert Destroyer",
    image: "/lego/bert.png",
    age: "18+",
    pieces: 6542,
    rating: 1.8,
    reviews: 767,
    price: 699.99,
    badge: "new",
    inStock: false,
    playType: "Display",
    productType: "Sets",
  },
  {
    id: "p3",
    title: "The Mint Alliance vs Backwards Borgsdale",
    image: "/lego/mint.png",
    age: "10+",
    pieces: 1001,
    rating: 4.7,
    reviews: 231,
    price: 99.99,
    badge: "points",
    inStock: false,
    playType: "Build Together",
    productType: "Sets",
  },
  {
    id: "p4",
    title: "Shifu's Kung Fu Dojo",
    image: "/lego/shifu.png",
    age: "8+",
    pieces: 512,
    rating: 4.8,
    reviews: 123,
    price: 49.99,
    badge: "new",
    inStock: false,
    playType: "Build Together",
    productType: "Sets",
  },
];

const PLAY_TYPES = ["Build Together", "Solo build", "Display"] as const;
const PRODUCT_TYPES = ["Sets", "Home decor", "Collectibles"] as const;

const PRICE_BUCKETS = [
  { id: "u50", label: "Under $50", test: (p: number) => p < 50 },
  { id: "50-100", label: "$50 – $100", test: (p: number) => p >= 50 && p < 100 },
  { id: "100-200", label: "$100 – $200", test: (p: number) => p >= 100 && p < 200 },
  { id: "200p", label: "$200+", test: (p: number) => p >= 200 },
] as const;

function StarRow({ value }: { value: number }) {
  const filled = Math.min(5, Math.round(value));
  return (
    <span className="inline-flex items-center gap-0.5 text-[#FFD500]" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < filled ? "fill-current" : "fill-zinc-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1.5l2.47 5.01L18 7.36l-4 3.9.94 5.49L10 14.9l-4.94 2.6.94-5.49-4-3.9 5.53-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group border-b border-zinc-200 py-3"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-zinc-800 [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          className="h-4 w-4 text-zinc-500 transition group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="mt-3 space-y-2">{children}</div>
    </details>
  );
}

export default function GingerCoolLegoShopPage() {
  const [stockOnly, setStockOnly] = useState(false);
  const [playTypes, setPlayTypes] = useState<Set<string>>(new Set());
  const [productTypes, setProductTypes] = useState<Set<string>>(new Set());
  const [priceIds, setPriceIds] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc" | "newest">(
    "recommended",
  );
  const [bagCount, setBagCount] = useState(0);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (stockOnly && !p.inStock) return false;
      if (playTypes.size && !playTypes.has(p.playType)) return false;
      if (productTypes.size && !productTypes.has(p.productType)) return false;
      if (priceIds.size) {
        const ok = [...priceIds].some((id) => {
          const b = PRICE_BUCKETS.find((x) => x.id === id);
          return b ? b.test(p.price) : false;
        });
        if (!ok) return false;
      }
      return true;
    });

    const copy = [...list];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    else if (sort === "newest") copy.sort((a, b) => (a.badge === "new" ? -1 : 0) - (b.badge === "new" ? -1 : 0));
    return copy;
  }, [stockOnly, playTypes, productTypes, priceIds, sort]);

  function toggleSet(
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string,
  ) {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen pb-16 font-sans">
      {/* Primary header — LEGO-inspired yellow bar */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FFD500] shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-6">
          <a href="/ginger-cool-lego" className="flex shrink-0 items-center gap-3">
            <span
              className="flex text-display text-5xl font-bold text-[#E3000B] h-12 w-12 items-center justify-center rounded border-2 border-white bg-[#E3000B] text-center text-[10px] font-black leading-tight tracking-tight text-white shadow-md"
              aria-hidden
            >
              LEGO
            </span>
          </a>

          <nav className="hidden items-center gap-1 text-sm font-bold uppercase tracking-wide text-black md:flex">
            <button type="button" className="rounded px-3 py-2 hover:bg-black/5">
              Shop
            </button>
            <button type="button" className="rounded px-3 py-2 hover:bg-black/5">
              Discover
            </button>
            <button type="button" className="rounded px-3 py-2 hover:bg-black/5">
              Help
            </button>
            <span className="ml-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-black shadow-sm">
              New
            </span>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden min-w-[200px] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-zinc-500 shadow-inner sm:flex">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="truncate">Search sets…</span>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
              aria-label="Wishlist"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
              aria-label={`Bag, ${bagCount} items`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E3000B] px-1 text-[10px] font-bold text-white">
                {bagCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Secondary bar */}
      <div className="border-b border-zinc-200 bg-zinc-100">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 text-xs font-semibold text-zinc-600 md:px-6">
          <button type="button" className="hover:text-black hover:underline">
            Sign In
          </button>
          <button type="button" className="hover:text-black hover:underline">
            Saga Insiders
          </button>
          <button type="button" className="hover:text-black hover:underline">
            Play Zone
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-3 text-xs text-zinc-500 md:px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <span className="hover:text-black">Home</span>
              </li>
              <li aria-hidden>/</li>
              <li>
                <span className="hover:text-black">Sets by theme</span>
              </li>
              <li aria-hidden>/</li>
              <li>
                <span className="hover:text-black">Ginger Cool Saga</span>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-zinc-800">Sets &amp; display builds</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category hero */}
      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-6 px-4 py-14 md:flex-row md:justify-between md:px-6 md:py-16">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-400">
              Ginger Cool Saga Sets
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold uppercase italic tracking-tight text-white md:text-5xl">
              Ginger Cool Saga
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Buildable moments from the saga.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-lg hover:bg-zinc-100"
            >
              Products
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Main: sidebar + grid */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-8 lg:flex-row lg:px-6">
        <aside className="w-full shrink-0 lg:w-[260px]">
          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Filter</h3>
          <div className="mt-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <label className="flex cursor-pointer items-center gap-3 border-b border-zinc-100 pb-4 text-sm font-semibold text-zinc-800">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 accent-[#E3000B]"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
              />
              Show in stock only
            </label>

            <FilterSection title="Play type">
              {PLAY_TYPES.map((pt) => (
                <label key={pt} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 accent-[#E3000B]"
                    checked={playTypes.has(pt)}
                    onChange={() => toggleSet(setPlayTypes, pt)}
                  />
                  {pt}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Product type">
              {PRODUCT_TYPES.map((pt) => (
                <label key={pt} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 accent-[#E3000B]"
                    checked={productTypes.has(pt)}
                    onChange={() => toggleSet(setProductTypes, pt)}
                  />
                  {pt}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Price">
              {PRICE_BUCKETS.map((b) => (
                <label key={b.id} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 accent-[#E3000B]"
                    checked={priceIds.has(b.id)}
                    onChange={() => toggleSet(setPriceIds, b.id)}
                  />
                  {b.label}
                </label>
              ))}
            </FilterSection>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-zinc-700">
              Showing <span className="text-black">{filtered.length}</span> products
            </p>
            <label className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-800">Sort by:</span>
              <select
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-zinc-500">
              No sets match those filters. Clear a filter to see more products.
            </p>
          ) : (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <li key={p.id}>
                  <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-square bg-[#ebebeb]">
                      {p.badge === "new" ? (
                        <span className="absolute left-2 top-2 z-10 rounded bg-[#FFD500] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-black shadow">
                          New
                        </span>
                      ) : null}
                      {p.badge === "points" ? (
                        <span className="absolute left-2 top-2 z-10 rounded bg-[#006DB7] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow">
                          2× Points
                        </span>
                      ) : null}
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-zinc-100 p-4">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                        <span className="font-bold text-zinc-800">{p.age}</span>
                        <span>{p.pieces.toLocaleString()} pieces</span>
                        <span className="inline-flex items-center gap-1">
                          <StarRow value={p.rating} />
                          <span className="text-zinc-400">({p.reviews.toLocaleString()})</span>
                        </span>
                      </div>
                      <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-zinc-900 md:text-[15px]">
                        {p.title}
                      </h3>
                      {!p.inStock ? (
                        <p className="mt-2 text-xs font-semibold uppercase text-[#E3000B]">
                          Out of stock
                        </p>
                      ) : null}
                      <p className="mt-3 text-base font-black text-zinc-900">
                        ${p.price.toFixed(2)}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          disabled={!p.inStock}
                          onClick={() => p.inStock && setBagCount((c) => c + 1)}
                          className="flex-1 rounded-full bg-[#FD823B] py-2.5 text-sm font-bold text-black shadow-sm transition hover:bg-[#ff9a55] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
                          aria-label="Add to wishlist"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="border-t border-zinc-200 bg-white px-4 py-6 text-center text-xs text-zinc-500 md:px-6">
        <p>
          Fan-made UI demo for the Ginger Cool Saga. Not affiliated with LEGO or any retailer. Route:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-zinc-700">/ginger-cool-lego</code>
        </p>
      </footer>
    </div>
  );
}
