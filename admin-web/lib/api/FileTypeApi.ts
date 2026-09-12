import { axiosInstance } from "@/lib/axios/axiosInstance";
import { FileTypeResponse, FileTypesPaginatedResponse } from "@/response/FileType";
import { CreateFileTypeDto, UpdateFileTypeDto } from "@/typess/FilteType";




export const fileTypeApi = {
  // 1. Get All File Types
  async getAll(): Promise<FileTypesPaginatedResponse> {
    const { data } = await axiosInstance.get<FileTypesPaginatedResponse>('/file-types');
    return data;
  },

  // 2. Get Single File Type by ID
  async getById(id: string): Promise<FileTypeResponse> {
    const { data } = await axiosInstance.get<FileTypeResponse>(`/file-types/${id}`);
    return data;
  },

  // 3. Create New File Type
  async create(dto: CreateFileTypeDto): Promise<FileTypeResponse> {
    const { data } = await axiosInstance.post<FileTypeResponse>('/file-types', dto);
    return data;
  },

  // 4. Update File Type by ID
  async update(id: string, dto: UpdateFileTypeDto): Promise<FileTypeResponse> {
    const { data } = await axiosInstance.put<FileTypeResponse>(`/file-types/${id}`, dto);
    return data;
  },

  // 5. Delete File Type by ID
  async remove(id: string): Promise<FileTypeResponse> {
    const { data } = await axiosInstance.delete<FileTypeResponse>(`/file-types/${id}`);
    return data;
  },
};