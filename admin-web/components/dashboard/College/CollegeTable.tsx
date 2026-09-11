'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CollegeEditDialog } from './CollegeEditDialog';

import {
  Pencil,
  Trash2,
  Sparkles,
  AlertTriangle,
  Globe,
  Hash,
  ExternalLink,
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

import { useDeleteCollege } from '@/hooks/useCollegehook';
import { College } from '@/typess/College';
import { CollegeTableProps } from '@/interface/College/CollegeTableProps';

export function CollegeTable({ colleges }: CollegeTableProps) {
  // Safely normalize the colleges prop to guarantee it's always an array
  const safeColleges = Array.isArray(colleges)
    ? colleges
    : Array.isArray((colleges as any)?.data)
      ? (colleges as any).data
      : Array.isArray((colleges as any)?.colleges)
        ? (colleges as any).colleges
        : [];

  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutateAsync: deleteCollege, isPending: isDeleting } =
    useDeleteCollege();

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (college: College) => {
    setSelectedCollege(college);
    setIsEditOpen(true);
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = (college: College) => {
    setCollegeToDelete(college);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!collegeToDelete) return;

    try {
      await deleteCollege(collegeToDelete.id);

      setIsDeleteOpen(false);
      setCollegeToDelete(null);

      toast.success('College deleted successfully! 🗑️');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete';

      toast.error(errorMessage);
    }
  };

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!safeColleges || safeColleges.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[180px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-fuchsia-500/30
          bg-card/40
          px-4
          py-12
          text-center
          shadow-xl
          backdrop-blur-xl
          sm:min-h-[220px]
        "
      >
        <Sparkles
          className="
            mb-2
            h-8
            w-8
            animate-pulse
            text-fuchsia-500
          "
        />

        <p
          className="
            text-sm
            font-black
            tracking-tight
            text-foreground
            sm:text-base
          "
        >
          No colleges found yet bestie!
        </p>

        <p
          className="
            mt-1
            max-w-sm
            text-xs
            leading-relaxed
            text-muted-foreground
            sm:text-sm
          "
        >
          Add your first academic institution to start the vibe check.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-fuchsia-500/20
          bg-card/75
          shadow-2xl
          backdrop-blur-2xl
        "
      >
        {/* ===================================================
            DESKTOP / TABLET VIEW
            md = 768px+
        =================================================== */}

        <div className="hidden overflow-x-auto md:block">
          <Table className="w-full border-collapse text-left text-sm">
            {/* TABLE HEADER */}

            <TableHeader>
              <TableRow
                className="
                  border-b
                  border-border/40
                  bg-muted/30
                  text-muted-foreground
                  hover:bg-transparent
                "
              >
                <TableHead
                  className="
                    p-4
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-wider
                    sm:p-5
                    sm:text-base
                  "
                >
                  Name
                </TableHead>

                <TableHead
                  className="
                    p-4
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-wider
                    sm:p-5
                    sm:text-base
                  "
                >
                  Code
                </TableHead>

                <TableHead
                  className="
                    p-4
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-wider
                    sm:p-5
                    sm:text-base
                  "
                >
                  Website
                </TableHead>

                <TableHead
                  className="
                    p-4
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-wider
                    sm:p-5
                    sm:text-base
                  "
                >
                  Status
                </TableHead>

                <TableHead
                  className="
                    p-4
                    text-right
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-wider
                    sm:p-5
                    sm:text-base
                  "
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* TABLE BODY */}

            <TableBody className="divide-y divide-border/30">
              {safeColleges.map((college: College) => (
                <TableRow
                  key={college.id}
                  className="
                    group
                    border-border/30
                    transition-all
                    duration-200
                    hover:bg-fuchsia-500/5
                  "
                >
                  {/* NAME */}

                  <TableCell
                    className="
                      max-w-[220px]
                      p-4
                      text-base
                      font-bold
                      tracking-tight
                      text-foreground
                      transition-colors
                      group-hover:text-fuchsia-400
                      sm:p-5
                    "
                  >
                    <span className="block truncate">{college.name}</span>
                  </TableCell>

                  {/* CODE */}

                  <TableCell
                    className="
                      p-4
                      font-medium
                      text-muted-foreground
                      sm:p-5
                    "
                  >
                    {college.code ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Hash
                          className="
                            h-3.5
                            w-3.5
                            text-fuchsia-500
                          "
                        />

                        {college.code}
                      </span>
                    ) : (
                      '-'
                    )}
                  </TableCell>

                  {/* WEBSITE */}

                  <TableCell
                    className="
                      max-w-[250px]
                      p-4
                      sm:p-5
                    "
                  >
                    {college.website ? (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          max-w-full
                          items-center
                          gap-1.5
                          font-medium
                          text-muted-foreground
                          underline
                          underline-offset-4
                          decoration-fuchsia-500/40
                          transition-colors
                          hover:text-fuchsia-400
                        "
                      >
                        <span className="truncate">{college.website}</span>

                        <ExternalLink
                          className="
                            h-3
                            w-3
                            shrink-0
                            opacity-70
                          "
                        />
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>

                  {/* STATUS */}

                  <TableCell className="p-4 sm:p-5"></TableCell>

                  {/* ACTIONS */}

                  <TableCell className="p-4 sm:p-5">
                    <div
                      className="
                        flex
                        justify-end
                        gap-1.5
                      "
                    >
                      {/* EDIT */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(college)}
                        className="
                          h-10
                          w-10
                          rounded-2xl
                          bg-fuchsia-500/10
                          text-fuchsia-400
                          transition-all
                          duration-200
                          hover:bg-fuchsia-500/20
                          hover:text-fuchsia-400
                        "
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* DELETE */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(college)}
                        className="
                          h-10
                          w-10
                          rounded-2xl
                          bg-rose-500/10
                          text-rose-500
                          transition-all
                          duration-200
                          hover:bg-rose-500/20
                          hover:text-rose-500
                        "
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

        {/* ===================================================
            MOBILE CARD VIEW
            Below md = 768px
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            p-3
            sm:gap-4
            sm:p-4
            md:hidden
          "
        >
          {safeColleges.map((college: College) => (
            <div
              key={college.id}
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-fuchsia-500/15
                bg-background/60
                p-4
                shadow-sm
                transition-all
                duration-200
                hover:bg-fuchsia-500/5
              "
            >
              {/* =============================================
                  MOBILE COLLEGE HEADER
              ============================================= */}

              <div
                className="
                  flex
                  min-w-0
                  items-start
                  justify-between
                  gap-3
                "
              >
                {/* College Name */}

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    College Name
                  </p>

                  <h3
                    className="
                      truncate
                      text-base
                      font-bold
                      tracking-tight
                      text-foreground
                    "
                  >
                    {college.name}
                  </h3>
                </div>
              </div>

              {/* =============================================
                  CODE
              ============================================= */}

              <div className="mt-4 flex items-center gap-2">
                <Hash
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-fuchsia-500
                  "
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Code
                  </p>

                  <p className="truncate text-sm font-medium text-foreground">
                    {college.code || '-'}
                  </p>
                </div>
              </div>

              {/* =============================================
                  WEBSITE
              ============================================= */}

              <div className="mt-3 flex items-center gap-2">
                <Globe
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-fuchsia-500
                  "
                />

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Website
                  </p>

                  {college.website ? (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-1
                        text-sm
                        font-medium
                        text-fuchsia-400
                        underline
                        underline-offset-4
                        decoration-fuchsia-500/40
                      "
                    >
                      <span className="truncate">{college.website}</span>

                      <ExternalLink
                        className="
                          h-3
                          w-3
                          shrink-0
                          opacity-70
                        "
                      />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                  )}
                </div>
              </div>

              {/* =============================================
                  DIVIDER
              ============================================= */}

              <div
                className="
                  my-4
                  border-t
                  border-border/40
                "
              />

              {/* =============================================
                  MOBILE ACTION BUTTONS
              ============================================= */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >
                {/* EDIT */}

                <Button
                  variant="outline"
                  onClick={() => handleEdit(college)}
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border-fuchsia-500/30
                    bg-fuchsia-500/5
                    text-xs
                    font-semibold
                    text-fuchsia-400
                    transition-all
                    hover:bg-fuchsia-500/10
                    hover:text-fuchsia-400
                    active:scale-[0.98]
                  "
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>

                {/* DELETE */}

                <Button
                  variant="outline"
                  onClick={() => handleDelete(college)}
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border-rose-500/30
                    bg-rose-500/5
                    text-xs
                    font-semibold
                    text-rose-500
                    transition-all
                    hover:bg-rose-500/10
                    hover:text-rose-500
                    active:scale-[0.98]
                  "
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          EDIT DIALOG
      ===================================================== */}

      <CollegeEditDialog
        college={selectedCollege}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* =====================================================
          DELETE CONFIRMATION DIALOG
      ===================================================== */}

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
            border-border/40
            bg-card/95
            p-5
            shadow-2xl
            backdrop-blur-2xl
            duration-200
            sm:p-7
          "
        >
          {/* Mobile drag indicator */}

          <div
            className="
              mx-auto
              mb-[-8px]
              h-1.5
              w-12
              rounded-full
              bg-rose-500/30
              sm:hidden
            "
          />

          {/* HEADER */}

          <DialogHeader
            className="
              space-y-3
              text-center
              sm:text-left
            "
          >
            {/* Warning Icon */}

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-rose-500/20
                bg-rose-500/10
                shadow-lg
                shadow-rose-500/10
                sm:mx-0
              "
            >
              <AlertTriangle
                className="
                  h-7
                  w-7
                  text-rose-500
                "
              />
            </div>

            {/* TITLE */}

            <div>
              <DialogTitle
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                Delete{' '}
                <span className="text-rose-500">{collegeToDelete?.name}</span>?
              </DialogTitle>

              <p
                className="
                  mt-1.5
                  text-xs
                  leading-relaxed
                  text-muted-foreground
                "
              >
                This action is permanent. It will wipe this institution from the
                database completely.
              </p>
            </div>
          </DialogHeader>

          {/* ACTION BUTTONS */}

          <div
            className="
              flex
              flex-col-reverse
              gap-2.5
              pt-2
              sm:flex-row
              sm:justify-end
            "
          >
            {/* CANCEL */}

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="
                h-11
                w-full
                rounded-2xl
                border-border/80
                bg-background/50
                font-bold
                hover:bg-muted/50
                sm:w-auto
              "
            >
              Nevermind
            </Button>

            {/* DELETE */}

            <Button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="
                h-11
                w-full
                rounded-2xl
                bg-rose-500
                font-bold
                text-white
                shadow-lg
                shadow-rose-500/25
                transition-all
                hover:bg-rose-600
                active:scale-[0.98]
                sm:w-auto
              "
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
