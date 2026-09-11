'use client';

import { CountryCreateDialog } from '@/components/dashboard/Country/Country-create-dialog';
import { CountryTable } from '@/components/dashboard/Country/Country-table';
import { useCountries } from '@/hooks/useCountryhook';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function CountryPage() {
  const { data, isLoading, error } = useCountries();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading country matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading countries: {error.message}
      </div>
    );
  }

  const countries = data?.data || [];

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

      {/* Country Data Table */}
      <CountryTable data={countries} />
    </div>
  );
}