"use client";

import { useMemo, useState, useEffect, CSSProperties, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

const RubElHizb = ({ className }: { className?: string }) => (
  <div className={`${className}`}>
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full fill-yellow-500/20 stroke-yellow-500/60 stroke-[1.5]"
    >
      <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
      <path
        d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z"
        transform="rotate(45 12 12)"
      />
    </svg>
  </div>
);

const AbstractCalligraphy = () => (
  <div className="overflow-hidden absolute inset-0 pointer-events-none select-none opacity-[0.12]">
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full fill-yellow-200 stroke-yellow-500"
    >
      <path
        d="M0,0 Q100,50 0,150 T0,300"
        fill="none"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M400,0 Q300,100 400,200 T400,400"
        fill="none"
        strokeWidth="1"
        opacity="0.3"
      />
      <text
        x="10"
        y="40"
        className="font-serif text-5xl opacity-40 fill-yellow-500"
        style={{ transform: "rotate(-20deg)" }}
      >
        ف
      </text>
      <text
        x="180"
        y="30"
        className="font-serif text-4xl opacity-20 fill-yellow-500"
      >
        ن
      </text>
      <text
        x="350"
        y="50"
        className="font-serif text-6xl opacity-50 fill-yellow-500"
        style={{ transform: "rotate(15deg)" }}
      >
        ق
      </text>
      <text
        x="-10"
        y="200"
        className="font-serif text-7xl opacity-30 fill-yellow-500"
        style={{ transform: "rotate(90deg)" }}
      >
        ش
      </text>
      <text
        x="370"
        y="250"
        className="font-serif text-8xl opacity-20 fill-yellow-500"
        style={{ transform: "rotate(-45deg)" }}
      >
        س
      </text>
      <text
        x="15"
        y="120"
        className="font-serif text-4xl opacity-40 fill-yellow-500"
      >
        ي
      </text>
      <text
        x="20"
        y="380"
        className="font-serif text-6xl opacity-60 fill-yellow-500"
        style={{ transform: "rotate(-15deg)" }}
      >
        ع
      </text>
      <text
        x="200"
        y="390"
        className="font-serif text-5xl opacity-30 fill-yellow-500"
      >
        ب
      </text>
      <text
        x="340"
        y="370"
        className="font-serif text-7xl opacity-40 fill-yellow-500"
        style={{ transform: "rotate(10deg)" }}
      >
        ه
      </text>
    </svg>
  </div>
);

function MoonHuntContent() {
  const searchParams = useSearchParams();
  const fromName = searchParams.get("from");

  const [found, setFound] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [movedClouds, setMovedClouds] = useState<string[]>([]);

  // Generator states
  const [isGeneratorMode, setIsGeneratorMode] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (found) {
      const timer = setTimeout(() => setShowCard(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [found]);

  const scene = useMemo(() => generateSkyScene(), []);

  const handleShare = () => {
    const url = new URL(window.location.origin);
    if (creatorName) {
      url.searchParams.set("from", creatorName);
    }
    const finalUrl = url.toString();

    if (navigator.share) {
      navigator
        .share({
          title: "Eid Moon Hunt",
          text: `Check out this Eid wish from ${creatorName || "someone special"}! ✨`,
          url: finalUrl,
        })
        .catch(() => {
          navigator.clipboard.writeText(finalUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    } else {
      navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        className={`relative h-dvh w-full overflow-hidden text-white transition-all duration-[2000ms] ease-in-out ${
          found ? "bg-[#130b2f]" : "bg-[#090b1e]"
        }`}
      >
        {/* Background Nebulas */}
        <div className="absolute inset-0 z-0 transition-opacity duration-[2000ms]">
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
                transform: `translate(-50%, -50%) rotate(${cloud.rotation}deg) scale(${found ? 1.2 : 1})`,
                zIndex: cloud.zIndex,
              }}
            >
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
          className="absolute transition-all ease-in-out z-60 duration-[1500ms]"
          style={{
            left: showCard ? "50%" : `${scene.moon.x}%`,
            top: showCard ? "8%" : `${scene.moon.y}%`,
            width: `${scene.moon.size}px`,
            height: `${scene.moon.size}px`,
            transform: `translate(-50%, -50%) scale(${found ? 1.2 : 1})`,
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
              }}
            />
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
              className="absolute duration-1000 pointer-events-none particle-fall animate-in fade-in"
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
            <div className="absolute -inset-1 bg-gradient-to-b from-yellow-500/40 via-yellow-500/10 to-yellow-500/40 blur-sm" />
            <div className="relative border-2 border-yellow-500/40 bg-[#1d123f]/90 p-9 text-center shadow-[0_0_100px_rgba(45,27,77,0.8)] backdrop-blur-3xl overflow-hidden">
              <AbstractCalligraphy />

              {/* Card Shine Sweep */}
              <div className="overflow-hidden absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-[-100%] left-0 w-full h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-card-shine" />
              </div>

              {/* Inner thin border */}
              <div className="absolute inset-2 border pointer-events-none border-yellow-500/20" />

              {/* Geometric Corner Stars (Rub el Hizb) */}
              <RubElHizb className="absolute -top-4 -left-4 w-8 h-8" />
              <RubElHizb className="absolute -top-4 -right-4 w-8 h-8" />
              <RubElHizb className="absolute -bottom-4 -left-4 w-8 h-8" />
              <RubElHizb className="absolute -right-4 -bottom-4 w-8 h-8" />

              <h2 className="mt-4 mb-6 font-serif text-5xl font-bold tracking-tight">
                <span className="animate-shimmer drop-shadow-sm">
                  Eid Mubarak
                </span>
              </h2>

              {fromName && !isGeneratorMode && (
                <p className="mb-6 font-serif text-xl italic text-yellow-200/90">
                  from {fromName}
                </p>
              )}

              {!isGeneratorMode ? (
                <>
                  <div className="flex gap-3 justify-center items-center mb-6">
                    <div className="w-8 bg-gradient-to-r from-transparent h-[1px] to-yellow-500/40" />
                    <div className="w-1.5 h-1.5 border rotate-45 border-yellow-500/40" />
                    <div className="w-8 bg-gradient-to-l from-transparent h-[1px] to-yellow-500/40" />
                  </div>

                  <p className="px-2 font-serif text-lg italic leading-relaxed duration-1000 delay-500 text-yellow-50/90 animate-in fade-in slide-in-from-bottom-2">
                    &ldquo;May the light of the crescent moon guide you toward
                    peace, prosperity, and endless joy.&rdquo;
                  </p>

                  <div className="pt-5 mt-8 border-t border-white/5">
                    <button
                      onClick={() => setIsGeneratorMode(true)}
                      className="overflow-hidden relative py-2.5 px-8 text-base font-bold tracking-wide uppercase rounded-md transition-all active:scale-95 text-indigo-950 animate-button-glow group"
                    >
                      {/* Metallic Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#b38728]" />

                      {/* Shine Sweep Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full via-white/40" />

                      <span className="relative z-10 drop-shadow-sm">
                        Wish Your Loved Ones
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 space-y-6 duration-500 animate-in fade-in zoom-in">
                  <div className="space-y-2">
                    <label className="block tracking-widest uppercase text-[10px] text-yellow-400/60">
                      Enter Your Name
                    </label>
                    <input
                      autoFocus
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Zayan"
                      className="py-3 px-4 w-full text-yellow-100 rounded-lg border transition-colors focus:outline-none bg-white/5 border-yellow-500/30 placeholder:text-yellow-100/20 focus:border-yellow-500/60"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleShare}
                      disabled={!creatorName}
                      className="overflow-hidden relative py-3 px-8 text-base font-bold tracking-wide uppercase rounded-md transition-all active:scale-95 disabled:opacity-50 text-indigo-950 animate-button-glow group disabled:grayscale"
                    >
                      {/* Metallic Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#b38728]" />

                      {/* Shine Sweep Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full via-white/40" />

                      <span className="relative z-10 drop-shadow-sm">
                        {copied ? "Link Copied!" : "Send the Joy"}
                      </span>
                    </button>
                    <button
                      onClick={() => setIsGeneratorMode(false)}
                      className="text-sm tracking-widest uppercase transition-colors hover:text-yellow-400 text-yellow-400/60"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MoonHuntScene() {
  return (
    <Suspense fallback={null}>
      <MoonHuntContent />
    </Suspense>
  );
}
