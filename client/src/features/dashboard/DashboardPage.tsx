import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { AppShell } from '../../components/SideNav';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Sessions', value: '142', delta: '+12% this week', icon: 'trending_up' },
  { label: 'Concepts Mastered', value: '87', progress: 87 },
  { label: 'Daily Streak', value: '14', unit: 'days', bars: 5 },
];

const recent = [
  { title: "Dijkstra's Pathfinding", tag: 'Graph', date: 'Today, 2:14 PM', color: 'text-emerald-400 bg-emerald-500/10' },
  { title: 'Red-Black Tree Insert', tag: 'Tree', date: 'Yesterday', color: 'text-rose-400 bg-rose-500/10' },
  { title: 'Quick Sort Stats', tag: 'Sort', date: 'Oct 18', color: 'text-sky-400 bg-sky-500/10' },
  { title: 'LRU Cache Walkthrough', tag: 'Cache', date: 'Oct 15', color: 'text-purple-400 bg-purple-500/10' },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full text-left bg-[#0F172A]">
        
        {/* Banner with fade-in */}
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">Welcome back</p>
          <h2 className="text-[32px] font-semibold tracking-tight text-white">Hello, User</h2>
          <p className="text-slate-400 text-[14px] mt-1">Pick up where you left off, or start a fresh session.</p>
        </motion.header>

        {/* Staggered stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((s, idx) => (
            <motion.div 
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.015, borderColor: 'rgba(99, 102, 241, 0.4)' }}
              className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 transition-all group cursor-pointer shadow-md"
            >
              <p className="text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-blue-455 transition-colors mb-2">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-[48px] leading-none font-bold tracking-tight text-white">{s.value}</p>
                {s.unit && <span className="text-[14px] text-slate-400">{s.unit}</span>}
              </div>
              <div className="mt-3">
                {s.delta && (
                  <div className="flex items-center gap-1">
                    <Icon name={s.icon!} className="text-emerald-400 text-[16px]" />
                    <span className="font-mono text-[12px] text-emerald-400">{s.delta}</span>
                  </div>
                )}
                {s.progress !== undefined && (
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                )}
                {s.bars && (
                  <div className="flex gap-1">
                    {Array.from({ length: s.bars }).map((_, i) => (
                      <motion.div 
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                        key={i} 
                        className="h-1 flex-1 bg-purple-500 rounded-full origin-bottom" 
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content sections with slide-in */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.section 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-2 bg-[#1E293B] border border-slate-800 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-white">Recent Sessions</h3>
              <Link to="/library" className="text-[11px] uppercase tracking-wider font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                View All <Icon name="arrow_forward" className="text-[14px]" />
              </Link>
            </div>
            <ul className="divide-y divide-slate-800">
              {recent.map((r, rIdx) => (
                <motion.li 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (rIdx * 0.08) }}
                  key={r.title} 
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-900 border border-slate-850 flex items-center justify-center">
                      <Icon name="play_arrow" className="text-blue-400" filled />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{r.title}</p>
                      <p className="text-[12px] text-slate-450 font-mono">{r.date}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border border-slate-800 ${r.color}`}>{r.tag}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#1E293B] border border-slate-800 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-[20px] font-semibold text-white mb-4">Continue Learning</h3>
            <div className="rounded-xl overflow-hidden border border-slate-800 mb-4 aspect-video bg-gradient-to-br from-blue-500/10 via-[#0d1325] to-purple-500/5 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-[#2563EB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Icon name="account_tree" className="text-blue-400 text-[64px] group-hover:scale-105 transition-transform duration-300" filled />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-450">Lesson 4 of 8</p>
            <h4 className="text-[16px] font-semibold mt-1 mb-3 text-white">Graph Traversal: BFS vs DFS</h4>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-full bg-blue-500" 
              />
            </div>
            <Link to="/editor" className="block w-full text-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all">
              Resume
            </Link>
          </motion.section>
        </div>
      </div>
    </AppShell>
  );
}