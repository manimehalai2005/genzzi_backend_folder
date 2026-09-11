'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useDeleteCurrency } from '@/hooks/useCurrencyhook';

import { Button } from '@/components/ui/button';
import { CurrencyEditDialog } from './CurrencyEditDialog';

import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
  Coins,
  BadgeDollarSign,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Currency } from '@/typess/Currency';
import { CurrencyTableProps } from '@/interface/Currency/CurrencyTableProps';

export function CurrencyTable({
  data: rawData,
  isLoading,
  onDelete,
  onEdit,
}: CurrencyTableProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Delete Modal State
  const [deleteTargetCode, setDeleteTargetCode] = useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteCurrency, isPending: isDeleting } =
    useDeleteCurrency();

  const handleEdit = (curr: Currency) => {
    setSelectedCurrency(curr);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(curr);
    }
  };

  const confirmDelete = (code: string) => {
    setDeleteTargetCode(code);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTargetCode) return;

    try {
      await deleteCurrency(deleteTargetCode);

      if (onDelete) {
        onDelete(deleteTargetCode);
      }

      setIsDeleteOpen(false);
      setDeleteTargetCode(null);

      toast.success('Currency deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete currency';

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Safely normalize rawData to always guarantee an array
  const data = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
      ? (rawData as any).data
      : Array.isArray((rawData as any)?.currencies)
        ? (rawData as any).currencies
        : [];

  return (
    <div className="space-y-4">
      {/* =========================================================
          DESKTOP / TABLET VIEW
      ========================================================= */}
      <div className="hidden md:block border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50 border-b border-border/40 text-muted-foreground font-black text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-5 text-xl">Code</th>

                <th className="p-4 sm:p-5 text-xl">Name</th>

                <th className="p-4 sm:p-5 text-xl">Symbol</th>

                <th className="p-4 sm:p-5 text-xl">Status</th>

                <th className="p-4 sm:p-5 text-right text-xl">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/30">
              {/* Loading */}
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-12 text-center text-muted-foreground font-medium"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      Loading financial node...
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                /* Empty */
                <tr>
                  <td
                    colSpan={5}
                    className="p-12 text-center text-muted-foreground font-medium"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-fuchsia-500" />
                      No currencies found in the financial node.
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((curr: Currency) => (
                  <tr
                    key={curr.code || curr.id}
                    className="hover:bg-fuchsia-500/[0.03] transition-colors group"
                  >
                    {/* Code */}
                    <td className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide">
                      {curr.code}
                    </td>

                    {/* Name */}
                    <td className="p-4 sm:p-5 font-bold text-foreground text-lg">
                      {curr.name}
                    </td>

                    {/* Symbol */}
                    <td className="p-4 sm:p-5 text-muted-foreground font-medium text-lg">
                      {curr.symbol || '-'}
                    </td>

                    {/* Status */}
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        🟢 Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 sm:p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(curr)}
                          className="h-10 w-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm"
                          title="Edit Currency"
                        >
                          <Pencil className="w-4 h-4 mx-auto" />
                        </button>

                        <button
                          onClick={() => confirmDelete(curr.code || curr.id)}
                          className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
                          title="Delete Currency"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
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
        {/* Mobile Loading */}
        {isLoading ? (
          <div className="border border-border/40 rounded-3xl bg-card/95 shadow-xl p-10 text-center">
            <Sparkles className="w-7 h-7 mx-auto mb-3 text-fuchsia-500 animate-spin" />

            <p className="text-sm font-bold text-foreground">
              Loading currencies...
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Loading financial node...
            </p>
          </div>
        ) : data.length === 0 ? (
          /* Mobile Empty */
          <div className="border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/95 shadow-xl p-10 text-center">
            <Coins className="w-8 h-8 mx-auto mb-3 text-fuchsia-500" />

            <p className="text-sm font-bold text-foreground">
              No currencies found
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              No currencies found in the financial node.
            </p>
          </div>
        ) : (
          /* Mobile Currency Cards */
          data.map((curr: Currency) => (
            <div
              key={curr.code || curr.id}
              className="rounded-3xl border border-fuchsia-500/20 bg-card/95 shadow-xl backdrop-blur-xl p-4 space-y-4"
            >
              {/* ==============================
                  CARD HEADER
              ============================== */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                    <BadgeDollarSign className="w-6 h-6 text-fuchsia-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-black text-fuchsia-400">
                      Currency
                    </p>

                    <h3 className="text-base font-black text-foreground break-words">
                      {curr.name}
                    </h3>
                  </div>
                </div>

                {/* Active Status */}
                <span className="flex-shrink-0 inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  🟢 Active
                </span>
              </div>

              {/* ==============================
                  CURRENCY DETAILS
              ============================== */}
              <div className="grid grid-cols-2 gap-3">
                {/* Code */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    Code
                  </p>

                  <p className="text-sm font-mono font-black text-fuchsia-400 uppercase mt-1 break-all">
                    {curr.code}
                  </p>
                </div>

                {/* Symbol */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    Symbol
                  </p>

                  <p className="text-lg font-black text-foreground mt-0.5">
                    {curr.symbol || '-'}
                  </p>
                </div>
              </div>

              {/* ==============================
                  MOBILE ACTIONS
              ============================== */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleEdit(curr)}
                  className="h-11 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 font-bold"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => confirmDelete(curr.code || curr.id)}
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
          EDIT CURRENCY DIALOG
      ========================================================= */}
      <CurrencyEditDialog
        currency={selectedCurrency}
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
                Delete Currency? ⚠️
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="text-foreground font-bold break-all">
                  {deleteTargetCode}
                </span>
                ? This action is permanent and cannot be undone.
              </p>
            </div>
          </DialogHeader>

          {/* Dialog Buttons */}
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
