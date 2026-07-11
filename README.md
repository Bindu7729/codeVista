# CodeVista — Interactive Programming Visualization Monorepo

CodeVista is a professional algorithm and program visualization platform. It allows developers to select from 8 programming languages, paste custom code, and animate data structures (Arrays, Linked Lists, Stacks, Queues, Binary Trees, and Graphs) step-by-step.

---

## 📂 Repository Structure

The project is structured as a clean monorepo:

```
codeVista/
├── client/              # Frontend React + TypeScript application
│   ├── public/          # Static assets
│   ├── src/             # Component features (Visual Editor, Landing, Dashboard)
│   ├── package.json     # Client dependencies (React, Zustand, Framer Motion)
│   ├── vite.config.ts   # Vite bundler config
│   └── tsconfig.json    # TypeScript config
│
├── server/              # Backend Express application
│   ├── src/             # Execution status endpoints
│   ├── package.json     # Server dependencies (Express, CORS, Dotenv)
│   └── .env.example     # Configuration environment template
│
├── docs/                # API and platform documentation
├── README.md            # Installation & deployment guides
├── .gitignore           # Git ignore filters
└── package.json         # Monorepo workspaces and script runner
```

---

## 🚀 Core Features

1. **Multi-language Selector:** Support for **C, C++, Java, Python, JavaScript, TypeScript, C#, and Go**.
2. **Step-by-Step Tracing:** Play, Pause, Resume, Step Forward, Step Backward, or change playback speed.
3. **Dynamic Memory Scope:** Interactive visualization of call stack scopes and heap allocations.
4. **Data Structure Animations:**
   * **Arrays & Strings:** Highlight indices, swaps, and partition markers.
   * **Linked Lists:** Chains of node blocks connected by dynamic arrows.
   * **Stacks & Queues:** Dynamic pushing/popping and queuing visualization.
   * **Binary Trees & BSTs:** Hierarchical tree graphs mapped dynamically.
   * **Graphs:** Network vertex nodes and edges with live traversal highlighting.
5. **Console Output Terminal:** Live `stdout` printing for program execution logs.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Bindu7729/codeVista.git
   cd codeVista
   ```

2. Install root monorepo and workspace dependencies:
   ```bash
   npm install
   npm run install-client
   npm run install-server
   ```

3. Spin up both frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   * Frontend: `http://localhost:5173`
   * Backend: `http://localhost:5000`

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `client`.
4. Configure Build settings:
   * Build Command: `npm run build`
   * Output Directory: `dist`
5. Click **Deploy**.

### Backend (Render)
1. Go to [Render](https://render.com).
2. Create a new **Web Service**.
3. Set the **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Click **Create Web Service**.
