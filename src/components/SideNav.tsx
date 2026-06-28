import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  const menu = [
    { label: 'Dashboard', path: '/dashboard', icon: 'tune' },
    { label: 'Library', path: '/library', icon: 'folder' },
    { label: 'Visual Editor', path: '/editor', icon: 'route' },
    { label: 'Documentation', path: '/docs', icon: 'search' },
    { label: 'Profile & Settings', path: '/profile', icon: 'tune' },
  ];

  return (
    <div className="flex h-screen bg-[#070b13] text-white overflow-hidden font-sans">
      
      {/* PERSISTENT LEFT SIDE NAVIGATION */}
      <aside className="w-64 bg-[#0b0f19] border-r border-white/10 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 px-2">
            <span className="font-black text-xl tracking-tight text-white">CodeVista</span>
          </div>
          
          <nav className="space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs uppercase tracking-wider font-bold transition-all ${
                    isActive
                      ? 'bg-purple-500/20 border-l-2 border-[#7c3aed] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon name={item.icon} className="text-[16px]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-red-400 transition flex items-center gap-2 px-4 py-2">
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* THIS IS THE CRITICAL FIX: DYNAMICALLY RENDER THE ACTIVE PAGE */}
      <main className="flex-1 overflow-y-auto bg-[#070b13] relative">
        {children}
      </main>

    </div>
  );
}