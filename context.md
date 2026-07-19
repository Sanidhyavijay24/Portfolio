# Project Ledger (`context.md`)

## 1. Project Overview

A modern developer portfolio web application initialized with Next.js 14 (App Router, TypeScript) and formatted with ESLint + Prettier. Customized with absolute black background aesthetics (`#000000`), high-contrast monochrome design tokens, and three custom Google typography choices (JetBrains Mono, Fraunces serif, and Inter). Features an immersive single-screen scrollytelling layout (`app/page.tsx`) operating inside a fixed viewport container (`scrolly-viewport`). The background is a continuous, dynamic dithered pixel-flow canvas (`NeuralFlowBackground`) that responds to scroll events by shaking in-place with a fine micro-displacement wobble and flashing. The user's name ("SANIDHYA") and metadata panels slide in from the left dense pixel area on land, settling in the center-right section of the screen (`left: 45vw`, vertically centered). Scrolling animations are dampened smoothly (Lerp interpolation loop) to generate momentum. As the user scrolls, the dither background pixels fade out, and the name "SANIDHYA" breaks down dynamically into individual pixelated characters (each letter drifts in a separate vector, rotating, and morphing into glitchy terminal block glyphs `■`, `□`, `░`, `▓`, `1`, `0`, `_` before vanishing completely). The projects section displays a horizontal accordion deck of tall OpenAI Emergence-inspired ticket stencils, restoring the original colored backgrounds (Sage, Beige, Slate, Tan, Charcoal) with high-contrast text and high-fidelity inline SVG geometric spine designs (mesh, airfoil, database block matrix, crosshair starburst, circuit target). A subtle animated background canvas (`AsciiBackground`) rains faint falling columns of hex codes and terminal tokens behind the deck when active. Folder heights scale dynamically (`height: min(64vh, 600px)`) to prevent vertical clipping on any screen length.

## 2. Tech Stack

- **Runtime & Package Manager:** Bun (v1.3.12)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Vanilla CSS + CSS Variables (`globals.css`)
- **Typography:** `next/font/google` (JetBrains Mono, Fraunces, Inter)
- **SEO & Tools:** `next-sitemap` (v4.2.3), Open Graph & Twitter Cards metadata, SVG favicon
- **Code Quality:** ESLint (`next/core-web-vitals`, `next/typescript`), Prettier (`eslint-config-prettier`)

## 3. Architecture

- `app/`: Next.js App Router pages and global layouts
  - `app/layout.tsx`: Root layout configuring typography CSS variables, global theme, Open Graph & Twitter Card metadata
  - `app/icon.svg`: SVG favicon with phosphor amber theme
  - `app/fonts.ts`: Centralized Google font loader definitions
  - `app/globals.css`: Global design tokens, full-bleed hero styles, text entrance sliding keyframes, premium Emergence OpenAI-inspired tickets in colored formats, and Kaggle section
  - `app/page.tsx`: Homepage with HeroFrame, ProjectFolderStack, & KaggleStats (populated with actual expert metrics)
- `components/`: UI components
  - `HeroFrame.tsx`: Extended poster frame with SVG overlay stencil cutout in absolute black, framing the dynamic pixel-dither flow background, with text and popups removed
  - `NeuralFlowBackground.tsx`: Interactive HTML5 canvas rendering a dynamic flowing dithered grid of pixelated blocks that shake and flash reactively on scroll
  - `ProjectFolderStack.tsx`: 5 overlapping accordion folder cards styled as colorful Emergence tickets with inline SVG geometries, custom circular ASCII art, vertical taglines, barcode representation, and in-place case study expansion
  - `AsciiBackground.tsx`: Ambient falling ASCII code stream canvas overlay active behind projects
  - `KaggleStats.tsx`: Competitive ML & Kaggle profile statistics section in high-contrast monochrome
- `lib/data/`: Data models and data fetching services (`projects.ts`)
- `next-sitemap.config.js`: Automatic sitemap and `robots.txt` generator
- `vercel.json`: Vercel build configuration and HTTP security headers

## 4. Feature Status Checklist

- [x] Next.js 14 App Router + TypeScript initialization with Bun
- [x] ESLint and Prettier setup & integration
- [x] Google Fonts configuration (JetBrains Mono, Fraunces, Inter)
- [x] Global styling theme (`#000000` background, `#FFFFFF` foreground, monochrome design tokens)
- [x] Project structure initialization (`components/`, `lib/data/`)
- [x] Rebuilt custom homepage `app/page.tsx` into a single-screen fixed viewport scrollytelling timeline
- [x] Name header slides in from left dithered pixels and settles on the right side (`left: 45vw`), centered vertically using keyframe translation alignment
- [x] Integrate smooth scroll dampening (Lerp interpolation loop) to make scrolling animations buttery smooth
- [x] Detect scrolling state and pass down to NeuralFlowBackground to trigger micro-shake displacement and flashing
- [x] Fade out name overlay and pixel dither canvas completely on scroll to reveal absolute black background
- [x] Split the name "SANIDHYA" into individual characters, causing them to drift, rotate, and morph into glitchy pixel blocks/binary glyphs on scroll before vanishing
- [x] Overhaul accordion projects in `ProjectFolderStack.tsx` to render as Emergence OpenAI-inspired ticket stencils with custom circular ASCII art, barcodes, and zero-delay accordion click transitions
- [x] Restore original card backgrounds (Sage green, Beige, Slate blue, Tan, Charcoal with yellow highlight) with high-contrast text colors
- [x] Render custom inline SVG geometric art (mesh, airfoil, database block matrix, crosshair starburst, circuit target) on collapsed spines
- [x] Add dynamic background animation overlay `AsciiBackground` rendering columns of falling hex codes/terminal strings, with sizing and visibility corrections
- [x] Position projects pane centered horizontally (`left: 50%`) and vertically to make layout central
- [x] Constrain projects folder deck height using viewport-relative metrics (`height: min(64vh, 600px)`) to prevent vertical clipping on any screen length
- [x] Scroll locking integrated inside folder stack when a case study sheet is expanded
- [x] Export `projects` array in `lib/data/projects.ts` containing the 5 featured projects (`urbanpinn`, `aeroml`, `pgtime`, `traceback-ai`, `flagr`) with custom colored properties
- [x] Added vertical rotated sidebar text `SANIDHYA.AI // FILE_STACK // ID_2026` on page margin
- [x] Render `KaggleStats` section in JetBrains Mono populated with Expert medal stats linking out to `kaggle.com/sanidhyavijay24`
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
