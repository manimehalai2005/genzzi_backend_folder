'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { UpdateSocialPlatformDto } from '@/typess/Socialplatform';
import { useUpdateSocialPlatform } from '@/hooks/useSocialPlatform';
import { SocialPlatformEditDialogProps } from '@/interface/Socialplatform/SocialEditProps';

export function SocialPlatformEditDialog({ platform, open, onOpenChange }: SocialPlatformEditDialogProps) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [icon, setIcon] = useState('');

  const { mutateAsync: updateSocialPlatform, isPending: isUpdating } = useUpdateSocialPlatform();

  useEffect(() => {
    if (platform) {
      setName(platform.name || '');
      setWebsite(platform.website || '');
      setIcon(platform.icon || '');
    }
  }, [platform]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform?.id) return;

    try {
      await updateSocialPlatform({
        id: platform.id,
        dto: {
          name,
          website,
          icon,
        }
      });
      onOpenChange(false);
      toast.success('Social platform updated successfully! ✨');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update social platform';
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-[450px] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-3xl bg-card/95 border-border/40 p-6 shadow-2xl backdrop-blur-xl">
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />
        
        <DialogHeader className="space-y-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
            <Globe className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl font-black tracking-tight text-foreground">
              Edit Social Platform ✨
            </DialogTitle>
            <p className="text-xs text-muted-foreground font-medium">
              Update platform configuration details in the matrix.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Platform Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-bold"
              placeholder="e.g. LinkedIn"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Website
            </Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-mono text-xs"
              placeholder="e.g. https://linkedin.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon" className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Icon
            </Label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-mono text-xs"
              placeholder="e.g. linkedin"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4">
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
              className="h-11 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isUpdating ? 'Saving...' : 'Save Changes ✨'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}