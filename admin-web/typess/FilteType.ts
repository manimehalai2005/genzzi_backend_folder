export type  FileType = {
  id: string;
  extension?: string;
  mimeType: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFileTypeDto {
  extension: string;
  mimeType: string;
  category?: string;
}

export interface UpdateFileTypeDto extends Partial<CreateFileTypeDto> {
  status?: string;
}