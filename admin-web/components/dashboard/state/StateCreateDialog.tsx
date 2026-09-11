'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Sparkles, AlertCircle, Check, ChevronsUpDown } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

import { useCountries } from '@/hooks/useCountryhook'; 
import { useCreateState } from '@/hooks/useStatehokk';

export function StateCreateDialog() {
  const [open, setOpen] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    countryId: '',
  });
  const [error, setError] = useState('');

  const { mutateAsync: createState, isPending: isCreating } = useCreateState();
  const { data: countriesData } = useCountries(1, 100);

  const countriesList = countriesData?.data || [];
  const selectedCountry = countriesList.find((c) => c.id === formData.countryId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setError('');

    try {
      await createState({
        name: formData.name,
        code: formData.code || undefined,
        countryId: formData.countryId,
      });

      setFormData({ name: '', code: '', countryId: '' });
      setOpen(false);
      toast.success('State created successfully! 🚀');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create state';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger 
      render={
        <Button 
          className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto" 
          type="button"
        />
      }
    >
      <Plus className="w-4 h-4 stroke-[3]" /> Add State 
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
            Add New State 
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Setup system administrative territory nodes and country relations.
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
              State Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. California"
              required
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="code" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              State Code
            </Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. CA"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
            />
          </div>
         <div className="space-y-1.5">
  <Label 
    htmlFor="countryId" 
    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
  >
    Country <span className="text-fuchsia-500">*</span>
  </Label>
  <select
    id="countryId"
    name="countryId"
    value={formData.countryId}
    onChange={(e) => setFormData((prev) => ({ ...prev, countryId: e.target.value }))}
    required
    className="h-11 w-full rounded-xl bg-background/60 border border-border/80 px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
  >
    <option value="" disabled>Select a country...</option>
    {countriesList.map((country) => (
      <option key={country.id} value={country.id} className="bg-card text-foreground">
        {country.name}
      </option>
    ))}
  </select>
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
              {isCreating ? "Saving..." : "Save State "}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}