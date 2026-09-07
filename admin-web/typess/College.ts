import { College } from "@/app/api/CollegeApi";

export interface CollegeEditDialogProps {
  college: College | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export 
interface CollegeTableProps {
  colleges: College[];
}