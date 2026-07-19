/**
 * @file projects.ts
 * @description Central data repository for featured portfolio projects with high-contrast monochrome dither aesthetics
 * @module lib/data/projects
 */

export interface ProjectFolder {
  id: string;
  code: string;
  name: string;
  slug: string;
  tag: string;
  artTitle: string;
  subtitle: string;
  bg: string;
  fg: string;
  accent: string;
  artType: "mesh" | "airfoil" | "matrix" | "starburst" | "circuit";
  desc: string;
  overview: string;
  architecture: string[];
  challenges: string;
  results: string;
  tech: string[];
  href?: string;
}

export type FolderItem = ProjectFolder;

export const projects: ProjectFolder[] = [
  {
    id: "proj-1",
    code: "001",
    name: "SIREN",
    slug: "urbanpinn",
    tag: "pinn / siren",
    artTitle: "GRID\nDAILY_01",
    subtitle: "URBANPINN",
    bg: "#606C5D", // Sage Green
    fg: "#FFFFFF",
    accent: "#111111",
    artType: "mesh",
    desc: "Physics-informed neural network simulating 3D wind flow across 1.2km² of midtown Manhattan, solving Navier–Stokes without a traditional CFD mesh.",
    overview:
      "UrbanPINN is a physics-informed neural network framework designed to model microclimate airflow and wind turbulence across dense urban topographies. By leveraging Sinusoidal Representation Networks (SIRENs) and embedding Navier-Stokes boundary equations directly into the neural loss function, UrbanPINN solves steady 3D incompressible airflow without requiring computationally intensive computational fluid dynamics (CFD) meshing grid generation.",
    architecture: [
      "SIREN continuous spatial neural representation (x, y, z -> u, v, w, p)",
      "Automatic Differentiation for momentum and continuity PDE constraints",
      "Manhattan LiDAR point cloud heightmap surface boundary conditioning",
      "PyTorch execution pipeline for real-time inference rendering",
    ],
    challenges:
      "High-frequency spatial derivative loss instability near sharp building geometry edges. Addressed using adaptive residual loss weighting (NTK gradient alignment) and periodic activation frequency scaling.",
    results:
      "Achieved 140x faster field evaluation compared to OpenFOAM CFD simulations with a mean velocity relative error under 3.8%.",
    tech: ["PyTorch", "NumPy", "CUDA"],
  },
  {
    id: "proj-2",
    code: "002",
    name: "AEROML",
    slug: "aeroml",
    tag: "ml / aerodynamics",
    artTitle: "ARCHIVE\nLOG",
    subtitle: "AEROML",
    bg: "#E7E4D8", // Beige
    fg: "#111111",
    accent: "#333333",
    artType: "airfoil",
    desc: "Airfoil surrogate modeling and inverse design — predicting aerodynamic performance without running a full simulation.",
    overview:
      "AeroML accelerates aerodynamic shape optimization using deep surrogate neural networks. It enables interactive, real-time inverse design where engineers draw desired pressure distributions (Cp curves) and the model synthesizes corresponding 2D supercritical airfoil geometries in real time.",
    architecture: [
      "Variational Autoencoder (VAE) trained on UIUC Airfoil Data Repository",
      "Fourier Neural Operators (FNO) for steady-state pressure field prediction",
      "Constrained Gradient Ascent inverse optimization solver",
    ],
    challenges:
      "Ensuring generated airfoil geometries satisfy physical aerodynamic constraints (non-self-intersecting trailing edges and minimum structural thickness bounds).",
    results:
      "Reduced aerodynamic inverse optimization iteration time from 45 minutes (XFOIL/CFD loop) to under 120 milliseconds.",
    tech: ["Python", "TensorFlow", "OpenFOAM"],
  },
  {
    id: "proj-3",
    code: "003",
    name: "PGTIME",
    slug: "pgtime",
    tag: "postgres extension",
    artTitle: "DRIFT\n// 025",
    subtitle: "PGTIME",
    bg: "#5B6B7C", // Slate Blue
    fg: "#FFFFFF",
    accent: "#E0E0E0",
    artType: "matrix",
    desc: "Automatic temporal table tracking for Postgres, implemented via a C-based trigger and a single attach() call.",
    overview:
      "PGTime is a lightweight C extension for PostgreSQL that automatically converts standard relational tables into fully audited bi-temporal tables. By injecting a high-performance C trigger on INSERT/UPDATE/DELETE, PGTime maintains transparent system time travel queries (`FOR SYSTEM_TIME AS OF`) with zero modification to existing application code.",
    architecture: [
      "PostgreSQL C SPI (Server Programming Interface) extension engine",
      "Zero-copy audit history table partitioning",
      "Automated index creation for `tstzrange` validity windows",
    ],
    challenges:
      "Minimizing lock contention on high-throughput OLTP tables during concurrent transaction commits.",
    results:
      "Benchmarked under 2.1% overhead on TPC-C workload writes compared to standard unversioned PostgreSQL tables.",
    tech: ["Rust", "PostgreSQL", "C"],
  },
  {
    id: "proj-4",
    code: "004",
    name: "TRACEBACK",
    slug: "traceback-ai",
    tag: "dev tooling",
    artTitle: "FALLING\n// 003",
    subtitle: "TRACEBACK-AI",
    bg: "#A8896C", // Tan
    fg: "#111111",
    accent: "#222222",
    artType: "starburst",
    desc: "An execution tracer for LLM agents — strace for agentic systems, with a cascade-weighted blame algorithm.",
    overview:
      "Traceback-AI provides system-level observability for autonomous multi-agent software systems. Similar to Linux `strace`, it intercepts agent tool invocations, prompt context mutations, and subagent forks, applying a dynamic cascade-weighted attribution algorithm to isolate root-cause agent failures in multi-turn executions.",
    architecture: [
      "Async Python proxy intercepter for LLM API calls",
      "DAG-based causality execution graph reconstruction engine",
      "Cascade-weighted credit/blame propagation algorithm",
    ],
    challenges:
      "Parsing non-deterministic tool calling errors across varying LLM response formats and complex multi-agent recursion.",
    results:
      "Reduced mean-time-to-debug (MTTD) for autonomous agent loops by 78% across benchmarked agent workflows.",
    tech: ["TypeScript", "Bun", "GPT-4"],
  },
  {
    id: "proj-5",
    code: "005",
    name: "FLAGR",
    slug: "flagr",
    tag: "feature flags",
    artTitle: "SIGNAL\n// 004",
    subtitle: "FLAGR",
    bg: "#1C1C1C", // Charcoal
    fg: "#FFC94A", // Yellow/Amber text highlights
    accent: "#FFFFFF",
    artType: "circuit",
    desc: "Low-latency distributed feature flagging platform built with Bun and Redis for micro-second decision evaluation.",
    overview:
      "Flagr is a ultra-low-latency feature flag and dynamic configuration management platform designed for distributed systems. Built natively on Bun and Redis, it delivers sub-millisecond rule evaluation with real-time SSE dynamic rule synchronization.",
    architecture: [
      "Bun native HTTP server with JIT rule compilation",
      "Redis pub/sub instant rule propagation",
      "Bitmask-based user cohort targeting engine",
    ],
    challenges:
      "Maintaining zero evaluation latency degradation when serving 100,000+ concurrent flag requests per second.",
    results:
      "Achieved P99 evaluation latency under 0.45ms with instantaneous global rule rollout propagation.",
    tech: ["Go", "Redis", "React"],
  },
];

export function getProjectBySlug(slug: string): ProjectFolder | undefined {
  return projects.find((p) => p.slug === slug || p.name === slug);
}
