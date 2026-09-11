'use client';

import { useState } from 'react';
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
import { Plus } from 'lucide-react';
import { useCreateCertificationProvider } from '@/hooks/useCertificationprovider';
import { toast } from 'sonner';

export function CertificationProviderCreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');

  const { mutateAsync: createProvider, isPending: isCreating } =
    useCreateCertificationProvider();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProvider({
        name,
        website: website || undefined,
      });
      setName('');
      setWebsite('');
      setOpen(false);
      toast.success('Certification provider created successfully! ✨');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create certification provider');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all gap-2 w-full sm:w-auto"
            type="button"
          />
        }
      >
        <Plus className="w-4 h-4" />
        Add Provider
      </DialogTrigger>
      
      <DialogContent className="w-[92%] sm:max-w-[425px] max-h-[85vh] overflow-y-auto rounded-2xl bg-card border-border/50 backdrop-blur-xl p-6 modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold brand-gradient-text">
            Create Certification Provider
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label
              className="text-foreground/90 font-medium text-xs sm:text-sm"
              htmlFor="create-name"
            >
              Provider Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="create-name"
              placeholder="e.g. AWS, Microsoft"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border text-sm sm:text-base focus-visible:ring-brand-orange h-11 sm:h-10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-foreground/90 font-medium text-xs sm:text-sm"
              htmlFor="create-website"
            >
              Website
            </Label>
            <Input
              id="create-website"
              placeholder="https://aws.amazon.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange text-sm sm:text-base h-11 sm:h-10"
            />
          </div>

          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto h-11 sm:h-10 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all w-full sm:w-auto h-11 sm:h-10 text-sm"
            >
              {isCreating ? 'Creating...' : 'Create Provider'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}