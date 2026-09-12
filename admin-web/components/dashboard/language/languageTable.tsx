
'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { LanguageEditDialog } from './languageEditdialog';

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

import { useDeleteLanguage } from '@/hooks/useLanguagehook';
import { Language } from '@/typess/language';
import { LanguageTableProps } from '@/interface/Language/LanguageTableProps';

export function LanguageTable({
  data: rawData,
  isLoading,
  onEdit,
  onDelete,
}: LanguageTableProps) {
  // Normalize API response
  const data = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
      ? (rawData as any).data
      : Array.isArray((rawData as any)?.languages)
        ? (rawData as any).languages
        : [];

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [deleteTargetId, setDeleteTargetId] =
    useState<string | null>(null);

  const [deleteTargetName, setDeleteTargetName] =
    useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    mutateAsync: deleteLanguage,
    isPending: isDeleting,
  } = useDeleteLanguage();

  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setIsEditOpen(true);

    onEdit?.(language);
  };
  const confirmDelete = (id: string, name: string) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteLanguage(deleteTargetId);

      onDelete?.(deleteTargetId);

      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);

      toast.success('Language deleted successfully! 🗑️');
    } catch (err: any) {
      console.error('Delete language error:', err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to delete language';

      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="hidden sm:block w-full overflow-hidden rounded-3xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[650px]">
            <TableHeader className="border-b border-border/40 bg-muted/50">
              <TableRow className="hover:bg-transparent">

                <TableHead className="p-4 font-black uppercase tracking-wider text-muted-foreground md:p-5">
                  Name
                </TableHead>

                <TableHead className="p-4 font-black uppercase tracking-wider text-muted-foreground md:p-5">
                  Code
                </TableHead>

                <TableHead className="p-4 font-black uppercase tracking-wider text-muted-foreground md:p-5">
                  Status
                </TableHead>

                <TableHead className="p-4 text-right font-black uppercase tracking-wider text-muted-foreground md:p-5">
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
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin text-fuchsia-500" />
                      Loading languages...
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
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-fuchsia-500" />
                      No languages found.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((language: Language) => {
                  const isActive =
                    (language.status || 'ACTIVE') === 'ACTIVE';

                  return (
                    <TableRow
                      key={language.id}
                      className="group transition-colors hover:bg-fuchsia-500/[0.03]"
                    >
                      {/* Name */}
                      <TableCell className="p-4 font-bold text-foreground md:p-5">
                        {language.name}
                      </TableCell>

                      {/* Code */}
                      <TableCell className="p-4 font-mono text-sm font-semibold uppercase tracking-wide text-fuchsia-500 md:p-5">
                        {language.code || '-'}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="p-4 md:p-5">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black ${
                            isActive
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {isActive
                            ? '🟢 Active'
                            : '🟡 Inactive'}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="p-4 text-right md:p-5">
                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(language)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400 shadow-sm transition-all hover:bg-fuchsia-500/20"
                            title="Edit Language"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              confirmDelete(
                                language.id || '',
                                language.name,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 shadow-sm transition-all hover:bg-red-500/20"
                            title="Delete Language"
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

      <div className="block space-y-3 sm:hidden">

        {/* Loading */}
        {isLoading ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-border/40 bg-card/95 p-6 shadow-xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-spin text-fuchsia-500" />
              Loading languages...
            </div>
          </div>
        ) : data.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-border/40 bg-card/95 p-6 shadow-xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-fuchsia-500" />
              No languages found.
            </div>
          </div>
        ) : (
          data.map((language: Language) => {
            const isActive =
              (language.status || 'ACTIVE') === 'ACTIVE';

            return (
              <div
                key={language.id}
                className="rounded-2xl border border-border/40 bg-card/95 p-4 shadow-lg backdrop-blur-xl transition-all active:scale-[0.99]"
              >
                {/* Top section */}
                <div className="flex items-start justify-between gap-3">

                  {/* Language info */}
                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-base font-black text-foreground">
                      {language.name}
                    </h3>

                    <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-fuchsia-500">
                      {language.code || '-'}
                    </p>

                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black ${
                      isActive
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                        : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {isActive
                      ? '🟢 Active'
                      : '🟡 Inactive'}
                  </span>

                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-border/40" />

                {/* Actions */}
                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(language)
                    }
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-fuchsia-500/10 text-sm font-bold text-fuchsia-400 transition-all hover:bg-fuchsia-500/20"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      confirmDelete(
                        language.id || '',
                        language.name,
                      )
                    }
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>

                </div>
              </div>
            );
          })
        )}

      </div>
      <LanguageEditDialog
        language={selectedLanguage}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <Dialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      >
        <DialogContent
          className="
            w-[calc(100vw-2rem)]
            max-w-[400px]
            rounded-3xl
            border-border/40
            bg-card/95
            p-5
            shadow-2xl
            backdrop-blur-xl
            sm:p-7
          "
        >

          {/* Mobile indicator */}
          <div className="mx-auto mb-[-8px] h-1.5 w-12 rounded-full bg-red-500/30 sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-sm sm:mx-0">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="space-y-1">

              <DialogTitle className="text-xl font-black tracking-tight">
                Delete Language? ⚠️
              </DialogTitle>

              <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                Are you sure you want to delete{' '}
                <span className="break-all font-bold text-foreground">
                  {deleteTargetName}
                </span>
                ? This action is permanent and cannot be undone.
              </p>

            </div>

          </DialogHeader>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
              className="h-11 w-full rounded-xl font-bold sm:w-auto"
            >
              Cancel ✋
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteSubmit}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 font-bold text-white shadow-lg shadow-red-500/25 hover:opacity-95 sm:w-auto"
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
