const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface FileType {
  id: string;
  name: string;
  extension?: string;
  mimeType?: string;
  maxSizeInMb?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFileTypeDto {
  name: string;
  extension?: string;
  mimeType?: string;
  maxSizeInMb?: number;
}

export interface UpdateFileTypeDto extends Partial<CreateFileTypeDto> {
  status?: string;
}

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

export const fileTypeApi = {
  // 1. Get All File Types
  async getAll(): Promise<FileTypesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/file-types`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch file types');
    return res.json();
  },

  // 2. Get Single File Type by ID
  async getById(id: string): Promise<FileTypeResponse> {
    const res = await fetch(`${BASE_URL}/file-types/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch file type');
    return res.json();
  },

  // 3. Create New File Type
  async create(dto: CreateFileTypeDto): Promise<FileTypeResponse> {
    const res = await fetch(`${BASE_URL}/file-types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create file type');
    return res.json();
  },

  // 4. Update File Type by ID
  async update(id: string, dto: UpdateFileTypeDto): Promise<FileTypeResponse> {
    const res = await fetch(`${BASE_URL}/file-types/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update file type');
    return res.json();
  },

  // 5. Delete File Type by ID
  async remove(id: string): Promise<FileTypeResponse> {
    const res = await fetch(`${BASE_URL}/file-types/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete file type');
    return res.json();
  },
};