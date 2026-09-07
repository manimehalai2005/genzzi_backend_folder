'use client';

import { useState } from 'react';
import { CollegeDepartment } from '@/app/api/CollegeDepartmentApi';
import { useCollegeDepartmentMutations } from '@/hooks/useCollegeDepartment';
import { Button } from '@/components/ui/button';
import { CollegeDepartmentEditDialog } from './CollegeDepartmentEditDialog';
import { Pencil, Trash2, Sparkles, AlertTriangle } from 'lucide-react';
import { CollegeDepartmentTableProps } from '@/typess/CollegeDepartment';
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
} from "@/components/ui/dialog";



export function CollegeDepartmentTable({ collegeDepartments }: CollegeDepartmentTableProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<CollegeDepartment | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Delete modal state
  const [departmentToDelete, setDepartmentToDelete] = useState<CollegeDepartment | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteCollegeDepartment, isDeleting } = useCollegeDepartmentMutations();

  const handleEdit = (department: CollegeDepartment) => {
    setSelectedDepartment(department);
    setIsEditOpen(true);
  };

  const confirmDelete = async () => {
    if (!departmentToDelete) return;
    try {
      await deleteCollegeDepartment(departmentToDelete.id);
      setIsDeleteOpen(false);
      setDepartmentToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  if (!collegeDepartments || collegeDepartments.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-fuchsia-500/30 rounded-3xl bg-card/40 backdrop-blur-xl shadow-xl">
        <Sparkles className="w-8 h-8 mx-auto mb-2 text-fuchsia-500 " />
        <p className="font-black text-sm tracking-tight text-foreground">No college departments found yet bestie!</p>
        <p className="text-xs text-muted-foreground mt-1">Add your first academic department mapping to start the vibe check.</p>
      </div>
    );
  }

  return (
    <>
      {/* Gen-Z Neon Container with Glassmorphism */}
      <div className="rounded-3xl border border-fuchsia-500/20 bg-card/75 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm border-collapse">
            <TableHeader>
              <TableRow className="bg-muted/30 border-b border-border/40 text-muted-foreground uppercase text-[11px] tracking-wider font-extrabold hover:bg-transparent">
                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl">Name</TableHead>
                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl">Code</TableHead>
                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl">College ID</TableHead>
                <TableHead className="p-4 sm:p-5 font-extrabold text-muted-foreground text-xl ">Status</TableHead>
                <TableHead className="p-4 sm:p-5 text-right font-extrabold text-muted-foreground text-xl">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border/30">
              {collegeDepartments.map((department) => (
                <TableRow key={department.id} className="group hover:bg-fuchsia-500/5 transition-all duration-200 border-border/30">
                  <TableCell className="p-4 sm:p-5 font-bold text-foreground tracking-tight text-base group-hover:text-fuchsia-400 transition-colors">
                    {department.name}
                  </TableCell>
                  <TableCell className="p-4 sm:p-5 font-medium text-muted-foreground">
                    {department.code || '-'}
                  </TableCell>
                  <TableCell className="p-4 sm:p-5 truncate max-w-[200px] text-muted-foreground font-medium underline underline-offset-4 decoration-fuchsia-500/40">
                    {department.collegeId || '-'}
                  </TableCell>
                  <TableCell className="p-4 sm:p-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-sm ${
                        department.status === 'INACTIVE'
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${department.status === 'INACTIVE' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
                      {department.status || 'ACTIVE'}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 sm:p-5 text-right space-x-1.5">
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
                      onClick={() => {
                        setDepartmentToDelete(department);
                        setIsDeleteOpen(true);
                      }}
                      className="h-10 w-10 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal Component */}
      <CollegeDepartmentEditDialog
        collegeDepartment={selectedDepartment}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Gen-Z Custom Delete Confirmation Dialog */}
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
            p-6
            sm:p-7
            shadow-2xl
            backdrop-blur-2xl
            duration-200
          "
        >
          <div className="mx-auto w-12 h-1.5 bg-rose-500/30 rounded-full mb-[-8px] sm:hidden" />
          
          <DialogHeader className="space-y-3 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto sm:mx-0 shadow-lg shadow-rose-500/10">
              <AlertTriangle className="w-7 h-7 text-rose-500 " />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-foreground">
                Delete <span className="text-rose-500">{departmentToDelete?.name}</span>? 
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                This action is permanent bestie. It will wipe this college department mapping from the database completely.
              </p>
            </div>
          </DialogHeader>

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
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}