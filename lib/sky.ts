export type Star = {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
};

export type Cloud = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  blur: number;
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

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function generateSkyScene(): SkyScene {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: `star-${i}`,
    x: rand(2, 98),
    y: rand(4, 92),
    size: rand(1, 3.2),
    opacity: rand(0.35, 1),
  }));

  const clouds = Array.from({ length: 9 }, (_, i) => ({
    id: `cloud-${i}`,
    x: rand(-10, 95),
    y: rand(8, 78),
    width: rand(70, 200),
    height: rand(28, 80),
    opacity: rand(0.08, 0.22),
    blur: rand(8, 18),
  }));

  // Keep moon within safe viewport band and away from the CTA row.
  const moon = {
    x: rand(8, 92),
    y: rand(12, 70),
    size: rand(26, 42),
  };

  return { stars, clouds, moon };
}
