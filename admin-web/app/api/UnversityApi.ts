const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface University {
  id: string;
  name: string;
  code?: string;
  countryId?: string;
  website?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUniversityDto {
  name: string;
  code?: string;
  countryId?: string;
  website?: string;
}

export interface UpdateUniversityDto extends Partial<CreateUniversityDto> {
  status?: string;
}

export interface UniversityResponse {
  success: boolean;
  message: string;
  data: University;
}

export interface UniversitiesPaginatedResponse {
  success: boolean;
  message: string;
  data: University[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const universityApi = {
  // 1. Get All Universities
  async getAll(): Promise<UniversitiesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/universities`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch universities');
    return res.json();
  },

  // 2. Get Single University by ID
  async getById(id: string): Promise<UniversityResponse> {
    const res = await fetch(`${BASE_URL}/universities/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch university');
    return res.json();
  },

  // 3. Create New University
  async create(dto: CreateUniversityDto): Promise<UniversityResponse> {
    const res = await fetch(`${BASE_URL}/universities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create university');
    return res.json();
  },

  // 4. Update University by ID
  async update(id: string, dto: UpdateUniversityDto): Promise<UniversityResponse> {
    const res = await fetch(`${BASE_URL}/universities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update university');
    return res.json();
  },

  // 5. Delete University by ID
  async remove(id: string): Promise<UniversityResponse> {
    const res = await fetch(`${BASE_URL}/universities/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete university');
    return res.json();
  },
};