'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TimezoneEditDialog } from './TimeZoneEditDialog';

import {
  Pencil,
  Trash2,
  AlertTriangle,
  Sparkles,
  Clock,
  Globe2,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Timezone } from '@/typess/TimeZone';
import { useDeleteTimezone } from '@/hooks/useTimezone';
import { TimezoneTableProps } from '@/interface/TimeZone/TimeZoneTableProps';

export function TimezoneTable({
  data: rawData,
  isLoading,
  onDelete,
  onEdit,
}: TimezoneTableProps) {
  // Safely normalize rawData to always guarantee an array
  const timezones = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
      ? (rawData as any).data
      : Array.isArray((rawData as any)?.timezones)
        ? (rawData as any).timezones
        : [];

  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(
    null,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [timezoneToDelete, setTimezoneToDelete] = useState<Timezone | null>(
    null,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteError, setDeleteError] = useState('');

  const { mutateAsync: deleteTimezone } = useDeleteTimezone();

  const handleEdit = (tz: Timezone) => {
    setSelectedTimezone(tz);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(tz);
    }
  };

  const confirmDelete = (tz: Timezone) => {
    setTimezoneToDelete(tz);
    setDeleteError('');
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!timezoneToDelete) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      await deleteTimezone(timezoneToDelete.id);

      if (onDelete) {
        onDelete(timezoneToDelete.id);
      }

      setIsDeleteOpen(false);
      setTimezoneToDelete(null);

      toast.success('Timezone deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete timezone';

      setDeleteError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="hidden md:block rounded-3xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader className="bg-background/40 border-b border-border/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  UTC Offset
                </TableHead>

                <TableHead className="p-4 sm:p-5 text-right font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border/30">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground font-medium text-sm"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      Loading timezones...
                    </div>
                  </TableCell>
                </TableRow>
              ) : timezones.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground font-medium text-sm"
                  >
                    No timezones found.
                  </TableCell>
                </TableRow>
              ) : (
                timezones.map((tz: Timezone) => (
                  <TableRow
                    key={tz.id}
                    className="border-b border-border/20 hover:bg-fuchsia-500/5 transition-colors"
                  >
                    {/* Name */}
                    <TableCell className="p-4 sm:p-5 font-bold text-foreground text-sm lg:text-base break-words">
                      {tz.name}
                    </TableCell>

                    {/* UTC Offset */}
                    <TableCell className="p-4 sm:p-5 font-mono text-sm font-medium text-muted-foreground break-all">
                      {tz.utcOffset || '-'}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="p-4 sm:p-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tz)}
                          aria-label="Edit timezone"
                          className="h-9 w-9 rounded-xl hover:bg-fuchsia-500/10 text-fuchsia-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 stroke-[2.5]" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(tz)}
                          aria-label="Delete timezone"
                          className="h-9 w-9 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {isLoading ? (
          <div className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl p-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm">
              <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
              Loading timezones...
            </div>
          </div>
        ) : timezones.length === 0 ? (
          <div className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No timezones found.
            </p>
          </div>
        ) : (
          timezones.map((tz: Timezone) => (
            <div
              key={tz.id}
              className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-border/30 bg-background/30">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-fuchsia-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                      Timezone
                    </p>

                    <h3 className="mt-1 text-lg font-black text-foreground break-words">
                      {tz.name || '-'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3">
                {/* UTC Offset */}
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                        UTC Offset
                      </p>

                      <p className="mt-1 font-mono text-sm font-bold text-fuchsia-400 break-all">
                        {tz.utcOffset || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button
                    type="button"
                    onClick={() => handleEdit(tz)}
                    className="h-11 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 font-bold"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    onClick={() => confirmDelete(tz)}
                    className="h-11 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <TimezoneEditDialog
        timezone={selectedTimezone}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
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
          "
        >
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-rose-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-rose-400 to-brand-orange bg-clip-text text-transparent">
                Delete Timezone
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                This action is permanent and cannot be undone. Are you sure you
                want to remove{' '}
                <span className="font-bold text-foreground break-words">
                  {timezoneToDelete?.name}
                </span>
                ?
              </p>
            </div>
          </DialogHeader>

          {/* Delete Error */}
          {deleteError && (
            <div className="flex items-start gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />

              <span className="break-words">{deleteError}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-3 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 rounded-xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteSubmit}
              className="h-11 rounded-xl bg-gradient-to-r from-rose-500 to-brand-orange text-white font-bold shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all w-full sm:w-auto"
            >
              {isDeleting ? 'Deleting...' : 'Delete Timezone'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
