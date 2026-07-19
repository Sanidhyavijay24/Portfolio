/**
 * @file NeuralFlowBackground.tsx
 * @description Laminar drift vector field particle flow canvas engine matching mockup_laminar_drift.html specifications
 * @module components/NeuralFlowBackground
 */

"use client";

import React, { useEffect, useRef } from "react";

type NeuralFlowBackgroundProps = {
  seed?: number;
  color?: string;
  backgroundColor?: string;
  isScrolling?: boolean;
  activeProjectCode?: string;
};

// PRNG Mulberry32 Generator
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Color interpolation function
function lerpColor(c1: number[], c2: number[], t: number) {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgba(${r},${g},${b},0.55)`;
}

const cool = [62, 111, 224]; // Cool Blue
const warm = [226, 84, 59]; // Warm Amber/Coral

export default function NeuralFlowBackground({
  seed = 1147,
  backgroundColor = "#0E1420",
  isScrolling = false,
  activeProjectCode = "001",
}: NeuralFlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize PRNG & Particles based on seed
    let rand = mulberry32(seed);
    const COUNT = Math.min(320, Math.floor((width * height) / 4500));
    let particles: { x: number; y: number; life: number }[] = [];

    const initParticles = () => {
      rand = mulberry32(seed);
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: rand() * width,
          y: rand() * height,
          life: rand() * 200,
        });
      }
    };

    initParticles();

    // Vector field angle calculation matching laminar drift math
    const angleAt = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.012 + t * 0.25) +
        Math.cos(y * 0.015 - t * 0.18) +
        Math.sin((x + y) * 0.006 + t * 0.1)
      );
    };

    let t = 0;

    // Initial background fill
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const render = () => {
      t += 0.012;

      // Mouse position smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Semi-transparent background trail fill
      ctx.fillStyle = "rgba(14, 20, 32, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Micro-shake on scroll
      const shakeX = isScrolling ? (Math.random() - 0.5) * 3 : 0;
      const shakeY = isScrolling ? (Math.random() - 0.5) * 3 : 0;

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Render Laminar Drift particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let a = angleAt(p.x, p.y, t * 50);

        // Mouse influence curve
        const distToMouse = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
        if (distToMouse < 180) {
          const force = (180 - distToMouse) / 180;
          a += force * 0.8;
        }

        const nx = p.x + Math.cos(a * 2) * 1.6;
        const ny = p.y + Math.sin(a * 2) * 1.6;
        const speed = Math.abs(a) / 3;

        ctx.strokeStyle = lerpColor(cool, warm, Math.min(speed, 1));
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= 1;

        // Reset particle if out of bounds or life expired
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = rand() * width;
          p.y = rand() * height;
          p.life = 100 + rand() * 150;
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [seed, backgroundColor, isScrolling, activeProjectCode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
