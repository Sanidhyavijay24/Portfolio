/**
 * @file projects.ts
 * @description Real project data for featured portfolio projects
 * @module lib/data/projects
 */

export interface ProjectSpine {
  code: string;
  name: string;
  tag: string;
  width: number;
  bg: string;
  fg: string;
  accent: string;
  desc: string;
  highlight?: string;
  details: string[];
  tech: string[];
  href?: string;
}

export const projects: ProjectSpine[] = [
  {
    code: "001",
    name: "urbanpinn",
    tag: "pinn / siren",
    width: 96,
    bg: "#161B22",
    fg: "#58A6FF",
    accent: "#388BFD",
    desc: "A physics-informed neural network (SIREN architecture) simulating 3D wind flow across roughly 1.2km² of midtown Manhattan — solving Navier–Stokes directly without a traditional CFD mesh.",
    details: [
      "SIREN continuous spatial neural field mapping (x,y,z → u,v,w,p)",
      "Physics-informed loss enforces Navier–Stokes momentum & continuity constraints directly during backprop",
      "Manhattan LiDAR point-cloud heightmap conditions complex urban surface boundaries",
      "Evaluates turbulent velocity fields 140x faster than traditional OpenFOAM CFD solvers",
    ],
    tech: ["PyTorch", "NumPy", "CUDA"],
    href: "https://github.com/Sanidhyavijay24/urbanpinn",
  },
  {
    code: "002",
    name: "aeroml",
    tag: "ml / aerodynamics",
    width: 132,
    bg: "#1E1A14",
    fg: "#FFC94A",
    accent: "#E5A93C",
    desc: "A surrogate model for airfoil inverse design: give it a geometry and flow conditions to predict lift-to-drag, lift, and drag coefficients. Give it target performance, and a batched gradient search proposes shapes in seconds.",
    highlight:
      "The drag prediction (CdMin) has a real, documented weak spot at high Mach / low drag — R² collapses to −5.29 on that slice. Tried 5 different fixes; all converged to the same ceiling, revealing an inherent XFOIL data limitation rather than a model bug. Shipped the honest baseline.",
    details: [
      "Forward mode predicts LDMax, ClMax, and CdMin from geometry + Reynolds/Mach (ensemble R² ~0.91 / 0.87 / 0.72)",
      "Reverse mode runs a batched gradient-based search (finite-difference + Adam) over a PCA-compressed geometry space",
      "Reports ensemble disagreement per candidate instead of returning unverified shapes",
      "Full web app with Bun + Hono + Zod backend and a Python subprocess bridge executing neural models",
    ],
    tech: ["TensorFlow", "scikit-learn", "Bun", "Hono", "Zod"],
    href: "https://github.com/Sanidhyavijay24/aeroml",
  },
  {
    code: "003",
    name: "pgtime",
    tag: "postgres extension",
    width: 78,
    bg: "#141B17",
    fg: "#4EFEAA",
    accent: "#38C982",
    desc: "An open-source PostgreSQL extension for automatic temporal table tracking — a single attach() call and a C-based SPI trigger turn any relational table into a fully audited temporal engine.",
    details: [
      "High-performance C SPI trigger handles INSERT/UPDATE/DELETE auditing transparently",
      "Single `SELECT pgtime.attach('my_table')` invocation to enable bi-temporal time travel",
      "Extension design modeled after pgvector's C architecture",
      "SDK wrappers available for Node.js, Python, and Go",
    ],
    tech: ["C", "PostgreSQL", "Rust"],
    href: "https://github.com/Sanidhyavijay24/pgtime",
  },
  {
    code: "004",
    name: "traceback-ai",
    tag: "dev tooling",
    width: 70,
    bg: "#1E1C16",
    fg: "#FF7B72",
    accent: "#D25D54",
    desc: "An execution tracer for autonomous LLM agents — strace for agentic loops — using a cascade-weighted blame attribution algorithm to isolate root-cause agent step failures.",
    details: [
      "DAG-based causality execution graph reconstruction engine for multi-agent loops",
      "Cascade-weighted credit/blame propagation algorithm pinpoints upstream failure origins",
      "Async Python proxy intercepts agent tool calls, prompt context mutations, and subagent forks",
      "78% reduction in mean-time-to-debug (MTTD) across multi-turn agent benchmarks",
    ],
    tech: ["Python", "TypeScript", "GPT-4"],
    href: "https://github.com/Sanidhyavijay24/traceback-ai",
  },
];
