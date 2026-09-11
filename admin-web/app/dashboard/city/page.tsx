'use client';


import { CityCreateDialog } from '@/components/dashboard/City/CityCreateDialog';
import { CityTable } from '@/components/dashboard/City/CityTable';
import { useCities } from '@/hooks/useCityhook';
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CityPage() {
  const { data, isLoading, error } = useCities();
  const [isCreateOpen, setIsCreateOpen] = useState(false);


  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Gen-Z Vibrant Neon Gradient Header Box */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-brand-orange/10 border border-fuchsia-500/20 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Dynamic Glowing Background Orbs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
        
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            City Management 
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-md">
            Flex and manage your localities, regions, and operational hotspots all in one clean flow.
          </p>
        </div>

        <div className="relative z-10 w-full sm:w-auto">
         <CityCreateDialog 
  isOpen={isCreateOpen} 
  onClose={() => setIsCreateOpen(false)} 
/>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 border border-fuchsia-500/20 rounded-3xl bg-card/40 backdrop-blur-xl shadow-xl">
          <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
          <p className="text-sm font-black bg-gradient-to-r from-fuchsia-500 to-brand-orange bg-clip-text text-transparent tracking-tight">Cooking up cities...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-500 shadow-xl backdrop-blur-xl">
          <AlertCircle className="w-6 h-6 shrink-0 animate-bounce" />
          <div>
            <p className="text-sm font-black">Yikes, an error occurred bestie!</p>
            <p className="text-xs mt-0.5 opacity-90">Failed to load cities from the database. Try refreshing.</p>
          </div>
        </div>
      )}

      {/* Table Data Component */}
      {data && <CityTable cities={data.data} />}
    </div>
  );
}