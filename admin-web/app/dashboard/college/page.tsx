'use client';

import { useState } from 'react';
import { useColleges } from '@/hooks/useCollegehook';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { CollegeCreateDialog } from '@/components/dashboard/College/CollegeCreateDialog';
import { CollegeTable } from '@/components/dashboard/College/CollegeTable';

export default function CollegesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useColleges();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 border border-fuchsia-500/20 rounded-3xl bg-card/40 backdrop-blur-xl shadow-xl max-w-7xl mx-auto my-8">
        <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
        <p className="text-sm font-black bg-gradient-to-r from-fuchsia-500 to-brand-orange bg-clip-text text-transparent tracking-tight">Cooking up colleges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-500 shadow-xl backdrop-blur-xl max-w-7xl mx-auto my-8">
        <AlertCircle className="w-6 h-6 shrink-0 animate-bounce" />
        <div>
          <p className="text-sm font-black">Yikes, an error occurred bestie!</p>
          <p className="text-xs mt-0.5 opacity-90">Failed to load colleges from the database. Try refreshing.</p>
        </div>
      </div>
    );
  }

  const collegesList = data?.data || [];
  const meta = data?.meta || { total: collegesList.length, page: 1, limit: 10, totalPages: 1 };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-brand-orange/10 border border-fuchsia-500/20 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
         
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Colleges Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-md">
            Manage academic institutions, affiliations, and details all in one streamlined flow.
          </p>
        </div>

        <div className="relative z-10 w-full sm:w-auto">
          <CollegeCreateDialog />
        </div>
      </div>

      <CollegeTable colleges={collegesList} />

      {meta.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 bg-card/40 border border-border/40 p-5 rounded-3xl backdrop-blur-xl shadow-lg">
          <p className="text-xs sm:text-sm text-muted-foreground font-bold">
            Showing page <span className="text-fuchsia-400 font-black">{meta.page}</span> of{' '}
            <span className="text-foreground font-black">{meta.totalPages}</span>
          </p>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={meta.page <= 1}
              className="h-10 rounded-2xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold text-xs"
            >
              <ChevronLeft className="w-4 h-4 mr-1 text-fuchsia-400" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
              disabled={meta.page >= meta.totalPages}
              className="h-10 rounded-2xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold text-xs"
            >
              Next <ChevronRight className="w-4 h-4 ml-1 text-fuchsia-400" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}