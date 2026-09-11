import { Degree } from "@/typess/degree";

export interface DegreeTableProps {
  data: Degree[];
  isLoading?: boolean;
  onEdit?: (degree: Degree) => void;
  onDelete?: (id: string) => void;
}