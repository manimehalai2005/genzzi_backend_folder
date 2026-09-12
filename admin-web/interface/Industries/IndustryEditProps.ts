import { Industry } from "@/typess/Industries";

export interface IndustryEditDialogProps {
  industry: Industry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}