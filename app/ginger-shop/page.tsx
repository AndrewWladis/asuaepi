const items = [
  {
    name: "Ginger Cool",
    price: "1,500",
    badge: "NEW!",
    description: "The coolest ginger on campus.",
    image: "/gingercoolskin.png",
  },
  {
    name: "Ginger Pack",
    price: "500",
    badge: "",
    description: "Backpack equipped for late-night study grinds.",
    image: "/backpack.png",
  },
  {
    name: "Geek Glider",
    price: "1,200",
    badge: "",
    description: "Drop into Tempe in maximum style.",
    image: "/bongglider.png",
  },
  {
    name: "Ginger Blunt",
    price: "500",
    badge: "",
    description: "Emote: a truly elevated vibe.",
    image: "/bluntemote.png",
  },
  {
    name: "Ginger Geek",
    price: "500",
    badge: "",
    description: "Emote: full send on the homework grind.",
    image: "/bongemote.png",
  },
] as const;

export default function GingerShopPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_30%,#00b4ff_0%,#0078f2_30%,#005bb5_60%,#003d7a_100%)] text-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-blue-500/50 bg-black/70 px-6 md:px-10">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="rounded-md p-2 text-white/80 transition hover:bg-white/10"
            aria-label="Search"
          >
            <span className="block h-4 w-4 rounded-full border-2 border-white/80" />
          </button>
          <nav className="hidden gap-2 text-xs font-semibold uppercase tracking-wide text-white/60 sm:flex">
            <span className="rounded px-3 py-2 hover:text-white">Play</span>
            <span className="relative px-3 py-2 hover:text-white">
              Locker
              <span className="absolute right-1 top-1 text-[10px] text-yellow-300">★</span>
            </span>
            <span className="rounded border border-cyan-400/60 bg-blue-700/60 px-3 py-2 text-white shadow-sm">
              Shop
            </span>
            <span className="relative px-3 py-2 hover:text-white">
              Passes
              <span className="absolute right-1 top-1 text-[10px] text-yellow-300">★</span>
            </span>
            <span className="relative px-3 py-2 hover:text-white">
              Quests
              <span className="absolute right-1 top-1 text-[10px] text-yellow-300">★</span>
            </span>
            <span className="px-3 py-2 hover:text-white">Compete</span>
            <span className="px-3 py-2 hover:text-white">Career</span>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-1 rounded-full bg-blue-900/60 px-3 py-1.5 text-cyan-200 shadow">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-sky-900">
              V
            </span>
            <span>2,450</span>
          </div>
          <div className="h-9 w-9 rounded-full border-2 border-white/40 bg-gradient-to-br from-indigo-400 to-fuchsia-500" />
        </div>
      </header>

      {/* Main content */}
      <main className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-20 md:px-10 md:pb-24 md:pt-24">
        <div className="relative flex w-full max-w-6xl gap-8 rounded-3xl border border-cyan-300/40 bg-slate-900/70 p-6 shadow-[0_0_60px_rgba(0,0,0,0.7)] md:p-10">
          {/* Left scroll dots */}
          <div className="hidden flex-col gap-2 pt-6 md:flex">
            <button
              type="button"
              className="h-2 w-2 rounded-full bg-white shadow"
              aria-label="Ginger Cool section"
            />
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>

          {/* Shop section */}
          <section className="flex-1">
            <header className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
                  Featured Collection
                </p>
                <h1 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.4)] md:text-4xl">
                  Ginger Cool
                </h1>
              </div>
              <div className="hidden text-right text-xs font-medium uppercase tracking-wide text-cyan-200/80 sm:block">
                <p>Support-a-Creator</p>
                <p className="text-base font-black text-white">IGAMING</p>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.name}
                  className="group relative overflow-hidden rounded-xl border border-cyan-300/40 bg-blue-900/60 shadow-[0_18px_40px_rgba(0,0,0,0.6)] transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_22px_55px_rgba(0,0,0,0.8)]"
                >
                  <div
                    className="relative aspect-[3/4] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/40 via-transparent to-purple-500/40 opacity-0 transition group-hover:opacity-100" />
                    {item.badge && (
                      <span className="absolute left-3 top-3 rounded-sm bg-gradient-to-r from-yellow-300 to-amber-400 px-2 py-0.5 text-xs font-black uppercase tracking-wide text-sky-950 shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-cyan-300/30 bg-slate-950/80 px-4 py-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs font-bold text-sky-900">
                        V
                      </span>
                      <span>{item.price}</span>
                      <button
                        type="button"
                        className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-sky-950 transition hover:bg-white"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="fixed inset-x-0 bottom-0 z-10 flex h-14 items-center justify-between bg-black/80 px-4 text-xs font-semibold uppercase tracking-wide text-white/70 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500" />
          <div>
            <p className="text-[11px] text-white">iGamingOnTiktok</p>
            <p className="text-[10px] text-cyan-300">Party Channel</p>
          </div>
        </div>
        <span className="hidden text-[11px] text-cyan-200 md:block">
          Support-A-Creator: IGAMING
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-sm border border-white/30 px-3 py-1 text-[11px] hover:bg-white/10"
          >
            Shop Refresh Info
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-sm border border-white/30 px-3 py-1 text-[11px] hover:bg-white/10"
          >
            <span className="inline-block h-3 w-3 rounded bg-white" />
            Chat
          </button>
        </div>
      </footer>
    </div>
  );
}

