'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateCity } from '@/hooks/useCityhook';

interface CityCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CityCreateDialog({ isOpen, onClose }: CityCreateDialogProps) {
  const [cityName, setCityName] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');

  // Example hook call that fetches states data
  // const { data: statesData } = useStates();
  const statesData: any = {}; // Replace with your actual hook value

  const { mutateAsync: createCity, isPending: isCreating } = useCreateCity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) {
      toast.error('City name is required');
      return;
    }

    try {
      await createCity({ name: cityName, stateId: selectedStateId });
      toast.success('City created successfully! ✨');
      setCityName('');
      setSelectedStateId('');
      onClose();
    } catch (error: any) {
      console.error('Failed to create city:', error);
      toast.error(error?.message || 'Failed to create city');
    }
  };

  // Safely normalize statesData to guarantee an array and prevent .map crashes
  const statesList = Array.isArray(statesData?.data)
    ? statesData.data
    : Array.isArray(statesData)
      ? statesData
      : [];

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
          max-w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          gap-5
          rounded-3xl
          border-border/40
          bg-card/95
          p-5
          shadow-2xl
          backdrop-blur-2xl
          duration-200
          sm:p-7
        "
      >
        <DialogHeader className="space-y-3 text-center sm:text-left">
          <DialogTitle className="text-xl font-black tracking-tight text-foreground">
            Create New City
          </DialogTitle>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Add a new city to your database and select its respective region.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              City Name
            </label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name..."
              className="
                w-full
                rounded-2xl
                border
                border-border/60
                bg-background/50
                px-4
                py-3
                text-sm
                font-medium
                text-foreground
                focus:outline-none
                focus:ring-2
                focus:ring-brand-orange
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              State
            </label>
            <select
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-border/60
                bg-background/50
                px-4
                py-3
                text-sm
                font-medium
                text-foreground
                focus:outline-none
                focus:ring-2
                focus:ring-brand-orange
              "
            >
              <option value="">Select a state</option>
              {statesList.map((state: any) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 w-full rounded-2xl border-border/80 bg-background/50 font-bold hover:bg-muted/50 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="h-11 w-full rounded-2xl bg-brand-orange font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange/90 active:scale-[0.98] sm:w-auto"
            >
              {isCreating ? 'Creating...' : 'Create City'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
