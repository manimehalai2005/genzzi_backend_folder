import { University } from '@/typess/University';



export interface UniversityTableProps {
  data: University[];
  isLoading?: boolean;
  onEdit?: (university: University) => void;
  onDelete?: (id: string) => void;
}