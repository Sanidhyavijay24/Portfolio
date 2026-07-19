/**
 * @file UrbanPinnCard.tsx
 * @description UrbanPINN expanded project card loaded with actual README architecture, SIREN loss equations, and 3D CFD metrics
 * @module components/UrbanPinnCard
 */

"use client";

import React from "react";

export default function UrbanPinnCard() {
  return (
    <div className="urbanpinn-card-container font-mono">
      {/* Tactical Corner Accents */}
      <div className="urbanpinn-corner top-left" />
      <div className="urbanpinn-corner top-right" />
      <div className="urbanpinn-corner bottom-left" />
      <div className="urbanpinn-corner bottom-right" />

      {/* Header Telemetry Bar */}
      <div className="urbanpinn-header-bar font-mono">
        <span>ARCHITECTURAL SPECIFICATION // SIREN_V1</span>
        <span>REPOSITORY: SANIDHYAVIJAY24/URBANPINN</span>
      </div>

      {/* Main 3-Column Grid */}
      <div className="urbanpinn-main-grid">
        {/* Left Column: Core Objective & SIREN Architecture Specs */}
        <div className="urbanpinn-col-left">
          <div className="urbanpinn-title-block">
            <h1 className="font-mono">
              URBAN
              <br />
              PINN.
            </h1>
            <h2 className="font-mono">Physics-Informed Neural CFD Simulator</h2>
          </div>

          <div className="urbanpinn-project-details">
            <div className="urbanpinn-info-item">
              <div className="urbanpinn-info-title">01. SIREN NEURAL ARCHITECTURE</div>
              <p>
                8-Layer Sinusoidal Representation Network (SIREN) mapping continuous 3D spatial
                coordinates (x, y, z → u, v, w, p, T). Uses periodic activations x = sin(ω₀(Wx + b))
                with ω₀ = 30, eliminating gradient saturation across 397,061 total parameters
                (~4.7MB).
              </p>
            </div>

            <div className="urbanpinn-info-item">
              <div className="urbanpinn-info-title">02. NAVIER-STOKES PDE LOSS FORMULATION</div>
              <p>
                Enforces continuous momentum &amp; continuity constraints during backpropagation:
                L_total = L_NS + λ_BC · L_BC + λ_pressure · L_pressure + λ_pen · L_penetration +
                λ_inlet · L_inlet.
              </p>
            </div>

            <div className="urbanpinn-info-item">
              <div className="urbanpinn-info-title">03. PRESSURE DROP & INLET BOUNDARIES</div>
              <p>
                Drives airflow via a 100 Pa pressure differential (p_inlet = 100 Pa at West boundary
                to p_outlet = 0 Pa at East) with u_inlet = 10 m/s eastward wind.
              </p>
            </div>
          </div>
        </div>

        {/* Center Column: Animated Graphic Sphere & Scan Line */}
        <div className="urbanpinn-col-center">
          <div className="urbanpinn-sphere-container">
            <div className="urbanpinn-dotted-sphere" />
            <div className="urbanpinn-scan-line" />
          </div>
          <div className="urbanpinn-sphere-label font-mono">
            CFD NODE NETWORK // INFERENCE ACTIVE
            <br />
            <span style={{ color: "#d35400" }}>397,061 PARAMETERS · 140x VS OPENFOAM</span>
          </div>
        </div>

        {/* Right Column: Applications, Performance & Barcode Footer */}
        <div className="urbanpinn-col-right">
          <div className="urbanpinn-execution-block">
            <div className="urbanpinn-exec-section">
              <strong>URBAN CANYON & POLLUTION TRAP DETECTION</strong>
              <p>
                Identifies street corridors where tall buildings channel and accelerate wind
                streams, while pinpointing low-velocity dead zones behind building clusters that
                accumulate vehicle emissions.
              </p>
            </div>

            <div className="urbanpinn-exec-section">
              <strong>CURRICULUM LEARNING & LOSS RESULTS</strong>
              <p>
                Trained over 2,000 epochs on CUDA (RTX 5050) using 3-phase curriculum weight scaling
                (λ_BC: 0.1 → 0.5 → 1.0). Achieved final total loss of 0.068269 (NS loss: 0.025049,
                boundary loss: 0.0).
              </p>
            </div>
          </div>

          {/* Footer Barcode & Spatial Coordinates */}
          <div className="urbanpinn-footer-assets">
            <div className="urbanpinn-barcode-section">
              <span className="urbanpinn-barcode-text">MIDTOWN MANHATTAN DOMAIN (~1.2 km²)</span>
              <div className="urbanpinn-barcode" />
              <span className="urbanpinn-barcode-text">
                X: [-632, 512]m · Y: [-698, 558]m · Z: [0, 500]m
              </span>
            </div>
            <a
              href="https://github.com/Sanidhyavijay24/UrbanPINN"
              target="_blank"
              rel="noreferrer"
              className="urbanpinn-logo-mark"
              title="View Repository on GitHub"
            >
              ⬡
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
