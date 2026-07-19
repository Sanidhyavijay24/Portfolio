/**
 * @file NeuralFlowBackground.tsx
 * @description Generates a dynamic dithered digital sand/flow network of pixelated squares that shakes and flashes on scroll
 * @module components/NeuralFlowBackground
 */

"use client";

import { useEffect, useRef } from "react";

type NeuralFlowBackgroundProps = {
  particleCount?: number;
  seed?: number;
  color?: string; // RGB string, e.g. "255, 255, 255"
  backgroundColor?: string;
  className?: string;
  isScrolling?: boolean;
};

export default function NeuralFlowBackground({
  seed = 42,
  color = "240, 240, 240",
  backgroundColor = "#121212",
  className,
  isScrolling = false,
}: NeuralFlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScrollingRef = useRef(false);

  // Keep ref up to date so animation loop reads the latest scroll status without restarting
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let cw = 0;
    let ch = 0;
    let time = 0;

    // Simple mulberry32 generator
    function mulberry32(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(seed);

    // Initialize grid block array
    let blocks: {
      gridX: number;
      gridY: number;
      size: number;
      baseAlpha: number;
      phase: number;
      speed: number;
    }[] = [];

    const gridSize = 12; // size of each pixel square block

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      blocks = [];
      const cols = Math.ceil(cw / gridSize);
      const rows = Math.ceil(ch / gridSize);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const xRatio = x / cols;
          const yRatio = y / rows;

          const boundary = 0.35 + 0.15 * Math.sin(yRatio * Math.PI * 2.5 + xRatio * Math.PI);
          const distToBoundary = xRatio - boundary;

          let prob = 0;
          if (distToBoundary < 0) {
            prob = Math.pow(Math.abs(distToBoundary) / boundary, 0.6) * 0.92;
          } else {
            prob = Math.max(0, 0.05 - 0.05 * (distToBoundary / (1 - boundary)));
          }

          const checkPattern = (x + y) % 2 === 0 ? 0.95 : 0.65;
          const finalProb = prob * checkPattern;

          if (rand() < finalProb) {
            let size = gridSize - 2;
            if (Math.abs(distToBoundary) < 0.12 && rand() < 0.6) {
              size = Math.floor(gridSize / 2) - 1;
            }

            blocks.push({
              gridX: x * gridSize,
              gridY: y * gridSize,
              size,
              baseAlpha: 0.15 + rand() * 0.75,
              phase: rand() * Math.PI * 2,
              speed: 0.015 + rand() * 0.02,
            });
          }
        }
      }
    }

    layout();

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function drawStatic() {
      ctx!.fillStyle = backgroundColor;
      ctx!.fillRect(0, 0, cw, ch);

      blocks.forEach((b) => {
        ctx!.fillStyle = `rgba(${color}, ${b.baseAlpha})`;
        ctx!.fillRect(b.gridX, b.gridY, b.size, b.size);
      });
    }

    function drawFrame() {
      ctx!.fillStyle = backgroundColor;
      ctx!.fillRect(0, 0, cw, ch);

      time += 0.025;
      const scrolling = isScrollingRef.current;

      blocks.forEach((b) => {
        let dynamicAlpha = Math.max(
          0.06,
          Math.min(0.95, b.baseAlpha + 0.18 * Math.sin(time + b.phase))
        );

        let wobbleX =
          Math.abs(b.gridX - cw * 0.3) < 150 ? Math.sin(time * b.speed + b.phase) * 0.5 : 0;
        let wobbleY =
          Math.abs(b.gridY - ch * 0.5) < 150 ? Math.cos(time * b.speed + b.phase) * 0.5 : 0;

        // Reactive Scroll Jitter (shake) and Flashing
        if (scrolling) {
          // Fast pseudo-random high frequency shake (Jitter) - Reduced sensitivity from 2.4 to 1.1
          const shakeFactor = 1.1;
          wobbleX += Math.sin(time * 24 + b.gridX * 0.15) * shakeFactor;
          wobbleY += Math.cos(time * 24 + b.gridY * 0.15) * shakeFactor;

          // Erratic digital flash - Reduced flashing frequency and threshold
          const flashFreq = time * 24 + b.phase * 5;
          if (Math.sin(flashFreq) > 0.6) {
            // Flash color closer to white with random transparency spike
            dynamicAlpha = 0.2 + Math.random() * 0.65;
          }
        }

        ctx!.fillStyle = `rgba(${color}, ${dynamicAlpha})`;
        ctx!.fillRect(b.gridX + wobbleX, b.gridY + wobbleY, b.size, b.size);
      });

      animationId = requestAnimationFrame(drawFrame);
    }

    if (reduceMotion) {
      drawStatic();
    } else {
      drawFrame();
    }

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (reduceMotion) drawStatic();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [seed, color, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
