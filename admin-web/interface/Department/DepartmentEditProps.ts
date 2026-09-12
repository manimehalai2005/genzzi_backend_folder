import { Department } from "@/typess/Department";

export interface DepartmentEditDialogProps {
  department: Department | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}