/**
 * @file AboutWorkstation.tsx
 * @description HUD About section displaying engineer profile, technical stack specifications, Kaggle medals, and terminal links
 * @module components/AboutWorkstation
 */

"use client";

import KaggleStats from "@/components/KaggleStats";

export default function AboutWorkstation() {
  return (
    <div className="about-workstation font-mono">
      <div className="about-grid">
        {/* Profile Details & Philosophy */}
        <div className="about-card profile-card">
          <div className="card-header">{"// ENGINEER_IDENTITY"}</div>
          <h2 className="profile-name font-voice">SANIDHYA VIJAY</h2>
          <div className="profile-role">AI ML ENGINEER</div>

          <p className="profile-bio">
            Specializing in physics-informed neural fields (SIREN/PINN), deep aerodynamic surrogate
            design (Fourier Neural Operators), bi-temporal relational engines, and LLM agent
            observability tools. Operating with zero technical debt and production-grade execution.
          </p>

          <div className="profile-specs">
            <div className="spec-row">
              <span className="spec-label">RUNTIME ENVIRONMENT:</span>
              <span className="spec-val">Bun v1.3 / Conda / PyTorch / CUDA</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">DATABASE ARCHITECTURE:</span>
              <span className="spec-val">PostgreSQL C-SPI Extensions / Redis</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">OPERATING LOCATION:</span>
              <span className="spec-val">INDIA</span>
            </div>
          </div>
        </div>

        {/* Kaggle Medals & Competitive Performance */}
        <div className="about-card kaggle-card">
          <div className="card-header">{"// COMPETITIVE_METRICS"}</div>
          <KaggleStats
            profileUrl="https://www.kaggle.com/sanidhyavijay24"
            gold={1}
            silver={3}
            bronze={16}
            publicNotebooks={18}
            tier="Notebooks Expert"
            percentile="Top 3%"
          />
        </div>
      </div>

      {/* Terminal Footer Links */}
      <div className="about-terminal-footer">
        <div className="footer-left">
          <span>CONNECT_PROTOCOL // </span>
          <a
            href="https://github.com/Sanidhyavijay24"
            target="_blank"
            rel="noreferrer"
            className="terminal-link"
          >
            [ GITHUB ↗ ]
          </a>
          <a
            href="https://www.kaggle.com/sanidhyavijay24"
            target="_blank"
            rel="noreferrer"
            className="terminal-link"
          >
            [ KAGGLE ↗ ]
          </a>
          <a href="mailto:sanidhyavijay2004@gmail.com" className="terminal-link">
            [ EMAIL ✉ ]
          </a>
        </div>

        <div className="footer-right">
          <span>S.V // PORTFOLIO_V2</span>
        </div>
      </div>
    </div>
  );
}
