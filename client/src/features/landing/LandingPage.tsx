import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070913] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden text-left">
      {/* Header section */}
      <header className="border-b border-slate-900/80 bg-[#070913]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white hover:opacity-95 cursor-pointer">
              CodeVista
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <Link to="/editor" className="hover:text-white transition-colors duration-200">Editor</Link>
            <Link to="/docs" className="hover:text-white transition-colors duration-200">Docs</Link>
            <Link to="/library" className="hover:text-white transition-colors duration-200">Library</Link>
          </nav>

          {/* Right Action Buttons - CRITICAL FIXED ROUTES */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors duration-200 tracking-wide">
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="bg-[#7c3aed] text-white hover:bg-[#6d28d9] px-5 py-2 rounded transition-all duration-200 shadow-md shadow-purple-600/10 hover:shadow-purple-600/20 text-xs font-semibold uppercase tracking-wider"
            >
              SIGN UP
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
          <div className="md:hidden bg-[#070913] border-b border-slate-900 px-6 py-4 space-y-4 animate-fadeIn">
            <a href="#features" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            <Link to="/editor" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium">Editor</Link>
            <Link to="/docs" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium">Docs</Link>
            <Link to="/library" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium">Library</Link>
            <div className="pt-4 border-t border-slate-900 flex flex-col space-y-3">
              <Link to="/login" className="text-center text-slate-300 hover:text-white py-2 text-sm font-medium">
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="bg-[#7c3aed] text-white text-center py-2.5 rounded text-xs font-semibold uppercase tracking-wider block"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center space-x-2 bg-purple-950/40 border border-purple-800/60 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
                V2.0 Beta is Live
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Understand Code, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#60a5fa]">
                Don't Just Read It
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              Experience a revolutionary developer environment that visualizes execution flow,
              enabling you to grasp complex logic instantly. Built for architects of the future.
            </p>

            {/* FIXED CALL-TO-ACTIONS TO DIRECT PATHS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/signup"
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-95"
              >
                START CODING
              </Link>

              <Link
                to="/login"
                className="flex items-center space-x-2 bg-[#161a29] border border-slate-800 hover:border-slate-700 hover:bg-[#1c2134] text-slate-200 px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>VIEW DEMO</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Column */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#0b0f1d] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl shadow-purple-950/10">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0d1325] border-b border-slate-900/60">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#f87171]/40"></span>
                  <span className="w-3 h-3 rounded-full bg-[#fbbf24]/40"></span>
                  <span className="w-3 h-3 rounded-full bg-[#34d399]/40"></span>
                </div>
                <span className="text-xs font-mono text-slate-400 select-none">
                  main.rs
                </span>
                <div className="w-12"></div>
              </div>

              <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300">
                <div className="flex items-start space-x-4">
                  <div className="text-slate-600 select-none text-right pr-2 border-r border-slate-900/80 space-y-1">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                  </div>

                  <div className="space-y-1 w-full">
                    <div>
                      <span className="text-pink-400">fn</span> <span className="text-blue-400">main</span>() &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-400">let</span> config = <span className="text-blue-400">load_config</span>();
                    </div>
                    <div className="pl-4 bg-purple-950/40 border-l-2 border-purple-500 py-0.5 -mx-2 px-2 rounded-r">
                      <span className="text-purple-400">visualize_flow</span>(config);
                    </div>
                    <div>
                      &#125;
                    </div>
                    <div>&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature list */}
      <section className="bg-[#04060d] border-t border-slate-950 py-16" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0b0f1d]/40 border border-slate-800/50 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
              <h3 className="text-lg font-bold text-white mb-2">Visual Execution</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Watch your code come alive with real-time state visualization and flow mapping.
              </p>
            </div>

            <div className="bg-[#0b0f1d]/40 border border-slate-800/50 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
              <h3 className="text-lg font-bold text-white mb-2">Step-by-Step Debugging</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Scrub through execution history like a timeline. Pinpoint errors with surgical precision.
              </p>
            </div>

            <div className="bg-[#0b0f1d]/40 border border-slate-800/50 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
              <h3 className="text-lg font-bold text-white mb-2">Multi-language</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Seamless support for Rust, Go, Python, and TypeScript within a unified interface.
              </p>
            </div>

            <div className="bg-[#0b0f1d]/40 border border-slate-800/50 hover:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
              <h3 className="text-lg font-bold text-white mb-2">Collaborative Sessions</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Share your visualization canvas in real-time. Pair programming, evolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-24 bg-gradient-to-b from-[#04060d] to-[#070913] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ship faster.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              See further.
            </span>
          </h2>
          <div className="mt-6 max-w-xl mx-auto">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal tracking-wide">
              Join thousands of engineers using CodeVista to debug, learn, and ship better code.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/signup"
              className="bg-[#7c3aed] text-white hover:bg-[#6d28d9] px-8 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 uppercase shadow-lg shadow-purple-600/10 hover:shadow-purple-600/30 transform active:scale-95"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="border-t border-slate-900 bg-[#04060d] text-slate-400 text-xs sm:text-sm py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-tight">CodeVista</h4>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              &copy; 2026 CodeVista Inc. Built for architects of the future.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase">Product</h5>
            <ul className="space-y-2">
              <li><Link to="/editor" className="hover:text-white transition-colors duration-200">Editor</Link></li>
              <li><Link to="/library" className="hover:text-white transition-colors duration-200">Library</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase">Resources</h5>
            <ul className="space-y-2">
              <li><Link to="/docs" className="hover:text-white transition-colors duration-200">Documentation</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}