'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {Popover,PopoverContent,PopoverTrigger,} from '@/components/ui/popover';
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,} from '@/components/ui/command';
import { cn } from '@/lib/utils';

import { useCountries } from '@/hooks/useCountryhook';
import { AlertCircle, Check, ChevronsUpDown } from 'lucide-react';
import { useUpdateState } from '@/hooks/useStatehokk';
import { StateEditDialogProps } from '@/interface/State/StateEditProps';

export function StateEditDialog({ state, isOpen, onClose }: StateEditDialogProps) {
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    countryId: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const { mutateAsync: updateState, isPending: isUpdating } = useUpdateState();
  const { data: countriesData } = useCountries(1, 100);

  const countriesList = countriesData?.data || [];
  const selectedCountry = countriesList.find((c) => String(c.id) === String(formData.countryId));

  useEffect(() => {
    if (state) {
      setFormData({
        name: state.name || '',
        code: state.code || '',
        countryId: state.countryId ? String(state.countryId) : ''
      });
      setErrorMessage('');
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state?.id) return;
    setErrorMessage('');

    try {
      await updateState({
        id: state.id,
        dto: {
          name: formData.name,
          code: formData.code || undefined,
          countryId: formData.countryId,
        },
      });
      onClose();
      toast.success('State updated successfully! ✨');
    } catch (error: any) {
      console.error('Failed to update state:', error);
      const msg = error?.message || 'Failed to update state. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit State: {state?.name} 
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify territory boundaries, codes, and country mappings.
          </p>
        </DialogHeader>

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
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
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
            />
          </div>

          <div className="space-y-1.5 flex flex-col">
            <Label 
              htmlFor="countryId" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Country
            </Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="h-11 w-full justify-between rounded-xl bg-background/60 border-border/80 px-3 text-sm font-medium text-foreground hover:bg-background/80 focus:ring-2 focus:ring-fuchsia-500"
                >
                  {selectedCountry ? selectedCountry.name : "Select Country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl bg-card border-border/40 shadow-2xl backdrop-blur-2xl">
                <Command>
                  <CommandInput placeholder="Search country..." className="h-10 text-sm font-medium" />
                  <CommandList className="max-h-60 p-1">
                    <CommandEmpty className="py-6 text-center text-xs text-muted-foreground font-medium">
                      No country found.
                    </CommandEmpty>
                    <CommandGroup>
                      {countriesList.map((country) => (
                        <CommandItem
                          key={country.id}
                          value={country.name}
                          onSelect={() => {
                            setFormData((prev) => ({ ...prev, countryId: String(country.id) }));
                            setComboboxOpen(false);
                          }}
                          className="flex items-center justify-between text-sm font-medium rounded-xl px-3 py-2 cursor-pointer hover:bg-fuchsia-500/10 aria-selected:bg-fuchsia-500/15"
                        >
                          {country.name}
                          <Check
                            className={cn(
                              "h-4 w-4 text-fuchsia-500",
                              String(formData.countryId) === String(country.id) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onClose()}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel 
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Updating...' : 'Update '}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}