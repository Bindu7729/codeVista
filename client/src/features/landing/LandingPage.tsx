import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Terminal, 
  Play, 
  Settings, 
  ChevronRight, 
  Star,
  Users,
  Activity,
  Flame,
  Globe,
  Bug
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: "Code Steps Traced", value: "24.8M+" },
    { label: "Active Developers", value: "180K+" },
    { label: "Visualized Algorithms", value: "150+" },
    { label: "GitHub Stars", value: "14.2K+" }
  ];

  const languages = [
    { name: "C", color: "text-blue-400" },
    { name: "C++", color: "text-indigo-400" },
    { name: "Java", color: "text-orange-400" },
    { name: "Python", color: "text-yellow-400" },
    { name: "JavaScript", color: "text-amber-300" },
    { name: "TypeScript", color: "text-sky-400" },
    { name: "C#", color: "text-purple-400" },
    { name: "Go", color: "text-cyan-400" }
  ];

  const showcaseAlgorithms = [
    { name: "Bubble Sort", category: "Sorting", desc: "Watch adjacent elements get compared and swapped in real-time." },
    { name: "Binary Search", category: "Searching", desc: "Animate left, right, and mid markers as search space halves." },
    { name: "BST Traversal", category: "Trees", desc: "Follow recursion paths as pre-order, in-order, or post-order tree steps execute." },
    { name: "Dijkstra's Pathfinding", category: "Graphs", desc: "Visualize shortest path exploration across node networks." }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-[#06B6D4]/30 overflow-x-hidden text-left">
      
      {/* Header section */}
      <header className="border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-2 rounded-xl text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white cursor-pointer font-sans">
              CodeVista
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#94A3B8]">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#languages" className="hover:text-white transition-colors duration-200">Languages</a>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#showcase" className="hover:text-white transition-colors duration-200">Showcase</a>
            <a href="#stats" className="hover:text-white transition-colors duration-200">Stats</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/login" className="text-[#94A3B8] hover:text-white transition-colors duration-200 tracking-wide uppercase text-xs font-bold">
              Login
            </Link>
            <Link
              to="/editor"
              className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white hover:opacity-95 px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md text-xs font-semibold uppercase tracking-wider"
            >
              Start Visualizing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-4 space-y-4">
            <a href="#features" className="block text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#languages" className="block text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">Languages</a>
            <a href="#how-it-works" className="block text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">How It Works</a>
            <a href="#showcase" className="block text-[#94A3B8] hover:text-white transition-colors text-sm font-medium">Showcase</a>
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
              <Link to="/login" className="text-center text-[#94A3B8] hover:text-white py-2 text-sm font-medium uppercase">
                Login
              </Link>
              <Link
                to="/editor"
                className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-center py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider block"
              >
                Start Visualizing
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-20 md:py-32 relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#1E293B] border border-slate-800 rounded-full px-4 py-1.5 shadow-sm">
            <Flame className="w-4 h-4 text-[#06B6D4] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#06B6D4] font-mono">
              Next-Gen Program Visualization Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Visualize. Understand. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4]">
              Master Programming.
            </span>
          </h1>

          <p className="text-[#94A3B8] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Transform source code into interactive visual experiences and understand how algorithms work internally. Watch call stacks, heap states, and variables map in real-time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/editor"
              className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-95 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-95 shadow-lg shadow-blue-500/10"
            >
              Start Visualizing
            </Link>

            <a
              href="#showcase"
              className="flex items-center space-x-2 bg-[#1E293B] border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-[#F8FAFC] px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
            >
              <span>Explore Algorithms</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#1E293B]/40 border-y border-slate-800 py-12" id="stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-5xl font-black text-white font-mono bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-transparent">{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-[#94A3B8] tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Fidelity Execution Diagnostics</h2>
            <p className="text-[#94A3B8] text-sm sm:text-base">Everything you need to visualize logic flows, trace recursion trees, and debug complex data structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#1E293B] border border-slate-800 hover:border-[#2563EB]/40 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] shadow-sm">
              <div className="bg-[#2563EB]/10 p-3 rounded-xl w-fit text-[#2563EB] mb-6">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Interactive Code Execution</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Execute code line-by-line. Animate parameters, track indices, and follow control structures live.
              </p>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 hover:border-[#7C3AED]/40 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] shadow-sm">
              <div className="bg-[#7C3AED]/10 p-3 rounded-xl w-fit text-[#7C3AED] mb-6">
                <Bug className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Step-by-Step Debugging</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Step forward, backward, or auto-play. Scrub through execution logs like an absolute media playback timeline.
              </p>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 hover:border-[#06B6D4]/40 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] shadow-sm">
              <div className="bg-[#06B6D4]/10 p-3 rounded-xl w-fit text-[#06B6D4] mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Memory Stack & Heap</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Inspect local scope stack variables and heap reference object graphs as data updates.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="bg-[#1E293B]/20 py-20 border-t border-slate-800" id="languages">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Supported Languages</h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">Compile and trace execution graphs across multiple backend runtimes.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-slate-800 px-6 py-4 rounded-xl flex items-center gap-3">
                <Globe className={`w-4 h-4 ${lang.color}`} />
                <span className="font-mono text-sm font-bold text-white">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 border-t border-slate-800" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How It Works</h2>
            <p className="text-[#94A3B8] text-sm sm:text-base">Three simple steps to unlock the inner mechanics of your algorithms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="text-4xl font-black text-[#2563EB] font-mono">01</div>
              <h3 className="text-xl font-bold text-white">Write or Paste Code</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Choose C, C++, Python, or JavaScript. Select an algorithm template or write your custom code snippet.
              </p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="text-4xl font-black text-[#7C3AED] font-mono">02</div>
              <h3 className="text-xl font-bold text-white">Trigger Execution</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Click Run to compile the code block. Our sandbox generates an absolute execution trace snapshot timeline.
              </p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="text-4xl font-black text-[#06B6D4] font-mono">03</div>
              <h3 className="text-xl font-bold text-white">Watch the Visualization</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Animate the call stacks, heap states, and pointer locations step-by-step with zero lag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-[#1E293B]/20 border-t border-slate-800" id="showcase">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Algorithm Showcase</h2>
            <p className="text-[#94A3B8] text-sm sm:text-base">Preloaded modules covering standard data structures and algorithmic procedures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseAlgorithms.map((algo, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
                    {algo.category}
                  </span>
                  <h4 className="text-lg font-bold text-white">{algo.name}</h4>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{algo.desc}</p>
                </div>
                <Link to="/editor" className="mt-6 text-xs font-bold text-[#2563EB] hover:text-[#06B6D4] flex items-center gap-1.5 transition-colors">
                  <span>Open in Editor</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Impacting Engineers Worldwide</h2>
            <p className="text-[#94A3B8] text-sm sm:text-base">Hear what computer science students and senior software developers think.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-6">
              <div className="flex gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-[#F8FAFC] text-sm italic leading-relaxed">
                "CodeVista completely changed how I prep for FAANG interviews. Seeing recursion trees unfold visually helped me solve dynamic programming challenges instantly."
              </p>
              <div>
                <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                <p className="text-xs text-[#94A3B8]">M.S. in Computer Science at Stanford</p>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-6">
              <div className="flex gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-[#F8FAFC] text-sm italic leading-relaxed">
                "As an educator, explaining pointers and references in C++ was always a hurdle. This visual stack and heap memory frame does the heavy lifting for me."
              </p>
              <div>
                <p className="text-sm font-bold text-white">Dr. Alex Chen</p>
                <p className="text-xs text-[#94A3B8]">CS Professor at MIT</p>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-2xl space-y-6">
              <div className="flex gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-[#F8FAFC] text-sm italic leading-relaxed">
                "Bubble sort and Dijkstra's pathfinding animations are so fluid. I recommend this platform to anyone studying data structures and algorithms."
              </p>
              <div>
                <p className="text-sm font-bold text-white">David Miller</p>
                <p className="text-xs text-[#94A3B8]">Senior Engineer at Netflix</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="border-t border-slate-800 bg-[#0F172A] text-slate-400 text-xs sm:text-sm py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-tight">CodeVista</h4>
            <p className="text-[#94A3B8] leading-relaxed max-w-sm">
              Visualize code, analyze call memory stacks, and master complex algorithms with zero friction.
            </p>
            <p className="text-slate-500">
              &copy; 2026 CodeVista Inc. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase font-sans">Product</h5>
            <ul className="space-y-2">
              <li><Link to="/editor" className="hover:text-white transition-colors duration-200">Visual Editor</Link></li>
              <li><Link to="/library" className="hover:text-white transition-colors duration-200">Algorithm Library</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase font-sans">Resources</h5>
            <ul className="space-y-2">
              <li><Link to="/docs" className="hover:text-white transition-colors duration-200">Documentation</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}