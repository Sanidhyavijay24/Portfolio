/**
 * @file HudHeader.tsx
 * @description Sleek top header bar with [S.V] monogram, section navigation, Resume download, and mailto Contact button
 * @module components/HudHeader
 */

"use client";

type HudHeaderProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export default function HudHeader({ activeSection, onNavigate }: HudHeaderProps) {
  return (
    <header className="hud-header font-mono">
      {/* Left Monogram Logo */}
      <div className="hud-logo font-mono">
        <span className="logo-brackets">[</span>
        <span className="logo-text">S.V</span>
        <span className="logo-brackets">]</span>
      </div>

      {/* Center Nav Links */}
      <nav className="hud-center-nav font-mono">
        <button
          onClick={() => onNavigate("hero")}
          className={`hud-nav-link ${activeSection === "hero" ? "active" : ""}`}
        >
          PORTFOLIO
        </button>
        <button
          onClick={() => onNavigate("workstation")}
          className={`hud-nav-link ${activeSection === "workstation" ? "active" : ""}`}
        >
          PROJECTS
        </button>
        <button
          onClick={() => onNavigate("about")}
          className={`hud-nav-link ${activeSection === "about" ? "active" : ""}`}
        >
          ABOUT
        </button>
      </nav>

      {/* Right Action Buttons */}
      <div className="hud-action-buttons font-mono">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="hud-btn"
          title="Download Resume"
        >
          <span>⤓ RESUME</span>
        </a>
        <a href="mailto:sanidhyavijay2004@gmail.com" className="hud-btn" title="Send Email">
          <span>CONTACT</span>
        </a>
      </div>
    </header>
  );
}
