import {
  TrendingUp,
  ArrowRight,
  Play,
  GitBranch,
  Search,
  ArrowUpDown,
  Route,
  Braces,
  Brain,
  SlidersHorizontal,
  Gauge,
  Folder,
  ChevronRight,
  Bug,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  SkipBack,
  Pause,
  SkipForward,
  Copy,
  Lightbulb,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  trending_up: TrendingUp,
  arrow_forward: ArrowRight,
  play_arrow: Play,
  account_tree: GitBranch,
  search: Search,
  sort: ArrowUpDown,
  route: Route,
  data_object: Braces,
  memory: Brain,
  tune: SlidersHorizontal,
  speed: Gauge,
  folder: Folder,
  chevron_right: ChevronRight,
  bug_report: Bug,
  share: Share2,
  zoom_in: ZoomIn,
  zoom_out: ZoomOut,
  fit_screen: Maximize2,
  psychology: Brain,
  auto_awesome: Sparkles,
  skip_previous: SkipBack,
  pause: Pause,
  skip_next: SkipForward,
  content_copy: Copy,
  lightbulb: Lightbulb,
  function: Terminal,
};

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, className, filled }: IconProps) {
  const LucideIcon = iconMap[name];
  // SAFETY GUARD: If an icon name is missing or wrong, return null instead of crashing the app!
  if (!LucideIcon) {
    return <span className={className}>▪</span>; 
  }
  return (
    <LucideIcon
      className={className}
      fill={filled ? 'currentColor' : 'none'}
    />
  );
}