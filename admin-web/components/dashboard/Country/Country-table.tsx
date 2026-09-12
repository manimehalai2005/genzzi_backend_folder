'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Globe2,
  Phone,
  Coins,
} from 'lucide-react';

import { CountryEditDialog } from './Country-edit-dialog';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDeleteCountry } from '@/hooks/useCountryhook';
import { Country } from '@/typess/Country';
import { CountryTableProps } from '@/interface/Country/CountryTableProps';


export function CountryTable({ data: countryResponse }: CountryTableProps) {
  const [page, setPage] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteCountry, isPending: isDeleting } =
    useDeleteCountry();

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

      toast.success('Country deleted successfully! 🗑️');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to delete country';

      toast.error(errorMessage);
    }
  };

  // Safely normalize countryResponse data to always guarantee an array
  const countries = Array.isArray(countryResponse)
    ? countryResponse
    : Array.isArray(countryResponse?.data)
      ? countryResponse.data
      : Array.isArray((countryResponse as any)?.countries)
        ? (countryResponse as any).countries
        : [];

  const meta = countryResponse?.meta;

  return (
    <div className="space-y-5">
      {/* =========================================================
          DESKTOP / TABLET VIEW
      ========================================================= */}
      <div className="hidden md:block border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
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
              {countries.length === 0 ? (
                /* Empty */
                <tr>
                  <td
                    colSpan={7}
                    className="p-12 text-center text-muted-foreground font-medium"
                  >
                    No countries found in the portal.
                  </td>
                </tr>
              ) : (
                /* Countries */
                countries.map((country: Country) => (
                  <tr
                    key={country.id}
                    className="hover:bg-fuchsia-500/[0.03] transition-colors group"
                  >
                    {/* Flag */}
                    <td className="p-4 sm:p-5 text-xl">
                      {country.emoji || '🌐'}
                    </td>

                    {/* Name */}
                    <td className="p-4 sm:p-5 font-bold text-foreground">
                      {country.name}
                    </td>

                    {/* ISO */}
                    <td className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide">
                      {country.iso2} / {country.iso3}
                    </td>

                    {/* Phone */}
                    <td className="p-4 sm:p-5 text-muted-foreground font-medium">
                      {country.phoneCode || 'N/A'}
                    </td>

                    {/* Currency */}
                    <td className="p-4 sm:p-5 text-muted-foreground font-medium">
                      {country.currencyCode || 'N/A'}
                    </td>

                    {/* Status */}
                    <td className="p-4 sm:p-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                          country.status === 'Published' ||
                          country.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {country.status || 'Active'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 sm:p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(country)}
                          className="h-10 w-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm flex items-center justify-center"
                          title="Edit Country"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => confirmDelete(country)}
                          className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm flex items-center justify-center"
                          title="Delete Country"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          MOBILE VIEW
      ========================================================= */}
      <div className="md:hidden space-y-4">
        {countries.length === 0 ? (
          <div className="border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/95 shadow-xl p-10 text-center">
            <Globe2 className="w-8 h-8 mx-auto mb-3 text-fuchsia-500" />

            <p className="text-sm font-bold text-foreground">
              No countries found
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              No countries found in the portal.
            </p>
          </div>
        ) : (
          countries.map((country: Country) => (
            <div
              key={country.id}
              className="rounded-3xl border border-fuchsia-500/20 bg-card/95 shadow-xl backdrop-blur-xl p-4 space-y-4"
            >
              {/* ==============================
                  CARD HEADER
              ============================== */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-2xl">
                    {country.emoji || '🌐'}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-black text-fuchsia-400">
                      Country
                    </p>

                    <h3 className="text-base font-black text-foreground truncate">
                      {country.name}
                    </h3>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`flex-shrink-0 inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] font-black ${
                    country.status === 'Published' ||
                    country.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {country.status || 'Active'}
                </span>
              </div>

              {/* ==============================
                  COUNTRY DETAILS
              ============================== */}

              <div className="grid grid-cols-1 gap-3">
                {/* ISO */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                      <Globe2 className="w-4 h-4 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        ISO Codes
                      </p>

                      <p className="text-sm font-mono font-bold text-fuchsia-400 mt-0.5">
                        {country.iso2} / {country.iso3}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Code */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-purple-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Phone Code
                      </p>

                      <p className="text-sm font-semibold text-foreground mt-0.5">
                        {country.phoneCode || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Currency */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Coins className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Currency
                      </p>

                      <p className="text-sm font-semibold text-foreground mt-0.5">
                        {country.currencyCode || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==============================
                  MOBILE ACTIONS
              ============================== */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleEdit(country)}
                  className="h-11 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 font-bold"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => confirmDelete(country)}
                  className="h-11 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =========================================================
          PAGINATION
      ========================================================= */}
      {meta && meta.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 text-xs font-bold text-muted-foreground">
          {/* Page Info */}
          <div className="px-3.5 py-2 rounded-2xl bg-card/95 border border-border/40 shadow-sm backdrop-blur-xl">
            Showing Page <span className="text-fuchsia-400">{meta.page}</span>{' '}
            of <span className="text-foreground">{meta.totalPages}</span>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="h-10 px-4 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold gap-1.5 shadow-sm flex-1 sm:flex-none"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-10 px-4 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold gap-1.5 shadow-sm flex-1 sm:flex-none"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT DIALOG
      ========================================================= */}
      <CountryEditDialog
        country={selectedCountry}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* =========================================================
          DELETE CONFIRMATION DIALOG
      ========================================================= */}
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
            p-5
            sm:p-7
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* Mobile drag indicator */}
          <div className="w-12 h-1.5 bg-red-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete Country? ⚠️
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="text-foreground font-bold">
                  {deleteTarget?.name}
                </span>
                ? This action is permanent and cannot be undone.
              </p>
            </div>
          </DialogHeader>

          {/* Dialog Actions */}
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
