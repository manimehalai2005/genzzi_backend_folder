'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUpdateCurrency } from '@/hooks/useCurrencyhook';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, AlertCircle } from 'lucide-react';
import { CurrencyEditDialogProps } from '@/interface/Currency/CurrencyEditProps';

export function CurrencyEditDialog({ currency, open, onOpenChange }: CurrencyEditDialogProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  const { mutateAsync: updateCurrency, isPending: isUpdating } = useUpdateCurrency();

  useEffect(() => {
    if (currency) {
      setName(currency.name || '');
      setSymbol(currency.symbol || '');
    }
  }, [currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currency) return;
    setError('');

    try {
      await updateCurrency({
        code: currency.code,
        dto: { name, symbol },
      });
      onOpenChange(false);
      toast.success('Currency updated successfully! 💾');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update currency';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="
          fixed
          left-1/2
          top-1/2
          z-50
          grid
          w-[calc(100vw-2rem)]
          max-w-[480px]
          -translate-x-1/2
          -translate-y-1/2
          gap-5
          rounded-3xl
          bg-card/95
          border-border/40
          p-6
          sm:p-7
          shadow-2xl
          backdrop-blur-2xl
          duration-200
          max-h-[90vh]
          overflow-y-auto
          modal-scrollbar
        "
      >
        {/* Mobile top indicator bar */}
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit Currency: {currency?.code}
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Update properties and status configuration for this currency node.
          </p>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label 
              htmlFor="edit-name" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Currency Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="edit-symbol" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Symbol
            </Label>
            <Input
              id="edit-symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}