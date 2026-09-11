'use client';

import { useState, useEffect } from 'react';

import { useUpdateCertificationProvider } from '@/hooks/useCertificationprovider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CertificationProviderEditDialogProps } from '@/interface/Certificate-provider/CertificationProviderEditProps';

export function CertificationProviderEditDialog({
  provider,
  open,
  onOpenChange,
}: CertificationProviderEditDialogProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  const { mutateAsync: updateProvider, isPending: isUpdating } = useUpdateCertificationProvider();

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
        dto: { 
          name, 
          code: code || undefined, 
          website: website || undefined, 
          status 
        },
      });
      onOpenChange(false);
      toast.success('Certification provider updated successfully! ✨');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update certification provider');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92%] sm:max-w-[450px] max-h-[85vh] overflow-y-auto rounded-2xl bg-card border-border/50 backdrop-blur-xl p-6 modal-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold brand-gradient-text">
            Edit Certification Provider
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm" htmlFor="edit-name">Provider Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange text-sm sm:text-base h-11 sm:h-10"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm" htmlFor="edit-code">Code</Label>
            <Input
              id="edit-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange uppercase text-sm sm:text-base h-11 sm:h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/90 font-medium text-xs sm:text-sm" htmlFor="edit-website">Website</Label>
            <Input
              id="edit-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-background/50 border-border focus-visible:ring-brand-orange text-sm sm:text-base h-11 sm:h-10"
            />
          </div>
          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto h-11 sm:h-10 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="brand-gradient text-white border-0 shadow-lg shadow-brand-orange/20 hover:opacity-95 transition-all w-full sm:w-auto h-11 sm:h-10 text-sm"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}