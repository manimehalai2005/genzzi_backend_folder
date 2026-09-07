'use client';

import { useState } from 'react';
import { CertificationProvider } from '@/app/api/CertificationProviderApi';
import { useCertificationProviderMutations } from '@/hooks/useCertificationprovider';
import { Button } from '@/components/ui/button';
import { CertificationProviderTableProps } from '@/typess/Certificate-provider';

import { Pencil, Trash2, ExternalLink, Globe, Hash, AlertTriangle } from 'lucide-react';
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
  DialogFooter,
} from '@/components/ui/dialog';
import { CertificationProviderEditDialog } from './CertificateEditDialog';



export function CertificationProviderTable({ providers }: CertificationProviderTableProps) {
  const [selectedProvider, setSelectedProvider] = useState<CertificationProvider | null>(null);
  const [providerToDelete, setProviderToDelete] = useState<CertificationProvider | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deleteProvider, isDeleting } = useCertificationProviderMutations();

  const handleEdit = (provider: CertificationProvider) => {
    setSelectedProvider(provider);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (provider: CertificationProvider) => {
    setProviderToDelete(provider);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!providerToDelete) return;
    try {
      await deleteProvider(providerToDelete.id);
      setIsDeleteOpen(false);
      setProviderToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-xl overflow-hidden backdrop-blur-xl">
      <div className="hidden md:block overflow-x-auto p-5">
        <Table>
          <TableHeader className="bg-muted/50 p-2">
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="font-semibold text-foreground text-xl">Name</TableHead>
              <TableHead className="font-semibold text-foreground text-xl">Code</TableHead>
              <TableHead className="font-semibold text-foreground text-xl">Website</TableHead>
              <TableHead className="font-semibold text-foreground text-xl">Status</TableHead>
              <TableHead className="text-right font-semibold text-foreground text-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground text-lg">
                  No certification providers found.
                </TableCell>
              </TableRow>
            ) : (
              providers.map((provider) => (
                <TableRow key={provider.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground text-lg">{provider.name}</TableCell>
                  <TableCell className="text-muted-foreground text-lg">{provider.code || '-'}</TableCell>
                  <TableCell>
                    {provider.website ? (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brand-gradient-text hover:underline inline-flex items-center gap-1 font-medium text-lg"
                      >
                        {provider.website}
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold bg-success/10 text-success border border-success/20">
                      {provider.status || 'ACTIVE'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(provider)}
                      className="hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-brand-orange" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(provider)}
                      className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-3 p-4 md:hidden">
        {providers.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-center text-muted-foreground text-sm">
            No certification providers found.
          </div>
        ) : (
          providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-background/60 border border-border/60 rounded-xl p-4 shadow-sm space-y-3 relative overflow-hidden glass-sweep"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-foreground text-base">{provider.name}</h3>
                  {provider.code && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Hash className="w-3 h-3 text-brand-orange" />
                      <span>Code: {provider.code}</span>
                    </div>
                  )}
                </div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success/10 text-success border border-success/20 shrink-0">
                  {provider.status || 'ACTIVE'}
                </span>
              </div>

              {provider.website && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Globe className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-gradient-text truncate hover:underline font-medium"
                  >
                    {provider.website}
                  </a>
                </div>
              )}

              <div className="flex items-center justify-end gap-1 pt-2 border-t border-border/40">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(provider)}
                  className="h-8 px-3 text-xs border-brand-orange/30 hover:bg-brand-orange/10 hover:text-brand-orange text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(provider)}
                  className="h-8 px-3 text-xs border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <CertificationProviderEditDialog
        provider={selectedProvider}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="w-[95%] max-w-[425px] rounded-2xl bg-card border-border/50 backdrop-blur-xl modal-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="p-2 rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              Delete Provider
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 space-y-2">
            <p className="text-muted-foreground text-sm">
              Are you sure you want to delete <span className="font-semibold text-foreground">{providerToDelete?.name}</span>? This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="pt-2 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="w-full sm:w-auto border-border bg-background/50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20"
            >
              {isDeleting ? 'Deleting...' : 'Delete Provider'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}