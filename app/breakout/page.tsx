"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Brick = { x: number; y: number; w: number; h: number; alive: boolean };

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function Breakout() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  const [status, setStatus] = useState<"ready" | "playing" | "gameover">(
    "ready",
  );
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Gameplay state is kept in refs so the animation loop doesn't re-render.
  const sizeRef = useRef({ w: 900, h: 520, dpr: 1 });
  const runningRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  const paddleRef = useRef({ x: 0, y: 0, w: 86, h: 12 });
  const ballRef = useRef({
    x: 0,
    y: 0,
    r: 5,
    vx: 220,
    vy: -260,
    speed: 320,
  });
  const bricksRef = useRef<Brick[]>([]);
  const keysRef = useRef({ left: false, right: false });
  const scoreRef = useRef(0);
  const livesRef = useRef(3);

  const rows = useMemo(() => 6, []);
  const cols = useMemo(() => 10, []);

  const colors = useMemo(
    () => [
      "rgba(197, 62, 90, 0.95)", // maroon-ish
      "rgba(255, 215, 112, 0.95)", // gold-ish
      "rgba(255, 255, 255, 0.75)",
    ],
    [],
  );

  function buildBricks(w: number) {
    const paddingTop = 70;
    const gap = 8;
    const left = 70;
    const right = 70;

    const availableW = Math.max(1, w - left - right);
    const brickW =
      (availableW - gap * (cols - 1)) / cols > 0 ? (availableW - gap * (cols - 1)) / cols : 1;
    const brickH = 26;

    const bricks: Brick[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: left + c * (brickW + gap),
          y: paddingTop + r * (brickH + gap),
          w: brickW,
          h: brickH,
          alive: true,
        });
      }
    }
    bricksRef.current = bricks;
  }

  function resetGame() {
    const { w, h } = sizeRef.current;

    scoreRef.current = 0;
    livesRef.current = 3;
    setScore(0);
    setLives(3);
    setStatus("playing");
    runningRef.current = true;

    const paddle = paddleRef.current;
    paddle.w = clamp(w * 0.11, 68, 120);
    paddle.h = clamp(h * 0.02, 10, 14);
    paddle.x = (w - paddle.w) / 2;
    paddle.y = h - 54;

    const ball = ballRef.current;
    ball.r = clamp(Math.min(w, h) * 0.008, 4, 7);
    ball.x = paddle.x + paddle.w / 2;
    ball.y = paddle.y - ball.r - 2;
    ball.speed = clamp(Math.min(w, h) * 0.65, 260, 420);

    // Give a slight horizontal bias so it doesn't always go straight.
    ball.vx = (Math.random() < 0.5 ? -1 : 1) * ball.speed * 0.18;
    ball.vy = -ball.speed * 0.75;

    buildBricks(w);
  }

  function draw(ctx: CanvasRenderingContext2D) {
    const { w, h } = sizeRef.current;

    // Background
    ctx.clearRect(0, 0, w, h);
    const bg = bgImageRef.current;
    if (bg && bg.naturalWidth > 0 && bg.naturalHeight > 0) {
      // "Cover" fit to fill the canvas area.
      const imgAspect = bg.naturalWidth / bg.naturalHeight;
      const canvasAspect = w / h;

      let drawW = w;
      let drawH = h;
      if (imgAspect > canvasAspect) {
        drawW = h * imgAspect;
        drawH = h;
      } else {
        drawH = w / imgAspect;
        drawW = w;
      }

      const dx = (w - drawW) / 2;
      const dy = (h - drawH) / 2;
      ctx.drawImage(bg, dx, dy, drawW, drawH);
    } else {
      ctx.fillStyle = "rgba(9, 10, 14, 1)";
      ctx.fillRect(0, 0, w, h);
    }

    // HUD
    ctx.fillStyle = "rgba(255, 215, 112, 0.95)";
    ctx.font = "700 16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText(`SCORE ${scoreRef.current}`, 16, 28);
    ctx.fillText(`LIVES ${livesRef.current}`, 16, 50);

    // Bricks
    const bricks = bricksRef.current;
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (!b.alive) continue;
      const color = colors[i % colors.length];
      ctx.fillStyle = color;
      ctx.fillRect(b.x, b.y, b.w, b.h);

      // Subtle highlight
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    }

    // Paddle
    const paddle = paddleRef.current;
    ctx.fillStyle = "rgba(255, 215, 112, 0.95)";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    // Ball
    const ball = ballRef.current;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fill();
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = wrapper.getBoundingClientRect();

      // Use a fixed aspect ratio-ish drawing area but responsive in CSS.
      const w = Math.round(Math.max(320, rect.width));
      const h = Math.round(clamp(rect.height, 360, 640));

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // If we haven't started yet, build bricks for the new size.
      if (!runningRef.current) {
        buildBricks(w);
        const paddle = paddleRef.current;
        paddle.w = clamp(w * 0.11, 68, 120);
        paddle.h = clamp(h * 0.02, 10, 14);
        paddle.x = (w - paddle.w) / 2;
        paddle.y = h - 54;

        const ball = ballRef.current;
        ball.r = clamp(Math.min(w, h) * 0.008, 4, 7);
        ball.x = paddle.x + paddle.w / 2;
        ball.y = paddle.y - ball.r - 2;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Preload background art so the canvas loop can draw it without stutter.
    const img = new Image();
    img.src = "/THEWarden.PNG";
    img.onload = () => {
      bgImageRef.current = img;
  
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = true;

      // Quality-of-life: Space restarts when dead.
      if (e.key === " " && (status === "ready" || status === "gameover")) {
        e.preventDefault();
        resetGame();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = false;
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerMove = (e: PointerEvent) => {
      const { w } = sizeRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * w;

      const paddle = paddleRef.current;
      paddle.x = clamp(x - paddle.w / 2, 0, w - paddle.w);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    return () => canvas.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = (time: number) => {
      const { w, h } = sizeRef.current;

      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = Math.min(0.033, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      if (runningRef.current) {
        // Paddle update (keyboard)
        const paddle = paddleRef.current;
        const speed = clamp(w * 1.1, 520, 980);
        if (keysRef.current.left) paddle.x -= speed * dt;
        if (keysRef.current.right) paddle.x += speed * dt;
        paddle.x = clamp(paddle.x, 0, w - paddle.w);

        // Ball update
        const ball = ballRef.current;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        // Wall collisions
        if (ball.x - ball.r <= 0) {
          ball.x = ball.r;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x + ball.r >= w) {
          ball.x = w - ball.r;
          ball.vx = -Math.abs(ball.vx);
        }

        if (ball.y - ball.r <= 0) {
          ball.y = ball.r;
          ball.vy = Math.abs(ball.vy);
        }

        // Paddle collision
        const paddleTop = paddle.y;
        const paddleBottom = paddle.y + paddle.h;
        if (
          ball.vy > 0 &&
          ball.y + ball.r >= paddleTop &&
          ball.y - ball.r <= paddleBottom &&
          ball.x >= paddle.x &&
          ball.x <= paddle.x + paddle.w
        ) {
          ball.y = paddleTop - ball.r - 0.5;
          ball.vy = -Math.abs(ball.vy);

          const paddleCenter = paddle.x + paddle.w / 2;
          const rel = (ball.x - paddleCenter) / (paddle.w / 2);
          // Convert relative hit position into an angle.
          ball.vx = rel * ball.speed * 0.95;
          ball.vy = -Math.sqrt(Math.max(1, ball.speed * ball.speed - ball.vx * ball.vx));
        }

        // Bricks collision
    const bricks = bricksRef.current;
        for (let i = 0; i < bricks.length; i++) {
          const b = bricks[i];
          if (!b.alive) continue;

          const closestX = clamp(ball.x, b.x, b.x + b.w);
          const closestY = clamp(ball.y, b.y, b.y + b.h);
          const dx = ball.x - closestX;
          const dy = ball.y - closestY;

          if (dx * dx + dy * dy <= ball.r * ball.r) {
            b.alive = false;

            // Bounce: compare overlap distances.
            if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
            else ball.vy *= -1;

            scoreRef.current += 10;
            setScore(scoreRef.current);
            break; // prevent multiple brick hits in one frame
          }
        }

        // Win condition
        if (bricksRef.current.every((b) => !b.alive)) {
          runningRef.current = false;
          setStatus("gameover");
          // Keep lives visible; "gameover" is used as "cleared".
        }

        // Bottom fall
        if (ball.y - ball.r > h) {
          livesRef.current -= 1;
          setLives(livesRef.current);

          if (livesRef.current <= 0) {
            runningRef.current = false;
            setStatus("gameover");
          } else {
            // Reset ball/paddle center.
            const paddle = paddleRef.current;
            ball.x = paddle.x + paddle.w / 2;
            ball.y = paddle.y - ball.r - 2;
            ball.vx = (Math.random() < 0.5 ? -1 : 1) * ball.speed * 0.18;
            ball.vy = -ball.speed * 0.75;
          }
        }
      }

      draw(ctx);
      requestAnimationFrame(loop);
    };

    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[var(--black-1)] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="mt-2 text-display text-3xl font-bold text-white">
              The Warden&apos;s Wobbly Tobbly Breakout Bonanza
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-stone-300 transition hover:border-[var(--gold)]/40 hover:text-white"
          >
            Home
          </Link>
        </div>

        <div
          ref={wrapperRef}
          className="relative mx-auto w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--black-4)]"
          style={{ height: 520 }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />

          {status !== "playing" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.45)]">
              <div className="mx-6 max-w-md rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
                <p className="text-display text-sm tracking-[0.35em] text-[var(--gold)] uppercase">
                  {status === "ready" ? "Ready?" : "Game Over"}
                </p>
                <p className="mt-2 text-sm text-stone-300">
                  Score {score} · Lives {lives}
                </p>
                <p className="mt-3 text-sm text-stone-300">
                  Move with mouse/touch (or arrow keys/A-D). Click start or press{" "}
                  <span className="text-stone-100">Space</span>.
                </p>
                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-5 rounded-full bg-[var(--maroon)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--maroon-light)] active:scale-[0.98]"
                >
                  {status === "ready" ? "Start" : "Play Again"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

