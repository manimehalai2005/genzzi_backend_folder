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
  DialogFooter,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Plus, Sparkles } from 'lucide-react';

import { useCreateCity } from '@/hooks/useCityhook';
import { useStates } from '@/hooks/useStatehokk';

export function CityCreateDialog() {
  const [open, setOpen] = useState(false);

  const [cityName, setCityName] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const {
    data: statesData,
    isLoading: statesLoading,
  } = useStates(1, 100);

  const {
    mutateAsync: createCity,
    isPending: isCreating,
  } = useCreateCity();
  const statesList = Array.isArray(
    (statesData as any)?.data?.data,
  )
    ? (statesData as any).data.data
    : Array.isArray((statesData as any)?.data)
      ? (statesData as any).data
      : Array.isArray(statesData)
        ? statesData
        : [];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!cityName.trim()) {
      toast.error('City name is required');
      return;
    }

    if (!selectedStateId) {
      toast.error('Please select a state');
      return;
    }

    try {
      await createCity({
        name: cityName.trim(),
        stateId: selectedStateId,
      });

      toast.success('City created successfully! ✨');

      // Reset
      setCityName('');
      setSelectedStateId('');

      // Close
      setOpen(false);
    } catch (error: any) {
      console.error('Failed to create city:', error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to create city',
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
     

      <DialogTrigger
        render={
          <Button
            type="button"
            className="h-11 w-full gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange px-5 font-black text-white shadow-lg shadow-fuchsia-500/25 transition-all hover:opacity-95 sm:w-auto"
          />
        }
      >
        <Plus className="h-4 w-4 stroke-[3]" />

        Add City
      </DialogTrigger>


      <DialogContent
        className="
          w-[92%]
          max-w-[425px]
          rounded-2xl
          border-border/50
          bg-card
          p-6
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="brand-gradient-text text-lg font-bold sm:text-xl">
            Create New City
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 py-2"
        >
 

          <div className="space-y-2">
            <Label className="text-xs font-medium text-foreground/90 sm:text-sm">
              City Name{' '}
              <span className="text-fuchsia-500">
                *
              </span>
            </Label>

            <Input
              type="text"
              placeholder="Enter city name..."
              value={cityName}
              onChange={(e) =>
                setCityName(e.target.value)
              }
              className="h-11 bg-background/50 text-sm sm:h-10 sm:text-base"
              disabled={isCreating}
              required
            />
          </div>


          <div className="space-y-2">
            <Label
              htmlFor="stateId"
              className="text-xs font-medium text-foreground/90 sm:text-sm"
            >
              State{' '}
              <span className="text-fuchsia-500">
                *
              </span>
            </Label>

            <select
              id="stateId"
              name="stateId"
              value={selectedStateId}
              onChange={(e) =>
                setSelectedStateId(e.target.value)
              }
              disabled={
                isCreating || statesLoading
              }
              required
              className="
                h-11
                w-full
                rounded-xl
                border
                border-border
                bg-background/50
                px-3
                text-sm
                text-foreground
                outline-none
                transition
                focus:border-fuchsia-500
                focus:ring-2
                focus:ring-fuchsia-500
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:h-10
              "
            >
              <option value="">
                {statesLoading
                  ? 'Loading states...'
                  : 'Select a state'}
              </option>

              {statesList.map(
                (state: any) => (
                  <option
                    key={state.id}
                    value={state.id}
                  >
                    {state.name}
                  </option>
                ),
              )}
            </select>
          </div>


          <DialogFooter className="flex flex-col-reverse gap-2 pt-4 sm:flex-row">
          

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
              className="h-11 w-full text-sm sm:h-10 sm:w-auto"
            >
              Cancel
            </Button>

            {/* CREATE */}

            <Button
              type="submit"
              disabled={
                isCreating ||
                statesLoading ||
                !cityName.trim() ||
                !selectedStateId
              }
              className="brand-gradient h-11 w-full border-0 text-sm text-white sm:h-10 sm:w-auto"
            >
              {isCreating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create City'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}