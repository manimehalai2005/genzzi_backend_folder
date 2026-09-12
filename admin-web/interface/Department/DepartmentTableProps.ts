import { Department } from "@/typess/Department";

export interface DepartmentTableProps {
  data: Department[];
  isLoading?: boolean;
  onEdit?: (department: Department) => void;
  onDelete?: (id: string) => void;
}