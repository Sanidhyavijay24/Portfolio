/**
 * @file HeroFrame.tsx
 * @description Full-bleed pixel-dither background with name text sliding out from the left and fading out on scroll
 * @module components/HeroFrame
 */

"use client";

import React, { useEffect, useState } from "react";
import NeuralFlowBackground from "./NeuralFlowBackground";

export default function HeroFrame() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate fading and sliding based on scroll position
  const fadeStart = 0;
  const fadeEnd = 450;
  const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
  const translateX = -Math.min(200, scrollY * 0.6);

  return (
    <section className="hero-full-bleed-section">
      {/* Full-bleed Neural Flow Background */}
      <div className="hero-full-bleed-bg">
        <NeuralFlowBackground color="255, 255, 255" backgroundColor="#121212" />
      </div>

      {/* Floating Hero Info — Slides in from left on load, slides away & fades on scroll */}
      <div
        className="hero-intro-overlay"
        style={{
          opacity,
          transform: `translateX(${translateX}px)`,
          pointerEvents: opacity < 0.1 ? "none" : "auto",
        }}
      >
        <div className="intro-badge font-mono">SYS_STATUS // ONLINE</div>
        <h1 className="intro-name font-mono">SANIDHYA</h1>
        <p className="intro-title font-mono">AI ENGINEER & Full-Stack Systems Architect</p>

        {/* Small decorative matrix block under the name */}
        <div className="intro-matrix font-mono">
          <span>OPTIMIZED_STABILITY</span>
          <span className="intro-matrix-bar">■■■■■■■■■■■■■■■■■■■■■■■■□□□□</span>
        </div>
      </div>

      {/* Mouse scroll indicator */}
      <div
        className="scroll-indicator font-mono"
        style={{ opacity: Math.max(0, 1 - scrollY / 150) }}
      >
        <span>SCROLL DOWN</span>
        <span className="scroll-arrow-down">↓</span>
      </div>
    </section>
  );
}
