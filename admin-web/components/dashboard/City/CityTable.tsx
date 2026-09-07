'use client';

import { useState } from 'react';
import { City } from '@/app/api/CityApi';
import { useCityMutations } from '@/hooks/useCityhook';
import { CityEditDialog } from './CityEditDialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import { CityTableProps } from '@/typess/City';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



export function CityTable({ cities }: CityTableProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Delete modal state
  const [cityToDelete, setCityToDelete] = useState<City | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteCity, isDeleting } = useCityMutations();

  const confirmDelete = async () => {
    if (!cityToDelete) return;
    try {
      await deleteCity(cityToDelete.id);
      setIsDeleteOpen(false);
      setCityToDelete(null);
    } catch (error) {
      console.error('Failed to delete city:', error);
    }
  };

  if (!cities || cities.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-card/40 backdrop-blur-xl">
        <Sparkles className="w-8 h-8 mx-auto mb-2 text-brand-orange animate-pulse" />
        <p className="font-bold text-sm tracking-tight text-foreground">No cities found yet!</p>
        <p className="text-xs text-muted-foreground mt-1">Add your first record to start vibe-checking your regions.</p>
      </div>
    );
  }

  return (
    <>
      {/* GenZ Styled Container: Neobrutalist accents, ultra-rounded edges & glassmorphism */}
      <div className="rounded-3xl border border-border/40 bg-card/75 shadow-2xl backdrop-blur-2xl overflow-hidden">
        
        {/* Desktop View Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/30 border-b border-border/40 text-muted-foreground uppercase text-[11px] tracking-wider font-extrabold">
              <tr>
                <th className="p-4 sm:p-5 text-2xl">City Name</th>
                <th className="p-4 sm:p-5 text-2xl">Status</th>
                <th className="p-4 sm:p-5 text-right text-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {cities.map((ct) => (
                <tr key={ct.id} className="group hover:bg-muted/20 transition-all duration-200">
                  <td className="p-4 sm:p-5 font-bold text-foreground tracking-tight text-lg group-hover:text-brand-orange transition-colors">
                    {ct.name}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-black tracking-wide shadow-sm ${
                        ct.status === 'INACTIVE'
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${ct.status === 'INACTIVE' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
                      {ct.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-right space-x-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCity(ct);
                        setIsEditOpen(true);
                      }}
                      className="h-10 w-10 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCityToDelete(ct);
                        setIsDeleteOpen(true);
                      }}
                      className="h-10 w-10 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <CityEditDialog
        city={selectedCity}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCity(null);
        }}
      />

      {/* Gen-Z Custom Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            grid
            w-[calc(100vw-2rem)]
            max-w-[400px]
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
          <div className="mx-auto w-12 h-1.5 bg-rose-500/30 rounded-full mb-[-8px] sm:hidden" />
          
          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto sm:mx-0 shadow-lg shadow-rose-500/10">
              <AlertTriangle className="w-7 h-7 text-rose-500 " />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete <span className="text-rose-500">{cityToDelete?.name}</span>? 
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                This action is irreversible. It will wipe this city record completely from the database. Proceed with caution bestie!
              </p>
            </div>
          </DialogHeader>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 rounded-2xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Nevermind 
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-lg shadow-rose-500/25 transition-all w-full sm:w-auto"
            >
              {isDeleting ? "Deleting..." : "Yes,Delete "}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}