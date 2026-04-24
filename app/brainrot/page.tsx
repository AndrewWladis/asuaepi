import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Netflix | Brainrot",
  robots: { index: false, follow: false },
};

const HERO_SRC = "/cover.png";

const PLAY_VIDEO_URL =
  "https://drive.google.com/file/d/1iQnrHZogjIGpeF7ZqrvfeZaxAHSJyLdI/view?usp=sharing";

const TRENDING_POSTERS = [
  { src: "/movieposters/7.png", alt: "Poster" },
  { src: "/movieposters/6.png", alt: "Poster" },
  { src: "/movieposters/5.png", alt: "Poster" },
  { src: "/movieposters/4.png", alt: "Poster" },
  { src: "/movieposters/3.png", alt: "Poster" },
  { src: "/movieposters/2.png", alt: "Poster" },
  { src: "/movieposters/1.png", alt: "Poster" },
  { src: "/movieposters/0.png", alt: "Poster" },


];

function NavIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className="relative flex h-11 w-11 shrink-0 items-center justify-center text-zinc-100"
      aria-hidden
    >
      {children}
      {active ? (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#e50914]" />
      ) : null}
    </div>
  );
}

export default function BrainrotPage() {
  return (
    <div className="pointer-events-none min-h-screen select-none bg-black font-sans text-white">
      <div className="flex min-h-screen">
        {/* Left rail */}
        <aside className="flex w-[52px] shrink-0 flex-col items-center gap-5 border-r border-white/5 bg-black/80 py-6 backdrop-blur-sm">
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </NavIcon>
          <NavIcon active>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </NavIcon>
        </aside>

        <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Hero */}
          <section className="relative isolate min-h-[62vh] w-full overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={HERO_SRC}
                alt=""
                fill
                className="object-cover object-[center_20%]"
                sizes="100vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end px-8 pb-10 pt-24 sm:px-12 lg:px-16 lg:pb-14">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium tracking-wide">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[#e50914] text-[10px] font-bold text-white">
                  N
                </span>
                <span className="uppercase tracking-[0.2em] text-white/90">Orginal</span>
              </div>

              <h1
                className="font-display text-5xl font-bold uppercase italic leading-none tracking-tight text-[#e50914] drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] sm:text-5xl md:text-5xl"
                style={{
                  textShadow:
                    "2px 2px 0 #3a0609, -1px -1px 0 #3a0609, 1px -1px 0 #3a0609, -1px 1px 0 #3a0609",
                }}
              >
                Ginger Cool Part 2:
                <br />
                The Revenge of Zeev
           
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-white sm:text-base">
                <span className="rounded border border-white/30 bg-black/40 px-1.5 py-0.5 text-xs font-bold uppercase text-[#e50914]">
                  Top 10
                </span>
                <span className="text-white/95">#1 in Movies Today</span>
              </p>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 shadow-black drop-shadow-md sm:text-[15px]">
                When Backwards Borgsdale and Zeev team up, Ginger Cool must oppose them, even if it means risking his life.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                  Coming Soon
                <div className="flex items-center gap-2 rounded bg-white/20 px-6 py-2.5 text-base font-semibold text-white backdrop-blur-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-lg font-light">
                    i
                  </span>
                  More info
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-8 z-10 border-l-4 border-white bg-black/50 px-3 py-1 text-xs font-medium text-white">
              PG-13
            </div>
          </section>

          {/* Trending row */}
          <section className="relative z-20 -mt-2 flex flex-col gap-3 bg-black px-8 pb-10 pt-2 sm:px-12 lg:px-16">
            <h2 className="text-lg font-semibold text-zinc-100">Trending Now</h2>
            <div className="flex gap-2 overflow-hidden">
              {TRENDING_POSTERS.map((p, i) => (
                <div
                  key={i}
                  className="relative aspect-2/3 w-[min(22vw,140px)] shrink-0 overflow-hidden rounded bg-zinc-900 shadow-lg ring-1 ring-white/10"
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="140px"
                    unoptimized={p.src.startsWith("http")}
                  />
                  <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded bg-[#e50914] text-[9px] font-bold">
                    N
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
