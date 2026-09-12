# Hari P — Full-Stack Developer Portfolio

A cinematic, production-ready portfolio built around Hari P's identity as a
full-stack developer — an editorial dark experience set in a subtle cosmic
environment, moving the visitor from **hero → about → stack → work →
experience → contact**.

Built with **React + TypeScript + Vite + GSAP**. No template lock-in, no
fabricated data — every fact comes from the résumé.

---

## Highlights

- **Cinematic hero** — the real portrait sits inside an animated glowing ring
  over a cosmic backdrop, with a subtle cursor-driven tilt and a live code
  fragment describing the real stack.
- **Projects as case studies** — expandable Challenge / Approach / Role /
  Features / Architecture, each with a mini architecture diagram — not a grid
  of cards.
- **Interactive stack ecosystem** — technology categories reveal their tools
  with a clear active state, rather than an icon wall.
- **Experience timeline** — scroll-driven progress line with real roles.
- **Consistent cosmic theme** — one shared cosmic environment across every
  section, with gradual per-chapter lighting shifts.
- **Custom cursor + magnetic CTAs** — desktop only, disabled on touch.
- **Fully accessible & resilient** — semantic landmarks, a single logical
  heading outline, skip link, focus states, alt text, `prefers-reduced-motion`
  support, and automatic performance tiers.

## Tech Stack

| Layer         | Choice                                                            |
| ------------- | ----------------------------------------------------------------- |
| Framework     | React 18 + TypeScript                                             |
| Build tool    | Vite 5                                                            |
| Motion        | GSAP 3 + ScrollTrigger                                            |
| Smooth scroll | Lenis                                                            |
| 3D / WebGL    | Three.js + React Three Fiber + Drei (lazy-loaded, tier-gated)     |
| Fonts         | Space Grotesk (display), Inter (body), JetBrains Mono (technical) |

> The WebGL world (a scroll-choreographed camera through stars, ambient
> particles, and a rising planet) is code-split into its own chunk and only
> loaded on capable devices. Lower tiers, `prefers-reduced-motion`, and devices
> without WebGL fall back to the pure-CSS cosmic background — the site never
> ships the 3D payload to devices that can't use it, and content never depends
> on it.

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
```

> **WSL / Linux note:** if `vite preview` reports a missing
> `@rollup/rollup-linux-x64-gnu`, install the platform binary:
> `npm install @rollup/rollup-linux-x64-gnu@$(node -p "require('./node_modules/rollup/package.json').version") --no-save --force --os=linux --cpu=x64 --libc=glibc`

## Project Structure

```
src/
├── components/
│   ├── layout/        Background (cosmic + grain), Cursor, Loader, Footer
│   ├── navigation/    Navigation (active state, scroll progress, mobile menu)
│   ├── hero/          Hero (portrait in glowing ring + cosmic backdrop)
│   ├── profile/       About (education, certifications, achievements)
│   ├── stack/         Stack ecosystem (interactive technology categories)
│   ├── projects/      Projects (expandable case studies + arch diagrams)
│   ├── experience/    Experience timeline
│   ├── contact/       Contact final chapter
│   └── common/        Magnetic (magnetic CTA wrapper + shared button styles)
├── three/             WebGL world: SceneCanvas, CameraRig, Environment,
│                      Stars, AmbientParticles (lazy, tier-gated)
├── animations/        Reusable GSAP text/reveal helpers
├── data/              portfolioData.ts (single source of truth) + types
├── hooks/             useEnv, useSmoothScroll, useChapterLighting,
│                      useScrollProgress, useSceneQuality, useWebGLSupport,
│                      usePointerMotion
├── utils/             perf tier / reduced-motion / touch detection
├── styles/            global.css (design tokens, resets, primitives)
├── App.tsx
└── main.tsx

public/
├── assets/            hari.jpeg (portrait), Hari-P-Resume.pdf
├── Background1.png    hero cosmic backdrop
├── Background2.png    global + stack cosmic backdrop
└── Background3.png    contact finale backdrop
```

## Content Model

All professional content lives in [`src/data/portfolioData.ts`](src/data/portfolioData.ts),
extracted verbatim from the résumé (`HARI-RESUME.pdf`) and rewritten only into
website voice. Nothing is invented — links, dates, companies, metrics, and
project details are all real. Update this one file to update the site.

## Updating Content

This is a **frontend-only** site — there is no backend, database, or CMS. All
content is baked into the build from `src/data/portfolioData.ts`. To change
anything: edit that file, run `npm run build`, and redeploy. TypeScript
(`src/data/types.ts`) enforces the shape, so a missing field fails the build
with a clear message.

| Section | Array in `portfolioData.ts` | Notes |
| ------------ | --------------------------- | ----- |
| Stack | `skills` | Add a tool to a category's `items`, or add a new `{ key, label, description, items }` category. For a brand icon on a new tool, add an SVG to `src/components/stack/techIcons.tsx` and a mapping in `iconKeyFor()`; otherwise it shows a monogram. |
| Work | `projects` | Add a `{ index, name, kind, challenge, approach, role, features[], tech[], architecture[] }` object. `result` is optional. Per-project accent hue is set by `index` in `PROJECT_HUE` (`Projects.tsx`); unmapped indexes fall back to violet. |
| Experience | `experience` | Add a `{ company, role, period, year, summary, points[], tech[] }` object. **The first entry is treated as the current role** (green `CURRENT` badge). |
| Certificates | `certificates` | Put the image in `public/certificates/`, then add `{ title, issuer, image, date? }`. |

Components, animations, and responsive layout adapt automatically — no JSX/CSS
changes are needed to add plain content.

## Accessibility & Performance

- **Reduced motion:** `prefers-reduced-motion` disables parallax, ring spin, and
  reveals; content is shown statically and remains fully usable.
- **Performance tiers:** device capability (cores, memory, pointer, width) is
  detected automatically. Lower tiers drop ambient particles — no user-facing
  quality toggle.
- **Touch devices:** the custom cursor and magnetic/tilt interactions are
  disabled; layouts switch to touch-friendly vertical storytelling.
- **Semantics:** landmark elements, a skip link, a single `<h1>`, visible focus
  rings, descriptive `alt` text, and a logical heading hierarchy.

## Verification

- `npm run build` — type-checks (`tsc`) and bundles with zero errors.
- `node scripts/smoke.mjs` — dependency-free build check: serves `dist/` with
  Node's built-in http server and asserts the page, JS/CSS bundles, portrait,
  résumé, and the three cosmic backgrounds all serve, that the bundle carries
  the real résumé content and CTAs, and that no dead frame references remain.
  Self-terminating (30s watchdog). Run `npm run build` first so `dist/` is
  current.

## Credits

Design & build for **Hari P**. Built with React · TypeScript · GSAP.
