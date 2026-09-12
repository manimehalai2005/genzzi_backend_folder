'use client';

import { useCurrencies } from '@/hooks/useCurrencyhook';
import { CurrencyCreateDialog } from '@/components/dashboard/currency/CurrencyCreateDialog';
import { CurrencyTable } from '@/components/dashboard/currency/CurrencyTable';
import { Sparkles, Coins, AlertCircle } from 'lucide-react';

export default function CurrencyPage() {
  const { data, isLoading, error } = useCurrencies();

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 bg-card/95 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 animate-spin text-fuchsia-500" />
        Loading financial matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-3xl shadow-xl flex items-center gap-3 font-bold text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        Error loading currencies: {error.message}
      </div>
    );
  }

  const currencies = data?.data || [];

  return (
    <div className="bg-card/95 border border-border/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
         
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Currencies Management 
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Manage system currencies and exchange details seamlessly.
          </p>
        </div>
        
        {/* Create Currency Dialog Modal Trigger */}
        <div className="w-full sm:w-auto">
          <CurrencyCreateDialog />
        </div>
      </div>

      {/* Currency Data Table */}
      <CurrencyTable data={currencies} />
    </div>
  );
}