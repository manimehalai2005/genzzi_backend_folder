'use client';

import { useState } from 'react';
import { useDepartments } from '@/hooks/useDepartmenthook';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles, Building2, AlertCircle } from 'lucide-react';
import { DepartmentCreateDialog } from '@/components/dashboard/Department/DepartmentCreateDialog';
import { DepartmentTable } from '@/components/dashboard/Department/DepartmentTable';

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useDepartments();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading academic departments matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading departments. Please try again later.
      </div>
    );
  }

  const departmentsList = data?.data || [];
  const meta = data?.meta || { total: departmentsList.length, page: 1, limit: 10, totalPages: 1 };

  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Departments Management 
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage academic departments, structural codes, and details seamlessly.
          </p>
        </div>
        
        {/* Create Department Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <DepartmentCreateDialog />
        </div>
      </div>

      {/* Department Data Table */}
      <DepartmentTable data={departmentsList} />

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border/40 text-sm">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Showing page <span className="font-bold text-foreground">{meta.page}</span> of{' '}
            <span className="font-bold text-foreground">{meta.totalPages}</span>
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={meta.page <= 1}
              className="h-10 rounded-xl border-border/85 bg-background/50 hover:bg-muted/50 font-bold text-xs"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous 
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
              disabled={meta.page >= meta.totalPages}
              className="h-10 rounded-xl border-border/85 bg-background/50 hover:bg-muted/50 font-bold text-xs"
            >
              Next  <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}