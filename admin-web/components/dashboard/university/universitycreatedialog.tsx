'use client';

import { useState } from 'react';
import { toast } from 'sonner';

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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, AlertTriangle } from 'lucide-react';
import { useCreateUniversity } from '@/hooks/useuniverstityhook';
import { useCountries } from '@/hooks/useCountryhook';
import { Country } from '@/typess/Country';

export function UniversityCreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [countryId, setCountryId] = useState<string>('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [website, setWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { mutateAsync: createUniversity, isPending: isCreating } = useCreateUniversity();
  
  // Fetch countries list for dropdown with safe normalization
  const { data: countriesRes } = useCountries();
  const countries = Array.isArray(countriesRes)
    ? countriesRes
    : Array.isArray((countriesRes as any)?.data)
    ? (countriesRes as any).data
    : Array.isArray((countriesRes as any)?.countries)
    ? (countriesRes as any).countries
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await createUniversity({ 
        name, 
       
        countryId: countryId || undefined, 
        stateId: stateId || undefined,
        cityId: cityId || undefined,
        website: website || undefined, 
      });
      setName('');
      setCode('');
      setCountryId('');
      setStateId('');
      setCityId('');
      setWebsite('');
      setOpen(false);
      toast.success('University created successfully! 🎓');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create university';
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger 
        render={
          <Button 
            className="h-11 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-brand-orange text-white font-black shadow-lg shadow-fuchsia-500/25 hover:opacity-95 transition-all gap-2 w-full sm:w-auto" 
            type="button"
          />
        }
      >Add Universtiy</DialogTrigger>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-3xl bg-card/95 border-border/40 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl duration-200">
        <div className="w-12 h-1.5 bg-fuchsia-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

        <DialogHeader className="space-y-1.5 text-center sm:text-left">
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-transparent">
            Create New University
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium">
            Register a new institution into the system database.
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
            <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-muted-foreground">University Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Harvard University"
              required
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="code" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. HU"
                className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all uppercase"
              />
            </div>
            
            {/* Country Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Country</Label>
              <Select 
                value={countryId} 
                onValueChange={(val) => {
                  setCountryId(val?? " ");
                  setStateId(''); 
                  setCityId('');
                }}
              >
                <SelectTrigger className="h-11 rounded-2xl bg-background/50 border-border/60">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c: Country) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="website" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="h-11 rounded-2xl bg-background/50 border-border/60 focus:border-fuchsia-500 font-medium transition-all"
            />
          </div>

          <DialogFooter className="pt-3 border-t border-border/40 flex-col-reverse sm:flex-row gap-2.5">
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
              {isCreating ? 'Creating...' : 'Save University'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}