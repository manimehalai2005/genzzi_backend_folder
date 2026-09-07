'use client';

import { useState } from 'react';
import { Edit, Trash2, ChevronLeft, ChevronRight, Sparkles, AlertTriangle } from 'lucide-react';
import { useCountries, useCountryMutations } from '@/hooks/useCountryhook';
import { Country } from '@/app/api/CountryApi';
import { CountryEditDialog } from './Country-edit-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CountryTable() {
  const [page, setPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const limit = 10;

  const { data: countryResponse, isLoading } = useCountries(page, limit);
  const { deleteCountry, isDeleting } = useCountryMutations();

  const handleEdit = (country: Country) => {
    setSelectedCountry(country);
    setIsEditOpen(true);
  };

  const confirmDelete = (country: Country) => {
    setDeleteTarget(country);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTarget?.id) return;
    try {
      await deleteCountry(deleteTarget.id);
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Failed to delete country:', error);
    }
  };

  const countries = countryResponse?.data || [];
  const meta = countryResponse?.meta;

  return (
    <div className="space-y-5">
      {/* Country Table Container */}
      <div className="border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border/40 text-muted-foreground font-black text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-5 text-xl">Flag</th>
                <th className="p-4 sm:p-5 text-xl">Name</th>
                <th className="p-4 sm:p-5 text-xl">ISO2 / ISO3</th>
                <th className="p-4 sm:p-5 text-xl">Phone Code</th>
                <th className="p-4 sm:p-5 text-xl">Currency</th>
                <th className="p-4 sm:p-5 text-xl">Status</th>
                <th className="p-4 sm:p-5 text-right text-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted-foreground font-medium">
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      Loading global matrix...
                    </div>
                  </td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted-foreground font-medium">
                    No countries found in the portal.
                  </td>
                </tr>
              ) : (
                countries.map((country: Country) => (
                  <tr key={country.id} className="hover:bg-fuchsia-500/[0.03] transition-colors group">
                    <td className="p-4 sm:p-5 text-xl">{country.emoji || '🌐'}</td>
                    <td className="p-4 sm:p-5 font-bold text-foreground">{country.name}</td>
                    <td className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide">
                      {country.iso2} / {country.iso3}
                    </td>
                    <td className="p-4 sm:p-5 text-muted-foreground font-medium">{country.phoneCode || 'N/A'}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground font-medium">{country.currencyCode || 'N/A'}</td>
                    <td className="p-4 sm:p-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                        country.status === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {country.status === 'Published' ? '🟢 Published' : '🟡 Draft'}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(country)}
                        className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm"
                        title="Edit Country"
                      >
                        <Edit className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => confirmDelete(country)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
                        title="Delete Country"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 text-xs font-bold text-muted-foreground">
          <div className="px-3.5 py-2 rounded-2xl bg-card/95 border border-border/40 shadow-sm backdrop-blur-xl">
            Showing Page <span className="text-fuchsia-400">{meta.page}</span> of{' '}
            <span className="text-foreground">{meta.totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="h-10 px-4 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold gap-1.5 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-10 px-4 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold gap-1.5 shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Dialog Modal */}
      <CountryEditDialog
        country={selectedCountry}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Delete Confirmation Popup Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-3xl bg-card/95 border-border/40 p-6 shadow-2xl backdrop-blur-xl">
          <div className="w-12 h-1.5 bg-red-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />
          
          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete Country? ⚠️
              </DialogTitle>
              <p className="text-xs text-muted-foreground font-medium">
                Are you sure you want to delete <span className="text-foreground font-bold">{deleteTarget?.name}</span>? This action is permanent and cannot be undone.
              </p>
            </div>
          </DialogHeader>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel ✋
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteSubmit}
              className="h-11 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold shadow-lg shadow-red-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete 🗑️'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}