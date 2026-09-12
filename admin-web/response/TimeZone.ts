import { Timezone } from "@/typess/TimeZone";

export interface TimezoneResponse {
  success: boolean;
  message: string;
  data: Timezone;
}

export interface TimezonesPaginatedResponse {
  success: boolean;
  message: string;
  data: Timezone[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
