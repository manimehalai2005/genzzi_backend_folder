import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CurrenciesPaginatedResponse, CurrencyResponse } from "@/response/Currency";
import { CreateCurrencyDto, UpdateCurrencyDto } from "@/typess/Currency";


export const currencyApi = {
  // 1. Get All Currencies
  async getAll(): Promise<CurrenciesPaginatedResponse> {
    const { data } = await axiosInstance.get<CurrenciesPaginatedResponse>('/currencies');
    return data;
  },

  // 2. Get Single Currency by Code
  async getByCode(code: string): Promise<CurrencyResponse> {
    const { data } = await axiosInstance.get<CurrencyResponse>(`/currencies/${code}`);
    return data;
  },

  // 3. Create New Currency
  async create(dto: CreateCurrencyDto): Promise<CurrencyResponse> {
    const { data } = await axiosInstance.post<CurrencyResponse>('/currencies', dto);
    return data;
  },

  // 4. Update Currency by Code
  async update(code: string, dto: UpdateCurrencyDto): Promise<CurrencyResponse> {
    const { data } = await axiosInstance.put<CurrencyResponse>(`/currencies/${code}`, dto);
    return data;
  },

  // 5. Delete Currency by Code
  async remove(code: string): Promise<CurrencyResponse> {
    const { data } = await axiosInstance.delete<CurrencyResponse>(`/currencies/${code}`);
    return data;
  },
};