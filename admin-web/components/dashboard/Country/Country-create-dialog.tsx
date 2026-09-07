'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
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
import { useCountryMutations } from '@/hooks/useCountryhook';

export function CountryCreateDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    iso2: '',
    iso3: '',
    phoneCode: '',
    currencyCode: '',
    emoji: '',
  });

  const { createCountry, isCreating } = useCountryMutations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.iso2 || !formData.iso3) return;

    try {
      await createCountry(formData);

      setFormData({
        name: '',
        iso2: '',
        iso3: '',
        phoneCode: '',
        currencyCode: '',
        emoji: '',
      });

      setOpen(false);
    } catch (error) {
      console.error('Failed to create country:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
  render={
    <Button 
      className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto" 
    />
  }
>
  <Plus className="w-4 h-4 stroke-[3]" /> Add Country
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black tracking-wide w-fit mx-auto sm:mx-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Global Portal
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Add New Country 🌍
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Setup a new country destination with required telemetry codes.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label 
                htmlFor="name" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Country Name <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="iso2" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                ISO2 Code <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="iso2"
                name="iso2"
                maxLength={2}
                value={formData.iso2}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="iso3" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                ISO3 Code <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="iso3"
                name="iso3"
                maxLength={3}
                value={formData.iso3}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="phoneCode" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Phone Code
              </Label>
              <Input
                id="phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="currencyCode" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Currency Code
              </Label>
              <Input
                id="currencyCode"
                name="currencyCode"
                value={formData.currencyCode}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label 
                htmlFor="emoji" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Flag Emoji
              </Label>
              <Input
                id="emoji"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel 
            </Button>

            <Button
              type="submit"
              disabled={isCreating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isCreating ? "Saving..." : "Save Country"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}