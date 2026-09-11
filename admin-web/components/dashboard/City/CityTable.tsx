'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { CityEditDialog } from './CityEditDialog';
import { Button } from '@/components/ui/button';

import {
  Pencil,
  Trash2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useDeleteCity } from '@/hooks/useCityhook';
import { City } from '@/typess/City';
import { CityTableProps } from '@/interface/City/CityTableProps';

export function CityTable({ cities }: CityTableProps) {
  const [selectedCity, setSelectedCity] =
    useState<City | null>(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  // Delete modal state
  const [cityToDelete, setCityToDelete] =
    useState<City | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const {
    mutateAsync: deleteCity,
    isPending: isDeleting,
  } = useDeleteCity();

  // =========================================================
  // DELETE CITY
  // =========================================================

  const confirmDelete = async () => {
    if (!cityToDelete) return;

    try {
      await deleteCity(cityToDelete.id);

      setIsDeleteOpen(false);
      setCityToDelete(null);

      toast.success('City deleted successfully! ✨');
    } catch (error: any) {
      console.error('Failed to delete city:', error);

      toast.error(
        error?.message || 'Failed to delete city'
      );
    }
  };

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!cities || cities.length === 0) {
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
          border-border/60
          bg-card/40
          px-4
          py-12
          text-center
          text-muted-foreground
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
            text-brand-orange
          "
        />

        <p
          className="
            text-sm
            font-bold
            tracking-tight
            text-foreground
            sm:text-base
          "
        >
          No cities found yet!
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
          Add your first record to start
          vibe-checking your regions.
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
          border-border/40
          bg-card/75
          shadow-2xl
          backdrop-blur-2xl
        "
      >
        {/* ===================================================
            DESKTOP TABLE VIEW
            Visible from md (768px)
        =================================================== */}

        <div className="hidden overflow-x-auto md:block">
          <table
            className="
              w-full
              border-collapse
              text-left
              text-sm
            "
          >
            {/* ================= TABLE HEADER ================= */}

            <thead
              className="
                border-b
                border-border/40
                bg-muted/30
                text-muted-foreground
              "
            >
              <tr>
                <th
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
                  City Name
                </th>

                <th
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
                </th>

                <th
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
                </th>
              </tr>
            </thead>

            {/* ================= TABLE BODY ================= */}

            <tbody className="divide-y divide-border/30">
              {cities.map((ct) => (
                <tr
                  key={ct.id}
                  className="
                    group
                    transition-all
                    duration-200
                    hover:bg-muted/20
                  "
                >
                  {/* CITY NAME */}

                  <td
                    className="
                      max-w-[300px]
                      p-4
                      text-base
                      font-bold
                      tracking-tight
                      text-foreground
                      transition-colors
                      group-hover:text-brand-orange
                      sm:p-5
                    "
                  >
                    <span className="block truncate">
                      {ct.name}
                    </span>
                  </td>

                  {/* STATUS */}

                  

                  {/* ACTIONS */}

                  <td className="p-4 sm:p-5">
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
                        onClick={() => {
                          setSelectedCity(ct);
                          setIsEditOpen(true);
                        }}
                        className="
                          h-10
                          w-10
                          rounded-2xl
                          bg-blue-500/10
                          text-blue-500
                          transition-all
                          duration-200
                          hover:bg-blue-500/20
                          hover:text-blue-600
                        "
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* DELETE */}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCityToDelete(ct);
                          setIsDeleteOpen(true);
                        }}
                        className="
                          h-10
                          w-10
                          rounded-2xl
                          bg-rose-500/10
                          text-rose-500
                          transition-all
                          duration-200
                          hover:bg-rose-500/20
                          hover:text-rose-600
                        "
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            MOBILE CARD VIEW
            Visible below md (less than 768px)
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            p-3
            sm:p-4
            md:hidden
          "
        >
          {cities.map((ct) => (
            <div
              key={ct.id}
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-border/50
                bg-background/60
                p-4
                shadow-sm
                transition-all
                duration-200
                hover:bg-muted/20
              "
            >
              {/* =============================================
                  CITY INFORMATION
              ============================================= */}

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                "
              >
                {/* City Name */}

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
                    City Name
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
                    {ct.name}
                  </h3>
                </div>

                {/* Status */}

              
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
                {/* EDIT BUTTON */}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCity(ct);
                    setIsEditOpen(true);
                  }}
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border-blue-500/30
                    bg-blue-500/5
                    text-xs
                    font-semibold
                    text-blue-500
                    transition-all
                    hover:bg-blue-500/10
                    hover:text-blue-600
                    active:scale-[0.98]
                  "
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />

                  Edit
                </Button>

                {/* DELETE BUTTON */}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCityToDelete(ct);
                    setIsDeleteOpen(true);
                  }}
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
                    hover:text-rose-600
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

      <CityEditDialog
        city={selectedCity}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCity(null);
        }}
      />

      {/* =====================================================
          DELETE CONFIRMATION DIALOG
      ===================================================== */}

      <Dialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      >
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
              bg-rose-500/35
              sm:hidden
            "
          />

          {/* =================================================
              DELETE HEADER
          ================================================= */}

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

            {/* Title + Description */}

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
                <span className="text-rose-500">
                  {cityToDelete?.name}
                </span>
                ?
              </DialogTitle>

              <p
                className="
                  mt-1.5
                  text-xs
                  leading-relaxed
                  text-muted-foreground
                "
              >
                This action is irreversible. It will
                wipe this city record completely from
                the database. Proceed with caution.
              </p>
            </div>
          </DialogHeader>

          {/* =================================================
              DELETE ACTIONS
          ================================================= */}

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
              onClick={() => {
                setIsDeleteOpen(false);
              }}
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

            {/* CONFIRM DELETE */}

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
              {isDeleting
                ? 'Deleting...'
                : 'Yes, Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}