'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDeleteCurrency } from '@/hooks/useCurrencyhook';

import { CurrencyTableProps } from '@/interface/Currency/CurrencyTableProps';
import { Currency } from '@/typess/Currency';
import { CurrencyEditDialog } from './CurrencyEditDialog';

export function CurrencyTable({
  data: rawData,
  isLoading,
  onEdit,
  onDelete,
}: CurrencyTableProps) {
  // Normalize API response
  const data = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
      ? (rawData as any).data
      : Array.isArray((rawData as any)?.currencies)
        ? (rawData as any).currencies
        : [];

  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [deleteTargetId, setDeleteTargetId] =
    useState<string | null>(null);

  const [deleteTargetName, setDeleteTargetName] =
    useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    mutateAsync: deleteCurrency,
    isPending: isDeleting,
  } = useDeleteCurrency();

  // Edit
  const handleEdit = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(currency);
    }
  };

  // Open delete dialog
  const confirmDelete = (id: string, name: string) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setIsDeleteOpen(true);
  };

  // Delete
  const handleDeleteSubmit = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteCurrency(deleteTargetId);

      if (onDelete) {
        onDelete(deleteTargetId);
      }

      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);

      toast.success('Currency deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to delete currency';

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full space-y-4">

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}
      <div className="hidden sm:block w-full overflow-hidden rounded-3xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[650px] border-collapse text-left text-sm">

            <TableHeader className="border-b border-border/40 bg-muted/50">
              <TableRow className="hover:bg-transparent">

                <TableHead className="p-4 text-sm font-black uppercase tracking-wider text-muted-foreground md:p-5 md:text-base">
                  Name
                </TableHead>

                <TableHead className="p-4 text-sm font-black uppercase tracking-wider text-muted-foreground md:p-5 md:text-base">
                  Code
                </TableHead>

                <TableHead className="p-4 text-sm font-black uppercase tracking-wider text-muted-foreground md:p-5 md:text-base">
                  Symbol
                </TableHead>

                <TableHead className="p-4 text-right text-sm font-black uppercase tracking-wider text-muted-foreground md:p-5 md:text-base">
                  Actions
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border/30">

              {/* Loading */}
              {isLoading ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="p-12 text-center text-muted-foreground"
                  >
                    <div className="inline-flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4 animate-spin text-fuchsia-500" />
                      Loading currencies...
                    </div>
                  </TableCell>
                </TableRow>

              ) : data.length === 0 ? (

                /* Empty */
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="p-12 text-center text-muted-foreground"
                  >
                    <div className="inline-flex items-center gap-2 font-medium">
                      <Sparkles className="h-4 w-4 text-fuchsia-500" />
                      No currencies found in the matrix.
                    </div>
                  </TableCell>
                </TableRow>

              ) : (

                /* Data */
                data.map((currency: Currency) => {
                  const currencyId = currency.id || '';

                  return (
                    <TableRow
                      key={currencyId}
                      className="group transition-colors hover:bg-fuchsia-500/[0.03]"
                    >

                      <TableCell className="p-4 text-base font-bold text-foreground md:p-5 md:text-lg">
                        {currency.name}
                      </TableCell>

                      <TableCell className="p-4 font-mono text-sm font-semibold uppercase tracking-wide text-fuchsia-500 md:p-5">
                        {currency.code || '-'}
                      </TableCell>

                      <TableCell className="p-4 font-mono text-sm font-semibold text-foreground md:p-5">
                        {currency.symbol || '-'}
                      </TableCell>

                      <TableCell className="p-4 md:p-5">
                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => handleEdit(currency)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400 shadow-sm transition-all hover:bg-fuchsia-500/20"
                            title="Edit Currency"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              confirmDelete(
                                currencyId,
                                currency.name,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 shadow-sm transition-all hover:bg-red-500/20"
                            title="Delete Currency"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>
                      </TableCell>

                    </TableRow>
                  );
                })
              )}

            </TableBody>
          </Table>
        </div>
      </div>


      {/* =====================================================
          MOBILE CARD VIEW
      ====================================================== */}
      <div className="block space-y-3 sm:hidden">

        {/* Loading */}
        {isLoading ? (
          <div className="rounded-2xl border border-border/40 bg-card/95 p-8 text-center shadow-lg">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-spin text-fuchsia-500" />
              Loading currencies...
            </div>
          </div>

        ) : data.length === 0 ? (

          /* Empty */
          <div className="rounded-2xl border border-border/40 bg-card/95 p-8 text-center shadow-lg">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-fuchsia-500" />
              No currencies found.
            </div>
          </div>

        ) : (

          /* Mobile Cards */
          data.map((currency: Currency) => {
            const currencyId = currency.id || '';

            return (
              <div
                key={currencyId}
                className="w-full rounded-2xl border border-border/40 bg-card/95 p-4 shadow-lg backdrop-blur-xl"
              >

                {/* Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-foreground">
                      {currency.name}
                    </p>

                    <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-fuchsia-500">
                      {currency.code || '-'}
                    </p>
                  </div>

                  {/* Symbol */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/50">
                    <span className="font-mono text-lg font-bold text-foreground">
                      {currency.symbol || '-'}
                    </span>
                  </div>

                </div>


                {/* Details */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-muted/30 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Code
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-fuchsia-500">
                      {currency.code || '-'}
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/30 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Symbol
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-foreground">
                      {currency.symbol || '-'}
                    </p>
                  </div>

                </div>


                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">

                  <Button
                    type="button"
                    onClick={() => handleEdit(currency)}
                    variant="outline"
                    className="h-10 w-full rounded-xl border-fuchsia-500/20 bg-fuchsia-500/10 font-bold text-fuchsia-400 hover:bg-fuchsia-500/20 hover:text-fuchsia-400"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    onClick={() =>
                      confirmDelete(
                        currencyId,
                        currency.name,
                      )
                    }
                    variant="outline"
                    className="h-10 w-full rounded-xl border-red-500/20 bg-red-500/10 font-bold text-red-400 hover:bg-red-500/20 hover:text-red-400"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>

                </div>

              </div>
            );
          })
        )}

      </div>


      {/* =====================================================
          EDIT DIALOG
      ====================================================== */}
      <CurrencyEditDialog
        currency={selectedCurrency}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />


      {/* =====================================================
          DELETE DIALOG
      ====================================================== */}
      <Dialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      >
        <DialogContent
          className="
            fixed left-1/2 top-1/2 z-50
            grid w-[calc(100vw-2rem)]
            max-w-[400px]
            -translate-x-1/2
            -translate-y-1/2
            gap-5
            rounded-3xl
            border-border/40
            bg-card/95
            p-5
            shadow-2xl
            backdrop-blur-xl
            sm:p-7
          "
        >

          {/* Mobile drag indicator */}
          <div className="mx-auto mb-[-8px] h-1.5 w-12 rounded-full bg-red-500/30 sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-sm sm:mx-0">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="space-y-1">

              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete Currency? ⚠️
              </DialogTitle>

              <p className="text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
                Are you sure you want to delete{' '}
                <span className="break-all font-bold text-foreground">
                  {deleteTargetName}
                </span>
                ? This action is permanent and cannot be undone.
              </p>

            </div>

          </DialogHeader>


          {/* Delete Actions */}
          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
              className="h-11 w-full rounded-xl border-border/80 bg-background/50 font-bold hover:bg-muted/50 sm:w-auto"
            >
              Cancel ✋
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteSubmit}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:opacity-95 sm:w-auto"
            >
              {isDeleting
                ? 'Deleting...'
                : 'Yes, Delete 🗑️'}
            </Button>

          </div>

        </DialogContent>
      </Dialog>

    </div>
  );
}