'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useUpdateLanguage } from '@/hooks/useLanguagehook';
import { LanguageEditDialogProps } from '@/interface/Language/LanguageEditProps';

export function LanguageEditDialog({
  language,
  open,
  onOpenChange,
}: LanguageEditDialogProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [nativeName, setNativeName] = useState('');

  const { mutateAsync: updateLanguage, isPending: isUpdating } =
    useUpdateLanguage();

  useEffect(() => {
    if (language) {
      setCode(language.code || '');
      setName(language.name || '');
      setNativeName(language.nativeName || '');
    }
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!language) return;

    try {
      await updateLanguage({
        id: language.id as string, // Change this to language.code if your backend uses code as the identifier
        dto: {
          code: code.trim(),
          name: name.trim(),
          nativeName: nativeName.trim(),
        },
      });
      onOpenChange(false);
      toast.success('Language updated successfully!');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to update language';
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
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit Language
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Modify language parameters and details.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-code"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Language Code
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
              htmlFor="edit-name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Language Name
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-nativeName"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Native Name
            </Label>
            <Input
              id="edit-nativeName"
              value={nativeName}
              onChange={(e) => setNativeName(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
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
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
