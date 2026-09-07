import { Industry } from "@/app/api/IndustriesApi";

export interface IndustryEditDialogProps {
  industry: Industry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface IndustryTableProps {
  industries: Industry[];
}