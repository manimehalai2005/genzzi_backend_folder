
import { Department } from "@/app/api/DepartmentApi";


export interface DepartmentEditDialogProps {
  department: Department | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export interface DepartmentTableProps {
  departments: Department[];
}