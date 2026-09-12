import { Currency } from "@/typess/Currency";

export interface CurrencyResponse {
  success: boolean;
  message: string;
  data: Currency;
}

export interface CurrenciesPaginatedResponse {
  success: boolean;
  message: string;
  data: Currency[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}