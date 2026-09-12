import { CreateCertificationProviderDto, UpdateCertificationProviderDto } from "@/dto/Certificateprovider";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CertificationProviderResponse, CertificationProvidersPaginatedResponse } from "@/response/Certificate-provider";





export const certificationProviderApi = {
  // 1. Get All Certification Providers
  async getAll(): Promise<CertificationProvidersPaginatedResponse> {
    const { data } = await axiosInstance.get<CertificationProvidersPaginatedResponse>('/certification-providers');
    return data;
  },

  // 2. Get Single Certification Provider by ID
  async getById(id: string): Promise<CertificationProviderResponse> {
    const { data } = await axiosInstance.get<CertificationProviderResponse>(`/certification-providers/${id}`);
    return data;
  },

  // 3. Create New Certification Provider
  async create(dto: CreateCertificationProviderDto): Promise<CertificationProviderResponse> {
    const { data } = await axiosInstance.post<CertificationProviderResponse>('/certification-providers', dto);
    return data;
  },

  // 4. Update Certification Provider by ID
  async update(id: string, dto: UpdateCertificationProviderDto): Promise<CertificationProviderResponse> {
    const { data } = await axiosInstance.put<CertificationProviderResponse>(`/certification-providers/${id}`, dto);
    return data;
  },

  // 5. Delete Certification Provider by ID
  async remove(id: string): Promise<CertificationProviderResponse> {
    const { data } = await axiosInstance.delete<CertificationProviderResponse>(`/certification-providers/${id}`);
    return data;
  },
};