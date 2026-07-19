/**
 * @file PixelFolderGraphics.tsx
 * @description Custom retro pixel-art SVG graphics for project folders (UrbanPINN, AeroML, PGTime, Traceback AI)
 * @module components/PixelFolderGraphics
 */

"use client";

import React from "react";

export function UrbanPinnPixelArt() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      fill="none"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Grid Ground */}
      <path d="M2 18L12 22L22 18L12 14L2 18Z" fill="#162A45" stroke="#58A6FF" strokeWidth="1" />
      {/* Manhattan Skyscrapers */}
      <rect x="7" y="7" width="3" height="10" fill="#58A6FF" stroke="#000" strokeWidth="1" />
      <rect x="11" y="4" width="4" height="13" fill="#388BFD" stroke="#000" strokeWidth="1" />
      <rect x="16" y="9" width="3" height="8" fill="#1F426B" stroke="#000" strokeWidth="1" />
      {/* Wind Flow Stream Arrow */}
      <path d="M3 10C8 7 14 13 21 8" stroke="#F2A93B" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

export function AeroMlPixelArt() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      fill="none"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Airfoil Wing Shape */}
      <path
        d="M3 13C3 13 8 7 16 8C20 8.5 22 12 22 12C22 12 14 16 7 15C4 14.5 3 13 3 13Z"
        fill="#F2A93B"
        stroke="#000"
        strokeWidth="1.5"
      />
      {/* Aerodynamic Streamlines */}
      <path d="M1 8C6 5 14 5 21 6" stroke="#58A6FF" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M1 17C6 18 14 17 21 15" stroke="#FF7B72" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function PgTimePixelArt() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      fill="none"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Database Cylinder */}
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#38C982" stroke="#000" strokeWidth="1.5" />
      <path
        d="M4 6V12C4 13.6 7.6 15 12 15C16.4 15 20 13.6 20 12V6"
        fill="#1C382A"
        stroke="#000"
        strokeWidth="1.5"
      />
      <path
        d="M4 12V18C4 19.6 7.6 21 12 21C16.4 21 20 19.6 20 18V12"
        fill="#14281E"
        stroke="#000"
        strokeWidth="1.5"
      />
      {/* Temporal Clock Hands */}
      <circle cx="12" cy="12" r="3" fill="#F2A93B" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

export function TracebackPixelArt() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      fill="none"
      style={{ imageRendering: "pixelated" }}
    >
      {/* DAG Nodes */}
      <circle cx="12" cy="5" r="3" fill="#FF7B72" stroke="#000" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="3" fill="#FF7B72" stroke="#000" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" fill="#F2A93B" stroke="#000" strokeWidth="1.5" />
      {/* Directed Graph Edges */}
      <line x1="10" y1="7.5" x2="7.5" y2="13.5" stroke="#EDEAE0" strokeWidth="1.5" />
      <line x1="14" y1="7.5" x2="16.5" y2="13.5" stroke="#EDEAE0" strokeWidth="1.5" />
    </svg>
  );
}
