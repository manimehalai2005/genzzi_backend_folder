import { CollegeDepartment } from "@/typess/CollegeDepartment";

export interface CollegeDepartmentEditDialogProps {
  collegeDepartment: CollegeDepartment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}