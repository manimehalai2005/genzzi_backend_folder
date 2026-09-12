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
          <Button className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto" />
        }
      >
        <Plus className="w-4 h-4 stroke-[3]" /> Add Certicate
      </DialogTrigger>
      
      <DialogContent className="w-[92%] sm:max-w-[425px] max-h-[85vh] overflow-y-auto rounded-2xl bg-card border-border/50 backdrop-blur-xl p-6 modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold brand-gradient-text">
            Create Certification Provider
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm">
              Provider Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              placeholder="e.g. AWS, Microsoft"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border text-sm sm:text-base h-11 sm:h-10"
              required
            />
          </div>
           
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm">
              Code <span className="text-fuchsia-500">*</span>
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm">
              Website
            </Label>
            <Input
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
              className="brand-gradient text-white border-0 w-full sm:w-auto h-11 sm:h-10 text-sm"
            >
              {isCreating ? 'Creating...' : 'Create Provider'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}