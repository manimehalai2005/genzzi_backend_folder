const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface City {
  id: string;
  name: string;
  stateId: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCityDto {
  name: string;
  stateId: string;
}

export interface UpdateCityDto extends Partial<CreateCityDto> {
  status?: string;
}

export interface CityResponse {
  success: boolean;
  message: string;
  data: City;
}

export interface CitiesPaginatedResponse {
  success: boolean;
  message: string;
  data: City[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const cityApi = {
  // 1. Get All Cities
  async getAll(): Promise<CitiesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/cities`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch cities');
    return res.json();
  },

  // 2. Get Single City by ID
  async getById(id: string): Promise<CityResponse> {
    const res = await fetch(`${BASE_URL}/cities/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch city');
    return res.json();
  },

  // 3. Create New City
  async create(dto: CreateCityDto): Promise<CityResponse> {
    const res = await fetch(`${BASE_URL}/cities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create city');
    return res.json();
  },

  // 4. Update City by ID
  async update(id: string, dto: UpdateCityDto): Promise<CityResponse> {
    const res = await fetch(`${BASE_URL}/cities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update city');
    return res.json();
  },

  // 5. Delete City by ID
  async remove(id: string): Promise<CityResponse> {
    const res = await fetch(`${BASE_URL}/cities/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete city');
    return res.json();
  },
};