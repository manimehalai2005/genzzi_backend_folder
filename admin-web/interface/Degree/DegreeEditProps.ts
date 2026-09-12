import { Degree } from "@/typess/degree";


export interface DegreeEditDialogProps {
  degree: Degree | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}