'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Sparkles, AlertCircle } from 'lucide-react';
import { useCreateIndustry } from '@/hooks/useIndustrieshook';

export function IndustryCreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const { mutateAsync: createIndustry, isPending: isCreating } =
    useCreateIndustry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createIndustry({ name, code, description });
      setName('');
      setCode('');
      setDescription('');
      setOpen(false);
      toast.success('Industry created successfully! 🚀');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create industry';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all gap-2"
            type="button"
          />
        }
      >
        <Plus className="w-4 h-4" />
        Add Industry
      </DialogTrigger>

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
            Create New Industry
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Setup system industry classifications, codes, and descriptions.
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
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Industry Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Information Technology"
              required
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="code"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Code
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. IT"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel ✋
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isCreating ? 'Creating...' : 'Save Industry 🚀'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
