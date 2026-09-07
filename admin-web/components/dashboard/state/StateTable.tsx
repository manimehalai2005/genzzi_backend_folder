'use client';

import { useState } from 'react';
import { State } from '@/app/api/StatesApi';
import { useStateMutations } from '@/hooks/useStatehokk';
import { StateEditDialog } from './StateEditDialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Sparkles, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StateTableProps } from '@/typess/State';


export function StateTable({ states }: StateTableProps) {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteState, isDeleting } = useStateMutations();

  const confirmDelete = (id: string, name: string) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteState(deleteTargetId);
      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);
    } catch (error) {
      console.error('Failed to delete state:', error);
    }
  };

  if (!states || states.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground font-medium flex items-center justify-center gap-2 border border-border/40 rounded-3xl bg-card/95 shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
        No states found in the geography matrix.
      </div>
    );
  }

  return (
    <>
      <div className="border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50 border-b border-border/40 text-muted-foreground">
              <tr>
                <th className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider">State Name</th>
                <th className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider">Code</th>
                <th className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider">Status</th>
                <th className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {states.map((st) => (
                <tr key={st.id} className="hover:bg-fuchsia-500/[0.03] transition-colors group">
                  <td className="p-4 sm:p-5 font-bold text-foreground text-lg">{st.name}</td>
                  <td className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide">
                    {st.code || '-'}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                        st.status === 'INACTIVE'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {st.status === 'INACTIVE' ? '🟡 Inactive' : '🟢 Active'}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedState(st);
                        setIsEditOpen(true);
                      }}
                      className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm"
                      title="Edit State"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => confirmDelete(st.id, st.name)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
                      title="Delete State"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StateEditDialog
        state={selectedState}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedState(null);
        }}
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
                Delete State Node? ⚠️
              </DialogTitle>
              <p className="text-xs text-muted-foreground font-medium">
                Are you sure you want to delete <span className="text-foreground font-bold">{deleteTargetName}</span>? This territory deletion is permanent.
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
    </>
  );
}