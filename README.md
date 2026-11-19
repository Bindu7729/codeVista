# CodeVista ??

> **Visualize. Understand. Master Programming.**
>
> An advanced, next-generation interactive programming visualization platform that transforms source code into real-time visual experiences, helping developers and students master algorithms, data structures, and program execution through step-by-step animations.

---

<p align="center">
  <a href="https://github.com/Bindu7729/codeVista/actions/workflows/ci.yml">
    <img src="https://github.com/Bindu7729/codeVista/actions/workflows/ci.yml/badge.svg" alt="CI Pipeline" />
  </a>
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vitest-2.1-729B1B?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white" alt="Express" />
  <a href="https://github.com/Bindu7729/codeVista">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

## ?? Project Overview

**CodeVista** is a full-stack educational web application designed to visualize how programs execute internally. By parsing and executing code step-by-step in a stateful virtual environment, CodeVista translates linear code statements into rich, animated visual representations of standard data structures (Arrays, Trees, Lists, Stacks, Queues, Graphs).

### Why CodeVista?
Traditional debuggers are complex and lack visual context, while static code visualizers only support rigid, pre-defined templates. CodeVista bridges this gap by parsing the user's custom, written source code and generating statement-by-statement execution traces dynamically on a responsive canvas.

---

## ? Key Features

* ?? **Multi-Language Sandbox:** Interactive code editing supporting **JavaScript**, **TypeScript**, **Python**, and **Java**.
* ?? **Stateful Execution VM:** Custom interpreter that tracks control structures (loops, branching) and evaluates variables step-by-step.
* ?? **Dynamic Data Structure Canvas:** Animated SVG representations with real-time updates for arrays, stacks, queues, graphs, and linked lists.
* ?? **Tree & Graph Visualization:** Traverses node references dynamically, illustrating complex relationships and recursive paths (e.g. BST Insertions).
* ?? **Algorithm Simulations:** Track pointers (e.g., `low`, `high`, `mid` in Binary Search) as they shift position along the index line.
* ?? **Sorting Animations:** Watch elements dynamically swap values step-by-step with visual feedback on indices.
* ?? **Execution Dashboard & Memory Frames:** Inspect local scope stacks, heap references, call stack pointers, and console logs.
* ?? **Keyboard Controls:** Spacebar to toggle autoplay, Arrow keys to step forward/backward, and `R` to reset.
* ??? **Fault Tolerant Architecture:** React Error Boundaries prevent visualizer crashes on edge-case inputs.
* ?? **Premium Modern Design:** A dark-themed, glassmorphic layout enhanced with Framer Motion transitions, mouse-glow effects, and floating digital particles.

---

## ??? Technology Stack

### Frontend
* **React 18** & **TypeScript** (Core framework & typings)
* **Vite** (Next-generation fast asset bundler)
* **Tailwind CSS** (Utility styling & slate design themes)
* **Framer Motion** (Smooth structural visual layout animations)
* **Zustand** (Ultra-lightweight global state management)
* **Vitest & Testing Library** (Automated component and VM unit test suites)

### Backend
* **Node.js** & **Express 5** (Modular server layer orchestrating code execution and snippet catalogs)
* **Jest & Supertest** (End-to-end API integration testing)

---

## ??? Architecture

```
codeVista/
+-- client/
¦   +-- src/
¦   ¦   +-- components/       # Global layout panels & app shells
¦   ¦   +-- features/
¦   ¦   ¦   +-- editor/       # VM interpreter, visual canvas, memory telemetry
¦   ¦   ¦   ¦   +-- components/ # VisualizationCanvas, PlaybackControls, MemoryVisualizer, ErrorBoundary
¦   ¦   ¦   ¦   +-- services/   # AST code interpreter VM & expression evaluator
¦   ¦   ¦   ¦   +-- store/      # Zustand execution state machine
¦   ¦   ¦   +-- landing/      # Interactive landing components & particle widgets
¦   ¦   ¦   +-- library/      # Preloaded algorithm selectors
¦   ¦   +-- App.tsx           # Route router mappings
¦   ¦   +-- main.tsx          # React client entry point
¦   +-- vitest.config.ts      # Vitest configuration with jsdom
¦   +-- package.json
¦
+-- server/
¦   +-- __tests__/            # Supertest API endpoint test suite
¦   +-- app.js                # Express app configuration & middleware
¦   +-- index.js              # Service entrypoint
¦   +-- package.json
¦
+-- .github/workflows/ci.yml  # GitHub Actions CI matrix workflow
+-- package.json              # Monorepo workspace configuration
```

---

## ?? Quick Start

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Clone the Repository
```bash
git clone https://github.com/Bindu7729/codeVista.git
cd codeVista
```

### 3. Install Monorepo Dependencies
```bash
npm install
```

### 4. Run Locally
Start both the client and server concurrently:
```bash
npm run dev
```

* **Frontend Client:** Runs at [http://localhost:5173](http://localhost:5173)
* **Backend Server:** Runs at [http://localhost:5000](http://localhost:5000)

---

## ?? Testing

CodeVista includes a comprehensive test suite across the client and server:

```bash
# Run all tests (client Vitest + server Jest)
npm test

# Run client tests only
npm run test:client

# Run server tests only
npm run test:server

# Build production assets
npm run build:client
```

---

## ?? API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/trace-status` | Heartbeat health check and supported runtime environments |
| `GET` | `/api/snippets` | Catalog of available algorithm templates with complexity metadata |
| `GET` | `/api/snippets/:id` | Detailed algorithm template by ID |
| `POST` | `/api/execute` | Compiles user code into sequential execution trace steps |

---

## ?? License
This project is developed for educational and portfolio purposes.

---
<p align="center">
  <b>Visualize. Understand. Master Programming.</b><br/>
  CodeVista &copy; 2026
</p>
