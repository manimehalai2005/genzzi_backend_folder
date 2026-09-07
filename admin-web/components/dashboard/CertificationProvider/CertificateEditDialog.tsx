'use client';

import { useState, useEffect } from 'react';
import { CertificationProvider } from '@/app/api/CertificationProviderApi';
import { useCertificationProviderMutations } from '@/hooks/useCertificationprovider';
import { Button } from '@/components/ui/button';
import { CertificationProviderEditDialogProps } from '@/typess/Certificate-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CertificationProviderEditDialog({
  provider,
  open,
  onOpenChange,
}: CertificationProviderEditDialogProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  const { updateProvider, isUpdating } = useCertificationProviderMutations();

  useEffect(() => {
    if (provider) {
      setName(provider.name || '');
      setCode(provider.code || '');
      setWebsite(provider.website || '');
      setStatus(provider.status || 'ACTIVE');
    }
  }, [provider]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;

    try {
      await updateProvider({
        id: provider.id,
        dto: { name, code, website, status },
      });
      onOpenChange(false);
    } catch (err: any) {
      alert(err.message || 'Failed to update certification provider');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-[4500px] rounded-2xl bg-card border-border/50 backdrop-blur-xl modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold brand-gradient-text">
            Edit Certification Provider
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium" htmlFor="edit-name">Provider Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium" htmlFor="edit-code">Code</Label>
            <Input
              id="edit-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium" htmlFor="edit-website">Website</Label>
            <Input
              id="edit-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange"
            />
          </div>
          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="submit"
              disabled={isUpdating}
              className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}