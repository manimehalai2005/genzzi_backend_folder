'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, AlertTriangle, Edit3 } from 'lucide-react';
import { UniversityEditDialogProps } from '@/interface/Univesity/UniverstyEditProps';
import { useUpdateUniversity } from '@/hooks/useuniverstityhook';

export function UniversityEditDialog({ university, open, onOpenChange }: UniversityEditDialogProps) {
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [website, setWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { mutateAsync: updateUniversity, isPending: isUpdating } = useUpdateUniversity();

  useEffect(() => {
    if (university) {
      setName(university.name || '');
      setCountryId(university.countryId || '');
      setWebsite(university.website || '');
      setErrorMsg('');
    }
  }, [university]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!university) return;
    setErrorMsg('');

    try {
      await updateUniversity({
        id: university.id,
        dto: { name, countryId, website },
      });
      onOpenChange(false);
      toast.success('University updated successfully! 🎓');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update university';
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="
          fixed
          left-1/2
          top-1/2
          z-50
          grid
          w-[calc(100vw-2rem)]
          max-w-[460px]
          -translate-x-1/2
          -translate-y-1/2
          gap-5
          rounded-3xl
          bg-card/95
          border-border/40
          p-6
          sm:p-7
          shadow-2xl
          backdrop-blur-2xl
          duration-200
        "
      >
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2.5">
            <Edit3 className="w-6 h-6 text-fuchsia-500 shrink-0" />
            Edit University
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify institutional details and runtime attributes.
          </p>
        </DialogHeader>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name" className="text-xs font-black uppercase tracking-wider text-muted-foreground">University Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-countryId" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Country ID</Label>
              <Input
                id="edit-countryId"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-website" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Website</Label>
            <Input
              id="edit-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all"
            />
          </div>

          <DialogFooter className="pt-3 border-t border-border/40 flex-col-reverse sm:flex-row gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUpdating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}