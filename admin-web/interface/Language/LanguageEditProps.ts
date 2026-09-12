import { Language } from "@/typess/language";

export interface LanguageEditDialogProps {
  language: Language | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}