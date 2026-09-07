'use client';

import ThemeToggler from '@/Helper/ThemeToggler';
import { Sparkles, Command } from 'lucide-react';

export function Header() {
  return (
    <header className="h-23 px-4 sm:px-8 bg-card/80 border-b border-border/40 backdrop-blur-2xl flex items-center justify-between sticky top-0 z-40 transition-all shadow-sm">
      <div className="flex items-center gap-3">
       
        <div>
         
          <h1 className="text-2xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-500 to-brand-orange bg-clip-text text-transparent capitalize">
            Welcome Back
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        
          <ThemeToggler />
       
      </div>
    </header>
  );
}