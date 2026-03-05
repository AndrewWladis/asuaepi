"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const GROUND_Y = 300;
const CHAR_WIDTH = 48;
const CHAR_HEIGHT = 56;
const CHAR_X = 80;
const OBSTACLE_WIDTH = 24;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_GAP = 400;
const SPEED = 9;

type GameState = "idle" | "playing" | "gameover";

interface Obstacle {
  x: number;
  w: number;
  h: number;
}

export default function GingerJungleGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const characterImgRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameStateRef = useRef(gameState);
  const vyRef = useRef(0);
  const yRef = useRef(GROUND_Y);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const nextSpawnAtRef = useRef(0);
  const scoreRef = useRef(0);

  gameStateRef.current = gameState;

  // Preload character sprite so it's ready before first frame
  useEffect(() => {
    const img = new Image();
    img.src = "/ginger8bit.png";
    img.onload = () => {
      characterImgRef.current = img;
    };
    return () => {
      characterImgRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const cw = canvas.width;
    const ch = canvas.height;
    const groundY = GROUND_Y;

    const loop = () => {
      const state = gameStateRef.current;
      if (state !== "playing") {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const vy = vyRef.current;
      let y = yRef.current;

      // Physics
      const newVy = vy + GRAVITY;
      let newY = y + newVy;
      if (newY >= groundY) {
        newY = groundY;
        vyRef.current = 0;
      } else {
        vyRef.current = newVy;
      }
      yRef.current = newY;

      // Move obstacles
      for (const o of obstaclesRef.current) {
        o.x -= SPEED;
      }
      obstaclesRef.current = obstaclesRef.current.filter((o) => o.x + o.w > 0);

      // Spawn obstacle
      if (nextSpawnAtRef.current <= 0) {
        obstaclesRef.current.push({
          x: cw,
          w: OBSTACLE_WIDTH,
          h: OBSTACLE_HEIGHT,
        });
        nextSpawnAtRef.current = cw + OBSTACLE_GAP + Math.random() * 150;
      }
      nextSpawnAtRef.current -= SPEED;

      // Draw
      ctx.fillStyle = "#0d2818";
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = "#1a3d2e";
      ctx.fillRect(0, groundY, cw, ch - groundY);

      // Obstacles (simple blocks to jump over)
      ctx.fillStyle = "#2d5a27";
      for (const o of obstaclesRef.current) {
        ctx.fillRect(o.x, groundY - o.h, o.w, o.h);
        ctx.fillStyle = "#1e4620";
        ctx.fillRect(o.x + 2, groundY - o.h + 2, o.w - 4, o.h - 4);
        ctx.fillStyle = "#2d5a27";
      }

      // Character (ginger sprite, or brown placeholder until loaded)
      const charImg = characterImgRef.current;
      if (charImg && charImg.complete && charImg.naturalWidth > 0) {
        ctx.drawImage(charImg, CHAR_X, newY - CHAR_HEIGHT, CHAR_WIDTH, CHAR_HEIGHT);
      } else {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(CHAR_X, newY - CHAR_HEIGHT, CHAR_WIDTH, CHAR_HEIGHT);
      }

      // Collision: character box vs obstacle box
      const charLeft = CHAR_X + 10;
      const charRight = CHAR_X + CHAR_WIDTH - 10;
      const charBottom = newY - 4;
      const charTop = newY - CHAR_HEIGHT + 12;

      for (const o of obstaclesRef.current) {
        const oLeft = o.x;
        const oRight = o.x + o.w;
        const oTop = groundY - o.h;
        const oBottom = groundY;
        if (charRight > oLeft && charLeft < oRight && charBottom > oTop && charTop < oBottom) {
          setGameState("gameover");
          setScore(scoreRef.current);
          setHighScore((h) => Math.max(h, scoreRef.current));
          rafId = requestAnimationFrame(loop);
          return;
        }
      }

      scoreRef.current += 1;
      if (scoreRef.current % 10 === 0) setScore(scoreRef.current);
      setHighScore((h) => Math.max(h, scoreRef.current));

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const jump = useCallback(() => {
    if (gameState === "idle") {
      setGameState("playing");
      setScore(0);
      scoreRef.current = 0;
      vyRef.current = JUMP_FORCE;
      yRef.current = GROUND_Y;
      obstaclesRef.current = [];
      nextSpawnAtRef.current = 600;
    } else if (gameState === "playing" && yRef.current >= GROUND_Y - 2) {
      vyRef.current = JUMP_FORCE;
    }
  }, [gameState]);

  const restart = useCallback(() => {
    setGameState("idle");
    setScore(0);
    scoreRef.current = 0;
    vyRef.current = 0;
    yRef.current = GROUND_Y;
    obstaclesRef.current = [];
    nextSpawnAtRef.current = 600;
    setTimeout(() => setGameState("playing"), 50);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (gameStateRef.current === "gameover") restart();
        else jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, restart]);

  return (
    <div className="min-h-screen bg-[#0d2818] flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-2xl mb-2">
        <h1 className="text-display text-2xl font-bold text-[var(--gold)]">
          Ginger Geek's Geektastic Galavant
        </h1>
        <div className="flex gap-6 text-stone-300">
          <span>Score: {score}</span>
          <span>Best: {highScore}</span>
        </div>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border-2 border-[var(--gold)]/30 shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
        onClick={gameState === "gameover" ? restart : jump}
        onKeyDown={(e) => e.key === " " && e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label={gameState === "idle" ? "Click or press Space to start" : gameState === "gameover" ? "Click or press Space to restart" : "Jump"}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="block w-full max-w-2xl h-auto bg-[#0d2818]"
          style={{ maxHeight: "70vh" }}
        />

        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
            <p className="text-display text-2xl font-bold text-[var(--gold)] mb-2">
              Press Space or tap to run
            </p>
            <p className="text-sm text-stone-400">Jump over the obstacles</p>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <p className="text-display text-3xl font-bold text-[var(--gold)] mb-2">
              Game Over
            </p>
            <p className="text-stone-300 mb-4">Score: {score}</p>
            <p className="text-sm text-stone-400">Space or tap to play again</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-stone-500">
        Space / ↑ / W to jump
      </p>
    </div>
  );
}
