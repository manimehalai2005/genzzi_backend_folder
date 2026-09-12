'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Globe,
  Map,
  MapPin,
  Languages,
  Coins,
  Clock,
  Sparkles,
  Building2,
  GraduationCap,
  School,
  Award,
  FileType,
  Share2,
  Landmark,
  Building,
  Network,
  Menu,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard/country', label: 'Country', icon: Globe },
  { href: '/dashboard/state', label: 'State', icon: Map },
  { href: '/dashboard/city', label: 'City', icon: MapPin },
  { href: '/dashboard/language', label: 'Language', icon: Languages },
  { href: '/dashboard/currency', label: 'Currency', icon: Coins },
  { href: '/dashboard/timezone', label: 'Timezone', icon: Clock },
  { href: '/dashboard/skill', label: 'Skill', icon: Sparkles },
  { href: '/dashboard/industry', label: 'Industries', icon: Building2 },
  { href: '/dashboard/degree', label: 'Degree', icon: GraduationCap },
  { href: '/dashboard/university', label: 'University', icon: School },
  {
    href: '/dashboard/certification-provider',
    label: 'Certification Provider',
    icon: Award,
  },
  { href: '/dashboard/filetype', label: 'File Type', icon: FileType },
  {
    href: '/dashboard/social-platform',
    label: 'Social Platform',
    icon: Share2,
  },
  { href: '/dashboard/college', label: 'College', icon: Landmark },
  { href: '/dashboard/department', label: 'Department', icon: Building },
  {
    href: '/dashboard/college-department',
    label: 'College Department',
    icon: Network,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-card/80 border-b border-border/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-2.5">
          <div className="bg-gradient-to-tr from-fuchsia-500 to-brand-orange text-white p-2 rounded-2xl font-black text-lg shadow-lg shadow-fuchsia-500/25">
            MD
          </div>
          <span className="font-black text-foreground tracking-tight text-lg bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Master Data
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-2 rounded-xl bg-background/50 border border-border/40 text-foreground hover:bg-fuchsia-500/10 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5 text-fuchsia-500" /> : <Menu className="w-5 h-5 text-fuchsia-500" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-card/95 border-r border-border/40 backdrop-blur-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none md:static md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Logo Section */}
          <div className="p-6 border-b border-border/40 hidden md:flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-fuchsia-500 to-brand-orange text-white p-2.5 rounded-2xl font-black text-xs shadow-lg shadow-fuchsia-500/25">
              MD
            </div>
            <div>
              <span className="font-black text-foreground tracking-tight text-lg bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent block">
                Master Data
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 text-fuchsia-500" /> Control Hub
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1.5 h-[calc(100vh-140px)] overflow-y-auto modal-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-lg font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-fuchsia-500/15 to-brand-orange/10 text-fuchsia-500 border border-fuchsia-500/20 shadow-sm'
                      : 'text-muted-foreground hover:bg-fuchsia-500/5 hover:text-foreground'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 stroke-[2.5] ${
                      isActive ? 'text-fuchsia-500' : 'text-muted-foreground'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-border/40 flex items-center space-x-3 bg-background/30 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-brand-orange text-white flex items-center justify-center font-black text-sm shadow-md shadow-fuchsia-500/20 shrink-0">
            A
          </div>
          <div className="text-xs overflow-hidden">
            <p className="font-black text-foreground truncate tracking-tight">
              Admin User
            </p>
            <p className="text-muted-foreground font-medium truncate">admin@app.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}