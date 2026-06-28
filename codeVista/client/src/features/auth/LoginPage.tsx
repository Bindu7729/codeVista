import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Code } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save existing data to mirror into the profile page dynamically
    const userProfileData = {
      fullName: email.split('@')[0],
      username: email.split('@')[0] + '_codes',
      email: email,
      role: 'Systems Ninja 🦀',
      bio: 'Full-stack architect focusing on high-performance distributed systems.'
    };
    
    localStorage.setItem('codevista_user', JSON.stringify(userProfileData));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#06050b] text-slate-100 flex flex-col justify-center items-center p-6 text-left relative antialiased select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6 transition-colors group self-center md:absolute md:top-12 md:left-12">
        <span>←</span> Back to Homepage
      </Link>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-2xl blur-xl opacity-20"></div>

        <div className="relative bg-[#0d0c1a] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
            <Code className="w-5 h-5 text-violet-400" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Welcome Back to CodeVista</h2>
            <p className="text-slate-400 text-xs mt-1">Access your saved workspaces and visualization visualizers</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#090812] border border-white/10 hover:border-violet-500/40 text-slate-200 text-xs font-bold hover:bg-[#121124] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.061.069-.061 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#090812] border border-white/10 hover:border-violet-500/40 text-slate-200 text-xs font-bold hover:bg-[#121124] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-white/5"></div>
            <span className="absolute bg-[#0d0c1a] px-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Or Use Email Credentials</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className="w-full bg-[#07060f] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/80 transition-all" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400">Password</label>
                <a href="#forgot" className="text-[11px] text-violet-400 font-semibold">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" className="w-full bg-[#07060f] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/80 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 mt-6 uppercase text-xs tracking-widest">
              <span>Access CodeVista Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 font-medium">
            Don't have an account? <Link to="/signup" className="text-violet-400 font-bold hover:underline">Sign up free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}