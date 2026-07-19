/**
 * @file ProjectWorkstation.tsx
 * @description Retro pixel-art project folders workstation featuring smooth scroll-driven Archive Box intro,
 * horizontal-to-vertical layout transitions, and high-contrast, premium 3-column dashboard detail cards for all projects.
 * @module components/ProjectWorkstation
 */

"use client";

import { useState } from "react";
import type { ProjectSpine } from "@/lib/data/projects";
import UrbanPinnCard from "@/components/UrbanPinnCard";

type ProjectWorkstationProps = {
  projects: ProjectSpine[];
  scrollY?: number;
  activeIdx?: number;
  onSelectProject: (idx: number) => void;
};

export default function ProjectWorkstation({
  projects,
  scrollY = 600,
  onSelectProject,
}: ProjectWorkstationProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [manualFolderOpen, setManualFolderOpen] = useState(false);

  // Transition parameters (scrollY ranges stretched to provide plenty of scroll space)
  // Phase 1: scrollY 180 -> 300: Box fades in
  // Phase 2: scrollY 300 -> 550: Box remains fully visible in dead-center
  // Phase 3: scrollY 550 -> 800: Box fades out & drops while 4 folders emerge, fly out, and settle
  // Phase 4: scrollY >= 800: Folders fully settled

  let boxOpacity = 0;
  let boxScale = 1;
  let foldersOpacity = 0;
  let progress = 0; // 0 = folders hidden inside box, 1 = folders fully settled

  if (manualFolderOpen) {
    boxOpacity = 0;
    boxScale = 0.7;
    foldersOpacity = 1;
    progress = 1;
  } else {
    // 1. Box Opacity
    if (scrollY >= 180 && scrollY < 300) {
      boxOpacity = Math.min(1, (scrollY - 180) / 120);
    } else if (scrollY >= 300 && scrollY < 550) {
      boxOpacity = 1;
    } else if (scrollY >= 550 && scrollY < 800) {
      boxOpacity = Math.max(0, 1 - (scrollY - 550) / 250);
      boxScale = 1 - ((scrollY - 550) / 250) * 0.3;
    }

    // 2. Folders Opacity and Emergence Progress
    if (scrollY >= 550 && scrollY < 800) {
      progress = Math.min(1, Math.max(0, (scrollY - 550) / 250));
      foldersOpacity = progress;
    } else if (scrollY >= 800) {
      progress = 1;
      foldersOpacity = 1;
    }
  }

  const showFolders = manualFolderOpen || scrollY >= 550;

  const handleSelectFolder = (idx: number) => {
    setSelectedIdx(idx);
    onSelectProject(idx);
  };

  const handleArchiveBoxClick = () => {
    setManualFolderOpen(true);
  };

  return (
    <div className="workstation-container font-mono">
      {/* PHASE A & B: Morphing Box to 4 Flying Folders */}
      {selectedIdx === null ? (
        <div className="morph-workstation-stage">
          {/* Fading, Scaling & Dropping Project Files Box */}
          {boxOpacity > 0.01 && (
            <div
              className="archive-box-stage"
              onClick={handleArchiveBoxClick}
              style={{
                opacity: boxOpacity,
                transform: `translate(-50%, -50%) scale(${boxScale}) translateY(${progress * 60}px)`,
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out",
                pointerEvents: boxOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className="archive-box-graphic">
                <div className="archive-folders-peek">
                  <div className="peek-tab" style={{ background: "#58A6FF" }} />
                  <div className="peek-tab" style={{ background: "#F2A93B" }} />
                  <div className="peek-tab" style={{ background: "#38C982" }} />
                  <div className="peek-tab" style={{ background: "#FF7B72" }} />
                </div>
                <div className="archive-box-handle" />
              </div>
              <div className="archive-box-label font-voice">Project files</div>
              <div className="archive-hint font-mono">[ SCROLL TO UNFOLD PROJECT FILES ]</div>
            </div>
          )}

          {/* 4 Custom Folder Images emerging and flying out to settle */}
          {showFolders && foldersOpacity > 0.01 && (
            <div
              className="pixel-folders-horizontal-grid"
              style={{
                opacity: foldersOpacity,
                pointerEvents: foldersOpacity > 0.6 ? "auto" : "none",
                transition: "opacity 0.2s ease",
              }}
            >
              {projects.map((p, idx) => {
                // Trajectory: scale up from 0.5 to 1.0, spread horizontally out from center box position, and drop slightly
                const flyOutX = (idx - 1.5) * (1 - progress) * -180;
                const flyOutY = (1 - progress) * 80;
                const flyOutScale = 0.5 + 0.5 * progress;

                return (
                  <div
                    key={p.code}
                    className="pixel-folder-icon-wrapper"
                    onClick={() => handleSelectFolder(idx)}
                    style={{
                      transform: `translate(${flyOutX}px, ${flyOutY}px) scale(${flyOutScale})`,
                      transition:
                        "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out",
                    }}
                  >
                    <div className="pixel-folder-img-container">
                      <img
                        src={`/folder_${p.name.toLowerCase().replace("-ai", "").replace(" ", "")}.png`}
                        alt={p.name}
                        className="pixel-folder-img"
                      />
                    </div>
                    <div className="pixel-folder-label-block">
                      <span className="folder-label-title font-voice">{p.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* PHASE C: Split Stage (Left Paper Dossier + Right Vertical Folder Rack) */
        <div className="workstation-split-stage">
          {/* Left Stage: Custom Bespoke Dashboard Dashboard Cards */}
          <div className="split-left-paper-stage">
            {selectedIdx === 0 && <UrbanPinnCard />}

            {/* Project 002: AeroML Dashboard Redesign */}
            {selectedIdx === 1 && (
              <div
                className="urbanpinn-card-container font-mono"
                style={{ borderColor: "#1a1a1c" }}
              >
                <div className="urbanpinn-corner top-left" style={{ borderColor: "#F2A93B" }} />
                <div className="urbanpinn-corner top-right" style={{ borderColor: "#F2A93B" }} />
                <div className="urbanpinn-corner bottom-left" style={{ borderColor: "#F2A93B" }} />
                <div className="urbanpinn-corner bottom-right" style={{ borderColor: "#F2A93B" }} />

                <div className="urbanpinn-header-bar font-mono">
                  <span>AERODYNAMIC MODEL SPECIFICATION // SURROGATE_V2</span>
                  <span>REPOSITORY: SANIDHYAVIJAY24/AEROML</span>
                </div>

                <div className="urbanpinn-main-grid">
                  <div className="urbanpinn-col-left">
                    <div className="urbanpinn-title-block">
                      <h1
                        className="font-mono"
                        style={{ textShadow: "0 0 20px rgba(242, 169, 59, 0.15)" }}
                      >
                        AERO
                        <br />
                        ML.
                      </h1>
                      <h2
                        className="font-mono"
                        style={{ color: "#F2A93B", textShadow: "0 0 10px rgba(242, 169, 59, 0.3)" }}
                      >
                        Airfoil Design Surrogate Model
                      </h2>
                    </div>

                    <div className="urbanpinn-project-details">
                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#F2A93B" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#F2A93B" }}>
                          01. SURROGATE ENSEMBLE
                        </div>
                        <p>
                          Forward mode neural networks map NACA airfoil geometries to aerodynamic
                          coefficients (LDMax, ClMax, CdMin) over Reynolds/Mach conditions. Achieves
                          R² bounds of ~0.91 / 0.87 / 0.72.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#F2A93B" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#F2A93B" }}>
                          02. REVERSE MODE SEARCH
                        </div>
                        <p>
                          Runs finite-difference Adam gradient updates directly back through the
                          model over a PCA-compressed geometry space to optimize shapes in seconds.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#F2A93B" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#F2A93B" }}>
                          03. COMPUTE RUNTIME BRIDGE
                        </div>
                        <p>
                          Runs high-performance Bun + Hono + Zod API servers, communicating over a
                          low-latency bridge with model endpoints executing in python sub-processes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="urbanpinn-col-center">
                    <div className="urbanpinn-sphere-container">
                      <div className="aeroml-wing-visualization" />
                      <div
                        className="urbanpinn-scan-line"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(242, 169, 59, 0.5), transparent)",
                        }}
                      />
                    </div>
                    <div className="urbanpinn-sphere-label font-mono">
                      WIND TUNNEL INFERENCE // BOUNDARY STABLE
                      <br />
                      <span style={{ color: "#F2A93B" }}>
                        PCA DIMENSIONS: 12 &middot; LATENT SCALE
                      </span>
                    </div>
                  </div>

                  <div className="urbanpinn-col-right">
                    <div className="urbanpinn-execution-block">
                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#F2A93B" }}>VERIFIABLE WEAK POINT</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          CdMin prediction contains a verified weak spot at high Mach / low drag
                          where R² drops to -5.29. All structural fixes converged to the same
                          performance ceiling, confirming a dataset limit in XFOIL.
                        </p>
                      </div>

                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#F2A93B" }}>TRAINING OPTIMIZERS</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          Trained with TensorFlow + Adam using automated lr schedulers over raw
                          aerodynamic coordinate slices. Evaluated against OpenFOAM 2D RANS flow
                          solvers for baseline calibration.
                        </p>
                      </div>
                    </div>

                    <div className="urbanpinn-footer-assets">
                      <div className="urbanpinn-barcode-section">
                        <span className="urbanpinn-barcode-text">GEOMETRY: NACA 4-DIGIT DECK</span>
                        <div className="urbanpinn-barcode" />
                        <span className="urbanpinn-barcode-text">
                          LATENT BOUNDS &middot; RND MODEL ACTIVE
                        </span>
                      </div>
                      <a
                        href="https://github.com/Sanidhyavijay24/aeroml"
                        target="_blank"
                        rel="noreferrer"
                        className="urbanpinn-logo-mark"
                        title="View Repository on GitHub"
                        style={{ color: "#F2A93B", borderColor: "#F2A93B" }}
                      >
                        ⬡
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project 003: PGTime Dashboard Redesign */}
            {selectedIdx === 2 && (
              <div
                className="urbanpinn-card-container font-mono"
                style={{ borderColor: "#1a1a1c" }}
              >
                <div className="urbanpinn-corner top-left" style={{ borderColor: "#38C982" }} />
                <div className="urbanpinn-corner top-right" style={{ borderColor: "#38C982" }} />
                <div className="urbanpinn-corner bottom-left" style={{ borderColor: "#38C982" }} />
                <div className="urbanpinn-corner bottom-right" style={{ borderColor: "#38C982" }} />

                <div className="urbanpinn-header-bar font-mono">
                  <span>DATABASE ENGINE EXTENSION // PGTIME_C_SPI</span>
                  <span>REPOSITORY: SANIDHYAVIJAY24/PGTIME</span>
                </div>

                <div className="urbanpinn-main-grid">
                  <div className="urbanpinn-col-left">
                    <div className="urbanpinn-title-block">
                      <h1
                        className="font-mono"
                        style={{ textShadow: "0 0 20px rgba(56, 201, 130, 0.15)" }}
                      >
                        PG
                        <br />
                        TIME.
                      </h1>
                      <h2
                        className="font-mono"
                        style={{ color: "#38C982", textShadow: "0 0 10px rgba(56, 201, 130, 0.3)" }}
                      >
                        Bi-Temporal Postgres C Extension
                      </h2>
                    </div>

                    <div className="urbanpinn-project-details">
                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#38C982" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#38C982" }}>
                          01. NATIVE C-SPI PIPELINE
                        </div>
                        <p>
                          Written in native C using PostgreSQL Server Internal SPI triggers.
                          Integrates directly into database core for hardware-efficient temporal
                          record versioning.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#38C982" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#38C982" }}>
                          02. SINGLE FUNCTION ATTACH
                        </div>
                        <p>
                          Attach temporal versioning onto any table via select
                          pgtime.attach(&apos;my_table&apos;). Automatically spawns shadow audit
                          ledgers transparently.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#38C982" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#38C982" }}>
                          03. TRANSACTION ISOLATION
                        </div>
                        <p>
                          Handles concurrent writes with serializable transaction isolation,
                          ensuring precise tracking of when records are valid vs when they are
                          committed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="urbanpinn-col-center">
                    <div className="urbanpinn-sphere-container">
                      <div className="pgtime-db-pulse" />
                      <div
                        className="urbanpinn-scan-line"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(56, 201, 130, 0.5), transparent)",
                        }}
                      />
                    </div>
                    <div className="urbanpinn-sphere-label font-mono">
                      TEMPORAL LEDGER ACTIVE // SYNC MODE
                      <br />
                      <span style={{ color: "#38C982" }}>
                        OVERHEAD: &lt; 18 MICROSECONDS PER WRITE
                      </span>
                    </div>
                  </div>

                  <div className="urbanpinn-col-right">
                    <div className="urbanpinn-execution-block">
                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#38C982" }}>PERFORMANCE AND SPEED</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          Runs with near-zero runtime latency overhead compared to traditional
                          SQL-level tracking triggers. Engineered using pgvector trigger design
                          guidelines.
                        </p>
                      </div>

                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#38C982" }}>AUDIT COMPLIANCE</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          Provides perfect, tamper-proof bi-temporal history matching strict banking
                          and financial sector requirements (ASOF queries ready out-of-the-box).
                        </p>
                      </div>
                    </div>

                    <div className="urbanpinn-footer-assets">
                      <div className="urbanpinn-barcode-section">
                        <span className="urbanpinn-barcode-text">PGTIME EXTENSION COMPILER</span>
                        <div className="urbanpinn-barcode" />
                        <span className="urbanpinn-barcode-text">
                          C MODULES COMPILED FOR POSTGRES 15+
                        </span>
                      </div>
                      <a
                        href="https://github.com/Sanidhyavijay24/pgtime"
                        target="_blank"
                        rel="noreferrer"
                        className="urbanpinn-logo-mark"
                        title="View Repository on GitHub"
                        style={{ color: "#38C982", borderColor: "#38C982" }}
                      >
                        ⬡
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project 004: Traceback AI Dashboard Redesign */}
            {selectedIdx === 3 && (
              <div
                className="urbanpinn-card-container font-mono"
                style={{ borderColor: "#1a1a1c" }}
              >
                <div className="urbanpinn-corner top-left" style={{ borderColor: "#FF7B72" }} />
                <div className="urbanpinn-corner top-right" style={{ borderColor: "#FF7B72" }} />
                <div className="urbanpinn-corner bottom-left" style={{ borderColor: "#FF7B72" }} />
                <div className="urbanpinn-corner bottom-right" style={{ borderColor: "#FF7B72" }} />

                <div className="urbanpinn-header-bar font-mono">
                  <span>AGENT TRACE ENGINE // DAG_BLAME_V1</span>
                  <span>REPOSITORY: SANIDHYAVIJAY24/TRACEBACK-AI</span>
                </div>

                <div className="urbanpinn-main-grid">
                  <div className="urbanpinn-col-left">
                    <div className="urbanpinn-title-block">
                      <h1
                        className="font-mono"
                        style={{ textShadow: "0 0 20px rgba(255, 123, 114, 0.15)" }}
                      >
                        TRACE
                        <br />
                        BACK.
                      </h1>
                      <h2
                        className="font-mono"
                        style={{
                          color: "#FF7B72",
                          textShadow: "0 0 10px rgba(255, 123, 114, 0.3)",
                        }}
                      >
                        LLM Agent Execution Loop Tracer
                      </h2>
                    </div>

                    <div className="urbanpinn-project-details">
                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#FF7B72" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#FF7B72" }}>
                          01. DAG CAUSALITY RECONSTRUCTION
                        </div>
                        <p>
                          Traces agent task flows and compiles execution loops into interactive,
                          time-resolved Directed Acyclic Graphs (DAG) showing causality
                          relationships.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#FF7B72" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#FF7B72" }}>
                          02. CASCADE BLAME ATTRIBUTION
                        </div>
                        <p>
                          Applies cascade-weighted blame propagation algorithms across nodes to
                          isolate root-cause bugs in multi-turn autonomous loops.
                        </p>
                      </div>

                      <div className="urbanpinn-info-item" style={{ borderLeftColor: "#FF7B72" }}>
                        <div className="urbanpinn-info-title" style={{ color: "#FF7B72" }}>
                          03. LOW-LATENCY PROXY SYSTEM
                        </div>
                        <p>
                          Monitors and intercepts model API calls via a non-intrusive asynchronous
                          hook framework with less than 4ms additional overhead.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="urbanpinn-col-center">
                    <div className="urbanpinn-sphere-container">
                      <div className="traceback-dag-nodes" />
                      <div
                        className="urbanpinn-scan-line"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(255, 123, 114, 0.5), transparent)",
                        }}
                      />
                    </div>
                    <div className="urbanpinn-sphere-label font-mono">
                      TRACE SENSOR ACTIVE // CAUSALITY CALC
                      <br />
                      <span style={{ color: "#FF7B72" }}>DEBUG EFFICIENCY: 78% MTTD REDUCTION</span>
                    </div>
                  </div>

                  <div className="urbanpinn-col-right">
                    <div className="urbanpinn-execution-block">
                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#FF7B72" }}>VISUAL PATH DECI PING</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          Helps identify prompt drift, dead loops, and hallucination propagation
                          cascades across multi-agent systems by mapping call paths.
                        </p>
                      </div>

                      <div className="urbanpinn-exec-section">
                        <strong style={{ color: "#FF7B72" }}>SYSTEM COMPATIBILITY</strong>
                        <p style={{ textTransform: "none", color: "#a0aab8" }}>
                          Integrates directly into LangChain, AutoGen, and native OpenAI/Claude
                          loops. Served with full JSON structured traceback telemetry logs.
                        </p>
                      </div>
                    </div>

                    <div className="urbanpinn-footer-assets">
                      <div className="urbanpinn-barcode-section">
                        <span className="urbanpinn-barcode-text">TRACEBACK NODE INTERCEPTOR</span>
                        <div className="urbanpinn-barcode" />
                        <span className="urbanpinn-barcode-text">
                          ASYNC PYTHON CORE ENGINE ACTIVE
                        </span>
                      </div>
                      <a
                        href="https://github.com/Sanidhyavijay24/traceback-ai"
                        target="_blank"
                        rel="noreferrer"
                        className="urbanpinn-logo-mark"
                        title="View Repository on GitHub"
                        style={{ color: "#FF7B72", borderColor: "#FF7B72" }}
                      >
                        ⬡
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Stage: Vertical Folder Rack */}
          <div className="split-right-vertical-rack">
            <button className="reset-folders-btn font-mono" onClick={() => setSelectedIdx(null)}>
              ⇱ SHOW ALL FOLDERS
            </button>

            {projects.map((p, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={p.code}
                  className={`vertical-rack-folder-item ${isSelected ? "active" : ""}`}
                  onClick={() => handleSelectFolder(idx)}
                  style={{
                    borderColor: isSelected ? p.fg : "rgba(159, 176, 204, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "8px 12px",
                  }}
                >
                  <img
                    src={`/folder_${p.name.toLowerCase().replace("-ai", "").replace(" ", "")}.png`}
                    alt={p.name}
                    style={{
                      width: "50px",
                      height: "42px",
                      objectFit: "contain",
                      imageRendering: "pixelated",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div
                      className="font-mono"
                      style={{
                        color: p.fg,
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                      }}
                    >
                      CODE_{p.code}
                    </div>
                    <div
                      className="vertical-folder-title font-voice"
                      style={{
                        color: isSelected ? p.fg : "#EDEAE0",
                        fontSize: "16px",
                        marginTop: "2px",
                      }}
                    >
                      {p.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
