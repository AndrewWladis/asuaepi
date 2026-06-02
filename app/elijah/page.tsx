"use client";

import Image from "next/image";
import { useEffect } from "react";

const BACKGROUND_SRC = "/elijah/background.png";
const LOGO_SRC = "/elijah/logo.png";

export default function ElijahStartPage() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space" && e.key !== " ") return;
      e.preventDefault();
      // Wire up game route when ready, e.g. router.push("/elijah/play")
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src={BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex shrink-0 justify-center px-6 pt-8 sm:pt-10 md:pt-12">
          <Image
            src={LOGO_SRC}
            alt="Lego Elijah Mandel: The Game"
            width={5817}
            height={1984}
            className="h-auto w-full max-w-xl drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] sm:max-w-2xl md:max-w-3xl"
            priority
          />
        </header>

        <div className="flex-1" aria-hidden />

        <p
          className="start-prompt-blink pb-14 text-center text-3xl font-medium tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)",
          }}
        >
          Press SPACE to start
        </p>
      </div>
    </div>
  );
}
