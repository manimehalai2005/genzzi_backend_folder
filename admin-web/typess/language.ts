import { Language } from "@/app/api/LanguageApi";

export interface LanguageEditDialogProps {
  language: Language | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface LanguageTableProps {
  languages: Language[];
}