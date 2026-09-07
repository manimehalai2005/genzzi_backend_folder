'use client';

import { CountryCreateDialog } from '@/components/dashboard/Country/Country-create-dialog';
import { CountryTable } from '@/components/dashboard/Country/Country-table';
import { Sparkles, Globe2 } from 'lucide-react';

export default function CountryPage() {
  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
         
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Country Management 
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage countries, ISO codes, phone prefixes, and status configurations seamlessly.
          </p>
        </div>
        
        {/* Create Country Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <CountryCreateDialog />
        </div>
      </div>

      {/* Country Data Table (Includes Edit Modal & Delete functionality) */}
      <CountryTable />
    </div>
  );
}