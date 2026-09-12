import { CertificationProvider } from "@/typess/Certificate-provider";

export interface CertificationProviderResponse {
  success: boolean;
  message: string;
  data: CertificationProvider;
}

export interface CertificationProvidersPaginatedResponse {
  success: boolean;
  message: string;
  data: CertificationProvider[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}