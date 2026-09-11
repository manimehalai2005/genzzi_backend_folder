'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateCity } from '@/hooks/useCityhook';
import { useStates } from '@/hooks/useStatehokk';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CityEditDialogProps } from '@/interface/City/CityEditProps';

export function CityEditDialog({ city, isOpen, onClose }: CityEditDialogProps) {
  const [name, setName] = useState('');
  const [stateId, setStateId] = useState('');

  const [error, setError] = useState('');

  const { mutateAsync: updateCity, isPending: isUpdating } = useUpdateCity();
  const { data: statesData } = useStates(1, 100);

  // Load city data when dialog opens
  useEffect(() => {
    if (city) {
      setName(city.name || '');
      setStateId(city.stateId || '');

      setError('');
    }
  }, [city]);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city) return;

    setError('');

    try {
      await updateCity({
        id: city.id,
        dto: {
          name,
          stateId,
        },
      });

      onClose();
      toast.success('City updated successfully! ✨');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update city';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (!city) return null;

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
          max-w-[440px]
          -translate-x-1/2
          -translate-y-1/2
          gap-4
          rounded-3xl
          bg-card/95
          border-border/40
          p-5
          sm:p-7
          shadow-2xl
          backdrop-blur-2xl
          duration-200
          max-h-[90vh]
          overflow-y-auto
          modal-scrollbar
        "
      >
        {/* HEADER */}
        <DialogHeader className="space-y-1 pb-1 text-center sm:text-left">
          {/* Mobile top indicator */}
          <div
            className="
              w-12
              h-1.5
              bg-brand-orange/30
              rounded-full
              mx-auto
              mb-1
              sm:hidden
            "
          />

          <DialogTitle
            className="
              text-xl
              sm:text-2xl
              font-extrabold
              tracking-tight
              brand-gradient-text
            "
          >
            Edit City Details
          </DialogTitle>

          <p className="text-xs text-muted-foreground">
            Modify region parameters & current operational status.
          </p>
        </DialogHeader>

        {/* ERROR */}
        {error && (
          <div
            className="
              rounded-2xl
              bg-destructive/10
              border
              border-destructive/20
              p-3
              text-sm
              text-destructive
              font-semibold
            "
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* CITY NAME */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-name"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              City Name <span className="text-brand-orange">*</span>
            </Label>

            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
              className="
                h-11
                w-full
                rounded-xl
                bg-background/60
                border-border/80
                focus-visible:ring-2
                focus-visible:ring-brand-orange
                text-sm
                font-medium
              "
              required
            />
          </div>

          {/* STATE REGION */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-state"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              State Region <span className="text-brand-orange">*</span>
            </Label>

            <Select
              value={stateId}
              onValueChange={(val) => setStateId(val || '')}
            >
              <SelectTrigger
                id="edit-state"
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
                  focus:ring-brand-orange
                "
              >
                <SelectValue placeholder="Select state region" />
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
                {statesData?.data?.map((st) => (
                  <SelectItem
                    key={st.id}
                    value={st.id}
                    className="
                      w-full
                      cursor-pointer
                      rounded-xl
                      py-2.5
                      px-3
                      text-sm
                      font-medium
                      truncate
                    "
                  >
                    {st.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* OPERATIONAL STATUS */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-status"
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              Operational Status
            </Label>
          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-2.5
              pt-4
              border-t
              border-border/40
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="
                h-11
                rounded-xl
                border-border/80
                bg-background/50
                hover:bg-muted/50
                font-semibold
                w-full
                sm:w-auto
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isUpdating}
              className="
                h-11
                rounded-xl
                brand-gradient
                text-white
                font-semibold
                border-0
                shadow-lg
                shadow-brand-orange/25
                hover:opacity-95
                transition-all
                w-full
                sm:w-auto
              "
            >
              {isUpdating ? 'Saving Changes...' : 'Update City'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
