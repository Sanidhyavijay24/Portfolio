/**
 * @file AsciiBackground.tsx
 * @description Renders a subtle, high-performance ambient falling ASCII data telemetry stream canvas in the background
 * @module components/AsciiBackground
 */

"use client";

import React, { useEffect, useRef } from "react";

type AsciiBackgroundProps = {
  opacity: number;
};

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

    // Technical terminal logs / hex code snippets to rain down
    const dataTokens = [
      "01",
      "0xEF",
      "SYS",
      "CORE",
      "NODE",
      "DAG",
      "FLOW",
      "RULE",
      "BYTE",
      "DATA",
      "FILE",
      "LOCK",
      "SEAL",
      "x86",
      "BUN",
      "C++",
      "SPI",
      "PINN",
      "CFD",
      "SURR",
      "FNO",
      "SQL",
      "TPC",
      "LLM",
      "SSE",
      "P99",
      "PORT",
      "99",
    ];

    let streams: {
      x: number;
      y: number;
      speed: number;
      tokens: string[];
      changeTimer: number;
    }[] = [];

    const columnWidth = 65; // spacing between text columns

    function layout() {
      // Use window bounds as direct fallback to ensure non-zero viewport dimensions
      cw = window.innerWidth;
      ch = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      // Re-initialize vertical text columns
      streams = [];
      const cols = Math.floor(cw / columnWidth) + 1;
      for (let i = 0; i < cols; i++) {
        const tokens: string[] = [];
        for (let j = 0; j < 25; j++) {
          tokens.push(dataTokens[Math.floor(Math.random() * dataTokens.length)]);
        }

        streams.push({
          x: i * columnWidth + 10,
          y: Math.random() * -ch,
          speed: 0.6 + Math.random() * 1.2,
          tokens,
          changeTimer: Math.random() * 100,
        });
      }
    }

    layout();

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      ctx!.clearRect(0, 0, cw, ch);

      ctx!.font = "8px monospace";

      streams.forEach((s) => {
        // Update column position
        s.y += s.speed;
        if (s.y > ch) {
          s.y = -180;
          s.speed = 0.6 + Math.random() * 1.2;
        }

        // Randomly mutate characters inside streams for a glitchy terminal buffer look
        s.changeTimer--;
        if (s.changeTimer <= 0) {
          const idx = Math.floor(Math.random() * s.tokens.length);
          s.tokens[idx] = dataTokens[Math.floor(Math.random() * dataTokens.length)];
          s.changeTimer = 80 + Math.random() * 120;
        }

        // Render stream tokens vertically
        s.tokens.forEach((token, idx) => {
          const charY = s.y + idx * 18;
          // Only draw if within viewport bounds
          if (charY > -20 && charY < ch + 20) {
            // Increased alpha values so characters are clearly visible on all monitors
            let alpha = 0.12;
            if (idx === 0) alpha = 0.04;
            if (idx === s.tokens.length - 1) alpha = 0.04;

            ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx!.fillText(token, s.x, charY);
          }
        });
      });

      animationId = requestAnimationFrame(tick);
    }

    if (!reduceMotion) {
      tick();
    } else {
      ctx!.font = "8px monospace";
      ctx!.fillStyle = "rgba(255, 255, 255, 0.05)";
      streams.forEach((s) => {
        s.tokens.forEach((t, idx) => {
          ctx!.fillText(t, s.x, 100 + idx * 18);
        });
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      layout();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", layout);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", layout);
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
        opacity: opacity,
        pointerEvents: "none",
        zIndex: 1, // Sits under projects cards (zIndex: 10/15) but above background
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
