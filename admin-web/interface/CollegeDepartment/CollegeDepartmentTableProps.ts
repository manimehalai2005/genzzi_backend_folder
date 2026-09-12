import { CollegeDepartment } from "@/typess/CollegeDepartment";

export interface CollegeDepartmentTableProps {
  data: CollegeDepartment[];
  isLoading?: boolean;
  onEdit?: (department: CollegeDepartment) => void;
  onDelete?: (id: string) => void;
}