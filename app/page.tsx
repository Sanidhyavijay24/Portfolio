/**
 * @file page.tsx
 * @description Single-screen Laminar Drift HUD portfolio orchestrator with vector field particle canvas & regenerate seed controls
 * @module app/page
 */

"use client";

import { useEffect, useState, useRef } from "react";
import NeuralFlowBackground from "@/components/NeuralFlowBackground";
import AsciiBackground from "@/components/AsciiBackground";
import HudHeader from "@/components/HudHeader";
import ProjectWorkstation from "@/components/ProjectWorkstation";
import AboutWorkstation from "@/components/AboutWorkstation";
import { projects } from "@/lib/data/projects";

// Glitch characters for the letter breakdown animation on scroll
const GLITCH_GLYPHS = ["■", "□", "░", "▒", "▓", "1", "0", "_", "▲", "▰"];

const LETTERS_DATA = [
  { char: "S", dx: -0.6, dy: -0.4 },
  { char: "A", dx: -0.2, dy: 0.5 },
  { char: "N", dx: -0.5, dy: -0.1 },
  { char: "I", dx: 0.3, dy: -0.6 },
  { char: "D", dx: 0.6, dy: 0.3 },
  { char: "H", dx: -0.1, dy: 0.6 },
  { char: "Y", dx: 0.5, dy: -0.4 },
  { char: "A", dx: 0.3, dy: 0.5 },
];

export default function Home() {
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [seed, setSeed] = useState(1147);

  const targetScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Smooth Scroll Lerp Loop
  useEffect(() => {
    const updateSmoothScroll = () => {
      const target = targetScrollYRef.current;
      setSmoothScrollY((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.08) return target;
        return prev + diff * 0.13;
      });
      animationFrameRef.current = requestAnimationFrame(updateSmoothScroll);
    };

    animationFrameRef.current = requestAnimationFrame(updateSmoothScroll);

    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
      setIsScrolling(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({
        top: e.deltaY,
        behavior: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Section Opacities based on smooth scroll metrics
  const heroOpacity = Math.max(0, 1 - smoothScrollY / 260);

  let workstationOpacity = 0;
  if (smoothScrollY >= 180 && smoothScrollY < 1200) {
    workstationOpacity = Math.min(1, (smoothScrollY - 180) / 120);
  } else if (smoothScrollY >= 1200 && smoothScrollY < 1400) {
    workstationOpacity = Math.max(0, 1 - (smoothScrollY - 1200) / 120);
  }

  const aboutOpacity = Math.min(1, Math.max(0, (smoothScrollY - 1300) / 140));

  // Determine active section string for HUD Navigation Header
  let activeSection = "hero";
  if (smoothScrollY >= 180 && smoothScrollY < 1300) {
    activeSection = "workstation";
  } else if (smoothScrollY >= 1300) {
    activeSection = "about";
  }

  const handleNavClick = (sectionId: string) => {
    let targetY = 0;
    if (sectionId === "workstation") targetY = 400;
    if (sectionId === "about") targetY = 1400;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const handleReseed = () => {
    const newSeed = Math.floor(Math.random() * 100000);
    setSeed(newSeed);
  };

  const activeCode = projects[activeProjectIdx]?.code || "001";

  return (
    <div className="scrolly-root">
      {/* Immersive Fixed HUD Viewport */}
      <div className="scrolly-viewport">
        {/* Laminar Drift Vector Field Canvas (fades out as you scroll down to projects) */}
        <div className="scrolly-bg" style={{ opacity: heroOpacity }}>
          <NeuralFlowBackground
            seed={seed}
            backgroundColor="#0E1420"
            isScrolling={isScrolling}
            activeProjectCode={activeCode}
          />
        </div>

        {/* Ambient Falling ASCII Matrix Stream Overlay */}
        <AsciiBackground opacity={workstationOpacity} />

        {/* Top Floating Header Navigation Bar */}
        <HudHeader activeSection={activeSection} onNavigate={handleNavClick} />

        {/* Telemetry Badge & Regenerate Button */}
        {heroOpacity > 0.05 && (
          <div className="hero-telemetry-row font-mono" style={{ opacity: heroOpacity }}>
            <span className="vector-seed-tag">vector field · seed {seed}</span>
            <button onClick={handleReseed} className="reseed-btn">
              regenerate ↻
            </button>
          </div>
        )}

        {/* Peripheral Branding Rail */}
        <div className="vertical-side-label font-mono">S.V // PORTFOLIO // 2026</div>

        {/* SECTION 1: HERO INTRO (Centered Title with Glitch Character Breakdown) */}
        {heroOpacity > 0.01 && (
          <div
            className="intro-pane"
            style={{
              opacity: heroOpacity,
              pointerEvents: heroOpacity > 0.8 ? "auto" : "none",
            }}
          >
            <h1 className="intro-name font-mono flex">
              {LETTERS_DATA.map((item, idx) => {
                const driftX = item.dx * smoothScrollY * 0.75;
                const driftY = item.dy * smoothScrollY * 0.75;
                const glitchChance = Math.min(1, smoothScrollY / 185);
                const isGlitched = glitchChance > 0.08 && Math.random() < glitchChance * 0.85;
                const displayChar = isGlitched
                  ? GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)]
                  : item.char;

                return (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      transform: `translate(${driftX}px, ${driftY}px) rotate(${smoothScrollY * item.dx * 0.15}deg)`,
                      transition: "transform 0.05s ease-out",
                      opacity: isGlitched ? 0.75 : 1,
                    }}
                  >
                    {displayChar}
                  </span>
                );
              })}
            </h1>

            <p className="intro-title font-mono">AI ML Engineer</p>

            <div className="intro-matrix font-mono">
              <span>STABILITY_METER // OK</span>
              <span className="intro-matrix-bar">■■■■■■■■■■■■■■■■■■■■■■■■□□□□</span>
            </div>
          </div>
        )}

        {/* SECTION 2: INTERACTIVE PROJECT WORKSTATION */}
        {workstationOpacity > 0.01 && (
          <div
            style={{
              opacity: workstationOpacity,
              pointerEvents: workstationOpacity > 0.8 ? "auto" : "none",
            }}
          >
            <ProjectWorkstation
              projects={projects}
              scrollY={smoothScrollY}
              activeIdx={activeProjectIdx}
              onSelectProject={setActiveProjectIdx}
            />
          </div>
        )}

        {/* SECTION 3: ABOUT & KAGGLE METRICS */}
        {aboutOpacity > 0.01 && (
          <div
            style={{
              opacity: aboutOpacity,
              pointerEvents: aboutOpacity > 0.8 ? "auto" : "none",
            }}
          >
            <AboutWorkstation />
          </div>
        )}

        {/* Bottom Scroll Helper Indicator */}
        {smoothScrollY < 100 && (
          <div className="scrolly-indicator font-mono">
            <span>SCROLL TO DISCOVER</span>
            <span className="scrolly-arrow">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
