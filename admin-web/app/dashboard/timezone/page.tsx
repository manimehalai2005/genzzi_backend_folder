'use client';

import { TimezoneTable } from '@/components/dashboard/TimeZone/TimeZoneTable';
import { TimezoneCreateDialog } from '@/components/dashboard/TimeZone/TimzoneCreatedialog';
import { useTimezones } from '@/hooks/useTimezone';
import { Sparkles, Clock } from 'lucide-react';

export default function TimezonePage() {
  const { data, isLoading, error } = useTimezones();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 px-6 py-4 rounded-3xl bg-card/80 border border-border/40 backdrop-blur-2xl shadow-2xl">
          <div className="w-5 h-5 rounded-full border-2 border-fuchsia-500 border-t-transparent animate-spin" />
          <span className="text-sm font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Loading timezones...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-sm backdrop-blur-xl shadow-lg">
          Error loading timezones: {error.message}
        </div>
      </div>
    );
  }

  const timezones = data?.data || [];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-card/60 border border-border/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Gen-Z aesthetic background glow accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
         
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-500 to-brand-orange bg-clip-text text-transparent flex items-center gap-3">
            
            Timezones Management
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Manage system timezones, global coordinate offsets, and runtime configurations.
          </p>
        </div>

        <div className="relative z-10">
          <TimezoneCreateDialog />
        </div>
      </div>

      <TimezoneTable data={timezones} />
    </div>
  );
}