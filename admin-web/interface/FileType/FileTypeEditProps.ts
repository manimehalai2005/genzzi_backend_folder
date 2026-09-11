import { FileType } from "@/typess/FilteType";

export interface FileTypeEditDialogProps {
  fileType: FileType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}