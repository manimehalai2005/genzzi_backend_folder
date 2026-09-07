'use client';

import { useState } from 'react';
import { useCertificationProviderMutations } from '@/hooks/useCertificationprovider';
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

export function CertificationProviderCreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [website, setWebsite] = useState('');

  const { createProvider, isCreating } = useCertificationProviderMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProvider({
        name,
        code,
        website,
      
      });
      setName('');
      setCode('');
      setWebsite('');
      setOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to create certification provider');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger 
  render={
    <div className="inline-flex">
      <Button 
        className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all gap-2" 
        type="button"
      />
    </div>
  }
>
  <Plus className="w-4 h-4" />
  Add Provider
</DialogTrigger>
      <DialogContent className="w-[95%] max-w-[425px] rounded-2xl bg-card border-border/50 backdrop-blur-xl modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold brand-gradient-text">
            Create Certification Provider
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-3">
            <Label className="text-foreground/90 font-medium text-xl" htmlFor="create-name">Provider Name</Label>
            <Input
              id="create-name"
              placeholder="e.g. AWS, Microsoft"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border text-xl focus-visible:ring-brand-orange"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 text-xl font-medium" htmlFor="create-code">Code</Label>
            <Input
              id="create-code"
              placeholder="e.g. AWS-CERT"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-background/50 border-border  text-xl focus-visible:ring-brand-orange"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xl" htmlFor="create-website">Website</Label>
            <Input
              id="create-website"
              placeholder="https://aws.amazon.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange text-xl"
            />
          </div>
          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="submit"
              disabled={isCreating}
              className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isCreating ? 'Creating...' : 'Create Provider'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}