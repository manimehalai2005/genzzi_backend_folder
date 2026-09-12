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
import { Sparkles, AlertCircle } from 'lucide-react';

import { useUpdateSkill } from '@/hooks/useSkillhook';
import { SkillEditDialogProps } from '@/interface/Skill/SkillEditProps';

export function SkillEditDialog({
  skill,
  open,
  onOpenChange,
}: SkillEditDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const [status, setStatus] = useState('ACTIVE');
  const [error, setError] = useState('');

  const { mutateAsync: updateSkill, isPending: isUpdating } = useUpdateSkill();

  useEffect(() => {
    if (skill) {
      setName(skill.name || '');
      setCategory(skill.category || '');
      setStatus(skill.status || 'ACTIVE');
    }
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill) return;
    setError('');

    try {
      await updateSkill({
        id: skill.id,
        dto: { name, category, status },
      });
      onOpenChange(false);
      toast.success('Skill updated successfully! 🚀');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update skill';
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
        {/* Mobile top indicator bar */}
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-black tracking-wide w-fit mx-auto sm:mx-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Skills Matrix
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Edit Skill: {skill?.name} ✍️
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Update technical skill attributes, categories, descriptions, and
            statuses.
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
              htmlFor="edit-name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Skill Name <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-status"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Status
            </Label>
            <Input
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full rounded-xl bg-background/60 border-border/85 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium uppercase"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel ✋
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Saving...' : 'Save Changes 🚀'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
