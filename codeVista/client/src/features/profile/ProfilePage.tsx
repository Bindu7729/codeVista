import { useState, useEffect } from "react";
import { AppShell } from "../../components/SideNav";
import { Icon } from "../../components/Icon";
import { 
  User, 
  Palette, 
  SlidersHorizontal, 
  Bell, 
  Check, 
  Volume2, 
  Zap, 
  Sparkles 
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Account");
  const [feedback, setFeedback] = useState<string | null>(null);

  // 1. ACCOUNT PROFILE STATE
  const [profile, setProfile] = useState({
    fullName: "Alex Mercer",
    username: "alex_codes",
    email: "alex@example.com",
    role: "Systems Ninja 🦀",
    bio: "Full-stack architect focusing on high-performance distributed systems. Passionate about clean code and minimalist interfaces."
  });

  // 2. APPEARANCE STATE
  const [selectedTheme, setSelectedTheme] = useState("dark-matter");
  const [uiGlowEffect, setUiGlowEffect] = useState(true);

  // 3. EDITOR PREFERENCES STATE
  const [lineNumbers, setLineNumbers] = useState(true);
  const [minimap, setMinimap] = useState(true);
  const [autoComplete, setAutoComplete] = useState(true);

  // 4. NOTIFICATIONS STATE
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [chimeAlerts, setChimeAlerts] = useState(false);

  // Load state values from memory loop on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('codevista_user');
    if (savedData) {
      setProfile(JSON.parse(savedData));
    }
    const savedTheme = localStorage.getItem('codevista_theme');
    if (savedTheme) setSelectedTheme(savedTheme);
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleSaveProfileChanges = () => {
    localStorage.setItem('codevista_user', JSON.stringify(profile));
    localStorage.setItem('codevista_theme', selectedTheme);
    triggerFeedback("Profile workspace configurations synced successfully!");
  };

  const achievements = [
    { name: "ALGO MASTER", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: "psychology" },
    { name: "EARLY ADOPTER", color: "text-sky-400 bg-sky-500/10 border-sky-500/20", icon: "auto_awesome" },
    { name: "BUG SQUASHER", color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: "bug_report" },
  ];

  return (
    <AppShell>
      <div className="min-h-screen bg-[#090d16] text-white p-6 md:p-10 text-left overflow-y-auto font-sans selection:bg-purple-500/30">
        
        {/* Floating Toast Notification Box */}
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#110e25] border border-purple-500/40 text-slate-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
            <Check className="text-emerald-400 w-4 h-4" />
            <div className="text-sm font-medium">{feedback}</div>
          </div>
        )}

        {/* Profile Header section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/[0.04] pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Profile &amp; Settings</h1>
            <p className="text-sm text-slate-400 mt-1">Configure your custom compiler trace options and account attributes.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onClick={handleSaveProfileChanges} className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition-all active:scale-95">
              Save Workspace Changes
            </button>
          </div>
        </header>

        {/* Sub Tab Buttons Row Strip */}
        <nav className="flex space-x-2 border-b border-white/[0.04] mb-8 pb-px">
          {[
            { id: "Account", label: "Account", icon: <User className="w-3.5 h-3.5" /> },
            { id: "Appearance", label: "Appearance", icon: <Palette className="w-3.5 h-3.5" /> },
            { id: "Editor", label: "Editor Options", icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
            { id: "Notifications", label: "Notifications", icon: <Bell className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); }}
              className={`px-4 py-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider relative transition-all border-b-2 -mb-px ${
                activeTab === tab.id ? "border-purple-500 text-purple-300 bg-purple-950/10 rounded-t-xl" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Split Framework Layout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block Side Column: Profile Context Preview Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b101f] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-xl">
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/20 via-slate-800 to-emerald-600/20 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                <span className="text-3xl font-black tracking-wider text-slate-300">
                  {profile.fullName ? profile.fullName[0].toUpperCase() : 'A'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{profile.fullName}</h2>
              <p className="text-sm font-mono text-slate-400 mt-0.5">@{profile.username}</p>
              <span className="text-[10px] font-extrabold tracking-widest text-purple-400 uppercase mt-3 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                {profile.role}
              </span>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-xs">{profile.bio}</p>
            </div>

            {/* Render Badges List Panel */}
            <div className="bg-[#0b101f] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>My Achievements</span>
              </h3>
              <div className="flex flex-col gap-3">
                {achievements.map((item) => (
                  <div key={item.name} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-wide ${item.color}`}>
                    <Icon name={item.icon} className="text-sm" filled />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block Main Card: Conditional Sub-Tab Views Form Panels */}
          <div className="lg:col-span-8">
            <div className="bg-[#0b101f] border border-white/10 rounded-2xl p-6 shadow-xl min-h-[380px] flex flex-col justify-between">
              
              {/* --- TAB A: BASIC ACCOUNT FIELDS --- */}
              {activeTab === "Account" && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Basic Account Profile</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Update your visual trace identity credentials here.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Full Name</label>
                      <input
                        type="text" value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        className="w-full bg-[#07060f] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Username Handle</label>
                      <input
                        type="text" value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        className="w-full bg-[#07060f] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Email Address</label>
                    <input
                      type="email" value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full bg-[#07060f] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Bio / Status Manifesto</label>
                    <textarea
                      rows={3} value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full bg-[#07060f] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* --- TAB B: APPEARANCE VISUAL STYLING --- */}
              {activeTab === "Appearance" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Appearance & Theme Settings</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Customize workspace visual skins and color layouts.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div 
                      onClick={() => setSelectedTheme("dark-matter")}
                      className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[90px] ${
                        selectedTheme === "dark-matter" ? "border-purple-500 bg-purple-950/20" : "border-white/5 bg-[#07060f] hover:border-white/10"
                      }`}
                    >
                      <span className="text-sm font-bold text-white">Dark Matter Theme (Default)</span>
                      <span className="text-[10px] text-slate-500 font-mono">Premium Charcoal Obsidian Gradient Skin</span>
                    </div>

                    <div 
                      onClick={() => setSelectedTheme("teal-indigo")}
                      className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[90px] ${
                        selectedTheme === "teal-indigo" ? "border-purple-500 bg-purple-950/20" : "border-white/5 bg-[#07060f] hover:border-white/10"
                      }`}
                    >
                      <span className="text-sm font-bold text-white">Teal Indigo Spectrum</span>
                      <span className="text-[10px] text-slate-500 font-mono">High Contrast Cyberpunk Interface</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#07060f] border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-violet-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-bold text-slate-200 block">Ambient Fluid Canvas Glow</span>
                        <span className="text-[10px] text-slate-500 leading-normal">Enables blur background gradient orbs on dashboard.</span>
                      </div>
                    </div>
                    <input 
                      type="checkbox" checked={uiGlowEffect} onChange={(e) => setUiGlowEffect(e.target.checked)}
                      className="rounded bg-[#07060f] border-white/10 text-purple-600 focus:ring-purple-500 cursor-pointer w-5 h-5"
                    />
                  </div>
                </div>
              )}

              {/* --- TAB C: EDITOR TOOGLE PANEL PREFERENCES --- */}
              {activeTab === "Editor" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Visual Editor Setup Options</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Configure live code syntax compilation layout states.</p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center justify-between p-3.5 bg-[#07060f] border border-white/5 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">Render Line Numbers</span>
                        <span className="text-[10px] text-slate-500">Shows vertical left matrix count indices column.</span>
                      </div>
                      <input type="checkbox" checked={lineNumbers} onChange={(e) => setLineNumbers(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-purple-600 w-4.5 h-4.5 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-[#07060f] border border-white/5 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">Show Compilation Minimap Scope</span>
                        <span className="text-[10px] text-slate-500">Enables secondary abstract code structure view bar on right pane.</span>
                      </div>
                      <input type="checkbox" checked={minimap} onChange={(e) => setMinimap(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-purple-600 w-4.5 h-4.5 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-[#07060f] border border-white/5 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">Intelligent Token Autocomplete</span>
                        <span className="text-[10px] text-slate-500">Triggers contextual code prediction drop down strings.</span>
                      </div>
                      <input type="checkbox" checked={autoComplete} onChange={(e) => setAutoComplete(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-purple-600 w-4.5 h-4.5 cursor-pointer" />
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB D: SYSTEM NOTIFICATION CHIMES --- */}
              {activeTab === "Notifications" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Notification Alerts Control Center</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage data feed logs and compile audit push settings.</p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center justify-between p-3.5 bg-[#07060f] border border-white/5 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block font-mono">Email Digest Audit Traces</span>
                        <span className="text-[10px] text-slate-500">Receive system activity telemetry snapshots over public server hooks.</span>
                      </div>
                      <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-purple-600 w-4.5 h-4.5 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-[#07060f] border border-white/5 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Volume2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-slate-200 block font-mono">Compile Success Chimes</span>
                          <span className="text-[10px] text-slate-500">Plays audio chime signal notification whenever threads run completely cleanly.</span>
                        </div>
                      </div>
                      <input type="checkbox" checked={chimeAlerts} onChange={(e) => setChimeAlerts(e.target.checked)} className="rounded bg-[#07060f] border-white/10 text-purple-600 w-4.5 h-4.5 cursor-pointer" />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer control trace info indicator */}
              <div className="text-[10px] text-slate-600 font-mono tracking-widest pt-6 border-t border-white/[0.03] mt-6">
                [SYS-SYNC-NODE] Active configurations channel verified. Safe build rules active.
              </div>

            </div>
          </div>

        </div>

      </div>
    </AppShell>
  );
}