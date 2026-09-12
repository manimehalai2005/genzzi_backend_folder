"use client";

import { useState } from "react";
import { toast } from "sonner";

import { StateEditDialog } from "./StateEditDialog";
import { Button } from "@/components/ui/button";

import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
  MapPin,
  Hash,
  Activity,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { State } from "@/typess/State";
import { useDeleteState } from "@/hooks/useStatehokk";
import { StateTableProps } from "@/interface/State/StateTableProps";

export function StateTable({
  data: rawData,
  isLoading,
  onEdit,
  onDelete,
}: StateTableProps) {
  // Safely normalize rawData to always guarantee an array
  const states = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.data)
    ? (rawData as any).data
    : Array.isArray((rawData as any)?.states)
    ? (rawData as any).states
    : [];

  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    mutateAsync: deleteState,
    isPending: isDeleting,
  } = useDeleteState();

  const handleEdit = (state: State) => {
    setSelectedState(state);
    setIsEditOpen(true);

    if (onEdit) {
      onEdit(state);
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
      await deleteState(deleteTargetId);

      if (onDelete) {
        onDelete(deleteTargetId);
      }

      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);

      toast.success("State deleted successfully! 🗑️");
    } catch (error: any) {
      console.error("Failed to delete state:", error);

      const msg =
        error?.message ||
        "Failed to delete state. Please try again.";

      toast.error(msg);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="p-10 sm:p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 border border-border/40 rounded-3xl bg-card/95 shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
        Loading states...
      </div>
    );
  }

  // Empty State
  if (states.length === 0) {
    return (
      <div className="p-10 sm:p-12 text-center text-muted-foreground font-medium flex flex-col sm:flex-row items-center justify-center gap-2 border border-border/40 rounded-3xl bg-card/95 shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-4 h-4 text-fuchsia-500" />
        No states found in the geography matrix.
      </div>
    );
  }

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP / TABLET TABLE */}
      {/* ========================================================= */}

      <div className="hidden md:block border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50 border-b border-border/40 text-muted-foreground">
              <tr>
                <th className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider">
                  State Name
                </th>

                <th className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider">
                  Code
                </th>

                <th className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider">
                  Status
                </th>

                <th className="p-4 sm:p-5 font-black text-xs uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/30">
              {states.map((state:State) => (
                <tr
                  key={state.id}
                  className="hover:bg-fuchsia-500/[0.03] transition-colors group"
                >
                  {/* State Name */}
                  <td className="p-4 sm:p-5 font-bold text-foreground text-sm tracking-wide">
                    {state.name}
                  </td>

                  {/* Code */}
                  <td className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide break-all">
                    {state.code || "-"}
                  </td>

                  {/* Status */}
                  <td className="p-4 sm:p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      ● Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 sm:p-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(state)}
                        className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/25 transition-all shadow-sm"
                        title="Edit State"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          confirmDelete(
                            state.id ?? "",
                            state.name ?? "",
                          )
                        }
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/25 transition-all shadow-sm"
                        title="Delete State"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE CARD VIEW */}
      {/* ========================================================= */}

      <div className="md:hidden space-y-4">
        {states.map((state:State) => (
          <div
            key={state.id}
            className="rounded-3xl border border-border/40 bg-card/95 shadow-xl backdrop-blur-xl overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-border/30 bg-muted/20">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-fuchsia-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                    State
                  </p>

                  <h3 className="mt-1 text-lg font-black text-foreground break-words">
                    {state.name || "-"}
                  </h3>
                </div>

                {/* Status */}
                <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  ● Active
                </span>
              </div>
            </div>

            {/* Card Details */}
            <div className="p-5 space-y-3">
              {/* Code */}
              <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                    <Hash className="w-4 h-4 text-fuchsia-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                      State Code
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-fuchsia-400 break-all">
                      {state.code || "-"}
                    </p>
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

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  type="button"
                  onClick={() => handleEdit(state)}
                  className="h-11 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 border border-fuchsia-500/20 font-bold"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    confirmDelete(
                      state.id ?? "",
                      state.name ?? "",
                    )
                  }
                  className="h-11 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* EDIT DIALOG */}
      {/* ========================================================= */}

      <StateEditDialog
        state={selectedState}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedState(null);
        }}
      />

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ========================================================= */}

      <Dialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      >
        <DialogContent
          className="
            fixed left-1/2 top-1/2 z-50
            grid w-[calc(100vw-2rem)] max-w-[400px]
            -translate-x-1/2 -translate-y-1/2
            gap-5
            rounded-3xl
            bg-card/95
            border-border/40
            p-6
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-red-500/30 rounded-full mx-auto mb-[-8px] sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete State Node? ⚠️
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-foreground font-bold break-words">
                  {deleteTargetName}
                </span>
                ? This territory deletion is permanent.
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
              {isDeleting ? "Deleting..." : "Yes, Delete 🗑️"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}