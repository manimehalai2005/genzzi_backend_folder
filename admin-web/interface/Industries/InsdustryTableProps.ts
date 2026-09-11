import { Industry } from "@/typess/Industries";

export interface IndustryTableProps {
  data: Industry[];
  isLoading?: boolean;         
  onEdit?: (industry: Industry) => void; 
  onDelete?: (id: string) => void;   
}