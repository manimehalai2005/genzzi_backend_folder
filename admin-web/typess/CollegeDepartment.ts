import { CollegeDepartment } from "@/app/api/CollegeDepartmentApi";

export  interface CreateCollegeDepartmentDto {
  collegeId: string;
  departmentId: string; 
}
export interface CollegeDepartmentEditDialogProps {
  collegeDepartment: CollegeDepartment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export interface CollegeDepartmentTableProps {
  collegeDepartments: CollegeDepartment[];
}