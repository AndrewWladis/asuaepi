"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SECRET_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowLeft",
  "ArrowRight",
  "ArrowRight",
  "KeyB",
  "KeyA",
] as const;

export default function Home() {
  const router = useRouter();
  const indexRef = useRef(0);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const expected = SECRET_SEQUENCE[indexRef.current];
      const code = event.code;

      if (code === expected) {
        indexRef.current += 1;
        if (indexRef.current === SECRET_SEQUENCE.length) {
          indexRef.current = 0;
          router.push("/ginger-shop");
        }
        return;
      }

      // Reset sequence, but allow immediate restart if they hit the first key again
      indexRef.current = code === SECRET_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--black-1)]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--black-2)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="text-display text-xl font-bold text-[var(--gold)] transition hover:text-[var(--gold-dim)]"
          >
            ΑΕΠ · ASU
          </a>
          <div className="flex gap-8 text-sm font-medium text-stone-400">
            <a
              href="#about"
              className="transition hover:text-[var(--gold)]"
            >
              About
            </a>
            <a
              href="#merch"
              className="transition hover:text-[var(--gold)]"
            >
              Merch
            </a>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero */}
        <section className="relative border-b border-[var(--border)] bg-[var(--black-2)] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-3 text-display text-lg tracking-[0.3em] text-[var(--gold)] uppercase">
              Arizona State University
            </p>
            <h1 className="text-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Alpha Epsilon Pi
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-stone-400">
              The Jewish Fraternity
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="#merch"
                className="rounded-full bg-[var(--maroon)] px-6 py-3 font-medium text-white transition hover:bg-[var(--maroon-light)] active:scale-[0.98]"
              >
                Shop Merch
              </a>
              <a
                href="#about"
                className="rounded-full border-2 border-[var(--gold)] px-6 py-3 font-medium text-[var(--gold)] transition hover:bg-[var(--gold)]/10 active:scale-[0.98]"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-b border-[var(--border)] bg-[var(--black-3)] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-display text-3xl font-bold text-white md:text-4xl">
              About Our Chapter
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="leading-relaxed text-stone-400">
                  Alpha Epsilon Pi was chartered at Arizona State University on February 12, 2018.
                  We are a brotherhood rooted in Jewish heritage and values, open to all who share
                  our commitment to integrity, leadership, and service.
                </p>
              </div>
              <div>
                <p className="leading-relaxed text-stone-400">
                  Founded at NYU in 1913, AEPi has grown into one of the nation&apos;s leading
                  fraternities. At ASU, we focus on academic excellence, philanthropy, and
                  building lifelong bonds while making a positive impact on campus and the
                  community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Merch */}
        <section id="merch" className="bg-[var(--black-3)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-display text-3xl font-bold text-white md:text-4xl">
              Merch
            </h2>
            <p className="mt-3 text-stone-400">
              Rep ΑΕΠ with official chapter gear. Maroon &amp; gold.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Drew Bronson Free Card - Sold out */}
              <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--gold)]/40 hover:bg-[var(--surface-hover)]">
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--black-4)]">
                  <div className="absolute inset-0 p-2 transition-transform duration-300 ease-out group-hover:rotate-3">
                    <Image
                      src="/freecard.png"
                      alt="Get into Drew Bronson's Unit Free Card"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <span className="absolute right-2 top-2 rounded bg-[var(--maroon)] px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Sold out
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-display font-bold text-white">
                    Get into Drew Bronson&apos;s Unit Free Card
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">Keep this card until you need it.</p>
                  <p className="mt-3 text-sm font-medium text-stone-500">Sold out</p>
                </div>
              </div>
              {[
                { name: "Chapter Tee", price: "—", placeholder: "T-Shirt" },
                { name: "Crewneck", price: "—", placeholder: "Crewneck" },
                { name: "Hat", price: "—", placeholder: "Hat" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--gold)]/40 hover:bg-[var(--surface-hover)]"
                >
                  <div className="aspect-square flex items-center justify-center bg-[var(--black-4)] text-stone-600">
                    <span className="text-display text-sm uppercase tracking-wider opacity-60 group-hover:opacity-80">
                      {item.placeholder}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-display font-bold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{item.price}</p>
                    <button
                      type="button"
                      className="mt-3 text-sm font-medium text-[var(--gold)] transition hover:text-[var(--gold-dim)]"
                    >
                      Coming soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--black-5)] px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-display text-sm font-bold text-[var(--gold)]">
            Alpha Epsilon Pi · ASU
          </span>
          <span className="text-sm text-stone-500">
            Arizona State University · Tempe, Arizona
          </span>
          <a
            href="https://www.instagram.com/andywl27/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-500 transition hover:text-[var(--gold)]"
          >
            Andrew Wladis TM
          </a>
        </div>
      </footer>
    </div>
  );
}
