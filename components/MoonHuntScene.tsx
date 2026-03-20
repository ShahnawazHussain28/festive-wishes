"use client";

import { useMemo, useState, useEffect, CSSProperties } from "react";
import { generateSkyScene } from "@/lib/sky";
import Image from "next/image";

const MosqueForeground = () => (
  <div className="absolute bottom-0 z-30 w-full pointer-events-none h-[35vh]">
    <Image
      src="/mosque.png"
      alt="Mosque"
      fill
      className="object-cover object-bottom"
    />
    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t to-transparent from-black/60" />
  </div>
);

const Lantern = ({ x, delay, size = 60 }: { x: number; delay: string; size?: number }) => (
  <div
    className="absolute top-0 z-40 lantern-sway flex flex-col items-center"
    style={{ left: `${x}%`, animationDelay: delay }}
  >
    <Image
      src="/lantern.png"
      alt="Lantern"
      width={size}
      height={size * 2} // Assuming 1:2 aspect ratio for lanterns
      className="object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
    />
  </div>
);

export function MoonHuntScene() {
  const [found, setFound] = useState(false);
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
    <main
      className={`relative h-dvh w-full overflow-hidden text-white transition-all duration-1000 ${
        found ? "bg-[#1b1231]" : "bg-[#090b1e]"
      }`}
    >
      {/* Background Nebulas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,_rgba(255,105,180,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(255,165,0,0.1)_0%,_transparent_50%)]" />
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
            className="absolute select-none transition-all duration-[2000ms] ease-in-out cursor-pointer"
            style={{
              left: `${cloud.x + (isMoved ? moveOffset : 0)}%`,
              top: `${cloud.y}%`,
              width: `${cloud.width}px`,
              height: `${cloud.height}px`,
              opacity: isMoved ? 0 : found ? cloud.opacity * 0.4 : cloud.opacity,
              filter: `blur(${cloud.blur}px)`,
              transform: `translate(-50%, -50%) rotate(${cloud.rotation}deg)`,
              zIndex: cloud.zIndex,
            }}
          >
            <Image
              src={`/${cloud.type}`}
              alt="Cloud"
              fill
              className="object-contain select-none pointer-events-none"
            />
          </div>
        );
      })}

      {scene.stars.map((star) => (
        <span
          key={star.id}
          className={`absolute bg-white rounded-full pointer-events-none star-twinkle z-10 ${
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
              opacity: star.opacity,
              "--twinkle-duration": star.twinkleDuration,
              "--twinkle-delay": star.twinkleDelay,
            } as CSSProperties
          }
        />
      ))}

      <Lantern x={10} delay="0s" size={50} />
      <Lantern x={25} delay="1.2s" size={35} />
      <MosqueForeground />

      {/* Moon and its overlay clouds */}
      <div
        className="absolute z-60"
        style={{
          left: `${scene.moon.x}%`,
          top: `${scene.moon.y}%`,
          width: `${scene.moon.size}px`,
          height: `${scene.moon.size}px`,
          transform: "translate(-50%, -50%)",
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
          <Image
            src="/moon.png"
            alt="Moon"
            width={100}
            height={100}
            draggable={false}
            className={`relative w-full h-full object-contain transition-all duration-1000 select-none ${found ? "animate-glow-pulse" : ""}`}
            style={{
              filter: found
                ? ""
                : "drop-shadow(0 0 10px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.2))",
              transform: found ? "scale(1.2)" : "scale(1)",
            }}
          />
        </button>
      </div>

      {!found && (
        <div className="absolute inset-x-0 top-8 z-40 px-6 text-center animate-pulse pointer-events-none">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-yellow-100/40 drop-shadow-xl">
            Find the Chaand
          </p>
        </div>
      )}
    </main>
  );
}
