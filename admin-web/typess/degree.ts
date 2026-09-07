import { Degree } from "@/app/api/DegreeApi";


export interface DegreeEditDialogProps {
degree: Degree | null;
open: boolean;
onOpenChange: (open: boolean) => void;
}
export interface DegreeTableProps {
  degrees: Degree[];
}