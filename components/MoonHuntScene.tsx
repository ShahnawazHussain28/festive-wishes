"use client";

import { useMemo, useState } from "react";
import { generateSkyScene } from "@/lib/sky";

export function MoonHuntScene() {
  const [round, setRound] = useState(0);
  const [found, setFound] = useState(false);

  const scene = useMemo(() => generateSkyScene(), [round]);

  const resetRound = () => {
    setFound(false);
    setRound((value) => value + 1);
  };

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#253072,_#0f1235_45%,_#090b1e_85%)] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-10">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-200/90">Eid Moon Hunt</p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Find the hidden crescent moon</h1>
            <p className="mt-2 text-sm text-indigo-100/80 sm:text-base">
              Phase 1: Dynamic sky + randomized moon placement.
            </p>
          </div>

          <button
            type="button"
            onClick={resetRound}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20"
          >
            New Sky
          </button>
        </header>

        <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/15 bg-black/15 shadow-2xl">
          {scene.stars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
            />
          ))}

          {scene.clouds.map((cloud) => (
            <span
              key={cloud.id}
              className="absolute rounded-full bg-indigo-100"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                opacity: cloud.opacity,
                filter: `blur(${cloud.blur}px)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          <button
            type="button"
            aria-label="Hidden crescent moon"
            onClick={() => setFound(true)}
            className="absolute cursor-pointer rounded-full"
            style={{
              left: `${scene.moon.x}%`,
              top: `${scene.moon.y}%`,
              width: `${scene.moon.size}px`,
              height: `${scene.moon.size}px`,
              transform: "translate(-50%, -50%)",
              background: "#fff7d1",
              boxShadow: found
                ? "0 0 36px rgba(255, 240, 170, 0.9)"
                : "0 0 12px rgba(255, 248, 201, 0.45)",
            }}
          >
            <span
              className="absolute rounded-full bg-[rgba(9,11,30,0.95)]"
              style={{
                width: `${scene.moon.size * 0.72}px`,
                height: `${scene.moon.size * 0.72}px`,
                top: `${scene.moon.size * 0.08}px`,
                left: `${scene.moon.size * 0.34}px`,
              }}
            />
          </button>
        </div>

        <footer className="mt-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-indigo-100/90 backdrop-blur">
          {found
            ? "Moon found ✨ Nice! Next phase will add festive reveal + personalized greeting."
            : "Tip: every New Sky gives you a fresh random moon position."}
        </footer>
      </section>
    </main>
  );
}
