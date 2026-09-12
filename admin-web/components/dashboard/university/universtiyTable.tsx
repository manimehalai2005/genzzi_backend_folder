'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { UniversityEditDialog } from './universtiyeiditDialog';

import {
  Pencil,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  University as UniversityIcon,
  Hash,
  Globe2,
  Activity,
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

import { University } from '@/typess/University';
import { useDeleteUniversity } from '@/hooks/useuniverstityhook';
import { UniversityTableProps } from '@/interface/Univesity/UniversityTableProps';

export function UniversityTable({
  data: rawData,
  isLoading,
  onDelete,
  onEdit,
}: UniversityTableProps) {
  const universities = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
      ? (rawData as any).data
      : Array.isArray((rawData as any)?.universities)
        ? (rawData as any).universities
        : [];

  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [universityToDelete, setUniversityToDelete] =
    useState<University | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteError, setDeleteError] = useState('');

  const { mutateAsync: deleteUniversity } = useDeleteUniversity();

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (university: University) => {
    setSelectedUniversity(university);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(university);
    }
  };

  // =========================================================
  // DELETE CONFIRM
  // =========================================================

  const confirmDelete = (university: University) => {
    setUniversityToDelete(university);
    setDeleteError('');
    setIsDeleteOpen(true);
  };

  // =========================================================
  // DELETE SUBMIT
  // =========================================================

  const handleDeleteSubmit = async () => {
    if (!universityToDelete) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      await deleteUniversity(universityToDelete.id);

      if (onDelete) {
        onDelete(universityToDelete.id);
      }

      setIsDeleteOpen(false);
      setUniversityToDelete(null);

      toast.success('University deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete university';

      setDeleteError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ========================================================= */}
      {/* DESKTOP / TABLET TABLE */}
      {/* ========================================================= */}

      <div className="hidden md:block rounded-3xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader className="bg-background/40 border-b border-border/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Code
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Country ID
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Website
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-muted-foreground">
                  Status
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
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground font-medium text-sm"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      Loading universities...
                    </div>
                  </TableCell>
                </TableRow>
              ) : universities.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground font-medium text-sm"
                  >
                    No universities found.
                  </TableCell>
                </TableRow>
              ) : (
                universities.map((university: University) => (
                  <TableRow
                    key={university.id}
                    className="border-b border-border/20 hover:bg-fuchsia-500/5 transition-colors"
                  >
                    {/* Name */}
                    <TableCell className="p-4 sm:p-5 font-bold text-foreground text-sm lg:text-base break-words">
                      {university.name || '-'}
                    </TableCell>

                    {/* Code */}
                    <TableCell className="p-4 sm:p-5 font-medium text-muted-foreground">
                      -
                    </TableCell>

                    {/* Country ID */}
                    <TableCell className="p-4 sm:p-5 font-medium text-muted-foreground font-mono text-xs break-all">
                      {university.countryId || '-'}
                    </TableCell>

                    {/* Website */}
                    <TableCell className="p-4 sm:p-5 font-medium">
                      {university.website ? (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 max-w-[220px] text-fuchsia-500 hover:text-fuchsia-600 underline font-semibold transition-colors break-all"
                        >
                          <span className="truncate">
                            {university.website.replace(/^https?:\/\/?/, '')}
                          </span>

                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="p-4 sm:p-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        ● Active
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="p-4 sm:p-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(university)}
                          aria-label="Edit university"
                          className="h-9 w-9 rounded-xl hover:bg-fuchsia-500/10 text-fuchsia-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 stroke-[2.5]" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(university)}
                          aria-label="Delete university"
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

      {/* ========================================================= */}
      {/* MOBILE CARD VIEW */}
      {/* ========================================================= */}

      <div className="md:hidden space-y-4">
        {isLoading ? (
          <div className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl p-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium text-sm">
              <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
              Loading universities...
            </div>
          </div>
        ) : universities.length === 0 ? (
          <div className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No universities found.
            </p>
          </div>
        ) : (
          universities.map((university: University) => (
            <div
              key={university.id}
              className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl overflow-hidden"
            >
              {/* ================================================= */}
              {/* CARD HEADER */}
              {/* ================================================= */}

              <div className="p-5 border-b border-border/30 bg-background/30">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                    <UniversityIcon className="w-5 h-5 text-fuchsia-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                      University
                    </p>

                    <h3 className="mt-1 text-lg font-black text-foreground break-words">
                      {university.name || '-'}
                    </h3>
                  </div>

                  <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    ● Active
                  </span>
                </div>
              </div>

              {/* ================================================= */}
              {/* CARD DETAILS */}
              {/* ================================================= */}

              <div className="p-5 space-y-3">
                {/* Code */}
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                      <Hash className="w-4 h-4 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                        Code
                      </p>

                      <p className="mt-1 text-sm font-bold text-muted-foreground">
                        -
                      </p>
                    </div>
                  </div>
                </div>

                {/* Country ID */}
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                      <Hash className="w-4 h-4 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                        Country ID
                      </p>

                      <p className="mt-1 font-mono text-sm font-bold text-fuchsia-400 break-all">
                        {university.countryId || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                      <Globe2 className="w-4 h-4 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                        Website
                      </p>

                      {university.website ? (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-500 hover:text-fuchsia-600 underline break-all"
                        >
                          <span className="break-all">
                            {university.website.replace(/^https?:\/\/?/, '')}
                          </span>

                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-bold text-muted-foreground">
                          -
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-amber-500" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                        Status
                      </p>

                      <p className="mt-1 text-sm font-bold text-amber-500">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================================================= */}
                {/* MOBILE ACTIONS */}
                {/* ================================================= */}

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button
                    type="button"
                    onClick={() => handleEdit(university)}
                    className="h-11 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 font-bold"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    onClick={() => confirmDelete(university)}
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

      {/* ========================================================= */}
      {/* EDIT DIALOG */}
      {/* ========================================================= */}

      <UniversityEditDialog
        university={selectedUniversity}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* ========================================================= */}
      {/* DELETE DIALOG */}
      {/* ========================================================= */}

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
                Delete University
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                This action is permanent and cannot be undone. Are you sure you
                want to remove{' '}
                <span className="font-bold text-foreground break-words">
                  {universityToDelete?.name}
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

          {/* Dialog Buttons */}
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
              {isDeleting ? 'Deleting...' : 'Delete University'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
