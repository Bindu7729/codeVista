import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { AppShell } from '../../components/SideNav';

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
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full text-left bg-[#070b13]">
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">Welcome back</p>
          <h2 className="text-[32px] font-semibold tracking-tight text-white">Hello, User</h2>
          <p className="text-slate-400 text-[14px] mt-1">Pick up where you left off, or start a fresh session.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0b0f19] border border-white/10 rounded-lg p-5 hover:border-white/25 transition-all group">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-purple-400 transition-colors mb-2">{s.label}</p>
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
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${s.progress}%` }} />
                  </div>
                )}
                {s.bars && (
                  <div className="flex gap-1">
                    {Array.from({ length: s.bars }).map((_, i) => (
                      <div key={i} className="h-1 flex-1 bg-purple-500 rounded-full" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-[#0b0f19] border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-semibold text-white">Recent Sessions</h3>
              <Link to="/library" className="text-[11px] uppercase tracking-wider font-semibold text-purple-400 hover:text-white transition-colors flex items-center gap-1">
                View All <Icon name="arrow_forward" className="text-[14px]" />
              </Link>
            </div>
            <ul className="divide-y divide-white/5">
              {recent.map((r) => (
                <li key={r.title} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#111625] border border-white/10 flex items-center justify-center">
                      <Icon name="play_arrow" className="text-purple-400" filled />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{r.title}</p>
                      <p className="text-[12px] text-slate-400 font-mono">{r.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${r.color}`}>{r.tag}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-[#0b0f19] border border-white/10 rounded-lg p-6">
            <h3 className="text-[20px] font-semibold text-white mb-4">Continue Learning</h3>
            <div className="rounded-lg overflow-hidden border border-white/10 mb-4 aspect-video bg-gradient-to-br from-purple-500/20 via-[#0d1325] to-emerald-500/10 flex items-center justify-center">
              <Icon name="account_tree" className="text-purple-400 text-[64px]" filled />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Lesson 4 of 8</p>
            <h4 className="text-[16px] font-semibold mt-1 mb-3 text-white">Graph Traversal: BFS vs DFS</h4>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-purple-500 w-1/2" />
            </div>
            <Link to="/editor" className="block w-full text-center py-2 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] uppercase tracking-wider font-semibold hover:bg-purple-500/30 transition-all">
              Resume
            </Link>
          </section>
        </div>
      </div>
    </AppShell>
  );
}