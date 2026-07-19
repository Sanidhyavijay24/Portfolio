/**
 * @file page.tsx
 * @description Homepage with smooth scroll dampening and dynamic text breakdown glitch animations
 * @module app/page
 */

"use client";

import { useEffect, useState, useRef } from "react";
import NeuralFlowBackground from "@/components/NeuralFlowBackground";
import ProjectFolderStack from "@/components/ProjectFolderStack";
import KaggleStats from "@/components/KaggleStats";
import AsciiBackground from "@/components/AsciiBackground";
import { projects } from "@/lib/data/projects";

// Glitch characters to replace letters during scroll breakdown
const GLITCH_GLYPHS = ["■", "□", "░", "▒", "▓", "1", "0", "_", "▲", "▰"];

// Letter data mapping drift vector offsets for the "SANIDHYA" breakdown
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
  const [targetScrollY, setTargetScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetScrollYRef = useRef(0);

  // Smooth Dampening Interpolation Loop (Lerp)
  useEffect(() => {
    const updateSmoothScroll = () => {
      const target = targetScrollYRef.current;
      setSmoothScrollY((prev) => {
        const diff = target - prev;
        // If close enough, snap to target to save cycles
        if (Math.abs(diff) < 0.08) {
          return target;
        }
        return prev + diff * 0.13; // Lerp factor (0.13 is buttery smooth and responsive)
      });
      animationFrameRef.current = requestAnimationFrame(updateSmoothScroll);
    };

    animationFrameRef.current = requestAnimationFrame(updateSmoothScroll);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      targetScrollYRef.current = currentScroll;
      setTargetScrollY(currentScroll);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // SCROLL TIMELINE INTERPOLATIONS (Driven by smoothScrollY for momentum easing):
  // Step 1: Intro text (fades out as scroll goes from 0 -> 220)
  const introOpacity = Math.max(0, 1 - smoothScrollY / 220);

  // Step 2: Projects Accordion (fades in as scroll goes from 180 -> 350, fades out from 620 -> 750)
  let projectsOpacity = 0;
  if (smoothScrollY >= 180 && smoothScrollY < 620) {
    projectsOpacity = Math.min(1, (smoothScrollY - 180) / 120);
  } else if (smoothScrollY >= 620 && smoothScrollY < 750) {
    projectsOpacity = Math.max(0, 1 - (smoothScrollY - 620) / 100);
  } else if (smoothScrollY >= 750) {
    projectsOpacity = 0;
  }

  // Step 3: Kaggle Stats Card (fades in as scroll goes from 700 -> 850)
  const kaggleOpacity = Math.min(1, Math.max(0, (smoothScrollY - 700) / 120));

  return (
    <div className="scrolly-root">
      {/* Immersive Fixed Viewport Container */}
      <div className="scrolly-viewport">
        {/* Dynamic Pixel Dither Flow Background (Fades out with intro) */}
        <div className="scrolly-bg" style={{ opacity: introOpacity }}>
          <NeuralFlowBackground
            color="255, 255, 255"
            backgroundColor="#121212"
            isScrolling={isScrolling}
          />
        </div>

        {/* Subtle animated ASCII background that fades in when projects are active */}
        <AsciiBackground opacity={projectsOpacity} />

        {/* Vertical side branding label */}
        <div className="vertical-side-label font-mono">SANIDHYA.AI // FILE_DECK // ID_2026</div>

        {/* Phase 1: Intro Name/Title Overlay (Shivers and glitched pixelates on scroll) */}
        {introOpacity > 0.01 && (
          <div
            className="intro-pane"
            style={{
              opacity: introOpacity,
              transform: "translateY(-50%)",
            }}
          >
            <div className="intro-badge font-mono text-white-dim">SYS_STATUS // ACTIVE</div>

            {/* Split character pixel breakdown heading */}
            <h1 className="intro-name font-mono flex">
              {LETTERS_DATA.map((item, idx) => {
                // Determine drift offset based on smooth scroll metrics
                const driftX = item.dx * smoothScrollY * 0.75;
                const driftY = item.dy * smoothScrollY * 0.75;

                // Glitch character swap chance based on scroll progress
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

            <p className="intro-title font-mono">AI ENGINEER & Full-Stack Systems Architect</p>

            <div className="intro-matrix font-mono">
              <span>STABILITY_METER // OK</span>
              <span className="intro-matrix-bar">■■■■■■■■■■■■■■■■■■■■■■■■□□□□</span>
            </div>
          </div>
        )}

        {/* Phase 2: Overlapping Projects Folder Accordion (Centered horizontally on the page) */}
        {projectsOpacity > 0.01 && (
          <div
            className={`projects-pane ${smoothScrollY >= 195 ? "pane-active" : ""}`}
            style={{
              opacity: projectsOpacity,
              pointerEvents: projectsOpacity > 0.8 ? "auto" : "none",
            }}
          >
            <div className="pane-header font-mono">
              <span className="pane-tag">{"// WORKS_RECORD"}</span>
              <h2 className="pane-title font-mono">FEATURED PROJECTS</h2>
            </div>
            <ProjectFolderStack projects={projects} />
          </div>
        )}

        {/* Phase 3: Kaggle Highlights Panel (Centered horizontally) */}
        {kaggleOpacity > 0.01 && (
          <div
            className={`kaggle-pane ${smoothScrollY >= 720 ? "pane-active" : ""}`}
            style={{
              opacity: kaggleOpacity,
              pointerEvents: kaggleOpacity > 0.8 ? "auto" : "none",
            }}
          >
            <div className="pane-header font-mono">
              <span className="pane-tag">{"// METRICS_METADATA"}</span>
              <h2 className="pane-title font-mono">KAGGLE HIGHLIGHTS</h2>
            </div>
            <KaggleStats
              profileUrl="https://www.kaggle.com/sanidhyavijay24"
              gold={1}
              silver={3}
              bronze={16}
              publicNotebooks={18}
              tier="Notebooks Expert"
              percentile="Top 3%"
            />

            <div className="kaggle-footer-details font-mono text-xs">
              <span>SECURE_DATA_FEED // ENCRYPTED</span>
              <span>SYS_TEMP: NOMINAL</span>
            </div>
          </div>
        )}

        {/* Scroll Helper Hint */}
        {targetScrollY < 100 && (
          <div className="scrolly-indicator font-mono">
            <span>SCROLL TO DISCOVER</span>
            <span className="scrolly-arrow">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
