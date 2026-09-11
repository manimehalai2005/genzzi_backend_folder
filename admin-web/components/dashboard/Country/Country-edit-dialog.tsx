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


import { Sparkles } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateCountry } from '@/hooks/useCountryhook';
import { CountryEditDialogProps } from '@/interface/Country/CountryEditProps';

export function CountryEditDialog({
  country,
  open,
  onOpenChange,
}: CountryEditDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    iso2: '',
    iso3: '',
    phoneCode: '',
    currencyCode: '',
    emoji: '',
    status: 'Published',
  });

  const { mutateAsync: updateCountry, isPending: isUpdating } = useUpdateCountry();

  useEffect(() => {
    if (country) {
      setFormData({
        name: country.name || '',
        iso2: country.iso2 || '',
        iso3: country.iso3 || '',
        phoneCode: country.phoneCode || '',
        currencyCode: country.currencyCode || '',
        emoji: country.emoji || '',
        status: country.status || 'Published',
      });
    }
  }, [country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country?.id || !formData.name) return;

    try {
      await updateCountry({
        id: country.id,
        dto: formData,
      });
      onOpenChange(false);
      toast.success('Country updated successfully! 🚀');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update country';
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black tracking-wide w-fit mx-auto sm:mx-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Edit Portal
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit Country 🌍
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify global telemetry codes and publishing status.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label 
                htmlFor="edit-name" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Country Name <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="edit-iso2" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                ISO2 Code <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="edit-iso2"
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
                htmlFor="edit-iso3" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                ISO3 Code <span className="text-fuchsia-500">*</span>
              </Label>
              <Input
                id="edit-iso3"
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
                htmlFor="edit-phoneCode" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Phone Code
              </Label>
              <Input
                id="edit-phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="edit-currencyCode" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Currency Code
              </Label>
              <Input
                id="edit-currencyCode"
                name="currencyCode"
                value={formData.currencyCode}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="edit-emoji" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Flag Emoji
              </Label>
              <Input
                id="edit-emoji"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label 
                htmlFor="edit-status" 
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Status
              </Label>
              <Select 
                value={formData.status || 'Published'} 
                onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val as any }))}
              >
                <SelectTrigger
                  id="edit-status"
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border
                    border-border/80
                    bg-background/60
                    px-3
                    text-sm
                    font-medium
                    text-foreground
                    focus:ring-2
                    focus:ring-fuchsia-500
                  "
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent
                  sideOffset={6}
                  className="
                    z-[100]
                    rounded-2xl
                    border-border/50
                    bg-card/95
                    backdrop-blur-xl
                    shadow-xl
                    p-1.5
                  "
                >
                  <SelectItem value="Published" className="w-full cursor-pointer rounded-xl py-2.5 px-3 font-medium text-emerald-500">
                    🟢 Published
                  </SelectItem>
                  <SelectItem value="Draft" className="w-full cursor-pointer rounded-xl py-2.5 px-3 font-medium text-amber-500">
                    🟡 Draft
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel ✋
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Updating...' : 'Update Country 🚀'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}