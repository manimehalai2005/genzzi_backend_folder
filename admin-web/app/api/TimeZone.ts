const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Timezone {
  id: string;
  name: string;
  offset?: string;
  gmtOffset?: string;
  abbreviation?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTimezoneDto {
  name: string;
  offset?: string;
  gmtOffset?: string;
  abbreviation?: string;
}

export interface UpdateTimezoneDto extends Partial<CreateTimezoneDto> {
  status?: string;
}

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

export const timezoneApi = {
  // 1. Get All Timezones
  async getAll(): Promise<TimezonesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/timezones`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch timezones');
    return res.json();
  },

  // 2. Get Single Timezone by ID
  async getById(id: string): Promise<TimezoneResponse> {
    const res = await fetch(`${BASE_URL}/timezones/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch timezone');
    return res.json();
  },

  // 3. Create New Timezone
  async create(dto: CreateTimezoneDto): Promise<TimezoneResponse> {
    const res = await fetch(`${BASE_URL}/timezones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create timezone');
    return res.json();
  },

  // 4. Update Timezone by ID
  async update(id: string, dto: UpdateTimezoneDto): Promise<TimezoneResponse> {
    const res = await fetch(`${BASE_URL}/timezones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update timezone');
    return res.json();
  },

  // 5. Delete Timezone by ID
  async remove(id: string): Promise<TimezoneResponse> {
    const res = await fetch(`${BASE_URL}/timezones/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete timezone');
    return res.json();
  },
};