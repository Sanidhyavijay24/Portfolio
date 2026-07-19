/**
 * @file KaggleStats.tsx
 * @description Competitive ML & Kaggle highlights stats card styled in high-contrast dither monochrome layout
 * @module components/KaggleStats
 */

"use client";

type KaggleHighlightsProps = {
  tier?: string;
  percentile?: string;
  gold?: number;
  silver?: number;
  bronze?: number;
  publicNotebooks?: number;
  profileUrl: string;
};

function stat(value?: number) {
  return typeof value === "number" ? value : "—";
}

export default function KaggleHighlights({
  tier = "Notebooks Expert",
  percentile = "Top 3%",
  gold = 1,
  silver = 3,
  bronze = 16,
  publicNotebooks = 18,
  profileUrl,
}: KaggleHighlightsProps) {
  return (
    <div
      className="dither-kaggle-card"
      style={{
        backgroundColor: "#000000",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        padding: "28px",
        fontFamily: "var(--font-sans)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          borderBottom: "1px dashed rgba(255, 255, 255, 0.15)",
          paddingBottom: 18,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "5px 12px",
              border: "1px solid #FFFFFF",
              borderRadius: 9999,
              color: "#FFFFFF",
              backgroundColor: "#000000",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {tier.toLowerCase()}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "5px 12px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderRadius: 9999,
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 600,
            }}
          >
            {percentile.toLowerCase()}
          </span>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-white-dim hover:text-white"
          style={{
            fontSize: 11,
            textDecoration: "underline",
            transition: "color 0.2s ease",
          }}
        >
          view profile &rarr;
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24,
        }}
      >
        {[
          { label: "gold", value: stat(gold) },
          { label: "silver", value: stat(silver) },
          { label: "bronze", value: stat(bronze) },
        ].map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(255, 255, 255, 0.45)",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {m.label} medals
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 32,
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              {m.value}
            </div>
          </div>
        ))}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            public notebooks
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 32,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {stat(publicNotebooks)}
          </div>
        </div>
      </div>
    </div>
  );
}
