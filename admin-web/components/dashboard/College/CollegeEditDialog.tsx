'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { College } from '@/typess/College';
// Adjust path based on your hooks location
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
import { useUpdateCollege } from '@/hooks/useCollegehook';
import { CollegeEditDialogProps } from '@/interface/College/CollegeEditDialogProps';

export function CollegeEditDialog({
  college,
  open,
  onOpenChange,
}: CollegeEditDialogProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [website, setWebsite] = useState('');

  const { mutateAsync: updateCollege, isPending: isUpdating } =
    useUpdateCollege();

  useEffect(() => {
    if (college) {
      setName(college.name || '');
      setCode(college.code || '');
      setWebsite(college.website || '');
    }
  }, [college]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!college) return;

    try {
      await updateCollege({
        id: college.id,
        dto: {
          name,
          code,
          website,
        },
      });
      onOpenChange(false);
      toast.success('College updated successfully! ✨');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update college';
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
          max-w-[440px]
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
          max-h-[90vh]
          overflow-y-auto
          modal-scrollbar
        "
      >
        {/* Mobile top indicator bar */}
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit College
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify institution parameters and active operational status.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-code"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Code
            </Label>
            <Input
              id="edit-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-website"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Website
            </Label>
            <Input
              id="edit-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          {/* Operational Status Full Width Select */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-status"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Operational Status
            </Label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
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
              {isUpdating ? 'Saving...' : 'Save Changes '}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
