'use client';

import { SkillCreateDialog } from '@/components/dashboard/Skill/SkillCreateDialog';
import { SkillTable } from '@/components/dashboard/Skill/SkillTable';
import { useSkills } from '@/hooks/useSkillhook';
import { Sparkles, Cpu, AlertCircle } from 'lucide-react';
import { Skill } from '@/typess/Skill';

export default function SkillsPage() {
  const { data, isLoading, error } = useSkills();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading skills matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading skills data.
      </div>
    );
  }

  // Safely extract skills list handling both array and object responses
  const rawData = data as any;
  const skillsList: Skill[] = Array.isArray(rawData) 
    ? rawData 
    : rawData?.data || [];

  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Skills Management <Cpu className="w-6 h-6 text-fuchsia-500 shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage master technical skills data, categories, and attributes for your platform.
          </p>
        </div>
        
        {/* Create Skill Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <SkillCreateDialog />
        </div>
      </div>

      {/* Skill Data Table */}
      <SkillTable data={skillsList}/>
    </div>
  );
}