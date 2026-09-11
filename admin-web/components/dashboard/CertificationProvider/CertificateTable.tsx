'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  Trash2,
  ExternalLink,
  Globe,
  Hash,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

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
import { useDeleteCertificationProvider } from '@/hooks/useCertificationprovider';
import { CertificationProviderTableProps } from '@/interface/Certificate-provider/CertificationProviderTableProps';
import { CertificationProvider } from '@/typess/Certificate-provider';

export function CertificationProviderTable({
  providers,
}: CertificationProviderTableProps) {
  const [selectedProvider, setSelectedProvider] =
    useState<CertificationProvider | null>(null);

  const [providerToDelete, setProviderToDelete] =
    useState<CertificationProvider | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    mutateAsync: deleteProvider,
    isPending: isDeleting,
  } = useDeleteCertificationProvider();

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

      toast.success('Certification provider deleted successfully! ✨');
    } catch (err: any) {
      toast.error(
        err.message || 'Failed to delete certification provider'
      );
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl backdrop-blur-xl">

      {/* =====================================================
          MOBILE VIEW
      ===================================================== */}
      <div className="block space-y-3 p-3 sm:hidden">

        {providers.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center text-center text-sm text-muted-foreground">
            No certification providers found.
          </div>
        ) : (
          providers.map((provider) => (
            <div
              key={provider.id}
              className="
                w-full
                rounded-xl
                border border-border/50
                bg-background/50
                p-4
                shadow-sm
                transition-all
                hover:bg-muted/30
              "
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-foreground">
                    {provider.name}
                  </h3>

                  {provider.code && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Hash className="h-3.5 w-3.5 text-brand-orange" />
                      <span>{provider.code}</span>
                    </div>
                  )}
                </div>

                {/* Status */}
                <span
                  className="
                    shrink-0
                    rounded-full
                    border border-success/20
                    bg-success/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    text-success
                  "
                >
                  {provider.status || 'ACTIVE'}
                </span>
              </div>

              {/* Website */}
              <div className="mt-4">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Website
                </p>

                {provider.website ? (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      brand-gradient-text
                      hover:underline
                    "
                  >
                    <Globe className="h-4 w-4 shrink-0 text-brand-purple" />

                    <span className="min-w-0 truncate">
                      {provider.website}
                    </span>

                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    -
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 border-t border-border/40 pt-3">

                <Button
                  variant="outline"
                  onClick={() => handleEdit(provider)}
                  className="
                    h-10
                    flex-1
                    border-border
                    text-sm
                    hover:border-brand-orange/40
                    hover:bg-brand-orange/10
                    hover:text-brand-orange
                  "
                >
                  <Pencil className="mr-2 h-4 w-4 text-brand-orange" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(provider)}
                  className="
                    h-10
                    flex-1
                    border-destructive/30
                    text-sm
                    text-destructive
                    hover:bg-destructive/10
                  "
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* =====================================================
          DESKTOP / TABLET VIEW
      ===================================================== */}
      <div className="hidden overflow-x-auto p-3 sm:block sm:p-5">
        <Table className="w-full">
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border/50 hover:bg-transparent">

              <TableHead className="text-sm font-semibold text-foreground lg:text-base">
                Name
              </TableHead>

              <TableHead className="text-sm font-semibold text-foreground lg:text-base">
                Code
              </TableHead>

              <TableHead className="text-sm font-semibold text-foreground lg:text-base">
                Website
              </TableHead>

              <TableHead className="text-sm font-semibold text-foreground lg:text-base">
                Status
              </TableHead>

              <TableHead className="text-right text-sm font-semibold text-foreground lg:text-base">
                Actions
              </TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>
            {providers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-base text-muted-foreground"
                >
                  No certification providers found.
                </TableCell>
              </TableRow>
            ) : (
              providers.map((provider) => (
                <TableRow
                  key={provider.id}
                  className="
                    border-border/40
                    transition-colors
                    hover:bg-muted/30
                  "
                >
                  {/* Name */}
                  <TableCell className="max-w-[180px] font-medium text-foreground">
                    <span className="block truncate">
                      {provider.name}
                    </span>
                  </TableCell>

                  {/* Code */}
                  <TableCell className="text-muted-foreground">
                    {provider.code ? (
                      <span className="inline-flex items-center gap-1">
                        <Hash className="h-3.5 w-3.5 text-brand-orange" />
                        {provider.code}
                      </span>
                    ) : (
                      '-'
                    )}
                  </TableCell>

                  {/* Website */}
                  <TableCell className="max-w-[250px]">
                    {provider.website ? (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          max-w-full
                          items-center
                          gap-1
                          font-medium
                          brand-gradient-text
                          hover:underline
                        "
                      >
                        <span className="truncate">
                          {provider.website}
                        </span>

                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        -
                      </span>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        border-success/20
                        bg-success/10
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-success
                      "
                    >
                      {provider.status || 'ACTIVE'}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(provider)}
                        className="
                          h-9
                          w-9
                          hover:bg-brand-orange/10
                        "
                      >
                        <Pencil className="h-4 w-4 text-brand-orange" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(provider)}
                        className="
                          h-9
                          w-9
                          hover:bg-destructive/10
                        "
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* =====================================================
          EDIT DIALOG
      ===================================================== */}
      <CertificationProviderEditDialog
        provider={selectedProvider}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* =====================================================
          DELETE DIALOG
      ===================================================== */}
      <Dialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      >
        <DialogContent
          className="
            w-[calc(100%-2rem)]
            max-w-[425px]
            rounded-2xl
            border-border/50
            bg-card
            p-5
            backdrop-blur-xl
            sm:p-6
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                flex
                items-center
                gap-2
                text-lg
                font-bold
                text-foreground
                sm:text-xl
              "
            >
              <div className="shrink-0 rounded-full bg-destructive/10 p-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>

              Delete Provider
            </DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <p className="text-sm leading-6 text-muted-foreground">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-foreground">
                {providerToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 pt-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 w-full sm:h-10 sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="h-11 w-full sm:h-10 sm:w-auto"
            >
              {isDeleting ? 'Deleting...' : 'Delete Provider'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}