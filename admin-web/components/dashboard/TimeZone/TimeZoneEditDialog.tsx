'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

import { useUpdateTimezone } from '@/hooks/useTimezone';
import { TimezoneEditDialogProps } from '@/interface/TimeZone/TimeZoneEditProps';

export function TimezoneEditDialog({ timezone, open, onOpenChange }: TimezoneEditDialogProps) {
  const [name, setName] = useState('');
  const [utcOffset, setUtcOffset] = useState('');
  const [error, setError] = useState('');

  const { mutateAsync: updateTimezone, isPending: isUpdating } = useUpdateTimezone();

  useEffect(() => {
    if (timezone) {
      setName(timezone.name || '');
      setUtcOffset(timezone.utcOffset || '');
      setError('');
    }
  }, [timezone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timezone) return;
    setError('');

    try {
      await updateTimezone({
        id: timezone.id,
        dto: { 
          name, 
          utcOffset,
        },
      });
      onOpenChange(false);
      toast.success('Timezone updated successfully! 🕒');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update timezone';
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
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
            Edit Timezone: {timezone?.name}
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify global offset configurations and timezone names.
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
            <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Timezone Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Asia/Kolkata"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-utcOffset" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              UTC Offset <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-utcOffset"
              value={utcOffset}
              onChange={(e) => setUtcOffset(e.target.value)}
              required
              placeholder="+5:30"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium font-mono"
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