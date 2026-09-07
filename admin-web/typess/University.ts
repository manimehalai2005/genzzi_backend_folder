import { University } from "@/app/api/UnversityApi";


export interface UniversityEditDialogProps {
  university: University | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UniversityTableProps {
  universities: University[];
}