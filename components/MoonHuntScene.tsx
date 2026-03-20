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
    <main
      className={`min-h-screen w-full text-white transition-all duration-1000 ${
        found
          ? "bg-[radial-gradient(circle_at_top,_#6f3bb8,_#291b5d_38%,_#130b2f_85%)]"
          : "bg-[radial-gradient(circle_at_top,_#253072,_#0f1235_45%,_#090b1e_85%)]"
      }`}
    >
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-10">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-200/90">Eid Moon Hunt</p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Find the hidden crescent moon</h1>
            <p className="mt-2 text-sm text-indigo-100/80 sm:text-base">
              {found
                ? "Phase 2: Festive reveal unlocked."
                : "Phase 1/2: Dynamic sky + reveal transition."}
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

        <div
          className={`relative flex-1 overflow-hidden rounded-3xl border border-white/15 shadow-2xl transition-all duration-1000 ${
            found ? "bg-amber-200/10" : "bg-black/15"
          }`}
        >
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

          <div
            className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,228,138,0.35),_rgba(255,228,138,0)_60%)] transition-opacity duration-1000 ${
              found ? "opacity-100" : "opacity-0"
            }`}
          />

          {found && (
            <>
              {Array.from({ length: 18 }).map((_, idx) => (
                <span
                  key={`particle-${idx}`}
                  className="particle-fall pointer-events-none absolute h-2 w-2 rounded-full bg-amber-200"
                  style={{
                    left: `${(idx * 13 + 7) % 96}%`,
                    animationDelay: `${(idx % 6) * 120}ms`,
                    animationDuration: `${2200 + (idx % 4) * 300}ms`,
                    opacity: 0.9,
                  }}
                />
              ))}

              <div className="pointer-events-none absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-2xl border border-amber-100/40 bg-[#1d123f]/75 p-6 text-center shadow-[0_0_48px_rgba(255,210,120,0.28)] backdrop-blur md:inset-x-10">
                <p className="text-xs uppercase tracking-[0.28em] text-amber-200/90">Chaand found</p>
                <h2 className="mt-2 text-3xl font-semibold text-amber-100 sm:text-4xl">Eid Mubarak ✨</h2>
                <p className="mt-2 text-sm text-amber-50/90 sm:text-base">Wishing you warmth, joy, and togetherness.</p>
              </div>
            </>
          )}
        </div>

        <footer className="mt-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-indigo-100/90 backdrop-blur">
          {found
            ? "Moon found ✨ Reveal is live. Next: URL personalization + link generator."
            : "Tip: every New Sky gives you a fresh random moon position."}
        </footer>
      </section>
    </main>
  );
}
