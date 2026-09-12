import { FileType } from "@/typess/FilteType";

export interface FileTypeTableProps {
  data: FileType[];
  isLoading?: boolean;
  onEdit?: (fileType: FileType) => void;
  onDelete?: (id: string) => void;
}