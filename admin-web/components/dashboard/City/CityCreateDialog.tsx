"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useStates } from "@/hooks/useStatehokk";
import { useCreateCity } from "@/hooks/useCityhook";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CityCreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stateId, setStateId] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync: createCity, isPending: isCreating } = useCreateCity();
  const { data: statesData } = useStates(1, 100);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cityName = name.trim();

    if (!cityName) {
      setError("City name is required");
      return;
    }

    if (!stateId) {
      setError("Please select a state");
      return;
    }

    try {
      await createCity({
        name: cityName,
        stateId: stateId,
      });

      // Reset form
      setName("");
      setStateId("");
      setError("");

      // Close dialog
      setOpen(false);
      toast.success("City created successfully! ✨");
    } catch (err: unknown) {
      console.error("Create city error:", err);

      let errorMessage = "Failed to create city";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setStateId("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button className="w-full sm:w-auto brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20" type="button" />
        }
      >
        <Plus className="w-4 h-4 mr-2" />
        Add City
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] rounded-2xl bg-card border-border/50 backdrop-blur-xl modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold brand-gradient-text">
            Create New City
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* City Name */}
          <div className="space-y-2">
            <Label
              htmlFor="city-name"
              className="text-foreground/90 font-medium"
            >
              City Name *
            </Label>

            <Input
              id="city-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
              className="bg-background/50 border-border focus-visible:ring-brand-orange"
              required
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label
              htmlFor="city-state"
              className="text-foreground/90 font-medium"
            >
              State *
            </Label>

            <select
              id="city-state"
              name="stateId"
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background/50 p-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="" className="bg-card text-muted-foreground">
                Select State
              </option>

              {statesData?.data?.map((state) => (
                <option
                  key={state.id}
                  value={state.id}
                  className="bg-card text-foreground"
                >
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-border/40 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isCreating}
              className="border-border bg-background/50 hover:bg-muted/50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isCreating}
              className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all"
            >
              {isCreating ? "Creating..." : "Create City"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}