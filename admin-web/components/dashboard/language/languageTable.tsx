"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LanguageEditDialog } from "./languageEditdialog";

import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
  Languages,
  Hash,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDeleteLanguage } from "@/hooks/useLanguagehook";
import { Language } from "@/typess/language";
import { LanguageTableProps } from "@/interface/Language/LanguageTableProps";

export function LanguageTable({
  data,
  isLoading,
  onEdit,
  onDelete,
}: LanguageTableProps) {
  console.log("Languages Table Data:", data);

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteLanguage, isPending: isDeleting } =
    useDeleteLanguage();

  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(language);
    }
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

      if (onDelete) {
        onDelete(deleteTargetId);
      }

      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);

      toast.success("Language deleted successfully! 🗑️");
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to delete language";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-4">
      {/* =========================================================
          DESKTOP / TABLET VIEW
      ========================================================= */}
      <div className="hidden md:block border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader className="bg-muted/50 border-b border-border/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">
                  Name
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">
                  Code
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>

                <TableHead className="p-4 sm:p-5 text-right font-black text-lg uppercase tracking-wider text-muted-foreground">
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
                    className="p-12 text-center text-muted-foreground font-medium"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      Loading languages...
                    </div>
                  </TableCell>
                </TableRow>
              ) : !data || data.length === 0 ? (
                /* Empty */
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="p-12 text-center text-muted-foreground font-medium"
                  >
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-fuchsia-500" />
                      No languages found in the matrix.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((language) => {
                  const isActive = (language.status || "ACTIVE") === "ACTIVE";

                  return (
                    <TableRow
                      key={language.id}
                      className="hover:bg-fuchsia-500/[0.03] transition-colors group"
                    >
                      {/* Name */}
                      <TableCell className="p-4 sm:p-5 font-bold text-foreground text-lg">
                        {language.name}
                      </TableCell>

                      {/* Code */}
                      <TableCell className="p-4 sm:p-5 font-mono text-sm font-semibold text-fuchsia-500 uppercase tracking-wide">
                        {language.code || "-"}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="p-4 sm:p-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {isActive ? "🟢 Active" : "🟡 Inactive"}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="p-4 sm:p-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(language)}
                            className="h-10 w-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm"
                            title="Edit Language"
                          >
                            <Pencil className="w-4 h-4 mx-auto" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              confirmDelete(language.id || "", language.name)
                            }
                            className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
                            title="Delete Language"
                          >
                            <Trash2 className="w-4 h-4 mx-auto" />
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

      {/* =========================================================
          MOBILE VIEW
      ========================================================= */}
      <div className="md:hidden space-y-4">
        {/* Mobile Loading */}
        {isLoading ? (
          <div className="border border-border/40 rounded-3xl bg-card/95 shadow-xl p-10 text-center">
            <Sparkles className="w-7 h-7 mx-auto mb-3 text-fuchsia-500 animate-spin" />

            <p className="text-sm font-bold text-foreground">
              Loading languages...
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Loading language matrix...
            </p>
          </div>
        ) : !data || data.length === 0 ? (
          /* Mobile Empty */
          <div className="border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/95 shadow-xl p-10 text-center">
            <Languages className="w-8 h-8 mx-auto mb-3 text-fuchsia-500" />

            <p className="text-sm font-bold text-foreground">
              No languages found
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              No languages found in the matrix.
            </p>
          </div>
        ) : (
          /* Mobile Language Cards */
          data.map((language) => {
            const isActive = (language.status || "ACTIVE") === "ACTIVE";

            return (
              <div
                key={language.id}
                className="rounded-3xl border border-fuchsia-500/20 bg-card/95 shadow-xl backdrop-blur-xl p-4 space-y-4"
              >
                {/* CARD HEADER */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                      <Languages className="w-6 h-6 text-fuchsia-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest font-black text-fuchsia-400">
                        Language
                      </p>

                      <h3 className="text-base font-black text-foreground break-words">
                        {language.name}
                      </h3>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`flex-shrink-0 inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] font-black ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {isActive ? "🟢 Active" : "🟡 Inactive"}
                  </span>
                </div>

                {/* LANGUAGE DETAILS */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Code */}
                  <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-fuchsia-400" />

                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Code
                      </p>
                    </div>

                    <p className="text-sm font-mono font-black text-fuchsia-400 uppercase mt-1 break-all">
                      {language.code || "-"}
                    </p>
                  </div>
                </div>

                {/* MOBILE ACTIONS */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleEdit(language)}
                    className="h-11 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 font-bold"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      confirmDelete(language.id || "", language.name)
                    }
                    className="h-11 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* =========================================================
          EDIT LANGUAGE DIALOG
      ========================================================= */}
      <LanguageEditDialog
        language={selectedLanguage}
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
                Delete Language? ⚠️
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-foreground font-bold break-all">
                  {deleteTargetName}
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
              {isDeleting ? "Deleting..." : "Yes, Delete 🗑️"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
