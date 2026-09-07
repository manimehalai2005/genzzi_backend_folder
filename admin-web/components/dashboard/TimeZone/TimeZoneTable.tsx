'use client';

import { useState } from 'react';
import { Timezone } from '@/app/api/TimeZone';
import { useTimezoneMutations } from '@/hooks/useTimezone';
import { Button } from '@/components/ui/button';
import { TimezoneEditDialog } from './TimeZoneEditDialog';
import { Pencil, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
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
import { TimezoneTableProps } from '@/typess/TimeZone';

export function TimezoneTable({ timezones }: TimezoneTableProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [timezoneToDelete, setTimezoneToDelete] = useState<Timezone | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const { deleteTimezone } = useTimezoneMutations();

  const handleEdit = (tz: Timezone) => {
    setSelectedTimezone(tz);
    setIsEditOpen(true);
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
      setIsDeleteOpen(false);
      setTimezoneToDelete(null);
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete timezone');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-2xl overflow-hidden p-5">
      <Table className='p-5'>
        <TableHeader className="bg-background/40 border-b border-border/40 p-3">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-black text-lg uppercase tracking-wider text-muted-foreground">Name</TableHead>
            <TableHead className="font-black text-lg uppercase tracking-wider text-muted-foreground">Offset</TableHead>
            <TableHead className="font-black text-lg uppercase tracking-wider text-muted-foreground">GMT Offset</TableHead>
            <TableHead className="font-black text-lg uppercase tracking-wider text-muted-foreground">Abbreviation</TableHead>
            <TableHead className="font-black text-lg uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="text-right font-black text-lg uppercase tracking-wider text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='p-5'>
          {timezones.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground font-medium text-sm">
                No timezones found.
              </TableCell>
            </TableRow>
          ) : (
            timezones.map((tz) => (
              <TableRow key={tz.id} className="border-b border-border/20 hover:bg-fuchsia-500/5 transition-colors">
                <TableCell className="font-bold text-foreground text-lg">{tz.name}</TableCell>
                <TableCell className="font-medium text-muted-foreground">{tz.offset || '-'}</TableCell>
                <TableCell className="font-medium text-muted-foreground">{tz.gmtOffset || '-'}</TableCell>
                <TableCell className="font-medium text-muted-foreground uppercase">{tz.abbreviation || '-'}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
                    {tz.status || 'ACTIVE'}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(tz)}
                    aria-label="Edit timezone"
                    className="h-9 w-9 rounded-xl hover:bg-fuchsia-500/10 text-fuchsia-500 transition-colors"
                  >
                    <Pencil className="w-4 h-4 stroke-[2.5]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmDelete(tz)}
                    aria-label="Delete timezone"
                    className="h-9 w-9 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
          <div className="w-12 h-1.5 bg-rose-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

          <DialogHeader className="space-y-1.5 text-center sm:text-left">
            <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-rose-400 to-brand-orange bg-clip-text text-transparent flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              Delete Timezone
            </DialogTitle>
            <p className="text-xs text-muted-foreground font-medium">
              This action is permanent and cannot be undone. Are you sure you want to remove <span className="font-bold text-foreground">{timezoneToDelete?.name}</span>?
            </p>
          </DialogHeader>

          {deleteError && (
            <div className="flex items-center gap-2 p-3 text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {deleteError}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2 border-t border-border/40">
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