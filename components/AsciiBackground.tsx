/**
 * @file AsciiBackground.tsx
 * @description Ambient organic ASCII contour flow field background rendering glowing ivory-cream cloud shapes
 * @module components/AsciiBackground
 */

"use client";

import React, { useEffect, useRef } from "react";

type AsciiBackgroundProps = {
  opacity: number;
};

// Ink-density character ramp matching the organic cloud image
const RAMP = "  ..ooxx##";
const CELL_W = 10;
const CELL_H = 15;
const COLOR = "237, 234, 224"; // warm ivory/cream RGB #EDEAE0

export default function AsciiBackground({ opacity }: AsciiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let cw = 0;
    let ch = 0;
    let cols = 0;
    let rows = 0;

    // Pre-render sprite canvas for fast rendering with shadow glow
    const sprites: HTMLCanvasElement[] = RAMP.split("").map((char) => {
      const sprite = document.createElement("canvas");
      sprite.width = CELL_W * 2;
      sprite.height = CELL_H * 2;
      const sctx = sprite.getContext("2d")!;
      sctx.scale(2, 2);
      sctx.font = "12px var(--font-mono, monospace)";

      // Phosphor warm glow effect
      sctx.shadowColor = `rgba(${COLOR}, 0.65)`;
      sctx.shadowBlur = 4;
      sctx.fillStyle = `rgb(${COLOR})`;
      sctx.textBaseline = "middle";
      sctx.fillText(char, 0, CELL_H / 2);
      return sprite;
    });

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      cw = rect.width || window.innerWidth;
      ch = rect.height || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
      cols = Math.ceil(cw / CELL_W);
      rows = Math.ceil(ch / CELL_H);
    }

    layout();

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fluid laminar/cloud 2D noise approximation using moving sine/cosine waves
    function fieldAt(x: number, y: number, t: number) {
      const nx = x * 0.04;
      const ny = y * 0.05;
      const v =
        Math.sin(nx + t * 0.12) * Math.cos(ny - t * 0.09) +
        Math.sin((nx + ny) * 0.5 + t * 0.07) * Math.cos(ny * 0.8 + t * 0.05) +
        Math.sin(nx * 1.5 - t * 0.08) * 0.3;
      return (v + 1.3) / 2.6; // normalize to roughly 0..1
    }

    let t = 0;
    let frame = 0;

    function draw() {
      ctx!.clearRect(0, 0, cw, ch);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = fieldAt(c, r, t);

          // We define separate organic boundaries (or "cloud paths") to match the user's background structure
          // This matches the distinct flowing shapes separated by dark spaces
          const isCloud = (v > 0.44 && v < 0.65) || (v > 0.72 && v < 0.92);
          if (!isCloud) continue;

          // Pick the character indices based on proximity to cloud borders
          // The borders are styled to have a dense glowing/hatched character profile
          const distToEdge = Math.min(
            Math.abs(v - 0.44),
            Math.abs(v - 0.65),
            Math.abs(v - 0.72),
            Math.abs(v - 0.92)
          );

          // Map edges to denser characters, inner clouds to sparser dots
          let rampIdx = 1; // '.'
          if (distToEdge < 0.04) {
            rampIdx = RAMP.length - 1; // '#' (dense glow edge)
          } else if (distToEdge < 0.08) {
            rampIdx = 4; // 'o'
          }

          // Calculate alpha and add glow intensity
          const alpha = 0.05 + (1 - distToEdge * 8) * 0.45;
          ctx!.globalAlpha = Math.min(0.55, Math.max(0.08, alpha));
          ctx!.drawImage(sprites[rampIdx], c * CELL_W, r * CELL_H, CELL_W, CELL_H);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function tick() {
      frame++;
      // Render at 24fps for smooth fluid flow dynamics without CPU loading
      if (frame % 2 === 0) {
        t += 0.08;
        draw();
      }
      animationId = requestAnimationFrame(tick);
    }

    if (reduceMotion) {
      draw();
    } else {
      tick();
    }

    const resizeObserver = new ResizeObserver(() => {
      layout();
      draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: opacity > 0.01 ? "block" : "none",
        opacity,
        pointerEvents: "none",
        zIndex: 1,
        transition: "opacity 0.4s ease",
      }}
    />
  );
}
