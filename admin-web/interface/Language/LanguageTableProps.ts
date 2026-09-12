import { Language } from "@/typess/language";

export interface LanguageTableProps {
  data: Language[];
  isLoading?: boolean;
  onEdit: (language: Language) => void;
  onDelete: (id: string) => void;
}