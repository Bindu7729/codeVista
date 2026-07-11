# CodeVista 🚀💻
> **Visualize. Understand. Master Programming.**
>
> An advanced, next-generation interactive programming visualization platform that transforms source code into real-time visual experiences, helping developers and students master algorithms, data structures, and program execution through step-by-step animations.

---

<p align="center">
  <a href="https://client-iota-olive-48.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/Bindu7729/codeVista">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

## 📋 Project Overview

**CodeVista** is a full-stack educational web application designed to visualize how programs execute internally. By parsing and executing code step-by-step in a stateful virtual environment, CodeVista translates linear code statements into rich, animated visual representations of standard data structures (Arrays, Trees, Lists, Stacks, Queues, Graphs).

### Why CodeVista?
Traditional debuggers are complex and lack visual context, while static code visualizers only support rigid, pre-defined templates. CodeVista bridges this gap by parsing the user's custom, written source code and generating statement-by-statement execution traces dynamically on a responsive canvas.

---

## ✨ Key Features

* 💻 **Multi-Language Sandbox:** Rich code editing powered by Monaco Editor supporting **JavaScript**, **TypeScript**, **Python**, and **Java**.
* 🧠 **Stateful Execution VM:** Custom interpreter that tracks control structures (loops, branching) and evaluates variables step-by-step.
* 📊 **Dynamic Data Structure Canvas:** Animated SVG representations with real-time updates for arrays, stacks, queues, graphs, and linked lists.
* 🌳 **Tree & Graph Visualization:** Traverses node references dynamically, illustrating complex relationships and recursive paths (e.g. BST Insertions).
* 🔍 **Algorithm Simulations:** Track pointers (e.g., `low`, `high`, `mid` in Binary Search) as they shift position along the index line.
* ⚡ **Sorting Animations:** Watch elements dynamically swap values step-by-step with visual feedback on indices.
* 📈 **Execution Dashboard & Memory Frames:** Inspect local scope stacks, heap references, call stack pointers, and console logs.
* 🎨 **Premium Modern Design:** A dark-themed, glassmorphic layout enhanced with Framer Motion transitions, mouse-glow effects, and floating digital particles.

---

## 🛠️ Technology Stack

### Frontend
* **React 19** & **TypeScript** (Core framework & typings)
* **Vite** (Next-generation fast asset bundler)
* **Tailwind CSS** (Utility styling & slate design themes)
* **Framer Motion** (Smooth structural visual layout animations)
* **Zustand** (Ultra-lightweight global state management)
* **Monaco Editor** (High-fidelity editor experience)

### Backend
* **Node.js** & **Express.js** (Server layer orchestrating code compilations and metrics)

---

## 🎨 Core Modules

1. **🏠 Landing Page:** Premium landing portal featuring cursor spotlights, parallax scroll indicators, floating code symbols, and dynamic statistics blocks.
2. **💻 Interactive Editor:** Split-pane editor allowing users to toggle code, customize playback speeds, step through loops, and select templates.
3. **🧠 Visualization Engine:** Stateful VM resolving arithmetic, references, swaps, and mutations, updating variables step-by-step.
4. **📈 Execution Dashboard:** Multi-column diagnostics monitoring stack scopes, heap allocations, and print logs.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Clone the Repository
```bash
git clone https://github.com/Bindu7729/codeVista.git
cd codeVista
```

### 3. Install Workspaces Dependencies
This project uses npm workspaces to coordinate client and server:
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

## 📦 Commands Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start development servers for both client and server concurrently |
| `npm run build` | Compile and bundle production assets for client & server |
| `npm run dev:client` | Start frontend client development server |
| `npm run dev:server` | Start backend server development server |
| `npm run build:client` | Build the production client bundle |
| `npm run preview` | Run local preview server on compiled client assets |

---

## 🏗️ Project Structure

```
codeVista/
├── client/
│   ├── public/             # Static public assets & icons
│   ├── src/
│   │   ├── components/     # Global layout panels & app shells
│   │   ├── features/
│   │   │   ├── editor/     # Monaco sandbox, VM engines, visual canvas
│   │   │   ├── landing/    # Interactive landing components & particle widgets
│   │   │   └── library/    # Preloaded algorithm selectors
│   │   ├── store/          # Zustand store definitions
│   │   ├── App.tsx         # Route router mappings
│   │   └── main.tsx        # React client entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/                # Express controllers & execution handlers
│   ├── index.js            # Node service entry point
│   └── package.json
│
├── docs/                   # Product documentation guides
├── package.json            # Workspaces configuration root
└── README.md
```

---

## 📸 Screenshots

### 1. Landing Page Portal
![Landing Page Screenshot](docs/screenshots/landing_page.png)
*Featuring mouse spotlight tracking, floating binary particles, and modern call-to-actions.*

### 2. Interactive Code Editor & Canvas
![Editor Screenshot](docs/screenshots/visualizer_canvas.png)
*Execution tracing window animating active pointer indices and updating stack telemetry values.*

---

## 🎯 Future Enhancements

* **🤖 AI Explanations:** Integrate LLM pipelines to explain what code branches are doing at each step of the trace.
* **🌐 Shared Visual Sessions:** Allow collaborative workspaces where multiple developers can trace code steps together in real-time.
* **🏆 Competitive Visual Arena:** Interactive game challenges where users must write loops to match specific sorting traces.
* **☁️ Cloud Compile Sandbox:** Expand compilers to support compiled runtimes like C++ and Go.

---

## 📄 License
This project is developed for educational and portfolio purposes.

---
<p align="center">
  <b>Visualize. Understand. Master Programming.</b><br/>
  CodeVista &copy; 2026
</p>
