"use client";

import { useMemo, useState, useEffect, CSSProperties } from "react";
import { generateSkyScene } from "@/lib/sky";
import Image from "next/image";

const MosqueForeground = () => (
  <div className="absolute bottom-0 z-30 w-full pointer-events-none">
    <Image
      src="/mosque.png"
      alt="Mosque"
      width={1200}
      height={600}
      className="object-bottom w-full h-auto"
      priority
    />
    <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t to-transparent from-black/80" />
  </div>
);

const Lantern = ({
  x,
  delay,
  size = 60,
}: {
  x: number;
  delay: string;
  size?: number;
}) => (
  <div
    className="flex absolute top-0 z-40 flex-col items-center lantern-sway"
    style={{ left: `${x}%`, animationDelay: delay }}
  >
    <Image
      src="/lantern.png"
      alt="Lantern"
      width={size}
      height={size * 2}
      className="object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
    />
  </div>
);

export function MoonHuntScene() {
  const [found, setFound] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [movedClouds, setMovedClouds] = useState<string[]>([]);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Trigger card delay when found
  useEffect(() => {
    if (found) {
      const timer = setTimeout(() => setShowCard(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [found]);

  const scene = useMemo(() => generateSkyScene(), []);

  if (isDesktop) {
    return (
      <main className="flex items-center justify-center h-dvh bg-[#090b1e] text-indigo-100 p-8 text-center font-sans">
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl font-semibold">Mobile Only Experience</h1>
          <p className="text-lg opacity-80">
            This Eid wish is designed to be viewed on mobile devices. Please
            open it on your phone for the best experience.
          </p>
          <div className="pt-4 text-sm italic opacity-50">
            Tip: You can use your browser&apos;s developer tools to simulate a
            mobile view.
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main
        className={`relative h-dvh w-full overflow-hidden text-white transition-colors duration-[2000ms] ease-in-out ${
          found ? "bg-[#130b2f]" : "bg-[#090b1e]"
        }`}
      >
        {/* Background Nebulas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,_rgba(255,105,180,0.12)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(255,165,0,0.15)_0%,_transparent_50%)]" />
        </div>
        {scene.clouds.map((cloud) => {
          const isMoved = movedClouds.includes(cloud.id);
          const moveOffset = cloud.moveDirection === "left" ? -150 : 150;

          return (
            <div
              key={cloud.id}
              onPointerDown={(e) => {
                if (found) return;
                e.preventDefault();
                e.stopPropagation();
                setMovedClouds((prev) => [...prev, cloud.id]);
              }}
              className="absolute transition-all ease-in-out cursor-pointer select-none duration-[2000ms]"
              style={{
                left: `${cloud.x + (isMoved ? moveOffset : 0)}%`,
                top: `${cloud.y}%`,
                width: `${cloud.width}px`,
                height: `${cloud.height}px`,
                opacity: isMoved ? 0 : found ? 0.1 : cloud.opacity,
                filter: `blur(${cloud.blur}px)`,
                transform: `translate(-50%, -50%) rotate(${cloud.rotation}deg)`,
                zIndex: cloud.zIndex,
              }}            >
              <Image
                src={`/${cloud.type}`}
                alt="Cloud"
                fill
                className="object-contain pointer-events-none select-none"
              />
            </div>
          );
        })}

        {scene.stars.map((star) => (
          <span
            key={star.id}
            className={`absolute bg-white rounded-full pointer-events-none star-twinkle z-10 transition-all duration-[2000ms] ${
              star.type === "bright"
                ? "star-bright"
                : star.type === "spike"
                  ? "star-spike"
                  : ""
            }`}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: found ? Math.min(star.opacity + 0.2, 1) : star.opacity,
                "--twinkle-duration": found ? "1s" : star.twinkleDuration,
                "--twinkle-delay": star.twinkleDelay,
              } as CSSProperties
            }
          />
        ))}

        <Lantern x={10} delay="0s" size={50} />
        <Lantern x={25} delay="1.2s" size={35} />
        <MosqueForeground />

        {/* Impact Flash behind moon */}
        {found && (
          <div
            className="absolute z-50 rounded-full pointer-events-none animate-flash"
            style={{
              left: `${scene.moon.x}%`,
              top: `${scene.moon.y}%`,
              width: "200px",
              height: "200px",
              background:
                "radial-gradient(circle, #fff 0%, rgba(255,215,0,0.4) 30%, transparent 70%)",
            }}
          />
        )}

        {/* Moon */}
        <div
          className="absolute transition-all z-60 duration-[1000ms]"
          style={{
            left: `${scene.moon.x}%`,
            top: `${scene.moon.y}%`,
            width: `${scene.moon.size}px`,
            height: `${scene.moon.size}px`,
            transform: `translate(-50%, -50%) scale(${found ? 1.25 : 1})`,
          }}
        >
          <button
            type="button"
            aria-label="Hidden crescent moon"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFound(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setFound(true);
            }}
            className="flex absolute inset-0 z-10 justify-center items-center cursor-pointer outline-none select-none group touch-none"
          >
            {/* Larger hit area for touch */}
            <div className="absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[120px] h-[120px]" />

            <Image
              src="/moon.png"
              alt="Moon"
              width={100}
              height={100}
              draggable={false}
              className={`relative w-full h-full object-contain transition-all duration-1000 select-none`}
              style={{
                filter: found
                  ? "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))"
                  : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
              }}            />
          </button>
        </div>

        {!found && (
          <div className="absolute inset-x-0 top-12 z-40 px-6 text-center animate-pulse pointer-events-none">
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-yellow-100/40 drop-shadow-xl">
              Spot the crescent moon
            </p>
          </div>
        )}
      </main>

      {showCard && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {/* Festive particles */}
          {Array.from({ length: 40 }).map((_, idx) => (
            <div
              key={`sparkle-${idx}`}
              className="absolute pointer-events-none particle-fall animate-in fade-in duration-1000"
              style={{
                left: `${(idx * 7 + 3) % 100}%`,
                top: "-20px",
                animationDelay: `${(idx % 15) * 100}ms`,
                animationDuration: `${2000 + (idx % 8) * 500}ms`,
              }}
            >
              <div
                className="w-1 h-1 bg-yellow-200 rounded-full blur-[0.5px]"
                style={{
                  boxShadow: "0 0 5px #ffd700",
                  opacity: 0.8,
                }}
              />
            </div>
          ))}

          {/* Ornate Greeting Card */}
          <div
            className="fixed top-1/2 left-1/2 w-[90%] max-w-sm select-none pointer-events-auto animate-card-in"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute -inset-1 bg-gradient-to-b rounded-[2rem] from-yellow-500/40 via-yellow-500/10 to-yellow-500/40 blur-sm" />
            <div className="relative rounded-[2rem] border border-yellow-500/30 bg-[#1d123f]/85 p-10 text-center shadow-[0_0_100px_rgba(45,27,77,0.8)] backdrop-blur-2xl">
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-tl-xl border-t-2 border-l-2 border-yellow-500/40" />
              <div className="absolute top-4 right-4 w-8 h-8 rounded-tr-xl border-t-2 border-r-2 border-yellow-500/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 rounded-bl-xl border-b-2 border-l-2 border-yellow-500/40" />
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-br-xl border-r-2 border-b-2 border-yellow-500/40" />

              <p className="mb-6 font-bold uppercase text-[10px] tracking-[0.5em] text-yellow-400/70">
                Chand Raat Greetings
              </p>

              <h2 className="mb-8 font-serif text-5xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-500 drop-shadow-sm">
                  Eid Mubarak
                </span>
              </h2>

              <div className="flex gap-3 justify-center items-center mb-8">
                <div className="w-8 bg-gradient-to-r from-transparent h-[1px] to-yellow-500/40" />
                <div className="w-1.5 h-1.5 border rotate-45 border-yellow-500/40" />
                <div className="w-8 bg-gradient-to-l from-transparent h-[1px] to-yellow-500/40" />
              </div>

              <p className="font-serif text-lg italic leading-relaxed text-yellow-50/90 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
                &ldquo;May the light of the crescent moon guide you toward
                peace, prosperity, and endless joy.&rdquo;
              </p>

              <div className="pt-6 mt-10 border-t border-white/5">
                <button
                  onClick={() => window.location.reload()}
                  className="py-2 px-6 text-xs tracking-widest text-yellow-200 uppercase rounded-full border transition-colors border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20"
                >
                  Share the Joy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
