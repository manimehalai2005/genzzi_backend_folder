'use client';

import { useState } from 'react';
import { useCollegeDepartmentMutations } from '@/hooks/useCollegeDepartment';
import { Button } from '@/components/ui/button';
import { CreateCollegeDepartmentDto } from '@/typess/CollegeDepartment';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Sparkles } from 'lucide-react';



export function CollegeDepartmentCreateDialog() {
  const [open, setOpen] = useState(false);
  const [collegeId, setCollegeId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  
  const { createCollegeDepartment, isCreating } = useCollegeDepartmentMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting Payload -> College ID:', collegeId, 'Department ID:', departmentId);

    try {
      await createCollegeDepartment({
        collegeId,
        departmentId,
      } as any);
      setCollegeId('');
      setDepartmentId('');
      setOpen(false);
    } catch (err: any) {
      console.error('Create Error:', err);
      alert(err.message || 'Failed to create college department');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger 
  render={
    <Button 
      className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto" 
    />
  }
>
  <Plus className="w-4 h-4 stroke-[3]" /> Add College Department ✨
</DialogTrigger>

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
            Create College Department 
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Link an academic department to a specific college securely.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label 
              htmlFor="collegeId" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              College ID <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="collegeId"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              placeholder="Enter College ID"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="departmentId" 
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Department ID <span className="text-fuchsia-500">*</span>
            </Label>
            <Input
              id="departmentId"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              placeholder="Enter Department ID"
              className="h-11 w-full rounded-xl bg-background/60 border-border/80 focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium"
              required
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel 
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-brand-orange text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isCreating ? 'Cooking...' : 'Save '}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}