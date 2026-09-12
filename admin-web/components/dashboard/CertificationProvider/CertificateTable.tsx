'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  Trash2,
  ExternalLink,
  Globe,
  Hash,
  AlertTriangle,
  Sparkles,
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
import { CertificationProviderEditDialog } from './CertificateEditDialog';
import { useDeleteCertificationProvider } from '@/hooks/useCertificationprovider';
import { CertificationProviderTableProps } from '@/interface/Certificate-provider/CertificationProviderTableProps';
import { CertificationProvider } from '@/typess/Certificate-provider';

export function CertificationProviderTable({
  providers,
}: CertificationProviderTableProps) {
  const safeProviders = Array.isArray(providers)
    ? providers
    : Array.isArray((providers as any)?.data)
      ? (providers as any).data
      : Array.isArray((providers as any)?.providers)
        ? (providers as any).providers
        : [];

  const [selectedProvider, setSelectedProvider] =
    useState<CertificationProvider | null>(null);
  const [providerToDelete, setProviderToDelete] =
    useState<CertificationProvider | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutateAsync: deleteProvider, isPending: isDeleting } =
    useDeleteCertificationProvider();

  const handleEdit = (provider: CertificationProvider) => {
    setSelectedProvider(provider);
    setIsEditOpen(true);
  };

  const handleDelete = (provider: CertificationProvider) => {
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
      toast.error(err?.message || 'Failed to delete certification provider');
    }
  };

  if (safeProviders.length === 0) {
    return (
      <div className="flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-dashed border-fuchsia-500/30 bg-card/40 px-4 py-12 text-center shadow-xl backdrop-blur-xl sm:min-h-[220px]">
        <Sparkles className="mb-2 h-8 w-8 animate-pulse text-fuchsia-500" />
        <p className="text-sm font-black tracking-tight text-foreground sm:text-base">
          No certification providers found!
        </p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Add your first certification provider to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-hidden rounded-3xl border border-fuchsia-500/20 bg-card/75 shadow-2xl backdrop-blur-2xl">
        <div className="hidden overflow-x-auto md:block">
          <Table className="w-full border-collapse text-left text-sm">
            <TableHeader>
              <TableRow className="border-b border-border/40 bg-muted/30 text-muted-foreground hover:bg-transparent">
                <TableHead className="p-4 text-sm font-extrabold uppercase tracking-wider sm:p-5">
                  Name
                </TableHead>
               
                <TableHead className="p-4 text-sm font-extrabold uppercase tracking-wider sm:p-5">
                  Website
                </TableHead>
                <TableHead className="p-4 text-sm font-extrabold uppercase tracking-wider sm:p-5">
                  Status
                </TableHead>
                <TableHead className="p-4 text-right text-sm font-extrabold uppercase tracking-wider sm:p-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border/30">
              {safeProviders.map((provider: CertificationProvider) => (
                <TableRow
                  key={provider.id}
                  className="group border-border/30 transition-all duration-200 hover:bg-fuchsia-500/5"
                >
                  <TableCell className="max-w-[220px] p-4 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-fuchsia-400 sm:p-5">
                    <span className="block truncate">{provider.name}</span>
                  </TableCell>

                

                  <TableCell className="max-w-[250px] p-4 sm:p-5">
                    {provider.website ? (
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 font-medium text-muted-foreground underline underline-offset-4 decoration-fuchsia-500/40 transition-colors hover:text-fuchsia-400"
                      >
                        <Globe className="h-3.5 w-3.5 shrink-0 text-fuchsia-500" />
                        <span className="truncate">{provider.website}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>

                  <TableCell className="p-4 sm:p-5">
                    <span className="inline-flex rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                      {provider.status || 'ACTIVE'}
                    </span>
                  </TableCell>

                  <TableCell className="p-4 sm:p-5">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(provider)}
                        className="h-10 w-10 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 hover:bg-fuchsia-500/20"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(provider)}
                        className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 md:hidden">
          {safeProviders.map((provider: CertificationProvider) => (
            <div
              key={provider.id}
              className="w-full overflow-hidden rounded-2xl border border-fuchsia-500/15 bg-background/60 p-4 shadow-sm transition-all duration-200 hover:bg-fuchsia-500/5"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Provider Name
                  </p>
                  <h3 className="truncate text-base font-bold tracking-tight text-foreground">
                    {provider.name}
                  </h3>
                </div>

                <span className="shrink-0 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[10px] font-semibold text-success">
                  {provider.status || 'ACTIVE'}
                </span>
              </div>

             

              <div className="mt-3 flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-fuchsia-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Website
                  </p>
                  {provider.website ? (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-1 text-sm font-medium text-fuchsia-400 underline underline-offset-4"
                    >
                      <span className="truncate">{provider.website}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                  )}
                </div>
              </div>

              <div className="my-4 border-t border-border/40" />

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(provider)}
                  className="h-10 w-full rounded-xl border-fuchsia-500/30 bg-fuchsia-500/5 text-xs font-semibold text-fuchsia-400 hover:bg-fuchsia-500/15"
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDelete(provider)}
                  className="h-10 w-full rounded-xl border-rose-500/30 bg-rose-500/5 text-xs font-semibold text-rose-500 hover:bg-rose-500/15"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CertificationProviderEditDialog
        provider={selectedProvider}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-3xl border-border/40 bg-card/95 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
          <DialogHeader className="space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 sm:mx-0">
              <AlertTriangle className="h-7 w-7 text-rose-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete <span className="text-rose-500">{providerToDelete?.name}</span>?
              </DialogTitle>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                This action is permanent. This provider will be removed from the database.
              </p>
            </div>
          </DialogHeader>

          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 w-full rounded-2xl font-bold sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="h-11 w-full rounded-2xl bg-rose-500 font-bold text-white hover:bg-rose-600 sm:w-auto"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}