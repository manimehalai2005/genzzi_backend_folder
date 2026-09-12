'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CollegeDepartmentEditDialog } from './CollegeDepartmentEditDialog';
import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
  Building2,
  GraduationCap,
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

import { useDeleteCollegeDepartment } from '@/hooks/useCollegeDepartment';
import { CollegeDepartmentTableProps } from '@/interface/CollegeDepartment/CollegeDepartmentTableProps';
import { CollegeDepartment } from '@/typess/CollegeDepartment';

export function CollegeDepartmentTable({
  data,
  isLoading,
  onDelete,
  onEdit,
}: CollegeDepartmentTableProps) {
  // Safely normalize the data prop to guarantee it's always an array
  const safeData = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : Array.isArray((data as any)?.collegeDepartments)
        ? (data as any).collegeDepartments
        : [];

  const [selectedDepartment, setSelectedDepartment] =
    useState<CollegeDepartment | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [departmentToDelete, setDepartmentToDelete] =
    useState<CollegeDepartment | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteCollegeDepartment, isPending: isDeleting } =
    useDeleteCollegeDepartment();

  const handleEdit = (department: CollegeDepartment) => {
    setSelectedDepartment(department);
    setIsEditOpen(true);
  };

  const handleDelete = (department: CollegeDepartment) => {
    setDepartmentToDelete(department);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!departmentToDelete) return;

    try {
      await deleteCollegeDepartment(departmentToDelete.id);

      setIsDeleteOpen(false);
      setDepartmentToDelete(null);

      toast.success('College department deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/40 backdrop-blur-xl shadow-xl">
        <Sparkles className="w-8 h-8 mx-auto mb-2 text-fuchsia-500 animate-pulse" />

        <p className="font-black text-sm tracking-tight text-foreground">
          Loading college departments...
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          Please wait while we fetch the mappings.
        </p>
      </div>
    );
  }

  if (!safeData || safeData.length === 0) {
    return (
      <div className="text-center py-16 px-4 text-muted-foreground border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/40 backdrop-blur-xl shadow-xl">
        <Sparkles className="w-8 h-8 mx-auto mb-2 text-fuchsia-500" />

        <p className="font-black text-sm tracking-tight text-foreground">
          No college departments found yet bestie!
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          Add your first academic department mapping to start the vibe check.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block rounded-3xl border border-fuchsia-500/20 bg-card/75 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader>
              <TableRow className="bg-muted/30 border-b border-border/40 text-muted-foreground uppercase text-[11px] tracking-wider font-extrabold hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl">
                  College ID
                </TableHead>

                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl">
                  Department ID
                </TableHead>

                <TableHead className="p-4 sm:p-5 text-right font-extrabold text-muted-foreground text-xl">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border/30">
              {safeData.map((department: CollegeDepartment) => (
                <TableRow
                  key={department.id}
                  className="group hover:bg-fuchsia-500/5 transition-all duration-200 border-border/30"
                >
                  {/* College ID */}
                  <TableCell className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-fuchsia-400" />
                      </div>

                      <span className="font-medium text-muted-foreground break-all">
                        {department.collegeId}
                      </span>
                    </div>
                  </TableCell>

                  {/* Department ID */}
                  <TableCell className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-purple-400" />
                      </div>

                      <span className="font-medium text-muted-foreground break-all">
                        {department.departmentId}
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="p-4 sm:p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(department)}
                        className="h-10 w-10 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 transition-all duration-200"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(department)}
                        className="h-10 w-10 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* =========================================================
          MOBILE VIEW
      ========================================================= */}
      <div className="md:hidden space-y-4">
        {safeData.map((department: CollegeDepartment) => (
          <div
            key={department.id}
            className="rounded-3xl border border-fuchsia-500/20 bg-card/75 shadow-xl backdrop-blur-2xl p-4 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest font-black text-fuchsia-400">
                  College Department
                </p>

                <p className="text-sm font-black text-foreground mt-1">
                  Department Mapping
                </p>
              </div>

              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
              </div>
            </div>

            {/* College ID */}
            <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-fuchsia-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    College ID
                  </p>

                  <p className="text-sm font-semibold text-foreground break-all mt-0.5">
                    {department.collegeId}
                  </p>
                </div>
              </div>
            </div>

            {/* Department ID */}
            <div className="rounded-2xl border border-border/40 bg-muted/20 p-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    Department ID
                  </p>

                  <p className="text-sm font-semibold text-foreground break-all mt-0.5">
                    {department.departmentId}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleEdit(department)}
                className="h-11 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 font-bold"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => handleDelete(department)}
                className="h-11 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
          EDIT DIALOG
      ========================================================= */}
      <CollegeDepartmentEditDialog
        collegeDepartment={selectedDepartment}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* =========================================================
          DELETE DIALOG
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
            backdrop-blur-2xl
            duration-200
          "
        >
          {/* Mobile drag indicator */}
          <div className="mx-auto w-12 h-1.5 bg-rose-500/30 rounded-full mb-[-8px] sm:hidden" />

          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto sm:mx-0 shadow-lg shadow-rose-500/10">
              <AlertTriangle className="w-7 h-7 text-rose-500" />
            </div>

            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete College Department Mapping?
              </DialogTitle>

              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                This action is permanent bestie. It will wipe this college
                department mapping from the database completely.
              </p>
            </div>
          </DialogHeader>

          {/* Dialog Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-11 rounded-2xl border-border/80 bg-background/50 hover:bg-muted/50 font-bold w-full sm:w-auto"
            >
              Nevermind
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="h-11 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-lg shadow-rose-500/25 transition-all w-full sm:w-auto"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
