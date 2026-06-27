import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, History, Code2, FileText, User, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { label: 'Library', path: '/library', icon: BookOpen },
    { label: 'Saved Sessions', path: '/sessions', icon: History },
    { label: 'Editor', path: '/editor', icon: Code2 },
    { label: 'Docs', path: '/docs', icon: FileText },
    { label: 'Profile & Settings', path: '/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-[#070b13] text-slate-200 overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR CONTAINER */}
      <aside className="w-64 bg-[#0b0f19] border-r border-slate-900 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-8">
          
          {/* Platform Branding Heading */}
          <div className="flex items-center gap-3 px-2">
            <div className="bg-gradient-to-br from-indigo-500 to-teal-400 p-2 rounded-xl text-white shadow-md shadow-indigo-500/10">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">CodeVista</span>
          </div>

          {/* Nav Links Stack */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/10 to-teal-500/5 border-l-4 border-indigo-500 text-white shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Account Exit Strip */}
        <div className="p-4 border-t border-slate-900 bg-[#090d16]/40">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 rounded-xl text-sm font-semibold tracking-wide transition-colors group w-full"
          >
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN SUB-ROUTE ROUTER CONTENT SLOT */}
      <main className="flex-1 overflow-y-auto bg-[#070b13] relative">
        <Outlet />
      </main>

    </div>
  );
}