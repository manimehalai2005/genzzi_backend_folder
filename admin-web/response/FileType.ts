import { FileType } from "@/typess/FilteType";

export interface FileTypeResponse {
  success: boolean;
  message: string;
  data: FileType;
}

export interface FileTypesPaginatedResponse {
  success: boolean;
  message: string;
  data: FileType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}