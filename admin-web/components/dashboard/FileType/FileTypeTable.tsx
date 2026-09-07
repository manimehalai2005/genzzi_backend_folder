'use client';

import { useState } from 'react';
import { FileType } from '@/app/api/FileTypeApi';
import { useFileTypeMutations } from '@/hooks/useFileType';
import { Button } from '@/components/ui/button';
import { FileTypeEditDialog } from './FileTypeEditDialog';
import { Pencil, Trash2, Sparkles, AlertTriangle } from 'lucide-react';
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
import { FileTypeTableProps } from '@/typess/FilteType';



export function FileTypeTable({ fileTypes }: FileTypeTableProps) {
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetName, setDeleteTargetName] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteFileType, isDeleting } = useFileTypeMutations();

  const handleEdit = (fileType: FileType) => {
    setSelectedFileType(fileType);
    setIsEditOpen(true);
  };

  const confirmDelete = (id: string, name: string) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteFileType(deleteTargetId);
      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName(null);
    } catch (err: any) {
      console.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="border border-border/40 rounded-3xl overflow-hidden bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader className="bg-muted/50 border-b border-border/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">Name</TableHead>
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">Extension</TableHead>
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">Mime Type</TableHead>
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">Max Size</TableHead>
                <TableHead className="p-4 sm:p-5 font-black text-lg uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="p-4 sm:p-5 text-right font-black text-lg uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border/30">
              {fileTypes.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="p-12 text-center text-muted-foreground font-medium">
                    <div className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-500" />
                      No file types found in the matrix.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                fileTypes.map((fileType) => (
                  <TableRow key={fileType.id} className="hover:bg-fuchsia-500/[0.03] transition-colors group">
                    <TableCell className="p-4 sm:p-5 font-bold text-foreground text-lg">{fileType.name}</TableCell>
                    <TableCell className="p-4 sm:p-5 font-mono text-xs font-semibold text-fuchsia-500 uppercase tracking-wide">
                      {fileType.extension || '-'}
                    </TableCell>
                    <TableCell className="p-4 sm:p-5 font-medium text-muted-foreground">
                      {fileType.mimeType || '-'}
                    </TableCell>
                    <TableCell className="p-4 sm:p-5 font-bold text-foreground">
                      {fileType.maxSizeInMb ? `${fileType.maxSizeInMb} MB` : '-'}
                    </TableCell>
                    <TableCell className="p-4 sm:p-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                        (fileType.status || 'ACTIVE') === 'ACTIVE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {(fileType.status || 'ACTIVE') === 'ACTIVE' ? '🟢 Active' : '🟡 Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="p-4 sm:p-5 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(fileType)}
                        className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all shadow-sm"
                        title="Edit File Type"
                      >
                        <Pencil className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => confirmDelete(fileType.id, fileType.name)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
                        title="Delete File Type"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit File Type Dialog */}
      <FileTypeEditDialog
        fileType={selectedFileType}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
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
                Delete File Type? ⚠️
              </DialogTitle>
              <p className="text-xs text-muted-foreground font-medium">
                Are you sure you want to delete <span className="text-foreground font-bold">{deleteTargetName}</span>? This action is permanent and cannot be undone.
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
    </div>
  );
}