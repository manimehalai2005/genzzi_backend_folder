'use client';

import { IndustryCreateDialog } from '@/components/dashboard/Industries/IndustriecreateDialog';
import { IndustryTable } from '@/components/dashboard/Industries/Industriestable';
import { useIndustries } from '@/hooks/useIndustrieshook';
import { Sparkles, Building2, AlertCircle } from 'lucide-react';

export default function IndustriesPage() {
  const { data, isLoading, error } = useIndustries();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading industries matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading industries. Please try again later.
      </div>
    );
  }

  const industriesList = data?.data || [];

  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
         
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Industries Management 
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage master industries database for your application seamlessly.
          </p>
        </div>
        
        {/* Create Industry Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <IndustryCreateDialog />
        </div>
      </div>

      {/* Industry Data Table */}
      <IndustryTable industries={industriesList} />
    </div>
  );
}