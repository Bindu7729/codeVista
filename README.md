# CodeVista — Interactive Code Visualizer & SaaS Platform

CodeVista is a premium developer platform that visualizes execution flow, enabling programmers to grasp complex logic instantly. Write code in the editor, step through its execution line-by-line, and watch the call stack, heap memory, and data flow update dynamically.

---

## 🚀 Key Features

* **Interactive AST & Program Flow Visualization:** Parses code structure and builds a dynamic visual flow graph on the fly.
* **Live Step-by-Step Debugger:** Jump forward, step backward, or auto-play through execution lines.
* **Stack & Heap Memory Inspector:** Telemetry representations of call stack variable registries and heap pointer allocations with fluid layout animations.
* **Terminal Console Output:** Simulated stdout terminal showing live output streams (e.g. print statements).
* **Premium SaaS Experience:** A modern developer environment built with curated colors, smooth transitions, and high-fidelity layouts.

---

## 🛠️ Technology Stack

* **Core UI Framework:** React (with TypeScript)
* **Build Engine:** Vite
* **Styling & Theme:** Tailwind CSS & PostCSS
* **Global State Store:** Zustand
* **Animations:** Framer Motion
* **Iconography:** Lucide React

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bindu7729/codeVista.git
   cd codeVista
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
codeVista/
├── src/
│   ├── components/       # Reusable layout and navigation components
│   ├── features/
│   │   ├── editor/       # Core code visualization engine (AST, interpreter, memory layout)
│   │   ├── landing/      # Premium SaaS home page
│   │   ├── dashboard/    # User platform dashboard
│   │   ├── library/      # Saved code modules repository
│   │   ├── docs/         # System documentation
│   │   └── auth/         # Login and signup features
│   ├── layouts/          # Application shell page structures
│   ├── index.css         # Styling system configuration
│   └── main.tsx          # App entry point
├── tailwind.config.js    # Design tokens & color theme mappings
├── postcss.config.js     # CSS compilation config
└── vite.config.ts        # Vite dev server configurations
```
