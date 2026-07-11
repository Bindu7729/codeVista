import { useExecutionStore } from '../store/useExecutionStore';

export default function LanguageSelector() {
  const { language, setLanguage, templateId, setTemplate } = useExecutionStore();

  const languages = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'csharp', name: 'C#' }
  ];

  const templates = [
    { id: 'binary_search', name: 'Binary Search (Array)' },
    { id: 'bubble_sort', name: 'Bubble Sort (Array)' },
    { id: 'linked_list', name: 'Linked List (Nodes)' },
    { id: 'stack_operations', name: 'Stack (Push / Pop)' },
    { id: 'queue_operations', name: 'Queue (Enqueue / Dequeue)' },
    { id: 'bst_operations', name: 'BST Traversal (Trees)' },
    { id: 'graph_dfs', name: 'DFS Traversal (Graphs)' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 bg-[#1E293B]/40 border border-slate-800 p-3.5 rounded-xl shrink-0 font-sans w-full">
      
      {/* 1. Language selector field */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Language:</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#0F172A] border border-slate-800 rounded-lg text-slate-200 text-xs py-1.5 px-3 outline-none focus:border-blue-500/50 cursor-pointer font-medium"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Algorithm template selector field */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Algorithm:</span>
        <select
          value={templateId}
          onChange={(e) => setTemplate(e.target.value)}
          className="bg-[#0F172A] border border-slate-800 rounded-lg text-slate-200 text-xs py-1.5 px-3 outline-none focus:border-purple-500/50 cursor-pointer font-medium"
        >
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.id}>
              {tpl.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
