import { FileType } from "@/app/api/FileTypeApi";


export interface FileTypeEditDialogProps {
  fileType: FileType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export interface FileTypeTableProps {
  fileTypes: FileType[];
}