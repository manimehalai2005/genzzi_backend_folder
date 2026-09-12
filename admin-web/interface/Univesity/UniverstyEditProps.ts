import { University } from "@/typess/University";

export interface UniversityEditDialogProps {
  university: University | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}