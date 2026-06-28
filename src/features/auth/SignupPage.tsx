import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Code, User, Cpu, Compass, Database, CheckCircle2, Check, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupStep, setSignupStep] = useState(1);
  const [developerRole, setDeveloperRole] = useState('systems');
  const [fullName, setFullName] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [authError, setAuthError] = useState('');

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-800' };
    let score = 0;
    if (pass.length > 6) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    return score <= 2 ? { score, label: 'Weak', color: 'bg-rose-500' } : { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(password);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (signupStep === 1) {
      if (!fullName || !email || !password) {
        setAuthError('Please fill in all basic fields.');
        return;
      }
      if (!acceptTerms) {
        setAuthError('Please accept the system data trace policy agreements.');
        return;
      }
      setSignupStep(2);
    } else {
      // SAVE THE DYNAMIC DATA TO LOCALSTORAGE BEFORE NAVIGATING
      const userProfileData = {
        fullName: fullName,
        username: githubUser || fullName.toLowerCase().replace(/\s+/g, '_'),
        email: email,
        role: developerRole === 'systems' ? 'Systems Ninja 🦀' : developerRole === 'frontend' ? 'Web Wizard 🌐' : 'AI Architect 🐍',
        bio: `Passionate developer exploring data trace pipelines as a ${developerRole}.`
      };
      
      localStorage.setItem('codevista_user', JSON.stringify(userProfileData));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#06050b] text-slate-100 flex flex-col justify-center items-center p-6 text-left relative antialiased select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <button onClick={() => signupStep === 2 ? setSignupStep(1) : navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6 transition-colors group self-center md:absolute md:top-12 md:left-12">
        <span>←</span> {signupStep === 2 ? 'Back to Step 1' : 'Back to Homepage'}
      </button>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-2xl blur-xl opacity-20"></div>

        <div className="relative bg-[#0d0c1a] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
            <Code className="w-5 h-5 text-violet-400" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Create Your Vista Account</h2>
            <p className="text-slate-400 text-xs mt-1">Step {signupStep} of 2 — {signupStep === 1 ? 'Configure Credentials' : 'Designate Role'}</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 text-red-200 rounded-lg flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>{authError}</div>
            </div>
          )}

          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            {signupStep === 1 ? (
              <>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Alex Mercer" className="w-full bg-[#07060f] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/80 transition-all" />
                  </div>
                </div>

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
                    {password && <span className="text-[10px] text-violet-400 font-bold uppercase">{pwdStrength.label}</span>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" className="w-full bg-[#07060f] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/80 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input type="checkbox" id="terms" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-violet-600 mt-1 cursor-pointer" required />
                  <label htmlFor="terms" className="text-xs text-slate-400 cursor-pointer select-none">I accept CodeVista's live compiler trace policy.</label>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div onClick={() => setDeveloperRole('systems')} className={`border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3.5 ${developerRole === 'systems' ? 'bg-violet-950/45 border-violet-500/60 shadow-[0_4px_15px_rgba(139,92,246,0.15)]' : 'bg-[#090812] border-white/[0.05] hover:border-white/10'}`}>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-slate-400 flex items-center justify-center"><Cpu className="w-5 h-5" /></div>
                  <div className="flex-grow">
                    <div className="text-sm font-bold text-slate-100">Systems Ninja 🦀</div>
                    <div className="text-slate-400 text-xs">Optimized for low-level memory tracing, Rust compilation, and C++ workflows.</div>
                  </div>
                  {developerRole === 'systems' && <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />}
                </div>

                <div onClick={() => setDeveloperRole('frontend')} className={`border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3.5 ${developerRole === 'frontend' ? 'bg-violet-950/45 border-violet-500/60 shadow-[0_4px_15px_rgba(139,92,246,0.15)]' : 'bg-[#090812] border-white/[0.05] hover:border-white/10'}`}>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-slate-400 flex items-center justify-center"><Compass className="w-5 h-5" /></div>
                  <div className="flex-grow">
                    <div className="text-sm font-bold text-slate-100">Web Wizard 🌐</div>
                    <div className="text-slate-400 text-xs">Focused on dynamic runtime visualizers, state transitions, and JavaScript paths.</div>
                  </div>
                  {developerRole === 'frontend' && <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />}
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 mt-6 uppercase text-xs tracking-widest">
              <span>{signupStep === 1 ? 'Continue to Step 2' : 'Build Vista Profile'}</span>
              {signupStep === 1 ? <ArrowRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 font-medium">
            Already registered? <Link to="/login" className="text-violet-400 font-bold hover:underline">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}