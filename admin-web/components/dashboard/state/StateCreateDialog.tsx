'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AlertCircle, Plus } from 'lucide-react';

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

import { useCountries } from '@/hooks/useCountryhook';
import { useCreateState } from '@/hooks/useStatehokk';

export function StateCreateDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    countryId: '',
  });

  const [error, setError] = useState('');

  const { mutateAsync: createState, isPending: isCreating } = useCreateState();

  const { data: countriesData, isLoading: countriesLoading } = useCountries(
    1,
    100,
  );

  const countriesList = Array.isArray((countriesData as any)?.data?.data)
    ? (countriesData as any).data.data
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim()) {
      setError('State name is required');
      toast.error('State name is required');
      return;
    }
    if (!formData.countryId) {
      setError('Please select a country');
      toast.error('Please select a country');
      return;
    }

    try {
      await createState({
        name: formData.name.trim(),
        code: formData.code.trim() || undefined,
        countryId: formData.countryId,
      });

      // Reset form
      setFormData({
        name: '',
        code: '',
        countryId: '',
      });

      // Clear error
      setError('');

      // Close dialog
      setOpen(false);

      // Success message
      toast.success('State created successfully! 🚀');
    } catch (err: any) {
      console.error('Failed to create state:', err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to create state';

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value && !isCreating) {
      setFormData({
        name: '',
        code: '',
        countryId: '',
      });

      setError('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* =================================
          ADD STATE BUTTON
      ================================= */}

      <DialogTrigger
        render={
          <Button
            type="button"
            className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto"
          />
        }
      >
        <Plus className="w-4 h-4" />

        Add State
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
          border-border/40
          bg-card/95
          p-6
          shadow-2xl
          backdrop-blur-2xl
          duration-200
          sm:p-7
          max-h-[90vh]
          overflow-y-auto
          modal-scrollbar
        "
      >
        {/* Mobile top indicator */}
        <div
          className="
            mx-auto
            mb-[-8px]
            h-1.5
            w-12
            rounded-full
            bg-fuchsia-500/30
            sm:hidden
          "
        />

        {/* =================================
            HEADER
        ================================= */}

        <DialogHeader
          className="
            space-y-1.5
            text-center
            sm:text-left
          "
        >
          <DialogTitle
            className="
              text-xl
              font-black
              tracking-tight
              sm:text-2xl
              bg-gradient-to-r
              from-foreground
              via-fuchsia-400
              to-brand-orange
              bg-clip-text
              text-transparent
            "
          >
            Add New State
          </DialogTitle>

          <p
            className="
              text-xs
              font-medium
              text-muted-foreground
            "
          >
            Setup system administrative territory nodes and country relations.
          </p>
        </DialogHeader>

        {error && (
          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-rose-500/20
              bg-rose-500/10
              p-3
              text-xs
              font-bold
              text-rose-500
            "
          >
            <AlertCircle
              className="
                h-4
                w-4
                shrink-0
              "
            />

            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              State Name <span className="text-fuchsia-500">*</span>
            </Label>

            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Tamil Nadu"
              required
              className="
                h-11
                w-full
                rounded-xl
                border-border/80
                bg-background/60
                text-sm
                font-medium
                focus-visible:ring-2
                focus-visible:ring-fuchsia-500
              "
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="code"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              State Code
            </Label>

            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. TN"
              className="
                h-11
                w-full
                rounded-xl
                border-border/80
                bg-background/60
                text-sm
                font-medium
                uppercase
                focus-visible:ring-2
                focus-visible:ring-fuchsia-500
              "
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="countryId"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              Country <span className="text-fuchsia-500">*</span>
            </Label>

            <select
              id="countryId"
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              required
              disabled={countriesLoading}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-border/80
                bg-background/60
                px-3
                text-sm
                font-medium
                text-foreground
                outline-none
                focus:ring-2
                focus:ring-fuchsia-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <option value="">
                {countriesLoading
                  ? 'Loading countries...'
                  : 'Select a country...'}
              </option>

              {countriesList.map((country: any) => (
                <option
                  key={country.id}
                  value={country.id}
                  className="
                      bg-card
                      text-foreground
                    "
                >
                  {country.emoji ? `${country.emoji} ` : ''}
                  {country.name}
                </option>
              ))}
            </select>

            {/* Optional empty message */}
            {!countriesLoading && countriesList.length === 0 && (
              <p className="text-xs text-rose-500">No countries available.</p>
            )}
          </div>
=

          <div
            className="
              flex
              flex-col-reverse
              justify-end
              gap-2.5
              border-t
              border-border/40
              pt-4
              sm:flex-row
            "
          >
            {/* CANCEL */}

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
              className="
                h-11
                w-full
                rounded-xl
                border-border/80
                bg-background/50
                font-bold
                hover:bg-muted/50
                sm:w-auto
              "
            >
              Cancel
            </Button>

            {/* SAVE */}

            <Button
              type="submit"
              disabled={isCreating || countriesLoading}
              className="
                h-11
                w-full
                rounded-xl
                bg-gradient-to-r
                from-fuchsia-500
                to-brand-orange
                font-bold
                text-white
                shadow-lg
                shadow-fuchsia-500/25
                transition-all
                hover:opacity-95
                sm:w-auto
              "
            >
              {isCreating ? 'Saving...' : 'Save State'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
