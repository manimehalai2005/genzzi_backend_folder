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
import { AlertCircle } from 'lucide-react';
import { FileType } from '@/typess/FilteType';
import { useUpdateFileType } from '@/hooks/useFileType';

interface FileTypeEditDialogProps {
  fileType: FileType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FileTypeEditDialog({ fileType, open, onOpenChange }: FileTypeEditDialogProps) {
  const [extension, setExtension] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const { mutateAsync: updateFileType, isPending: isUpdating } = useUpdateFileType();

  useEffect(() => {
    if (fileType) {
      setExtension(fileType.extension || '');
      setMimeType(fileType.mimeType || '');
      setCategory(fileType.category || '');
    }
  }, [fileType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileType) return;
    setError('');

    try {
      await updateFileType({
        id: fileType.id,
        dto: {
          extension,
          mimeType,
          category: category || undefined,
        },
      });
      onOpenChange(false);
      toast.success('File type updated successfully! 📁');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update file type';
      setError(errorMessage);
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
          max-w-[480px]
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
            Edit File Type: {fileType?.extension || 'Details'} 
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Update file specifications, MIME configurations, and category parameters.
          </p>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label 
              htmlFor="edit-extension" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Extension <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              placeholder="e.g. .pdf"
              required
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="edit-mimeType" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Mime Type <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-mimeType"
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              placeholder="e.g. application/pdf"
              required
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="edit-category" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Category
            </Label>
            <Input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Document"
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
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
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}