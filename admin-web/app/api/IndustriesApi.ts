const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Industry {
  id: string;
  name: string;
  code?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIndustryDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdateIndustryDto extends Partial<CreateIndustryDto> {
  status?: string;
}

export interface IndustryResponse {
  success: boolean;
  message: string;
  data: Industry;
}

export interface IndustriesPaginatedResponse {
  success: boolean;
  message: string;
  data: Industry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const industryApi = {
  // 1. Get All Industries
  async getAll(): Promise<IndustriesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/industries`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch industries');
    return res.json();
  },

  // 2. Get Single Industry by ID
  async getById(id: string): Promise<IndustryResponse> {
    const res = await fetch(`${BASE_URL}/industries/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch industry');
    return res.json();
  },

  // 3. Create New Industry
  async create(dto: CreateIndustryDto): Promise<IndustryResponse> {
    const res = await fetch(`${BASE_URL}/industries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create industry');
    return res.json();
  },

  // 4. Update Industry by ID
  async update(id: string, dto: UpdateIndustryDto): Promise<IndustryResponse> {
    const res = await fetch(`${BASE_URL}/industries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update industry');
    return res.json();
  },

  // 5. Delete Industry by ID
  async remove(id: string): Promise<IndustryResponse> {
    const res = await fetch(`${BASE_URL}/industries/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete industry');
    return res.json();
  },
};