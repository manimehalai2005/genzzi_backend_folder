import { CountriesPaginatedResponse, CountryResponse } from "@/response/Country";
import { axiosInstance } from "../axios/axiosInstance";
import { CreateCountryDto, UpdateCountryDto } from "@/typess/Country";

export const countryApi = {
  async getAll(
    page = 1,
    limit = 10
  ): Promise<CountriesPaginatedResponse> {
    const { data } =
      await axiosInstance.get<CountriesPaginatedResponse>(
        '/countries',
        {
          params: { page, limit },
        }
      );

    return data;
  },

  async getById(id: string): Promise<CountryResponse> {
    const { data } =
      await axiosInstance.get<CountryResponse>(
        `/countries/${id}`
      );

    return data;
  },

  async create(
    dto: CreateCountryDto
  ): Promise<CountryResponse> {
    const { data } =
      await axiosInstance.post<CountryResponse>(
        '/countries',
        dto
      );

    return data;
  },

  async update(
    id: string,
    dto: UpdateCountryDto
  ): Promise<CountryResponse> {
    const { data } =
      await axiosInstance.put<CountryResponse>(
        `/countries/${id}`,
        dto
      );

    return data;
  },

  async remove(id: string): Promise<CountryResponse> {
    const { data } =
      await axiosInstance.delete<CountryResponse>(
        `/countries/${id}`
      );

    return data;
  },
};