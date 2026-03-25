"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Direction = 1 | -1;

const GINGER_SIZE = 96;
const SPEED = 500; // pixels per second

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--black-1)] px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <GingerRunner />
      </div>

      <div className="relative z-10 space-y-4">
        <p className="text-display text-sm tracking-[0.35em] text-[var(--gold)] uppercase">
          Error 404
        </p>
        <h1 className="text-display text-4xl font-bold text-white sm:text-5xl">
          Page Not Found.
        </h1>
        <p className="max-w-md text-sm text-stone-400 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist. While Ginger Cool runs
          around trying to find it, you can head back home.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-[var(--maroon)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--maroon-light)] active:scale-[0.97]"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function GingerRunner() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let animationFrame: number;
    let lastTime = performance.now();

    let x =
      Math.random() * Math.max(window.innerWidth - GINGER_SIZE, GINGER_SIZE);
    let y =
      Math.random() * Math.max(window.innerHeight - GINGER_SIZE, GINGER_SIZE);

    let dx: Direction = Math.random() < 0.5 ? -1 : 1;
    let dy = (Math.random() - 0.5) * 0.4; // smaller vertical wander

    const step = (time: number) => {
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      x += dx * SPEED * deltaSeconds;
      y += dy * SPEED * deltaSeconds;

      const maxX = Math.max(window.innerWidth - GINGER_SIZE, 0);
      const maxY = Math.max(window.innerHeight - GINGER_SIZE, 0);

      let flipped = false;

      if (x <= 0) {
        x = 0;
        if (dx < 0) {
          dx = 1;
          flipped = true;
        }
      } else if (x >= maxX) {
        x = maxX;
        if (dx > 0) {
          dx = -1;
          flipped = true;
        }
      }

      if (y <= 0) {
        y = 0;
        dy = Math.abs(dy);
      } else if (y >= maxY) {
        y = maxY;
        dy = -Math.abs(dy);
      }

      // Occasionally switch directions randomly while running
      if (Math.random() < 0.003) {
        dx = (dx * -1) as Direction;
        flipped = true;
        // give a little random vertical nudge when turning
        dy = (Math.random() - 0.5) * 0.6;
      }

      if (flipped) {
        setDirection(dx);
      }

      setPosition({ x, y });

      animationFrame = window.requestAnimationFrame(step);
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className="absolute z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${direction})`,
        transformOrigin: "center",
      }}
    >
      <Image
        src="/ginger8bit.png"
        alt="Ginger running around"
        width={GINGER_SIZE}
        height={GINGER_SIZE}
        priority
        className="pixelated drop-shadow-[0_6px_0_rgba(0,0,0,0.65)]"
      />
    </div>
  );
}

