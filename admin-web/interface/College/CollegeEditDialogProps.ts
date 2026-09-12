import { College } from "@/typess/College";

export interface CollegeEditDialogProps {
  college: College | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}