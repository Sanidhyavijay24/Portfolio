# Project Ledger (`context.md`)

## 1. Project Overview

A modern developer portfolio web application initialized with Next.js 14 (App Router, TypeScript) and formatted with ESLint + Prettier. Remodeled into a Cyberpunk HUD Operating System interface inspired by `to-portfolio.com`, floating capsule header navigation, and the `mockup_laminar_drift.html` canvas simulation engine. Customized with deep oceanic midnight navy background aesthetics (`#0E1420`), warm ivory text (`#EDEAE0`), slate blue dim text (`#9FB0CC`), and warm coral/amber vector flow accents (`#F2A93B`, `#E2543B`, `#3E6FE0`). Features an immersive single-screen scrollytelling HUD layout (`app/page.tsx`) operating inside a fixed viewport container (`scrolly-viewport`). The background features the Laminar Drift Vector Field Particle Flow Engine (`NeuralFlowBackground`), driven by a Mulberry32 PRNG seed generator (`seed = 1147`) with an interactive **`vector field · seed {seed}`** readout badge and a **`regenerate ↻`** seed button that re-initializes streamline trajectories live. Hero title ("SANIDHYA" with letter-drift character breakdown) and "AI ML Engineer" subtitle remain centered with smooth scroll animations. The header (`HudHeader`) features a sleek floating pill layout with monogram `[S.V]`, section navigation (`PORTFOLIO`, `PROJECTS`, `ABOUT`), a resume download link (`⤓ RESUME`), and a direct mailto contact link (`CONTACT` → `mailto:sanidhyavijay2004@gmail.com`). The projects section (`ProjectWorkstation`) features interactive parameter control panels (Leva-inspired GUI sliders) allowing live adjustment of simulation parameters for Sanidhya's real project data (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`). The about section (`AboutWorkstation`) presents profile details, technical stack specifications, Kaggle Notebooks Expert stats, and terminal links.

## 2. Tech Stack

- **Runtime & Package Manager:** Bun (v1.3.12)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Vanilla CSS + CSS Variables (`globals.css`)
- **Typography:** `next/font/google` (JetBrains Mono, Fraunces, Inter)
- **Vector Simulation Engine:** Mulberry32 PRNG + Laminar Drift Flow Field (`NeuralFlowBackground`)
- **SEO & Tools:** `next-sitemap` (v4.2.3), Open Graph & Twitter Cards metadata, SVG favicon
- **Code Quality:** ESLint (`next/core-web-vitals`, `next/typescript`), Prettier (`eslint-config-prettier`)

## 3. Architecture

- `app/`: Next.js App Router pages and global layouts
  - `app/layout.tsx`: Root layout configuring typography CSS variables, global theme, Open Graph & Twitter Card metadata
  - `app/icon.svg`: SVG favicon with phosphor amber theme
  - `app/fonts.ts`: Centralized Google font loader definitions
  - `app/globals.css`: Global design tokens, `#0E1420` theme, vector telemetry badges, Leva parameter control sliders, and HUD workstation styles
  - `app/page.tsx`: Single-screen HUD scrollytelling orchestrator with seed state, vector telemetry readout, `regenerate ↻` button, connecting HudHeader, ProjectWorkstation, & AboutWorkstation
- `components/`: UI components
  - `HudHeader.tsx`: Top floating capsule header bar displaying `[S.V]` monogram, section navigation links, Resume download button, and mailto Contact button
  - `PixelFolderGraphics.tsx`: Custom retro pixel-art SVG graphics for project folders (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`)
  - `UrbanPinnCard.tsx`: Expanded 3-column micro-climate CFD simulator card loaded with authentic PyTorch README specs, 8-layer SIREN architecture ($x,y,z \to u,v,w,p,T$), Navier-Stokes PDE loss equations, 100 Pa pressure drop, 10m/s inlet velocity, pollution trap detection, and 397K parameter metrics
  - `NeuralFlowBackground.tsx`: Interactive Laminar Drift vector field particle flow canvas engine driven by Mulberry32 PRNG seed state and velocity color lerping
  - `ProjectWorkstation.tsx`: Retro pixel-art folder workstation featuring scroll-driven Archive Box fade-in/fade-out into 4 horizontal pixel project folders, and split paper dossier view on folder click
  - `AboutWorkstation.tsx`: Profile identity card for AI ML Engineer, runtime architecture specs, Kaggle expert statistics, and terminal connection links
  - `AsciiBackground.tsx`: Ambient falling ASCII code stream canvas overlay active behind projects
  - `KaggleStats.tsx`: Competitive ML & Kaggle profile statistics section in high-contrast monochrome
- `lib/`: Utilities and data
  - `lib/data/projects.ts`: Real project data and tunable simulation parameters for HUD workstations
- `next-sitemap.config.js`: Automatic sitemap and `robots.txt` generator
- `vercel.json`: Vercel build configuration and HTTP security headers

## 4. Feature Status Checklist

- [x] Next.js 14 App Router + TypeScript initialization with Bun
- [x] ESLint and Prettier setup & integration
- [x] Dashboard Card Redesign: Overhauled all 4 project description layouts (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`) into custom 3-column dark engineering dashboards featuring themed corner brackets, specific numbered specifications lists, custom visual animation widgets (rotating dot sphere, animated airfoil contour, pulsing DB ledger, interactive causality DAG), barcodes, and direct GitHub links
- [x] Next.js Build Fix: Moved `icon.svg` from `app/` to `public/` directory to resolve page generation errors and complete sitemap builds cleanly
- [x] Expanded project description card container bounds (`width: min(94vw, 1280px)`, `height: min(84vh, 760px)`) and enlarged typography readability
- [x] Applied `#0E1420` oceanic navy background theme with `#EDEAE0` ivory text and `#9FB0CC` slate blue accents across `app/globals.css`
- [x] Fixed scrollytelling background opacity overlap so hero particle canvas fades out when scrolling to projects section
- [x] Added `vector field · seed {seed}` telemetry readout badge and `regenerate ↻` interactive button on hero section
- [x] Preserved centered "SANIDHYA" title, "AI ML Engineer" subtitle, and smooth scroll letter-drift breakdown animations
- [x] Updated header to match reference capsule image: `[S.V]` monogram, `PORTFOLIO` / `PROJECTS` / `ABOUT` nav links, `⤓ RESUME` download link, and `CONTACT` (`mailto:sanidhyavijay2004@gmail.com`)
- [x] Replaced generic live sandbox sliders in `ProjectWorkstation.tsx` with a clean, spacious project detail card and dedicated artwork stage container (`workstation-right-stage`) ready for custom fixed backgrounds per project (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`)
- [x] Constructed `AboutWorkstation.tsx` displaying engineer identity, technical stack specifications, Kaggle Notebooks Expert medals, and terminal links
- [x] Exported real project data and simulation parameters in `lib/data/projects.ts` (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`)
- [x] Added peripheral telemetry rails (`S.V // PORTFOLIO // 2026`) on viewport margins
- [x] Set up `next-sitemap` (`next-sitemap.config.js` & postbuild script)
- [x] Open Graph (OG) and Twitter Card metadata in `app/layout.tsx`
- [x] Vercel build & security headers configuration (`vercel.json`)

## 5. Data Models

### Project Folder Model (`lib/data/projects.ts`)

```typescript
export interface ProjectFolder {
  id: string;
  code: string;
  name: string;
  slug: string;
  tag: string;
  artTitle: string;
  subtitle: string;
  bg: string;
  fg: string;
  accent: string;
  artType: "mesh" | "airfoil" | "matrix" | "starburst" | "circuit";
  desc: string;
  overview: string;
  architecture: string[];
  challenges: string;
  results: string;
  tech: string[];
  href?: string;
}
```

## 6. API Contracts

- Static Data Layer via `lib/data/projects.ts`.

## 7. Technical Debt

- None.
