# Eid Moon Hunt — MVP Plan

## 1) Goal
Build a static, mobile-first Eid greeting web app where users must find and tap/click a hidden crescent moon in a dynamic night sky. On success, they see a festive reveal and a personalized greeting pulled from URL params.

Primary outcome: a polished, elegant, shareable experience (core flow first, no extra gamification in MVP).

---

## 2) Confirmed Product Decisions
- Framework: Next.js (App Router) + TypeScript + Tailwind CSS
- Build target: static export (`output: "export"`)
- Audio: excluded for post-MVP
- Language: English only
- Design direction: elegant festive look
- Scope: core experience only (no advanced extras yet)

---

## 3) Core User Flow (MVP)

### Flow A — Visitor experience
1. User opens site.
2. Sees atmospheric night sky scene with stars/cloud layers and hidden crescent moon.
3. User searches and taps/clicks moon.
4. On success:
   - sky transitions from dark tones to festive warm tones,
   - celebratory visuals appear (light confetti/lantern accents),
   - greeting message appears:
     - default: `Eid Mubarak!`
     - with sender: `Eid Mubarak from {Name}!`
5. User can restart and play again (moon position changes each round).

### Flow B — Link personalization
1. Sender enters their name in a simple input.
2. Taps **Generate Link**.
3. App produces share URL: `/?from=Sender%20Name`.
4. Recipient opening this URL sees personalized final greeting after finding moon.

---

## 4) MVP Features (In Scope)

## 4.1 Dynamic Sky Generation
- Programmatically generate a night scene on load:
  - random stars (position, size, opacity),
  - optional cloud blobs/shapes,
  - optional decoy curved elements.
- Each session/round should look different enough to avoid memorized moon location.

## 4.2 Hidden Crescent Mechanic
- Crescent moon is placed randomly within safe viewport bounds.
- Must remain discoverable on small screens.
- Click/tap hit-area should be user-friendly but not obvious.

## 4.3 Subtle Parallax
- Pointer/touch-motion based parallax for depth:
  - background stars move least,
  - cloud/mid layer moves more,
  - foreground accents move most.
- On mobile, keep movement subtle to avoid jank.

## 4.4 Reveal Animation (No Audio)
- On moon found:
  - smooth color transition to festive palette,
  - greeting card fade/scale in,
  - lightweight celebratory particles/lantern drop.
- Keep animation performant and tasteful (avoid excessive effects).

## 4.5 Personalization via URL Param
- Read `from` query param from URL.
- Sanitize and decode safely.
- Show personalized text in final greeting.

## 4.6 Name-to-Link Generator
- Input field + CTA button.
- Generate and display full URL.
- Add **Copy link** action.
- Optional: native share trigger if available (`navigator.share`), fallback to copy.

## 4.7 Hint System
- If moon not found after 7 seconds, show **Hint** button.
- Hint behavior (MVP): moon gets a subtle pulse/glow for a short duration.

---

## 5) Explicitly Out of Scope (Post-MVP)
- Sound effects / Web Audio
- Countdown timer and score comparison
- Competitive challenge text (`I found it in Xs`) and social loop optimizations
- Leaderboards / backend persistence
- Localization (Urdu/Hindi, etc.)
- Account systems or databases

---

## 6) UX & Visual Direction
- Theme: elegant Chaand Raat mood
- Initial palette: deep navy / indigo / midnight gradients
- Reveal palette: warm gold / purple festive accent
- Typography:
  - clean modern base font
  - optional decorative headline style (still readable)
- Buttons and cards:
  - soft shadows/glow,
  - rounded corners,
  - high contrast for accessibility.

Microcopy tone:
- Calm and celebratory
- Short and inviting
- Example prompts:
  - `Find the crescent to reveal your Eid greeting`
  - `Need help? Try a hint`

---

## 7) Accessibility Requirements (MVP)
- Keyboard accessible controls for all buttons/inputs.
- Sufficient color contrast for text and controls.
- Reduced motion support:
  - respect `prefers-reduced-motion`,
  - minimize/parallax disable when requested.
- Touch-friendly target sizes.
- Avoid relying only on color for state changes.

---

## 8) Performance Requirements (MVP)
- Fast first load on mobile networks.
- Avoid heavy animation libraries unless necessary.
- Keep particle counts modest and adaptive by device width.
- Prefer CSS transforms/opacity for animation.
- Minimize layout thrashing during parallax.

---

## 9) Technical Implementation Notes

### Suggested structure
- `app/page.tsx`: main interactive screen
- `components/`:
  - `MoonHuntScene.tsx`
  - `GreetingReveal.tsx`
  - `LinkGenerator.tsx`
  - `HintButton.tsx`
- `lib/`:
  - `sky.ts` (star/cloud/random scene generation)
  - `params.ts` (query parsing/sanitization)
  - `utils.ts`

### State model (simple)
- `phase`: `searching | found`
- `fromName`: string (from URL param)
- `showHint`: boolean (after 7s)
- `hintActive`: boolean
- `sceneSeed` / generated objects

### Static export compatibility
- Avoid server-only dependencies.
- Run fully client-side for interactive scene.
- Ensure all features work under `next build` static output.

---

## 10) Security & Input Handling
- Treat `from` as untrusted input.
- Trim and length-limit (e.g., 40 chars).
- Escape/render as text only (no HTML injection).
- URL encode on generation.

---

## 11) Acceptance Criteria (MVP Done Definition)
1. Project builds and exports statically.
2. User can find hidden crescent and trigger reveal.
3. Sky and moon location are randomized per new round.
4. Personalized greeting from `?from=` works correctly.
5. Link generator creates and copies valid personalized URL.
6. Hint appears after 7 seconds and helps discovery.
7. Experience is smooth and usable on modern mobile browsers.
8. No audio included.

---

## 12) Next Step After This Setup
Implement the interactive core in this order:
1. Scene generation + hidden moon placement
2. Reveal transition + greeting card
3. URL personalization
4. Name-to-link generator + copy/share
5. Hint logic + polish + responsive tuning
