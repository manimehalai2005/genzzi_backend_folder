const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Degree {
  id: string;
  name: string;
  code?: string;
  level?: string; // e.g., 'UG', 'PG', 'PHD'
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDegreeDto {
  name: string;
  code?: string;
  level?: string;
}

export interface UpdateDegreeDto extends Partial<CreateDegreeDto> {
  status?: string;
}

export interface DegreeResponse {
  success: boolean;
  message: string;
  data: Degree;
}

export interface DegreesPaginatedResponse {
  success: boolean;
  message: string;
  data: Degree[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const degreeApi = {
  // 1. Get All Degrees
  async getAll(): Promise<DegreesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/degrees`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch degrees');
    return res.json();
  },

  // 2. Get Single Degree by ID
  async getById(id: string): Promise<DegreeResponse> {
    const res = await fetch(`${BASE_URL}/degrees/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch degree');
    return res.json();
  },

  // 3. Create New Degree
  async create(dto: CreateDegreeDto): Promise<DegreeResponse> {
    const res = await fetch(`${BASE_URL}/degrees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create degree');
    return res.json();
  },

  // 4. Update Degree by ID
  async update(id: string, dto: UpdateDegreeDto): Promise<DegreeResponse> {
    const res = await fetch(`${BASE_URL}/degrees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update degree');
    return res.json();
  },

  // 5. Delete Degree by ID
  async remove(id: string): Promise<DegreeResponse> {
    const res = await fetch(`${BASE_URL}/degrees/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete degree');
    return res.json();
  },
};