import { Language } from "@/typess/language";

export interface LanguageResponse {
  success: boolean;
  message: string;
  data: Language;
}

export interface LanguagesPaginatedResponse {
  success: boolean;
  message: string;
  data: Language[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
