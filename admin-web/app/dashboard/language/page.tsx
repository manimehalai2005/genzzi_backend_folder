'use client';

import { LanguageCreateDialog } from '@/components/dashboard/language/languageCreatedialog';
import { LanguageTable } from '@/components/dashboard/language/languageTable';

import { useLanguages } from '@/hooks/useLanguagehook';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function LanguagePage() {
  const { data, isLoading, error } = useLanguages();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading languages matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading languages: {error.message}
      </div>
    );
  }

  const languages = data?.data || [];

  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Languages Management
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage system languages, native options, and localization translations seamlessly.
          </p>
        </div>
        
        {/* Create Language Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <LanguageCreateDialog />
        </div>
      </div>

      {/* Language Data Table - Fixed prop name from languages to data */}
      <LanguageTable 
  data={languages} 
  onEdit={(lang) => console.log(lang)} 
  onDelete={(id) => console.log(id)} 
/>
    </div>
  );
}