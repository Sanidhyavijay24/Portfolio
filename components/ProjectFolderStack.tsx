/**
 * @file ProjectFolderStack.tsx
 * @description Tall vertical cards styled as premium OpenAI Emergence-inspired ticket stencils, restoring original card colors, inline SVGs, and circular ASCII layouts
 * @module components/ProjectFolderStack
 */

"use client";

import { useState, useEffect } from "react";
import type { ProjectFolder } from "@/lib/data/projects";

type ProjectFolderStackProps = {
  projects: ProjectFolder[];
};

// Intricate circular ASCII art blocks representing each project
const ASCII_ARTWORKS = {
  mesh: `      .---- 0101 ----.
    / 0101010101010101 \\
   / 010    PINN   1010 \\
  | 01     SIREN     101 |
  | 01     1.2KM²    101 |
  | 01    MANHATTAN  101 |
  | 01    WIND CFD   101 |
   \\ 101    NAV-ST    01 /
    \\ 0101010101010101 /
      '---- 0101 ----'`,

  airfoil: `      .---- NACA ----.
    / 0101010101010101 \\
   /  /=====\\ AEROML   \\
  |  /=======\\ geometry |
  |  \\=======/ CFD-SURR |
  |   \\=====/  FNO-OPT  |
  |   LATENT   SPACE    |
   \\ 101010101010101010 /
    \\  UIUC_ARCHIVE    /
      '---- AERO ----'`,

  matrix: `      .---- PGTIME ----.
    / 010101010101010101 \\
   /  SQL_TRIG   C-EXTENSION\\
  |  [TX_1] ------------>|
  |  [TX_2] ------------>|
  |  AUDIT SYSTEM TIME   |
  |  ZERO-COPY PARTITION |
   \\ SYSTEM_TIME_TRAVEL /
    \\ 0101010101010101 /
      '---- SPI_C ----'`,

  starburst: `      .---- CAUSAL ----.
    / 010101010101010101 \\
   /  LLM_AGENT_TRACE     \\
  |   [A1] -> [Tool_Opt]  |
  |    |        |         |
  |   [A2] <- [Causality] |
  |    blame_attribution  |
   \\  CASCADE ENGINE    /
    \\ causation_graph  /
      '---- TRACE ----'`,

  circuit: `      .---- BITMASK ----.
    / 010101010101010101 \\
   /  SSE_RULES_SYNC      \\
  |   [USER] & [0xFF]     |
  |   REDIS_PUB_SUB       |
  |   bitmask_cohorts     |
  |   P99_LATENCY <0.4ms  |
   \\  compiles_rules_   /
    \\ bun_redis_flow   /
      '---- FLAGR ----'`,
};

// High-fidelity vector drawings for collapsed spine art (matching reference colors/graphics)
const SPINE_VECTOR_ART = {
  mesh: (
    <svg viewBox="0 0 100 100" className="spine-svg-art">
      <path d="M20,50 Q40,20 80,30 T60,80 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="40" r="3.5" fill="currentColor" />
      <circle cx="50" cy="65" r="3.5" fill="currentColor" />
      <circle cx="70" cy="45" r="3.5" fill="currentColor" />
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3,3"
      />
    </svg>
  ),
  airfoil: (
    <svg viewBox="0 0 100 100" className="spine-svg-art">
      <path
        d="M15,50 C30,30 70,30 85,50 C70,60 30,60 15,50 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="50"
        x2="90"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3,3"
      />
      <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  matrix: (
    <svg viewBox="0 0 100 100" className="spine-svg-art">
      <rect x="15" y="22" width="16" height="16" fill="currentColor" />
      <rect x="37" y="22" width="16" height="16" fill="currentColor" />
      <rect x="59" y="22" width="16" height="16" fill="currentColor" />
      <rect x="81" y="22" width="16" height="16" fill="currentColor" />
      <rect x="15" y="46" width="16" height="16" fill="currentColor" opacity="0.45" />
      <rect x="37" y="46" width="16" height="16" fill="currentColor" opacity="0.45" />
      <rect x="59" y="46" width="16" height="16" fill="currentColor" opacity="0.45" />
      <rect x="81" y="46" width="16" height="16" fill="currentColor" opacity="0.45" />
      <rect
        x="15"
        y="70"
        width="70"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3,3"
      />
    </svg>
  ),
  starburst: (
    <svg viewBox="0 0 100 100" className="spine-svg-art">
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3,3"
      />
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.8" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="50,40 55,50 50,60 45,50" fill="currentColor" />
    </svg>
  ),
  circuit: (
    <svg viewBox="0 0 100 100" className="spine-svg-art">
      <rect
        x="25"
        y="20"
        width="50"
        height="60"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="42" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="42" r="5" fill="currentColor" />
      <line x1="50" y1="56" x2="50" y2="72" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="34" cy="42" r="2.5" fill="currentColor" />
      <circle cx="66" cy="42" r="2.5" fill="currentColor" />
    </svg>
  ),
};

export default function ProjectFolderStack({ projects }: ProjectFolderStackProps) {
  const [active, setActive] = useState<number | null>(null);

  // Lock scrolling when a ticket folder is expanded to allow reading case studies
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="folder-deck-container">
      <div className={`folder-deck ${active !== null ? "has-active" : ""}`}>
        {projects.map((p, i) => {
          const isActive = active === i;
          const asciiArt = ASCII_ARTWORKS[p.artType] || ASCII_ARTWORKS.mesh;
          const vectorArt = SPINE_VECTOR_ART[p.artType] || SPINE_VECTOR_ART.mesh;

          return (
            <div
              key={p.id}
              className={`folder-card dither-ticket-card ${isActive ? "is-active" : "is-collapsed"}`}
              style={{
                backgroundColor: p.bg, // Restored original background color
                color: p.fg, // Restored original text color
                borderColor: isActive ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.15)",
                zIndex: isActive ? 10 : i + 1,
              }}
            >
              {/* Ticket Top Tab (Staggered Stencil tab) */}
              <div
                className="folder-tab-header ticket-tab-header"
                style={{
                  backgroundColor: p.bg,
                  borderColor: isActive ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.15)",
                }}
                onClick={() => setActive(isActive ? null : i)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`Toggle ${p.name} ticket`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(isActive ? null : i);
                  }
                }}
              >
                <span className="tab-code font-mono" style={{ opacity: 0.6 }}>
                  SYS_RECORD_0{i + 1}
                </span>
                <span className="tab-divider" style={{ opacity: 0.4 }}>
                  {"//"}
                </span>
                <span className="tab-title font-mono">{p.name}</span>
              </div>

              {/* COLLAPSED STATE: Spines with vertical slivers of barcode & restored vector art */}
              {!isActive && (
                <div
                  className="folder-spine-view ticket-spine-view"
                  onClick={() => setActive(i)}
                  title={`Open ${p.name} Case Study`}
                >
                  {/* Spine Header */}
                  <div
                    className="spine-meta font-mono"
                    style={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
                  >
                    <span>
                      SYS_RECORD_0{i + 1} {"//"}
                    </span>
                    <span>{p.tag}</span>
                  </div>

                  {/* High-fidelity Vector Art Canvas */}
                  <div className="spine-art-canvas">{vectorArt}</div>

                  {/* Spine Large Title Text */}
                  <div className="spine-title-container">
                    <h3 className="spine-large-title font-mono">{p.name}</h3>
                    <p className="spine-project-subtitle font-mono" style={{ opacity: 0.65 }}>
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Barcode representation at the spine bottom */}
                  <div className="spine-barcode font-mono" style={{ opacity: 0.65 }}>
                    {"||| | || |"}
                  </div>

                  <div
                    className="spine-action font-mono"
                    style={{ borderColor: "rgba(0, 0, 0, 0.15)", opacity: 0.7 }}
                  >
                    [DETAILS] &rarr;
                  </div>
                </div>
              )}

              {/* EXPANDED STATE: Full technical case study styled like the Emergence OpenAI ticket */}
              {isActive && (
                <div
                  className="folder-expanded-content ticket-expanded-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Top Bar Controls */}
                  <div
                    className="expanded-top-bar font-mono"
                    style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                  >
                    <span className="expanded-file-badge" style={{ opacity: 0.65 }}>
                      ENG_RECORD_v1.0 // BY SANIDHYA.AI
                    </span>
                    <button
                      className="expanded-close-btn font-mono"
                      onClick={() => setActive(null)}
                      title="Close case study"
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.3)",
                        color: "inherit",
                      }}
                    >
                      [✕ CLOSE RECORD]
                    </button>
                  </div>

                  {/* Main Ticket Layout Grid */}
                  <div className="ticket-body-layout">
                    {/* Left: Main details, description, overview */}
                    <div className="ticket-text-side">
                      <div className="ticket-title-block font-mono">
                        <div className="ticket-eng-team" style={{ opacity: 0.65 }}>
                          ENG. TEAM (///////)
                        </div>
                        <h3 className="ticket-name">{p.name}</h3>
                        <div className="ticket-est" style={{ opacity: 0.55 }}>
                          EST. 2026
                        </div>
                      </div>

                      {/* Date / Location Info (Emergence style) */}
                      <div
                        className="ticket-meta-block font-mono"
                        style={{ borderColor: "rgba(0, 0, 0, 0.15)" }}
                      >
                        <div className="meta-row">
                          <span className="meta-val">19 JULY, 2026</span>
                          <span className="meta-val">12:00 PM</span>
                        </div>
                        <div className="meta-row">
                          <span className="meta-val">
                            PORTFOLIO_V2 // ACCORDION ARENA, DEEP CORE
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="ticket-desc font-mono">
                        <p className="desc-header">{"// RECORD SUMMARY:"}</p>
                        <p className="desc-text" style={{ opacity: 0.85 }}>
                          {p.overview}
                        </p>
                      </div>

                      {/* Key metrics and tech tags */}
                      <div className="ticket-specs-block font-mono">
                        <div
                          className="doc-metric-card"
                          style={{
                            borderColor: "rgba(0, 0, 0, 0.15)",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <span className="metric-tag">PERFORMANCE SCORE // </span> {p.results}
                        </div>
                        <div className="tech-tags-row">
                          {p.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="tech-tag-pill"
                              style={{ borderColor: "rgba(0, 0, 0, 0.3)", color: "inherit" }}
                            >
                              {t.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Technical ASCII art circle and barcode details */}
                    <div className="ticket-art-side" style={{ borderColor: "rgba(0, 0, 0, 0.12)" }}>
                      <div
                        className="ticket-ascii-container"
                        style={{
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          backgroundColor: "rgba(0,0,0,0.08)",
                        }}
                      >
                        {/* Thin geometry wireframe lines behind the circle */}
                        <div
                          className="wireframe-line angle-1"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                        />
                        <div
                          className="wireframe-line angle-2"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
                        />

                        <div
                          className="ascii-circle-frame"
                          style={{ borderColor: "rgba(0, 0, 0, 0.18)", backgroundColor: "#000000" }}
                        >
                          <pre className="ascii-art font-mono" style={{ color: "#FFFFFF" }}>
                            {asciiArt}
                          </pre>
                        </div>
                      </div>

                      {/* Challenge / Details block */}
                      <div className="ticket-challenge-box font-mono" style={{ opacity: 0.7 }}>
                        <span className="challenge-lbl">CHALLENGE: </span>
                        <p className="challenge-txt">{p.challenges}</p>
                      </div>

                      {/* Barcode Footer & Seals */}
                      <div
                        className="ticket-footer font-mono"
                        style={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
                      >
                        <div className="barcode-wrapper" style={{ opacity: 0.8 }}>
                          <div className="barcode-bars">
                            {"||||| ||| | |||| | || ||||| ||| | |||| | || ||||| ||| | ||||"}
                          </div>
                          <div className="barcode-numbers" style={{ opacity: 0.55 }}>
                            RECORD_SYS_LOCK_{p.code}
                          </div>
                        </div>
                        <div className="ticket-seals" style={{ opacity: 0.8 }}>
                          <span className="seal-star">✻</span>
                          <span className="seal-tag">BY SANIDHYA.AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
