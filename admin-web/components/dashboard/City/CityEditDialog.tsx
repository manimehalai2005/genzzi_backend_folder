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

  const { data: statesData, isLoading: statesLoading } = useStates(1, 100);
  const statesList = Array.isArray((statesData as any)?.data?.data)
    ? (statesData as any).data.data
    : Array.isArray((statesData as any)?.data)
      ? (statesData as any).data
      : Array.isArray(statesData)
        ? statesData
        : [];

  useEffect(() => {
    if (city) {
      setName(city.name || '');
      setStateId(city.stateId || '');
      setError('');
    }
  }, [city]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city) return;

    setError('');

    if (!name.trim()) {
      setError('City name is required.');
      return;
    }

    if (!stateId) {
      setError('Please select a state.');
      return;
    }

    try {
      await updateCity({
        id: city.id,

        dto: {
          name: name.trim(),
          stateId,
        },
      });

      toast.success('City updated successfully! ✨');

      onClose();
    } catch (err: any) {
      console.error('Failed to update city:', err);

      const errorMessage =
        err?.response?.data?.message || err?.message || 'Failed to update city';

      setError(errorMessage);

      toast.error(errorMessage);
    }
  };

  if (!city) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
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
        <DialogHeader className="space-y-1 pb-1 text-center sm:text-left">
          {/* Mobile indicator */}

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
            Modify city name and state region.
          </p>
        </DialogHeader>

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

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-city-name"
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
              id="edit-city-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
              disabled={isUpdating}
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
              onValueChange={(value: any) => {
                setStateId(value);
                setError('');
              }}
              disabled={isUpdating || statesLoading}
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
                <SelectValue
                  placeholder={
                    statesLoading ? 'Loading states...' : 'Select state region'
                  }
                />
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
                {statesList.length === 0 ? (
                  <div
                    className="
                      px-3
                      py-2.5
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {statesLoading ? 'Loading states...' : 'No states found'}
                  </div>
                ) : (
                  statesList.map((st: any) => (
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
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* =====================================
              BUTTONS
          ====================================== */}

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
            {/* CANCEL */}

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUpdating}
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

            {/* UPDATE */}

            <Button
              type="submit"
              disabled={isUpdating || statesLoading || !name.trim() || !stateId}
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
