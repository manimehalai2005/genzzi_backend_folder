const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface College {
  id: string;
  name: string;
  code?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  website?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCollegeDto {
  name: string;
  code?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  website?: string;
}

export interface UpdateCollegeDto extends Partial<CreateCollegeDto> {
  status?: string;
}

export interface CollegeResponse {
  success: boolean;
  message: string;
  data: College;
}

export interface CollegesPaginatedResponse {
  success: boolean;
  message: string;
  data: College[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const collegeApi = {
  // 1. Get All Colleges
  async getAll(): Promise<CollegesPaginatedResponse> {
    const res = await fetch(`${BASE_URL}/colleges`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch colleges');
    return res.json();
  },

  // 2. Get Single College by ID
  async getById(id: string): Promise<CollegeResponse> {
    const res = await fetch(`${BASE_URL}/colleges/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch college');
    return res.json();
  },

  // 3. Create New College
  async create(dto: CreateCollegeDto): Promise<CollegeResponse> {
    const res = await fetch(`${BASE_URL}/colleges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to create college');
    return res.json();
  },

  // 4. Update College by ID
  async update(id: string, dto: UpdateCollegeDto): Promise<CollegeResponse> {
    const res = await fetch(`${BASE_URL}/colleges/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Failed to update college');
    return res.json();
  },

  // 5. Delete College by ID
  async remove(id: string): Promise<CollegeResponse> {
    const res = await fetch(`${BASE_URL}/colleges/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete college');
    return res.json();
  },
};