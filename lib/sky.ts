export type Star = {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: string;
  twinkleDelay: string;
  type: "normal" | "bright" | "spike";
};

export type Cloud = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  blur: number;
  rotation: number;
  color: string;
  type: string;
  zIndex: number;
  moveDirection: "left" | "right";
};

export type Moon = {
  x: number;
  y: number;
  size: number;
};

export type SkyScene = {
  stars: Star[];
  clouds: Cloud[];
  moon: Moon;
};

function createPrng(seed: number) {
  let state = seed;
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function generateSkyScene(): SkyScene {
  const nextRand = createPrng(123); // Seeded random for stars
  const rand = (min: number, max: number) => nextRand() * (max - min) + min;

  const stars: Star[] = Array.from({ length: 100 }, (_, i) => {
    const typeProb = nextRand();
    let type: Star["type"] = "normal";
    if (typeProb > 0.95) type = "spike";
    else if (typeProb > 0.8) type = "bright";

    return {
      id: `star-${i}`,
      x: rand(0, 100),
      y: rand(0, 100),
      size: type === "spike" ? rand(2, 4) : type === "bright" ? rand(1.5, 3) : rand(0.5, 1.5),
      opacity: rand(0.3, 0.9),
      twinkleDuration: `${rand(1, 4).toFixed(1)}s`,
      twinkleDelay: `${rand(0, 5).toFixed(1)}s`,
      type,
    };
  });

  // Hand-crafted fixed clouds for a consistent "mesmerizing" look (horizontal 4:3 aspect ratio, reduced size)
  const clouds: Cloud[] = [
    // Hider clouds (Specifically placed on top of moon at 65, 35)
    { id: "c1", x: 63, y: 34, width: 280, height: 210, opacity: 0.85, blur: 1, rotation: -12, color: "", type: "cloud1.png", zIndex: 70, moveDirection: "left" },
    { id: "c2", x: 68, y: 37, width: 240, height: 180, opacity: 0.75, blur: 2, rotation: 18, color: "", type: "cloud2.png", zIndex: 70, moveDirection: "right" },
    
    // Ambient clouds around the scene
    { id: "c3", x: 25, y: 22, width: 320, height: 240, opacity: 0.65, blur: 4, rotation: 8, color: "", type: "cloud3.png", zIndex: 15, moveDirection: "left" },
    { id: "c4", x: 88, y: 18, width: 260, height: 195, opacity: 0.55, blur: 5, rotation: -6, color: "", type: "cloud1.png", zIndex: 15, moveDirection: "right" },
    { id: "c5", x: 48, y: 52, width: 360, height: 270, opacity: 0.72, blur: 3, rotation: 12, color: "", type: "cloud2.png", zIndex: 15, moveDirection: "left" },
    { id: "c6", x: 15, y: 75, width: 220, height: 165, opacity: 0.62, blur: 4, rotation: -14, color: "", type: "cloud3.png", zIndex: 15, moveDirection: "right" },
    { id: "c7", x: 82, y: 85, width: 300, height: 225, opacity: 0.52, blur: 6, rotation: 22, color: "", type: "cloud1.png", zIndex: 15, moveDirection: "left" },
    { id: "c8", x: 55, y: 12, width: 200, height: 150, opacity: 0.45, blur: 8, rotation: 2, color: "", type: "cloud2.png", zIndex: 15, moveDirection: "right" },
  ];

  const moon = {
    x: 65,
    y: 35,
    size: 55,
  };

  return { stars, clouds, moon };
}
