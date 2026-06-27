import { useState, useEffect } from 'react';
import { AppShell } from '../../components/SideNav';
import { 
  Folder, 
  ChevronRight, 
  Copy, 
  Check, 
  Zap, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const DOC_SECTIONS: Record<string, { title: string; subtitle: string; description: string; filename: string; code: string; proTip: string }> = {
  introduction: {
    title: 'Introduction',
    subtitle: "Getting started with CodeVista's live execution visualization engine.",
    description: "CodeVista is an advanced developer environment that turns static code analysis into fluid, real-time visual streams. By wrapping runtime states, the engine constructs logical pipelines of your application trace.",
    filename: 'INSTALL.SH',
    code: `npm install @codevista/core --save-dev

# Initialize configuration
npx codevista init`,
    proTip: 'For production bundles, ensure the compiler wrappers are stripped to optimize package size and latency.'
  },
  'execution-graph': {
    title: 'The Execution Graph',
    subtitle: "Understand the fundamental building blocks of CodeVista's visual engine.",
    description: "At the heart of CodeVista is the ExecutionGraph. It represents your code's runtime state as a directed acyclic graph (DAG) where nodes are operations and edges are data flow.",
    filename: 'GRAPH_INIT.TS',
    code: `import { Engine } from '@codevista/core';

// Initialize the visual engine
const engine = new Engine({
  target: '#canvas',
  mode: 'interactive',
  theme: 'dark-matter',
});

// Attach execution observer
engine.observe(myFunction, {
  trackMemory: true,
  stepDelay: 50, // ms
});`,
    proTip: 'Enabling detailed memory observation creates slight overhead during rapid-step processes. Adjust stepDelay to keep compilation smooth.'
  },
  'state-timeline': {
    title: 'State Timeline',
    subtitle: 'Replay, pause, and step backward through complex function stack frames.',
    description: 'The State Timeline acts as an immutable ledger storing all register variations, variable scopes, and visual pointers. It allows deep time-travel debugging without rebuilding your codebase.',
    filename: 'TIMELINE.TS',
    code: `import { TimelineObserver } from '@codevista/core';

const timeline = new TimelineObserver();
timeline.recordSnapshot('iteration_1', {
  vars: { low: 0, high: 8, mid: 4 },
  callStack: ['binary_search']
});

// Play back the snapshots
timeline.playback({ speed: '1.5x' });`,
    proTip: 'Using snapshots on recursive loops with depth > 500 is optimized using compressed stack differentials to prevent browser tab crashes.'
  },
  'node-anatomy': {
    title: 'Node Anatomy',
    subtitle: 'Inspect the structural properties of active visual layout nodes.',
    description: 'Each node in the visualizer graph binds directly to a specific abstract syntax tree (AST) segment. Nodes maintain reactive ports that glow on reading or writing state.',
    filename: 'NODE_SCHEMA.JSON',
    code: `{
  "id": "node_7219a",
  "type": "binary_operation",
  "label": "mid = (low + high) / 2",
  "inputs": ["low", "high"],
  "outputs": ["mid"],
  "metadata": {
    "line": 5,
    "scope": "local"
  }
}`,
    proTip: 'Nodes can be customized dynamically using custom SVG renders by mapping new templates to the parser registry.'
  },
  'api-reference': {
    title: 'API Reference',
    subtitle: 'Fully-typed core API commands for customized compiler hookups.',
    description: 'Plug CodeVista directly into system architectures using our standard telemetry functions. Supports typescript types natively.',
    filename: 'TELEMETRY.TS',
    code: `export interface TelemetryConfig {
  secure: boolean;
  endpoint: string;
}

export async function captureTrace(config: TelemetryConfig) {
  const reporter = await connectToVistaServer(config);
  reporter.send({ event: 'visualize_thread' });
}`,
    proTip: 'Always configure secure: true when transmitting code trace blocks over public gateways.'
  }
};

export default function DocsPage() {
  const [activeSection, setActiveDocSection] = useState('introduction');
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentDoc = DOC_SECTIONS[activeSection];

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerFeedback("Code snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="flex h-screen bg-[#06050b] text-slate-100 antialiased overflow-hidden select-none">
        
        {/* Floating status container toast alert panels */}
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#110e25] border border-purple-500/40 text-slate-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-sans text-xs">
            <Check className="text-emerald-400 w-4 h-4" />
            <div className="text-sm font-medium">{feedback}</div>
          </div>
        )}

        {/* 1. Left Concepts Navigation Sub-Sidebar */}
        <aside className="w-64 border-r border-white/[0.04] bg-[#08070e] p-6 flex-shrink-0 flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-1 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>Core Concepts</span>
            </div>
            
            <nav className="space-y-1">
              {[
                { id: 'introduction', label: 'Introduction' },
                { id: 'execution-graph', label: 'The Execution Graph' },
                { id: 'state-timeline', label: 'State Timeline' },
                { id: 'node-anatomy', label: 'Node Anatomy' },
                { id: 'api-reference', label: 'API Reference' }
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveDocSection(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all block ${
                      isActive 
                        ? 'bg-purple-950/40 text-purple-300 border-l-2 border-purple-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* 2. Right Main Documentation Viewer Section */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 text-left bg-[#06050b] flex flex-col justify-between">
          
          <div className="max-w-3xl w-full space-y-8">
            {/* Breadcrumb Header Row */}
            <div className="flex items-center gap-2.5 text-slate-500 text-xs font-medium border-b border-white/[0.04] pb-4">
              <Folder className="w-4.5 h-4.5 text-violet-400 flex-shrink-0" />
              <span>docs</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">{activeSection}</span>
            </div>

            {/* Document Core Meta Titles */}
            <div>
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest block mb-1">Documentation Module</span>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">{currentDoc?.title}</h1>
              <p className="text-slate-400 text-sm mt-1.5 leading-relaxed font-sans">{currentDoc?.subtitle}</p>
            </div>

            {/* Content Body Text */}
            <div className="bg-[#090812]/50 border border-white/[0.02] p-5 rounded-2xl">
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {currentDoc?.description}
              </p>
            </div>

            {/* High-Fidelity Synthesized Code Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-xl blur opacity-75" />
              <div className="relative bg-[#08070e] border border-white/[0.05] rounded-xl overflow-hidden shadow-2xl">
                
                {/* Filename and copy utility strip bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0a0914] border-b border-white/[0.05]">
                  <span className="text-xs font-mono text-slate-400 tracking-wider select-none">{currentDoc?.filename}</span>
                  <button
                    onClick={() => copyToClipboard(currentDoc?.code)}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center gap-1.5 text-xs font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[10px] font-bold uppercase">Copied</span>
                      </>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Preformatted Syntax Highlight Code Block View */}
                <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-emerald-400 overflow-x-auto bg-[#040309]/30">
                  <pre><code>{currentDoc?.code}</code></pre>
                </div>
              </div>
            </div>

            {/* Pro Tip Alert Callout Footer Banner Component */}
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-slate-200 flex items-start gap-4 shadow-lg">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex-shrink-0">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pro Tip — Compiler Optimization Note</span>
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans mt-0.5">
                  {currentDoc?.proTip}
                </p>
              </div>
            </div>
          </div>

          {/* Minimal branding copy row info line */}
          <div className="text-[11px] text-slate-600 font-mono tracking-wider pt-10 border-t border-white/[0.02] mt-10">
            [SYS-DOCS] Framework specs aligned. Patented visualization pipelines.
          </div>
        </main>

      </div>
    </AppShell>
  );
}